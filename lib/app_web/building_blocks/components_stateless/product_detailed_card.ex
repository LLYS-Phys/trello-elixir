defmodule AppWeb.ProductDetailedCard do
  @moduledoc """
    Calling the component:
      The Basic:
        <.product_detailed class="" data={%{product: %{id: "", name: "Product Name", price: "Product price", shipping_time: "Product shipping time", main_photo: "default-product-image.png", description: "Product description", additional_photos: [], stock: 0}}}/>
      All available options:
        <.product_detailed class="" data={%{product: %{id: "", name: "Product Name", price: "Product price", shipping_time: "Product shipping time", main_photo: "default-product-image.png", description: "Product description", additional_photos: [], stock: 0}}} config={%{type: 1/2/3}} style={%{main: "", headingAbove: "", productContainer: "", infoContainer: "", productInfoText: "", infoInnerContainer: "", infoInnerRow: "", infoInnerRowP: "", infoInnerRowPCategory: "", actionButtonsContainer: "", addToCart: "", addToWishlist: "", productTitle: "", priceContainer: "", pricePipe: "", vatText: "", heartOutline: "", heartSolid: "", additionalInfoContainer: "", collapseButton: ""}}/>
    Additional Comments:
      - config.type takes only one of the following values: 1, 2, 3. There is currently no fallback option. See below for information on the types.
    Short description for product card types:
      - Type 1 : Old school design with title on the top, image carousel on the left and product information with action buttons on the right
      - Type 2 : Modern design with image carousel on the left and all product information and action buttons on the right
      - Type 3 : Modern design with image carousel on the left and information in collapsible elements on the right
  """
  use AppWeb, :html
  use AppWeb, :verified_routes
  alias Phoenix.LiveView.JS

  attr :class, :string, required: true
  attr :data, :map, default: %{product: %{id: "", name: "Product Name", price: "Product price", original_price: "", display_price: "", discount_info: "", shipping_time: "Product shipping time", main_photo: "default-product-image.png", description: "Product description", additional_photos: [], stock: 0}, wishlist_product_ids: []}
  attr :config, :map, default: %{type: 1}
  attr :style, :map, default: %{main: "", headingAbove: "", productContainer: "", infoContainer: "", productInfoText: "", infoInnerContainer: "", infoInnerRow: "", infoInnerRowP: "", infoInnerRowPCategory: "", actionButtonsContainer: "", addToCart: "", addToWishlist: "", productTitle: "", priceContainer: "", pricePipe: "", vatText: "", heartOutline: "", heartSolid: "", additionalInfoContainer: "", collapseButton: ""}

  def product_detailed(assigns) do
    ~H"""
    <style>
      .stateless_comp.main.product-detailed {
        & .product-container { display: grid; grid-template-columns: 5fr 2fr; padding: 1rem; }
        & .price-container { font-size: 1.6rem; gap: 1rem; }
        & .old-price:before { position: absolute; content: ""; left: 0; top: 50%; right: 0; border-top: 0.3125rem solid; border-color: rgba(150, 0, 0, 0.6);
                              -webkit-transform: rotate(-10deg); -moz-transform: rotate(-10deg); -ms-transform: rotate(-10deg); -o-transform: rotate(-10deg);
                              transform: rotate(-10deg); }
        &.type-1 .info { background-color: lightgray; padding: 1rem; border-radius: 1rem;
          & h3 { padding: 1rem; }
          & .inner {
            & .row p { display: inline; padding: 0.5rem; }
            & .actions button { margin: 2rem 0.5rem 0.5rem 0.5rem; }
          }
        }
        &.type-2 .info {
          & .additional-information { border: 0.0625rem solid darkgray;
            & .row { padding: 1rem; border: 0.0625rem solid darkgray;
              & p { display: inline;
                & span { margin-right: 0.5rem; }
              }
            }
          }
          & .price span { color: darkgray; }
          & .actions { margin: 2rem 0;
            & .add-to-cart { width: 80%; }
            & .add-to-wishlist { background-color: white; width: 20%;
              & .outline { color: black; }
              & .solid { color: red; }
              &:hover { background-color: whitesmoke;
                & .outline { color: red; }
              }
              &.hidden { display: none; }
            }
            & .remove-from-wishlist { background-color: white; width: 20%;
              & .outline { color: black; }
              & .solid { color: red; }
              &:hover { background-color: whitesmoke;
                & .outline { color: red; }
              }
              &.hidden { display: none; }
            }
          }
        }
        &.type-3 .info { align-self: baseline;
          & .additional-information { top: 100%;
            & .row {
              & .collapse-button { border: 0.0625rem solid transparent;
                &:hover { border-bottom: 0.0625rem solid darkgray; }
              }
              & .collapse-button.active { border-bottom: 0.0625rem solid darkgray; }
              & .inner-info { max-height: 0; overflow: hidden; transition: max-height 0.2s ease-out; }
              & .inner-info.active { border: 0.0625rem solid darkgray; border-top: 0; width: 100%; padding: 1rem; }
            }
          }
          & .price span { color: darkgray; }
          & .actions { margin: 2rem 0;
            & .add-to-cart { width: 80%; }
            & .add-to-wishlist { background-color: white; width: 20%;
              & .outline { color: black; }
              & .solid { color: red; }
              &:hover { background-color: whitesmoke;
                & .outline { color: red; }
              }
              &.hidden { display: none; }
            }
            & .remove-from-wishlist { background-color: white; width: 20%;
              & .outline { color: black; }
              & .solid { color: red; }
              &:hover { background-color: whitesmoke;
                & .outline { color: red; }
              }
              &.hidden { display: none; }
            }
          }
        }
      }
      .flash.hidden { display: none; }
    </style>
    <div class={"stateless_comp main product-detailed type-#{@config.type}"} style={@style.main}>
      <h2 :if={@config.type == 1} style={@style.headingAbove}> {@data.product.name} </h2>
      <div class="product-container" style={@style.productContainer}>
        <.live_component module={AppWeb.ImageCarousel} id={"carousel-#{@class}"} data={%{main_photo: @data.product.main_photo, additional_photos: @data.product.additional_photos}} options={%{max_images: 4, main_image_height: "30rem", additional_image_height: "8rem", buttons: %{prev: "^", next: "v"}}} config={%{type: "vertical", align: "left"}} style={%{main: %{comp_container: "display: grid; grid-template-columns: 1fr 4fr;", main_container: "width: auto;", image_container: "", image: ""}, additional: %{main_container: "", image_container: "", image: ""}, buttons: ""}}/>
        <div :if={@config.type == 1} class={"info type-#{@config.type}"} style={@style.infoContainer}>
          <h3 style={@style.productInfoText}>Product Information:</h3>
          <div class="inner" style={@style.infoInnerContainer}>
            <div class="row width100 flex-start justify" style={@style.infoInnerRow}>
              <p style={@style.infoInnerRowP}> <span class="bold" style={@style.infoInnerRowPCategory}>Product name:</span> {@data.product.name} </p>
            </div>
            <div class="row width100 flex-start justify" style={@style.infoInnerRow}>
              <p style={@style.infoInnerRowP}>
              <div class="price-container width100">
                  <div class="old-price-container"> <p class="old-price relative" :if={@data.product.discount_info != nil}>{Decimal.round(@data.product.original_price,2)} </p> </div>
                  <p class="current-price bold"  >{Decimal.round(@data.product.display_price,2)} EUR</p>
              </div>
              </p>
            </div>
            <div class="row width100 flex-start justify" style={@style.infoInnerRow}>
              <p style={@style.infoInnerRowP}> <span class="bold" style={@style.infoInnerRowPCategory}>Shipping time:</span> {@data.product.shipping_time} </p>
            </div>
            <div class="row width100 flex-start justify" style={@style.infoInnerRow}>
              <p style={@style.infoInnerRowP}> <span class="bold" style={@style.infoInnerRowPCategory}>Available products:</span> {@data.product.stock} </p>
            </div>
            <div class="row width100 flex-start justify" style={@style.infoInnerRow}>
              <p style={@style.infoInnerRowP}> <span class="bold" style={@style.infoInnerRowPCategory}>Description:</span> {@data.product.description} </p>
            </div>
            <div class="actions" style={@style.actionButtonsContainer}>
            <%= if @data.product.stock > 0 do %>
              <.button style={@style.addToCart} phx-click="add_to_cart" phx-value-product_id={@data.product.id}>Add to cart</.button>
            <% else %>
              <h4 style="color: red; margin-right: 1rem;">Out of Stock</h4>
            <% end %>
              <.button style={@style.addToWishlist} phx-click="add_to_wishlist" phx-value-product_id={@data.product.id}>Add to wishlist</.button>
            </div>
          </div>
        </div>
        <div :if={@config.type == 2 or @config.type == 3} class={"info relative flex-start type-#{@config.type}"} style={@style.infoContainer}>
          <h2 style={@style.productTitle}> {@data.product.name} </h2>
          <div class="price-container width100">
            <div class="old-price-container"> <p class="old-price relative" :if={@data.product.discount_info != nil}>{Decimal.round(@data.product.original_price,2)} </p> </div>
            <p class="current-price bold"  >{Decimal.round(@data.product.display_price,2)} EUR</p>
          </div>
          <div class="actions width100" style={@style.actionButtonsContainer}>
          <%= if @data.product.stock > 0 do %>
          <.button class="add-to-cart" style={@style.addToCart} phx-click="add_to_cart" phx-value-product_id={@data.product.id}> <span>Add to cart</span> </.button>
          <% else %>
            <h4 style="color: red; margin-right: 1rem;">Out of Stock</h4>
          <% end %>
            <.button class={"add-to-wishlist #{if Enum.member?(@data.wishlist_product_ids, @data.product.id), do: "hidden"}"} style={@style.addToWishlist} phx-click="add_to_wishlist" phx-value-product_id={@data.product.id}> <.icon name="hero-heart" class="outline" style={@style.heartOutline} /> </.button>
            <.button class={"remove-from-wishlist #{unless Enum.member?(@data.wishlist_product_ids, @data.product.id), do: "hidden"}"} style={@style.addToWishlist} phx-click="remove_from_wishlist" phx-value-product_id={@data.product.id}> <.icon name="hero-heart-solid" class="solid" style={@style.heartSolid} /> </.button>
          </div>
          <div :if={@config.type == 2} class="additional-information" style={@style.additionalInfoContainer}>
            <div class="row width100 flex-start justify" style={@style.infoInnerRow}> <p style={@style.infoInnerRowP}> <.icon name="hero-truck" /> {@data.product.shipping_time} standard delivery </p> </div>
            <div class="row width100 flex-start justify" style={@style.infoInnerRow}> <p style={@style.infoInnerRowP}> <.icon name="hero-cursor-arrow-rays" /> {@data.product.stock} products available </p> </div>
            <div class="row width100 flex-start justify" style={@style.infoInnerRow}> <p style={@style.infoInnerRowP}> <.icon name="hero-information-circle" /> {@data.product.description} </p> </div>
          </div>
          <div :if={@config.type == 3} class="additional-information absolute" style={@style.additionalInfoContainer} id={"product-collapse-#{@class}-type-#{@config.type}"} phx-hook="ProductCollapse">
            <div class="row width100" style={@style.infoInnerRow}>
              <button class="collapse-button width100 collapse-button-1" style={@style.collapseButton} phx-click={product_info_class_toggle(".collapse-button-1", ".inner-info-1")}> <.icon name="hero-truck" /> Delivery time </button>
              <div class="inner-info inner-info-1" style={@style.infoInnerRowP}> {@data.product.shipping_time} standard delivery </div>
            </div>
            <div class="row width100" style={@style.infoInnerRow}>
              <button class="collapse-button width100 collapse-button-2" style={@style.collapseButton} phx-click={product_info_class_toggle(".collapse-button-2", ".inner-info-2")}> <.icon name="hero-cursor-arrow-rays" /> Product availability </button>
              <div class="inner-info inner-info-2" style={@style.infoInnerRowP}> {@data.product.stock} products available </div>
            </div>
            <div class="row width100" style={@style.infoInnerRow}>
              <button class="collapse-button width100 collapse-button-3" style={@style.collapseButton} phx-click={product_info_class_toggle(".collapse-button-3", ".inner-info-3")}> <.icon name="hero-information-circle" /> Product description </button>
              <div class="inner-info inner-info-3" style={@style.infoInnerRowP}> {@data.product.description} </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    """
  end

  defp product_info_class_toggle(button, element, js \\ %JS{}) do
    js
    |> JS.toggle_class("active", to: button)
    |> JS.toggle_class("active", to: element)
  end
end
