defmodule App.Trello do
  import Ecto.Query, warn: false
  alias App.Repo
  alias App.Trello.{Board, CardLabel, List, Card, Attachment, Checklist, Activity}

  # Board operations
  def list_boards do
    Repo.all(Board)
  end

  def list_boards_with_lists do
    Repo.all(Board)
    |> Repo.preload(lists: [cards: [:activity, :checklists, :attachments]])
  end

  def create_board(attrs \\ %{}) do
    Ecto.Multi.new()
    |> Ecto.Multi.insert(:board, Board.changeset(%Board{}, attrs))
    |> Ecto.Multi.run(:todo_list, fn repo, %{board: board} ->
      %List{ board_id: board.id, name: "To Do", order: 1 }
      |> List.changeset(%{})
      |> repo.insert()
    end)
    |> Ecto.Multi.run(:in_progress_list, fn repo, %{board: board} ->
      %List{ board_id: board.id, name: "In Progress", order: 2 }
      |> List.changeset(%{})
      |> repo.insert()
    end)
    |> Ecto.Multi.run(:done_list, fn repo, %{board: board} ->
      %List{ board_id: board.id, name: "Done", order: 3 }
      |> List.changeset(%{})
      |> repo.insert()
    end)
    |> Repo.transaction()
    |> case do
      {:ok, %{board: board}} -> {:ok, board}
      {:error, _failed_operation, failed_value, _changes} -> {:error, failed_value}
    end
  end

  def update_board(%Board{} = board, attrs) do
    board
    |> Board.changeset(attrs)
    |> Repo.update()
  end

  def delete_board(%Board{} = board) do
    delete_all_lists_from_board(board.id)
    Repo.delete(board)
  end

  defp delete_all_lists_from_board(board_id) do
    lists = Repo.all(from l in List, where: l.board_id == ^board_id)
    Enum.each(lists, fn list -> delete_list(list) end)
    Repo.delete_all(from l in List, where: l.board_id == ^board_id)
  end

  def add_board_member(%Board{} = board, member, role) do
    case role do
      "Owner" ->
        board
        |> Board.changeset(%{owners: Enum.uniq(board.owners ++ [member])})
        |> Repo.update()
      "Member" ->
        board
        |> Board.changeset(%{members: Enum.uniq(board.members ++ [member])})
        |> Repo.update()
      _ ->
        {:error, "Invalid role"}
    end
  end

  def update_board_membership(%Board{} = board, member, role) do
    case role do
      "Owner" ->
        board
        |> Board.changeset(%{owners: Enum.uniq(board.owners ++ [member]), members: Enum.reject(board.members, &(&1 == member))})
        |> Repo.update()
      "Member" ->
        board
        |> Board.changeset(%{owners: Enum.reject(board.owners, &(&1 == member)), members: Enum.uniq(board.members ++ [member])})
        |> Repo.update()
      _ ->
        # Handle unexpected role
        {:error, "Invalid role"}
    end
  end

  def delete_board_member(%Board{} = board, member, role) do
    case role do
      "Owner" ->
        board
        |> Board.changeset(%{owners: Enum.reject(board.owners, fn o -> o == member end)})
        |> Repo.update()
      "Member" ->
        board
        |> Board.changeset(%{members: Enum.reject(board.members, fn m -> m == member end)})
        |> Repo.update()
      _ ->
        {:error, "Invalid role"}
    end
  end

  def get_board_with_lists_and_cards(board_id) do
    Board
    |> Repo.get!(board_id)
    |> Repo.preload(lists: [cards: from(c in Card, order_by: c.order, preload: [:activity, :checklists, :attachments])])
  end

  def create_list_for_board(board_id, attrs) do
    %List{board_id: board_id}
    |> List.changeset(Map.put(attrs, :board_id, board_id))
    |> Repo.insert()
  end

  def update_list(list_id, attrs) do
    case Repo.get(List, list_id) do
      nil ->
        {:error, "List not found"}
      list ->
        list
        |> List.changeset(attrs)
        |> Repo.update()
    end
  end

  def swap_list_orders(list1, list2) do
    Ecto.Multi.new()
    |> Ecto.Multi.update(:list1, List.changeset(list1, %{order: list2.order}))
    |> Ecto.Multi.update(:list2, List.changeset(list2, %{order: list1.order}))
    |> Repo.transaction()
  end

  def get_list!(id) do
    Repo.get!(List, id)
    |> Repo.preload([cards: [:activity, :checklists, :attachments]])
  end

  def delete_list(list) do
    delete_all_cards_from_list(list.id)
    Repo.delete(list)
  end

  defp delete_activities_from_card(card_id) do
    Repo.delete_all(from a in Activity, where: a.card_id == ^card_id)
  end

  defp delete_attachments_from_card(card_id) do
    Repo.delete_all(from a in Attachment, where: a.card_id == ^card_id)
  end

  defp delete_checklists_from_card(card_id) do
    Repo.delete_all(from c in Attachment, where: c.card_id == ^card_id)
  end

  defp delete_all_cards_from_list(list_id) do
    cards = Repo.all(from c in Card, where: c.list_id == ^list_id)
    Enum.each(cards, fn card ->
      delete_activities_from_card(card.id)
      delete_attachments_from_card(card.id)
      delete_checklists_from_card(card.id)
    end)
    Repo.delete_all(from c in Card, where: c.list_id == ^list_id)
  end

  def create_card_for_list(list_id, attrs) do
    %Card{list_id: list_id}
    |> Card.changeset(Map.put(attrs, :list_id, list_id))
    |> Repo.insert()
  end

  def update_card(%Card{} = card, attrs) do
    card
    |> Card.changeset(attrs)
    |> Repo.update()
  end

  def get_card!(id) do
    Repo.get!(Card, id)
    |> Repo.preload([:activity, :checklists, :attachments, :list])
  end

  def delete_card(card) do
    delete_activities_from_card(card.id)
    delete_attachments_from_card(card.id)
    delete_checklists_from_card(card.id)
    Repo.delete(card)
  end

  def create_activity_for_card(card_id, attrs) do
    %Activity{card_id: card_id}
    |> Activity.changeset(Map.put(attrs, :card_id, card_id))
    |> Repo.insert()
  end

  def edit_activity(comment, attrs) do
    comment
    |> Activity.changeset(attrs)
    |> Repo.update()
  end

  def delete_activity(activity) do
    Repo.delete(activity)
  end

  def get_activities_in_card(card_id) do
    Repo.all(from a in Activity, where: a.card_id == ^card_id)
  end

  def get_activity!(id, card_id) do
    query = from a in Activity, where: a.activity_id == ^id and a.card_id == ^card_id
    Repo.one!(query)
  end

  def create_attachment_for_card(card_id, attrs) do
    %Attachment{card_id: card_id}
    |> Attachment.changeset(Map.put(attrs, :card_id, card_id))
    |> Repo.insert()
  end

  def edit_attachment(attachment, attrs) do
    attachment
    |> Attachment.changeset(attrs)
    |> Repo.update()
  end

  def delete_attachment(attachment) do
    Repo.delete(attachment)
  end

  def get_attachments_in_card(card_id) do
    Repo.all(from a in Attachment, where: a.card_id == ^card_id)
  end

  def get_attachment!(id, card_id) do
    query = from a in Attachment, where: a.attachment_id == ^id and a.card_id == ^card_id
    Repo.one!(query)
  end

  def create_checklist_for_card(card_id, attrs) do
    %Checklist{card_id: card_id}
    |> Checklist.changeset(Map.put(attrs, :card_id, card_id))
    |> Repo.insert()
  end

  def update_checklist(checklist, attrs) do
    checklist
    |> Checklist.changeset(attrs)
    |> Repo.update()
  end

  def delete_checklist(checklist) do
    Repo.delete(checklist)
  end

  def get_checklists_in_card(card_id) do
    Repo.all(from c in Checklist, where: c.card_id == ^card_id)
  end

  def get_checklist!(id, card_id) do
    query = from c in Checklist, where: c.checklist_id == ^id and c.card_id == ^card_id
    Repo.one!(query)
  end

  def create_checkbox_for_checklist(checklist_id, card_id, attrs) do
    checklist = get_checklist!(checklist_id, card_id)
    update_checklist(checklist, %{checkboxes: Enum.map(checklist.checkboxes, &Map.from_struct/1) ++ [attrs]})
  end

  def update_checkbox(checkbox, attrs) do
    checkbox
    |> Map.merge(attrs)
    |> then(fn updated_checkbox -> {:ok, updated_checkbox} end)
  end

  def update_checkbox_states(checklist_id, card_id, checkbox_states) do
    update_checklist(get_checklist!(checklist_id, card_id), %{"checkboxes" => Enum.map(checkbox_states, fn %App.Trello.Checklist.Checkbox{} = checkbox -> %{checkbox_id: checkbox.checkbox_id, name: checkbox.name, checked: checkbox.checked} end)})
  end

  def delete_checkbox(checklist, checkbox_id) do
    update_checklist(checklist, %{checkboxes: Enum.reject(Enum.map(checklist.checkboxes, fn %App.Trello.Checklist.Checkbox{} = checkbox -> %{checkbox_id: checkbox.checkbox_id, name: checkbox.name, checked: checkbox.checked} end), fn checkbox -> "#{checkbox.checkbox_id}" == "#{checkbox_id}" end)})
  end

  def get_checkbox!(checklist_id, card_id, checkbox_id) do
    checklist = get_checklist!(checklist_id, card_id)
    case Enum.find(checklist.checkboxes, fn checkbox -> checkbox.checkbox_id == checkbox_id end) do
      nil -> raise "Checkbox with ID #{checkbox_id} not found in checklist #{checklist_id} for card #{card_id}"
      checkbox -> checkbox
    end
  end

  def list_all_cards do
    Repo.all(Card)
    |> Repo.preload([:activity, :checklists, :attachments])
  end

  def list_cards_in_list(list_id) do
    Repo.all(from c in Card, where: c.list_id == ^list_id)
  end

  def list_labels() do
    Repo.all(CardLabel)
  end

  def get_labels_in_board(board_id) do
    Repo.all(from l in CardLabel, where: l.board == ^board_id or l.board == 0)
  end

  def create_label(attrs \\ %{}) do
    %CardLabel{}
    |> CardLabel.changeset(attrs)
    |> Repo.insert()
  end

  def update_label(%CardLabel{} = label, attrs) do
    label
    |> CardLabel.changeset(attrs)
    |> Repo.update()
  end

  def delete_label(%CardLabel{} = label) do
    Repo.delete(label)
  end

  def get_label!(id) do
    Repo.get!(CardLabel, id)
  end

  def move_card_to_another_list(card_id, target_list_id, movedCardPosition) do
    case Repo.get(Card, card_id) do
      nil ->
        {:error, "Card not found"}
      card ->
        case Repo.get(List, target_list_id) do
          nil ->
            {:error, "Target list not found"}
          _target_list ->
            card
            |> Card.changeset(%{list_id: target_list_id, order: movedCardPosition})
            |> Repo.update()
        end
    end
  end
end
