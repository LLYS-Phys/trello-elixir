defmodule App.Trello.List do
  use Ecto.Schema
  import Ecto.Changeset

  schema "lists" do
    field :name, :string
    field :order, :integer
    belongs_to :board, App.Trello.Board

    has_many :cards, App.Trello.Card, on_delete: :delete_all

    timestamps(type: :utc_datetime)
  end

  def changeset(list, attrs) do
    list
    |> cast(attrs, [:name, :order, :board_id])
    |> validate_required([:name, :order, :board_id])
    |> foreign_key_constraint(:board_id)
  end
end
