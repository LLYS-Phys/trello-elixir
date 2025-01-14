defmodule App.Trello.CardLabel do
  use Ecto.Schema
  import Ecto.Changeset

  schema "card_labels" do
    field :name, :string
    field :color, :string
    field :board, :id
    field :user, {:array, :string}, default: []

    timestamps(type: :utc_datetime)
  end

  def changeset(label, attrs) do
    label
    |> cast(attrs, [:name, :color, :board, :user])
    |> validate_required([:name, :color])
  end
end
