defmodule AppWeb.SidebarBoxWrapper do
  @moduledoc """
    Calling the component:
      The Basic:
        <.box_wrapper>
          INNER CONTENT
        </.box_wrapper>

      All available options:
        <.box_wrapper config={%{title: "Bestsellers"}} options={%{bg_color: "lightgray"}} style={%{main: "", title_wrapper: "", title: "", content: ""}}>
          INNER CONTENT
        </.box_wrapper>
  """

  use AppWeb, :html

  attr :config, :map, default: %{title: "Header"}
  attr :style, :map, default: %{main: "", title_wrapper: "", title: "", content: ""}
  attr :options, :map, default: %{bg_color: "lightgray"}
  slot :inner_block, required: true

  def box_wrapper(assigns) do
    ~H"""
    <style>
      .stateless_comp.main.box-wrapper { border: 0.0625rem solid <%= @options.bg_color %>;
        & .title-wrapper { min-height: 3rem; background-color: <%= @options.bg_color %>; padding-left: 0.75rem;
          & h2 { font-size: 2rem; }
        }
        & .content { padding: 0.75rem; }
        &:has(.bestsellers-box) .content { padding: 0; }
      }
    </style>
    <div class="stateless_comp main box-wrapper width100" style={@style.main}>
      <div class="title-wrapper width100" style={@style.title_wrapper}>
        <h2 style={@style.title}>{@config.title}</h2>
      </div>
      <div class="content" style={@style.content}>
        {render_slot(@inner_block)}
      </div>
    </div>
    """
  end
end
