defmodule AppWeb.Inquiry.ChannelSelector do

  @moduledoc """
  A component that renders a channel selection interface for the live chat system.

  This component provides two options for users to choose from:
  - General Support: For general issues and product questions
  - Sales Support: For pricing and purchase-related inquiries

  ## Usage

  <.channel_selector />

  The component emits a "select_channel" event with the selected channel value
  when a user clicks on either option. The event payload includes:
  - `channel`: Either "support" or "sales"

  ## Example with event handling:

  ```elixir
  def handle_event("select_channel", %{"channel" => channel}, socket) do
    {:noreply, assign(socket, :channel, channel)}
  end
  ```
  """

  use AppWeb, :html

  def channel_selector(assigns) do
    ~H"""
    <style>
      .channel-selector {
        & .container { padding: 0.75rem 1rem; }

        & .title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        & .options {
          width: 100%;
          gap: 0.75rem;
        }

        & .option-button {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.5rem;
          border-width: 0.12rem;
          border-style: solid;
          transition: all 0.3s;

          &.support {
            border-color: LightSkyBlue;
            &:hover {
              border-color: RoyalBlue;
              background-color: AliceBlue;
            }
          }

          &.sales {
            border-color: LightGreen;
            &:hover {
              border-color: MediumSeaGreen;
              background-color: Honeydew;
            }
          }
        }

        & .button-content {
          align-items: flex-start;
          gap: 0.75rem;
        }

        & .icon-wrapper {
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: background-color 0.3s;

          &.support {
            background-color: LightSkyBlue;
            & svg { color: RoyalBlue; }
          }

          &.sales {
            background-color: LightGreen;
            & svg { color: SeaGreen; }
          }
        }

        & .option-title {
          font-weight: 600;
          font-size: 1.2rem;
          margin-bottom: 0.25rem;

          &.support { color: DarkBlue; }
          &.sales { color: DarkGreen; }
        }

        & .option-description {
          font-size: 0.85rem;

          &.support { color: rgba(65, 105, 225, 0.75); } /* opacity */
          &.sales { color: rgba(46, 139, 87, 0.75); }    /* opacity */
        }

        & .chevron {
          transition: transform 0.3s;

          &.support { color: CornflowerBlue; }
          &.sales { color: MediumSeaGreen; }
        }

        & .option-button:hover .chevron {
          transform: translateX(0.25rem);
        }

        & .footer-text {
          color: Gray;
          font-size: 0.75rem;
          margin-top: 1rem;
        }
      }
    </style>

    <div class="channel-selector">
      <div class="container">
        <h2 class="title">How can we help you today?</h2>

        <div class="options">
          <button class="option-button support" phx-click="select_channel" phx-value-channel="support">
            <div class="button-content">
              <div class="icon-wrapper support">
                <.icon name="hero-chat-bubble-left-right" />
              </div>
              <div class="text-content" style="flex: 1;">
                <h3 class="option-title support">General Support</h3>
                <p class="option-description support">Get help with general issues</p>
              </div>
              <.icon name="hero-chevron-right" class="chevron support"/>
            </div>
          </button>

          <button class="option-button sales" phx-click="select_channel" phx-value-channel="sales">
            <div class="button-content">
              <div class="icon-wrapper sales">
                <.icon name="hero-currency-dollar" />
              </div>
              <div class="text-content" style="flex: 1;">
                <h3 class="option-title sales">Sales Support</h3>
                <p class="option-description sales">Questions about pricing and purchases</p>
              </div>
              <.icon name="hero-chevron-right" class="chevron sales"/>
            </div>
          </button>
        </div>

        <p class="footer-text">Our team typically responds in a few minutes</p>
      </div>
    </div>
    """
  end

end
