#......................................................... Purpose ...........................................................
# To show dinamic values being updated at a specific rate;
#								                .................... Render the component ....................
# Copy this to where you want to use it:
#			<.live_component module={AppWeb.SalesDashboardComponent} id="salesdashboard" />
#                               ..................... Notes & learnings ......................
# 1) We need to import these components as we use them;
# 2) We need to use the "@myself"  so that the "phx-target" event inside a LiveComponent reaches the intenral "handle_event"
#    callback. Without it the "handle_event()" won't work, as it is an internal unique reference to this component instance;
# 3) Passing the ".hoverActive" class from th "app.css" file to have the same "active" effect in a working button;
# 4) We're making sure we're already in a liveview (2nd mount);
# 5) We're sending to this Live component a ":tick" message every second as we've defined in the "tick()" function below;
# 6) The "id" is this component's id;
# 7) As this is a Live Component we cannot have a "handle_info" function like we would in a LiveView. So, instead we need to
#    use the "send_update_after" function to send the update and then use these 2 clauses of the "update" function to receive it;
# 8) REMOVE in production!! Used to simulate data coming from an API or database;
#                               ...................... Phx events used .......................
# Attached LiveView events:
#   a) refresh -
#.............................................................................................................................
defmodule AppWeb.SalesDashboardComponent do
  use AppWeb, :live_component

  import AppWeb.SvgIcons                                                                                                      #(1)

  @impl true
  def mount(socket) do
    if connected?(socket) do                                                                                                  #(4)
        tick()                                                                                                                #(5)
      # if this would be a Liveview instead of LiveComponent we would do this instead: Process.send_after(self(), :tick, 1000)
    end
    socket = assign(socket,
                    num1: new_orders(),
                    num2: sales_amount(),
                    num3: satisfaction())
    {:ok, socket}
  end

  attr :class, :string, default: nil
  attr :style, :map, default: %{main: "", titleWrap: "", title: "", numWrap: "", num: "", numitem1: "", numitem2: "", numitem3: "",
                                data: "", dataitem1: "", dataitem2: "", dataitem3: "", label: "", labelitem1: "", labelitem2: "",
                                labelitem3: "", button: "" }
  attr :options, :map, default: %{title: "Snappy sales", label1: "New orders", label2: "Sales amount", label3: "Satisfaction"}

  @impl true
  def render(assigns) do
    ~H"""
    <div>
      <style>
        .salesDash.stateful_comp {
          & .titleWrap { flex-flow: row nowrap; }
          & h2 { margin-right: 1rem; }
          & .numWrap { margin: 1rem; padding: 1rem; border-radius: 0.5rem; background-color: lightgrey; }
          & .data { color: BlueViolet; font-size: 5.5rem; }
          & button { margin-right: 1rem; }
        }
      </style>
      <div class={"stateful_comp salesDash main flex-end #{@class}"} style={@style.main}>
        <div class="titleWrap width100" style={@style.titleWrap}>
          <h2 style={@style.title}>{@options.title}</h2>
          <.svg_barchart style={%{main: "flex: 0 1 4rem;", inner: nil, item1: nil, item2: nil, item3: nil, item4: nil}}/>
        </div>
        <div class="numWrap width100 space-evenly" style={@style.numWrap}>
          <div class="num item1" style={"#{@style.num}#{@style.numitem1}"}>
            <div class="data item1 width100" style={"#{@style.data}#{@style.dataitem1}"}>{@num1}</div>
            <div class="label item1" style={"#{@style.label}#{@style.labelitem1}"}>{@options.label1}</div>
          </div>
          <div class="num item2" style={"#{@style.num}#{@style.numitem2}"}>
            <div class="data item2 width100" style={"#{@style.data}#{@style.dataitem2}"}>{@num2}€</div>
            <div class="label item2" style={"#{@style.label}#{@style.labelitem1}"}>{@options.label2}</div>
          </div>
          <div class="num item3" style={"#{@style.num}#{@style.numitem3}"}>
            <div class="data item3 width100" style={"#{@style.data}#{@style.dataitem3}"}>{@num3}%</div>
            <div class="label item3" style={"#{@style.label}#{@style.labelitem1}"}>{@options.label3}</div>
          </div>
        </div>
        <button class="button hoverActive" phx-click="refresh" phx-target={@myself} style={@style.button}>Refresh</button>    <% #(2,3)%>
      </div>
    </div>
    """
  end

  @impl true
  def handle_event("refresh", _params, socket) do
    socket = assign(socket,
                    num1: new_orders(),
                    num2: sales_amount(),
                    num3: satisfaction())
    {:noreply, socket}
  end

# if this would be a Liveview instead of LiveComponent we would do this instead:
# def handle_info(:tick, socket) do
#   socket = assign(socket,
#                   num1: new_orders(),
#                   num2: sales_amount(),
#                   num3: satisfaction())
#   {:noreply, socket}
# end
  @impl true
  def update(%{action: :tick}, socket) do                                                                                     #(7)
    tick()
    socket = assign(socket,
                    num1: new_orders(),
                    num2: sales_amount(),
                    num3: satisfaction())
    {:ok, socket}
  end

  @impl true
  def update(assigns, socket) do                                                                                              #(7)
    {:ok, assign(socket, assigns)}
  end

  defp tick() do
    send_update_after(__MODULE__, %{id: "salesdashboard", action: :tick}, 1000)                                               #(6,7)
  end

#                                                        Aux Functions                                                        (8)
  defp new_orders do
    Enum.random(5..20)
  end

  defp sales_amount do
    Enum.random(100..1000)
  end
  defp satisfaction do
    Enum.random(95..100)
  end

end
