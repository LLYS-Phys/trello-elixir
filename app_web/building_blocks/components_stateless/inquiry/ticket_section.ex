defmodule AppWeb.Inquiry.TicketSection do
  @moduledoc """
  A reusable component for rendering a collapsible ticket section with customizable styles, title, and content.

  ## Features

  - Displays a title with an optional ticket count.
  - Provides an interactive expand/collapse functionality.
  - Customizable styles for the main section and the title wrapper.
  - Supports rendering dynamic inner content via slots.

  """

  use AppWeb, :html


  attr :id, :string, required: true
  attr :title, :string, default: "Tickets"
  attr :ticket_count, :integer, default: nil
  attr :initially_expanded, :boolean, default: false
  attr :style, :map, default: %{main: "", title_wrapper: ""}
  slot :inner_block, required: true
  def ticket_section(assigns) do
    ~H"""
    <style>
    .ticket-section {
      width: 100%;
      border: 0.125rem solid gainsboro;
      border-radius: 0.75rem;
      margin: 1.25rem 0;
      box-shadow: 0 0.06rem 0.2rem rgb(0 0 0 / 0.05);
      transition: box-shadow 0.2s ease-in-out;
      overflow: hidden;
      &:hover {
        box-shadow: 0 0.3rem 0.4rem rgb(0 0 0 / 0.05);
      }
      & .title-wrapper {
        width: 100%;
        justify-content: flex-start;
        padding: 1rem 1.5rem;
        border-bottom: 0.063rem solid gainsboro;
        background-color: whitesmoke;
        border-top-left-radius: 0.75rem;
        border-top-right-radius: 0.75rem;
        z-index: 1;
        & h4 {
          cursor: pointer;
          user-select: none;
          font-size: 1.125rem;
          color: dimgray;
          font-weight: 600;
          transition: color 0.2s ease-in-out;
          &:hover {
            color: blue;
          }
        }
      }
    }
    .icon-wrapper {
      background-color: Gainsboro;
      border-radius: 50%;
      height: 1.75rem;
      width: 1.75rem;
      margin-right: 0.75rem;
      transition: all 0.2s ease-in-out;
      &.expanded {
        transform: rotate(180deg);
        background-color: RoyalBlue;
        color: white;
      }
    }
    .ticket-count {
      background-color: gainsboro;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.875rem;
      color: gray;
      margin-left: 0.75rem;
    }
    .content-wrapper {
      max-height: 0;
      transition: max-height 0.3s ease-in-out;
      width: 100%;
      &.expanded {
        max-height: 50rem;
      }
    }
    </style>
    <div class="ticket-section" style={@style.main}>
      <div class="title-wrapper" style={@style.title_wrapper}>
        <h4 phx-click={
          JS.toggle_class("expanded", to: "##{@id}-content")
          |> JS.toggle_class("expanded", to: "##{@id}-icon-wrapper")
        }>
          <span id={"#{@id}-icon-wrapper"} class={"icon-wrapper #{if @initially_expanded, do: "expanded"}"}>
            <.icon name="hero-chevron-down" class="h-4 w-4" />
          </span>
          {@title}
          <%= if @ticket_count do %>
            <span class="ticket-count">
              {@ticket_count} Ticket{if @ticket_count != 1, do: "s"}
            </span>
          <% end %>
        </h4>
      </div>
      <div id={"#{@id}-content"} class={"content-wrapper #{if @initially_expanded, do: "expanded"}"}>
            {render_slot(@inner_block)}
      </div>
    </div>
    """
  end
end
