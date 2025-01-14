defmodule AppWeb.Tooltip do
  @moduledoc """
  Calling the component:
    <.tooltip class="" style={%{wrapper: "", main: "", tooltip: ""}} options={%{position: "top", arrow_position: "center", color: "white", bg_color: "rgb(85, 85, 85)", box_shadow: "", hover_zoom: "1.1", cursor: "help"}} data={[%{letter: "P", text: "Phoenix Framework"}, %{letter: "E", text: "Elixir"}, %{letter: "T", text: "Tailwind CSS"}, %{letter: "A", text: "Alpine.js"}, %{letter: "L", text: "Liveview"}]}/>

    Additional comments:
      - You can pass only "top" and "bottom" to options.position
      - You can pass only "left", "right" and "center" to options.arrow_position
  """

  use AppWeb, :html
  use AppWeb, :verified_routes

  attr :class, :string, required: true
  attr :options, :map, default: %{position: "top", arrow_position: "center", color: "white", bg_color: "rgb(85, 85, 85)", box_shadow: "", hover_zoom: "1.1", cursor: "help"}
  attr :data, :list, default: [%{letter: "P", text: "Phoenix Framework"}, %{letter: "E", text: "Elixir"}, %{letter: "T", text: "Tailwind CSS"}, %{letter: "A", text: "Alpine.js"}, %{letter: "L", text: "Liveview"}]
  attr :style, :map, default: %{main: "", wrapper: "", tooltip: ""}

  def tooltip(assigns) do
    ~H"""
    <style>
      .stateless_comp.main.tooltip div { transition: transform .2s; cursor: <%= @options.cursor %>; padding: 0.5rem;
        &:hover { transform: scale(<%= @options.hover_zoom %>); transition: transform .2s;
          & .tooltip-text { visibility: visible; opacity: 1; transition: opacity 1s; }
        }
        & .tooltip-text { width: max-content; visibility: hidden; padding: 1rem; border-radius: 0.5rem; left: 0; opacity: 0; transition: opacity 0.3s;
                          color: <%= @options.color %>; background-color: <%= @options.bg_color %>; <%= if @options.box_shadow != "", do: "box-shadow: @options.box_shadow;" %> }
        & .tooltip-text:before { content: ""; position: absolute; left: var(--arrow-position); border-width: 0.5rem; border-color: <%= @options.bg_color %> transparent transparent transparent;
                                 transition: opacity 1s;  top: var(--top); bottom: var(--bottom); transform: rotate(var(--rotate)); }
      }
    </style>
    <div class="stateless_comp main tooltip" id={"tooltip-" <> @class} phx-hook="Tooltip" style={@style.wrapper}>
      <%= for {i, id} <- Enum.with_index(@data,1) do %>
        <div class={"tooltip#{id}"} data-position={@options.position} data-hover-zoom={@options.hover_zoom} style={"#{@style.main} --arrow-position: #{if @options.arrow_position == "left", do: "25%", else: (if @options.arrow_position == "right", do: "80%", else: (if @options.arrow_position == "center", do: "50%"))}"}>
          {i.letter} <span class={"tooltip-text tooltip-text#{id} layer1 absolute"} style={@style.tooltip}> {i.text} </span>
        </div>
      <% end %>
    </div>
    """
  end
end
