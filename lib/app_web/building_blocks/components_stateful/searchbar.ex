defmodule AppWeb.Search do
  @moduledoc """
    A component for rendering a searchbar
    Usage:
      <.live_component module={AppWeb.Search} id="searchbar-desktop" class="desktop" options={%{project: "satcom/", result_hover_color: "lightgray", input_focus_color: "blue"}} style={%{main: "", searchbar: %{container: "", inner_container: "", form: "", input: %{main: "width: 100%;", inner: "", label: ""}, icon_container: "", icon: ""}, results: %{container: "", link: "", photo_container: "", photo: "", name: "", price: ""}}}/>
  """
  use AppWeb, :live_component
  alias App.Products
  alias App.Categories

  attr :options, :map, default: %{project: "", result_hover_color: "lightgray", input_focus_color: "blue"}
  attr :style, :map, default: %{main: "", searchbar: %{container: "", inner_container: "", form: "", input: %{main: "", inner: "", label: ""}, icon_container: "", icon: ""}, results: %{container: "", link: "", photo_container: "", photo: "", name: "", price: ""}}

  def mount(socket) do
    {:ok, assign(socket, categories: Categories.list_categories(), query: "", products: [])}
  end

  def render(assigns) do
    ~H"""
    <div class={"stateful_comp main searchbar-container layer2 width100 relative #{@class}"} style={@style.main}>
      <style>
        .stateful_comp.searchbar-container { padding: 1.25rem;
          & .results-container { top: 5rem; width: 40rem;
            & .result { box-shadow: 0 0.25rem 0.25rem 0 darkgray; padding: 1rem; background-color: white;
              &:hover { background-color: <%= @options.result_hover_color %>; }
              & .result-photo { width: 15%; }
              & .result-name { width: 15rem; }
            }
          }
          & .searchbar .container {
            & form input { padding: 1rem; margin-top: 0.25rem; font-size: 1rem;
              &:focus { border-color: <%= @options.input_focus_color %>; }
            }
            & .icon-container { top: 0; bottom: 0; inset-inline-end: 0; padding: 0 1rem; 
              & span { color: darkgray; }
            }
          }
        }
      </style>
      <div class={"searchbar width100 #{@class}"} style={@style.searchbar.container}>
        <div class="container relative" style={@style.searchbar.inner_container}>
          <form class="width100" phx-change="search" phx-click-away="blur" phx-target={@myself} phx-debounce="3000" style={@style.searchbar.form}>
            <.input type="text" name="search" placeholder="Search..." value= "" style={%{main: "width: 100%; #{@style.searchbar.input.main}", inner: @style.searchbar.input.inner, label: @style.searchbar.input.label}} attribs={%{autocomplete: "off"}}/>
          </form>
          <div class="icon-container absolute" style={@style.searchbar.icon_container}> <.icon name="hero-magnifying-glass" style={@style.searchbar.icon}/> </div>
        </div>
      </div>
      <div class="results-container absolute" style={@style.results.container}>
        <.link :for={product <- @products} class="result" navigate={"/#{@options.project}product/#{elem(product,0)}/#{String.replace(elem(product,1), " ", "-")}"} :if={elem(product,0)>0} style={@style.results.link}>
          <div class="result-photo" style={@style.results.photo_container}> <img src={~p"/images/" <> elem(product,2)} style={@style.results.photo}/> </div>
          <div class="result-name" style={@style.results.name}> {elem(product,1)} </div>
          <div class="result-price" style={@style.results.price}> {elem(product,3)} EUR </div>
        </.link>
        <div class="result space-between" :for={product <- @products} :if={elem(product,0)==0} style={@style.results.link}>
          <div class="result-name" style={@style.results.name}> {elem(product,1)} </div>
        </div>
      </div>
    </div>
    """
  end

  def handle_event("search", %{"search" => query}, socket) do
    cond do
      length(Products.search(query)) == 0 ->
        socket = assign(socket, products: [{0, "No results found", "", ""}])
        {:noreply, socket}
      String.length(query) > 0 ->
        socket = assign(socket, products: Products.search(query))
        {:noreply, socket}
      true ->
        socket = assign(socket, products: [])
        {:noreply, socket}
    end
  end

  def handle_event("blur", _params, socket) do
    {:noreply, assign(socket, products: [])}
  end
end
