defmodule AppWeb.Inquiry.PriorityBadge do

    @moduledoc """
  A component for rendering priority badges in inquiry admin page with different visual styles based on priority level.

  This component displays a badge with appropriate styling for different priority levels
  (high, medium, low).
  """

  use AppWeb, :html

  attr :priority, :string, required: true

  def priority_badge(assigns) do
    ~H"""
    <style>
    .inquiry-badge {
      padding: 0.3rem 0.7rem;
      border-radius: 1rem;
      font-weight: bold;
      white-space: nowrap;

      &.high {
        background-color: mistyrose;
        color: darkred;
      }

      &.medium {
        background-color: moccasin;
        color: darkorange;
      }

      &.low {
        background-color: gainsboro;
        color: dimgray;
      }
    }
    </style>
      <span class={"inquiry-badge #{@priority}"}> {String.capitalize(@priority)} </span>
    """
  end

end
