defmodule App.Trello.Checklist do
  use Ecto.Schema
  import Ecto.Changeset

  schema "checklists" do
    field :checklist_id, :integer
    field :name, :string

    belongs_to :card, App.Trello.Card

    embeds_many :checkboxes, App.Trello.Checklist.Checkbox, on_replace: :delete

    timestamps(type: :utc_datetime)
  end

  defimpl Jason.Encoder, for: App.Trello.Checklist do
    def encode(struct, opts) do
      struct
      |> Map.take([:checklist_id, :name, :card_id, :checkboxes, :inserted_at, :updated_at])
      |> Jason.Encoder.encode(opts)
    end
  end

  def changeset(checklist, attrs) do
    checklist
    |> cast(attrs, [:checklist_id, :name, :card_id])
    |> cast_embed(:checkboxes)
    |> validate_required([:name, :card_id])
    |> foreign_key_constraint(:card_id)
  end
end

defmodule App.Trello.Checklist.Checkbox do
  use Ecto.Schema
  import Ecto.Changeset

  embedded_schema do
    field :checkbox_id, :integer # Defining the 'id' field for each checkbox
    field :name, :string
    field :checked, :boolean, default: false
  end

  defimpl Jason.Encoder, for: __MODULE__ do
    def encode(struct, opts) do
      %{
        checkbox_id: struct.checkbox_id,
        name: struct.name,
        checked: struct.checked
      }
      |> Jason.Encode.map(opts)
    end
  end

  def changeset(checkbox, attrs) do
    checkbox
    |> cast(attrs, [:checkbox_id, :name, :checked])
    |> validate_required([:checkbox_id, :name])
  end
end
