defmodule AppWeb.ShoppingCart do
  @moduledoc """
    A component for rendering a searchbar
    Usage:
      <.live_component module={AppWeb.ShoppingCart} id="shopping-cart-demo-1" config={%{type: 1, cart_id: 2}} style={%{wrapper: "", main_title_container: "", main_title: "", continue_shopping: "", products_container: "", product: %{container: "", title_container: "", title: "", link: "", inner: "", image_container: "", image: "", more_info: "", paragraph: "", pipe_text: "", price_container: "", quantity_container: "", quantity_decrease: "", quantity_increase: "", quantity_input: %{main: "", inner: "", label: ""}, total_price_container: ""}, checkout: %{container: "", field: "", field_calculation: "", line: "", total_field: "", total_field_calculation: "", button: ""}}} options={%{products_space_percentage: 70, project: "", currency: "EUR", link_hover_border: "0.0625rem solid darkgray"}} data={%{products: @products.cart_items}}/>
  """
  alias App.Products
  use AppWeb, :live_component
  alias App.OrderHistories
  alias App.Carts
  import AppWeb.PaymentPopup

  attr :id, :string, required: true
  attr :config, :map, default: %{type: 1, cart_id: nil, order_history_id: nil, user_id: nil, project: ""} # type: 1/2
  attr :style, :map, default: %{wrapper: "", main_title_container: "", main_title: "", continue_shopping: "", products_container: "", product: %{container: "", title_container: "", title: "", link: "", inner: "", image_container: "", image: "", more_info: "", paragraph: "", pipe_text: "", price_container: "", quantity_container: "", quantity_decrease: "", quantity_increase: "", quantity_input: %{main: "", inner: "", label: ""}, total_price_container: ""}, checkout: %{container: "", field: "", field_calculation: "", line: "", total_field: "", total_field_calculation: "", button: ""}}
  attr :options, :map, default: %{products_space_percentage: 70, project: "", currency: "EUR", link_hover_border: "0.0625rem solid darkgray"}
  attr :data, :map, default: %{products: []}

  def render(assigns) do
    ~H"""
    <div class={"stateful_comp main shopping-cart items-start type-#{@config.type}"} id={"shopping-cart-component-#{@id}"} style={@style.wrapper}>
      <style>
        .stateful_comp.shopping-cart { padding: 5rem;
          & .main-title-container { padding: 1rem;
            & a { border-bottom: 0.0625rem solid transparent;
              &:hover { border-bottom: <%= @options.link_hover_border %> !important; }
            }
          }
          & .products-container { width: <%= @options.products_space_percentage %>%; padding: 0 1rem;
            & .product { border: 0.0625rem solid darkgray; border-radius: 1rem; margin-bottom: 0.5rem;
              & .title-container { padding: 0.5rem 1rem;
                & h3 { cursor: default; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: flex; }
                & a { border-bottom: 0.0625rem solid transparent;
                  &:hover { border-bottom: <%= @options.link_hover_border %> !important; }
                }
              }
              & .inner { padding: 1rem 0;
                & div p { cursor: default; }
                & .quantity { gap: 0.25rem;
                  & button { height: 2.5rem; }
                  & input { width: 4rem; margin: 0; }
                }
              }
            }
          }
          & .checkout-container { width: <%= 100 - @options.products_space_percentage %>%; border: 0.0625rem solid darkgray; border-radius: 1rem; padding: 2rem;
            & p { padding: 1rem 0.25rem;
              &.total { font-size: 1.25rem; padding: 1.5rem 0.25rem; }
            }
            & .line { border-bottom: 0.0625rem solid darkgray; }
            & button { background-color: green;
              &:hover { opacity: 0.9; }
            }
          }
          & .price-container { font-size: 1rem; }
          & .old-price:before { position: absolute; content: ""; left: 0; top: 50%; right: 0; border-top: 0.3125rem solid; border-color: rgba(150, 0, 0, 0.6); -webkit-transform: rotate(-10deg); -moz-transform: rotate(-10deg); -ms-transform: rotate(-10deg); -o-transform: rotate(-10deg); transform: rotate(-10deg); }
          &.type-1 .products-container .product .inner .image img { max-height: 6rem; }
          &.type-2 .products-container .product { padding: 1rem;
            & .image { width: 20%; padding: 0.5rem; }
            & .inner { width: 80%;
              & .title-container { margin-bottom: 0.5rem; }
            }
          }
        }
      </style>
        <div class="main-title-container width100 space-between" style={@style.main_title_container}>
          <h2 style={@style.main_title}>Your Cart</h2>
          <.link navigate={"/#{@options.project}products"} style={@style.continue_shopping}>Continue shopping -></.link>
        </div>
        <div class="products-container" style={@style.products_container} :if={@total_price == 0}>
          <h3 class="width100">You don't have any products in your cart!</h3>
          <.button><.link navigate={"/#{@options.project}products"}>Continue Shopping</.link></.button>
        </div>
        <div class="products-container" style={@style.products_container} :if={@total_price > 0}>
          <div class="product" :for={cart_item <- @data.products} style={@style.product.container} :if={@config.type == 1}>
            <div class="title-container width100 space-between" style={@style.product.title_container}>
              <h3 style={@style.product.title}>{cart_item.product.name}</h3>
              <.link navigate={"/#{@options.project}product/#{cart_item.product.id}/#{String.replace(cart_item.product.name, " ", "-")}"} style={@style.product.link}>See the product -></.link>
            </div>
            <div class={"inner space-around #{if @config.type==1, do: "width100"}"} style={@style.product.inner}>
              <div class="image" style={@style.product.image_container}> <img src={"/images/#{cart_item.product.main_photo}"} style={@style.product.image}/> </div>
              <div class="more-info column" style={@style.product.more_info}>
                <p class="width100 flex-start" style={@style.product.paragraph}>Shipping time: &nbsp;<span class="bold" style={@style.product.pipe_text}>{cart_item.product.shipping_time}</span></p>
                <p class="width100 flex-start" style={@style.product.paragraph}>Size: &nbsp;<span class="bold" style={@style.product.pipe_text}>{cart_item.product.packing_size}</span></p>
                <p class="width100 flex-start" style={@style.product.paragraph}>Weight: &nbsp;<span class="bold" style={@style.product.pipe_text}>{cart_item.product.weight} kg per piece</span></p>
              </div>
              <div class="price column" style={@style.product.price_container}>
                <p class="width100 flex-start" style={@style.product.paragraph}>Each</p>
                <div class="price-container flex-start">
                  <div class="old-price-container"> <p class="old-price relative" style={@style.product.pipe_text} :if={cart_item.product.discount_info != nil}>{Decimal.round(cart_item.product.original_price,2)} {@options.currency}</p> </div>
                  <p class="current-price width100 bold flex-start" style={@style.product.pipe_text} >{Decimal.round(cart_item.product.display_price,2)} {@options.currency}</p>
              </div>
            </div>
            <div class="quantity" style={@style.product.quantity_container}>
            <p :if={cart_item.quantity >= cart_item.product.stock}  style="width: 100%; color: red;"> Max stock </p>
              <.button phx-click="decrease_quantity" phx-value-product_id={cart_item.product.id} style={@style.product.quantity_decrease}>-</.button>
              <.input type="number" value={cart_item.quantity} name="quantity" disabled style={@style.product.quantity_input} />
              <.button :if={cart_item.quantity < cart_item.product.stock} phx-click="increase_quantity" phx-value-product_id={cart_item.product.id} style={@style.product.quantity_increase}>+</.button>
            </div>
            <div class="total-price column" style={@style.product.total_price_container}>
              <p style={@style.product.paragraph}>Total:</p>
              <p :if={cart_item.product.display_price} class="bold" style={@style.product.pipe_text}>{Decimal.round(Decimal.mult(cart_item.product.display_price, cart_item.quantity),2)} {@options.currency}</p>
              <p :if={cart_item.product.display_price == nil} class="bold" style={@style.product.pipe_text}>{Decimal.round(Decimal.mult(cart_item.product.original_price, cart_item.quantity),2)} {@options.currency}</p>
            </div>
          </div>
        </div>
        <div class="product" :for={cart_item <- @data.products} style={@style.product.container} :if={@config.type == 2}>
          <div class="image" style={@style.product.image_container}> <img src={"/images/#{cart_item.product.main_photo}"} style={@style.product.image}/> </div>
          <div class="inner" style={@style.product.inner}>
            <div class="title-container" style={@style.product.title_container}>
              <h3 style={@style.product.title}>{cart_item.product.name}</h3>
              <.link navigate={"/#{@options.project}product/#{cart_item.product.id}/#{String.replace(cart_item.product.name, " ", "-")}"} style={@style.product.link}>See the product -></.link>
            </div>
            <div class="more-info" style={@style.product.more_info}>
              <p style={@style.product.paragraph}>Shipping time:</p>
              <p class="bold" style={@style.product.pipe_text}>{cart_item.product.shipping_time}</p>
            </div>
            <div class="price" style={@style.product.price_container}>
              <p style={@style.product.paragraph}>Price:</p>
              <p class="bold" style={@style.product.pipe_text}>{Decimal.round(cart_item.product.price,2)} {@options.currency}</p>
            </div>
            <div class="quantity" style={@style.product.quantity_container}>
              <.button phx-click="decrease_quantity" phx-value-product_id={cart_item.product.id} style={@style.product.quantity_decrease}>-</.button>
              <.input type="number" value={cart_item.quantity} name="quantity" disabled style={@style.product.quantity_input} />
              <.button :if={cart_item.quantity < cart_item.product.stock} phx-click="increase_quantity" phx-value-product_id={cart_item.product.id} style={@style.product.quantity_increase}>+</.button>
            </div>
            <div class="total-price" style={@style.product.total_price_container}>
              <p style={@style.product.paragraph}>Total:</p>
              <p class="bold" style={@style.product.pipe_text}>{Decimal.round(Decimal.mult(cart_item.product.price, cart_item.quantity),2)} {@options.currency}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="checkout-container column items-baseline" style={@style.checkout.container}>
        <p style={@style.checkout.field}>Subtotal: &nbsp;<span class="bold" style={@style.checkout.field_calculation}>{Decimal.round(@total_price,2)} {@options.currency}</span></p>
        <p style={@style.checkout.field}>Shipping cost: &nbsp;<span class="bold" style={@style.checkout.field_calculation}>{if @total_weight > 0, do: Decimal.to_string(Decimal.add(Decimal.round(@total_weight, 2),10)), else: "0.00"} {@options.currency}</span></p>
        <p style={@style.checkout.field}>Estimated Sales Tax: &nbsp;<span class="bold" style={@style.checkout.field_calculation}>{Decimal.to_string(Decimal.round(Decimal.mult(@total_price, Decimal.from_float(0.1)),2))} {@options.currency}</span></p>
        <span class="line" style={@style.checkout.line}></span>
        <p class="total" style={@style.checkout.total_field}>Estimated Total: &nbsp;<span class="bold" style={@style.checkout.total_field_calculation}>{Decimal.to_string(Decimal.add(@total_price, Decimal.add(Decimal.round(@total_weight, 2), Decimal.round(Decimal.mult(@total_price, Decimal.from_float(0.1)),2))))} {@options.currency}</span></p>
        <.button class="width100" disabled={length(@data.products)<1} style={@style.checkout.button} phx-click="open_payment_popup" phx-target={@myself} id={"checkout-button-#{@id}"} phx-hook="ChangeColorInterval">Checkout</.button>
        <.payment_popup class="payment"/>
      </div>
    </div>
    """
  end

  def update(assigns, socket) do
    socket =
      socket
      |> assign(assigns)
      |> assign(total_price: Carts.total_price_of_cart(assigns.config.cart_id, assigns.current_user.customer_type))
      |> assign(total_weight: Carts.total_weight_of_cart(assigns.config.cart_id))
      |> assign(cart_id: assigns.config.cart_id)
      |> assign(order_history_id: assigns.config.order_history_id)
      |> assign(user_id: assigns.config.user_id)
    {:ok, socket}
  end

  def handle_event("open_payment_popup", _params, socket) do
    :timer.sleep(12000)
    OrderHistories.create_order_history(%{user_id: socket.assigns.config.user_id})
    for product <- socket.assigns.data.products do
      OrderHistories.add_product_to_card_or_update_quantity(socket.assigns.config.order_history_id, product.product.id, product.quantity)
      Products.update_stock_after_order(product.product.id, product.quantity)
    end
    Carts.delete_cart(Carts.get_cart!(socket.assigns.config.cart_id))
    {:noreply, redirect(socket, to: "/#{socket.assigns.config.project}/orders_history")}
  end
end
