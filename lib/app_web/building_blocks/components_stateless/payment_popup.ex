defmodule AppWeb.PaymentPopup do
  @moduledoc """
    Calling the component:
      <.payment_popup class="payment"/>
  """

  use AppWeb, :html
  use AppWeb, :verified_routes
  import AppWeb.StatelessCompUpdating

  attr :class, :string, required: true

  def payment_popup(assigns) do
    ~H"""
    <style>
      .stateless_comp.main.payment-popup { width: 100vw; height: 100vh; top: 0; left: 0; backdrop-filter: blur(0.3125rem);
        & .payment-popup-modal { width: 80%; height: 70%; background-color: white; border: 0.125rem solid black; top: 10rem; border-radius: 1rem; 
          & .hidden{ display: none; }
        }
      }
    </style>
    <.focus_wrap id={"payment-popup-#{@class}"} class={"stateless_comp main payment-popup fixed hidden"}>
      <div class="payment-popup-modal fixed">
        <div class="payment-processing">
          <.stateless_comp_updating_circleScaleOut class="payment-processing-loader1" style={%{main: "background-color: red; margin: 1rem;"}}/>
          <.stateless_comp_updating_circleScaleOut class="payment-processing-loader2" style={%{main: "background-color: green; margin: 1rem;"}}/>
          <.stateless_comp_updating_circleScaleOut class="payment-processing-loader3" style={%{main: "background-color: blue; margin: 1rem;"}}/>
          <h2 class="width100" style="margin: 2rem;">Processing payment!</h2>
        </div>
        <div class="payment-complete hidden">
          <svg viewBox="0 0 40 40" width="6rem" height="6rem"><path fill="#bae0bd" d="M1.707 22.199L4.486 19.42 13.362 28.297 35.514 6.145 38.293 8.924 13.362 33.855z"/><path fill="#5e9c76" d="M35.514,6.852l2.072,2.072L13.363,33.148L2.414,22.199l2.072-2.072l8.169,8.169l0.707,0.707 l0.707-0.707L35.514,6.852 M35.514,5.438L13.363,27.59l-8.876-8.876L1,22.199l12.363,12.363L39,8.924L35.514,5.438L35.514,5.438z"/></svg>
          <h2 class="width100" style="margin: 2rem;">Payment complete!</h2>
        </div>
      </div>
    </.focus_wrap>
    """
  end
end
