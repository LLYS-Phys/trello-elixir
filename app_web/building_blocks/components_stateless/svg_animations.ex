#....................................................... Description .........................................................
#								                .......................... Purpose ...........................
# To define different animations based on svg elements;
#								                ..................... Render the component ...................
# 1) You have to "import AppWeb.StatelessCompSvgAnimations" to the "layouts.ex" file that renders the layouts;
# 2) Copy the component signature you want to use and pass the mandatory attributes plus the optional ones according to its
#    signature (for example):
#			                          <.stateless_comp_svg_animations_clock />
#                               ...................... Notes & learnings .....................
# 3) We need to import all these components as we use some of them in our pages;
# 4) We're writing all the js into the "hooks.js" file at runtime time, so when we want to do it we need, before, to
#    comment 2 lines in the "dev.exs" file, otherwise you enter a loop of writing the file;
# 5) The class match the animation class name we have in the "updating.css" file as these loading effects depend on the use
#    of the animations defined in there and are controlled by the use of specific classes;
# 6) "transform" is an attribute in SVG (changed using "setAttribute()"method, not "style.transform");
# 7) "forward" so that the final state of the animation remains;
# 8) This must come after adding the classes so that there's no blinking;
# 9) To keep the animation always scaling for different sizes of the svg we need to have this dependency: the size we have in
#    the animation for the box-shadow needs to be either half of this or exactly the same;
#.............................................................................................................................
defmodule AppWeb.StatelessCompSvgAnimations do
  use AppWeb, :html

  #  import AppWeb.BuildingBlocks                                                                                              #(3)
#............................................ stateless_comp_svg_animations_clock ............................................
  attr :id, :string, required: true
  attr :attribs, :global, default: %{viewbox: "0 0 1000 1000"}
  attr :class, :string, default: nil
  attr :style, :map, default: %{main: "", circle: "", hour: "", min: "", sec: ""}

  def stateless_comp_svg_animations_clock(assigns) do
    js =  """
          /* .................................... stateless_comp_svg_animations_clock#{assigns.id} .............................................. */
          Hooks.SvgAnimationsClock#{assigns.id} = {
            mounted() {
            const thisEl = document.querySelector('#SvgAnimationsClock#{assigns.id}');
            setInterval(function() {
              function clockMov(el, deg) {
                el.setAttribute('transform', 'rotate('+ deg +' 500 500)')														                          //(6)
              };
              var d = new Date();
              clockMov(thisEl.querySelector('.sec'), 6*d.getSeconds());
              clockMov(thisEl.querySelector('.min'), 6*d.getMinutes());
              clockMov(thisEl.querySelector('.hour'), 30*(d.getHours()%12) + d.getMinutes()/2);
            }, 1000)
            }
          }
          """
    ~H"""
    <%#                                                                                                                       #(4)
      file_path = Path.expand("assets/js", File.cwd!)
      file = Path.join(file_path, "hooks.js")
      File.write(file, js, [:append])
    %>
    <style>
      .svgAnimations.clock { width: 10rem; margin: 2rem;
        & .circle { stroke: blue; stroke-linecap: square; stroke-width: 42; fill: none; }
        & .hour { stroke: red; stroke-width: 40; }
        & .min { stroke: green; stroke-width: 35; }
        & .sec { stroke: violet; stroke-width: 20; }
      }
    </style>
    <svg  id={"SvgAnimationsClock#{@id}"} phx-hook={"SvgAnimationsClock#{@id}"}
          class={"stateless_comp main svgAnimations clock #{@class}"} {@attribs} style={@style.main}>                         <%#(5)%>
      <path class="circle" style={@style.circle}
    d="M978,500c0,263.99-214.01,478-478,478s-478-214.01-478-478,214.01-478,478-478,478,214.01,478,478zm-888.93,237.25,
      20.179-11.65m779.16-449.85l22.517-13m-648.18,648.18,11.65-20.18m449.85-779.16l13-22.517m-711.75,410.93h23.305m899.7,
      0h26m-885.43-237.25,20.179,11.65m779.16,449.85,22.517,13m-648.18-648.18l11.652,20.183m449.85,779.16,13,22.517m-237.25-885.43v23.305m0,
      899.7,0,26"/>
	    <path class="hour" style={@style.hour} d="M500,500,500,236"/>
	    <path class="min" style={@style.min} d="M500,500,500,120"/>
	    <path class="sec" style={@style.sec} d="M500,500,500,90"/>
    </svg>
    """
  end
#......................................... stateless_comp_svg_animations_signature ...........................................
  attr :attribs, :global, default: %{viewbox: "0 15 410 50"}
  attr :class, :string, default: nil
  attr :style, :map, default: %{main: "", path1: "", path2: "", path3: ""}

  def stateless_comp_svg_animations_signature(assigns) do
    js =  """
          /* .................................... stateless_comp_svg_animations_signature ........................................... */
          Hooks.SvgAnimationSignature = {
            mounted() {
              const elMain = document.querySelector("#SvgAnimationSignature");
              setTimeout(function(){
                elMain.querySelector(".path1").classList.add("name1");
                elMain.querySelector(".path2").classList.add("name2");
                elMain.querySelector(".path3").classList.add("paint");
                elMain.style.visibility="visible";                                                                            //(8)
              }, 1000)
            }
          }
          """
    ~H"""
    <%#                                                                                                                       #(4)
      file_path = Path.expand("assets/js", File.cwd!)
      file = Path.join(file_path, "hooks.js")
      File.write(file, js, [:append])
    %>
    <style>
      .svgAnimations.signature { width: 10rem; height: 5rem; visibility: hidden;
        & path { fill: none; stroke: black; stroke-width: 0.5rem; stroke-linecap: butt; stroke-linejoin: miter; stroke-opacity: 1; }
        & .name1 { stroke-dasharray: 900; animation: svgAnimationsSignatureName1 1.5s linear forwards; } //(7)
        & .name2 { stroke-dasharray: 725; animation: svgAnimationsSignatureName2 3s linear forwards; }
        & .paint { stroke-dasharray: 25; animation: svgAnimationsSignatureDot 3.25s linear forwards; }
      }
      @keyframes svgAnimationsSignatureName1 {
        0% { stroke-dashoffset: 900 }
        100% { stroke-dashoffset: 0 }
      }
      @keyframes svgAnimationsSignatureName2 {
        0% { stroke-dashoffset: 725 }
        50% { stroke-dashoffset: 725 }
        100% { stroke-dashoffset: 0 }
      }
      @keyframes svgAnimationsSignatureDot {
        0% { stroke-dashoffset: 25 }
        95% { stroke-dashoffset: 25 }
        100% { stroke-dashoffset: 0 }
      }
    </style>
    <svg  id="SvgAnimationSignature" phx-hook="SvgAnimationSignature"
          class={"stateless_comp main svgAnimations signature #{@class}"} {@attribs} style={@style.main}>                     <%#(5)%>
      <g>
        <path class="path1" style={@style.path1}
          d=" m 11.12311,43.622031 c -5.3942811,-7.48429 -0.234172,-17.478539 5.320314,-23.507405 3.027078,-6.574093
            16.930731,-5.082709 15.124343,4.737748 0.428378,8.375555 0.200715,13.851858 -4.203844,21.50718
            -3.649215,7.586612 -8.892692,14.241348 -13.195228,21.448744 7.076166,4.425395 15.011183,-5.474608
            21.046279,-9.114977 7.648508,-5.939907 13.9956,-13.647263 18.376465,-22.239221 -1.115807,-6.153038
            -9.389329,0.625147 -4.075121,4.471853 4.063144,5.613424 4.898269,14.164904 1.208733,20.162724
            -1.820277,4.568382 -12.324816,4.053146 -11.809802,6.29114 6.902692,2.846362 15.965915,2.434801
            22.220247,-1.550266 4.500086,-6.925438 8.443964,-20.528283 17.075336,-24.0033 5.747466,-1.473207
            13.77729,-3.491554 16.719383,0.2956 -9.396943,-3.358807 -22.0659,0.125639 -25.305691,10.435498
            -2.344498,5.524804 -5.363786,15.745216 4.188896,15.292864 8.101676,0.74125 8.156263,-8.535878
            12.510774,-12.899472 2.098008,-1.955692 3.272009,-7.968073 1.190042,-2.333501 -3.835067,6.000001
            -1.594554,16.577347 7.121831,12.28916 5.031959,-4.415703 7.964043,-10.810767 12.665353,-15.654904
            4.84332,-7.898744 9.62448,-16.12591 10.98994,-25.424349 0.96937,-4.668225 4.82814,-16.0672382
            -3.18708,-9.855459 -4.83442,5.281179 -5.19498,13.027997 -8.90978,19.060444 -2.52557,9.681618
            -3.97814,19.975467 -2.55279,29.939614 4.10805,6.100119 12.82844,0.145387 17.56885,-2.747594
            4.40939,-2.642351 7.42465,-14.889005 -1.04938,-11.523459 -5.68052,9.086267 7.72193,7.858468
            13.02141,6.736837 7.41035,0.557625 14.85966,-2.261821 16.39619,-10.304916 -0.14468,-8.023852
            -14.24281,-4.555321 -17.29066,0.463214 -2.93992,6.522001 -2.90237,18.499563 5.92763,20.212956
            10.30682,1.397194 19.30079,-6.468818 23.73376,-15.127346 5.49687,-9.424578 12.71673,-17.923806
            16.31323,-28.359826 4.08087,-5.395701 -0.93474,-16.0005917 -5.95808,-7.082346 -8.7281,11.737961
            -11.21576,26.586017 -13.30889,40.685091 -2.05063,9.342241 5.26677,15.283353 10.21694,9.078383
            6.91269,-4.431981 3.53673,-14.88214 10.5208,-19.147048 5.13567,-2.106293 16.455,-5.156489 21.44906,-2.989358
            -8.78405,2.369239 -16.89854,-0.780898 -23.49838,7.619579 -5.53494,4.201772 -7.55934,17.275685 2.46277,16.07863
            9.30319,0.246431 15.74294,-8.529191 17.86195,-16.701234 -0.66322,3.135319 -12.99944,16.732293 -1.13905,18.71509
            7.02796,2.18485 9.82924,-5.679492 12.68954,-9.383986"/>
        <path class="path2" style={@style.path2}
          d="m 265.61987,25.38013 c -0.44443,-3.47752 7.1615,-12.326679 -0.7971,-9.193705 -6.71729,1.719008
          -12.59228,5.254268 -19.03212,7.705589 -5.30086,1.978504 -11.20287,4.467856 -13.8388,7.334316 -2.53948,6.672709
          6.53892,9.820292 11.2505,10.037549 0.6686,1.002355 4.13752,0.161315 0.39071,1.703675 -4.10143,3.368083
          -7.47933,3.550418 -11.62062,7.972692 -2.74047,3.948101 -6.81916,11.749611 -0.48692,15.128196 5.52864,4.014794
          18.73871,0.440216 24.59964,-3.501835 5.21797,-5.479071 6.83768,-4.463493 11.63886,-10.266093 1.51082,-2.071668
          4.05223,-12.669515 2.46568,-4.769904 -0.95047,6.506809 -6.03844,12.220236 -4.69867,18.891128 4.76096,2.572176
          14.8741,1.653901 17.48168,-3.122597 -0.51909,-7.491548 1.56891,-14.8087 4.8934,-21.456808 -0.29017,3.582211
          -3.26106,9.929246 -3.77135,13.19156 -2.09948,4.431833 -3.02524,12.907915 4.53156,10.325835 6.24653,-0.271843
          11.96493,-2.664746 14.10694,-8.39735 1.20767,-5.769551 3.53496,-11.282294 5.1205,-16.982477 -1.18951,6.690535
          -4.0614,13.393295 -7.05095,19.420541 -1.21059,2.526451 -4.18583,11.307855 -3.59329,3.531893 0.41489,-5.297468
          3.57777,-11.283053 8.24584,-14.173234 3.78158,-3.628972 8.96883,-5.00853 13.91176,-6.605412 2.94095,-2.070893
          9.13005,-4.164581 6.35262,1.982607 -2.31253,5.357743 -6.88913,10.083866 -9.61212,14.65273 -5.89193,6.504641
          8.06798,6.458918 11.35676,3.074905 5.36045,-2.580678 6.48688,-8.527116 8.17331,-13.719911 1.44829,-2.568171
          3.5191,-9.177739 0.83951,-2.696455 -2.61903,6.534731 -4.6549,14.075344 -2.3333,20.991843 5.65002,1.44958
          11.56793,-1.626925 13.56999,-6.834022 2.2981,-5.663668 6.3702,-10.853621 11.10881,-14.908282 3.88154,-2.150427
          12.10288,-6.486537 11.79935,1.516541 -0.63317,-6.166556 -10.70095,-5.236145 -13.7306,-1.09069 -3.75041,4.410165
          -8.441,9.667023 -7.58136,15.939225 2.15483,5.459209 10.40634,5.484529 14.89966,2.557205 4.67611,-2.772056
          13.74271,-5.344982 18.9107,-5.488679 10.05468,-0.06053 16.03248,-17.282425 8.24441,-17.845423 -7.31445,-0.935444
          -12.04823,5.536386 -13.7039,11.714368 -3.97074,5.120186 -3.42299,13.259033 3.53559,15.257055 5.51849,2.026082
          9.90137,-4.918117 15.66449,-5.861669"/>
        <path class="path3" style={@style.path3}
          d="m 348.37581,29.829374 c -0.61424,-0.842472 -1.19033,-1.711769 -1.76737,-2.579875 0.0775,0.509074
          -0.48106,0.880708 -0.94345,0.835053 -0.49803,0.240256 -0.31737,-0.771655 -0.78591,-0.484509 -0.11503,0.120047
          -0.56417,0.02087 -0.29267,-0.05426 -0.77218,0.136651 -2.10356,0.05746 -2.90793,0.05298 0.68168,-0.33076
          -0.22419,0.212204 -0.51786,0.570166 -0.24302,0.208677 -0.49237,-0.535553 -0.3629,-0.08172 0.0117,0.468521
          0.0141,0.940931 0.0297,1.40478 0.0143,0.185585 -0.14038,0.208377 -0.0337,0.04184 0.0917,0.223792 -0.0176,0.61331
          0.0258,0.90068 -0.0113,0.338134 -0.17901,-0.0039 0.0175,-0.06069 -0.0942,0.309508 -0.15587,0.845789 0.34505,0.825209
          0.27875,-0.180393 0.63597,-0.05182 0.51746,0.339008 -0.18786,0.310127 0.13313,0.949347 0.44598,0.542856
          0.0101,-0.241332 -0.0983,-0.773914 0.32612,-0.559594 0.28363,0.158758 0.003,0.659109 0.4498,0.580394
          0.33763,-0.11946 0.66625,-0.04803 0.83695,0.269761 0.41549,0.21642 0.56568,-0.446627 0.97123,-0.391567
          1.07326,0.04659 2.14464,0.08101 3.14192,0.09161 0.40903,-0.675307 0.31071,-1.501694 0.50422,-2.242089 z"/>
      </g>
    </svg>
    """
  end
#........................................... stateless_comp_svg_animations_waiting ...........................................
  attr :attribs, :global, default: %{viewbox: "0 0 120 206"}
  attr :class, :string, required: true
  attr :style, :map, default: %{main: "", middle: "", outer: ""}
  attr :special, :map, default: %{height: 5, fullColor: "blue", emptyColor: "white"}                                                                                  #(9)

  def stateless_comp_svg_animations_waiting(assigns) do
  ~H"""
  <style>
    .svgAnimations.waiting.<%= @class %> { height: <%= @special.height %>rem; animation: svgAnimationsWaiting<%= @class %> 1.5s linear infinite; }
    .svgAnimations.waiting .middle { fill: grey; }
    .svgAnimations.waiting .outer { fill: white; }
    @keyframes svgAnimationsWaiting<%= @class %> {
      0%{ transform:rotate(0deg); box-shadow: inset <%= @special.emptyColor %> 0 0 0 0,
                                                          inset <%= @special.fullColor %> 0 <%= @special.height/2 %>rem 0 0 }
      80%{ transform:rotate(0deg); box-shadow: inset <%= @special.emptyColor %> 0 <%= @special.height/2 %>rem 0 0,
                                                            inset <%= @special.fullColor %> 0 <%= @special.height %>rem 0 0 }
      100%{ transform:rotate(180deg); box-shadow: inset <%= @special.emptyColor %> 0 <%= @special.height/2 %>rem 0 0,
                                                          inset <%= @special.fullColor %> 0 <%= @special.height/2 %>rem 0 0 }
    }
  </style>
  <svg class={"stateless_comp main svgAnimations waiting #{@class}"} {@attribs} style={@style.main}>                          <%#(5)%>
    <path class="middle" style={@style.middle}
      d="M120 0H0v206h120V0zM77.1 133.2C87.5 140.9 92 145 92 152.6V178H28v-25.4c0-7.6 4.5-11.7 14.9-19.4 6-4.5 13-9.6 17.1-17
        4.1 7.4 11.1 12.6 17.1 17zM60 89.7c-4.1-7.3-11.1-12.5-17.1-17C32.5 65.1 28 61 28 53.4V28h64v25.4c0 7.6-4.5 11.7-14.9
        19.4-6 4.4-13 9.6-17.1 16.9z"/>
    <path class="outer" style={@style.outer}
      d="M93.7 95.3c10.5-7.7 26.3-19.4 26.3-41.9V0H0v53.4c0 22.5 15.8 34.2 26.3 41.9 3 2.2 7.9 5.8 9 7.7-1.1 1.9-6 5.5-9
          7.7C15.8 118.4 0 130.1 0 152.6V206h120v-53.4c0-22.5-15.8-34.2-26.3-41.9-3-2.2-7.9-5.8-9-7.7 1.1-2 6-5.5
          9-7.7zM70.6 103c0 18 35.4 21.8 35.4 49.6V192H14v-39.4c0-27.9 35.4-31.6 35.4-49.6S14 81.2 14 53.4V14h92v39.4C106
          81.2 70.6 85 70.6 103z"/>
  </svg>
  """
  end
end
