defmodule AppWeb.Inquiry.EmptyMessage do

  @moduledoc """
  A reusable UI component for displaying an empty state message in the Inquiry Admin Panel Page but can be used everywhere.

  ## Overview

  The component is used to show a message when a section (e.g., inbox, list) has no content.

  ## Attributes

  - `:icon` (optional): The name of the icon to display. Defaults to `"hero-inbox"`.
  - `:title` (optional): The title text to display in the empty state message. Defaults to `"Your inbox is empty"`.
  - `:description` (optional): The description text for the empty state. Defaults to `"New messages will show up here"`.
  - `:style` (optional): A map containing inline styles for customization:
    - `:main`: Styles applied to the main container. Defaults to an empty string.
    - `:title`: Styles applied to the title. Defaults to an empty string.
  - `:button` - (map) Optional button configuration:
      - `:path` - Navigation path when button is clicked
      - `:text` - Button label text

  ## Usage

  <.empty_message
    icon="hero-inbox"
    title="No notifications"
    description="You're all caught up! Check back later for updates."
    style=%{main: "text-align: center;", title: "color: blue;"}
    button=%{
      path: ~p"/projects/new",
      text: "Create Project"
      }
    />
  />
  """

    use AppWeb, :html

    attr :icon, :string, default: "hero-inbox"
    attr :title, :string, default: "No inquiries yet"
    attr :description, :string, default: "New inquiries will show up here"
    attr :style, :map, default: %{main: "", title: ""}
    attr :button, :map, default: %{path: "", text: ""}
    def empty_message(assigns) do
      ~H"""
      <style>
        .empty-state-container {
          width: 100%;
          gap: 1rem;
          padding: 3rem 0;

          & .icon-container {
            background-color: whitesmoke;
            width: 4rem;
            height: 4rem;
            border-radius: 50%;

            & .state-icon {
              width: 2rem;
              height: 2rem;
              color: darkgray;
            }
          }

          & .content-container {
            max-width: 24rem;

            & .title {
              font-size: 1.25rem;
              color: dimgray;
              margin-bottom: 0.5rem;
            }

            & .description {
              color: gray;
              font-size: 1rem;
            }
          }
        }
      </style>
        <div class="empty-state-container" style={@style.main}>
        <div style="width: 100%;">
          <div class="icon-container">
            <.icon name={@icon} class="state-icon" />
          </div>
        </div>
        <div class="content-container">
          <h3 class="title" style={@style.title}>{@title}</h3>
          <p class="description">{@description}</p>
            <.link
              :if={@button[:path] != ""}
              navigate={@button[:path]}
              style="width: 100%; margin-top: 1rem;"
            >
            <.button> {@button[:text]} </.button>

            </.link>
        </div>
      </div>
      """
    end

end
