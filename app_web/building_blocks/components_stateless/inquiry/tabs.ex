defmodule AppWeb.Inquiry.Tabs do

  @moduledoc """
  A reusable component for displaying navigational tabs in the inquiries section.

  ## Overview

  The `Tabs` component renders a tabbed navigation menu, allowing users to switch between different sections of inquiries, such as "All Inquiries," "Contact Form," and "Live Chat."
  It uses handle_event function to update the current tab dynamically.

  ## Attributes

  - `:current_tab` (required): Specifies the currently active tab. Must be one of `"all"`, `"contact_form"`, or `"live_chat"`.
  - `:style` (optional): A map for custom inline styles:
    - `:main`: Styles applied to the main container of the tabs. Defaults to an empty string.
    - `:tab`: Styles applied to each individual tab link. Defaults to an empty string.

  ## Tabs

  The component renders three tabs:
  - **All Inquiries**: Displays all inquiries.
  - **Contact Form**: Displays inquiries submitted via the contact form.
  - **Live Chat**: Displays inquiries received through live chat.

  ## Usage

  <.tabs
    current_tab="all"
    style=%{main: "margin-bottom: 2rem;", tab: "font-size: 1rem;"}
  />
  """

  use AppWeb, :html


  attr :current_tab, :string, required: true
  attr :style, :map, default: %{main: "", tab: ""}

  def tabs(assigns) do
    ~H"""
    <style>
      .tabs-container {
        margin-top: 2rem;
      }

      .tabs-nav {
        border-bottom: 0.06rem solid lightgray;

        & nav {
          display: flex;
          gap: 2rem;
          margin-bottom: -0.06rem;
        }
      }

      .tab-link {
        padding: 0.25rem 0.5rem 1rem;
        border-bottom: 0.2rem solid transparent;
        font-size: 0.875rem;
        font-weight: 500;
        color: gray;
        text-decoration: none;

        &:hover:not(.active) {
          color: darkgray;
          border-bottom-color: lightgray;
        }

        &.active {
          color: indigo;
          border-bottom-color: indigo;
        }
      }
    </style>

    <div class="tabs-container" style={@style.main}>
      <div class="tabs-nav">
        <nav>
        <.link
            patch={~p"/satcom/admin/inquiries?tab=all"}
            class={["tab-link", @current_tab == "all" && "active"]}
            style={@style.tab}
          >
            All Inquiries
          </.link>

          <.link
            patch={~p"/satcom/admin/inquiries?tab=contact_form"}
            class={["tab-link", @current_tab == "contact_form" && "active"]}
            style={@style.tab}
          >
            Contact Form
          </.link>

          <.link
            patch={~p"/satcom/admin/inquiries?tab=live_chat"}
            class={["tab-link", @current_tab == "live_chat" && "active"]}
            style={@style.tab}
          >
            Live Chat
        </.link>
        </nav>
      </div>
    </div>
    """
  end
end
