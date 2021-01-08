var tasks = JSON.parse(localStorage.getItem("tasks"));
var loadTasks = function() {

  // if nothing in localStorage, create a new object to track all tasks
  if (!tasks== true) {
   console.log("No events previously saved.");
   tasks =[];
  }
  else {
    // delete yesterday's events
    for( var i = 0; i < tasks.length; i++){ 
      if   (Math.abs(moment().diff(tasks[i].date, "day")) !== 0) {
        tasks.splice(i, 1); 
      }
    };
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    // add the events from localStorage to the screen page
    $.each(tasks, function(taski, task) {
      createTasks(taski,task);
    });
  };

};

//create events from localStorage
var createTasks = function(taski,task) {
  myId = '#'+task.index ;
  $(myId).find(".description").find("span").replaceWith($("<span>").text(task.description));
};

//save events to local Storage
var saveTask = function(event) {

    // update the tasks variable with the new value
    var myId = '#'+event.currentTarget.closest(".time-block").id;

    if(tasks){
      for( var i = 0; i < tasks.length; i++){ 
        
          if ( tasks[i].index == myId.replace("#", "")) { 
      
              tasks.splice(i, 1); 
          }
      
      };
    };
  
    tasks.push({
      index: myId.replace("#", ""),
      description: $(myId).find(".description").find("span").text(),
      date : moment(moment(), "L")
    });
    

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// update the date
var auditDay = function (){
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

  // event description was clicked
$(".time-block").on("click", "p",function() {
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

    // replace textarea element with a new p
    var textInput = $("<p>").addClass("description")
    var span=$("<span>").text(text);
    textInput.append(span);
    $(this).replaceWith(textInput);
  
  });

  // save button was clicked
  $(".time-block").on("click", "button",function(event) {
    saveTask(event);
  });

// load the events from local storage
loadTasks();

// Call update date and status frequently
setInterval(function () {
  auditDay();
  $(".time-block ").each(function(index, el) {
    auditEvent(el);
  });
}, 1000);
