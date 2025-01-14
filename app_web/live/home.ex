defmodule AppWeb.Trello.Home do
  @moduledoc """
  Stateful components Demo Page with the following comments:
  1) Define the Title of the page;
  2) Every page can be the landing page for the application and thus should validate if the CSS and JS files being used are
     the latests, ie, if they are updated (as set in the "root layout" comment (5));

  Version 1 Functionalities on Home Page:
    1) Create new board
    2) A list of all boards that the user is an owner of
    3) Edit new board by the button on the top right of the board, including:
        a) Editing name
        b) Editing image with browse button or drag and drop image in a box
        c) Delete button with a confirmation prompt before deletion

  Version 2 Functionalities on Home Page:
    1) Hide the settings button for boards that the current user is not an owner of

  Version 3 Functionalities on Home Page:
    n/a

  Version 4 Functionalities on Home Page:
    1) Create schema and context files and connect it to the functions

  Version 5 Functionalities on Home Page:
    1) PubSub added for all actions
    2) Added auto-scroll-to-top when the new board popup is opened
    3) Integrate translations for all 6 languages (en, pt, de, it, es, fr)
    
  Version 6 Functionalities on Home Page:
    1) Automatically create 3 lists ("To Do", "In Progress" and "Done") when a new board is created

  """
  use AppWeb, :live_view
  alias App.Trello
  alias Phoenix.PubSub

  def mount(_params, _session, socket) do
    if connected?(socket) do
      PubSub.subscribe(App.PubSub, "board_update")
    end

    {:ok,
     socket
     |> assign(boards: Enum.sort_by(Enum.filter(Trello.list_boards(), fn board -> socket.assigns.current_user.email in board.owners or socket.assigns.current_user.email in board.members end), fn board -> board.id end))
     |> assign(selected_board: nil)
     |> allow_upload(:board_photo, accept: ~w(.jpg .jpeg .png), max_entries: 1, max_file_size: 10_000_000)
     |> allow_upload(:edit_board_photo, accept: ~w(.jpg .jpeg .png), max_entries: 1, max_file_size: 10_000_000)
     # (2)
     |> assign(:page_title, gettext("Your Boards"))
     # (3)
     |> assign(static_changed?: static_changed?(socket))}
  end

  def render(assigns) do
    ~H"""
      <style>
        .main.page.home .main-content .cards { margin-top: 2rem; flex-wrap: wrap;
          & .card { width: 33%; height: 15rem; margin-bottom: 0.5rem; border: 0.0625rem solid transparent; border-radius: 1rem;
            & a { height: inherit; }
            & .title { color: white; top: 0.5rem; left: 0.5rem; background-color: rgba(38,8,8,0.33) }
            & .new-card-title { color: black; top: 0.5rem; left: 0.5rem; }
            & .board-image { top: 0; left: 0; object-fit: fill; height: 100%; opacity: 0.8; border-radius: 1rem; }
            &:hover{ border: 0.0625rem solid lightgray;
              .board-image { opacity: 1; }
            }
            & .settings { padding: 0.5rem; border-radius: 50%; border: none; top: 0.5rem; right: 0.5rem;
              &:hover{ background-color: darkgray; }
            }
          }
        }
        .create-new-board, .edit-board { width: 100vw; min-height: 100vh; top: 0; left: 0; backdrop-filter: brightness(0.3); overflow-y: auto;
          & .create-new-board-modal, & .edit-board-modal { width: 50%; height: auto; min-height: 50%; background-color: white; border: 0.125rem solid black; top: 5rem; border-radius: 1rem; padding: 1rem;
            & .button-container { top: 1.5rem; right: 1.25rem;
              & button { border: none; border-radius: 0.5rem;
                &:hover { background-color: darkgray; }
                & span { height: 1.25rem; width: 1.25rem; }
              }
            }
            & form { gap: 1rem;
              .hint { padding: 2rem; border: 0.0625rem dotted black; text-align: center;
                & .drop{ padding-top: 2rem; }
              }
            }
            & .delete-board-button { bottom: 1rem; right: 1rem; background-color: rgba(250,50,50,0.8);
              &:hover { background-color: rgba(250,50,50,1); }
            }
            & .delete-board { background-color: white; box-shadow: 0.1rem 0.1rem 0.1rem lightgray; border: 0.0625rem solid lightgray; border-radius: 0.5rem; bottom: 1rem; padding: 0.5rem;
              & .cancel { background-color: white; border: 0.0625rem solid rgba(250,50,50,0.8); color: black;
                &:hover { background-color: rgb(240,240,240); border: 0.0625rem solid rgba(250,50,50,1); }
              }
            }
          }
        }
      </style>
      <div class="main page home width100 content-start">
        <div class="main-content layer1 width100 relative items-start">
          <h1>{gettext("Welcome to the Telespazio Trello")}</h1>
          <div class="cards width100 space-evenly">
            <div class="card relative" :for={board <- @boards}>
              <button class="settings layer1 pointer" :if={@current_user.email in board.owners} phx-value-board_id={board.id} phx-click={JS.remove_class("hidden", to: "#edit-board") |> JS.push("set_selected_board")}> <.icon name="hero-ellipsis-horizontal"/> </button>
              <.link class="width100 relative" navigate={~p"/boards/#{board.id}/#{String.replace(board.name, " ", "-")}"}>
                <h3 class="title layer1" style={if board.bg_image == "", do: "color: black;"}> {board.name} </h3>
                <img src={~p"/uploads/#{board.bg_image}"} class="board-image width100 absolute"/>
              </.link>
            </div>
            <button class="card relative create-board" phx-click={JS.remove_class("hidden", to: "#create-new-board")} onclick="document.querySelector('#new_board_name').value = ''; document.documentElement.scrollTop = 0; document.body.scrollTop = 0;">
              <h3 class="new-card-title layer1"> {gettext("Create a new board")} </h3>
              <img src={~p"/images/trello-board-placeholder.png"} class="board-image width100 absolute"/>
            </button>
          </div>
        </div>
      </div>
      <.focus_wrap id="create-new-board" class="create-new-board fixed hidden layer2">
        <div class="create-new-board-modal fixed" phx-click-away={JS.add_class("hidden", to: "#create-new-board")}>
          <div class="button-container layer3 flex-end absolute">
            <button phx-click={JS.add_class("hidden", to: "#create-new-board")} type="button" aria-label={gettext("close")}> <.icon name="hero-x-mark-solid" /> </button>
          </div>
          <h4>{gettext("Create a new board")}:</h4>
          <form phx-submit={JS.add_class("hidden", to: "#create-new-board") |> JS.push("create_board")} phx-change="validate">
            <.input name="new_board_name" id="new_board_name" value="" placeholder={gettext("Board Name:")} style={%{main: "width: 100%;", label: "", inner: ""}}/>
            <div class="hint">
              <span class="width100">{gettext("Add board photo")} ({gettext("max size")}: {trunc(@uploads.board_photo.max_file_size / 1_000_000)} MB)</span>
              <div class="drop" phx-drop-target={@uploads.board_photo.ref}> <.live_file_input upload={@uploads.board_photo} /> {gettext("or drag and drop here")} </div>
              <.error :for={err <- upload_errors(@uploads.board_photo)}> {Phoenix.Naming.humanize(err)} </.error>
              <div :for={entry <- @uploads.board_photo.entries} class="entry">
                <.live_img_preview entry={entry} class="max-w-full h-auto" />
                <button type="button" phx-click="cancel-upload" phx-value-ref={entry.ref}> {gettext("Remove")} </button>
              </div>
            </div>
            <.button type="submit">{gettext("Create new board")}</.button>
          </form>
        </div>
      </.focus_wrap>
      <.focus_wrap id="edit-board" class="edit-board fixed hidden layer3">
        <div class="edit-board-modal fixed" phx-click-away={JS.add_class("hidden", to: "#edit-board") |> JS.push("close_board_edit")}>
          <div class="button-container layer3 flex-end absolute">
            <button phx-click={JS.add_class("hidden", to: "#edit-board") |> JS.push("close_board_edit")} type="button" aria-label={gettext("close")}> <.icon name="hero-x-mark-solid" /> </button>
          </div>
          <h4>{gettext("Edit board")}:</h4>
          <form phx-submit={JS.add_class("hidden", to: "#edit-board") |> JS.push("edit_board") |> JS.push("close_board_edit")} phx-change="validate">
            <.input type="hidden" name="edit_board_id" value={if @selected_board, do: @selected_board.id}/>
            <.input name="edit_board_name" id="edit_board_name" value={if @selected_board, do: @selected_board.name} placeholder={gettext("Board Name:")} style={%{main: "width: 100%;", label: "", inner: ""}}/>
            <div class="hint">
              <span class="width100">{gettext("Change board photo")} ({gettext("max size")}: {trunc(@uploads.edit_board_photo.max_file_size / 1_000_000)} MB)</span>
              <div class="drop" phx-drop-target={@uploads.edit_board_photo.ref}> <.live_file_input upload={@uploads.edit_board_photo} /> {gettext("or drag and drop here")} </div>
              <.error :for={err <- upload_errors(@uploads.edit_board_photo)}> {Phoenix.Naming.humanize(err)} </.error>
              <%= if @uploads.edit_board_photo.entries != [] do %>
                <div :for={entry <- @uploads.edit_board_photo.entries} class="entry">
                  <.live_img_preview entry={entry} class="max-w-full h-auto" />
                  <button type="button" phx-click="cancel-upload" phx-value-ref={entry.ref} phx-value-action={:edit_board_photo}> {gettext("Remove")} </button>
                </div>
              <% else %>
                <%= if @selected_board do %>
                  <%= if @selected_board.bg_image != "" do %>
                    <h4 class="width100">{gettext("Current photo")}: </h4>
                    <div class="entry">
                      <img src={~p"/uploads/#{if @selected_board, do: @selected_board.bg_image}"} class="max-w-full h-auto" />
                    </div>
                  <% else %>
                    <h4>{gettext("No photo for this board yet.")}</h4>
                  <% end %>
                <% end %>
              <% end %>
            </div>
            <.button type="submit">{gettext("Edit board")}</.button>
          </form>
          <.button class="delete-board-button absolute" phx-click={JS.remove_class("hidden", to: ".delete-board")}>{gettext("Delete board")}</.button>
          <div class="delete-board layer3 content-baseline space-evenly hidden" phx-click-away={JS.add_class("hidden", to: ".delete-board")}>
            <h4 class="width100">{gettext("Are you sure?")}</h4>
            <.button class="delete-board-button" phx-click={JS.add_class("hidden", to: ".delete-board") |> JS.add_class("hidden", to: "#edit-board") |> JS.push("delete_board")}>{gettext("Yes, delete board")}</.button>
            <.button class="cancel" phx-click={JS.add_class("hidden", to: ".delete-board")}>{gettext("Cancel")}</.button>
          </div>
        </div>
      </.focus_wrap>
    """
  end

  def handle_info({:update_boards, _info}, socket) do
    {:noreply, assign(socket, boards: Enum.sort_by(Enum.filter(Trello.list_boards(), fn board -> socket.assigns.current_user.email in board.owners or socket.assigns.current_user.email in board.members end), fn board -> board.id end))}
  end

  def handle_info({:update_labels}, socket) do
    {:noreply, socket}
  end

  def handle_event("validate", _params, socket) do
    {:noreply, socket}
  end

  def handle_event("cancel-upload", %{"ref" => ref}, socket) do
    {:noreply, cancel_upload(socket, :board_photo, ref)}
  end

  def handle_event("set_selected_board", %{"board_id" => board_id}, socket) do
    {:noreply, assign(socket, selected_board: Enum.find(socket.assigns.boards, fn board -> board.id == String.to_integer(board_id) end))}
  end

  def handle_event("close_board_edit", _, socket) do
    {:noreply, assign(socket, selected_board: nil)}
  end

  def handle_event("create_board", params, socket) do
    bg_image_path = case socket.assigns.uploads.board_photo.entries do
      [] -> "trello-board-placeholder.png"
      _ -> consume_uploaded_entries(socket, :board_photo, fn meta, entry ->
        dest = Path.join(["priv", "static", "uploads", "#{entry.uuid}-#{entry.client_name}"])
        File.cp!(meta.path, dest)
        {:ok, Path.basename(dest)}
      end) |> List.first()
    end

    Trello.create_board(%{name: params["new_board_name"], bg_image: bg_image_path, owners: [socket.assigns.current_user.email], members: []})
    PubSub.broadcast(App.PubSub, "board_update", {:update_boards, "none"})
    {:noreply, put_flash(socket, :info, gettext("Board created successfully!"))}
  end

  def handle_event("edit_board", params, socket) do
    bg_image_path =
      if socket.assigns.uploads.edit_board_photo.entries != [] do
        consume_uploaded_entries(socket, :edit_board_photo, fn meta, entry ->
          dest = Path.join(["priv", "static", "uploads", "#{entry.uuid}-#{entry.client_name}"])
          File.cp!(meta.path, dest)
          {:ok, Path.basename(dest)}
        end) |> List.first()
      else
        socket.assigns.selected_board.bg_image
      end

    Trello.update_board(socket.assigns.selected_board, %{name: params["edit_board_name"], bg_image: bg_image_path})
    PubSub.broadcast(App.PubSub, "board_update", {:update_boards, "none"})
    {:noreply, socket |> put_flash(:info, gettext("Board edited successfully!")) |> assign(selected_board: nil)}
  end

  def handle_event("delete_board", _, socket) do
    Trello.delete_board(socket.assigns.selected_board)
    PubSub.broadcast(App.PubSub, "board_update", {:update_boards, "none"})
    {:noreply, put_flash(socket, :info, gettext("Board deleted successfully!"))}
  end
end
