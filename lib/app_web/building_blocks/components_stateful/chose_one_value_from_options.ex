#......................................................... Purpose ...........................................................
# To chose and show a dynamic value from a few choices;
#								                .................... Render the component ....................
# Copy this to where you want to use it:
#			<.live_component module={AppWeb.ChoseOneValueFromOptionsComponent} id="choseonevaluefromoptions" />
#                               ..................... Notes & learnings ......................
# 1)  We need to use the "@myself"  so that the "phx-target" event inside a LiveComponent reaches the intenral "handle_event"
#     callback. Without it the "handle_event()" won't work, as it is an internal unique reference to this component instance;
# 2) We're dynamically creating the elements:
#     a) creating at the same time an "id" (based on the index position) that should be used to identify each block created;
#     b) making the index start at 1 instead of 0, the default (see: https://hexdocs.pm/elixir/Enum.html#with_index/2);
# 3) The checkbox will be checked only when the chosen value matches his value (including the value we have initialed it);
#                               ...................... Phx events used .......................
# Attached LiveView events:
#   a) "checking" - Change event attached to "form" element;
#.............................................................................................................................
defmodule AppWeb.ChoseOneValueFromOptionsComponent do
  use AppWeb, :live_component

  @impl true
  def mount(socket) do
    socket = assign(socket,
                    option: "email")   # dynamic value that will change due to interaction
    {:ok, socket}
  end

  attr :class, :string, default: nil
  attr :style, :map, default: %{main: "", text: "", inputsWrap: "", inputWrap: "", input: "", label: "", choice: ""}
  attr :config, :map, default: %{type: "legend"}  # options: %{type: "legend/title"}
  attr :options, :map, default: %{text: "Please select your preferred contact method:"}
  attr :data, :list, default: [%{name: "email", styleInput: "", styleLabel: ""}, %{name: "phone", styleInput: "", styleLabel: ""},
                               %{name: "mail", styleInput: "", styleLabel: ""}]
  @impl true
  def render(assigns) do
    ~H"""
    <div>
      <style>
        .stateful_comp.choseOneValueFromOptions {
          & .text { color: white; font-size: 2.5rem; }
          & input { margin-right: 0.25rem; }
          & label { color: orange; }
          & .choice { color: orange; }
        }
      </style>
      <div class={"stateful_comp main choseOneValueFromOptions #{@class}"} style={@style.main}>
        <form phx-change="checking" phx-target={@myself}>                                                                       <%#(1)%>
          <fieldset >
                                              <%= if @config.type == "legend" do %>
            <legend class="text" style={@style.text}>{@options.text}</legend>
                                                            <% end %>
                                              <%= if @config.type == "title" do %>
            <div class="text" style={@style.text}>{@options.text}</div>
                                                            <% end %>
            <div class="inputsWrap width100 space-evenly" style={@style.inputsWrap}>
                <%= for {i, id} <- Enum.with_index(@data,1) do %>                                                               <%#(2a,b)%>
              <div class="inputWrap" style={@sztyle.inputWrap}>
                <input class={"input#{id}"} type="radio" id={"choseonevaluefromoptionsinput#{id}"} name="option" value={i.name} #(2)
                    checked={ i.name == @option}                                                                               #(3)
                    style={"#{i.styleInput}#{@style.input}"}/>
                <label class={"label#{id}"} for={"choseonevaluefromoptionsinput#{id}"} style={"#{i.styleLabel}#{@style.label}"}>
                  {i.name}
                </label>
              </div>
                <% end %>
            </div>
            <div class="choice" style={@style.choice}>Your choice is: {@option}</div>
          </fieldset>
        </form>
      </div>
    </div>
    """
  end

  @impl true
  def handle_event("checking", %{"option" => option}, socket) do
    socket = assign(socket, option: option)
    {:noreply, socket}
  end
end
