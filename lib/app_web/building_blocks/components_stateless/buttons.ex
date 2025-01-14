#....................................................... Description .........................................................
#								                .......................... Purpose ...........................
# To define different buttons;
#								                ..................... Render the component ...................
# 1) You have to "import AppWeb.StatelessCompButtons" to the "layouts.ex" file that renders the layouts;
# 2) Copy the component signature you want to use and pass the mandatory attributes plus the optional ones according to its
#    signature (for example):
#			                          <.stateless_comp_button_next_previous />
#                               ...................... Notes & learnings .....................
# 3) We need to import all these components as we use some of them in our pages;
# 4)
#    a) We're writing all the CSS cointained in the module attributes into a css file at compile time, so while
#    developing, as everytime you make a change in this file it will compile and write again all the css rules, keep this function
#    commented except when you really want to write in the css file;
#    b) You need to add this right before the end of the file;
# 5) We're passing the "hoverActive" class to pass a standard "active state" defined in "app.css";
#.............................................................................................................................
defmodule AppWeb.StatelessCompButtons do
  use AppWeb, :html

  #  import AppWeb.BuildingBlocks                                                                                              #(3)
#............................................. stateless_comp_button_next_previous ...........................................
  attr :attribs, :global
  attr :class, :string, default: nil
  attr :style, :map, default: %{main: ""}
  attr :config, :map, default: %{type: "next"}  # options: %{type: "next/previous"}

  def stateless_comp_button_next_previous(assigns) do
    ~H"""
    <style>
    .buttonNextPrevious { width: 4rem; height: 2.5rem; margin: 1rem; padding-bottom: 0.5rem; background-color: silver;
                          color: white; font-size: 2rem; }
    </style>
    <div class={"stateless_comp main buttonNextPrevious hoverActive #{@class}"} {@attribs} style={@style.main}>               <%#(5)%>
      <%= if @config.type == "next" do %> &gt; <% end %>
      <%= if @config.type == "previous" do %> &lt; <% end %>
    </div>
    """
  end
#................................................ stateless_comp_button_link .................................................
attr :attribs, :global
attr :class, :string, default: nil
attr :style, :map, default: %{main: "", link: "", button: ""}
attr :type, :string, default: "navigate", values: ~w(navigate patch)
attr :options, :map, default: %{url: "/", buttonText: "Back to Home"}

def stateless_comp_button_link(%{type: "navigate"} = assigns) do
  ~H"""
  <style>
    .buttonLink { margin: 1rem; color: white; font-size: 1.5rem;
      & button { background-color: grey; }
    }
  </style>
  <div class={"stateless_comp main buttonLink #{@class}"} {@attribs} style={@style.main}>
    <.link navigate={~p"/#{@options.url}/"} style={@style.link}>
      <.button class="hoverActive" style={@style.button}>{@options.buttonText}</.button>                                 <%#(5)%>
    </.link>
  </div>
  """
end
def stateless_comp_button_link(%{type: "patch"} = assigns) do
  ~H"""
  <style>
  .buttonLink { margin: 1rem; padding: 0.5rem; color: white; font-size: 1.5rem; background-color: grey;}
  </style>
  <div class={"stateless_comp main buttonLink #{@class}"} {@attribs} style={@style.main}>
    <.link patch={~p"/#{@options.url}/"} style={@style.link}>
      <.button class="hoverActive" style={@style.button}>{@options.buttonText}</.button>                                 <%#(5)%>
    </.link>
  </div>
  """
end



#........................................................ TESTS! .............................................................
  attr :anim_props, :map, default: %{back_color: "blue", anim_duration: "2s", anim_delay: "0s", anim_loop: "infinite"}

  def css_variables_test(assigns) do
    ~H"""
    <style>
      .test-input{ width: 5rem; height: 5rem;
                   animation: colorChange var(--anim-duration) var(--anim-delay) var(--anim-iteration-count); }
      @keyframes colorChange{
          0% {  background-color: transparent }
          50% { background-color: var(--color-change) }
          100% { background-color: transparent }
      }
    </style>
    <div class="test-input" style={"--color-change: #{@anim_props.back_color}; --anim-delay: #{@anim_props.anim_delay};
                                    --anim-duration: #{@anim_props.anim_duration}; --anim-iteration-count: #{@anim_props.anim_loop};"}>
    </div>
    """
  end

  attr :class, :string, required: true
  attr :anim_props, :map, default: %{back_color: "blue", anim_duration: "2s", anim_delay: "0s", anim_loop: "infinite"}

  def css_variables_test1(assigns) do
    ~H"""
    <style>
      .test-input<%= @class %> { width: 5rem; height: 5rem;
        animation: colorChange<%= @class %> <%= @anim_props.anim_duration %> <%= @anim_props.anim_delay %> <%= @anim_props.anim_loop %>; }
      @keyframes colorChange<%= @class %> {
        0% {  background-color: transparent }
        50% { background-color: <%= @anim_props.back_color %> }
        100% { background-color: transparent }
      }
    </style>
    <div class={"test-input#{@class}"}></div>
    """
  end

end
