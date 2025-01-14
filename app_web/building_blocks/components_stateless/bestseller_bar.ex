defmodule AppWeb.BestsellerBar do
  @moduledoc """
    Calling the component:
      The Basic:
        <.bestseller_bar data={%{bestsellers: @bestsellers}} />
      All available options:
        <.bestseller_bar data={%{bestsellers: @bestsellers}} options={%{bg_color: "lightgray", image_space_percentage: 30, project: "satcom/"}} style={%{card: "", image_container: "", image: "", info_container: "", title: "", price: ""}} />
  """

  use AppWeb, :html
  use AppWeb, :verified_routes

  attr :data, :map, default: %{bestsellers: []}
  attr :options, :map, default: %{bg_color: "lightgray", image_space_percentage: 30, project: "satcom/"}
  attr :style, :map, default: %{main: "", image_container: "", image: "", info_container: "", title: "", price: ""}

  def bestseller_bar(assigns) do
    ~H"""
    <style>
      .stateless_comp.bestseller-card { padding: 0.5rem;
        &:hover { background-color: <%= @options.bg_color %>; }
        & .image { width: <%= @options.image_space_percentage %>%; }
        & .info { width: <%= 100 - @options.image_space_percentage %>%; }
        & .info h4 { font-size: 1rem; }
      }
    </style>
    <.link :for={bestseller <- @data.bestsellers} class="stateless_comp main bestseller-card pointer" navigate={"/#{@options.project}product/#{bestseller.id}/#{String.replace(bestseller.name, " ", "-")}"} style={@style.main}>
      <div class="image" style={@style.image_container}>
        <img src={~p"/images/" <> bestseller.main_photo} style={@style.image} />
      </div>
      <div class="info" style={@style.info_container}>
        <h4 style={@style.title}> {bestseller.name} </h4>
        <p class="price bold" style={@style.price}> {bestseller.price} EUR </p>
      </div>
    </.link>
    """
  end
end
