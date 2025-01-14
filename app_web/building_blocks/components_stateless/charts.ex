defmodule AppWeb.Charts do
  @moduledoc """
    Calling the component:
      The Basic (bar chart):
        <.charts class="" data={%{points: [14, 3, 8, 2, 1], point_labels: ["Category A", "Category B", "Category C", "Category D", "Category E"], data_labels: ["Categories Score"], x_coords: [], y_coords: []}}/>
    #! For type specficic examples see the bottom of the documentation

    Type-attrbiute specific information:
      1) config: "mixed_types" is only used when config.type is "mixed"
      2) data:
          a) When type is any of the following: "bar", "line", "doughnut", "pie", "polarArea", "radar", "mixed", you can use:
            - "points", "point_labels", "data_labels"
          b) When type is any of the following: "bubble", "scatter", you can use:
            - "data_labels", "x_coords", "y_coords"
      3) options: "dot_radius" is only used when config.type is "bubble"
    Additional Information:
      - config.type takes one of the following values: "bar", "line", "doughnut", "pie", "polarArea", "radar", "mixed", "bubble", "scatter".
        If there is no match, it defaults to "bar"
      - options.x_scale_position takes one of the following values: "bottom", "top". If there is no match, it defaults to "bottom".
      - options.y_scale_position takeas one of the following values: "left", "right". If there is no match, it defaults to "left".
      - When you are passing a list of colors in the options map to any inner attribute, make sure all colors use the same format (either names or rgb/rgba).
      - The types "bar", "line" and "radar" can be used with infinite amount of datasets
      - The types "doughnut", "pie" and "polarArea" are not meant to be used with more than one dataset, but such can be added to them without breaking the visualization
      - The type "mixed" is meant to be used with at least 2 datasets of different types. This type WILL NOT load without a second dataset defined
      - The types "bubble" and "scatter" can be used with only one dataset and a single color for all dots. The same applies to border color

    Type specific examples:
      1) Basic bar chart with custom colors:
          <.charts class="chart-bar" data={%{points: [14, 3, 8, 2, 1], point_labels: ["Category A", "Category B", "Category C", "Category D", "Category E"], data_labels: ["Categories Score"], x_coords: [], y_coords: []}} options={%{main_axis: "x", x_scale_position: "bottom", y_scale_position: "left", points_color: ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)"], points_border_color: ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)"], points_border_width: 1, dot_radius: [], chart_height: "40rem"}}/>
      2) Bar chart with 2 datasets and custom colors:
          <.charts class="chart-bar-two-datasets" data={%{points: [[14, 3, 8, 2, 1], [24, 13, 18, 12, 11]], point_labels: ["Category A", "Category B", "Category C", "Category D", "Category E"], data_labels: ["Categories Score 1", "Categories Score 2"], x_coords: [], y_coords: []}} options={%{main_axis: "x", x_scale_position: "bottom", y_scale_position: "left", points_color: [["rgba(255, 99, 132, 0.2)"], ["rgba(255, 205, 86, 0.2)"]], points_border_color: [["rgb(255, 99, 132)"], ["rgb(75, 192, 192)"]], points_border_width: 1, dot_radius: [], chart_height: "40rem"}}/>
      3) Bar chart with 3 datasets, shifted main scale and custom colors:
          <.charts class="chart-bar-three-datasets-y-orientation" data={%{points: [[14, 3, 8, 2, 1], [24, 13, 18, 12, 11], [34, 23, 28, 22, 21]], point_labels: ["Category A", "Category B", "Category C", "Category D", "Category E"], data_labels: ["Categories Score 1", "Categories Score 2", "Categories Score 3"], x_coords: [], y_coords: []}} options={%{main_axis: "y", x_scale_position: "bottom", y_scale_position: "left", points_color: [["rgba(255, 99, 132, 0.2)"], ["rgba(255, 205, 86, 0.2)"], ["rgba(54, 162, 235, 0.2)"]], points_border_color: [["rgb(255, 99, 132)"], ["rgb(75, 192, 192)"], ["rgb(54, 162, 235)"]], points_border_width: 1, dot_radius: [], chart_height: "40rem"}}/>
      4) Basic line chart with custom colors:
          <.charts class="chart-line" config={%{type: "line", mixed_types: []}} data={%{points: [[14, 13, 18, 12, 11], [4, 13, 28, 32, 21], [32, 25, 17, 25, 38]], point_labels: ["Category A", "Category B", "Category C", "Category D", "Category E"], data_labels: ["Categories Score 1", "Categories Score 2", "Categories Score 3"], x_coords: [], y_coords: []}} options={%{main_axis: "x", x_scale_position: "bottom", y_scale_position: "left", points_color: [["rgba(255, 99, 132, 0.2)"], ["rgba(255, 205, 86, 0.2)"], ["rgba(54, 162, 235, 0.2)"]], points_border_color: [["rgb(255, 99, 132)"], ["rgb(75, 192, 192)"], ["rgb(54, 162, 235)"]], points_border_width: 1, dot_radius: [], chart_height: "40rem"}}/>
      5) Basic doughnut chart with custom colors:
          <.charts class="chart-doughnut" config={%{type: "doughnut", mixed_types: []}} data={%{points: [14, 3, 8, 2, 1], point_labels: ["Category A", "Category B", "Category C", "Category D", "Category E"], data_labels: ["Categories Score"], x_coords: [], y_coords: []}} options={%{main_axis: "x", x_scale_position: "bottom", y_scale_position: "left", points_color: ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)"], points_border_color: ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)"], points_border_width: 1, dot_radius: [], chart_height: "40rem"}}/>
      6) Basic pie chart with custom colors:
          <.charts class="chart-pie" config={%{type: "pie", mixed_types: []}} data={%{points: [14, 3, 8, 2, 1], point_labels: ["Category A", "Category B", "Category C", "Category D", "Category E"], data_labels: ["Categories Score"], x_coords: [], y_coords: []}} options={%{main_axis: "x", x_scale_position: "bottom", y_scale_position: "left", points_color: ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)"], points_border_color: ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)"], points_border_width: 1, dot_radius: [], chart_height: "40rem"}}/>
      7) Basic polar area chart with custom colors:
          <.charts class="chart-polarArea" config={%{type: "polarArea", mixed_types: []}} data={%{points: [14, 3, 8, 2, 1], point_labels: ["Category A", "Category B", "Category C", "Category D", "Category E"], data_labels: ["Categories Score"], x_coords: [], y_coords: []}} options={%{main_axis: "x", x_scale_position: "bottom", y_scale_position: "left", points_color: ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)"], points_border_color: ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)"], points_border_width: 1, dot_radius: [], chart_height: "40rem"}}/>
      8) Basic radar chart with custom colors:
          <.charts class="chart-radar" config={%{type: "radar", mixed_types: []}} data={%{points: [[14, 13, 18, 12, 11], [4, 13, 28, 32, 21], [32, 25, 17, 25, 38]], point_labels: ["Category A", "Category B", "Category C", "Category D", "Category E"], data_labels: ["Categories Score 1", "Categories Score 2", "Categories Score 3"], x_coords: [], y_coords: []}} options={%{main_axis: "x", x_scale_position: "bottom", y_scale_position: "left", points_color: [["rgba(255, 99, 132, 0.2)"], ["rgba(255, 205, 86, 0.2)"], ["rgba(54, 162, 235, 0.2)"]], points_border_color: [["rgb(255, 99, 132)"], ["rgb(75, 192, 192)"], ["rgb(54, 162, 235)"]], points_border_width: 1, dot_radius: [], chart_height: "40rem"}}/>
      9) Basic mixed chart with 2 datasets with types "bar" and "line" and custom colors:
          <.charts class="chart-mixed" config={%{type: "mixed", mixed_types: ["bar", "line"]}} data={%{points: [[14, 3, 8, 2, 1], [34, 12, 8, 23, 18]], point_labels: ["Category A", "Category B", "Category C", "Category D", "Category E"], data_labels: ["Categories Score 1", "Categories Score 2"], x_coords: [], y_coords: []}} options={%{main_axis: "x", x_scale_position: "bottom", y_scale_position: "left", points_color: [["rgba(255, 99, 132, 0.2)"], ["rgba(255, 205, 86, 0.2)"]], points_border_color: [["rgb(255, 99, 132)"], ["rgb(75, 192, 192)"]], points_border_width: 1, dot_radius: [], chart_height: "40rem"}}/>
      10) Basic bubble chart with different dot radiuses for each dot and custom colors:
          <.charts class="chart-bubble" config={%{type: "bubble", mixed_types: []}} data={%{points: [], point_labels: [], data_labels: ["Dot Score"], x_coords: [-10, 1, 2], y_coords: [2, 6, 9]}} options={%{main_axis: "x", x_scale_position: "bottom", y_scale_position: "left", points_color: ["green", "red", "blue"], points_border_color: ["rgb(255, 99, 132)"], points_border_width: 1, dot_radius: [10, 15, 20], chart_height: "40rem"}}/>
      11) Basic scatter chart with custom colors:
          <.charts class="chart-scatter" config={%{type: "scatter", mixed_types: []}} data={%{points: [], point_labels: [], data_labels: ["Dot Score"], x_coords: [-10, 1, 2], y_coords: [2, 6, 9]}} options={%{main_axis: "x", x_scale_position: "bottom", y_scale_position: "left", points_color: ["rgba(255, 99, 132, 0.2)"], points_border_color: ["rgb(255, 99, 132)"], points_border_width: 1, dot_radius: [], chart_height: "40rem"}}/>
  """
  use AppWeb, :html

  attr :class, :string, default: nil
  attr :config, :map, default: %{type: "bar", mixed_types: []}
  attr :options, :map, default: %{main_axis: "x", x_scale_position: "bottom", y_scale_position: "left", points_color: ["rgba(255, 99, 132, 0.2)"], points_border_color: ["rgb(255, 99, 132)"], points_border_width: 1, dot_radius: [], chart_height: "40rem"}
  attr :data, :map, default: %{points: [], point_labels: [], data_labels: [], x_coords: [], y_coords: []}

  def charts(assigns) do
    ~H"""
    <div class="width100" style={"height: #{@options.chart_height};"}>
      <canvas class={@class} id={"chart-#{@class}"} phx-hook="Charts" data-type={if Enum.member?(["bar", "line", "doughnut", "pie", "polarArea", "radar", "mixed", "bubble", "scatter"], @config.type), do: @config.type, else: "bar"} data-chart-mixed-type={Jason.encode!(@config.mixed_types)} data-points={Jason.encode!(@data.points)} data-labels={Jason.encode!(@data.point_labels)} data-main-axis={if Enum.member?(["x", "y"], @options.main_axis), do: @options.main_axis, else: "x"} data-data-label={Jason.encode!(@data.data_labels)} data-points-color={Jason.encode!(@options.points_color)} data-points-border-color={Jason.encode!(@options.points_border_color)} data-points-border-width={@options.points_border_width} data-x-coords={Jason.encode!(@data.x_coords)} data-y-coords={Jason.encode!(@data.y_coords)} data-dot-radius={Jason.encode!(@options.dot_radius)} data-x-scale-position={if Enum.member?(["top", "bottom"], @options.x_scale_position), do: @options.x_scale_position, else: "bottom"} data-y-scale-position={if Enum.member?(["left", "right"], @options.y_scale_position), do: @options.y_scale_position, else: "left"}></canvas>
    </div>
    """
  end
end
