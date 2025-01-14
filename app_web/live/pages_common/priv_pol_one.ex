defmodule AppWeb.PrivPolOne do
  @moduledoc """
  Privacy Policy Page with the following comments:
  1) Define the Title of the page;
  2) Every page can be the landing page for the application and thus should validate if the CSS and JS files being used are
     the latests, ie, if they are updated (as set in the "root layout" comment (5));
  """
  use AppWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok, socket
          |> assign(page_title: gettext("Privacy policy"))                                                                             #(1)
          |> assign(static_changed?: static_changed?(socket))}                                                                #(2)
  end

  def render(assigns) do
    ~H"""
    <div class="page privPol main" style="padding: 0 5%; color: white; background-image: url('/images/chalkboard_s.jpg'); margin-top: -1.5rem; padding-bottom: 3rem;">
      <h1 class="width100">{gettext("Privacy policy")} </h1>
      <h3>{gettext("User submitted data")}</h3>
      <p class="justify" style="line-height: 2.2rem;">
      {gettext("The information sent through our webpage when a user registers, shops or by using forms, will be kept strictly
        confidential and will be treated according to the prevailing national and european law, as it applies to information
        privacy.")} <br> {gettext("By sending this information you are agreeing, freely and informed, its incorporation in our database and
        its use accordingly to these privacy policy, as well as with its transfer to any of our branches or associates as long
        as it is treated according to to same rules.")} <br>
        {gettext("If you want to update your personal information please contact us by
        using any of the available tools in this website. Be aware that our organization may keep this information for
        statistical or historical purposes.")}

      </p>
      <h3 style=""> {gettext("Automatically captured data")} </h3>
      <p class="justify" style="line-height: 2.2rem;">
      {gettext(" We analyse and save some information about our website visitors to help us to improve and develop our products and
        services. The user is never identified in this information. Information that is analysed may contain, for example,
        the IP address of the visiting user, the type of browser that is being used to access our website, and the webpages
        that are being visited.<br>The information that we obtain help us to register how many visitors are new or not, as
        well as to internally analyse visited webpages to better understand user navigation habits. We use this information
        only for continuous improvement of our website, our products and services.")}

      </p>
      <h3 style="">{gettext("Legal warning")}</h3>
      <p class="justify" style="line-height: 2.2rem;">
      {gettext("  Information in this website in not fully detailed and may contain some imprecision or suffer from not being completely
        up to date in some way, and thus shall not be taken as granting any kind of warranty of any kind, neither implicit nor
        explicit, without prejudice of any legal terms that may apply and product and service information 'as is'. Any part of
        the information provided in this website may be subject to changes or updates at any moment without previous notice.")}
        <br>
       {gettext("Our organization cannot be hold responsable in any case by damages of any kind due to the navigation of our
        website or to the information it contains, even that you have been warned about those potential damages.")}
      </p>
      <h3 style=""> {gettext("Cookies & localStorage")}</h3>
      <p class="justify" style="line-height: 2.2rem;">
      {gettext("Cookies and localStorage are small files that keep data in the browser that persist between website navigation.
        These data contain specific information about previous visits, saving information only related to your preferences or
        previous actions, thus excluding any personal data.")}
        <br>
        {gettext("We use cookies and localStorage to recognize repeated visits
        to our website and to facilitate internet navigation (for example, closing warning or help balloons, language
        preferences,...)")}
      </p>
      <h5 style="">{gettext("Can I block cookies & localStorage?")}</h5>
      <p class="justify" style="line-height: 2.2rem;">
      {gettext("Most browsers use cookies and localStorage automatically by default, but users can refuse cookies, or selectively
        accept some data to be kept in the LocalStorage or erase saved data by adjusting browser preferences. If you don't
        want us to use cookies and/or localStorage you can define those options in your browser or you may configure it to
        warn you when a website tries to save cookies or store data in your localStorage. Nevertheless, if you turn off
        cookies and/or localstorage there will be some website functionalities that won't be available and some pages may
        misbehave and/or don't show up properly.")}

      </p>
    </div>
    """
  end

end
