var auditEvent = function(eventEl) {
    // get date from event element
    var block = $(eventEl).text().replace("am", "").replace("pm", "").trim();
    if (eventEl[eventEl.length()-2]=="p") {block=+12};
    console.log(block);
    // convert to moment object at the time in question
    var time = moment(moment(), "L").set("hour", block).set("minute", 0).set("second", 0);
    console.log(time);
    
    // remove any old classes from element
    $(eventEl).removeClass("past present future");
  
     // apply new class 
     if (moment().isAfter(time)) {
      $(eventEl).addClass("past");
      } 
      else if (moment().isBefore(time)) {
        $(eventEl).addClass("future");
      } 
      else if (Math.abs(moment().diff(time, "hours")) = 0) {
        $(eventEl).addClass("present");
      }
  };
  
  setInterval(function () {
    $(".hour").each(function(index, el) {
      auditEvent(el);
    });
  }, 1000);