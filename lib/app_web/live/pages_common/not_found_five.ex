defmodule AppWeb.NotFoundFive do
  @moduledoc """
  Not Found Page with the following comments:
  1) We need to import all these components as we use some of them in our pages;
  2) Define the Title of the page;
  3) Every page can be the landing page for the application and thus should validate if the CSS and JS files being used are
      the latests, ie, if they are updated (as set in the "root layout" comment (5));
  """
  use AppWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok, socket
          |> assign(page_title: gettext("Not Found"))                                                                                  #(2)
          |> assign(static_changed?: static_changed?(socket))}                                                                #(3)
  end

  def render(assigns) do
    ~H"""
    <style>
      .notFound5 {
        & img { height: 30rem; }
        & .btn-container .go-home-button { margin-top: 1rem; background-color: rgba(24,34,113,0.9); padding: 1rem 2rem;
          &:hover { background-color: rgba(24,34,113,1); }
        }
      }
    </style>
    <div class="page notFound main notFound5">
      <h1 class="width100"> <%= gettext("Sorry, the dog ate our page.") %></h1>
      <img src="/images/404-dog.jpg"/>
      <div class="btn-container width100">
        <.button class="go-home-button"> <.link navigate={~p"/"}>{gettext("Back to Home")}</.link> </.button>
      </div>
    </div>
    """
  end
end
