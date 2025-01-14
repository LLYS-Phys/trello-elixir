defmodule AppWeb.Inquiry.Label do

  @moduledoc """
  A component for rendering inquiry labels with custom colors and styling.

  ## Attributes

  * `:label` - (map, required) The label data containing:
      * `.color` - The hex color code for the label (e.g., "#FF0000")
      * `.name` - The display text for the label
  """

  use AppWeb, :html

  attr :label, :map, required: true

  def inquiry_label(assigns) do
    ~H"""
      <span style={"background-color: #{@label.color}20; color: #{@label.color}; border: 0.1rem solid #{@label.color}; padding: 0.125rem 0.5rem; border-radius: 0.75rem; white-space: nowrap; font-weight: bold;"}>
        {@label.name}
      </span>
    """
  end

end
