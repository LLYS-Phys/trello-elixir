defmodule AppWeb.Banner do
  @moduledoc """
    This component controls all banners added by product managers in admin panel. It is added in root.html.heex
  """

  use AppWeb, :html

  attr :class, :string, default: nil
  attr :data, :map, default: %{banner: nil, current_user: nil}

  def banner(assigns) do
    ~H"""
    <style>
      .stateless_comp.banner { width: 100vw; height: 100vh; top: 0; left: 0; backdrop-filter: blur(0.3125rem);
        & .banner-modal { width: <%= if @data.banner.options_width, do: @data.banner.options_width, else: "80%" %>; height: <%= if @data.banner.options_height, do: @data.banner.options_height, else: "auto" %>; background-color: white; border: 0.125rem solid black; top: 10rem;
                          border-radius: 1rem; align-content: space-between; padding: 2rem;
          & .hidden{ display: none; }
          & .button-container { top: 1.5rem; right: 1.25rem;
            & button { border: none; border-radius: 0.5rem;
              &:hover { background-color: lightgray; }
              & span { height: 1.25rem; width: 1.25rem; }
            }
          }
          & .banner-text { font-size: 1.2rem; margin: 2rem 0; }
        }
      }
    </style>
    <.focus_wrap id={"banner-#{@class}"} class={"stateless_comp main banner layer4 fixed hidden #{@class}"} :if={@data.banner}>
      <%= if (@data.banner.customer_type == nil || (@data.current_user && @data.current_user.customer_type == @data.banner.customer_type)) && (Date.compare(Date.utc_today(), Date.add(elem(Date.from_iso8601(@data.banner.start_date),1), -1)) == :gt && Date.compare(Date.utc_today(),Date.add(elem(Date.from_iso8601(@data.banner.end_date),1), 1)) == :lt) do %>
        <div class="banner-modal fixed" style={@data.banner.style_main} id={"banner-modal-#{@class}"} phx-hook="CheckBannersCookies" data-cookie-name={String.replace(String.downcase(@data.banner.name), " ", "_")}>
          <div class="button-container layer3 absolute" style={@data.banner.style_btn_container}> <button style={@data.banner.style_button} phx-click={JS.add_class("hidden", to: "#banner-#{@class}")} type="button" aria-label={gettext("close")} onclick={"globFuncs.cookie.set('#{String.replace(String.downcase(@data.banner.name), " ", "_")}','closed' , 1, 'h');"}> <.icon name="hero-x-mark-solid" /> </button> </div>
            <h2 style={@data.banner.style_title}>{@data.banner.name}</h2>
            <p class="banner-text width100" style={@data.banner.style_text}>{@data.banner.text}</p>
            <div class="promotion-period" style={@data.banner.style_period_wrapper}>
              <p class="width100" style={@data.banner.style_peropd_first_line}>Active period for the promotion:</p>
              <p style={@data.banner.style_period_second_line}>From&nbsp;<span style={@data.banner.style_period_dates}>{@data.banner.start_date}</span>&nbsp;to&nbsp;<span style={@data.banner.style_period_dates}>{@data.banner.end_date}</span> </p>
            </div>
        </div>
      <% end %>
    </.focus_wrap>
    """
  end
end
