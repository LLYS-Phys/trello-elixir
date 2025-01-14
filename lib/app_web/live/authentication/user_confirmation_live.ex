#.................................................. Notes & learnings ........................................................
# 1) Define the Title of the page;
# 2) The home page (who should be the landing page most of the times) should validate if the CSS and JS files being used are
# 3) Added "main page" classes;
#...............................................................................................

defmodule AppWeb.UserConfirmationLive do
  use AppWeb, :live_view

  alias App.Accounts

  def render(%{live_action: :edit} = assigns) do
    ~H"""
    <div class="mx-auto max-w-sm main page">                                                                           <% #3%>
      <.header class="text-center">{gettext("Confirm account")}</.header>

      <.simple_form for={@form} id="confirmation_form" phx-submit="confirm_account">
        <input type="hidden" name={@form[:token].name} value={@form[:token].value} />
        <:actions>
          <.button phx-disable-with={gettext("Confirming...")} class="w-full">{gettext("Confirm my account")}</.button>
        </:actions>
      </.simple_form>

      <p class="text-center mt-4">
        <.link navigate={~p"/users/register"}>{gettext("Register")}</.link>
        <.link navigate={~p"/users/log_in"}>{gettext("Log in")}</.link>
      </p>
    </div>
    """
  end

  def mount(%{"token" => token}, _session, socket) do
    socket =
      socket
      |> assign(page_title: gettext("User Confirmation"))                                                              #(1)
      |> assign(static_changed?: static_changed?(socket))

    form = to_form(%{"token" => token}, as: "user")
    {:ok, assign(socket, form: form), temporary_assigns: [form: nil]}
  end

  # Do not log in the user after confirmation to avoid a
  # leaked token giving the user access to the account.
  def handle_event("confirm_account", %{"user" => %{"token" => token}}, socket) do
    case Accounts.confirm_user(token) do
      {:ok, _} ->
        {:noreply,
         socket
         |> put_flash(:info, gettext("User confirmed successfully."))
         |> redirect(to: ~p"/")}

      :error ->
        # If there is a current user and the account was already confirmed,
        # then odds are that the confirmation link was already visited, either
        # by some automation or by the user themselves, so we redirect without
        # a warning message.
        case socket.assigns do
          %{current_user: %{confirmed_at: confirmed_at}} when not is_nil(confirmed_at) ->
            {:noreply, redirect(socket, to: ~p"/")}

          %{} ->
            {:noreply,
             socket
             |> put_flash(:error, gettext("User confirmation link is invalid or it has expired."))
             |> redirect(to: ~p"/")}
        end
    end
  end
end
