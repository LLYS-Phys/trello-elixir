#.................................................... Notes & learnings ......................................................
# 1) Although we pass the key "locale" to the "session" as an :atom it is converted in a "string";
# 2) That model is added in the app_web.ex file and it is automatically added to all liveviews;
#.............................................................................................................................
defmodule AppWeb.OnMountInject.Locale do                                                                                      #2
  import Phoenix.Component

  @spec on_mount(:default, any(), map(), map()) :: {:cont, map()}
  def on_mount(:default, _params, %{"locale" => locale}, socket) do                                                           #1
    Gettext.put_locale(AppWeb.Gettext, locale)
    {:cont, assign(socket, :locale, locale)}
  end

end
