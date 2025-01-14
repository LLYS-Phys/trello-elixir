defmodule AppWeb.StatelessCompExternal do
  @moduledoc """
  Module to define components based on external libraries;
								                ..................... Render the component ...................
  1) You have to "import AppWeb.StatelessCompExternal " to the View that renders this component;
  2) Copy the component signature you want to use and pass the mandatory attributes plus the optional ones according to its
      signature (for example):
                                  <.qrcode />
                                  ....................... Notes & learnings ....................
  3)
  """
  use AppWeb, :html

#.................................................... stateless_comp_qrcode ..................................................
  attr :attribs, :global
  attr :class, :string, default: nil
  attr :style, :map, default: %{main: ""}
  attr :options, :map, default: %{url: "test with text", color: "black", shape: "circle", width: "300", background_color: "white"}
  def qrcode(assigns) do
    ~H"""
    <div class={"stateless_comp main qrcode #{@class}"} {@attribs} style={@style.main}>
      <%= raw(@options.url
      |> EQRCode.encode()
      |> EQRCode.svg(
        color: @options.color,
        shape: @options.shape,
        width: @options.width,
        background_color: @options.background_color
      )) %>
    </div>
    """
  end
end
