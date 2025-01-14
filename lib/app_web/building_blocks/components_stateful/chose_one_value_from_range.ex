#......................................................... Purpose ...........................................................
# To chose and show a dynamic value from a range of values;
#								                .................... Render the component ....................
# Copy this to where you want to use it:
#	  	<.live_component module={AppWeb.ChoseOneValueFromOptionsComponent} id="choseonevaluefromoptionsOne" />
#                               ..................... Notes & learnings ......................
# 2)  We need to use the "@myself"  so that the "phx-target" event inside a LiveComponent reaches the internal "handle_event"
#     callback. Without it the "handle_event()" won't work, as it is an internal unique reference to this component instance;
# 3) We need to import all these components as we use some of them in our pages;
# 4)  Passing the ".hoverActive" class from th "app.css" file if the value of the meter is not "min" or "max", situation where
#     we don't want the buttons to work;
# 5)  All the "buttons" have the same "style";
# 6)  Protection to limit the value to be between the "min" and "max" values (see: https://hexdocs.pm/elixir/Kernel.html#max/2).
#     Note that:
#     a) We're using the "update()" function instead of the "assign()" function. We could instead use:
#                              socket = assign(socket, value: max(socket.assigns.value - socket.assigns.step,socket.assigns.min))
#     b) We're using the "&" notation for the anonymous function, but we could instead use:
#                              f(x) -> max(x - socket.assigns.step,socket.assigns.min)
# 7) For more fine grained styling of the meter read: https://www.hongkiat.com/blog/style-html5-meter;
# 8) We need to make sure we're using an integer as from the client input we receive a "string";
#                               ...................... Phx events used .......................
# Attached LiveView events:
#   a) "off" - Click event attached to ".buttonOff";
#   b) "dec" - Click event attached to ".buttonDec";
#   c) "inc" - Click event attached to ".buttonInc";
#   d) "on" - Click event attached to ".buttonOn";
#   e) "inputUpdate" - event associated with the input range;
#.............................................................................................................................
defmodule AppWeb.ChoseOneValueFromRangeComponent do
  use AppWeb, :live_component

  import AppWeb.SvgIcons                                                                                                      #(3)

  @impl true
  def mount(socket) do
    socket = assign(socket,
                    value: 20)  # dynamic value that will change due to interaction
    {:ok, socket}
  end

  @minValueMeter 0              # variable that is used in "handle_events" but doesn't change during interaction
  @stepValueMeter 10            # variable that is used in "handle_events" but doesn't change during interaction
  @maxValueMeter 100            # variable that is used in "handle_events" but doesn't change during interaction

  attr :class, :string, required: true
  attr :style, :map, default: %{main: "", title: "", wrap: "", label: "", meter: "", form: "", input: "", controls: "", button: ""}
  attr :config, :map, default: %{type: "meter" }  # options: %{type: "meter/range"}
  attr :options, :map, default: %{title: "Light is at ", min: 0, max: 100, meterLowValue: 25, meterHighValue: 75, meterLowColor: "red",
                                  meterHighColor: "orange", meterOptimumColor: "green", meterTrans: "1"}
  def render(assigns) do
    ~H"""
    <div>
      <style>
        .stateful_comp.choseOneValueFromRange {
          & .title { font-size: 2.5rem; }
          & label { color: white; }
          & button { width: 2.5rem; height: 2.5rem; border: thin solid red; margin: 1rem; font-size: 2.5rem; border-radius: 50%; }
        }
                                      <%= if @config.type == "meter" do %>                                                    #(7)
        #dimMeter<%=@class%> {
          &::-webkit-meter-optimum-value, &:-moz-meter-optimum::-moz-meter-bar {background: <%= @options.meterOptimumColor %>}
          &::-webkit-meter-suboptimum-value, &:-moz-meter-sub-optimum::-moz-meter-bar {background: <%= @options.meterHighColor %>}
          &::-webkit-meter-even-less-good-value, &:-moz-meter-sub-sub-optimum::-moz-meter-bar {background: <%= @options.meterLowColor %>}
          &::-webkit-meter-optimum-value, &::-webkit-meter-suboptimum-value, &::-webkit-meter-even-less-good-value, &:-moz-meter-optimum::-moz-meter-bar,
          &:-moz-meter-sub-optimum::-moz-meter-bar, &:-moz-meter-sub-sub-optimum::-moz-meter-bar { transition: <%= @options.meterTrans %>s width; }
        }
                                      <% end %>

      </style>z
      <div class={"stateful_comp main choseOneValueFromRange #{@class}"} style={@style.main}>
        <div class="title" style={@style.title}>{@options.title}{@value}%</div>
        <div class="wrap relative width100" style={@style.wrap}>
                                              <%= if @config.type == "meter" do %>
          <label for={"dimMeter#{@class}"} class="absolute" style={@style.label}>{@value}%</label>
          <meter id={"dimMeter#{@class}"} class="width50" value={@value} min={@options.min} low={"#{@options.meterLowValue}"}
              high={"#{@options.meterHighValue}"} max={@options.max} style={@style.meter}>
            {@value}
          </meter>
                                                            <% end %>
                                              <%= if @config.type == "range" do %>
          <form phx-change="inputUpdate" phx-target={@myself} class="width100" style={@style.form}>
            <input type="range" name="inputValue" value={@value} min={@options.min} max={@options.max} style={@style.input}>
          </form>
                                                            <% end %>
        </div>
        <div class="controls" style={@style.controls}>
          <button type="button" class={"button off #{unless @value == @options.min do "hoverActive" end}"}                    #(4)
                                phx-click="off" phx-target={@myself} style={@style.button}>                                   <%#(5)%>
            <.svg_lightbulb config={%{type: "off"}} style={%{main: "margin: 0;", inner: "", path1: "", path2: "", path3: "",
                                                             path4: "", path5: "", path6: "", path7: ""}}/>
          </button>
          <button type="button" class={"button dec #{unless @value == @options.min do "hoverActive" end}"}                    #(4)
                                phx-click="dec" phx-target={@myself} style={@style.button}>                                   <%#(5)%>
            -
          </button>
          <button type="button" class={"button inc #{unless @value == @options.max do "hoverActive" end}"}                    #(4)
                                phx-click="inc" phx-target={@myself} style={"#{@style.button}"}>                              <%#(5)%>
            +
          </button>
          <button type="button" class={"button on #{unless @value == @options.max do "hoverActive" end}"}                     #(4)
                                phx-click="on" phx-target={@myself} style={@style.button}>                                    <%#(5)%>
            <.svg_lightbulb  style={%{main: "margin: 0;", inner: "", path1: "", path2: "", path3: "", path4: "", path5: "",
                                      path6: "", path7: ""}}/>
          </button>
        </div>
      </div>
    </div>
    """
  end

  @impl true
  def handle_event("off", _params, socket) do
    socket = assign(socket, value: @minValueMeter)
    {:noreply, socket}
  end

  @impl true
  def handle_event("dec", _params, socket) do
    socket = update(socket, :value, &max(&1 - @stepValueMeter, @minValueMeter))                                               #(6)
    {:noreply, socket}
  end

  @impl true
  def handle_event("inc", _params, socket) do
    socket = update(socket, :value, &min(&1 + @stepValueMeter, @maxValueMeter))                                               #(6)
    {:noreply, socket}
  end

  @impl true
  def handle_event("on", _params, socket) do
    socket = assign(socket, value: @maxValueMeter)
    {:noreply, socket}
  end

  def handle_event("inputUpdate", %{"inputValue" => value}, socket) do
    socket = assign(socket, value: String.to_integer(value))                                                                  #(8)
    {:noreply, socket}
  end
end
