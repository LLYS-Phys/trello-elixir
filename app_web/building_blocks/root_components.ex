#....................................................... Description .........................................................
#								                .......................... Purpose ...........................
# To define components to be used only in the "root.html.heex" layout;
#								                ..................... Render the component ...................
# 1) You have to "import AppWeb.RootComponents" to the "layouts.ex" file that renders the layouts;
# 2) Copy the component signature you want to use and pass the mandatory attributes plus the optional ones according to its
#    signature (for example):
#			                          <.root_banner_cookies />
#                               ...................... Notes & learnings .....................
# 3) We need to import all these components as we use some of them in our pages;
# 4) You need to add to (8) right before the end of the file all the module constants (3) and uncomment it when the project is
#    finished and ready to deploy (or everytime you want to write the "assets/building_blocks.css" file). Remeber that everytime
#    you compile this file you'll be writting in that file so from time to time you should clean it!
# 5) We put this key in "conn" by using a "plug" we created in "our_plugs.ex" that reads the value stored in the cookie we set.
#   Depending on the cookie value ("true"/nil) we'll render it or not;
# 6) We're passing the:
#    a) ".layer3" class to pass a standard "z-index" for a level layer defined in "app.css";
#    b) ".transMed" class to pass a standard "transition time" defined in "app.css";
# 7) This "smallScreen" data-wrap attribute means that we only use this element because of small screens;
# 9) We're passing the "hoverActive" class to inherit the effects defined in the "app.css" file;
# 10) We use this code to write the css properties defined in all the module attributes in the "building_blocks.css" file. For
#    that we need to uncomment the code and save the file and then comment it again to prevent further write everytime this
#    file is changed and saved and compiled;
# 11) We need to use "raw" because we're inserting in the text HTML </br> elements;
#                               ................... Globals made available ...................
# 8) Cookie:
#   a) "bannerCookieState": if its value is "closed", means that this element was already seen and closed by the user:
#         - Everytime we close this element we are saving a "closed" state in a cookie. This saved state lasts for 1 month (we
#         are using the function made available in the "browser_storage.html.eex" file);
#   b) "bannerDestakState" -  if its value is "closed", means that this element was already seen and closed by the user:
#         - Everytime we close this element we are saving a "closed" state. This saved state lasts for 1 month (we are using
#           the function made available in the "browser_storage.html.eex" file);
#.............................................................................................................................
defmodule AppWeb.RootComponents do
  use Phoenix.Component
  use AppWeb, :html

  import AppWeb.SvgIcons                                                                                                      #(3)
#.................................................. root_banner_cookies ......................................................
  attr :attribs, :global
  attr :class, :string, default: nil
  attr :style, :map, default: %{main: "", text: "", link: ""}
  attr :config, :map, default: %{type: "top"} # options: %{type: "top/bottom"}
  attr :options, :map, default: %{text: "Our website use cookies/local storage to improve your browsing experience.",
                                linkText: "Know more"}
  attr :showBannerCookies, :string, required: true # should always be showBannerCookies={@showBannerCookies}

  def root_banner_cookies(assigns) do
    ~H"""
    <style>
      .banner_cookies.root { left: 0; min-height: 5rem; padding: 0 2rem 0 0; opacity: 1; color: white; background-color: var(--pinkDark);
        & .wrapper { margin-left: 1rem; flex-flow: row nowrap; }
        & a { width: 7rem; text-wrap: nowrap; }
        &.top { top: 0; }
        &.bottom { bottom: 0; }
        &.bottom p { margin: 1rem; }
      }
    </style>
                                              <%= if @showBannerCookies do %>                                                 <%#(5)%>
    <div class={"root banner_cookies main layer3 width100 fixed transMed #{@class} #{ if @config.type == "top" do "top" end}
          #{ if @config.type == "bottom" do "bottom" end}"} {@attribs} style={@style.main}>                                   <%#(6)%>
      <p style={@style.text}>{@options.text}</p>
      <div class="wrapper" data-wrap="smallScreen">                                                                           <%#(7)%>
        <.link navigate={~p"/privpol/"} target="_blank" class="default" style={@style.link}
                                                onclick="globFuncs.cookie.set('bannerCookiesState','closed' , 1, 'm');
                                                        document.querySelector('.banner_cookies.root').style.display = 'none'"><%#(8a)%>
          {@options.linkText}
        </.link>
        <.svg_button_close class="hoverActive" style={%{main: "flex: 0 1 3rem;", inner: ""}}
                           onclick="globFuncs.cookie.set('bannerCookiesState','closed' , 1, 'm');
                                    document.querySelector('.banner_cookies.main').style.display = 'none'"/>                  <%#(9)%>
      </div>
    </div>
                                                          <% end %>
    """
  end
#.................................................. root_banner_destak .......................................................
  attr :attribs, :global
  attr :class, :string, default: nil
  attr :style, :map, default: %{main: "", wrap: "", title: "", subtitle: "", text: ""}
  attr :options, :map, default: %{title: "ANNOUNCEMENT!", subtitle: "Limited offer valid until 30 June!",
                                  text: raw "Elixir is a dynamic, functional language for building scalable and maintainable
                                  applications.</br>Elixir runs on the Erlang VM, known for creating low-latency, distributed,
                                  and fault-tolerant systems. These capabilities and Elixir tooling allow developers to be
                                  productive in several domains, such as web development, embedded software, machine learning,
                                  data pipelines, and multimedia processing, across a wide range of industries."}             #(11)
  attr :showBannerDestak, :string, required: true # should always be showBannerDestak={@showBannerDestak}

  def root_banner_destak(assigns) do
    ~H"""
    <style>
      .banner_destak.root { inset: 0; opacity: 1; color: white; background-color: lightgrey;
        & .wrap { min-height: 15rem; text-align: center; background-color: grey; }
        & p { padding: 1rem }
      }
    </style>
                                              <%= if @showBannerDestak do %>                                                  <%#(5)%>
    <div class={"root banner_destak main layer3 fixed transMed #{@class}"} {@attribs} style={@style.main}>                    <%#(6)%>
      <div class="wrap width50 relative" style={@style.wrap}>
        <h1 style={@style.title} >{@options.title}</h1>
        <h2 style={@style.subtitle}>{@options.subtitle}</h2>
        <p style={@style.text}>{@options.text}</p>
        <.svg_button_close class="hoverActive" style={%{main: "position: absolute; top: -2rem; right: -2rem; width: 3rem;",
                                    inner: ""}} onclick="globFuncs.cookie.set('bannerDestakState','closed', 1, 'm');
                                                        document.querySelector('.banner_destak.root').style.display = 'none'"/><%#(9)%>
      </div>
    </div>
                                                          <% end %>
    """
  end
end
