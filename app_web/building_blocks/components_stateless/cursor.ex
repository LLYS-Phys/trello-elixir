defmodule AppWeb.Cursor do
  use AppWeb, :html

  @moduledoc """
    A component for creating a custom cursor
    Usage:
      Call default cusror:  <.cursor class="class">Page code in here</.cursor>
      Call custom cursor:   <.cursor config={%{type: 1}} options={ %{ hide_cursor: true, focus_elements: ["a", "button", ".lang-select"],
                                                                      changing_cursor_color: true } }
                                      style={ %{ initial_diameter: "1rem", hover_diameter: "2rem", cursor_color_rgb: "255,80,80" } } >
                            </.cursor>
    Notes:
      1) we set a jabvascript "Hook" in the "hooks.js file;
      2) using the ".layer3" class to pass styling from "app.css";
      3) We need to position the div agaisnt the window and at coordinates (0,0) so that javascript translation matches the real position;
      4) We need this "pointer-events" property to allow the mouse to click through our ".dtoCursor" div;
      5) we need to transition changes in size but cannot use the ".transMed" as that would apply to all changes and we don't want it
          to be applied to "transform" (we want this to be immediate);
      6) We're writing all the js into the "hooks.js" file at runtime time, so when we want to do it we need, before, to comment 2
         lines in the "dev.exs" file, otherwise you enter a loop of writing the file;
  """
  attr :attribs, :global
  attr :class, :string, required: true
  attr :style, :map, default: %{main: "", inner: ""}
  attr :config, :map, default: %{type: "cursor", colorType: "dynamic"} # coptions: %{type: "cursor/nocursor", colorType: "dynamic/animated"}
  attr :options, :map, default: %{}
  slot :inner_block, required: true
  def cursor(assigns) do
    js =  """
    /* ............................................ cursor hook #{assigns.class} ........................................................ */
    Hooks.Cursor#{assigns.class} = {
      mounted() {
        const cursor = document.querySelector(".dotCursor.#{assigns.class}");
        const positionElement = (e)=> {
          const mouseY = e.clientY;
          const mouseX = e.clientX;
          cursor.style.transform = `translate(${mouseX-cursor.offsetWidth/2}px, ${mouseY-cursor.offsetHeight/2}px)`;              // 2
          const elem = document.elementFromPoint(mouseX, mouseY);

          const rgb = getComputedStyle(elem).backgroundColor;
          cursor.style.filter = "invert(100%)";
          if (elem.tagName == "A") { Object.assign(cursor.style,{width:"4rem", height:"4rem"}) }
          else { Object.assign(cursor.style,{width:"2rem", height:"2rem"}) }

          /* TODOs
          Make the change in size dependent on that options being selected on the component (use data-attributes);
          Make the elements where the change in size happens dependent on that options being selected on the component (use data-attributes);
          */
        }
        let cursorComponent = document.querySelectorAll(".stateless_comp.cursor.#{assigns.class}");
        cursorComponent.addEventListener('mousemove', positionElement);
        cursorComponent.addEventListener('mouseenter', function() {cursor.style.display = "flex"});
        cursorComponent.addEventListener('mouseleave', function() {cursor.style.display = "none"});
      }
    }
    """
#    file_path = Path.expand("assets/js", File.cwd!)
#    file = Path.join(file_path, "hooks.js")
#    File.write(file, js, [:append])                                                                                                         #(4)
    ~H"""
    <style>
      .stateless_comp.cursor.<%= @class %> { background-color: lime;
          <%= if @config.type == "nocursor" do "& * { cursor: none; }" end %>
        & * {background-color: inherit;}
        & .dotCursor {  display: none; width: 3rem; height: 3rem; border-radius: 50%; top: 0; left: 0;       <% #3 %>
                        pointer-events: none; transition: width 0.5s, height 0.5s;                                            <% #4,5 %>
                          <%= if @config.colorType == "animated" do " animation-name: cursorStretch; animation-duration: 2s;
                                                                    animation-timing-function: ease-out; animation-direction: alternate;
                                                                    animation-iteration-count: infinite; animation-play-state: running;
                                                                  " end %> }
      }
        <%= if @config.colorType == "animated" do "
      @keyframes cursorStretch {
        0% { opacity: 0.2; background-color: green; border-radius: 100%; }
        50% { background-color: orange; }
        100% { background-color: red; }
      }
      " end %>
    </style>
    <div id={"cursor#{@class}"} phx-hook={"Cursor#{@class}"} class={"stateless_comp main fullHSpace cursor #{@class}"} {@attribs} style={@style.main}><% #1,2 %>
      <div class={"dotCursor layer3 fixed #{@class}"} style={@style.inner}></div>
      {render_slot(@inner_block)}
    </div>
    """
  end
end
