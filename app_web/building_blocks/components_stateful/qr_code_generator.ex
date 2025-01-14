defmodule AppWeb.QrCodeGenerator do
  @moduledoc """

    Using the component:

    <.live_component
        module={AppWeb.QrCodeGenerator}
        id="" <- Add unique ID for the live component called (REQUIRED)
        config={
          %{
            path: "test with text", <- Add link or text to be displayed when the QE called is scanned (REQUIRED)
            color: "", <- You can adjust the color of the dots of the qr code
            shape: "", <- You can make the dots in the QR code into circles by passing "circle" here
            width: "", <- You can modify the size of the QR code by specifying a different width here. By default it is automatically 300
            bg_color: "" <- You can specify a different background color for the QR code
          }
        }
    />

  """

  use AppWeb, :live_component

  def update(assigns, socket) do
    assign(socket, assigns)

    qr_width =
      if assigns.config.width == "", do: 300, else: String.to_integer(assigns.config.width)

    qr =
      assigns.config.path
      |> EQRCode.encode()
      |> EQRCode.svg(
        color: assigns.config.color,
        shape: assigns.config.shape,
        width: qr_width,
        background_color: assigns.config.bg_color
      )

    socket =
      socket
      |> assign(qr: qr)

    {:ok, socket}
  end

  def render(assigns) do
    ~H"""
    <div>
      {raw(@qr)}
    </div>
    """
  end
end
