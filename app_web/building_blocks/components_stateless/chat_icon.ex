defmodule AppWeb.ChatIcon do
  @moduledoc """
  Chat icon that displayed in bottom right corner of the page. It is placed in app.html.heex file.

  Usage:
    <.chat_icon/>

    With styling options:

      <.chat_icon
        style={
          %{
            icon_background: "GhostWhite",
            icon_color: "red"
          }
        }

      />
  """

  use AppWeb, :html
  alias Phoenix.LiveView.JS

  attr :style, :map,
    default: %{
      icon_background: "GhostWhite",
      icon_color: "red",
      wrapper: "",
      icon: ""
    }

  def chat_icon(assigns) do
    ~H"""
    <style>
      .stateless_comp.main.chat-icon .icon { bottom: 8.3rem; right: 1.25rem; background-color: <%= @style.icon_background %>; border-radius: 50%;
                                            padding: 0.9rem; box-shadow: 0 0 0.6rem rgba(0,0,0,0.1);
        &:hover{ background-color: Gainsboro; }
      }
    </style>

    <div class="stateless_comp main chat-icon" style={@style.wrapper}>
      <div class="icon layer3 pointer fixed" phx-click={JS.add_class("active", to: ".chat-box")} style={@style.icon}>
        <.icon
          name="hero-chat-bubble-bottom-center-solid"
          style={"background-color: #{@style.icon_color};"}
        />
      </div>
    </div>
    """
  end
end
