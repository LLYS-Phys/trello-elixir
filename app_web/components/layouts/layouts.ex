# .................................................. Notes & learnings ........................................................
# 1) We need to import all these components as we use some of them in our pages;
# 2) Import the language select component for root
# 3) Import the chat icon component for app
# 4) Import the contacts bubble component for app
# .............................................................................................................................

defmodule AppWeb.Layouts do
  use AppWeb, :html

  import AppWeb.HeadModules                                                                                                   #(1)
  import AppWeb.LangSelect                                                                                                    #(2)
  import AppWeb.ContactsBubble                                                                                                #(4)
  import AppWeb.CookieBanner
  import AppWeb.CountdownLoad

  alias Phoenix.LiveView.JS

  embed_templates("*")

  defp contacts_link_popup(js \\ %JS{}) do
    js
    |> JS.add_class("active", to: ".contacts-box")
    |> JS.remove_class("active", to: ".chat-box")
  end
end
