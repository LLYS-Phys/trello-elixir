#.................................................. Notes & learnings ........................................................
# 1) Define the Title of the page;
# 2) The home page (who should be the landing page most of the times) should validate if the CSS and JS files being used are
# 3) Added "main page" classes;
#...............................................................................................

defmodule AppWeb.UserRegistrationLive do
  use AppWeb, :live_view

  alias App.Accounts
  alias App.Accounts.User

  def render(assigns) do
    ~H"""
    <style>
      header { height: auto; }
    </style>
    <div class="mx-auto max-w-sm main page">                                                                                        <% #3%>
      <.header class="text-center">
        {gettext("Register for an account")}

        <:subtitle>
        {gettext("Already registered?")}
          <.link navigate={~p"/users/log_in"} class="font-semibold text-brand hover:underline" style="margin: 0.25rem;">          <% #2%>
          {gettext("Log in")}
          </.link>
          {gettext("to your account now")}
        </:subtitle>
      </.header>

      <.simple_form
        for={@form}
        id="registration_form"
        phx-submit="save"
        phx-change="validate"
        phx-trigger-action={@trigger_submit}
        action={~p"/users/log_in?_action=registered"}
        method="post"
      >
        <.error :if={@check_errors}>
          {gettext("Oops, something went wrong! Please check the errors below.")}
        </.error>

        <.input field={@form[:email]} type="email" label="Email" required style={%{main: "width: 17rem;", inner: "", label: ""}}/>    <% #2%>
        <.input field={@form[:password]} type="password" label={gettext("Password")} required  style={%{main: "width: 17rem;", inner: "", label: ""}}/>

        <:actions>
          <.button phx-disable-with={gettext("Creating account...")} class="w-full" style="border: none;"> {gettext("Create an account")}</.button>         <% #2%>
        </:actions>
      </.simple_form>
    </div>
    """
  end

  def mount(_params, _session, socket) do
    socket =
      socket
      |> assign(page_title: gettext("Register"))                                                                                  #(1)
      |> assign(static_changed?: static_changed?(socket))
    changeset = Accounts.change_user_registration(%User{})

    socket =
      socket
      |> assign(trigger_submit: false, check_errors: false)
      |> assign_form(changeset)

    {:ok, socket, temporary_assigns: [form: nil]}
  end

  def handle_event("save", %{"user" => user_params}, socket) do
    case Accounts.register_user(user_params) do
      {:ok, user} ->
        {:ok, _} =
          Accounts.deliver_user_confirmation_instructions(
            user,
            &url(~p"/users/confirm/#{&1}")
          )

        changeset = Accounts.change_user_registration(user)
        {:noreply, socket |> assign(trigger_submit: true) |> assign_form(changeset)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, socket |> assign(check_errors: true) |> assign_form(changeset)}
    end
  end

  def handle_event("validate", %{"user" => user_params}, socket) do
    changeset = Accounts.change_user_registration(%User{}, user_params)
    {:noreply, assign_form(socket, Map.put(changeset, :action, :validate))}
  end

  defp assign_form(socket, %Ecto.Changeset{} = changeset) do
    form = to_form(changeset, as: "user")

    if changeset.valid? do
      assign(socket, form: form, check_errors: false)
    else
      assign(socket, form: form)
    end
  end
end
