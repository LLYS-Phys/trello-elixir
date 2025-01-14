defmodule App.Trello.Board do
  use Ecto.Schema
  import Ecto.Changeset

  schema "boards" do
    field :name, :string
    field :bg_image, :string
    field :owners, {:array, :string}, default: []
    field :members, {:array, :string}, default: []

    has_many :lists, App.Trello.List, on_delete: :delete_all
    has_many :card_labels, App.Trello.CardLabel

    timestamps(type: :utc_datetime)
  end

  def changeset(board, attrs) do
    board
    |> cast(attrs, [:name, :bg_image, :owners, :members])
    |> validate_required([:name])
  end
end
