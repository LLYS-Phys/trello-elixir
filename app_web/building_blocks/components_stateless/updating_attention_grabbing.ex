#....................................................... Description .........................................................
#								                .......................... Purpose ...........................
# To define different updating and attention grabbing effects;
#								                ..................... Render the component ...................
# 1) You have to "import AppWeb.StatelessCompUpdating" to the "layouts.ex" file that renders the layouts;
# 2) Copy the component signature you want to use and pass the mandatory attributes plus the optional ones according to its
#    signature (for example):
#			                          <.stateless_comp_updating_threeRings />
#                               ...................... Notes & learnings .....................
# 3) We need to import all these components as we use some of them in our pages;
# 4) We're writing all the js into the "hooks.js" file at runtime time, so when we want to do it we need, before, to
#    comment 2 lines in the "dev.exs" file, otherwise you enter a loop of writing the file;
# 5) The class match the animation class name we have in the "updating.css" file as these loading effects depend on the use
#    of the animations defined in there and are controlled by the use of specific classes;
# 6) the "height" value for these 2 elements must be the same;
# 7) We're dynamically creating the elements:
#    a) creating at the same time an "id" (based on the index position) that should be used to identify each block created;
#    b) making the index start at 1 instead of 0, the default (see: https://hexdocs.pm/elixir/Enum.html#with_index/2);
# 8) We need to use this [:] notation instead of the "." notation as that one is stricter and will return error, while this one
#	   returns "nil", which is what we want;
#.............................................................................................................................
defmodule AppWeb.StatelessCompUpdating do
  use AppWeb, :html

  #  import AppWeb.BuildingBlocks                                                                                              #(3)
#........................................... stateless_comp_updating_circleScaleOut ..........................................
  attr :attribs, :global
  attr :class, :string, default: nil
  attr :style, :map, default: %{main: ""}

  def stateless_comp_updating_circleScaleOut(assigns) do
    ~H"""
    <style>
      .stateless_comp.updating.circleScaleOut { width: 4rem; height: 4rem; border-radius: 50%; background-color: DodgerBlue; animation: updatingCircleScaleOut 1.5s infinite ease-in-out; }
      @keyframes updatingCircleScaleOut {
        0% { transform: scale(0.0) }
        100% { transform: scale(1.0); opacity: 0.1 }
      }
    </style>
    <div class={"stateless_comp main updating circleScaleOut #{@class}"} {@attribs} style={@style.main}></div>                <%#(5)%>
    """
  end
#............................................... stateless_comp_updating_beep ................................................
  attr :attribs, :global
  attr :class, :string, default: nil
  attr :style, :map, default: %{main: ""}

  def stateless_comp_updating_beep(assigns) do
  ~H"""
  <style>
    .stateless_comp.updating.beep { width: 4rem; height: 4rem; border-radius: 50%; background-color: DodgerBlue; border: 0.5rem solid grey; animation: updatingBeep 1.5s infinite ease-in-out; }
    @keyframes updatingBeep {
      0% { transform: scale(0.0) }
      25% { transform: scale(1.0); opacity: 0 }
      100% { transform: scale(0.0); opacity: 0.2 }
    }
  </style>
  <div class={"stateless_comp main updating beep #{@class}"} {@attribs} style={@style.main}></div>                            <%#(5)%>
  """
  end
#................................................ stateless_comp_updating_svt ................................................
  attr :attribs, :global
  attr :class, :string, default: nil
  attr :style, :map, default: %{main: "", blinking: "", inner: ""}

  def stateless_comp_updating_svt(assigns) do
  ~H"""
  <style>
    .stateless_comp.updating.svt { width: 4rem; height: 4rem;
      & .blinking { width: 4rem; height: 4rem; border-radius: 50%; border: solid 0.2rem red; animation: updatingSvt 1.5s infinite ease-in-out; }
      & .inner { width: 2rem; height: 2rem; border-radius: 50%; background-color: red; }
    }
    @keyframes updatingSvt {
      0% { transform: scale(0.5); opacity: 0 }
      25% { transform: scale(0.6); opacity: 0 }
      100% { transform: scale(1.0); opacity: 0.5 }
    }
  </style>
  <div class={"stateless_comp main updating svt relative #{@class}"} {@attribs} style={@style.main}>                                   <%#(5)%>
    <div class="blinking" style={@style.blinking}></div>
    <div class="inner absolute" style={@style.inner}></div>
  </div>
  """
  end
#.......................................... stateless_comp_updating_rotating_text ............................................
  attr :id, :string, required: true
  attr :attribs, :global
  attr :class, :string, default: nil
  attr :style, :map, default: %{main: "", align1: "", fixedText1: "", wrap: "", rotText: "", align2: "", fixedText2: ""}
  attr :options, :map, default: %{fixedText1: "Telespazio is: ", fixedText2: "Agree..."}
  attr :loopData, :list, default: [%{text: " SUPER!", style: ""}, %{text: " The best!", style: ""}]

  def stateless_comp_updating_rotating_text(assigns) do
  js =  """
        /* .................................... stateless_comp_updating_rotating_text#{assigns.id} .......................................... */
        Hooks.UpdatingRotatingText#{assigns.id} = {
          mounted() {
            const elem = document.querySelector("#UpdatingRotatingText#{assigns.id}");
            rotatingTextAnim#{assigns.id} = function (textId, firstRound) {
              Object.assign(elem.querySelector(".rotText.item"+textId).style, {bottom: "-75%", opacity: "0"});
              if (textId < 2) {
                if (textId == 1) {
                  if (firstRound == "no") {
                    elem.querySelector(".rotText.item2").style.bottom="75%";
                  } else {}
                } else {
                  elem.querySelector(".rotText.item"+(textId-1)).style.bottom="75%"
                }
                Object.assign(elem.querySelector(".rotText.item"+(textId+1)).style, {bottom: "0", opacity: "1"});
                var textId = textId+1;
              } else {
                elem.querySelector(".rotText.item1").style.bottom="75%";
                Object.assign(elem.querySelector(".rotText.item1").style, {bottom: "0", opacity: "1"});
                var textId = 1;
                var firstRound = "no";
              }
              setTimeout(function(){
                rotatingTextAnim#{assigns.id}(textId, firstRound)
              }, 3000)
            }
            setTimeout(function(){
              rotatingTextAnim#{assigns.id}(1, "yes")
            }, 3000)
          }
        }
        """
  ~H"""
  <%#                                                                                                                         #(4)
      file_path = Path.expand("assets/js", File.cwd!)
      file = Path.join(file_path, "hooks.js")
      File.write(file, js, [:append])
  %>
  <style>
    .stateless_comp.rotatingText { flex: 0 1 20rem; flex-flow: row nowrap;
      & .align1 { height: 2rem; margin-right: 0.5rem; }
      & .wrap { width: 6rem; height: 2rem; }
      & .rotText { left: 0; transition: bottom 1s, opacity 0.5s; }
      & .align2 { height: 2rem; margin-left: 0.5rem; }
    }
  </style>
  <div id={"UpdatingRotatingText#{@id}"} phx-hook={"UpdatingRotatingText#{@id}"}
       class={"stateless_comp main updating rotatingText #{@class}"} {@attribs} style={@style.main}>                          <%#(5,10a)%>
    <div class="align1 content-end" style={@style.align1}>                                                                                <%#(6)%>
      <h4 class="fixedText1" style={@style.fixedText1}>{@options.fixedText1}</h4>
    </div>
	  <div class="wrap relative" style={@style.wrap}>                                                                                    <%#(6)%>
			  <%= for {i, id} <- Enum.with_index(@loopData,1) do %>                                                                 <%#(7)%>
		  <h4 class={"rotText absolute item#{id}"} style={"#{@style.rotText}#{i.style}
						#{unless Regex.match?(~r/bottom/, @style.rotText) do
							unless Regex.match?(~r/bottom/, i.style) do "bottom: #{if id == 1 do 0 else 100 end}%;" end end}
						#{unless Regex.match?(~r/opacity/, @style.rotText) do
							unless Regex.match?(~r/opacity/, i.style) do "opacity: #{if id == 1 do 1 else 0 end};" end end}"}>
			  {i.text}
		  </h4>
			  <%end%>
	  </div>
        <%= if @options[:fixedText2] do %>																					                                          <%#(8)%>
    <div class="align2 content-end" style={@style.align2}>                                                                                <%#(6)%>
      <h4 class="fixedText2" style={@style.fixedText2}>{@options.fixedText2}</h4>
    </div>
        <% end %>
  </div>
  """
  end
end
