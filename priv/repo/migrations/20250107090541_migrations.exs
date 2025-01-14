defmodule App.Repo.Migrations.Migration do
  use Ecto.Migration

  def change do
    execute "CREATE EXTENSION IF NOT EXISTS citext", ""

    create table(:users) do
      # User tables
      add :email, :citext, null: false
      add :hashed_password, :string, null: false
      add :confirmed_at, :utc_datetime

      timestamps(type: :utc_datetime)
    end

    create unique_index(:users, [:email])

    create table(:users_tokens) do
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :token, :binary, null: false
      add :context, :string, null: false
      add :sent_to, :string

      timestamps(type: :utc_datetime, updated_at: false)
    end

    create index(:users_tokens, [:user_id])
    create unique_index(:users_tokens, [:context, :token])

    # Trello tables
    create table(:boards) do
      add :name, :string, null: false
      add :bg_image, :string
      add :owners, {:array, :string}, default: []
      add :members, {:array, :string}, default: []

      timestamps(type: :utc_datetime)
    end

    create table(:card_labels) do
      add :name, :string, null: false
      add :color, :string, null: false
      add :board, :integer
      add :user, {:array, :string}, default: []

      timestamps(type: :utc_datetime)
    end

    create table(:lists) do
      add :name, :string, null: false
      add :order, :integer
      add :board_id, references(:boards)

      timestamps(type: :utc_datetime)
    end

    create table(:cards) do
      add :order, :integer
      add :name, :string, null: false
      add :description, :text
      add :labels, {:array, :integer}, default: []
      add :dueDate, :string
      add :completed, :string, default: "false"
      add :members, {:array, :string}, default: []
      add :list_id, references(:lists)

      timestamps(type: :utc_datetime)
    end

    create table(:attachments) do
      add :attachment_id, :integer, null: false
      add :display_text, :string, null: false
      add :type, :string, null: false
      add :path, :string, null: false
      add :card_id, references(:cards)

      timestamps(type: :utc_datetime)
    end

    create table(:checklists) do
      add :checklist_id, :integer, null: false
      add :name, :string, null: false
      add :card_id, references(:cards, on_delete: :delete_all)
      add :checkboxes, :map

      timestamps(type: :utc_datetime)
    end

    create table(:activity) do
      add :activity_id, :integer, null: false
      add :user, :string, null: false
      add :action, :string
      add :comment, :text
      add :datetime, :utc_datetime, null: false
      add :edited, :string, default: "false"
      add :card_id, references(:cards, on_delete: :nothing)

      timestamps(type: :utc_datetime)
    end
  end
end
