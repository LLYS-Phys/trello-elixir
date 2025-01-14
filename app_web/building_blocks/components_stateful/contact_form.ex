defmodule AppWeb.ContactForm do
  @doc """
    A component for rendering a full-screen background image
    Usage:
      Basic:
        <.live_component module={AppWeb.ContactForm} id="" />
      With all options:
        <.live_component module={AppWeb.ContactForm} id="book-a-demo" config={%{fields: [%{name: "name", label: "Your Name", placeholder: "First & Last Name", type: "text", value: "", hidden: false, required: false, pattern: ""}, %{name: "email", label: "Business Email", placeholder: "Your Business Email", type: "email", value: "", hidden: false, required: true, pattern: "^\\S+@\\S+\\.\\S+$"}, %{name: "subject", label: "", placeholder: "", type: "text", value: "Book a Demo", hidden: true, required: true, pattern: ""}, %{name: "body", label: "Company", placeholder: "Link to website or company name", type: "text", value: "", hidden: false, required: true, pattern: ""}], hidden_fields: [%{name: "receiver-name", value: "Telespazio Support"}, %{name: "receiver-email", value: "lachyordanov@gmail.com"}], button_text: "Submit the form", checkboxes: [%{name: "newsletter", label: "Get our free newsletter on technology and startups.", required: false}]}} style={%{input_wrapper: "width: 100%; padding: 0.5rem 0;", input: "align-content: baseline; background-color: rgb(231,231,231);", input_label: "width: 100%; text-align: left;", checkbox_wrapper: "width: 100%;", checkbox: %{main: "width: 100%; margin: 0.5rem; justify-content: start;", inner: "background-color: lightgray;", label: ""}, button: "margin: 1rem 0; width: 100%; background-color: rgb(107,204,119); border: none;", button_hover: "transform: scale(1.05) !important;", form: %{wrapper: "", actions: ""}, main_wrapper: "width: 60%"}}/>
    Additional comments:
      - When adding a button hover effect, you need to specify all styles with !important in order for them to take effect.
      - When the contact form page changes, we need to adjust the redirect url in the handle_event function
      - In config.fields.pattern you can add any REGex you want.
        If the expression has "\" inside it, you need to add one more so that it can be interpreted correctly.
  """
  use AppWeb, :live_component
  import Swoosh.Email
  alias App.Mailer
  alias App.Support
  import AppWeb.UrlHelpers

  attr :id, :string, default: nil
  attr :config, :map, default: %{fields: [%{name: "name", label: gettext("Your name:"), placeholder: gettext("First & Last Name"), type: "text", value: "", hidden: false, required: false, pattern: ""}, %{name: "email", label: gettext("Your email address:"), placeholder: gettext("Your personal email"), type: "email", value: "", hidden: false, required: true, pattern: "^\\S+@\\S+\\.\\S+$"}, %{name: "subject", label: gettext("What is it regarding?"), placeholder: gettext("Share why are you contacting us"), type: "text", value: "", hidden: false, required: true, pattern: ""}, %{name: "body", label: gettext("Your message:"), placeholder: gettext("Share in detail your message"), type: "textarea", value: "", hidden: false, required: true, pattern: ""}], hidden_fields: [%{name: "receiver-name", value: "Telespazio Support"}, %{name: "receiver-email", value: "lachyordanov@gmail.com"}], button_text: gettext("Send"), checkboxes: [%{name: "newsletter", label: gettext("Get our free newsletter on technology and startups."), required: false}, %{name: "gdpr", label: gettext("Consent to your data being processed."), required: true}], flash_text: gettext("Form successfully submitted!"), current_path: ""}
  attr :style, :map, default: %{input_wrapper: "width: 100%; padding: 0.5rem 2rem;", input: "align-content: baseline;", input_label: "", checkbox_wrapper: "width: 100%;", checkbox: %{main: "width: 100%; margin: 0.5rem;", inner: "", label: ""}, button: "margin: 1rem;", button_hover: "transform: scale(1.1) !important;", form: %{wrapper: "", actions: ""}, main_wrapper: "" }

  def render(assigns) do
    ~H"""
    <div class="stateful_comp main contact-form" id={@id} style={@style.main_wrapper}>
      <style>
        #contact_form-<%= @id %> {
          & button { transition: transform .2s; }
          & button:hover { <%= @style.button_hover %> transition: transform .2s; }
          & input.error, & textarea.error, & select.error { border-color: red; }
        }
      </style>
      <.simple_form for={nil} id={"contact_form-#{@id}"} phx-submit="send_email" phx-target={@myself} method="post" style={@style.form} phx-hook="ContactFormValidation" >
        <.input name="channel" label={gettext("Channel*")} type="select" value="" options={[{"General Support", "support"}, {"Sales Support", "sales"}]} style={%{ main: "width: 100%;", inner: @style.input, label: @style.input_label}} />
        <.input :for={input <- @config.fields} name={input.name} label={input.label} disabled={input.name == "email" && input.value != ""} type={input.type} value={input.value} placeholder={input.placeholder} required={if input.hidden == true, do: false, else: input.required} data-pattern={if input.hidden == false, do: input.pattern, else: ""} style={%{main: "#{@style.input_wrapper} #{if input.hidden == true, do: "display: none;"}", inner: @style.input, label: @style.input_label}}/>
        <.input :for={input <- @config.hidden_fields} name={input.name} value={input.value} style={%{main: "display: none;", inner: "", label: ""}}/>
        <div class="checkbox-wrapper" style={@style.checkbox_wrapper}>
          <.input :for={checkbox <- @config.checkboxes} type="checkbox" name={checkbox.name} label={checkbox.label} required={if checkbox.required, do: true, else: false} style={@style.checkbox}/>
        </div>
        <.button style={@style.button}>{@config.button_text}</.button>
      </.simple_form>
    </div>
    """
  end

  def mount(socket) do
    {:ok, socket}
  end

  def handle_event("send_email", params, socket) do
      params = case params["email"] do
      nil ->
        email_value = socket.assigns.config.fields
          |> Enum.find(&(&1.name == "email"))
          |> Map.get(:value)
        Map.put(params, "email", email_value)
      _ ->
        params
    end
    params = Map.put(params, "type", "contact_form")
    case create_and_send_email(params) do
      :ok ->
        {:noreply, socket
          |> put_flash(:info, socket.assigns.config.flash_text)
          |> redirect(to: build_url(socket.assigns.config.current_path, %{}))}

      {:error, error_message} ->
        {:noreply, socket
          |> put_flash(:error, error_message)
          |> redirect(to: build_url(socket.assigns.config.current_path, %{}))}
    end
  end

  defp create_and_send_email(params) do
    case Support.create_inquiry(params) do
      {:ok, _inquiry} ->
        email =
          new()
          |> to({params["receiver-name"], params["receiver-email"]})
          |> from({params["name"], params["email"]})
          |> subject(params["subject"])
          |> text_body(params["body"])

         Mailer.deliver(email)
          :ok

      {:error, _changeset} ->
        {:error, gettext("Failed to create inquiry")}
    end
  end
end
