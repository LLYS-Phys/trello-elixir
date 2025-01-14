#.................................................. Notes & learnings ........................................................
# 1) Define the Title of the page;
# 2) The home page (who should be the landing page most of the times) should validate if the CSS and JS files being used are
# 3) Added "main page" classes;
#...............................................................................................

defmodule AppWeb.UserConfirmationInstructionsLive do
  use AppWeb, :live_view

  alias App.Accounts

  def render(assigns) do
    ~H"""
    <div class="mx-auto max-w-sm main page">                                                                           <% #3%>
      <.header class="text-center">
        {gettext("No confirmation instructions received?")}
        <:subtitle> {gettext("We'll send a new confirmation link to your inbox")}</:subtitle>
      </.header>

      <.simple_form for={@form} id="resend_confirmation_form" phx-submit="send_instructions">
        <.input field={@form[:email]} type="email" placeholder="Email" required />
        <:actions>
          <.button phx-disable-with={gettext("Sending...")} class="w-full">
            {gettext("Resend confirmation instructions")}
          </.button>
        </:actions>
      </.simple_form>

      <p class="text-center mt-4">
        <.link navigate={~p"/users/register"}>{gettext("Register")}</.link>
        <.link navigate={~p"/users/log_in"}>{gettext("Log in")}</.link>
      </p>
    </div>
    """
  end

  def mount(_params, _session, socket) do
    socket =
      socket
      |> assign(page_title: gettext("User Confirmation Instructions"))                                                 #(1)
      |> assign(static_changed?: static_changed?(socket))                                                              #(2)
    {:ok, assign(socket, form: to_form(%{}, as: "user"))}
  end

  def handle_event("send_instructions", %{"user" => %{"email" => email}}, socket) do
    if user = Accounts.get_user_by_email(email) do
      Accounts.deliver_user_confirmation_instructions(
        user,
        &url(~p"/users/confirm/#{&1}")
      )
    end

    info =
      gettext("If your email is in our system and it has not been confirmed yet, you will receive an email with instructions shortly.")

    {:noreply,
     socket
     |> put_flash(:info, info)
     |> redirect(to: ~p"/")}
  end
end
