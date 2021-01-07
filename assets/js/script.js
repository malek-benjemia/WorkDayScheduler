var tasks = {};

// update the date
var auditDay = function (){
    console.log($("#currentDay").text() );
    $("#currentDay").text( moment().format("MMM Do YY"))  ;
};

//Update the status : past present future
var auditEvent = function(eventEl) {
    // get date from event element
    var block = $(eventEl).find(".hour").text().replace("am", "").replace("pm", "").trim();
    if (eventEl[eventEl.length-2]=="p") {block=+12};
    console.log(block);
    // convert to moment object at the time in question
    var time = moment(moment(), "L").set("hour", block).set("minute", 0).set("second", 0);
    console.log(time);
    
    // remove any old classes from element
    $(eventEl).removeClass("past present future");
  
     // apply new class 
     if (moment().isAfter(time)) {
      $(eventEl).find(".description").addClass("past");
      } 
      else if (moment().isBefore(time)) {
        $(eventEl).find(".description").addClass("future");
      } 
      else if (Math.abs(moment().diff(time, "hours")) = 0) {
        $(eventEl).find(".description").addClass("present");
      }
};

// Call update date and status frequently
setInterval(function () {
    auditDay();
    $(".time-block ").each(function(index, el) {
      auditEvent(el);
    });
  }, 6*1000);


  // event description was clicked
$(".description").on("click", function() {
  // get current text of p element
  var text = $(this)
    .text()
    .trim();

  // replace p element with a new textarea
  var textInput = $("<textarea>").addClass("description").val(text);
  console.log(textInput.text());
  $(this).replaceWith(textInput);

});

  
// event description was changed
$(".time-block").on("change", ".description", function() {
    console.log(this).text();
     // get current text of textarea element
    var text = $(this)
    .text()
    .trim();
  
    var index = $(this).closest(".time-block").attr("id")
    //tasks[index].description = text;
    
    // replace textarea element with a new p
    var textInput = $("<p>").addClass("description").val(text);
    $(this).replaceWith(textInput);
  
    // Pass task's <li> element into auditTask() to check new due date
    //auditEvent($(this).closest(".time-block"));
  });
  
  
