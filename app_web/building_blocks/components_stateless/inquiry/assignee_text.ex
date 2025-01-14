defmodule AppWeb.Inquiry.AssigneeText do

  @moduledoc """
    A component that displays the assignee status of an inquiry with appropriate styling.

    ## Overview

    The AssigneeText component visualizes the assignment status of an inquiry using:
    - Different icons for assigned/unassigned states
    - Color coding for different assignment states
    - Custom text formatting based on assignment context
    - Special handling when the current user is the assignee

    ## Attributes

    * `:inquiry` - (map, required) The inquiry data containing:
        * `.assignee` - The user assigned to the inquiry (can be nil)
            * `.id` - The assignee's user ID
            * `.email` - The assignee's email address
    * `:current_user_id` - (integer, required) ID of the currently logged-in user
    * `:icon_visible` - show/hide icon based on boolean value

    ## States

    The component displays three possible states:

    1. Unassigned:
        * Gray color
        * User circle icon
        * "Unassigned" text

    2. Assigned to current user:
        * Blue color
        * User icon
        * Email with "(You)" suffix
        * Bold text

    3. Assigned to other user:
        * Black color
        * User icon
        * User's email address

  """

  use AppWeb, :html

  attr :inquiry, :map, required: true
  attr :current_user_id, :integer, required: true
  attr :icon_visible, :boolean, default: true

  def assignee_text(assigns) do
    assigns = assign(assigns, :display_data, get_display_data(assigns.inquiry, assigns.current_user_id))

    ~H"""
    <div style={"display: flex; justify-content: flex-start; align-items: center; gap: 0.25rem; color: #{@display_data.color};"}>
      <.icon :if={@icon_visible} name={@display_data.icon} style="height: 1rem; width: 1rem;" />
      <span style={@display_data.text_style}>{@display_data.text}</span>
    </div>
    """
  end

    defp get_display_data(inquiry, current_user_id) do
      cond do
        is_nil(inquiry.assignee) ->
          %{color: "gray", icon: "hero-user-circle", text: "Unassigned", text_style: ""}

        inquiry.assignee.id == current_user_id ->
          %{color: "blue", icon: "hero-user", text: "#{inquiry.assignee.email} (You)", text_style: "font-weight: 500;"}

        true ->
          %{color: "black", icon: "hero-user", text: inquiry.assignee.email, text_style: ""}
      end
    end

end
