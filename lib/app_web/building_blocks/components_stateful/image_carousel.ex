defmodule AppWeb.ImageCarousel do
  @moduledoc """
    A component for rendering an image carousel
    Usage:
      <.live_component module={AppWeb.ImageCarousel} id="carousel1" data={%{main_photo: "default-product-image.png", additional_photos: ["Multibanco_black.jpg", "sign_coffe.png", "404-dog.jpg", "moon.png", "space.jpg", "twitter.png"]}} options={%{max_images: 4, main_image_height: "30rem", additional_image_height: "8rem", buttons: %{prev: "<", next: ">"}}} config={%{type: "horizontal", align: "bottom"}} style={%{main: %{comp_container: "", main_container: "", image_container: "", image: ""}, additional: %{main_container: "", image_container: "", image: ""}, buttons: ""}}/>
  """
  use AppWeb, :live_component
  use AppWeb, :verified_routes
  import AppWeb.CoreComponents

  def update(assigns, socket) do
    socket = assign(socket, assigns)
    {:ok, assign(socket, current_photo_id: 0, current_photo: assigns.data.main_photo)}
  end

  attr :id, :string, required: true
  attr :data, :map, default: %{main_photo: "default-product-image.png", additional_photos: []}
  attr :config, :map, default: %{type: "horizontal", align: "bottom"}
  attr :options, :map, default: %{max_images: 4, main_image_height: "30rem", additional_image_height: "8rem", buttons: %{prev: "<", next: ">"}}
  attr :style, :map, default: %{main: %{comp_container: "", main_container: "", image_container: "", image: ""}, additional: %{main_container: "", image_container: "", image: ""}, button: ""}

  def render(assigns) do
    ~H"""
    <div>
      <style>
        .stateful_comp.image-carousel#component-<%= @id %> { padding: 0.5rem;
          & .main-photo { padding: 0.5rem;
            & .image-container { height: <%= @options.main_image_height %>;
              & img { max-height: 100%; width: inherit; }
            }
          }
          & .additional-photos {
            & .btn-container { padding: 0.5rem; }
            & .image-container { width: 10rem; padding: 0.5rem; border: 0.0625rem solid transparent;
              & img { height: <%= @options.additional_image_height %>; opacity: 0.8;
                &:hover { opacity: 1; }
              }
              &:hover { border: 0.0625rem solid lightgray;
                & img { opacity: 1; }
              }
            }
            & .image-container.hidden { width: 0; }
            & .image-container.active { border: 0.0625rem solid lightgray;
              & img { opacity: 1; }
            }
          }
          &.vertical {
            & .main-photo { width: 75vw; order: 2; }
            & .additional-photos { width: 15vw; order: 1; }
            &.right{
              & .main-photo{ order: 1; }
              & .additional-photos { order: 2; }
            }
          }
          &.horizontal.top{
            & .additional-photos { order: 1; }
            & .main-photo { order: 2; }
          }
        }
      </style>
      <div class={"stateful_comp main image-carousel #{@config.type} #{@config.align}"} id={"component-#{@id}"} phx-hook="ImageCarousel" data-current-photo-id={@current_photo_id} data-max-images={@options.max_images} data-all-images={length(@data.additional_photos) + 1} style={@style.main.comp_container}>
        <div class={"main-photo #{if @config.type=="horizontal", do: "width100"}"} style={@style.main.main_container}>
          <div class="image-container width100" style={@style.main.image_container}>
            <img src={"/images/#{@current_photo}"} alt={@data.main_photo} id={"photo-#{to_string(@id)}"} class="pointer" style={@style.main.image}/>
          </div>
        </div>
        <div class="additional-photos width100" style={@style.additional.main_container}>
          <div class={"btn-container #{if @config.type=="vertical", do: "width100"}"}>
            <.button phx-click="prev" phx-target={"#photo-#{to_string(@id)}"} style={@style.buttons} class="btn-prev"> {@options.buttons.prev} </.button>
          </div>
          <a class="image-container additional-image-container active" style={@style.additional.image_container}>
            <img src={"/images/#{@data.main_photo}"} alt={@data.main_photo} class="pointer width100" phx-click="select" phx-target={"#photo-#{to_string(@id)}"} phx-value-photo={"additional-#{to_string(@id)}-0"} style={@style.additional.image}/>
          </a>
          <a :for={{photo, id} <- Enum.with_index(@data.additional_photos, 1)} class="image-container additional-image-container" style={@style.additional.image_container}>
            <img src={"/images/#{photo}"} alt={photo} class="pointer" phx-click="select" phx-target={"#photo-#{to_string(@id)}"} phx-value-photo={"additional-#{to_string(@id)}-#{to_string(id)}"} style={@style.additional.image}/>
          </a>
          <div class={"btn-container #{if @config.type=="vertical", do: "width100"}"}>
            <.button phx-click="next" phx-target={"#photo-#{to_string(@id)}"} style={@style.buttons} class="btn-next"> {@options.buttons.next} </.button>
          </div>
        </div>
      </div>
    </div>
    """
  end

  def handle_event("prev", _params, socket) do
    socket =
      cond do
        socket.assigns.current_photo_id == 0 ->
          update(socket, :current_photo_id, &(&1 * 0 + length(socket.assigns.data.additional_photos)))
        true ->
          update(socket, :current_photo_id, &(&1 - 1))
      end
    {:noreply, assign(socket, :current_photo, Enum.at([socket.assigns.data.main_photo | socket.assigns.data.additional_photos], socket.assigns.current_photo_id))}
  end

  def handle_event("next", _params, socket) do
    socket =
      cond do
        socket.assigns.current_photo_id == length(socket.assigns.data.additional_photos) -> update(socket, :current_photo_id, &(&1 * 0))
        true -> update(socket, :current_photo_id, &(&1 + 1))
      end
    {:noreply, assign(socket, :current_photo, Enum.at([socket.assigns.data.main_photo | socket.assigns.data.additional_photos], socket.assigns.current_photo_id))}
  end

  def handle_event("select", %{"photo" => photo}, socket) do
    socket = update(socket, :current_photo_id, &(&1 * 0 + String.to_integer(String.replace(photo, "additional-#{to_string(socket.assigns.id)}-", ""))))
    {:noreply, assign(socket, :current_photo, Enum.at([socket.assigns.data.main_photo | socket.assigns.data.additional_photos], socket.assigns.current_photo_id))}
  end
end
