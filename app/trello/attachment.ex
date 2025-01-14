defmodule App.Trello.Attachment do
  use Ecto.Schema
  import Ecto.Changeset

  schema "attachments" do
    field :attachment_id, :integer
    field :display_text, :string
    field :type, :string
    field :path, :string

    belongs_to :card, App.Trello.Card

    timestamps(type: :utc_datetime)
  end

  defimpl Jason.Encoder, for: App.Trello.Attachment do
    def encode(struct, opts) do
      struct
      |> Map.take([:attachment_id, :display_text, :type, :path, :inserted_at, :updated_at])
      |> Jason.Encoder.encode(opts)
    end
  end

  def changeset(attachment, attrs) do
    attachment
    |> cast(attrs, [:attachment_id, :display_text, :type, :path, :card_id])
    |> validate_required([:display_text, :type, :path, :card_id])
    |> foreign_key_constraint(:card_id)
  end
end
