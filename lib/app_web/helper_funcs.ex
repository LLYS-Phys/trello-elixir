#.................................................... Notes & learnings ......................................................
# 1) classes_to_selector(classes);
#.............................................................................................................................
defmodule AppWeb.HelperFuncs do
  @moduledoc """
  This is a module where we should create new helper Functions to be used in our Web pages and components.
  """

  @doc """
  Function to make sure classes added when instantiating a component are properly used as Css selector.
  ## Examples
      iex> AppWeb.HelperFuncs.classes_to_selector("transFast popup lol")
      ".transFast.popup.lol"
  """
  def classes_to_selector(classes) do                                                                                         #(1)
  classes
        |> String.split()                                                                     # ["transFast", "popup", "lol"]
        |> Enum.join(".")                                                                     # "transFast.popup.lol"
      "." <> classes
  end

end
