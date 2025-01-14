#.................................................... Notes & learnings ......................................................
# This is a file where we should create new custom Plugs.
# 1) Module Plug that puts the ":locale" key and value into the connection assign for downstream use. Use it in the "router.ex"
#    as the last plug to be called in the pipeline where you want to use it, like this:
#                                           pipeline :browser do
#                                             plug :accepts, ["html"]
#                                             ...
#                                             plug AppWeb.Plug.Locale
#                                           end
#    This Plug is based on cookies being set (ONLY BY the client/javascript) to store the "locale" as we cannot also use
#    localStorage as we need this value to be passed immediatly with the page request, as we use it on the "html" tag, before
#    we can run any Javascript to get it.
#    The priority of setting the "locale" value is: (1) value being passed manually by the client, (2) value already existing
#    in the "locale" cookie, (3) based on the browser language, (4) default value defined in the Plug. But (1) and (2),
#    technically are the same for the server as we instead of manually passing the "locale" as query string parameters, like
#    ?locale="en", for example, on the client when we click on the menu to chose another language, we set a new value on the
#    "locale" cookie and issue a new request for that page (that by default will include the new cookie and receive the
#    translated same page);
#    a) add the language's code that you want to allow in the system (for example, if the user hacks the language code sent in
#       the query string and inserts a language code that we don't support, the system will use the default language instead);
#    b) set the default language code;
#    c) when the "locale" is not manually set by the user, the "Browser language" is used to set the language code as long as,
#       after we extract only the country code (for example, "en-us" is transformed in "us") it matches one of our accepted
#       locales (see 1a);
#    d) when neither the "locale" is manually set by the user, nor the "Browser language" macthes our accepted locales (see 1a),
#       we use the default language code;
#    e) set the language code as the gettext locale;
#    f) WE ARE NOT persisting "locale" in a cookie as when Phoenix writes the cookie in the browser using this function we cannot
#       later change it using javascript (for unknown reasons...), so only the user can set it;
#    g) making the language code available in the Conn asssigns as ":locale";
#    h) if "locale" is passed in a cookie with the name "locale" and if it matches one of our accepted locales (see 1a), assign
#       that value to the "conn";
#    i) init/1 does not need to initialize any options, so it simply returns nil. If, for example, you want it to accept a
#       default locale, change it to something like:
#                                   def init(default_locale), do: default_locale
#       Here you may also want to check if the default_locale is actually supported by the app.
#       The plug would then accept a default value in the route.ex file like this:
#                                                                                   plug AppWeb.Plugs.Locale, "en"
#       for a default locale set to "en";
#    j) Injects the "locale" in the "session" so that it can be passed to the Liveview;
# 2) Module that will contain all our web helper Plugs;
# 3) Function Plug to be used on the "Endpoint" chain of plugs before the last one (Router), so that we can inspect the request
#    fields of our Plug.Conn struct. Use it like this:
#                                           import AppWeb.Plugs
#                                           ...
#                                           plug :request_fields
#                                           plug AppWeb.Router
#   NOTE: use it only in Development mode!
# 4) Function(s) Plug that reads cookies and sets values to control show/noShow of "root_components". Use it in the "endpoint.ex"
#    as the last plug to be called in the pipeline where you want to use it, like this:
#                                           import AppWeb.Plugs
#                                           ...
#                                           plug :extract_cookie_destak
#                                           plug :extract_cookie_banner_cookies
#                                           plug AppWeb.Router
#     a) This one is used in the "app_web/building_blocks/root_components/destak.ex" file;
#     b) This one is used in the "app_web/building_blocks/root_components/banner_cookies.ex" file;
#.............................................................................................................................
defmodule AppWeb.Plug.Locale do                                                                                               #(1)
  import Plug.Conn

  @locales ["en", "pt", "de", "fr","it", "es"]                                                                                #(1a)
  @default "en"                                                                                                               #(1b)

  def init(_opts), do: nil                                                                                                    #(1i)

  def call(conn, _opts) do
    IO.puts """
              Default locale is: #{@default}
              Accepted locales are: #{inspect @locales}
              Cookie locale is: #{conn.cookies["locale"]}
              Accepted browser language: #{inspect(get_req_header(conn, "accept-language"))}
            """
    if (conn.cookies["locale"] && conn.cookies["locale"] in @locales) do                                                      #(1h)
      Gettext.put_locale(AppWeb.Gettext, conn.cookies["locale"])                                                              #(1e)
      IO.puts """
                Locale being set is: #{conn.cookies["locale"]}
              """
      conn
        |> put_session(:locale, conn.cookies["locale"])                                                                       #(1j)
        |> assign(:locale, conn.cookies["locale"])                                                                            #(1g)
    else
      with loc <- get_req_header(conn, "accept-language"),                                                                    #(1c)
        loc when loc in @locales <- loc |> Enum.at(0) |> String.split("-") |> Enum.at(0) do                                   #(1c)
        Gettext.put_locale(AppWeb.Gettext, loc)                                                                               #(1e)
#        conn = put_resp_cookie(conn, "locale", loc, max_age: 1000*24*60*60)                                                   #(1f)
        IO.puts """
                  Locale being set is: #{loc}
                """
        conn
          |> put_session(:locale, loc)                                                                                        #(1j)
          |> assign(:locale, loc)                                                                          #(1g)
      else
        _ ->                                                                                                                  #(1d)
          Gettext.put_locale(AppWeb.Gettext, @default)                                                                        #(1e)
#          conn = put_resp_cookie(conn, "locale", @default, max_age: 1000*24*60*60)                                            #(1f)
          IO.puts """
                    Locale being set is: #{@default}
                  """
          conn
            |> put_session(:locale, @default)                                                                                 #(1h)
            |> assign(:locale, @default)                                                                                      #(1g)
      end
    end
  end
end

defmodule AppWeb.Plug.CardsVisibility do
  @moduledoc """
  Reads a user_details cookie and puts user_details into session
  """
  import Plug.Conn

  def init(_opts), do: nil

  def call(conn, _opts) do
    conn = fetch_cookies(conn)

    cookie = conn.cookies["cards_filtered_visibility"]

    cards_filtered_visibility = case cookie do
      nil -> false
      _ -> cookie
    end

    conn
    |> put_session(:cards_filtered_visibility, cards_filtered_visibility) # Makes it available in LiveView
    |> assign(:cards_filtered_visibility, cards_filtered_visibility) # Makes it available in traditional controllers etc
  end
end

defmodule AppWeb.Plugs do                                                                                                     #(2)
  import Plug.Conn
  import Phoenix.Controller

  def extract_cookie_destak(conn, _opts) do                                                                                   #(4a)
    if (conn.cookies["bannerDestakState"] == "closed") do
      assign(conn, :showBannerDestak, nil)
    else
      assign(conn, :showBannerDestak, "true")
    end
  end

  def extract_cookie_banner_cookies(conn, _opts) do                                                                           #(4b)
    if (conn.cookies["bannerCookiesState"] == "closed") do
      assign(conn, :showBannerCookies, nil)
    else
      assign(conn, :showBannerCookies, "true")
    end
  end

  def request_fields(conn, _opts) do                                                                                          #(3)
    IO.puts """
            Plug.Conn request fields:
              Verb: #{inspect(conn.method)}
              Host: #{inspect(conn.host)}
              Headers: #{inspect(conn.req_headers)}
              Path segments: #{inspect(conn.path_info)}
              Sub-domain:  #{inspect(conn.script_name)}
              Path:  #{inspect(conn.request_path)}
              Port:  #{inspect(conn.port)}
              IP:  #{inspect(conn.remote_ip)}
              Protocol:  #{inspect(conn.scheme)}
              Query string:  #{inspect(conn.query_string)}
            """
    IO.puts """
            In the Plug showBannerCookies is: #{conn.assigns.showBannerCookies}
            In the Plug showDestak is: #{conn.assigns.showBannerDestak}
            """
    conn
  end

  def check_admin_panel_access(conn, _opts) do
    permissions = conn.assigns.current_user.role.permissions

      if App.Authorization.admin_panel_access?(permissions) do
        conn

      else
        conn
          |> put_flash(:error, "You do not have access to the admin panel.")
          |> redirect(to: "/")
          |> halt()
      end
  end


  # Creates guest_id if it doesnt exist in the session, for live chat. (It can be also used in future for shopping card)
  def assign_guest_id_for_non_logged_in_user(conn, _opts) do

    guest_id = get_session(conn, :guest_id)

    if guest_id do
      conn
    else
      new_guest_id = :rand.uniform(2147483647)
      conn
      |> put_session(:guest_id, new_guest_id)
      |> assign(:guest_id, new_guest_id)
    end
  end
end

#................................. USER TRACKING PLUG ..................................
# Create a Plug that tracks users not authenticated by generating a random number between 0 and 10 Million and injecting it in
# a cookie. It needs to read it also.

#................................. Future expansion of the Module FoundationWeb.Plug.Locale ..................................
# 0) As long as the default locale is already set in the config/config.exs
#    (line config :demo, FoundationWeb.Gettext, default_locale: "ru", locales: ~w(en ru)), there is no need to pass the default
#    value to the plug again as it was done with the set_locale;
# 1) In the client side we could instead use the classic approach of passing the "locale" value to the server by issuing a
#    request with the "locale" in the quey params. For that we could use this path helper in the template (one per language)
#    that puts "?locale="en" on the query params:
#                                                 <a href="<%# Routes.page_path(@conn, :index, locale: :en) %>">English</a>
#    and then on the server we needed to define this extra clause of the "call" function (as the first one):
#                    def call(%Plug.Conn{params: %{"locale" => loc}} = conn, _opts) when loc in @locales do
#                      Gettext.put_locale(FoundationWeb.Gettext, loc)                                                         #(1f)
#                      conn = put_resp_cookie(conn, "locale", loc, max_age: 1000*24*60*60)                                    #(1g)
#                      IO.puts 'locale being set in cookie is: #{conn.cookies["locale"] |> IO.inspect}'                       #(1i)
#                      assign(conn, :locale, loc)                                                                             #(1h)
#                    end
#    This would be a function that matches when the user is manually chosing a language passing "locale" in params passed to
#    the server;
