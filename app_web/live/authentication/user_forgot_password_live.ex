#.................................................. Notes & learnings ........................................................
# 1) Define the Title of the page;
# 2) The home page (who should be the landing page most of the times) should validate if the CSS and JS files being used are
# 3) Added "main page" classes;
# 4) Added the "style" attribute with costumizations;
#...............................................................................................

defmodule AppWeb.UserForgotPasswordLive do
  use AppWeb, :live_view

  alias App.Accounts

  def render(assigns) do
    ~H"""
    <div class="mx-auto max-w-sm main page">                                                                           <% #3%>
      <.header class="text-center">
        {gettext("Forgot your password?")}
        <:subtitle> {gettext("We'll send a password reset link to your inbox")}</:subtitle>
      </.header>

      <.simple_form for={@form} id="reset_password_form" phx-submit="send_email">
        <.input field={@form[:email]} type="email" placeholder="Email" required />
        <:actions>
          <.button phx-disable-with={gettext("Sending...")} class="w-full" style="margin-left: 0.5rem;">               <% #4 %>
            {gettext("Send password reset instructions")}
          </.button>
        </:actions>
      </.simple_form>
      <p class="text-center text-sm mt-4">
        <.link navigate={~p"/users/register"} style="margin: 0.25rem;"> {gettext("Register")}</.link>             <% #4%>
        <.link navigate={~p"/users/log_in"} style="margin: 0.25rem;"> {gettext("Log in")}</.link>                 <% #4%>
      </p>
    </div>
    """
  end

  def mount(_params, _session, socket) do
    socket =
      socket
      |> assign(page_title: gettext("Forgot Password"))                                                                #(1)
      |> assign(static_changed?: static_changed?(socket))
    {:ok, assign(socket, form: to_form(%{}, as: "user"))}
  end

  def handle_event("send_email", %{"user" => %{"email" => email}}, socket) do
    if user = Accounts.get_user_by_email(email) do
      Accounts.deliver_user_reset_password_instructions(
        user,
        &url(~p"/users/reset_password/#{&1}")
      )
    end

    info =
      gettext("If your email is in our system, you will receive instructions to reset your password shortly.")

    {:noreply,
     socket
     |> put_flash(:info, info)
     |> redirect(to: ~p"/")}
  end
end
