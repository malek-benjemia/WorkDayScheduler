var tasks = {};

// update the date
var auditDay = function (){
    console.log($("#currentDay").text() );
    $("#currentDay").text( moment().format("MMM Do YY"))  ;
};

//Update the status : past present future
var auditEvent = function(eventEl) {
    // get date from event element
    var block = $(eventEl).find(".hour").text().trim();

    if (block[block.length-2]=="p" && block !== "12 pm") {block=parseInt($(eventEl).find(".hour").text().replace("am", "").replace("pm", "").trim())+12}
    else {block=parseInt($(eventEl).find(".hour").text().replace("am", "").replace("pm", "").trim())};
    
    // convert to moment object at the time in question
    var time = moment(moment(), "L").set("hour", block).set("minute", 0).set("second", 0);
   
    // remove any old classes from element
    $(eventEl).removeClass("past present future");
  
     // apply new class 
      if (moment().isBefore(time)) {
      $(eventEl).find(".description").addClass("future");
      } 
      else if (Math.abs(moment().diff(time, "hours")) == 0) {
      $(eventEl).find(".description").addClass("present");
      }
      else if (moment().isAfter(time)) {
      $(eventEl).find(".description").addClass("past");
      } ;
     
      
};

// Call update date and status frequently
setInterval(function () {
    auditDay();
    $(".time-block ").each(function(index, el) {
      auditEvent(el);
    });
  }, 1000);


  // event description was clicked
$(".time-block").on("click", "p",function() {
  console.log("ok");
  // get current text of p element
  var text = $(this)
    .text()
    .trim();
    
  // replace p element with a new textarea
  var textInput = $("<textarea>").addClass("description").text(text);
  $(this).replaceWith(textInput);

});

  
// event description was changed
$(".time-block").on("blur", "textarea", function() {

     // get current text of textarea element
    var text = $(this)
    .val()
    .trim();

    var index = $(this).closest(".time-block").attr("id")
    //tasks[index].description = text;
    
    // replace textarea element with a new p
    var textInput = $("<p>").addClass("description")
    var span=$("<span>").text(text);
    textInput.append(span);
    $(this).replaceWith(textInput);
  
    // Pass task's <li> element into auditTask() to check new due date
    //auditEvent($(this).closest(".time-block"));
  });
  
  
