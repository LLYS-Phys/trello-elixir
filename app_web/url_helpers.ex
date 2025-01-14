defmodule AppWeb.UrlHelpers do
  def build_url(current_path, params) do
    query_string = URI.encode_query(params)
    "/#{current_path}?#{query_string}"
  end

  def slugify_and_path(name), do: String.replace(name, " ", "-")

  def construct_category_path(category), do: "/#{slugify_and_path(category.name)}/#{category.id}"

  def construct_subcategory_path(subcategory),
    do:
      "/#{slugify_and_path(subcategory.category.name)}/#{slugify_and_path(subcategory.name)}/#{subcategory.category.id}/#{subcategory.id}"

  def should_redirect?(current, target) do
    current != target
  end
end
