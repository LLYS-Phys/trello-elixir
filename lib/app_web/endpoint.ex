#.................................................... Notes & learnings ......................................................
# 1) Function Plug that allow us to inspect our Plug.Conn struct. NOTE: use only in development mode:
#    a) we need to import the function Plug in here as we cannot just alias or use the full name when calling the plug below.
#       Should be the last Plug before the "Plug.Router";
# 2) Function Plugs that reads cookies and sets values to control show/noShow of "root_components";
# 3) You need to change it to true in production
#.............................................................................................................................
defmodule AppWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :app

  import AppWeb.Plugs                                                                                                         #(1a)

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  @session_options [
    store: :cookie,
    key: "_app_key",
    signing_salt: "Dl/ccgYo",
    same_site: "Lax"
  ]

  socket "/live", Phoenix.LiveView.Socket,
    websocket: [connect_info: [session: @session_options]],
    longpoll: [connect_info: [session: @session_options]]

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phx.digest
  # when deploying your static files in production.
  plug Plug.Static,
    at: "/",
    from: :app,
    gzip: false,                                                                                                              #(3)
    only: AppWeb.static_paths()

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    socket "/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
    plug Phoenix.Ecto.CheckRepoStatus, otp_app: :app
  end

  plug Phoenix.LiveDashboard.RequestLogger,
    param_key: "request_logger",
    cookie_key: "request_logger"

  plug Plug.RequestId
  plug Plug.Telemetry, event_prefix: [:phoenix, :endpoint]

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Phoenix.json_library()

  plug Plug.MethodOverride
  plug Plug.Head
  plug Plug.Session, @session_options
  plug :extract_cookie_destak                                                                                                 #(2)
  plug :extract_cookie_banner_cookies                                                                                         #(2)
  plug :request_fields                                                                                                        #(2)
  plug AppWeb.Router
end
