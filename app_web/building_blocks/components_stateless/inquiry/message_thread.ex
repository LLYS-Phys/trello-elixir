defmodule AppWeb.Inquiry.MessageThread do

  @moduledoc """
  Component that renders a message thread interface with support for incoming
  and outgoing messages in Inquiry Details Admin Page.

  This component provides a complete chat interface including:
  - A scrollable message container
  - Message bubbles with avatars
  - Timestamp and sender information
  - A message input area with a send button as inner_block

  """

  use AppWeb, :html

  attr :inquiry, :map, required: true
  attr :current_user, :map, required: true
  attr :style, :map, default: %{main: "", outgoing_message: "", incoming_message: ""}
  slot :inner_block

  def message_thread(assigns) do
    ~H"""
    <style>
    .message-thread {
      gap: 1rem;
      width: 100%;

      & .messages-container {
        gap: 1rem;
        max-height: 35rem;
        min-height: 15rem;
        overflow-y: auto;
        padding: 1rem 1rem;
        width: 100%;
        align-content: flex-start;
      }

      & .message {
        width: 100%;
        gap: 0.75rem;

        & .message-avatar {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background: gainsboro;
        }

        & .message-content-wrapper { width: calc(100% - 3.25rem); justify-content: flex-start; }

        & .message-header {
          width: 100%;
          justify-content: flex-start;
          gap: 0.5rem;
          margin-bottom: 0.25rem;
        }

        & .message-author { color: dimgray; }

        & .message-time { color: gray; }

        & .message-bubble {
          background-color: ghostwhite;
          padding: 0.75rem 1rem;
          border-radius: 1rem 1rem 1rem 0;
          color: dimgray;
        }

        &.outgoing {
          flex-direction: row-reverse;
          & .message-content-wrapper {
            justify-content: flex-end;
          }

          & .message-header { justify-content: flex-end;}

          & .message-bubble {
            background-color: blue;
            color: white;
            border-radius: 1rem 1rem 0 1rem;
          }
        }
      }

      & .message-input-wrapper {
        width: 100%;
        margin-top: 1rem;
        border-top: 0.063rem solid gainsboro;
        padding-top: 1rem;
        gap: 1rem;

        & .message-input {
          width: 80%;
          padding: 0.75rem 1rem;
          border: 0.063rem solid gainsboro;
          border-radius: 0.375rem;
          margin: 0.3rem;
          color: dimgray;
        }

        & .send-button {
          padding: 0.75rem 1.5rem;
          background: blue;
          border: none;
        }
      }
    }
    </style>

    <div class="message-thread">
      <div class="messages-container" style={@style.main} id={"messages-container-#{@inquiry.id}"} phx-hook="ScrollToBottom" id="chat-content">
          <div :for={message <- @inquiry.messages} class={"message #{if is_outgoing_message?(@current_user, message), do: "outgoing"}"}
               id={"message-#{message.id}"}
               style={if is_outgoing_message?(@current_user, message), do: @style.outgoing_message}>
            <div class="message-avatar">
              <.icon name="hero-user" style="color: gray;" />
            </div>
            <div class="message-content-wrapper">
              <div class="message-header">
                <span class="message-author">
                  {get_author_name(message)}
                </span>
                <span class="message-time">
                  {format_message_time(message.inserted_at)}
                </span>
              </div>
              <div class="message-bubble">{message.content}</div>
            </div>
          </div>
      </div>
      {render_slot(@inner_block)}
    </div>
    """
  end

  defp is_outgoing_message?(current_user, message) do
    case message do
      %{sender_id: sender_id} when not is_nil(sender_id) ->
        sender_id == current_user.id
      _ ->
        message.guest_email == current_user.email
    end
  end

  def get_author_name(message) do
    cond do
      is_map(message.sender) and not is_struct(message.sender, Ecto.Association.NotLoaded) and Map.get(message.sender, :email) ->
        message.sender.email
      not is_nil(message.guest_email) ->
        message.guest_email
      message.message_type == "agent_message" ->
        "Agent"
      true ->
        "Guest"
    end
  end
  def format_message_time(datetime) do
    Calendar.strftime(datetime, "%H:%M")
  end

end
