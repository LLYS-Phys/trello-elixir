defmodule App.Trello.Card do
  use Ecto.Schema
  import Ecto.Changeset

  schema "cards" do
    field :order, :integer
    field :name, :string
    field :description, :string
    field :labels, {:array, :integer}, default: []
    field :dueDate, :string
    field :completed, :string, default: "false"
    field :members, {:array, :string}, default: []

    belongs_to :list, App.Trello.List

    has_many :attachments, App.Trello.Attachment, on_delete: :delete_all
    has_many :checklists, App.Trello.Checklist, on_delete: :delete_all, on_replace: :delete
    has_many :activity, App.Trello.Activity, on_delete: :delete_all

    timestamps(type: :utc_datetime)
  end

  def changeset(card, attrs) do
    card
    |> cast(attrs, [:order, :name, :description, :labels, :dueDate, :completed, :members, :list_id])
    |> cast_assoc(:attachments)
    |> cast_assoc(:checklists)
    |> cast_assoc(:activity)
    |> validate_required([:name, :list_id])
    |> foreign_key_constraint(:list_id)
  end
end
