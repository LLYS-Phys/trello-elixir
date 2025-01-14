defmodule AppWeb.ProductCard do
  @moduledoc """
    Calling the component:
      The Basic:
        <.product_card class="" data={%{product: %{id: "", name: "", price: "", shipping_time: "", main_photo: "", description: "", additional_photos: [], stock: 0}}}/>
      All available options:
        <.product_card class="" data={%{product: %{id: "", name: "", price: "", shipping_time: "", main_photo: "", description: "", additional_photos: [], stock: 0}, wishlist_product_ids: []}} config={%{type: 1/2/3/4/5/6, quickview_type: 1/2/3}} style={%{cardContainer: "", link: "", photo: "", title: "", infoContainer: "", price: "", shippingTime: "", buttonsContainer: "", addToCart: "", addToWishlist: "", wishlistIcon: "", addToCartIcon: "", quickViewContainer: "", quickViewButtonContainer: "", quickViewButton: "", quickViewModal: %{main: "", headingAbove: "", productContainer: "", infoContainer: "", productInfoText: "", infoInnerContainer: "", infoInnerRow: "", infoInnerRowP: "", infoInnerRowPCategory: "", actionButtonsContainer: "", addToCart: "", addToWishlist: "", productTitle: "", priceContainer: "", pricePipe: "", vatText: "", heartOutline: "", heartSolid: "", additionalInfoContainer: "", collapseButton: ""}}} options={%{project: "", wishListIconHoverColor: "red", wishlistIconClicked: "background-color: red;", wishlistIconName: "hero-heart", wishlistIconCheckedName: "hero-heart-solid", addToCartIconName: "hero-shopping-cart", addToCartIconCheckedName: "hero-check-solid", addToCartIconHoverColor: "blue", addToCartIconClicked: "background-color: green;", quickViewBgButtonRgb: "255,255,60", quickViewButtonRgb: "0,0,0", quickViewModalBgColor: "whitesmoke"}}/>
    Additional Comments:
      - config.type takes only one of the following values: 1, 2, 3, 4, 5, 6. There is currently no fallback option. See below for information on the types.
      - If you want to change the background color of the tooltip in product card type 3 or 6, you need to put there the inverted color of the one you want
      - When changing the icon buttons, make sure you pass heroicons ("hero-NAME" or "hero-NAME-solid")
    Short description for product card types:
      - Type 1 : "Add to cart" button with text and an icon button for "Add to wishlist"
      - Type 2 : Icon buttons for both "Add to cart" button and "Add to wishlist" button
      - Type 3 : "Add to cart" button with text and "Add to wishlist" button with text
      - Type 4 : Type 1 with quick view button and modal
      - Type 5 : Type 2 with quick view button and modal
      - Type 6 : Type 3 with quick view button and modal
  """
  use AppWeb, :html
  use AppWeb, :verified_routes
  import AppWeb.Tooltip
  alias Phoenix.LiveView.JS
  import AppWeb.ProductDetailedCard

  attr :class, :string, required: true
  attr :data, :map, default: %{product: %{id: "", name: "", price: "", shipping_time: "", main_photo: "", description: "", additional_photos: [], stock: 0, display_price: "", original_price: ""}, wishlist_product_ids: []}
  attr :config, :map, default: %{type: 1, quickview_type: 1}
  attr :options, :map, default: %{project: "", wishListIconHoverColor: "red", wishlistIconClicked: "background-color: red;", wishlistIconName: "hero-heart", wishlistIconCheckedName: "hero-heart-solid", addToCartIconName: "hero-shopping-cart", addToCartIconCheckedName: "hero-check-solid", addToCartIconHoverColor: "blue", addToCartIconClicked: "background-color: green;", quickViewBgButtonRgb: "255,255,60", quickViewButtonRgb: "0,0,0", quickViewModalBgColor: "whitesmoke"}
  attr :style, :map, default: %{cardContainer: "", link: "", photo: "", title: "", infoContainer: "", price: "", shippingTime: "", buttonsContainer: "", addToCart: "", addToWishlist: "", wishlistIcon: "", addToCartIcon: "", quickViewContainer: "", quickViewButtonContainer: "", quickViewButton: "", quickViewModal: %{main: "", headingAbove: "", productContainer: "", infoContainer: "", productInfoText: "", infoInnerContainer: "", infoInnerRow: "", infoInnerRowP: "", infoInnerRowPCategory: "", actionButtonsContainer: "", addToCart: "", addToWishlist: "", productTitle: "", priceContainer: "", pricePipe: "", vatText: "", heartOutline: "", heartSolid: "", additionalInfoContainer: "", collapseButton: ""}}

  def product_card(assigns) do
    ~H"""
    <style>
      .stateless_comp.main.product-card { max-width: 30%; border: 0.0625rem solid lightgray; padding: 1rem;
                                          box-shadow: 0.25rem 0.25rem rgba(0,0,0,0); transition: box-shadow 0.2s;
        &:hover { box-shadow: 0.25rem 0.25rem rgba(0,0,0,0.1); transition: box-shadow 0.2s; }
        & * { width: 100%; }
        & .info { padding: 0.5rem;
          & p { cursor: default; }
        }
        & .product {
          & .photo { height: 20rem; }
          & .name { height: 6rem; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
        }
        & .price-container { width: 30% !important; min-height: 8rem; }
        & .old-price:before { position: absolute; content: ""; left: 0; top: 50%; right: 0; border-top: 0.3125rem solid; border-color: rgba(150, 0, 0, 0.6);
                            -webkit-transform: rotate(-10deg); -moz-transform: rotate(-10deg); -ms-transform: rotate(-10deg); -o-transform: rotate(-10deg);
                            transform: rotate(-10deg); }
        & .discount-badge { top: 0; right: 0; background-color: red; padding: 0.2rem; border-radius: 0.5rem; margin-top: 0.2rem; margin-right: 0.2rem;
                            color: white; width: unset !important; }
        &.type-1 .actions { min-height: 3rem; padding: 0.5rem;
          & .add-to-wishlist, & .remove-from-wishlist { right: 0; width: 15%; border: none; transition: color 0.2s;
            &:hover { color: <%= @options.wishListIconHoverColor %>; animation: buttonPulse 1s infinite; transition: color 0.2s; }
            &.hidden { display: none; }
          }
          & .add-to-cart { width: auto; border-radius: 0.5rem; padding: 0.5rem 1rem; color: black; background-color: white;
                            filter: invert(0); transition: filter 0.2s;
            &:hover { filter: invert(100%); transition: filter 0.2s; }
          }
          & span { height: 3vh; }
        }
        &.type-4 {
          & .actions { min-height: 3rem; padding: 0.5rem;
            & .add-to-wishlist, & .remove-from-wishlist { right: 0; width: 15%; border: none; transition: color 0.2s;
              &:hover { color: <%= @options.wishListIconHoverColor %>; animation: buttonPulse 1s infinite; transition: color 0.2s; }
              &.hidden { display: none; }
            }
            & .add-to-cart { width: auto; border-radius: 0.5rem; padding: 0.5rem 1rem; color: black; background-color: white;
                              filter: invert(0); transition: filter 0.2s;
              &:hover { filter: invert(100%); transition: filter 0.2s; }
            }
            & span { height: 3vh; }
          }
          & .quick-view-button { width: 40%; bottom: 25%;
            & .icon { width: 2rem; }
            & .text { width: 5rem; }
            & button { background-color: transparent; border-color: transparent; color: transparent; }
          }
          &:hover { position: relative;
            & .quick-view-button { width: 100%; transition: width 0.5s;
              & button { color: rgb(<%= @options.quickViewButtonRgb %>); background-color: rgba(<%= @options.quickViewBgButtonRgb %>,0.5); border-color: rgba(<%= @options.quickViewButtonRgb %>,0.3);
                &:hover { background-color: rgba(<%= @options.quickViewBgButtonRgb %>,0.7); }
              }
            }
          }
        }
        &.type-2 {
          & .product {
            & .photo { order: 2; }
            & .name { order: 1; }
          }
          & .actions {
            & .add-to-wishlist, & .remove-from-wishlist { left: 1rem; bottom: 1.5rem; width: 15%; border: none; transition: color 0.2s;
              &:hover { color: <%= @options.wishListIconHoverColor %>; animation: buttonPulse 1s infinite; transition: color 0.2s; }
              &.hidden { display: none; }
            }
            & .add-to-cart { width: 15%; border: none; transition: color 0.2s; right: 0; bottom: 1.5rem;
              &:has(.solid.hidden):hover { color: <%= @options.addToCartIconHoverColor %>; animation: buttonPulse 1s infinite; transition: color 0.2s; }
              & .hidden { display: none; }
            }
            & span { height: 3vh; }
          }
        }
        &.type-5 {
          & .product {
            & .photo { order: 2; }
            & .name { order: 1; }
          }
          & .actions {
            & .add-to-wishlist, & .remove-from-wishlist { left: 1rem; bottom: 1.5rem; width: 15%; border: none; transition: color 0.2s;
              &:hover { color: <%= @options.wishListIconHoverColor %>; animation: buttonPulse 1s infinite; transition: color 0.2s; }
              &.hidden { display: none; }
            }
            & .add-to-cart { width: 15%; border: none; transition: color 0.2s; right: 0; bottom: 1.5rem;
              &:has(.solid.hidden):hover { color: <%= @options.addToCartIconHoverColor %>; animation: buttonPulse 1s infinite; transition: color 0.2s; }
              & .hidden { display: none; }
            }
            & span { height: 3vh; }
          }
          & .quick-view-button { width: 40%; bottom: 15%;
            & .icon { width: 2rem; }
            & .text { width: 5rem; }
            & button { background-color: transparent; border-color: transparent; color: transparent; }
          }
          &:hover { position: relative;
            & .quick-view-button { width: 100%; transition: width 0.5s;
              & button { color: rgb(<%= @options.quickViewButtonRgb %>); background-color: rgba(<%= @options.quickViewBgButtonRgb %>,0.5); border-color: rgba(<%= @options.quickViewButtonRgb %>,0.3);
                &:hover { background-color: rgba(<%= @options.quickViewBgButtonRgb %>,0.7); }
              }
            }
          }
        }
        &.type-3 {
          & .product {
            & .photo { order: 2; }
            & .name { order: 1; }
          }
          & .actions {
            & .add-to-cart, & .add-to-wishlist, & .remove-from-wishlist { width: 40%; border-radius: 0.5rem; padding: 0.5rem 1rem; color: black;
                                                                          background-color: white; filter: invert(0); transition: filter 0.2s;
              &:hover { filter: invert(100%); transition: filter 0.2s; }
            }
          }
        }
        &.type-6 {
          & .product {
            & .photo { order: 2; }
            & .name { order: 1; }
          }
          & .actions {
            & .add-to-cart, & .add-to-wishlist, & .remove-from-wishlist  { width: 40%; border-radius: 0.5rem; padding: 0.5rem 1rem; color: black;
                                                                           background-color: white; filter: invert(0); transition: filter 0.2s;
              &:hover { filter: invert(100%); transition: filter 0.2s; }
            }
          }
          & .quick-view-button { width: 40%; bottom: 15%;
            & .icon { width: 2rem; }
            & .text { width: 5rem; }
            & button { background-color: transparent; border-color: transparent; color: transparent; }
          }
          &:hover { position: relative;
            & .quick-view-button { width: 100%; transition: width 0.5s;
              & button { color: rgb(<%= @options.quickViewButtonRgb %>); background-color: rgba(<%= @options.quickViewBgButtonRgb %>,0.5); border-color: rgba(<%= @options.quickViewButtonRgb %>,0.3);
                &:hover { background-color: rgba(<%= @options.quickViewBgButtonRgb %>,0.7); }
              }
            }
          }
        }
      }
      .quickview-modal-container { width: 100vw; height: 100vh; top: 0; left: 0; backdrop-filter: blur(0.3125rem);
        & .quick-view-modal { overflow-y: scroll; bottom: 5%; width: 90% !important; height: 90%; background-color: <%= @options.quickViewModalBgColor %>;
                              border-radius: 1rem; border: 0.0625rem solid rgba(0,0,0,0.3); padding: 1rem;
          & .button-container { top: 1.5rem; right: 1.25rem;
            & button { border: none; border-radius: 0.5rem;
              &:hover { background-color: lightgray; }
              & span { height: 1.25rem; width: 1.25rem; }
            }
          }
          &.hidden { display: none; }
        }
      }
      .flash.hidden { display: none; }
      @keyframes buttonPulse { 0% {transform: scale(1)  } 50% { transform: scale(1.25) } 100% { transform: scale(1) } }
    </style>
    <div class={"stateless_comp main product-card width100 type-#{@config.type} #{if @config.type==2 || @config.type==5, do: "relative"}"} style={@style.cardContainer}>
      <p :if={@data.product.discount_info} class="discount-badge absolute"> {@data.product.discount_info.discount_text} </p>
      <div :if={@config.type == 4 or @config.type == 5 or @config.type == 6} class={"quick-view-button #{if @config.type==4 || @config.type==5 || @config.type==6, do: "absolute"}"}>
        <.button phx-click={open_quick_view_modal(@class)}> <.icon name="hero-magnifying-glass" class="icon" /> <span class="text">Quick View</span> </.button>
      </div>
      <.link class="product" navigate={"/#{@options.project}product/#{@data.product.id}/#{String.replace(@data.product.name, " ", "-")}"} style={@style.link}>
        <img class="photo" src={if @data.product.main_photo == "", do: "/images/default-product-image.png", else: "/images/" <> @data.product.main_photo} alt={@data.product.name} style={@style.photo}/>
        <h3 class="name" style={@style.title}>{@data.product.name}</h3>
      </.link>
      <div :if={@config.type == 1 or @config.type == 2 or @config.type == 4 or @config.type == 5} class="info" style={@style.infoContainer}>
        <div class="price-container content-end">
          <div class="old-price-container"> <p class="old-price relative" :if={@data.product.discount_info != nil}>{Decimal.round(@data.product.original_price,2)} </p> </div>
          <p class="current-price bold"  >{Decimal.round(@data.product.display_price,2)} EUR</p>
        </div>
        <%= if @data.product.stock > 0 do %>
          <p class="shipping-time"> Shipping time: {@data.product.shipping_time} </p>
        <% else %>
          <p style="color: red; font-weight: bold;">Out of Stock</p>
        <% end %>
      </div>
      <div class={"actions #{if @config.type==1 || @config.type==4, do: "relative"} #{if @config.type==3 || @config.type==6, do: "space-evenly"}"} style={@style.buttonsContainer}>
        <button :if={@data.product.stock > 0}  class={"add-to-cart product-list #{if @config.type==1 || @config.type==4 || @config.type==2 || @config.type==5, do: "absolute"}"} style={@style.addToCart} phx-click="add_to_cart" phx-value-product_id={@data.product.id}>
          <span :if={@config.type == 1 or @config.type == 4}>Add to cart</span>
          <.icon :if={@config.type == 2 or @config.type == 5} name={@options.addToCartIconName} style={@style.addToCartIcon} class="outline"/>
          <.icon :if={@config.type == 2 or @config.type == 5} name={@options.addToCartIconCheckedName} style={@options.addToCartIconClicked} class="solid hidden"/>
          <.tooltip :if={@config.type == 3 or @config.type == 6} class={"add-to-cart-tooltip-#{@class}"} data={[%{letter: "Add to cart", text: "Price: #{@data.product.price} & Shipping time: #{@data.product.shipping_time}"}]} style={%{wrapper: "", main: "padding: 0;", tooltip: "font-style: normal; font-size: 1rem; font-weight: normal; margin-top: 1.5rem;"}} options={%{position: "bottom", arrow_position: "left", color: "white", bg_color: "rgb(26, 26, 26)", box_shadow: "", hover_zoom: "1", cursor: "pointer"}}/>
        </button>
        <button class={"add-to-wishlist product-list #{if @config.type==1 || @config.type==4 || @config.type==2 || @config.type==5, do: "absolute"} #{if Enum.member?(@data.wishlist_product_ids, @data.product.id), do: "hidden"}"} style={@style.addToWishlist} phx-click="add_to_wishlist" phx-value-product_id={@data.product.id}>
          <span :if={@config.type == 3 or @config.type == 6}>Add to wishlist</span>
          <.icon :if={@config.type == 1 or @config.type == 2 or @config.type == 4 or @config.type == 5} name={@options.wishlistIconName} style={@style.wishlistIcon} class="outline"/>
        </button>
        <button class={"remove-from-wishlist product-list #{if @config.type==1 || @config.type==4 || @config.type==2 || @config.type==5, do: "absolute"} #{unless Enum.member?(@data.wishlist_product_ids, @data.product.id), do: "hidden"}"} style={@style.addToWishlist} phx-click="remove_from_wishlist" phx-value-product_id={@data.product.id}>
          <.icon :if={@config.type == 1 or @config.type == 2 or @config.type == 4 or @config.type == 5} name={@options.wishlistIconCheckedName} style={@options.wishlistIconClicked} class="solid"/>
        </button>
      </div>
    </div>
    <.focus_wrap :if={@config.type == 4 or @config.type == 5 or @config.type == 6} id={"quick-view-modal-#{@class}"} class="quickview-modal-container layer2 hidden fixed" phx-window-keydown={JS.add_class("hidden", to: "#quick-view-modal-#{@class}")} phx-key="escape">
      <div class="quick-view-modal fixed" style={@style.quickViewContainer} phx-click-away={JS.add_class("hidden", to: "#quick-view-modal-#{@class}")}>
        <div class="button-container layer3 flex-end absolute" style={@style.quickViewButtonContainer}> <button phx-click={JS.add_class("hidden", to: "#quick-view-modal-#{@class}")} type="button" aria-label={gettext("close")} style={@style.quickViewButton}> <.icon name="hero-x-mark-solid" /> </button> </div>
        <.product_detailed class={"quick-view-#{@class}"} config={%{type: @config.quickview_type}} data={%{product: %{id: @data.product.id, name: @data.product.name, price: @data.product.price, original_price: @data.product.original_price, display_price: @data.product.display_price, discount_info: @data.product.discount_info, shipping_time: @data.product.shipping_time, main_photo: @data.product.main_photo, description: @data.product.description, additional_photos: @data.product.additional_photos, stock: @data.product.stock}, wishlist_product_ids: @data.wishlist_product_ids}} style={%{main: "position: absolute; top: 5%;" <> @style.quickViewModal.main, headingAbove: @style.quickViewModal.headingAbove, productContainer: @style.quickViewModal.productContainer, infoContainer: @style.quickViewModal.infoContainer, productInfoText: @style.quickViewModal.productInfoText, infoInnerContainer: @style.quickViewModal.infoInnerContainer, infoInnerRow: @style.quickViewModal.infoInnerRow, infoInnerRowP: @style.quickViewModal.infoInnerRowP, infoInnerRowPCategory: @style.quickViewModal.infoInnerRowPCategory, actionButtonsContainer: @style.quickViewModal.actionButtonsContainer, addToCart: @style.quickViewModal.addToCart, addToWishlist: @style.quickViewModal.addToWishlist, productTitle: @style.quickViewModal.productTitle, priceContainer: @style.quickViewModal.priceContainer, pricePipe: @style.quickViewModal.pricePipe, vatText: @style.quickViewModal.vatText, heartOutline: @style.quickViewModal.heartOutline, heartSolid: @style.quickViewModal.heartSolid, additionalInfoContainer: @style.quickViewModal.additionalInfoContainer, collapseButton: @style.quickViewModal.collapseButton}}/>
      </div>
    </.focus_wrap>
    """
  end

  defp open_quick_view_modal(class, js \\ %JS{}) do
    js
    |> JS.remove_class("active", to: ".contacts-box")
    |> JS.remove_class("active", to: ".chat-box")
    |> JS.remove_class("active", to: ".cookies-banner")
    |> JS.remove_class("hidden", to: "#quick-view-modal-#{class}")
  end
end
