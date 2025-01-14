defmodule AppWeb.CategoryBar do
  @moduledoc """
    Calling the component:
      The Basic:
        <.category_bar data={%{categories: @categories, active_category: @active_category, active_subcategory: @active_subcategory}}/>
      All available options:
        <.category_bar data={%{categories: @categories, active_category: @active_category, active_subcategory: @active_subcategory}} options={%{project: "satcom/"}} style={%{main: "", category_bar_item: "", category_bar_item_active: "", category_label: "", category_name: "", arrow: "", subcategory: "", subcategory_item: ""}}/>
  """

  use AppWeb, :html
  use AppWeb, :verified_routes
  alias Phoenix.LiveView.JS

  attr :data, :map, default: %{categories: [], active_category: nil, active_subcategory: nil}
  attr :options, :map, default: %{ project: "satcom/", category_hover_color: "lightgray", subcategory_hover_color: "lightgray"}
  attr :style, :map, default: %{ main: "", category_bar_item: "", category_bar_item_active: "", category_label: "", category_name: "", arrow: "", subcategory: "", subcategory_item: ""}

  def category_bar(assigns) do
    ~H"""
    <style>
      .stateless_comp.category-bar { border: 0.0625rem solid lightgray; border-radius: 0.25rem; box-shadow: 0 0.125rem 0.25rem 0 rgba(0,0,0,0.1);
        & .category-bar-item { border-bottom: 0.0625rem solid lightgray;
          &:hover { background-color: <%= @options.category_hover_color %>; }
          & .category-label { padding: 0 1rem; min-height: 3rem;
            & .arrow { padding: 0.5rem;
              &:not(.expanded):before { content: "+"; padding: 0.25rem; }
            }
            & .arrow.expanded:before { content: "-"; padding: 0.25rem; }
          }
          & .subcategory { display: none; background-color: white; margin-top: 0.25rem;
            & .subcategory-item { font-size: 95%; padding: 0 1rem; min-height: 2.5rem; color: black;
              &:hover { background-color: <%= @options.subcategory_hover_color %>; }
            }
            & .subcategory-item.active { color: white; background-color: darkgray; }
          }
          & .subcategory.visible { display: flex; }
          & .subcategory--active { color: white; background-color: lightgray; }
        }
        & .category-bar-item.active { color: white; background-color: darkgray; }
      }
    </style>
    <ul class="stateless_comp main category-bar" id="category-bar" style={@style.main}>
      <li class={"stateless_comp main category-bar-item pointer width100 #{if @data.active_category == nil && @data.active_subcategory == nil, do: "active"}"} phx-click={JS.patch("/#{@options.project}products/")} style={"#{@style.category_bar_item} #{if @data.active_category == nil && @data.active_subcategory == nil, do: @style.category_bar_item_active}"}>
        <div class="category-label width100 space-between" style={@style.category_label}>
          <span class="category-name" style={@style.category_name}>All Products</span>
        </div>
      </li>
      <li :for={category <- @data.categories} class={"category-bar-item pointer width100 #{if @data.active_category == category.id && (@data.active_subcategory == nil || @data.active_subcategory == 14), do: "active"}"} phx-click={JS.patch("/#{@options.project}products/#{String.replace(category.name, " ", "-")}/#{category.id}")} style={"#{@style.category_bar_item} #{if @data.active_category == category.id && (@data.active_subcategory == nil || @data.active_subcategory == 14), do: @style.category_bar_item_active}"}>
        <div class="category-label width100 space-between" style={@style.category_label}>
          <span class="category-name" style={@style.category_name}>{category.name}</span>
          <span :if={category.sub_categories != []} phx-click={JS.toggle(to: "#subcategories-#{category.id}") |> JS.toggle_class("expanded", to: "#arrow-#{category.id}")} id={"arrow-#{category.id}"} class={"arrow pointer #{if @data.active_category == category.id, do: "expanded", else: ""}"} style={@style.arrow}></span>
        </div>
        <ul class="subcategory width100" id={"subcategories-#{category.id}"} style={if @data.active_category == category.id, do: "display:block; #{@style.subcategory}", else: "display:none;"}>
          <li :for={subcategory <- category.sub_categories} class={"subcategory-item #{if @data.active_subcategory == subcategory.id && @data.active_subcategory != 14, do: "active"}"} phx-click={JS.patch("/#{@options.project}products/#{String.replace(category.name, " ", "-")}/#{String.replace(subcategory.name, " ", "-")}/#{category.id}/#{subcategory.id}")} style={@style.subcategory_item}>
            {subcategory.name}
          </li>
        </ul>
      </li>
    </ul>
    """
  end
end
