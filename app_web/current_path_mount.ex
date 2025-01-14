defmodule AppWeb.CurrentPathMount do
  import Phoenix.Component, only: [assign: 3]
  import Phoenix.LiveView, only: [attach_hook: 4]

  def on_mount(:default, _params, _session, socket) do
    socket =
      attach_hook(socket, :assign_current_path, :handle_params, &assign_current_path/3)

    {:cont, socket}
  end

  defp assign_current_path(_params, uri, socket) do
    uri = URI.parse(uri)

    trimmed_path =
      String.trim_leading(uri.path, "/")
      |> String.replace(" ", "-")

    {:cont, assign(socket, :current_path, trimmed_path)}
  end
end
