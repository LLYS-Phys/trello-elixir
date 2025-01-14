defmodule AppWeb.PermissionGroup do

  @moduledoc """
  A reusable component for rendering permission groups in role management forms.

  This component displays CRUD permissions (read, create, update, delete)
  for a given resource type.

  ## Example Usage:
      <.permission_group
        form={permissions_form}
        resource={:products}
        display_name="Products"
      />
  """

  use AppWeb, :html

  attr :form, :any, required: true
  attr :resource, :atom, required: true
  attr :display_name, :string, required: true

  def permission_group(assigns) do
    ~H"""
    <div>
      <h4 class="width100">{@display_name} Permissions</h4>
      <div style="gap: 1rem;">
        <.inputs_for :let={resource_form} field={@form[@resource]}>
            <.input
              :for={action <- [:read, :create, :update, :delete]}
              type="checkbox"
              field={resource_form[action]}
              label={action |> to_string() |> String.capitalize()}
            />
        </.inputs_for>
      </div>
    </div>
    """
  end

end
