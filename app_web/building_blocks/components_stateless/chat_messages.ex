defmodule AppWeb.ChatMessages do

  @moduledoc """
  This are the components that used for live chat in admin panel.
  """

  use AppWeb, :html
  alias Phoenix.LiveView.JS

  use AppWeb, :verified_routes


  @doc """
    Renders list of messages.

    ## Example

    <.list_messages
      messages={@messages} - List of messages in the chat
      sender_id={@current_user_id} - Sender id of the message
    />

  """

  attr :messages, :map
  attr :sender_id, :integer

  def list_messages(assigns) do
    ~H"""
    <style>
      .stateless_comp.main.messages-container { background-color: white; padding: 0 1rem; width: 100%; gap: 2rem; height: calc(78vh); overflow-y: scroll;
        & .message { width: 100%; word-break: break-all; }
      }
    </style>
    <div
      id="messages"
      class="stateless_comp main messages-container content-start"
      phx-update="stream"
      phx-hook="ScrollToBottom"
    >
      <div id="infinite-scroll-marker" phx-hook="InfiniteScroll"></div>
      <div
        :for={{dom_id, message} <- @messages}
        id={dom_id}
        class="message flex-start"
        data-toggle={JS.toggle(to: "#message-#{message.id}-buttons")}

      >
      <div style={"#{if message.sender_id == @sender_id, do: "background-color: Maroon; color: white;", else: "background-color: Gainsboro;"}
      border-radius: 0.6rem; padding: 1rem;"}>
        <.message_details message={message} sender_id={@sender_id} />
      </div>
      </div>
    </div>
    """
  end

  def message_details(assigns) do
    ~H"""
    <.message_meta message={@message} sender_id={@sender_id} />
    <.message_content message={@message} />
    """
  end


  @doc """
    Renders user information (email) on top of the message.
  """
  def message_meta(assigns) do
    ~H"""
    <div class="message-meta flex-start" style="width: 100%;">
      <p class="bold">
      <%= if @message.sender do %>
        <%= if @sender_id == @message.sender.id do %>
          You
        <% else %>
          {@message.sender.email}
        <% end %>
       <% else %>
        Guest
     <% end %>
      <span style="font-weight: 300; margin-left: 0.3rem;">[{@message.inserted_at}]</span>
      </p>
    </div>
    """
  end

  @doc """
   Renders content of the message
  """
  def message_content(assigns) do
    ~H"""
    <p class="flex-start" style="width: 100%; text-align: left;"> {@message.content} </p>
    """
  end
end
