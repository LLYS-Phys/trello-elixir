defmodule AppWeb.WishlistCart do
  @moduledoc """
    A component for rendering a searchbar
    Usage:
      <.live_component module={AppWeb.WishlistCart} id="wishlist-cart-demo-1" config={%{type: 1}} style={%{wrapper: "", main_title_container: "", main_title: "", continue_shopping: "", products_container: "", product: %{container: "", title_container: "", title: "", inner: "", image_container: "", image: "", more_info: "", paragraph: "", pipe_text: "", price_container: "", total_price_container: "", product_information: ""}, wishlist_button_container: "", wishlist_icon: "width: 3rem; height: 3rem;", checkout: %{container: "", field: "", field_calculation: "", line: "", total_field: "", total_field_calculation: "", button: ""}}} options={%{project: "", currency: "EUR", link_hover_border: "0.0625rem solid darkgray"}} data={%{products: @products}}/>
  """
  use AppWeb, :live_component

  attr :id, :string, required: true
  attr :config, :map, default: %{type: 1, wishlist_id: nil} # type: 1/2
  attr :style, :map, default: %{wrapper: "", main_title_container: "", main_title: "", continue_shopping: "", products_container: "", product: %{container: "", title_container: "", title: "", inner: "", image_container: "", image: "", more_info: "", paragraph: "", pipe_text: "", price_container: "", total_price_container: "", product_information: ""}, wishlist_button_container: "", wishlist_icon: "", checkout: %{container: "", field: "", field_calculation: "", line: "", total_field: "", total_field_calculation: "", button: ""}}
  attr :options, :map, default: %{project: "", currency: "EUR", link_hover_border: "0.0625rem solid darkgray"}
  attr :data, :map, default: %{products: []}

  def render(assigns) do
    ~H"""
    <div class={"stateful_comp main wishlist-cart width100 type-#{@config.type}"} id={"wishlist-cart-component-#{@id}"} style={@style.wrapper}>
      <style>
        .stateful_comp.wishlist-cart { padding: 5rem;
          & .main-title-container { padding: 1rem;
            & a { border-bottom: 0.0625rem solid transparent;
              &:hover { border-bottom: <%= @options.link_hover_border %> !important;
              }
            }
          }
          & .products-container { padding: 0 1rem; min-height: 30vh;
            & .product {
              & .product-information { border: 0.0625rem solid darkgray; border-radius: 1rem; margin-bottom: 0.5rem;
                & .title-container { padding: 0.5rem 1rem;
                  & a { border-bottom: 0.0625rem solid transparent;
                    &:hover { border-bottom: 0.0625rem solid transparent; }
                  }
                }
                & .inner { padding: 1rem 0;
                  & .quantity { gap: 0.25rem;
                    & button { height: 2.5rem; }
                    & input { width: 4rem; margin: 0; }
                  }
                }
              }
              & .wishlist-button { right: 2rem; border: none;
                & span { background-color: red; width: 3rem; height: 3rem; }
                &:hover {
                  & span { opacity: 0.6; }
                }
              }
            }
          }
          &.type-1 .products-container .product .product-information .inner { width: 90%;
            & .image img { max-height: 6rem; }
          }
          &.type-2 .products-container .product { padding: 1rem;
            & .image { width: 20%; padding: 0.5rem; }
            & .inner { width: 80%;
              & .title-container { margin-bottom: 0.5rem; padding-top: 0; }
              & .more-info { padding: 0 1.5rem; }
              & .total-price { padding: 0 5rem; }
            }
          }
        }
      </style>
        <div class="main-title-container width100 space-between" style={@style.main_title_container}>
          <h2 style={@style.main_title}>Your Wishlist</h2>
          <.link navigate={"/#{@options.project}products"} style={@style.continue_shopping}>Continue shopping -></.link>
        </div>
        <div class="products-container width100" style={@style.products_container} :if={length(@data.products) == 0}>
          <h3 class="width100">You don't have any products in your wishlist!</h3>
          <.button><.link navigate={"/#{@options.project}products"}>Continue Shopping</.link></.button>
        </div>
        <div class="products-container width100" style={@style.products_container}>
          <div class="product width100 relative" :for={wishlist_item <- @data.products} style={@style.product.container} :if={@config.type == 1}>
            <.link class={"product-information width100 #{if @config.type==1, do: "flex-start"}"} style={@style.product.product_information} navigate={"/#{@options.project}product/#{wishlist_item.product.id}/#{String.replace(wishlist_item.product.name, " ", "-")}"}>
              <div class="title-container width100 space-between" style={@style.product.title_container}> <h3 style={@style.product.title}>{wishlist_item.product.name}</h3> </div>
              <div class={"inner #{if @config.type==2, do: "flex-start", else: "space-around"}"} style={@style.product.inner}>
                <div class="image" style={@style.product.image_container}> <img src={"/images/#{wishlist_item.product.main_photo}"} style={@style.product.image}/> </div>
                <div class="more-info column" style={@style.product.more_info}>
                  <p class="width100 flex-start" style={@style.product.paragraph}>Shipping time: &nbsp;<span class="bold" style={@style.product.pipe_text}>{wishlist_item.product.shipping_time}</span></p>
                  <p class="width100 flex-start" style={@style.product.paragraph}>Size: &nbsp;<span class="bold" style={@style.product.pipe_text}>{wishlist_item.product.packing_size}</span></p>
                  <p class="width100 flex-start" style={@style.product.paragraph}>Weight: &nbsp;<span class="bold" style={@style.product.pipe_text}>{wishlist_item.product.weight} kg per piece</span></p>
                </div>
                <div class="total-price column" style={@style.product.total_price_container}>
                  <p class="width100 flex-start" style={@style.product.paragraph}>Price:</p>
                  <p class="bold width100 flex-start" style={@style.product.pipe_text}>{wishlist_item.product.price} {@options.currency}</p>
                </div>
              </div>
            </.link>
            <button class="wishlist-button absolute" style={@style.wishlist_button_container} phx-click="remove-from-wishlist" phx-value-product_id={wishlist_item.product.id}> <.icon name="hero-heart-solid" style={@style.wishlist_icon}/> </button>
          </div>
          <div class="product width100 relative" :for={wishlist_item <- @data.products} style={@style.product.container} :if={@config.type == 2}>
            <.link class={"product-information width100 #{if @config.type==1, do: "flex-start"}"} style={@style.product.product_information} navigate={"/#{@options.project}product/#{wishlist_item.product.id}/#{String.replace(wishlist_item.product.name, " ", "-")}"}>
              <div class="image" style={@style.product.image_container}> <img src={"/images/#{wishlist_item.product.main_photo}"} style={@style.product.image}/> </div>
              <div class={"inner #{if @config.type==2, do: "flex-start", else: "space-around"}"} style={@style.product.inner}>
                <div class="title-container width100 space-between" style={@style.product.title_container}> <h3 style={@style.product.title}>{wishlist_item.product.name}</h3> </div>
                <div class="more-info column" style={@style.product.more_info}>
                  <p class="width100 flex-start" style={@style.product.paragraph}>Shipping time:</p>
                  <p class="bold width100 flex-start" style={@style.product.pipe_text}>{wishlist_item.product.shipping_time}</p>
                </div>
                <div class="total-price column" style={@style.product.total_price_container}>
                  <p class="width100 flex-start" style={@style.product.paragraph}>Price:</p>
                  <p class="bold width100 flex-start" style={@style.product.pipe_text}>{wishlist_item.product.price} {@options.currency}</p>
                </div>
              </div>
            </.link>
            <button class="wishlist-button absolute" style={@style.wishlist_button_container} phx-click="remove_from_wishlist" phx-value-product_id={wishlist_item.product.id}> <.icon name="hero-heart-solid" style={@style.wishlist_icon}/> </button>
          </div>
        </div>
    </div>
    """
  end

  def update(assigns, socket) do
    socket =
      socket
      |> assign(assigns)
      |> assign(wishlist_id: assigns.config.wishlist_id)
    {:ok, socket}
  end
end
