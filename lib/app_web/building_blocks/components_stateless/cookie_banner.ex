defmodule AppWeb.CookieBanner do
  @moduledoc """
    A component for a new cookie banner
    #! The component is called by default in root.html.heex on pages where the chat bubble is not active
    Usage:
      Basic:
        <.cookie_banner class="cookie-banner" />
      With all options:
        <.cookie_banner class="cookie-banner" config={%{checkboxes: [%{label: "Strictly necessary", name: "strict", auto_checked: true, disabled: true, more_information: "Strictly necessary cookies allow core website functionality such as user login and account management. The website cannot be used properly without strictly necessary cookies."}, %{label: "Performance", name: "performance", auto_checked: false, disabled: false, more_information: "Performance cookies are used to see how visitors use the website, eg. analytics cookies. Those cookies cannot be used to directly identify a certain visitor."}, %{label: "Targeting", name: "targeting", auto_checked: false, disabled: false, more_information: "Targeting cookies are used to identify visitors between different websites, eg. content partners, banner networks. Those cookies may be used by companies to build a profile of visitor interests or show relevant ads on other websites."}, %{label: "Functionality", name: "functionality", auto_checked: false, disabled: false, more_information: "Functionality cookies are used to remember visitor information on the website, eg. language, timezone, enhanced content."}]}} options={banner_title: "This website uses cookies", banner_text: "This website uses cookies to improve user experience. By using our website you consent to all cookies in accordance with our Cookie Policy.", banner_link_text: "Read more", accept_all_button_text: "ACCEPT ALL", decline_all_button_text: "DECLINE ALL", main_color_rgb: "185,41,50", bg_color: "Gainsboro", secondary_bg_color: "lightgray", moon_diameter: "3rem", innerPath: ""} style={main: "", icon_wrapper: "", icon_hover_text: "", cookies_banner: "", close_button: "", consents_wrapper: "", consent_title: "", consent_text: "", consent_link: "", consent_inputs: %{main: "width: 100%; justify-content: flex-start; margin: 0.25rem 0;", inner: "width: 1.5rem; height: 1.5rem;", label: "font-size: 1.25rem;"}, button_container: "", accept_button: "", decline_button: "", save_current_button: "", show_details_button: "", cookies_modal_container: "", cookies_modal_button_container: "", cookies_modal_button: "", modal_consent_title: "", modal_consent_text: "", modal_consent_link: "", modal_accept_button: "", modal_decline_button: "", modal_save_current_button: "", modal_consent_inputs: %{main: "", inner: "width: 1.5rem; height: 1.5rem;", label: ""}}/>
  """
  use AppWeb, :html
  alias Phoenix.LiveView.JS
  import AppWeb.SvgIcons

  attr :class, :string, required: true
  attr :config, :map, default: %{}
  attr :options, :map, default: %{}
  attr :style, :map, default: %{main: "", icon_wrapper: "", icon_hover_text: "", cookies_banner: "", close_button: "", consents_wrapper: "", consent_title: "", consent_text: "", consent_link: "", consent_inputs: %{main: "width: 100%; justify-content: flex-start; margin: 0.25rem 0;", inner: "width: 1.5rem; height: 1.5rem;", label: "font-size: 1.25rem;"}, button_container: "", accept_button: "", decline_button: "", save_current_button: "", show_details_button: "", cookies_modal_container: "", cookies_modal_button_container: "", cookies_modal_button: "", modal_consent_title: "", modal_consent_text: "", modal_consent_link: "", modal_accept_button: "", modal_decline_button: "", modal_save_current_button: "", modal_consent_inputs: %{main: "", inner: "width: 1.5rem; height: 1.5rem;", label: ""}}

  def cookie_banner(assigns) do
    # Define default configurations that will be merged with any provided configs
    default_checkboxes = [ %{label: gettext("Strictly necessary"), name: "strict", auto_checked: true, disabled: true, more_information: gettext("Strictly necessary cookies allow core website functionality such as user login and account management. The website cannot be used properly without strictly necessary cookies.")}, %{label: gettext("Performance"), name: "performance", auto_checked: false, disabled: false, more_information: gettext("Performance cookies are used to see how visitors use the website, eg. analytics cookies. Those cookies cannot be used to directly identify a certain visitor.")}, %{label: gettext("Targeting"), name: "targeting", auto_checked: false, disabled: false, more_information: gettext("Targeting cookies are used to identify visitors between different websites, eg. content partners, banner networks. Those cookies may be used by companies to build a profile of visitor interests or show relevant ads on other websites.") }, %{label: gettext("Functionality"), name: "functionality", auto_checked: false, disabled: false, more_information: gettext("Functionality cookies are used to remember visitor information on the website, eg. language, timezone, enhanced content.") } ]
    default_options = %{ banner_title: gettext("This website uses cookies"), banner_text: gettext("This website uses cookies to improve user experience. By using our website you consent to all cookies in accordance with our Cookie Policy."), banner_link_text: gettext("Read more"), accept_all_button_text: gettext("ACCEPT ALL"), decline_all_button_text: gettext("DECLINE ALL"), main_color_rgb: "185,41,50", bg_color: "Gainsboro", secondary_bg_color: "lightgray", moon_diameter: "3rem", save_current_button_text: gettext("Save Current & Close"), show_details_button_text: gettext("Show Details"), modal_bg_color: "GhostWhite", about_cookies_text: gettext("Cookies are small text files that are placed on your computer by websites that you visit. Websites use cookies to help users navigate efficiently and perform certain functions. Cookies that are required for the website to operate properly are allowed to be set without your permission. All other cookies need to be approved before they can be set in the browser. You can change your consent to cookie usage at any time on our Privacy Policy page."), innerPath: "" }
    # Merge provided configs with defaults
    assigns = assign(assigns, :config, Map.merge(%{checkboxes: default_checkboxes}, assigns.config))
    assigns = assign(assigns, :options, Map.merge(default_options, assigns.options))
    
    ~H"""
    <style>
      .stateless_comp.cookieBanner {
        & .icon { bottom: 4.75rem; left: 0; border-radius: 50%; padding: 0.9rem;
          & .cookies-moon-icon { left: 1.25rem; }
          & .cookie-settings-hover { left: 1.9rem; width: max-content; background-color: <%= @options.bg_color %>; border-radius: 50%;
                          height: <%= @options.moon_diameter %>; font-size: 0; padding: 0 1.4rem; transition: padding 0.5s, font-size 0.5s, border-radius 2s; }
          &:hover .cookie-settings-hover { padding: 0 1.5rem 0 3.5rem; font-size: 1.2rem; border-radius: 1rem; transition: padding 0.5s, font-size 0.5s; }
        }
        & .cookies-banner { bottom: -100vh; left: 1.25rem; background-color: <%= @options.bg_color %>; border-radius: 0.6rem; max-width: 25%;
                            border: 0.0625rem solid <%= @options.secondary_bg_color %>; transition: bottom 0.5s; padding: 1rem;
          & .close { top: 0.5rem; right: 0.25rem; border: none;
            &:hover { background-color: <%= @options.secondary_bg_color %>; }
            & span { height: 1.25rem; width: 1.25rem; }
          }
          & .consents-wrapper { margin-top: 2rem;
            & .title { margin: 0; }
            & .text { display: inline; margin: 0.5rem 0;
              & .link { display: inline; color: rgba(<%= @options.main_color_rgb %>,1);
                &:hover { color: rgba(<%= @options.main_color_rgb %>,0.9); }
              }
            }
            & input[type=checkbox][disabled] { opacity: 0.5; }
            & .button-container { margin-top: 1rem;
              & .decline-button { width: 45%; }
              & .accept-button { width: 45%; background-color: rgba(<%= @options.main_color_rgb %>,1);
                &:hover { background-color: rgba(<%= @options.main_color_rgb %>,0.9); }
              }
              & .show-details { margin-top: 1rem; border: none; opacity: 1; background-color: transparent; color: black;
                &:hover { opacity: 0.8; }
              }
            }
          }
          &.active { bottom: 1.25rem; transition: bottom 0.5s; width: 25%; justify-content: start; }
        }
        & .cookies-container { width: 100vw; height: 100vh; top: 0; backdrop-filter: blur(0.3125rem);
          & .cookies-modal { top: 5%; width: 80%; max-height: 90%; background-color: <%= @options.modal_bg_color %>; border-radius: 1rem;
                              border: 0.0625rem solid rgba(0,0,0,0.3); padding: 3.5rem 3.5rem 1rem 3.5rem;
            &.hidden { display: none; }
            & .button-container { top: 1.5rem; right: 1.25rem;
              & button { border: none; border-radius: 0.5rem;
                &:hover { background-color: <%= @options.secondary_bg_color %>; }
                & span { height: 1.25rem; width: 1.25rem; }
              }
            }
            & .cookies-modal-content { margin-top: 2rem;
              & .title { margin: 0; justify-content: start; }
              & .text { display: inline; margin: 0.5rem 0;
                & .link { display: inline; color: rgba(<%= @options.main_color_rgb %>,1);
                  &:hover { color: rgba(<%= @options.main_color_rgb %>,0.9); }
                }
              }
              & .buttons { margin-top: 1rem;
                & .buttons-for-all button { background-color: <%= @options.modal_bg_color %>; color: black; 
                  &:hover { background-color: <%= @options.bg_color %>; }
                }
                & .save-current { background-color: rgba(<%= @options.main_color_rgb %>,1);
                  &:hover { background-color: rgba(<%= @options.main_color_rgb %>,0.9); }
                }
              }
              & .information { margin-top: 1rem;
                & .tabs button{ font-size: 1.5rem; border: none; border-top: 0.125rem solid transparent;
                  &.active{ border-top: 0.125rem solid rgba(<%= @options.main_color_rgb %>,1); background-color: <%= @options.bg_color %>;
                  }
                }
                & .content { background-color: <%= @options.bg_color %>; padding: 2rem 0; max-height: 50vh; overflow-y: auto; display: block;
                  & .inner-content {
                    &.hidden { display: none; }
                    & .cookie-modal-line { padding: 2rem 3rem;
                      & input[type=checkbox][disabled] { opacity: 0.5; }
                      & .description { width: 80%;
                        & h4 { margin: 0; }
                      }
                      &:not(:last-child) { border-bottom: 0.0625rem solid <%= @options.secondary_bg_color %>; }
                    }
                  }
                  & .modal-about-cookies-content { padding: 2rem 3rem; }
                }
              }
            }
          }
        }
      }
    </style>
    <div class="stateless_comp main cookieBanner layer3" id={"cookie-banner-#{@class}"} phx-hook="CookieBanner" style={@style.main} data-class={@class}>
      <div class="icon pointer fixed" phx-click={JS.add_class("active", to: ".cookies-banner")} style={@style.icon_wrapper}>
        <.svg_moon class="cookies-moon-icon layer1 absolute" style={%{main: "width: #{@options.moon_diameter}; position: absolute;", inner: "", path1: "fill: rgb(#{@options.main_color_rgb})", path2: "fill: rgb(#{@options.main_color_rgb})", path3: "fill: rgb(#{@options.main_color_rgb})", path4: "fill: rgb(#{@options.main_color_rgb})", path5: "fill: rgb(#{@options.main_color_rgb})", path6: "fill: rgb(#{@options.main_color_rgb})", path7: "fill: rgb(#{@options.main_color_rgb})", path8: "fill: rgb(#{@options.main_color_rgb});", path9: "fill: rgb(#{@options.main_color_rgb})", path10: "fill: rgb(#{@options.main_color_rgb})", path11: "fill: rgb(#{@options.main_color_rgb})", path12: "fill: rgb(#{@options.main_color_rgb})", path13: "fill: rgb(#{@options.main_color_rgb})", path14: "fill: rgb(#{@options.main_color_rgb})", path15: "fill: rgb(#{@options.main_color_rgb})", path16: "fill: rgb(#{@options.main_color_rgb})", path17: "fill: rgb(#{@options.main_color_rgb})", path18: "fill: rgb(#{@options.main_color_rgb})", path19: "fill: rgb(#{@options.main_color_rgb})"}}/>
        <div class="cookie-settings-hover absolute" style={@style.icon_hover_text}> {gettext("COOKIE SETTINGS")} </div>
      </div>
      <div class="cookies-banner fixed" style={@style.cookies_banner}>
        <button phx-click={JS.remove_class("active", to: ".cookies-banner")} type="button" class="close absolute" aria-label={gettext("close")} style={@style.close_button} onclick="globFuncs.cookie.set('bannerCookiesState','closed' , 1, 'm');"> <.icon name="hero-x-mark-solid" /> </button>
        <div class="consents-wrapper" style={@style.consents_wrapper}>
          <h4 class="title" style={@style.consent_title}> {@options.banner_title} </h4>
          <p class="text justify" style={@style.consent_text}>
            {@options.banner_text} <.link navigate={"/#{if @options.innerPath != "", do: @options.innerPath <> "/privpol", else: "privpol"}"} target="_blank" class="link" style={@style.consent_link}> {@options.banner_link_text} </.link>
          </p>
          <.input :for={checkbox <- @config.checkboxes} type="checkbox" class={if checkbox.disabled == false, do: "cookie-banner-checkbox"} label={checkbox.label} name={checkbox.name} style={%{main: @style.consent_inputs.main, inner: "#{@style.consent_inputs.inner} #{if checkbox.disabled == false, do: "cursor: pointer;", else: "cursor: not-allowed;"}", label: "#{@style.consent_inputs.label} #{if checkbox.disabled == false, do: "cursor: pointer;", else: "cursor: not-allowed;"}"}} checked={checkbox.auto_checked} disabled={checkbox.disabled}/>
          <div class="button-container width100 space-evenly" style={@style.button_container}>
            <.button class="accept-button" phx-click={hide_modal_and_banner(@class)} onclick="globFuncs.cookie.set('bannerCookiesState','closed' , 1, 'm');" style={@style.accept_button}> {@options.accept_all_button_text} </.button>
            <.button class="decline-button" phx-click={hide_modal_and_banner(@class)} onclick="globFuncs.cookie.set('bannerCookiesState','closed' , 1, 'm');" style={@style.decline_button}> {@options.decline_all_button_text} </.button>
            <.button class="show-details width100" style={@style.show_details_button} phx-click={open_cookies_modal(@class)}> <.icon name="hero-cog-6-tooth" />&nbsp; {@options.show_details_button_text} </.button>
          </div>
        </div>
      </div>
      <.focus_wrap id={"cookies-modal-#{@class}"} class="cookies-container layer3 hidden fixed" phx-window-keydown={hide_modal_and_banner(@class)} phx-key="escape">
        <div class="cookies-modal fixed" style={@style.cookies_modal_container} phx-click-away={hide_modal_and_banner(@class)}>
          <div class="button-container layer3 flex-end absolute" style={@style.cookies_modal_button_container}>
            <button phx-click={hide_modal_and_banner(@class)} type="button" aria-label={gettext("close")} style={@style.cookies_modal_button}> <.icon name="hero-x-mark-solid" /> </button>
          </div>
          <div class="cookies-modal-content">
            <h4 class="title width100" style={@style.modal_consent_title}>{@options.banner_title}</h4>
            <p class="text justify" style={@style.modal_consent_text}> {@options.banner_text} <.link navigate={~p"/privpol/"} target="_blank" class="link" style={@style.modal_consent_link}> {@options.banner_link_text} </.link> </p>
            <div class="information width100">
              <div class="tabs width100">
                <button class="modal-cookie-declarations-tab active width50 bold" phx-click={select_declarations()}> {gettext("COOKIE DECLARATION")} </button>
                <button class="modal-about-cookies-tab width50 bold" phx-click={select_about()}> {gettext("ABOUT COOKIES")} </button>
              </div>
              <div class="content width100">
                <div class="inner-content modal-cookie-declarations-content">
                  <div :for={checkbox <- @config.checkboxes} class="cookie-modal-line width100 space-between">
                    <div class="description justify flex-start"> <h4> {checkbox.label} </h4> <p> {checkbox.more_information} </p> </div>
                    <.input type="checkbox" class={"modal-checkbox #{if checkbox.disabled == false, do: "cookie-banner-checkbox"}"} name={checkbox.name} style={%{main: @style.modal_consent_inputs.main, inner: "#{@style.modal_consent_inputs.inner} #{if checkbox.disabled == false, do: "cursor: pointer;", else: "cursor: not-allowed;"}", label: "#{@style.modal_consent_inputs.label} #{if checkbox.disabled == false, do: "cursor: pointer;", else: "cursor: not-allowed;"}"}} checked={checkbox.auto_checked} disabled={checkbox.disabled}/>
                  </div>
                </div>
                <div class="inner-content modal-about-cookies-content hidden justify"> {@options.about_cookies_text} </div>
              </div>
            </div>
            <div class="buttons width100 space-between">
              <div class="buttons-for-all space-evenly">
                <.button class="modal-accept-button" phx-click={hide_modal_and_banner(@class)} onclick="globFuncs.cookie.set('bannerCookiesState','closed' , 1, 'm');" style={@style.modal_accept_button}> {@options.accept_all_button_text} </.button>
                <.button class="modal-decline-button" phx-click={hide_modal_and_banner(@class)} onclick="globFuncs.cookie.set('bannerCookiesState','closed' , 1, 'm');" style={@style.modal_decline_button}> {@options.decline_all_button_text} </.button>
              </div>
              <.button class="save-current" phx-click={hide_modal_and_banner(@class)} onclick="globFuncs.cookie.set('bannerCookiesState','closed' , 1, 'm');" style={@style.modal_save_current_button}> {@options.save_current_button_text} </.button>
            </div>
          </div>
        </div>
      </.focus_wrap>
    </div>
    """
  end

  defp open_cookies_modal(class, js \\ %JS{}) do
    js
    |> JS.remove_class("hidden", to: "#cookies-modal-#{class}")
    |> JS.remove_class("active", to: ".contacts-box")
    |> JS.remove_class("active", to: ".chat-box")
  end

  defp hide_modal_and_banner(class, js \\ %JS{}) do
    js
    |> JS.remove_class("active", to: ".cookies-banner")
    |> JS.add_class("hidden", to: "#cookies-modal-#{class}")
  end

  defp select_declarations(js \\ %JS{}) do
    js
    |> JS.add_class("active", to: ".modal-cookie-declarations-tab")
    |> JS.remove_class("hidden", to: ".modal-cookie-declarations-content")
    |> JS.remove_class("active", to: ".modal-about-cookies-tab")
    |> JS.add_class("hidden", to: ".modal-about-cookies-content")
  end

  defp select_about(js \\ %JS{}) do
    js
    |> JS.add_class("active", to: ".modal-about-cookies-tab")
    |> JS.remove_class("hidden", to: ".modal-about-cookies-content")
    |> JS.remove_class("active", to: ".modal-cookie-declarations-tab")
    |> JS.add_class("hidden", to: ".modal-cookie-declarations-content")
  end
end
