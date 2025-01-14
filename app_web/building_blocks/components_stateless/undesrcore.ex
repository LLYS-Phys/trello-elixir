defmodule AppWeb.Underscore do
  @moduledoc """
    Calling the component:
      Basic call:
        <.underscore class="underscore"/>
      A call with all options:
        <.underscore class="underscore" config={%{type: "curved"/"circle"/"single"/"strike"}} style={%{main: "", text: ""}}, options={%{text_element_type: "h2", text_content: "Amazing", effect_action: "load", effect_duration: "2", stroke_color: "rgb(253, 190, 20)"}}/>

    Additional information:
      - config.type can take the options: "curved", "cicle", "single", "strike"
      - options.effect_action can take the options: "load", "hover"
  """
  use AppWeb, :html
  use AppWeb, :verified_routes

  attr :class, :string, required: true
  attr :config, :map, default: %{type: "curved"}
  attr :options, :map, default: %{text_element_type: "h2", text_content: "Amazing", effect_action: "load", effect_duration: "2", stroke_color: "rgb(253, 190, 20)"}
  attr :style, :map, default: %{main: "", text: ""}

  def underscore(assigns) do
    ~H"""
    <style>
      .stateless_comp.underscore-wrapper {
        & <%= @options.text_element_type %>{ margin: 0; }
        &.<%= @class %> svg {
          & path{ stroke: <%= @options.stroke_color %>; <%= if @options.effect_action != "load", do: "display: none;", else: "display: block;" %> }
          &.curved.loading path, &.single.loading path { animation: drawLine <%= @options.effect_duration%>s ease forwards; }
          &.curved.hovered path, &.single.hovered path{ animation: drawLine <%= @options.effect_duration %>s ease forwards; }
          &.circle.loading path, &.circle.hovered path { animation: drawCircle <%= @options.effect_duration %>s ease forwards; }
          &.strike.loading path, &.strike.hovered path { animation: drawStrikeUnder <%= @options.effect_duration %>s ease forwards; }
        }
        & svg{ top: 50%; left: 50%; width: calc(100% + 1rem); height: calc(100% + 1rem); transform: translate(-50%, -50%);
          & path { stroke-width: 0.25rem; fill: none; }
          &.curved path, &.single path { stroke-dasharray: 525; stroke-dashoffset: 500; }
          &.circle path { stroke-dasharray: 1325; stroke-dashoffset: 1300; }
          &.strike path { stroke-dasharray: 0 1500; opacity: 1; }
          &.active path { stroke-dashoffset: 0; stroke-dasharray: 0; display: flex; }
          &.hovered path{ display: flex; }
        }
      }
      @keyframes drawLine { from{ display: none; } to { stroke-dashoffset: 0; stroke-dasharray: 700; } }
      @keyframes drawCircle { to { stroke-dashoffset: 0; } }
      @keyframes drawStrikeUnder { to { stroke-dasharray: 1500; opacity: 1; } }
    </style>
    <div class={"stateless_comp main underscore-wrapper relative #{@class} type-#{@config.type}"} style={@style.main} id={"underscore-#{@class}"} phx-hook="UnderscoreHook" data-effect-action={@options.effect_action} data-effect-duration={@options.effect_duration}>
      <.dynamic_tag name={@options.text_element_type} class="underscore-text" style={@style.text}> {@options.text_content} </.dynamic_tag>
      <svg :if={@config.type=="curved"} class={"curved absolute #{@options.effect_action}"} viewBox="0 0 500 150" preserveAspectRatio="none"><path d="M3,146.1c17.1-8.8,33.5-17.8,51.4-17.8c15.6,0,17.1,18.1,30.2,18.1c22.9,0,36-18.6,53.9-18.6 c17.1,0,21.3,18.5,37.5,18.5c21.3,0,31.8-18.6,49-18.6c22.1,0,18.8,18.8,36.8,18.8c18.8,0,37.5-18.6,49-18.6c20.4,0,17.1,19,36.8,19 c22.9,0,36.8-20.6,54.7-18.6c17.7,1.4,7.1,19.5,33.5,18.8c17.1,0,47.2-6.5,61.1-15.6"></path></svg>
      <svg :if={@config.type=="circle"} class={"circle absolute #{@options.effect_action}"} viewBox="0 0 500 150" preserveAspectRatio="none"><path d="M325,18C228.7-8.3,118.5,8.3,78,21C22.4,38.4,4.6,54.6,5.6,77.6c1.4,32.4,52.2,54,142.6,63.7 c66.2,7.1,212.2,7.5,273.5-8.3c64.4-16.6,104.3-57.6,33.8-98.2C386.7-4.9,179.4-1.4,126.3,20.7"></path></svg>
      <svg :if={@config.type=="single"} class={"single absolute #{@options.effect_action}"} viewBox="0 0 500 150" preserveAspectRatio="none"><path d="M7.7,145.6C109,125,299.9,116.2,401,121.3c42.1,2.2,87.6,11.8,87.3,25.7"></path></svg>
      <svg :if={@config.type=="strike"} class={"strike absolute #{@options.effect_action}"} viewBox="0 0 500 150" preserveAspectRatio="none"><path d="M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.3-197.1,9"></path></svg>
    </div>
    """
  end
end
