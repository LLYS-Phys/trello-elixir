/*..................................................... Learnings ............................................................
1) After a dynamic Hook writing from the components we need to cut and paste this at the end of the file;
2) We need to subtract to the translation half of the "width" and "height" to center the div on our mouse;
............................................................................................................................*/
import external from './external';

let Hooks = {};
/* .................................... stateless_comp_svg_animations_clock1 .............................................. */
Hooks.SvgAnimationsClock1 = {
  mounted() {
    const thisEl = document.querySelector("#SvgAnimationsClock1");
    setInterval(function () {
      function clockMov(el, deg) {
        el.setAttribute("transform", "rotate(" + deg + " 500 500)"); /*(6)*/
      }
      var d = new Date();
      clockMov(thisEl.querySelector(".sec"), 6 * d.getSeconds());
      clockMov(thisEl.querySelector(".min"), 6 * d.getMinutes());
      clockMov(thisEl.querySelector(".hour"), 30 * (d.getHours() % 12) + d.getMinutes() / 2);
    }, 1000);
  },
};
/* .................................... stateless_comp_svg_animations_clock2 .............................................. */
Hooks.SvgAnimationsClock2 = {
  mounted() {
    const thisEl = document.querySelector("#SvgAnimationsClock2");
    setInterval(function () {
      function clockMov(el, deg) {
        el.setAttribute("transform", "rotate(" + deg + " 500 500)"); /*(6)*/
      }
      var d = new Date();
      clockMov(thisEl.querySelector(".sec"), 6 * d.getSeconds());
      clockMov(thisEl.querySelector(".min"), 6 * d.getMinutes());
      clockMov(thisEl.querySelector(".hour"), 30 * (d.getHours() % 12) + d.getMinutes() / 2);
    }, 1000);
  },
};
/* .................................... stateless_comp_svg_animations_signature ........................................... */
Hooks.SvgAnimationSignature = {
  mounted() {
    const elMain = document.querySelector("#SvgAnimationSignature");
    setTimeout(function () {
      elMain.querySelector(".path1").classList.add("name1");
      elMain.querySelector(".path2").classList.add("name2");
      elMain.querySelector(".path3").classList.add("paint");
      elMain.style.visibility = "visible"; //(8)
    }, 1000);
  },
};

/* .................................... stateless_comp_updating_rotating_textone .......................................... */
Hooks.UpdatingRotatingTextone = {
  mounted() {
    const elem = document.querySelector("#UpdatingRotatingTextone");
    rotatingTextAnimone = function (textId, firstRound) {
      Object.assign(elem.querySelector(".rotText.item" + textId).style, { bottom: "-75%", opacity: "0" });
      if (textId < 2) {
        if (textId == 1) {
          if (firstRound == "no") {
            elem.querySelector(".rotText.item2").style.bottom = "75%";
          } else {
          }
        } else {
          elem.querySelector(".rotText.item" + (textId - 1)).style.bottom = "75%";
        }
        Object.assign(elem.querySelector(".rotText.item" + (textId + 1)).style, { bottom: "0", opacity: "1" });
        var textId = textId + 1;
      } else {
        elem.querySelector(".rotText.item1").style.bottom = "75%";
        Object.assign(elem.querySelector(".rotText.item1").style, { bottom: "0", opacity: "1" });
        var textId = 1;
        var firstRound = "no";
      }
      setTimeout(function () {
        rotatingTextAnimone(textId, firstRound);
      }, 3000);
    };
    setTimeout(function () {
      rotatingTextAnimone(1, "yes");
    }, 3000);
  },
};
/* .................................... stateless_comp_updating_rotating_texttwo .......................................... */
Hooks.UpdatingRotatingTexttwo = {
  mounted() {
    const elem = document.querySelector("#UpdatingRotatingTexttwo");
    rotatingTextAnimtwo = function (textId, firstRound) {
      Object.assign(elem.querySelector(".rotText.item" + textId).style, { bottom: "-75%", opacity: "0" });
      if (textId < 2) {
        if (textId == 1) {
          if (firstRound == "no") {
            elem.querySelector(".rotText.item2").style.bottom = "75%";
          } else {
          }
        } else {
          elem.querySelector(".rotText.item" + (textId - 1)).style.bottom = "75%";
        }
        Object.assign(elem.querySelector(".rotText.item" + (textId + 1)).style, { bottom: "0", opacity: "1" });
        var textId = textId + 1;
      } else {
        elem.querySelector(".rotText.item1").style.bottom = "75%";
        Object.assign(elem.querySelector(".rotText.item1").style, { bottom: "0", opacity: "1" });
        var textId = 1;
        var firstRound = "no";
      }
      setTimeout(function () {
        rotatingTextAnimtwo(textId, firstRound);
      }, 3000);
    };
    setTimeout(function () {
      rotatingTextAnimtwo(1, "yes");
    }, 3000);
  },
};

/* ..................................................... tooltip hook ........................................................... */
function tooltip(prop) {
  if (prop.el.children[0].dataset.position == "top"){
    Array.from(prop.el.children).forEach((elem) => {
      elem.querySelector(".tooltip-text").style.bottom = parseFloat(window.getComputedStyle(prop.el.children[0]).getPropertyValue('font-size').replace("px", ""))*prop.el.children[0].dataset.hoverZoom*1.25 + "px"
      elem.style.cssText += "--top: 100%; --rotate: 0deg;";
    })
  }
  else if (prop.el.children[0].dataset.position == "bottom"){
    Array.from(prop.el.children).forEach((elem) => {
      elem.querySelector(".tooltip-text").style.top = parseFloat(window.getComputedStyle(prop.el.children[0]).getPropertyValue('font-size').replace("px", ""))*prop.el.children[0].dataset.hoverZoom*1.25 + "px"
      elem.style.cssText += "--bottom: 100%; --rotate: 180deg;";
    })
  }
}

Hooks.Tooltip = {
  mounted() {
    tooltip(this)
  },
  updated() {
    tooltip(this)
  }
}

/* .................................................... calendar hook .......................................................... */
function calendar(prop) {
  const trelloPrompt = document.querySelector("#trello-calendar-prompt")
  const trelloCalendar = document.querySelector("#input-trello-due-date")
  if (trelloPrompt) trelloPrompt.addEventListener("click", () => main())
  if (trelloCalendar) trelloCalendar.addEventListener("change", () => { setTimeout(() => { main() }, 100); })
  main()
  function main() {
    let stylesheet
    flatpickr(prop.el, {
      dateFormat: prop.el.dataset.timeFormat == "" || prop.el.dataset.dateFormat == ""
                      ? prop.el.dataset.timeFormat == "" ? prop.el.dataset.dateFormat : prop.el.dataset.timeFormat
                      : prop.el.dataset.dateFormat + " " + prop.el.dataset.timeFormat,
      enableTime: prop.el.dataset.timeFormat == "" ? false : true,
      altInput: prop.el.dataset.altFormat == "" ? false : true,
      altFormat: prop.el.dataset.altFormat == "" ? null : prop.el.dataset.altFormat,
      defaultDate: prop.el.dataset.defaultDate,
      minDate: prop.el.dataset.minDate,
      maxDate: prop.el.dataset.maxDate,
      disable: prop.el.dataset.disabledDates.includes(",") ? prop.el.dataset.disabledDates.split(",") : [prop.el.dataset.disabledDates],
      locale: { firstDayOfWeek: prop.el.dataset.weekStart },
      mode: prop.el.dataset.calendarMode == "month" ? "single" : prop.el.dataset.calendarMode,
      conjunction: prop.el.dataset.datesConjunction,
      noCalendar: prop.el.dataset.dateFormat == "" ? true : false,
      time_24hr: prop.el.dataset.clockType == "24" ? true : false,
      minTime: prop.el.dataset.minTime,
      maxTime: prop.el.dataset.maxTime,
      inline: prop.el.dataset.inlineCalendar == "1" ? true : false,
      weekNumbers: prop.el.dataset.weekNumbers == "1" ? true : false,
      allowInput: prop.el.dataset.allowInput == "1" ? true : false,
      enableSeconds: prop.el.dataset.enableSeconds == "1" ? true : false,
      minuteIncrement: prop.el.dataset.minuteIncrement,
      position: "auto",
      shorthandCurrentMonth: prop.el.dataset.shortMonthName == "1" ? true : false,
      showMonths: prop.el.dataset.showMonths,
      monthSelectorType: prop.el.dataset.monthSelectionType == "1" ? "dropdown" : "static",
      theme: prop.el.dataset.calendarTheme,
      onOpen: function(){
          stylesheet = document.createElement("link")
          stylesheet.type = "text/css"
          stylesheet.rel = "stylesheet"
          stylesheet.href = "/assets/flatpickr_themes/" + prop.el.dataset.calendarTheme + ".css"
          document.head.appendChild(stylesheet)
      },
      onClose: function(){
          document.head.removeChild(stylesheet)
      },
    })
    prop.el.nextElementSibling.style.cursor = "pointer"
  }
}

Hooks.Calendar = {
  mounted() {
    calendar(this)
  }
}

/* ..................................................... charts hook ........................................................... */
function charts(prop){
  let chart 
  classes_for_check = ["userDashboardPurchasesByUser", "userDashboardPurchasesByCategory", "userDashboardPurchasesByProduct"]
  if (classes_for_check.some(class_for_check => prop.el.parentElement.parentElement.parentElement.parentElement.classList.contains(class_for_check))) {
    prop.el.parentElement.parentElement.parentElement.parentElement.querySelectorAll(".select_from_sidebar").forEach((item) => {
      item.addEventListener("click", () => {
        chart.destroy()
        setTimeout(() => { chart_generate() }, 500);
      })
    })
  }
  chart_generate()
  function chart_generate() {
    const ctx = prop.el
    let dataset = []
    let dataLabels
    let pointColors
    let pointBorderColors
    let label
    let dataPoints = []
    if (["bar", "line", "doughnut", "pie", "polarArea", "radar", "mixed"].includes(ctx.dataset.type)){
        let multiDataPoints = []
        let multiPointColors = []
        let multiPointBorderColors = []
        if (ctx.dataset.points.replace(" ", "").includes("],[")){
            dataPoints = ctx.dataset.points.slice(2, ctx.dataset.points.length-2).split("],[")
            dataPoints.forEach((arr) => { multiDataPoints.push(arr.replace(/\[|]/g, "").split(",")) })
        }
        else{ dataPoints = ctx.dataset.points.replace(/\[|]/g, "").split(",") }
        dataLabels = ctx.dataset.labels.replace(/\[|"|]/g, "").split(",")
        if (ctx.dataset.pointsColor.includes("],[")){
            ctx.dataset.pointsColor.includes(")")
                ? pointColors = ctx.dataset.pointsColor.slice(2, ctx.dataset.pointsColor.length-2).replace(/\[|"|]/g, "").replaceAll("),", ")$").split("$")
                : pointColors = ctx.dataset.pointsColor.slice(2, ctx.dataset.pointsColor.length-2).replace(/\[|"|]/g, "").split(",")
            pointColors.forEach((point) => {
                point.includes(")")
                    ? multiPointColors.push(point.replace(/\[|"|]/g, "").replaceAll("),", ")$").split("$"))
                    : multiPointColors.push(point.replace(/\[|"|]/g, "").split(","))
            })
        }
        else{
            ctx.dataset.pointsColor.includes(")")
                ? pointColors = ctx.dataset.pointsColor.replace(/\[|"|]/g, "").replaceAll("),", ")$").split("$")
                : pointColors = ctx.dataset.pointsColor.replace(/\[|"|]/g, "").split(",")
        }
        if (ctx.dataset.pointsBorderColor.includes("],[")){
            ctx.dataset.pointsBorderColor.includes(")")
                ? pointBorderColors = ctx.dataset.pointsBorderColor.slice(2, ctx.dataset.pointsBorderColor.length-2).replace(/\[|"|]/g, "").replaceAll("),", ")$").split("$")
                : pointBorderColors = ctx.dataset.pointsBorderColor.slice(2, ctx.dataset.pointsBorderColor.length-2).replace(/\[|"|]/g, "").split(",")
                pointBorderColors.forEach((point) => {
                point.includes(")")
                    ? multiPointBorderColors.push(point.replace(/\[|"|]/g, "").replaceAll("),", ")$").split("$"))
                    : multiPointBorderColors.push(point.replace(/\[|"|]/g, "").split(","))
            })
        }
        else{
            ctx.dataset.pointsBorderColor.includes(")")
                ? pointBorderColors = ctx.dataset.pointsBorderColor.replace(/\[|"|]/g, "").replaceAll("),", ")$").split("$")
                : pointBorderColors = ctx.dataset.pointsBorderColor.replace(/\[|"|]/g, "").split(",")
        }

        if (ctx.dataset.dataLabel.includes("\",\"")){
            label = ctx.dataset.dataLabel.slice(2, ctx.dataset.dataLabel.length-2).split("\",\"")
        }
        else{
            label = ctx.dataset.dataLabel.replaceAll("\"", "").replace("[", "").replace("]", "")
        }

        if (multiDataPoints.length == 0){
            dataset = [{
                data: dataPoints,
                type: ctx.dataset.type == "mixed" ? ctx.dataset.chartMixedType.replace(/\[|"|]/g, "").split(",")[i] : "",
                label: label,
                backgroundColor: pointColors,
                borderColor: pointBorderColors,
                borderWidth: ctx.dataset.pointsBorderWidth
            }]
        }
        else{
            for (let i = 0; i < multiDataPoints.length; i++){
                dataset.push(
                    {
                        data: multiDataPoints[i],
                        type: ctx.dataset.type == "mixed" ? ctx.dataset.chartMixedType.replace(/\[|"|]/g, "").split(",")[i] : "",
                        label: label.length == 0 ? label : label[i],
                        backgroundColor: multiPointColors.length == 0 ? pointColors : multiPointColors[i],
                        borderColor: multiPointBorderColors.length == 0 ? pointBorderColors : multiPointBorderColors[i],
                        borderWidth: ctx.dataset.pointsBorderWidth
                    }
                )
            }
        }
    }
    else if (["scatter", "bubble"].includes(ctx.dataset.type)){
        let x_coords = ctx.dataset.xCoords.replace(/\[|]/g, "").split(",")
        let y_coords = ctx.dataset.yCoords.replace(/\[|]/g, "").split(",")
        let dot_radius = ctx.dataset.dotRadius.replace(/\[|]/g, "").split(",")
        for (let i=0; i < x_coords.length; i++){
            ctx.dataset.type == "bubble" 
                ? dataPoints.push({x: parseFloat(x_coords[i]), y: parseFloat(y_coords[i]), r: parseFloat(dot_radius[i])}) 
                : dataPoints.push({x: parseFloat(x_coords[i]), y: parseFloat(y_coords[i])})
        }
        ctx.dataset.pointsColor.includes(")")
            ? pointColors = ctx.dataset.pointsColor.replace(/\[|"|]/g, "").replaceAll("),", ")$").split("$")
            : pointColors = ctx.dataset.pointsColor.replace(/\[|"|]/g, "").split(",")
        ctx.dataset.pointsBorderColor.includes(")")
            ? pointBorderColors = ctx.dataset.pointsBorderColor.replace(/\[|"|]/g, "").replaceAll("),", ")$").split("$")
            : pointBorderColors = ctx.dataset.pointsBorderColor.replace(/\[|"|]/g, "").split(",")
        dataset = [{
            data: dataPoints,
            label: ctx.dataset.dataLabel.replaceAll("\"", "").replace("[", "").replace("]", ""),
            backgroundColor: pointColors,
            borderColor: pointBorderColors,
            borderWidth: ctx.dataset.pointsBorderWidth
        }]
    }
    const data = {
        type: ctx.dataset.type,
        data: { labels: dataLabels, datasets: dataset },
        options: {
            indexAxis: ctx.dataset.mainAxis,
            scales: {
                x: { position: ctx.dataset.xScalePosition },
                y: { position: ctx.dataset.yScalePosition }
            }
        }
    };
    chart = new Chart(ctx, data);
  }
}

Hooks.Charts = {
  mounted() {
    charts(this)
  }
}

/* ................................................... image carousel hook ......................................................... */
function imageCarousel(prop){
  const maxImages = parseInt(prop.el.dataset.maxImages)
  const allImages = prop.el.querySelectorAll(".additional-image-container")
  let currentPhotoId
  for (let i=0; i<allImages.length; i++){ if (i>=maxImages) allImages[i].classList.add("hidden") }
  // Mutation observer
  const config = { attributes: true, childList: false, subtree: false };
  const callback = () => {
    currentPhotoId = parseInt(prop.el.dataset.currentPhotoId)
    for (let i=0; i<allImages.length; i++){
      currentPhotoId==i ? allImages[i].classList.add("active") : allImages[i].classList.remove("active")
      if (currentPhotoId >= maxImages){
        if (i<=currentPhotoId-maxImages){ allImages[i].classList.add("hidden") }
        else if (i>currentPhotoId){ allImages[i].classList.add("hidden") }
        else{ allImages[i].classList.remove("hidden") }
      }
      else{ if (i>=maxImages) allImages[i].classList.add("hidden") }
    }
  }
  const observer = new MutationObserver(callback);
  observer.observe(prop.el, config);
}

Hooks.ImageCarousel = {
  mounted() {
    imageCarousel(this)
  }
}

/* ................................................... product collapse hook ......................................................... */
function productCollapse(){
  document.querySelectorAll(".collapse-button").forEach((button) => {
    button.addEventListener("click", function() {
      let innerInfo = this.nextElementSibling
      innerInfo.style.maxHeight ? innerInfo.style.maxHeight = null : innerInfo.style.maxHeight = innerInfo.scrollHeight*3 + "px"
    })
  })
}

Hooks.ProductCollapse = {
  mounted() {
    productCollapse()
  }
}

/* ................................................ contact form validation hook ...................................................... */
function contactFormValidation(prop){
  validatable_inputs = []
  for (let i = 0; i < prop.el.querySelectorAll("input").length; i++){ if (prop.el.querySelectorAll("input")[i].dataset.pattern != "" || prop.el.querySelectorAll("input")[i].required) validatable_inputs.push(prop.el.querySelectorAll("input")[i]) }
  for (let i = 0; i < prop.el.querySelectorAll("textarea").length; i++){ if (prop.el.querySelectorAll("textarea")[i].dataset.pattern != "" || prop.el.querySelectorAll("textarea")[i].required) validatable_inputs.push(prop.el.querySelectorAll("textarea")[i]) }
  for (let i = 0; i < prop.el.querySelectorAll("select").length; i++){ if (prop.el.querySelectorAll("select")[i].dataset.pattern != "" || prop.el.querySelectorAll("select")[i].required) validatable_inputs.push(prop.el.querySelectorAll("select")[i]) }
  prop.el.querySelector("button").addEventListener("mouseover", validate)
  validatable_inputs.forEach((input) => {  input.addEventListener("focus", () => { validate_this(input) }) })
  function validate() { validatable_inputs.forEach((input) => reusable_validation(input)) }
  function validate_this(input) { input.addEventListener("blur", () => reusable_validation(input)) }
  function reusable_validation(input){
    if (!(new RegExp(input.dataset.pattern).test(input.value)) || input.value == ""){
      input.classList.add("error")
      input.addEventListener("keydown", () => { if ((new RegExp(input.dataset.pattern).test(input.value)) || input.value == "") input.classList.remove("error") })
    }
    else{ input.classList.remove("error") }
  }
}

Hooks.ContactFormValidation = {
  mounted() {
    contactFormValidation(this)
  }
}
/* ............................................ cursor hook demo_one ........................................................ */
Hooks.Cursordemo_one = {
  mounted() {
    const cursor = document.querySelector(".dotCursor.demo_one");
    const positionElement = (e)=> {
      const mouseY = e.clientY;
      const mouseX = e.clientX;
      cursor.style.transform = `translate(${mouseX-cursor.offsetWidth/2}px, ${mouseY-cursor.offsetHeight/2}px)`;              // 2
      const elem = document.elementFromPoint(mouseX, mouseY);

      const rgb = getComputedStyle(elem).backgroundColor;
      cursor.style.filter = "invert(100%)";

      if (elem.tagName == "A") { Object.assign(cursor.style,{width:"4rem", height:"4rem"}) }
      else { Object.assign(cursor.style,{width:"2rem", height:"2rem"}) }

      /* TODOs
      Make the change in size dependent on that options being selected on the component (use data-attributes);
      Make the elements where the change in size happens dependent on that options being selected on the component (use data-attributes);
      */
    }
    let cursorComponent = document.querySelector(".stateless_comp.cursor.demo_one");
    cursorComponent.addEventListener('mousemove', positionElement);
    cursorComponent.addEventListener('mouseenter', function() {cursor.style.display = "flex"});
    cursorComponent.addEventListener('mouseleave', function() {cursor.style.display = "none"});
  }
}
/* ............................................ cursor hook demo_two ........................................................ */
Hooks.Cursordemo_two = {
  mounted() {
    const cursor = document.querySelector(".dotCursor.demo_two");
    const positionElement = (e)=> {
      const mouseY = e.clientY;
      const mouseX = e.clientX;
      cursor.style.transform = `translate(${mouseX-cursor.offsetWidth/2}px, ${mouseY-cursor.offsetHeight/2}px)`;              // 2
      const elem = document.elementFromPoint(mouseX, mouseY);

      const rgb = getComputedStyle(elem).backgroundColor;
      cursor.style.filter = "invert(100%)";

      if (elem.tagName == "A") { Object.assign(cursor.style,{width:"4rem", height:"4rem"}) }
      else { Object.assign(cursor.style,{width:"2rem", height:"2rem"}) }

      /* TODOs
      Make the change in size dependent on that options being selected on the component (use data-attributes);
      Make the elements where the change in size happens dependent on that options being selected on the component (use data-attributes);
      */
    }
    let cursorComponent = document.querySelector(".stateless_comp.cursor.demo_two");
    cursorComponent.addEventListener('mousemove', positionElement);
    cursorComponent.addEventListener('mouseenter', function() {cursor.style.display = "flex"});
    cursorComponent.addEventListener('mouseleave', function() {cursor.style.display = "none"});
  }
}
/* ............................................ cursor hook demo_two ........................................................ */
Hooks.Cursordemo_three = {
  mounted() {
    const cursor = document.querySelector(".dotCursor.demo_three");
    const positionElement = (e)=> {
      const mouseY = e.clientY;
      const mouseX = e.clientX;
      cursor.style.transform = `translate(${mouseX-cursor.offsetWidth/2}px, ${mouseY-cursor.offsetHeight/2}px)`;              // 2
      const elem = document.elementFromPoint(mouseX, mouseY);

      const rgb = getComputedStyle(elem).backgroundColor;
      cursor.style.backgroundColor = rgb;
      cursor.style.filter = "invert(100%)";
// TODO - make the filter customizable on component instantiation;

      if (elem.tagName == "A") { Object.assign(cursor.style,{width:"4rem", height:"4rem"}) }
      else { Object.assign(cursor.style,{width:"2rem", height:"2rem"}) }

      /* TODOs
      Make the change in size dependent on that options being selected on the component (use data-attributes);
      Make the elements where the change in size happens dependent on that options being selected on the component (use data-attributes);
      */
    }
    let cursorComponent = document.querySelector(".stateless_comp.cursor.demo_three");
    cursorComponent.addEventListener('mousemove', positionElement);
    cursorComponent.addEventListener('mouseenter', function() {cursor.style.display = "flex"});
    cursorComponent.addEventListener('mouseleave', function() {cursor.style.display = "none"});
  }
}
/* ............................................ cursor hook demo_four ........................................................ */
Hooks.Cursordemo_four = {
  mounted() {
    const cursor = document.querySelector(".dotCursor.demo_four");
    const positionElement = (e)=> {
      const mouseY = e.clientY;
      const mouseX = e.clientX;
      cursor.style.transform = `translate(${mouseX-cursor.offsetWidth/2}px, ${mouseY-cursor.offsetHeight/2}px)`;              // 2
      const elem = document.elementFromPoint(mouseX, mouseY);

      const rgb = getComputedStyle(elem).backgroundColor;
      cursor.style.filter = "invert(100%)";

      if (elem.tagName == "A") { Object.assign(cursor.style,{width:"4rem", height:"4rem"}) }
      else { Object.assign(cursor.style,{width:"2rem", height:"2rem"}) }

      /* TODOs
      Make the change in size dependent on that options being selected on the component (use data-attributes);
      Make the elements where the change in size happens dependent on that options being selected on the component (use data-attributes);
      */
    }
    let cursorComponent = document.querySelector(".stateless_comp.cursor.demo_four");
    cursorComponent.addEventListener('mousemove', positionElement);
    cursorComponent.addEventListener('mouseenter', function() {cursor.style.display = "flex"});
    cursorComponent.addEventListener('mouseleave', function() {cursor.style.display = "none"});
  }
}

/* ................................................ countdown load hook ...................................................... */
function countdownLoad(prop){
  if (!document.cookie.includes("countdown_shown=1")){
    prop.el.querySelector(".countdown").style.display = "flex"
    globFuncs.cookie.set("countdown_shown", 1, parseInt(prop.el.dataset.cookieTime), prop.el.dataset.cookieUnits)
    document.body.style.overflow = "hidden"
    new Countdown(prop.el, parseInt(prop.el.dataset.seconds)).start()
    prop.el.querySelector(".skip-button").addEventListener("click", () => { new Countdown(prop.el, 0).start() })
    function Countdown(elem, seconds) {
      let that = {}
      that.elem = elem.querySelector(".time")
      that.seconds = seconds
      that.totalTime = seconds * 100
      that.usedTime = 0
      that.startTime = new Date().getTime()
      that.timer = null
      that.count = function() {
        that.usedTime = Math.floor((new Date().getTime() - that.startTime) / 10)
        let tt = that.totalTime - that.usedTime
        if (tt <= 0) {
          that.elem.innerHTML = '00:00:00.000'
          zoomToMain(elem)
          clearInterval(that.timer)
        } else {
          let mi = Math.floor(tt / (60 * 100))
          let ss = Math.floor((tt - mi * 360 * 100) / 100)
          let ms = tt - (Math.floor(tt / 100) * 100).toFixed(3)
          that.elem.innerHTML = "00:" + that.fillZero(mi) + ":" + that.fillZero(ss) + "." + that.fillZero(ms) + Math.floor(Math.random() * 10).toString()
        }
      };
      that.start = function() { if(!that.timer) that.timer = setInterval(that.count, 1) };
      that.fillZero = function(num) { return num < 10 ? '0' + num : num };
      return that
    }
    function zoomToMain(elem) {
      elem.querySelector(".countdown").classList.remove("active")
      document.body.style.overflowY = "unset"
      setTimeout(() => {
        elem.querySelector(".countdown").style.display = "none"
        document.body.style.overflow = "unset"
      }, elem.dataset.animationSeconds*500);
    }
  }
}

Hooks.CountdownLoad = {
  mounted() {
    countdownLoad(this)
  }
}


/* ................................................ livechat scrollToBottom hook ...................................................... */


Hooks.ScrollToBottom = {
  mounted() {
    this.scrollToBottom()
  },
  updated() {
    this.scrollToBottom()
  },
  scrollToBottom() {
    let chatContainer = this.el
    chatContainer.scrollTop = chatContainer.scrollHeight
  }
}



/* ................................................ cookie banner hook ...................................................... */
function cookieBanner(prop){
  const checkboxes = prop.el.querySelectorAll(".cookie-banner-checkbox")
  const accept_buttons = [ prop.el.querySelector(".accept-button"), prop.el.querySelector(".modal-accept-button") ]
  const decline_buttons = [ prop.el.querySelector(".decline-button"), prop.el.querySelector(".modal-decline-button") ]
  checkboxes.forEach((checkbox) => { checkbox.addEventListener("click", () => { checkboxes.forEach((el) => { if (el.name == checkbox.name) el.checked = checkbox.checked }) }) })
  accept_buttons.forEach((button) => button.addEventListener("click", () => control_checkboxes("accept")))
  decline_buttons.forEach((button) => button.addEventListener("click", () => control_checkboxes("decline")))
  function control_checkboxes(action) { checkboxes.forEach((checkbox) => { checkbox.checked = (action == "accept" ? true : false) }) }
}

Hooks.CookieBanner = {
  mounted() {
    cookieBanner(this)
  }
}

/* ................................................ cookie banner hook ...................................................... */
function headerScroll(prop){
  window.addEventListener("scroll", () => {
    if(window.scrollY==0){
      prop.el.querySelector("header").style.height = "6rem"
      prop.el.querySelector("section").style.marginTop = "7.5rem"
    }
    else{
      prop.el.querySelector("header").style.height = "3rem"
      prop.el.querySelector("section").style.marginTop = "4.5rem"
    }
  })
}

Hooks.HeaderScroll = {
  mounted() {
    headerScroll(this)
  }
}

/* ................................................ changing color hook ...................................................... */
function changeColorInterval(prop){
  prop.el.addEventListener("click", () => {
    prop.el.parentElement.querySelector(".payment-popup").classList.remove("hidden")
    prop.el.parentElement.querySelector(".payment-processing-loader1").style.animationDelay = "-0.75s"
    prop.el.parentElement.querySelector(".payment-processing-loader2").style.animationDelay = "-0.5s"
    const colorInterval = setInterval(() => {
      prop.el.parentElement.querySelector(".payment-processing-loader1").style.backgroundColor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")"
      prop.el.parentElement.querySelector(".payment-processing-loader2").style.backgroundColor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")"
      prop.el.parentElement.querySelector(".payment-processing-loader3").style.backgroundColor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")"
    },1500)
    setTimeout(() => {
      clearInterval(colorInterval)
      prop.el.parentElement.querySelector(".payment-processing").classList.add("hidden")
      prop.el.parentElement.querySelector(".payment-complete").classList.remove("hidden")
    }, 10000)
  })
}

Hooks.ChangeColorInterval = {
  mounted() {
    changeColorInterval(this)
  }
}

/* ............................................ check banner cookies hook .................................................. */
function checkBannersCookies(prop) {
  if (!document.cookie.includes(prop.el.dataset.cookieName)) prop.el.parentElement.classList.remove("hidden")
}

Hooks.CheckBannersCookies = {
  mounted () {
    checkBannersCookies(this)
  }
}

/* ................................................ underscore hook ...................................................... */
function underscoreHook(prop){
  prop.el.dataset.effectAction == "hover", prop.el.addEventListener("mouseover", () => keepUnderline())
  prop.el.dataset.effectAction == "load", prop.el.querySelector("svg").classList.add("loading")

  function keepUnderline() {
    if (!prop.el.querySelector("svg").classList.contains("active")){
      prop.el.querySelector("svg").classList.add("hovered")
      setTimeout(() => {
        prop.el.querySelector("svg").classList.remove("hovered")
        prop.el.querySelector("svg").classList.add("active")
      }, prop.el.dataset.effectDuration*1000);
    }
  }
}

Hooks.UnderscoreHook = {
  mounted() {
    underscoreHook(this)
  }
}

/* ................................................ drag & drop hook ...................................................... */
function dragAndDrop(prop) {
  let placeholder, draggedElement, labelsChanged, labels, fromListId
  let boardCards = prop.el.querySelectorAll(".board-card");
  prop.el.addEventListener("cards_update", () => { 
    setTimeout(async () => {
      const boardCardsUpdated = await fetchAllElements(".board-card", boardCards)
      boardCards = boardCardsUpdated
      main()
    }, 500);
  })
  function createPlaceholder() {
    if (!draggedElement) return;
    placeholder = Object.assign(document.createElement("div"), { className: "placeholder-card" });
    Object.assign(placeholder.style, { height: `${draggedElement.offsetHeight}px`, width: `${draggedElement.offsetWidth}px` });  
  }
  main()
  function main() {
    prop.el.querySelector(".add-list-button").addEventListener("click", () => { setTimeout(() => { prop.el.querySelector(".add-list-input").focus() }, 100); })
    boardCards.forEach((boardCard) => {
      boardCard.addEventListener("click", async () => {
        labelsChanged = true
        const detailedCard = await fetchElement(`.detailed-card-${boardCard.dataset.cardId}`);
        if (labelsChanged) {
          if (detailedCard) {
            const commentInput = detailedCard.querySelector(".comment-input");
            const commentEdits = detailedCard.querySelectorAll(".comment-edit")
            resizeTextArea(commentInput)
            commentEdits.forEach((commentEdit) => resizeTextArea(commentEdit))
            function resizeTextArea(comment) {
              if (comment == commentInput) detailedCard.querySelector(".add-comment-button").addEventListener("click", () => { setTimeout(() => { comment.focus() }, 100); })
              const resizeTextarea = () => { requestAnimationFrame(resizeTextarea); comment.style.height = 'auto'; comment.style.height = `${comment.scrollHeight}px`; };
              comment.addEventListener('input', resizeTextarea);
              comment.parentElement.querySelectorAll("button").forEach((button) => { button.addEventListener("click", () => { if (comment == commentInput) comment.value = ""; resizeTextarea(); }); });
              resizeTextarea();
            }
          }
          labelsChanged = false
          labelsRecursion()
          function labelsRecursion() {
            labels = detailedCard.querySelectorAll(".label-item-choose")
            labels.forEach((label) => label.addEventListener("click", () => { 
              const labelId = Number(label.parentElement.dataset.labelId);
              const currentLabels = JSON.parse(boardCard.dataset.labels);
              boardCard.dataset.labels = JSON.stringify(currentLabels.includes(labelId) ? currentLabels.filter(id => id !== labelId) : [...currentLabels, labelId]);
              updateCardLabels(boardCard, labelId)
              update_text_fields()
            }));
          }
          prop.el.addEventListener("reset_labels_form", () => {
            setTimeout(async () => {
              const form = await fetchElement(".new-label")
              form.querySelector('input[name="new-label"]').value = '';
              form.querySelector('input[name="new-label-color"]').value = 'rgb(0,0,0)';
              labelsRecursion()
            }, 500);
          })
          detailedCard.querySelector(".card-title-edit").addEventListener("keydown", (event) => { if (event.keyCode == 13) event.preventDefault() }) 
          function updateCardData(selector, dataAttribute) {
            const element = detailedCard.querySelector(selector);
            element.addEventListener("blur", () => {
              boardCard.dataset[dataAttribute] = dataAttribute == "cardDescription" 
                ? /^(<br\s*\/?>|[\s\u00A0\r\n])*$/i.test(element.innerHTML) ? "" : element.innerHTML 
                : element.textContent
              dataAttribute == "cardDescription" ? updateCardDescription(element.innerHTML) : updateCardName(element.textContent)
            });
          }
          updateCardData(".card-title-edit", "cardName");
          updateCardData(".card-description-edit", "cardDescription");
          checklistsRecursion()
          function checklistsRecursion() {
            setTimeout(() => {
              detailedCard.querySelectorAll(".checklist-title-edit").forEach((checklist_title) => {
                const checklistId = checklist_title.dataset.checklistId;
                const element = detailedCard.querySelector(`.checklist-title-edit-${checklistId}`);
                element.addEventListener("blur", () => { updateChecklistName(checklistId, element.textContent); });
              });
            }, 500);
          }
          detailedCard.querySelector(".add-new-checklist-button").addEventListener("click", () => checklistsRecursion())
          const dueDateModal = detailedCard.querySelector(".add-due-date")
          const calendar = detailedCard.querySelector("#input-trello-due-date")
          let completionCheck
          calendar.addEventListener("change", async () => {
            boardCard.dataset.dueDate = calendar.value
            updateDueDate(calendar.value)
            dueDateCheckbox()
            update_text_fields()
          })
          dueDateCheckbox()
          dueDateModal.querySelector(".clear-due-date-button").addEventListener("click", () => {
            dueDateModal.querySelector("#input-trello-due-date").value = dueDateModal.querySelector("#input-trello-due-date").nextElementSibling.value = "";
            completionCheck.checked = boardCard.dataset.completed = false
            completionCheck = null
            calendar.dispatchEvent(new Event("change"))
          })
          async function dueDateCheckbox() { 
            completionCheck = await fetchElement(".due-date-completion")
            completionCheck.addEventListener("click", () => { boardCard.dataset.completed = completionCheck.checked; updateDueDateCheck(completionCheck.checked); })
          }
          function update_text_fields() {
            setTimeout(() => {
              updateCardData(".card-title-edit", "cardName");
              updateCardData(".card-description-edit", "cardDescription");
              detailedCard.querySelectorAll(".checklist-title-edit").forEach((checklist_title) => { updateCardData(`.checklist-title-edit-${checklist_title.dataset.checklistId}`, "checklistName") })
            }, 500);
          }
        }
      });
      boardCard.addEventListener("dragstart", (event) => { draggedElement = event.target; createPlaceholder(); draggedElement.style.margin = `-${draggedElement.offsetHeight}px`; draggedElement.classList.add("dragged"); fromListId = event.target.parentElement.parentElement.dataset.listId; });
      boardCard.addEventListener("dragend", (event) => {
        if (draggedElement) { draggedElement.style.margin = "0.5rem 0"; draggedElement.classList.remove("dragged"); }
        if (placeholder) placeholder.remove();
        placeholder = draggedElement = null;
        updateCardsInLists(event.target)
      });
    });
    prop.el.querySelectorAll(".board-cards-container").forEach((container) => {
      container.parentElement.querySelectorAll(".add-card-button").forEach((button)=> button.addEventListener("click", () => { setTimeout(() => { container.scrollTop = container.scrollHeight; container.querySelector(".add-card-input").focus() }, 100); }))
      container.parentElement.querySelector(".create-card").addEventListener("click", () => { setTimeout(() => { container.scrollTop = container.scrollHeight }, 100); })
      container.addEventListener("dragenter", (event) => { event.preventDefault(); if (!placeholder) createPlaceholder(); });
      container.addEventListener("dragover", (event) => {
        event.preventDefault();
        const targetCard = event.target.closest(".board-card");
        if (targetCard) { const rect = targetCard.getBoundingClientRect(); const offset = event.clientY - rect.top; offset > rect.height / 2 ? targetCard.after(placeholder) : targetCard.before(placeholder); } 
        else if (!container.contains(placeholder)) { container.appendChild(placeholder); }
      });
      container.addEventListener("dragleave", (event) => { if (!container.contains(event.relatedTarget) && event.relatedTarget !== placeholder && placeholder) removePlaceholder() });
      container.addEventListener("drop", (event) => {
        event.preventDefault();
        if (placeholder && draggedElement) {
          container.insertBefore(draggedElement, placeholder);
          removePlaceholder()
          boardCards = prop.el.querySelectorAll(".board-card");
          updateCardIds();
          updateCardOrders()
          updateCardList()
        }
      });
      function removePlaceholder() { placeholder.remove(); placeholder = null; }
    });
  }
  function fetchElement(selector) {
    return new Promise((resolve, reject) => {
      const element = document.querySelector(selector);
      if (element) { resolve(element); } 
      else { setTimeout(() => { fetchElement(selector) .then(resolve) .catch(reject); }, 500); }
    });
  }
  function fetchAllElements(selector, oldElements) {
    return new Promise((resolve, reject) => {
      const elements = document.querySelectorAll(selector);
      if (oldElements == elements) { setTimeout(() => { fetchElement(selector) .then(resolve) .catch(reject); }, 500); } 
      else { resolve(elements); }
    });
  }
  function updateCardName(newName) { prop.pushEvent("update_card_title", {newName}) }
  function updateCardDescription(newDescription) { prop.pushEvent("update_card_description", {newDescription}) }
  function updateChecklistName(checklistId, newName) { prop.pushEvent("update_checklist_name", {checklistId, newName}) }
  function updateCardLabels(element, labelId) { const cardId = element.dataset.cardId; prop.pushEvent("update_labels_in_card", {cardId, labelId}) }
  function updateDueDate(dueDate) { prop.pushEvent("update_due_date_in_card", {dueDate}) }
  function updateDueDateCheck(check) { prop.pushEvent("update_due_date_completion_in_card", {check}) }
  function updateCardsInLists(element) {
    const movedCardId = element.dataset.cardId
    const movedCardPosition = element.dataset.order
    const targetListId = element.parentElement.parentElement.dataset.listId
    prop.pushEvent("update_card_in_lists", { movedCardId, targetListId, movedCardPosition, fromListId })
    document.querySelectorAll(".board-card").forEach((card) => {
      const cardId = card.dataset.cardId
      const cardOrder = card.dataset.order
      prop.pushEvent("update_card_order", { cardId, cardOrder })
    })
  }
  function updateCardIds() { prop.el.querySelectorAll(".board-list").forEach((listEl) => { const listName = listEl.querySelector(".heading h4").textContent.trim().replace(/\s/g, "_"); listEl.querySelectorAll(".board-card").forEach((cardEl, index) => { cardEl.id = `${listName}-${index + 1}`; }); }); }
  function updateCardOrders() { prop.el.querySelectorAll(".board-list").forEach((listEl) => { listEl.querySelectorAll(".board-card").forEach((cardEl, index) => { cardEl.dataset.order = index + 1; }); }); }
  function updateCardList() { prop.el.querySelectorAll(".board-list").forEach((listEl) => { listEl.querySelectorAll(".board-card").forEach((cardEl) => { cardEl.dataset.listId = listEl.dataset.listId; }); }); }
}

// Hook to initialize the drag and drop functionality
Hooks.DragAndDrop = {
  mounted() {
    dragAndDrop(this);
  }
};

/* ................................................ cards visibility toggle hook ...................................................... */
function cardsVisibilityHook(prop) {
  prop.el.addEventListener("click", () => globFuncs.cookie.set("cards_filtered_visibility", prop.el.checked, 1, "m") )
}

Hooks.CardsVisibilityHook = {
  mounted() {
    cardsVisibilityHook(this)
  }
}

export default Hooks; //(1)