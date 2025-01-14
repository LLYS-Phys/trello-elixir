defmodule App.Trello.Activity do
  use Ecto.Schema
  import Ecto.Changeset

  schema "activity" do
    field :activity_id, :integer
    field :user, :string
    field :action, :string
    field :comment, :string
    field :datetime, :utc_datetime
    field :edited, :string, default: "false"

    belongs_to :card, App.Trello.Card

    timestamps(type: :utc_datetime)
  end

  defimpl Jason.Encoder, for: App.Trello.Activity do
    def encode(struct, opts) do
      struct
      |> Map.take([:activity_id, :user, :action, :comment, :datetime, :edited, :card_id, :inserted_at, :updated_at])
      |> Jason.Encoder.encode(opts)
    end
  end

  def changeset(activity, attrs) do
    activity
    |> cast(attrs, [:activity_id, :user, :action, :comment, :datetime, :edited, :card_id])
    |> validate_required([:user, :datetime, :card_id])
    |> foreign_key_constraint(:card_id)
  end
end
