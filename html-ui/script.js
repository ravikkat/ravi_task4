//My Methods

var taskserviceapi = 'http://localhost:31845/api/QueueTasks/'
//var taskserviceapi = 'http://localhost/queservice/api/QueueTasks'
var myObj= {
    //Select TextArea Func
    textSelect: function(){
        document.getElementById('description').select();
    },

//Hide form Method
    hide: function() {
    document.getElementById("form").style.display = "none";
    document.getElementById("show").style.display = "inline-block";

},
//Show Form Method
    show:function(){

    document.getElementById("form").style.display = "block";
    document.getElementById("show").style.display = "none";
   // document.getElementById('myDate').valueAsDate = new Date();
    },
    //Removing task method
    removeTask: function () {
    var id = this.getAttribute('id');
    var myTasks = returnToDo();
    myTasks.splice(id, 1);
    localStorage.setItem('myData', JSON.stringify(myTasks));
    document.getElementById('myTasks').innerHTML = '';
    showMyTasks();
    console.log('delete');

}
};
//Checks if there is already data in LocalStorage
function returnToDo(){
    var myTasks = [];
    var myTasksTemp = localStorage.getItem('myData');
    if(myTasksTemp != null){
        myTasks = JSON.parse(myTasksTemp);
    }
    return myTasks;
}
//Class that creates tasks.
function Task(){
    
    this.Priority = document.getElementById('Priority').value;
    this.TaskStatus = document.getElementById('Status').value;
    this.TaskDescription = document.getElementById('description').value;
}
//Insert task properties into the HTML
function newTask(x,y,z,o){
    document.getElementById('myTasks').innerHTML +=
        '<div class="col l3 m4 s12 animated zoomIn"> <h4>'+z+  ':</h1>'+
        '<p>'+y+'</p>' +
        '<p>By: '+x+'</p>' +
        '<p>Due: ' +o +'</p>'+
        '<div class="btn red" >Delete</div>'+
    '</div>'
}
//Gets all the objects from the array.
function showMyTasks(){
    var myTasks = returnToDo();
    document.getElementById('myTasks').innerHTML = '';
    for(var i=0;i<myTasks.length;i++){
        newTask(
            myTasks[i].Priority,
            myTasks[i].TaskStatus,
            myTasks[i].TaskDescription
        );
    }
    var button = document.getElementsByClassName('red');
    for (var j = 0; j < button.length; j++) {
        button[j].addEventListener('click', myObj.removeTask);
        console.log(button[j].addEventListener('click', myObj.removeTask));

    }
}
function submitInfo(){
    var myTasks = returnToDo();
    myTasks.push(new Task);
    localStorage.setItem('myData',JSON.stringify(myTasks));
   // showMyTasks();
   var data = {};


   data.Priority = document.getElementById('Priority').value;
   data.TaskDescription = document.getElementById('description').value;;
   data.TaskStatus = document.getElementById('Status').value;
   data.CustomerId=1;
  
   var sting1 = JSON.stringify(data);
   console.log(sting1);
  //axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
  //axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
 //axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
  const headers = {
    'Content-Type': 'text/plain'
};
  



   axios.post(taskserviceapi, data)
   .then(response => {
        console.log(`Task is successfully added in.`, response.data);
       
        alert("Successfully added.");
           
   })
   .catch(error => { alert("Invalid Data!"); console.error(error);});

    myObj.hide();
}
showMyTasks();