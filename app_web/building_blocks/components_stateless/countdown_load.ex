defmodule AppWeb.CountdownLoad do
  @moduledoc """
    A component for a countdown effect before showing a specific page to the user
    Usage:
      Basic:
        <.countdown_load class="countdown_load_demo">
          INNER CONTENT
        </.countdown_load>
      With all options:
        <.countdown_load class="countdown_load_demo" style={%{main: "", countdown_wrapper: "", logo: "", logo_heading: "", timer: "", timer_static_text: "", timer_time: "", skip_container: "", skip_button: ""}} options={%{animation_seconds: 3, heading1: "Telespazio", heading2: "Germany", timer_static_text: "T-Minus", skip_text: "OR LAUNCH NOW", cookieTimeout: %{time: 1, unit: "min"}}} config={%{seconds: 5}}>
          INNER CONTENT
        </.countdown_load>
    Notes:
      - You need to wrap this component around the inner content of the page you want to display after the countdown
      - options.cookieTimeout.unit can be "min", "h", "d", "w", "m", "y"
  """

  use AppWeb, :html

  attr :attribs, :global
  attr :class, :string, default: nil
  attr :style, :map, default: %{main: "", countdown_wrapper: "", logo: "", logo_heading: "", timer: "", timer_static_text: "", timer_time: "", skip_container: "", skip_button: ""}
  attr :options, :map, default: %{animation_seconds: 3, heading1: "Telespazio", heading2: "Germany", timer_static_text: "T-Minus", skip_text: gettext("OR LAUNCH NOW"), cookieTimeout: %{time: 1, unit: "min"}}
  attr :config, :map, default: %{seconds: 5}
  slot :inner_block, required: true

  def countdown_load(assigns) do
    ~H"""
    <style>
      .stateless_comp.main.countdownLoad { position: initial;
        & .countdown { display: none; height: 100vh; width: 100vw; bottom: 0; transition: all <%= @options.animation_seconds %>s; overflow: hidden;
          & * { overflow: hidden; }
          & .logo { color: transparent;
            & * { font-size: 50rem; line-height: 0.75; transition: all <%= @options.animation_seconds/2 %>s; }
          }
          & .skip-container button { display: none; }
          &.active{ background-color: black; transition: all <%= @options.animation_seconds %>s;
            & .logo { color: white; transition: all <%= @options.animation_seconds %>s;
              & * { margin: 0; font-size: 8rem; line-height: 1.25; transition: all <%= @options.animation_seconds/2 %>s; }
            }
            & .timer { color: red; font-size: 3.5rem; margin-top: 2rem; }
            & .skip-container { margin-top: 1rem; animation: skipButtonPulse 1s infinite;
              & button { display: flex; background-color: red; color: white; border-radius: 2rem; padding: 1rem; }
            }
          }
        }
      }
      @keyframes skipButtonPulse {
        0% { transform: scale(1) } 25% { transform: scale(1.15) } 40% { transform: scale(1) } 55% { transform: scale(1.15) } 100% { transform: scale(1) } }
    </style>
    <div class={"stateless_comp main countdownLoad #{@class}"} {@attribs} style={@style.main} id={"countdown-#{@class}"} phx-hook="CountdownLoad" data-seconds={@config.seconds} data-animation-seconds={@options.animation_seconds} data-cookie-time={@options.cookieTimeout.time} data-cookie-units={@options.cookieTimeout.unit}>
      <div class="countdown active layer4 absolute" style={@style.countdown_wrapper}>
        <div class="logo width100" style={@style.logo}>
          <h1 class="width100" style={@style.logo_heading}>{@options.heading1}</h1>
          <h2 class="width100" style={@style.logo_heading}>{@options.heading2}</h2>
        </div>
        <div class="timer" style={@style.timer}>
          <span style={@style.timer_static_text}>{@options.timer_static_text}&nbsp;</span>
          <div class="time" style={@style.timer_time}> 00:00:0{@config.seconds}.000 </div>
        </div>
        <div class="skip-container width100" style={@style.skip_container}>
          <button class="skip-button" style={@style.skip_button}>{@options.skip_text}</button>
        </div>
      </div>
      {render_slot(@inner_block)}
    </div>
    """
  end
end
