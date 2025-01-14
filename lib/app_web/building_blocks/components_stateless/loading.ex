#....................................................... Description .........................................................
#								                .......................... Purpose ...........................
# To define different loading effects;
#								                ..................... Render the component ...................
# 1) You have to "import AppWeb.StatelessCompLoading" to the "layouts.ex" file that renders the layouts;
# 2) Copy the component signature you want to use and pass the mandatory attributes plus the optional ones according to its
#    signature (for example):
#			                          <.stateless_comp_loading_threeRings />
#                               ...................... Notes & learnings .....................
# 3) We need to import all these components as we use some of them in our pages;
# 4)
#    a) We're writing all the CSS cointained in the module attributes into a css file at compile time, so while
#    developing, as everytime you make a change in this file it will compile and write again all the css rules, keep this function
#    commented except when you really want to write in the css file;
#    b) You need to add this right before the end of the file;
# 5) The class match the animation class name we have in the "anim_effects.css" file as these loading effects depend on the use
#    of the animations defined in there and are controlled by the use of specific classes;
# 6) To avoid animation flowing outside the ".main" make the ".cubeMove" "width" and "height" are the sum of their children
#    width and height;
# 7) We're dynamically creating the elements:
#    a) creating at the same time an "id" (based on the index position) that should be used to identify each block created;
#    b) making the index start at 1 instead of 0, the default (see: https://hexdocs.pm/elixir/Enum.html#with_index/2);
# 9) The "transform: translateX" value must be equal to half of the ".main" "width" minus half of this element's "width";
# 10) The value of this variable should be equal to teh value of the default "@options.speed". ;
# 11) Maximum of 15 elements as that is hardcoded in the "for" loop in the corresponding module atribute where we dynamically
#     generate the animation for each dot;
#.............................................................................................................................
defmodule AppWeb.StatelessCompLoading do
  use AppWeb, :html

  #  import AppWeb.BuildingBlocks                                                                                              #(3)
#............................................. stateless_comp_loading_threeRings .............................................
  attr :attribs, :global
  attr :class, :string, default: nil
  attr :style, :map, default: %{main: "", spinFast: "", spinMedium: "", spinSlow: ""}

  def stateless_comp_loading_threeRings(assigns) do
    ~H"""
    <style>
      .loading.threeRings {
        & div { border: 0.3rem solid transparent; border-radius: 50%; }
        & .spinFast { width: 6rem; height: 6rem; border-top-color: red; animation: loadingThreeRingsspin 2s linear infinite; }
        & .spinMedium { width: 4rem; height: 4.5rem; border-top-color: blue; animation: loadingThreeRingsspin 3s linear infinite; }
        & .spinSlow { width: 2rem; height: 3rem; border-top-color: yellow; animation: loadingThreeRingsspin 4s linear infinite; }
      }
      @keyframes loadingThreeRingsspin {
        0%  { transform: rotate(0deg) }
        100% { transform: rotate(360deg) }
      }
    </style>
    <div class={"stateless_comp main loading threeRings #{@class}"} {@attribs} style={@style.main}>
      <div class="spinFast" style={@style.spinFast}>                                                                          <%#(5)%>
        <div class="spinMedium" style={@style.spinMedium}>                                                                    <%#(5)%>
          <div class="spinSlow" style={@style.spinSlow}></div>                                                                <%#(5)%>
        </div>
      </div>
    </div>
    """
  end
#.............................................. stateless_comp_loading_cubeMove ..............................................
  attr :attribs, :global
  attr :class, :string, required: true
  attr :style, :map, default: %{main: "", cube1: "", cube2: ""}
  attr :config, :map, default: %{type: "normal"} # options: %{type: "normal/extRot"}
  attr :css, :map, default: %{size: 4}                                                                                       #(6)

  def stateless_comp_loading_cubeMove(assigns) do
    ~H"""
    <style>
      .loading.cubeMove.<%= @class %> { position: relative; width: <%= @css.size %>rem; height: <%= @css.size %>rem; align-items: end;
        & div { position: absolute; width: <%= @css.size/2 %>rem; height: <%= @css.size/2 %>rem; border-radius: 50%; animation: loadingCubeMoveanimloader 1s infinite ease-in-out; }
        & .cube1 { background-color: red; transform: scale(0.5) translate(0,0); }
        & .cube2 { background-color: blue; transform: scale(0.5) translate(-3rem,-3rem); }
        &.extRot { animation: loadingCubeMoverotation 1s linear infinite; }
      }
      @keyframes loadingCubeMoverotation {
        0% { transform: rotate(0deg) }
        100% { transform: rotate(360deg) }
      }
      @keyframes loadingCubeMoveanimloader { 50% { transform: scale(1) translate(-50%, -50%) } }
    </style>
    <div class={"stateless_comp main loading cubeMove #{@class} #{if @config.type == "extRot" do "extRot" end}"}
          {@attribs} style={@style.main}>
      <div class="cube1" style={@style.cube1}></div>                                                                          <%#(5)%>
      <div class="cube2" style={@style.cube2}></div>                                                                          <%#(5)%>
    </div>
    """
  end
#............................................. stateless_comp_loading_twincircles ............................................
  attr :attribs, :global
  attr :class, :string, default: nil
  attr :style, :map, default: %{main: "", left: "", right: ""}
  attr :config, :map, default: %{type: "fullRot"} # options: %{type: "fullTor/halfRot"}

  def stateless_comp_loading_twinCircles(assigns) do
    ~H"""
    <style>
      .loading.twinCircles { width: 7rem; height: 7rem;
        & .elem { height: 50%; border-radius: 50%; background-color: DodgerBlue; }
        &.halfRot { animation: loadingTwinAnimRotateHalfRot 2.0s infinite linear; }
        &.fullRot { animation: loadingTwinAnimRotateFullRot 2.0s infinite linear; }
        & div { animation: loadingTwinAnimBounce 2.0s infinite ease-in-out; }
        & .right { animation-delay: -1s; }
      }
      @keyframes loadingTwinAnimRotateHalfRot {
        0%, 100% { transform: rotate(0deg) }
        50% { transform: rotate(180deg) }
      }
      @keyframes loadingTwinAnimRotateFullRot {
        0%, 100% { transform: rotate(0deg) }
        50% { transform: rotate(360deg) }
      }
      @keyframes loadingTwinAnimBounce {
        0%, 100% { transform: scale(0.0) }
        50% { transform: scale(1.0) }
      }
    </style>
    <div class={"stateless_comp main loading twinCircles #{@class} #{if @config.type == "fullRot" do "fullRot" end}
                #{if @config.type == "halfRot" do "halfRot" end }"} {@attribs} style={@style.main}>                           <%#(5)%>
      <div  class="elem left width50"   style={"#{@style.left}"}></div>                                   								            <%#(5)*%>
      <div  class="elem right width50"  style={"#{@style.right}"}></div>                                  								            <%#(5)*%>
    </div>
    """
  end
#............................................. stateless_comp_loading_arrowBlink ............................................
  attr :attribs, :global
  attr :class, :string, default: nil
  attr :style, :map, default: %{main: "", left: "", middle: "", right: ""}

  def stateless_comp_loading_arrowBlink(assigns) do
    ~H"""
    <style>
      .loading.arrowBlink {
        & div { width: 1.5rem; height: 1.5rem; margin: 0 0.2rem; border-radius: 50%; background-color: DodgerBlue; animation: loadingArrowBlink 2s infinite ease-in-out both; }
        & .middle { animation-delay: 0.25s; }
        & .right { animation-delay: 0.5s; }
      }
      @keyframes loadingArrowBlink {
        0%, 80%, 100% { transform: scale(0.0) }
        40% { transform: scale(1.0) }
      }
    </style>
    <div class={"stateless_comp main loading arrowBlink #{@class}"} {@attribs} style={@style.main}>                           <%#(5)%>
      <div  class="left" style={"#{@style.left}"}></div>                                   								                    <%#(5)*%>
      <div  class="middle" style={"#{@style.middle}"}></div>                                  								                <%#(5)*%>
      <div  class="right" style={"#{@style.right}"}></div>                                  								                  <%#(5)*%>
    </div>
    """
  end
#............................................. stateless_comp_loading_dotSpinner ............................................
  attr :attribs, :global
  attr :class, :string, default: nil
  attr :style, :map, default: %{main: "", item: ""}
  attr :dots, :list, default: [%{degrees: "30", style: ""}, %{degrees: "60", style: ""}, %{degrees: "90", style: ""},
                              %{degrees: "120", style: ""}, %{degrees: "150", style: ""}, %{degrees: "180", style: ""},
                              %{degrees: "210", style: ""}, %{degrees: "240", style: ""}, %{degrees: "270", style: ""},
                              %{degrees: "300", style: ""}, %{degrees: "330", style: ""}, %{degrees: "360", style: ""}]       #(11)
  attr :config, :map, default: %{type: "all"} # options: %{type: "one/onlelinear/all"}
  attr :css, :map, default: %{translateX: "3rem"}

  def stateless_comp_loading_dotSpinner(assigns) do
    ~H"""
    <style>
      .loading.dotSpinner { position: relative; width: 8rem; height: 8rem;
        & .one { animation: loadingDotSpinnerOne 1.2s infinite; }
        &.onelinear { animation: loadingDotSpinnerOne 1.2s linear infinite; }
        & div { position: absolute; width: 1rem; height: 1rem; border-radius: 50%; background-color: DodgerBlue; }
        &.all {
          & div { animation: loadingDotSpinnerAll 1.2s infinite; }
          <%= for {_i, id} <- Enum.with_index(@dots,1) do %>
          & .item<%= id %> { animation-delay: <%= if id < 11 do "0.#{id-1}s;" else if id == 11 do "1.0s;" else "1.#{id-1}s;"  end end %> }
          <% end %>
        }
      }
      @keyframes loadingDotSpinnerAll  {
        0%, 100% { opacity: 0; }
        25%, 50% { opacity: 1; }
      }
      @keyframes loadingDotSpinnerOne {
        0% { transform: rotate(0) }
        100% { transform: rotate(360deg) }
      }
    </style>
    <div class={"stateless_comp main loading dotSpinner #{@class} #{if @config.type == "one" do "one" end}
                #{if @config.type == "onelinear" do "onelinear" end} #{if @config.type == "all" do "all" end}"}
                {@attribs} style={@style.main}>
        <%= for {i, id} <- Enum.with_index(@dots,1) do %>                                                                     <%#(7)%>
      <div class={"item#{id}"}  style={"#{@style.item} #{i.style}
                    transform: rotate(#{i.degrees}deg) translateX(#{@css.translateX});
                  #{if (@config.type == "onelinear" ||  @config.type == "one" ) do "opacity: #{id/Enum.count(@dots)};
                      width: #{1-1/(2*id)}rem; height: #{1-1/(2*id)}rem;" end}"}>                                             <%#(9)%>
      </div>
        <% end %>
    </div>
    """
  end
#............................................. stateless_comp_loading_wave ............................................
  attr :attribs, :global
  attr :class, :string, required: true
  attr :style, :map, default: %{main: "", item1: "", item2: "", item3: "", item4: "", item5: ""}
  attr :config, :map, default: %{type: "onecolor"}  # options: %{type: "onecolor/twocolors/threecolors/fourcolors"}
  attr :css, :map, default: %{color1: "yellow;", color2: "Fuchsia;", color3: "aqua;"}

  def stateless_comp_loading_wave(assigns) do
    ~H"""
    <style>
      .loading.wave.<%= @class %> {
        & div { width: 0.7rem; height: 5rem; margin: 0.2rem; background-color: DodgerBlue; }
        &.fourcolors div { animation: loadingWave4colors<%= @class %> 1.2s infinite ease-in-out; }
        &.threecolors div { animation: loadingWave3colors<%= @class %> 1.2s infinite ease-in-out; }
        &.twocolors div { animation: loadingWave2colors<%= @class %> 1.2s infinite ease-in-out; }
        &.onecolor div { animation: loadingWave1color<%= @class %> 1.2s infinite ease-in-out; }
        & .item2 { animation-delay: -1.1s !important; }
        & .item3 { animation-delay: -1s !important; }
        & .item4 { animation-delay: -0.9s !important; }
        & .item5 { animation-delay: -0.8s !important; }
      }
      @keyframes loadingWave4colors<%= @class %> {
        0%, 40%, 100% { transform: scaleY(0.4) }
        80%{ background-color: <%= @css.color3 %> }
        40% { background-color: <%= @css.color2 %> }
        20% { transform: scaleY(1.0); background-color: <%= @css.color1 %> }
      }
      @keyframes loadingWave3colors<%= @class %> {
        0%, 40%, 100% { transform: scaleY(0.4) }
        80%{ background-color: <%= @css.color2 %>}
        40% { background-color: <%= @css.color1 %> }
        20% { transform: scaleY(1.0) }
      }
      @keyframes loadingWave2colors<%= @class %> {
        0%, 40%, 100% { transform: scaleY(0.4) }
        60% { background-color: <%= @css.color1 %> }
        20% { transform: scaleY(1.0) }
      }
      @keyframes loadingWave1color<%= @class %> {
        0%, 40%, 100% { transform: scaleY(0.4) }
        20% { transform: scaleY(1.0) }
      }
    </style>
    <div class={"stateless_comp main loading wave #{@class} #{@config.type}"} {@attribs} style={@style.main}>
      <div  class="item1" style={@style.item1}></div>                                   					                            <%#(5)*%>
      <div  class="item2" style={@style.item2}></div>                                   					                            <%#(5)*%>
      <div  class="item3" style={@style.item3}></div>                                   					                            <%#(5)*%>
      <div  class="item4" style={@style.item4}></div>                                   					                            <%#(5)*%>
      <div  class="item5" style={@style.item5}></div>                                   					                            <%#(5)*%>
    </div>
    """
  end
#............................................... stateless_comp_loading_simple ...............................................
  attr :attribs, :global
  attr :class, :string, default: nil
  attr :style, :map, default: %{main: "", inner: ""}
  attr :config, :map, default: %{type: "visible"}  # options: %{type: "visible/nonvisible"}

  def stateless_comp_loading_simple(assigns) do
    ~H"""
    <style>
      .loading.simple {
        & div { width: 4rem; height: 4rem; border: 0.25rem solid transparent; border-radius: 50%; border-top-color: blue; animation: loadingSimple 1s linear infinite; }
        &.visible { position: relative; width: 4rem; height: 4rem; border: 0.25rem solid var(--grey232); border-radius: 50%;
          & div { position: absolute; }
        }
      }
      @keyframes loadingSimple {
        0% { transform: rotate(0) }
        100% { transform: rotate(360deg) }
      }
    </style>
    <div class={"stateless_comp main loading simple #{@class} #{if @config.type == "visible" do "visible" end}"}
                {@attribs} style={@style.main}>
      <div style={@style.inner}></div>
    </div>
    """
  end
#............................................. stateless_comp_loading_spinCircle .............................................
  attr :attribs, :global
  attr :class, :string, default: nil
  attr :style, :map, default: %{main: "", ring1: "", ring2: "", ring3: "", text: ""}
  attr :config, :map, default: %{type: "text"}  # options: %{type: "text/notext"}
  attr :options, :map, default: %{text: "Loading..."}

  def stateless_comp_loading_spinCircle(assigns) do
    ~H"""
    <style>
      .loading.spinCircle { position: relative;
        &.eightrem { width: 8rem; height: 8rem; }
        &.fiverem { width: 5rem; height: 5rem; }
        &.eightrem div { width: 8rem; height: 8rem; }
        &.fiverem div { width: 5rem; height: 5rem; }
        & div { position: absolute; border: 0 solid; border-radius: 50%; }
        & .ring1 { border-color: blue; border-bottom-width: 0.5rem; animation: loadingSpinCircleRotate1 1.5s linear infinite; }
        & .ring2 { border-color: red; border-right-width: 0.5rem; animation: loadingSpinCircleRotate2 1.5s linear infinite; }
        & .ring3 { border-color: green; border-top-width: 0.5rem; animation: loadingSpinCircleRotate3 1.5s linear infinite; }
      }
      @keyframes loadingSpinCircleRotate1 {
        0% { transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg) }
        100% { transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg) }
      }
      @keyframes loadingSpinCircleRotate2 {
        0% { transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg) }
        100% { transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg) }
      }
      @keyframes loadingSpinCircleRotate3 {
        0% { transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg) }
        100% { transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg) }
      }
    </style>
    <div class={"stateless_comp main loading spinCircle #{@class} #{if @config.type == "text" do "eightrem" else "fiverem" end}"}
                {@attribs} style={@style.main}>
      <div class={"ring1 #{@class}"} style={@style.ring1}></div>
      <div class={"ring2 #{@class}"} style={@style.ring2}></div>
      <div class={"ring3 #{@class}"} style={@style.ring3}></div>
      <p :if={@config.type == "text"} style={@style.text}>{@options.text}</p>
    </div>
    """
  end
end
