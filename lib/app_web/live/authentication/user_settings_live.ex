#.................................................. Notes & learnings ........................................................
# 1) Define the Title of the page;
# 2) The home page (who should be the landing page most of the times) should validate if the CSS and JS files being used are
# 3) Added "main page" classes;
# 4) Added this "div";
# 5) Removed the class"divide-y";
#...............................................................................................

defmodule AppWeb.UserSettingsLive do
  use AppWeb, :live_view

  alias App.Accounts

  def render(assigns) do
    ~H"""
    <div class="main page">                                                                                                                        <% #4%>
      <.header class="text-center" style={%{main: "width: 100%;", title: "width: 100%;", subtitle: ""}}>                                           <% #2%>
        {gettext("Account Settings")}
        <:subtitle>{gettext("Manage your account email address and password settings")}</:subtitle>
      </.header>

      <div class="space-y-12">                                                                                                                     <% #5%>
        <div>
          <.simple_form
            for={@email_form}
            id="email_form"
            phx-submit="update_email"
            phx-change="validate_email"
            style={%{wrapper: "width: 25rem;", actions: ""}}
          >                                                                                                                                         <% #2%>
          <.input field={@email_form[:email]} type="email" label="Email" required style={%{main: "width: 17rem;", inner: "", label: ""}} />         <% #2%>
          <.input
              field={@email_form[:current_password]}
              name="current_password"
              id="current_password_for_email"
              type="password"
              label={gettext("Current password")}
              value={@email_form_current_password}
              required
              style={%{main: "width: 17rem; margin-left: 10%; margin-right: 10%;", inner: "", label: ""}}
            />                                                                                                                                      <% #2%>
            <:actions>
              <.button phx-disable-with={gettext("Changing...")} style="border: none;">{gettext("Change Email")}</.button>                          <% #2%>
            </:actions>
          </.simple_form>
        </div>
        <div style="margin: 0;">                                                                                                                    <% #2%>
          <.simple_form
            for={@password_form}
            id="password_form"
            action={~p"/users/log_in?_action=password_updated"}
            method="post"
            phx-change="validate_password"
            phx-submit="update_password"
            phx-trigger-action={@trigger_submit}
            style={%{wrapper: "width: 25rem;", actions: ""}}
          >                                                                                                                                         <% #2%>
            <input
              name={@password_form[:email].name}
              type="hidden"
              id="hidden_user_email"
              value={@current_email}
            />
            <.input
              field={@password_form[:password]}
              type="password"
              label={gettext("New password")}
              required
              style={%{main: "width: 17rem;", inner: "", label: ""}}
            />                                                                                                                                      <% #2%>
            <.input
              field={@password_form[:password_confirmation]}
              type="password"
              label={gettext("Confirm new password")}
              style={%{main: "width: 17rem;", inner: "", label: ""}}
            />                                                                                                                                      <% #2%>
            <.input
              field={@password_form[:current_password]}
              name="current_password"
              type="password"
              label={gettext("Current password")}
              id="current_password_for_password"
              value={@current_password}
              required
              style={%{main: "width: 17rem; margin-left: 10%; margin-right: 10%;", inner: "", label: ""}}
            />                                                                                                                                      <% #2%>
            <:actions>
              <.button phx-disable-with={gettext("Changing...")} style="border: none;">{gettext("Change Password")}</.button>                                        <% #2%>
            </:actions>
          </.simple_form>
        </div>
      </div>
    </div>
    """
  end

  def mount(%{"token" => token}, _session, socket) do
    socket =
      case Accounts.update_user_email(socket.assigns.current_user, token) do
        :ok ->
          put_flash(socket, :info, gettext("Email changed successfully."))

        :error ->
          put_flash(socket, :error, gettext("Email change link is invalid or it has expired."))
      end

      socket =
        socket
        |> assign(page_title: gettext("User Settings"))                                                                                             #(1)
        |> assign(static_changed?: static_changed?(socket))

    {:ok, push_navigate(socket, to: ~p"/users/settings")}
  end

  def mount(_params, _session, socket) do
    user = socket.assigns.current_user
    email_changeset = Accounts.change_user_email(user)
    password_changeset = Accounts.change_user_password(user)

    socket =
      socket
      |> assign(page_title: gettext("User Settings"))                                                                                               #(1)
      |> assign(static_changed?: static_changed?(socket))

    socket =
      socket
      |> assign(:current_password, nil)
      |> assign(:email_form_current_password, nil)
      |> assign(:current_email, user.email)
      |> assign(:email_form, to_form(email_changeset))
      |> assign(:password_form, to_form(password_changeset))
      |> assign(:trigger_submit, false)

    {:ok, socket}
  end

  def handle_event("validate_email", params, socket) do
    %{"current_password" => password, "user" => user_params} = params

    email_form =
      socket.assigns.current_user
      |> Accounts.change_user_email(user_params)
      |> Map.put(:action, :validate)
      |> to_form()

    {:noreply, assign(socket, email_form: email_form, email_form_current_password: password)}
  end

  def handle_event("update_email", params, socket) do
    %{"current_password" => password, "user" => user_params} = params
    user = socket.assigns.current_user

    case Accounts.apply_user_email(user, password, user_params) do
      {:ok, applied_user} ->
        Accounts.deliver_user_update_email_instructions(
          applied_user,
          user.email,
          &url(~p"/users/settings/confirm_email/#{&1}")
        )

        info = gettext("A link to confirm your email change has been sent to the new address.")
        {:noreply, socket |> put_flash(:info, info) |> assign(email_form_current_password: nil)}

      {:error, changeset} ->
        {:noreply, assign(socket, :email_form, to_form(Map.put(changeset, :action, :insert)))}
    end
  end

  def handle_event("validate_password", params, socket) do
    %{"current_password" => password, "user" => user_params} = params

    password_form =
      socket.assigns.current_user
      |> Accounts.change_user_password(user_params)
      |> Map.put(:action, :validate)
      |> to_form()

    {:noreply, assign(socket, password_form: password_form, current_password: password)}
  end

  def handle_event("update_password", params, socket) do
    %{"current_password" => password, "user" => user_params} = params
    user = socket.assigns.current_user

    case Accounts.update_user_password(user, password, user_params) do
      {:ok, user} ->
        password_form =
          user
          |> Accounts.change_user_password(user_params)
          |> to_form()

        {:noreply, assign(socket, trigger_submit: true, password_form: password_form)}

      {:error, changeset} ->
        {:noreply, assign(socket, password_form: to_form(changeset))}
    end
  end
end
