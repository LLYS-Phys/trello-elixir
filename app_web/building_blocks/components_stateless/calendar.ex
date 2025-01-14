defmodule AppWeb.Calendar do
  @moduledoc """
    Calling the component:
      The Basic:
        <.calendar class="calendar1" data={%{label: "Calendar example 1"}} />
      All available options:
        <.calendar class="calendar2" config={%{date_format: "d-m-Y", time_format: "H:i", alt_format: "F j, Y", calendar_mode: "multiple", clock_type: 24, week_start: 0, inline_calendar: 0}} options={%{default_date: "today", min_date: "01-01-2024 09:00", max_date: "31-12-2025 18:00", disabled_dates: "31-12-2024", dates_conjunction: " & ", min_time: "09:00", max_time: "18:00", allow_input: 1, enable_seconds: 1, minute_increment: 5, short_month_name: 1, months_to_show: 1, month_dropdown: 1, calendar_theme: "dark"}} data={%{label: "Calendar example 2"}} />
    Additional Comments:
      - for "date_format", "time_format" and "alt_format", see below for more information on all available options.
      - config.calendar_mode can take only one of these values: "single", "multiple", "range". If there is no match, it will default to "single".
      - config.clock_type can take only one of these values: 12, 24. If there is no match, it will default to "24"
      - config.weeK_start can take only one of these values: 0, 1, 2, 3, 4, 5, 6. If there is no match, it will default to 1.
      - options.allow_input can take only one of these values: 0, 1. If there is no match, it will default to 0.
      - options.enable_seconds can take only one of these values: 0, 1. If there is no match, it will default to 0.
      - options.short_month_name can take only one of these values: 0, 1. If there is no match, it will default to 0.
      - options.month_dropdown can take only one of these values: 0, 1. If there is no match, it will default to 1.
      - options.calendar_theme can take only one of these values: "light", "dark", "material_blue", "material_green", "material_red", "material_orange", "airbnb", "confetti". If there is no match, it will default to "light".
      - all date and time options have to follow the date and time formats set for the specific component. Then can also be set to "today".
    Date formatting:
      - d - Day of the month, 2 digits with leading zeros	( 01 to 31 )
      - D	- A textual representation of a day	( Mon - Sun )
      - l (lowercase 'L') -	A full textual representation of the day of the week ( Monday - Sunday )
      - j	- Day of the month without leading zeros	( 1 to 31 )
      - J	- Day of the month without leading zeros and ordinal suffix	( 1st, 2nd, to 31st )
      - w	- Numeric representation of the day of the week	( 0 -for Sunday through 6 - for Saturday )
      - W	- Numeric representation of the week (	0 - first week of the year through 52 - last week of the year )
      - F	- A full textual representation of a month	( January - December )
      - m	- Numeric representation of a month, with leading zero	( 01 - 12 )
      - n	- Numeric representation of a month, without leading zeros	( 1 - 12 )
      - M	- A short textual representation of a month	( Jan - Dec )
      - U	- The number of seconds since the Unix Epoch	( 1413704993 )
      - y	- A two digit representation of a year (	99 or 03 )
      - Y	- A full numeric representation of a year, 4 digits	( 1999 or 2003 )
      - Z	- ISO Date format	( 2017-03-04T01:23:43.000Z )
    Time formatting:
      - H	- Hours (24 hours)	( 00 to 23 )
      - h	- Hours	( 1 to 12 )
      - G	Hours - 2 digits with leading zeros	( 1 to 12 )
      - i	- Minutes	( 00 to 59 )
      - S	- Seconds, 2 digits	( 00 to 59 )
      - s	- Seconds	( 0, 1 to 59 )
      - K	- AM/PM	( AM or PM )
  """

  use AppWeb, :html
  use AppWeb, :verified_routes

  attr :class, :string, required: true
  attr :config, :map, default: %{date_format: "d-m-Y", time_format: "H:i", alt_format: "F j, Y", calendar_mode: "single", clock_type: 24, week_start: 1, inline_calendar: 0}
  attr :options, :map, default: %{default_date: "", min_date: "", max_date: "", disabled_dates: "", dates_conjunction: "", min_time: "", max_time: "", allow_input: 0, enable_seconds: 0, minute_increment: 5, short_month_name: 0, months_to_show: 1, month_dropdown: 1, calendar_theme: "light"}
  attr :data, :map, default: %{label: ""}

  def calendar(assigns) do
    ~H"""
    <style>
      .flatpickr-current-month .numInputWrapper{ position: absolute; top: 0.5rem; right: 0.5rem; }
    </style>
    <.input type="text" phx-hook="Calendar" label={@data.label} name={@data.label} value="" class={@class} id={"input-" <> @class} data-inline-calendar={@config.inline_calendar} data-date-format={@config.date_format} data-time-format={@config.time_format} data-alt-format={@config.alt_format} data-default-date={@options.default_date} data-min-date={@options.min_date} data-max-date={@options.max_date} data-disabled-dates={@options.disabled_dates} data-week-start={if Enum.member?([0, 1, 2, 3, 4, 5, 6], @config.week_start), do: @config.week_start, else: 1} data-calendar-mode={if Enum.member?(["single", "multiple", "range"], @config.calendar_mode), do: @config.calendar_mode, else: "single"} data-dates-conjunction={@options.dates_conjunction} data-clock-type={if Enum.member?([12, 24], @config.clock_type), do: @config.clock_type, else: 24} data-min-time={@options.min_time} data-max-time={@options.max_time} data-allow-input={if Enum.member?([0, 1], @options.allow_input), do: @options.allow_input, else: 0} data-enable-seconds={if Enum.member?([0, 1], @options.enable_seconds), do: @options.enable_seconds, else: 0} data-minute-increment={if is_number(@options.minute_increment), do: @options.minute_increment, else: 5} data-short-month-name={if Enum.member?([0, 1], @options.short_month_name), do: @options.short_month_name, else: 0} data-show-months={if is_number(@options.months_to_show), do: @options.months_to_show, else: 1} data-month-selection-type={if Enum.member?([0, 1], @options.month_dropdown), do: @options.month_dropdown, else: 1} data-calendar-theme={if Enum.member?(["light", "dark", "material_blue", "material_green", "material_red", "material_orange", "airbnb", "confetti"], @options.calendar_theme), do: @options.calendar_theme,  else: "light"} />
    """
  end
end

# TODO:
# 1) Inline calendar doesn't work with themes
#     attr :inline_calendar, :string, default: "0", values: ["0", "1"]
#     inline_calendar="0" <- Defines if the calendar should be automatically opened or not. It takes 0=false and 1=true
#     data-inline-calendar={@inline_calendar}
# 2) Week numbers don't visualize
#     attr :week_numbers, :string, default: "0", values: ["0", "1"]
#     week_numbers="0" <- Defines if the week numbers should be displayed inside the calendar. It takes 0=false and 1=true
#     data-week-numbers={@week_numbers}
