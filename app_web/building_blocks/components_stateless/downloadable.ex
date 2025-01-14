defmodule AppWeb.Downloadable do
  @moduledoc """
    Calling the component:
      Basic call:
        <.downloadable class="" data={%{file_path: "/images/astronaut.png", link_text: "test download - "}} />
      A call with more control:
        <.downloadable class="" config={%{type: 1/2}} data={%{file_path: "/images/astronaut.png", link_text: "test download - "}} style={%{main: "", link: "", link_text: "background-color: white;", file_name: "background-color: white;", bg_image: "", icon: ""}} options={%{download_icon: 1, file_name: 1, background_image: "", hover_border_color: "rgba(0,0,0,0.3)"}}/>
  """

  use AppWeb, :html
  use AppWeb, :verified_routes

  attr :class, :string, required: true
  attr :config, :map, default: %{type: 1}
  attr :data, :map, default: %{file_path: "", link_text: ""}
  attr :style, :map, default: %{main: "", link: "", link_text: "", file_name: "", bg_image: "", icon: ""}
  attr :options, :map, default: %{download_icon: 1, file_name: 1, background_image: "", hover_border_color: "rgba(0,0,0,0.3)"}

  def downloadable(assigns) do
    ~H"""
    <style>
      .stateless_comp.main.downloadable {
        & .link .icon { margin: 0.5rem; }
        &.type-1:hover { font-weight: bold; }
        &.type-2 { height: 10rem; width: 10rem; border: 0.0625rem solid transparent;
          & .link { height: inherit; width: inherit;
            & .icon { bottom: 0; right: 0; }
            & .bg-image { height: inherit; width: inherit; padding: 0.5rem; }
          }
          &:hover { border: 0.0625rem solid <%= @options.hover_border_color %>; }
        }
      }
    </style>
    <div class={"stateless_comp main downloadable #{if @config.type==1, do: "width100"} #{@class} type-#{@config.type}"} style={@style.main}>
      <a href={@data.file_path} download class={"link #{if @config.type==2, do: "relative"}"} style={@style.link}>
        <span class="link-text layer1 relative" style={@style.link_text}> {@data.link_text} </span>
        <span class="file-name layer1 relative" style={@style.file_name}> {if @options.file_name == 1, do: List.last(String.split(@data.file_path, "/"))} </span>
        <img :if={@config.type == 2} class={"bg-image #{if @config.type==2, do: "absolute"}"} src={if @options.background_image == "", do: @data.file_path, else: @options.background_image} style={@style.bg_image}/>
        <.icon :if={@options.download_icon == 1} name="hero-arrow-down-tray" class={"icon #{if @config.type==2, do: "absolute"}"} style={@style.icon}/>
      </a>
    </div>
    """
  end
end
