defmodule AppWeb.ChatBox do
  @moduledoc """
      A component that used in the client side live chat. Renders message form component as inner_block.

      Example usage:
          <.chat_box room={@room} messages={@messages} user_id={@guest_id}>
          <.live_component
            module={AppWeb.Chat.Guest.MessageForm}
            id={:message_form}
            user_id={@guest_id}
            room={@room}
          />
      </.chat_box>
  """

  use AppWeb, :html
  alias Phoenix.LiveView.JS
  import AppWeb.StatelessCompLoading
  import AppWeb.Inquiry.ChannelSelector

  use AppWeb, :verified_routes

  attr :room, :map
  attr :messages, :map
  attr :user_id, :integer
  attr :channel, :string
  slot :inner_block, required: true

  attr :style, :map,
    default: %{
      header_background: "red",
      header_color: "white"
    }

  def chat_box(assigns) do
    ~H"""
    <style>
      .stateless_comp.main.chat {
        & .chat-box { bottom: -100vh; right: 1.25rem; background-color: white; border-radius: 0.6rem; z-index: 1;
                      max-width: 22rem; transition: bottom 0.5s; border-bottom: 0.125rem solid LightGray;
          &.active { bottom: 1.25rem; display: unset; }
        }
        & .chat-box-header { width: 100%; margin-bottom: 1.25rem; border-top-left-radius: 0.6rem; border-top-right-radius: 0.6rem;
                          background-color: <%= @style.header_background %>; color: <%= @style.header_color %>; padding: 0 0.5rem; margin-bottom: 1.25rem;
                          background-color: <%= @style.header_background %>; color: <%= @style.header_color %>; padding: 0 1rem; }
        & .chat-box-body { height: 18.75rem; width: 21.75rem; overflow-y: auto; padding: 0 1rem; height: 18.75rem; width: 21.75rem; overflow-y: auto; padding: 0 1rem; }
        & .chat-message { margin-bottom: 1.25rem; width: 100%; word-break: break-word; justify-content: flex-start;
          & .timestamp { color: gray; width: 100%; margin-left: 0.3rem; }
        }
        & .chat-message-content { border-radius: 0.6rem;
          & .text { border-radius: 0.6rem; padding: 0.6rem 0.6rem; text-align: left; }
        }
        & .chat-box-footer { width: 100%; margin-top: 1rem; padding-bottom: 1rem; gap: 0.6rem; border-top: 0.125rem solid rgb(242, 245, 248); margin-top: 1rem; gap: 0.6rem;
          & .info-message { bottom: 4.0rem; right: 0; width: 100%; justify-content: center; background-color: red; color: white; }
          & input { padding: 0.6rem; border-radius: 0.3rem; padding: 0.6rem; border-radius: 0.3rem; }
          & button { border: none; border: none; padding: 0.6rem 1rem; }
        }
      }
    </style>
    <div class="stateless_comp main chat layer4">
    <div class="chat-box fixed">
      <div class="chat-box-header space-between">
        <h4>  <img src={~p"/images/chat-header-logo.png"} style="margin-right: 0.5rem;" /> Chat </h4>
        <button style="border: none;" phx-click={JS.remove_class("active", to: ".chat-box")}>
            <.icon name="hero-x-mark-solid"  />
        </button>
      </div>
      <.channel_selector :if={@channel == nil and @room == nil}/>
      <div :if={@channel != nil or @room != nil} class="chat-box-body content-start" phx-hook="ScrollToBottom" id="chat-box-body">
        <div class="chat-message flex-start">
          <div class="chat-message-content">
            <p style="background-color: lightBlue; padding: 0.6rem 0.6rem; border-radius: 0.6rem; ">Please write your inquiry, An Agent will be joining soon.</p>
          </div>
        </div>
        <div :for={message <- @messages} class="chat-message" >
          <div class="chat-message-title flex-start bold" style="width: 100%; margin-bottom: 0.4rem;">
            <p> <%= if message.sender_id == @user_id or message.guest_id == @user_id do %> You <% else %> Agent <% end %> </p>
          </div>
          <div class="chat-message-content flex-start">
            <p class="text" style={
              if message.sender_id == @user_id or message.guest_id == @user_id do
                  "background-color: Gainsboro;  "
              else
                  "background-color: red; color: white;"
              end
            }  >{message.content}</p>
            <p class="timestamp flex-start">{format_timestamp(message.inserted_at)}</p>
          </div>
        </div>
      </div>
        <p :if={@room != nil and @room.status == "closed"} style="padding: 1rem 1rem"> Conversation is ended </p>
        <div :if={@room == nil or @room.status != "closed"} class="chat-box-footer relative">
          <div class="info-message absolute" :if={@room != nil and @room.status == "open"}>
            <p> Waiting an agent to join... <.stateless_comp_loading_arrowBlink class="icon"
              style={%{main: "", left: "height: 0.5rem; width: 0.5rem; background-color: white;", middle: "height: 0.5rem; width: 0.5rem; background-color: white;", right: "height: 0.5rem; width: 0.5rem; background-color: white;"}}/>
            </p>
          </div>
        {render_slot(@inner_block)}
        </div>
      </div>
    </div>
    """
  end

  defp format_timestamp(timestamp) do
    time = NaiveDateTime.to_time(timestamp)
    "#{pad_leading(time.hour)}:#{pad_leading(time.minute)}"
  end

  defp pad_leading(number) when number < 10 do
    "0#{number}"
  end

  defp pad_leading(number) do
    Integer.to_string(number)
  end
end
