#.................................................. Notes & learnings ........................................................
# 1) Define the Title of the page;
# 2) The home page (who should be the landing page most of the times) should validate if the CSS and JS files being used are
# 3) Added "main page" classes;
#...............................................................................................

defmodule AppWeb.UserLoginLive do
  use AppWeb, :live_view

  def render(assigns) do
    ~H"""
    <style>
      header { height: auto; }
    </style>
    <div class="mx-auto max-w-sm main page">                                                                                             <% #3%>
    <.header class="text-center">
      {gettext("Log in to account")}
        <:subtitle>
        {gettext("Don't have an account?")}
          <.link navigate={~p"/users/register"} class="font-semibold text-brand hover:underline" style="margin: 0.25rem;">             <% #2%>
            {gettext("Sign up")}
          </.link>
          {gettext("for an account now.")}
        </:subtitle>
      </.header>

      <.simple_form for={@form} id="login_form" action={~p"/users/log_in"} phx-update="ignore">
        <.input field={@form[:email]} type="email" label="Email" required  style={%{main: "width: 17rem;", inner: "", label: ""}} />     <% #2%>
        <.input field={@form[:password]} type="password" label={gettext("Password")} required  style={%{main: "width: 17rem;", inner: "", label: ""}}/>

        <:actions>
          <.input field={@form[:remember_me]} type="checkbox" label={gettext("Keep me logged in")} />
          <.link navigate={~p"/users/reset_password"} class="text-sm font-semibold">
            {gettext("Forgot your password?")}
          </.link>
        </:actions>
        <:actions>
          <.button phx-disable-with={gettext("Logging in...")} class="w-full" style="border: none;">                                     <% #2%>
            {gettext("Log in")} <span aria-hidden="true">→</span>
          </.button>
        </:actions>
      </.simple_form>
    </div>
    """
  end

  def mount(_params, _session, socket) do
    socket =
      socket
      |> assign(page_title: gettext("Login"))                                                                                            #(1)
      |> assign(static_changed?: static_changed?(socket))
    email = Phoenix.Flash.get(socket.assigns.flash, :email)
    form = to_form(%{"email" => email}, as: "user")
    {:ok, assign(socket, form: form), temporary_assigns: [form: form]}
  end
end
