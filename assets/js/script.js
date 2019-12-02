/*
Author:Yassine Ben Alaya
yben-alaya@spartan.northampton.edu
*/
var taskArray=[];
function renderTasksList(pos){
    var $elem = $("<div id='"+pos+"' class='task "+((pos%2)?"odd":"even")+"'><table><tr><td class='taskName' id='taskLabel"+pos+"'>"+taskArray[pos]+"</td><td ><a onclick='removeTask(this)' name='"+pos+"' id='removeTaskButton"+pos+"' class='button is-black is-inverted is-outlined removeTask'><span>-</span></a></td></tr></table>"+"</div>");
    $elem.appendTo($("#listArea"));
}
function loadTasksFromStorage(){
  if(JSON.parse(localStorage.getItem("tasksList")).length){
    taskArray=JSON.parse(localStorage.getItem("tasksList"));
    for(i=0;i<taskArray.length;i++){
      renderTasksList(i);
    }
  }
}
function removeTask(obj){
    taskArray.splice(taskArray.indexOf($('td[id="taskLabel'+obj.name+'"]' ).html()),1);
    $('div[id="'+obj.name+'"').addClass("shakeEffect");
    $( "td#taskLabel"+obj.name ).next().css( "left", "calc(100% - 40px)" );
    setTimeout(function(){
       $('div[id="listArea"').empty();
       localStorage.setItem("tasksList", JSON.stringify(taskArray));
       loadTasksFromStorage();
     }, 1000);
  }
  $(document).ready(function(){
    $("#addTask").click(function(){
      if($("#taskInput").val()){
        taskArray.push($("#taskInput").val());
        renderTasksList(taskArray.length - 1);
        localStorage.setItem("tasksList", JSON.stringify(taskArray));
        $("#taskInput").val("");
      }

    });
  });
