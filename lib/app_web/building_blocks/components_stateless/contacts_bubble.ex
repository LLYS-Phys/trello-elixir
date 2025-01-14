defmodule AppWeb.ContactsBubble do
  @moduledoc """
    A component for the bubble contact form
    #! The component is called by default in app.html.heex, satcom_layout.html.heex and shop_layout.html.heex
    Usage:
      Basic:
        <.contacts_bubble class="bubble" />
      With all options:
        <.contacts_bubble class="bubble" config={%{contact_form: %{config: %{fields: [%{name: "name", label: "Your Name *", placeholder: "First & Last Name", type: "text", value: "", hidden: false, required: true, pattern: ""}, %{name: "email", label: "Email *", placeholder: "Your Email Address", type: "email", value: "", hidden: false, required: true, pattern: "^\\S+@\\S+\\.\\S+$"}, %{name: "subject", label: "How can we help? *", placeholder: "Write briefly what is your message regarding", type: "text", value: "", hidden: false, required: true, pattern: ""}, %{name: "body", label: "Tell us more about it *", placeholder: "Write in detail what is your message regarding and we will get back to you as soon as possible", type: "textarea", value: "", hidden: false, required: true, pattern: ""}], hidden_fields: [%{name: "receiver-name", value: "Telespazio Support"}, %{name: "receiver-email", value: "lachyordanov@gmail.com"}], button_text: "Submit the form", checkboxes: [%{name: "gdpr", label: "Consent to your data being processed. *", required: true}], flash_text: "Contact form submitted!"}}}} style={%{contact_form: %{input_wrapper: "width: 100%; padding: 0.5rem 0;", input: "align-content: baseline; background-color: rgb(231,231,231);", input_label: "width: 100%; text-align: left; padding-left: 0.25rem;", checkbox_wrapper: "width: 100%;", checkbox: %{main: "width: 100%; margin: 0.5rem; justify-content: start;", inner: "background-color: lightgray;", label: "display: block;"}, button: "margin: 1rem 0; width: 100%; background-color: rgb(107,204,119); border: none;", button_hover: "transform: scale(1.03) !important;", form: %{wrapper: "background-color: transparent;", actions: ""}, main_wrapper: "padding: 0.5rem;"}, wrapper: "", icon: "", contacts_box: "", minimize_button: ""}} options={%{icon_background: "blue", form_background: "GhostWhite", secondary_color: "rgb(231,231,231)"}}/>
    Additional comments:
      - For contact form correct setup, please check the documentation on contact_form.ex in building_blocks/components_stateful folder
  """
  use AppWeb, :html
  alias Phoenix.LiveView.JS

  attr :class, :string, required: true
  attr :config, :map, default: %{contact_form: %{config: %{fields: [%{name: "name", label: gettext("Your Name *"), placeholder: gettext("First & Last Name"), type: "text", value: "", hidden: false, required: true, pattern: ""}, %{name: "email", label: gettext("Email *"), placeholder: gettext("Your Email Address"), type: "email", value: "", hidden: false, required: true, pattern: "^\\S+@\\S+\\.\\S+$"}, %{name: "subject", label: gettext("How can we help? *"), placeholder: gettext("Write briefly what is your message regarding"), type: "text", value: "", hidden: false, required: true, pattern: ""}, %{name: "body", label: gettext("Tell us more about it *"), placeholder: gettext("Write in detail what is your message regarding and we will get back to you as soon as possible"), type: "textarea", value: "", hidden: false, required: true, pattern: ""}], hidden_fields: [%{name: "receiver-name", value: "Telespazio Support"}, %{name: "receiver-email", value: "lachyordanov@gmail.com"}], button_text: gettext("Submit the form"), checkboxes: [%{name: "gdpr", label: gettext("Consent to your data being processed. *"), required: true}], flash_text: gettext("Contact form submitted!"), current_path: ""}}}
  attr :options, :map, default: %{icon_background: "blue", form_background: "GhostWhite", secondary_color: "rgb(231,231,231)"}
  attr :style, :map, default: %{contact_form: %{input_wrapper: "", input: "", input_label: "", checkbox_wrapper: "", checkbox: %{main: "", inner: "", label: ""}, button: "", button_hover: "", form: %{wrapper: "", actions: ""}, main_wrapper: ""}, wrapper: "", icon: "", contacts_box: "", minimize_button: ""}

  def contacts_bubble(assigns) do
    ~H"""
    <style>
      .stateless_comp.main.contacts-bubble {
        & .icon { bottom: 4.3rem; right: 1.25rem; background-color: <%= @options.form_background %>; border-radius: 50%; padding: 0.9rem; box-shadow: 0 0 0.6rem rgba(0,0,0,0.1);
          &:hover { background-color: <%= @options.secondary_color %>; }
        }
        & .contacts-box { bottom: -100vh; right: 1.25rem; background-color: <%= @options.form_background %>; border-radius: 0.6rem;
                          max-width: 25%; border: 0.0625rem solid <%= @options.secondary_color %>; transition: bottom 0.5s;
          & .minimize { right: 1rem; border-radius: 50%; width: 2rem; height: 2rem; top: 0.5rem; border: none;
            &:hover { background-color: <%= @options.secondary_color %>; }
          }
          &.active { bottom: 1.25rem; transition: bottom 0.5s; }
        }
      }
    </style>
    <div class={"stateless_comp main contacts-bubble #{@class}"} style={@style.wrapper}>
      <div class="icon layer3 pointer fixed" style={@style.icon} phx-click={JS.add_class("active", to: ".contacts-box")}> <.icon name="hero-chat-bubble-bottom-center-solid" style={"background-color: #{@options.icon_background};"}/> </div>
      <div class="contacts-box layer3 fixed" style={@style.contacts_box}>
        <button class="minimize absolute" phx-click={JS.remove_class("active", to: ".contacts-box")} style={@style.minimize_button}> - </button>
        <.live_component module={AppWeb.ContactForm} id={"contact-popup-form-#{@class}"} config={@config.contact_form.config} style={@style.contact_form}/>
      </div>
    </div>
    """
  end
end
