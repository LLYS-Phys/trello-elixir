defmodule AppWeb.Trello.NoAccess do
  use AppWeb, :live_view

  def mount(_params, _session, socket) do
    if socket.assigns.current_user do
      {:ok, redirect(socket, to: "/boards")}
    else
      socket =
        socket
        |> assign(page_title: gettext("Home"))
        |> assign(static_changed?: static_changed?(socket))

      {:ok, socket}
    end
  end

  def render(assigns) do

    ~H"""
     <style>
        .notFound .path1, .path2, .path3, .path4, .path4, .path5 { animation: notFoundFloat 1s infinite ease-in-out alternate; }
        .notFound .path2 { animation-delay: .2s; }
        .notFound .path3 { animation-delay: .4s; }
        .notFound .path4 { animation-delay: .6s; }
        .notFound .path5 { animation-delay: .8s; }
        .notFound .btn-container { gap: 1rem;
          & button { border: none; padding: 0.5rem 1rem; }
        }
        .notFound .text-container { max-width: 50%; }
        @keyframes notFoundFloat { 100% { transform: translateY(1.3rem); } }
      </style>
      <div class="page notFound main">
        <svg style="width:23rem; height: 33rem;" viewBox="0 0 837 1045">
          <g fill="none" stroke-width="6">
            <path d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z" class="path1"
                  stroke="blue" stroke-width="6"></path>
            <path d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z" class="path2"
                  stroke="violet" stroke-width="6"></path>
            <path d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z" class="path3"
                  stroke="red"></path>
            <path d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z" class="path4"
                  stroke="green" stroke-width="6"></path>
            <path d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z" class="path5"
                  stroke="brown"></path>
          </g>
        </svg>
        <div class="text-container">
          <h3 class="width100"> {gettext("Log in or Register to go to your boards!")}</h3>
          <div class="btn-container">
            <.button>
              <.link navigate={~p"/users/log_in"}>{gettext("Log in")}</.link>
            </.button>
            <.button>
              <.link navigate={~p"/users/register"}>{gettext("Register")}</.link>
            </.button>
          </div>
        </div>
	    </div>
    """
  end
end
