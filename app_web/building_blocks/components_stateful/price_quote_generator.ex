#......................................................... Purpose ...........................................................
# To chose and show a dynamic value from a range of values;
#								                .................... Render the component ....................
# Copy this to where you want to use it:
#	  	<.live_component module={AppWeb.PriceQuoteGeneratorComponent} id="pricequotegenerator" />
#                               ..................... Notes & learnings ......................
# 2)  We need to use the "@myself"  so that the "phx-target" event inside a LiveComponent reaches the intenral "handle_event"
#     callback. Without it the "handle_event()" won't work, as it is an internal unique reference to this component instance;
# 3) We're dynamically creating the elements:
#     a) creating at the same time an "id" (based on the index position) that should be used to identify each block created;
#     b) making the index start at 1 instead of 0, the default (see: https://hexdocs.pm/elixir/Enum.html#with_index/2);
# 4) We need to use "debounce" on the input otherwise when we would try to manually insert a value and first delete the default
#    number it would crash as it would consider the empty string value. This way it allow us 1 second to delete and insert a
#    value before try to comute it;
# 5) As our data structure is a {MAP} we need to use this function to update it and we need to do it as many times as the
#    elements in the tuple. NOTE that the first time we get the date structure from the "assigns" and then from the variable
#    we're creating to modify it;
# 6) We need to make sure we're using an integer as from the client input we receive a "string";
# 7) We need to have standard names that are not configurations so that every input name matches in the pattern match in the
#    handle_event callback;
# 8) We're using a function to calculate the final price and the function is defined in the "aux Funcs below. NOTE that for
#    now we're considering 3 "dims" and if more or less are created when instanciating the component then we need to update;
#                               ...................... Phx events used .......................
# Attached LiveView events:
#   a) "calAux" - change event attached to "form" and that is triggered on every change of any "input" value;
#   b) "calPrice" - click event attached to "button";
#.............................................................................................................................
defmodule AppWeb.PriceQuoteGeneratorComponent do
  use AppWeb, :live_component

  @impl true
  def mount(socket) do
    socket = assign(socket,
                    auxCalc: 0,                                          # auxiliary value that will change due to interaction
                    price: nil,                                          # value that will change due to interaction
                    values: %{"dim1" => 0, "dim2" => 0, "dim3" => 0})    # value that will change due to interaction
    {:ok, socket}
  end

  attr :class, :string, default: nil
  attr :style, :map, default: %{main: "", title: "", form: "", inputsWrap: "", inputExtWrap: "", inputExtWrap1: "",
                                inputExtWrap2: "", inputExtWrap3: "", label: "", label1: "", label2: "", label3: "", inputWrap: "",
                                inputWrap1: "", inputWrap2: "", inputWrap3: "", input: "", input1: "", input2: "", input3: "",
                                unit: "", unit1: "", unit2: "", unit3: "", auxMessage: "", button: "", quote: ""}
  attr :options, :map, default: %{title:  "Build a sandbox ", auxMessage: nil, buttonText: "Get a quote",
                                  quote: "Get your personal beach today for: "}
  attr :data, :map, default: %{dimNames: ["length", "width", "heigth"]}
  @impl true
  def render(assigns) do
    ~H"""
    <div>
      <style>
        .priceQuoteGenerator { flex: 25rem;
          & .title { font-size: 2.5rem; }
          & .inputWrap { border: 0.1rem solid grey; border-radius: 0.3rem; }
          & input { max-width: 5rem; }
          & .unit {width: 5rem; margin-right: 0.5rem; }
          & .auxMessage { margin: 0.5rem; }
          & .quote { border-style: dotted dashed solid double; padding: 0.5rem; }
        }
      </style>
      <div class={"stateful_comp main priceQuoteGenerator #{@class}"} style={@style.main}>
        <div class="title" style={@style.title}>{@options.title}</div>
        <form phx-change="calcAux" phx-submit="calPrice" phx-target={@myself} class="width100" style={@style.form}>                            <%#(2)%>
          <div class="inputsWrap" style={@style.inputsWrap}>
              <%= for {i, id} <- Enum.with_index(@data.dimNames,1) do %>                                                      <%#(3a,b)%>
            <div class={"inputExtWrap item#{id}"} style={"#{@style.inputExtWrap}#{@style["inputExtWrap#{id}"]}"}>
              <label for={"dim#{id}"} class="width100" style={"#{@style.label}#{@style["label#{id}"]}"}>                                       <%#(7)%>
                {i}
              </label>
              <div class={"inputWrap item#{id}"}  style={"#{@style.inputWrap}#{@style["inputWrap#{id}"]}"}>
                <input phx-debounce="1000" type="number" min="1" step="1" name={"dim#{id}"} value={@values["dim#{id}"]}
                       class={"input#{id}"} style={"#{@style.input}#{@style["input#{id}"]}"}/>
                <div class={"unit unit#{id}"} style={"#{@style.unit}#{@style["unit#{id}"]}"}>{i}</div>
              </div>
            </div>
              <% end %>
          </div>
          <div class="auxMessage width100" style={"#{@style.auxMessage}"}>
            <%= @options[:auxMessage] || "You need #{@auxCalc} Kg of sand" %>
          </div>
          <button type="submit" class={"#{if @auxCalc !== 0 do "hoverActive" else "hoverNonActive" end}"} style={@style.button}><% #{6)%>
            {@options.buttonText}
          </button>
        </form>
        <div :if={@price} class="quote" style={@style.quote}>
          {@options.quote}{@price} EURO
        </div>
      </div>
    </div>
    """
  end

  @impl true
  def handle_event("calcAux", %{ "dim1" => val1, "dim2" => val2, "dim3" => val3}, socket) do                                  #(7)
    val1 = String.to_integer(val1)                                                                                            #(6)
    val2 = String.to_integer(val2)                                                                                            #(6)
    val3 = String.to_integer(val3)                                                                                            #(6)
    val1 = if val1 > 0 do val1 else 0 end # to prevent negative calculations on auxCalc if negative numbers are inserted manually
    val2 = if val2 > 0 do val2 else 0 end # to prevent negative calculations on auxCalc if negative numbers are inserted manually
    val3 = if val3 > 0 do val3 else 0 end # to prevent negative calculations on auxCalc if negative numbers are inserted manually
    auxCalc = if (val1 > 0 && val2 > 0 && val3 > 0) do val1+val2+val3 else 0 end # to prevent auxCalc if any of the values is 0
    values = Map.replace(socket.assigns.values, "dim1", val1)                                                                 #(5)
    values = Map.replace(values, "dim2", val2)                                                                                #(5)
    values = Map.replace(values, "dim3", val3)                                                                                #(5)
    socket = assign(socket, auxCalc: auxCalc, values: values,
                    price: nil) # we do this to hide the quote when changing the dimension and waiting for a new calculation
    {:noreply, socket}
  end

  def handle_event("calPrice", _params, socket) do
    socket = assign(socket, price: calcPrice(socket.assigns.values))                                                          #(8)
    {:noreply, socket}
  end

  #                                                   Aux Functions
  defp calcPrice(%{"dim1" => val1, "dim2" => val2, "dim3" => val3}) do
    val1+2*val2+val3
  end

end
