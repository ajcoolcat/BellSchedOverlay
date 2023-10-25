function main() {
  document.getElementById("host").removeAttribute("hidden");
  document.getElementById("weather").setAttribute("hidden", "true");
  document.getElementById("calendar").setAttribute("hidden", "true");
  document.getElementById("special").setAttribute("hidden", "true");
  document.getElementById("loading").setAttribute("hidden", "true");
  document.getElementById("nav2").className = "active";
  document.getElementById("link1").className = "navlink";
  document.getElementById("link2").className = "navlink";
  document.getElementById("link3").className = "navlink";
}

function weather() {
  document.getElementById("weather").removeAttribute("hidden");
  document.getElementById("host").setAttribute("hidden", "true");
  document.getElementById("calendar").setAttribute("hidden", "true");
  document.getElementById("special").setAttribute("hidden", "true");
  document.getElementById("loading").setAttribute("hidden", "true");
  document.getElementById("nav2").className = "navlink";
  document.getElementById("link1").className = "active";
  document.getElementById("link2").className = "navlink";
  document.getElementById("link3").className = "navlink";
}

function calendar() {
  document.getElementById("host").setAttribute("hidden", "true");
  document.getElementById("weather").setAttribute("hidden", "true");
  document.getElementById("calendar").removeAttribute("hidden");
  document.getElementById("special").setAttribute("hidden", "true");
  document.getElementById("loading").setAttribute("hidden", "true");
  document.getElementById("nav2").className = "navlink";
  document.getElementById("link1").className = "navlink";
  document.getElementById("link2").className = "active";
  document.getElementById("link3").className = "navlink";
}

function special() {
  document.getElementById("host").setAttribute("hidden", "true");
  document.getElementById("weather").setAttribute("hidden", "true");
  document.getElementById("calendar").setAttribute("hidden", "true");
  document.getElementById("special").removeAttribute("hidden");
  document.getElementById("loading").setAttribute("hidden", "true");
  document.getElementById("nav2").className = "navlink";
  document.getElementById("link1").className = "navlink";
  document.getElementById("link2").className = "navlink";
  document.getElementById("link3").className = "active";
}

function alertClient(visible, title, text) {
  document.getElementById("alert").innerHTML = '<div class="details"><p style="text-align: center; font-size: 1.3em; font-weight: 600; letter-spacing: 0.3px;">'+title+'</p><p style="text-align: center; font-size: 0.8em;">'+text+'</p><p style="text-align:center;"><button onclick="alertClient(false,null,null)">OK</button></p></div>'
  if (visible == true) {document.getElementById("alert").removeAttribute("hidden");document.getElementById("alert-bkg").removeAttribute("hidden");}
  else if (visible == false) {document.getElementById("alert").setAttribute("hidden","true");document.getElementById("alert-bkg").setAttribute("hidden","true");}
  else {console.error("Parameter missing");}
}

function settings() {
  let x = (screen.width/2) - 200;
    let y = (screen.height/2) - 420;
    let settingsWindow = window.open("/sched/settings.html", "settings", "status=0,toolbar=0,location=0,width=400,height=720,screenX="+ x +",screenY="+y, "popup=true");
    let isClosedInterval = setInterval(()=>{
      if (settingsWindow.closed){
        clearInterval(isClosedInterval);
        window.location.href = "/";
      }
    },50);
}

let info = new XMLHttpRequest();
info.open('GET', 'https://schedbackend.5927000274.repl.co/infoFetch.json');
info.responseType = 'json';
info.send();
info.onload = function () {
  let information = JSON.parse(JSON.stringify(info.response));
  document.getElementById("MondayLunchItem").innerHTML = information.lunch.monday;
  document.getElementById("TuesdayLunchItem").innerHTML = information.lunch.tuesday;
  document.getElementById("WednesdayLunchItem").innerHTML = information.lunch.wednesday;
  document.getElementById("ThursdayLunchItem").innerHTML = information.lunch.thursday;
  document.getElementById("FridayLunchItem").innerHTML = information.lunch.friday;
  document.getElementById("track").src = information.tropicalLink;
  document.getElementById("trackmobile").src = information.tropicalLink;
  document.getElementById("senseless").innerHTML = "\"" + information.senseless + "\"";
  document.getElementById("quickbit1").innerHTML = information.quickBits[1];
  document.getElementById("quickbit2").innerHTML = information.quickBits[2];
  document.getElementById("quickbit3").innerHTML = information.quickBits[3];
  document.getElementById("quickbit4").innerHTML = information.quickBits[4];
  document.getElementById("quickbit5").innerHTML = information.quickBits[5];
}

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthnames = ["January","Febuary","March","April","May","June","July","August","September","October","November","December"];
var x = setInterval(function() {
  const d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let monthname = monthnames[d.getMonth()];
  let date = d.getDate();
  let day = weekday[d.getDay()];
  let hour = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  if (hour >= 13) {
    var hourshort = hour - 12
    var apm = "PM"
  } else if (hour == 12) {
    var hourshort = hour
    var apm = "PM"
  } else if (hour == 0) {
    var hourshort = 12
    var apm = "AM"
  } else {
    var hourshort = hour
    var apm = "AM"
  }

  // CLOCK //
  if (minutes < 10) {
    minutes = "0"+minutes
  }
  if (seconds < 10) {
    seconds = "0" + seconds
  }
  document.getElementById("datetime").innerHTML = (month+1) + "/" + date + "/" + year + " " + hourshort + ":" + minutes + " " + apm

  document.getElementById("waitload").draggable = false
}, 1000);
document.getElementById("waitload").addEventListener('contextmenu', event => event.preventDefault());

var timeshelltrigger = document.getElementById("time-shell-dialog-trigger");
var timeshell = document.getElementById("time-shell-dialog");
timeshelltrigger.addEventListener("mouseover", timeshow, false);
timeshell.addEventListener("mouseover", timeshow, false);
timeshelltrigger.addEventListener("mouseout", timehide, false);
timeshell.addEventListener("mouseout", timehide, false);

function timeshow() { 
  document.getElementById("time-shell-dialog").removeAttribute("hidden");
}

function timehide() {  
  document.getElementById("time-shell-dialog").setAttribute("hidden", "true");
}

var radarimg = document.getElementById("radar");
var radarimm = document.getElementById("radarmobile");
radarimg.addEventListener("mouseover", rzoomout, false);
radarimm.addEventListener("mouseover", rzoomout, false);
radarimg.addEventListener("mouseout", rzoomin, false);
radarimm.addEventListener("mouseout", rzoomin, false);

function rzoomin() { 
  document.getElementById("radar").src = "https://radar.weather.gov/ridge/standard/KMLB_loop.gif";
  document.getElementById("radarmobile").src = "https://radar.weather.gov/ridge/standard/KMLB_loop.gif";
}

function rzoomout() {  
  document.getElementById("radar").src = "https://radar.weather.gov/ridge/standard/SOUTHEAST_loop.gif";
  document.getElementById("radarmobile").src = "https://radar.weather.gov/ridge/standard/SOUTHEAST_loop.gif";
}

var dpshelltrigger = document.getElementById("navbutton6");
var dpshell = document.getElementById("dp-shell-dialog");
dpshelltrigger.addEventListener("mouseover", dpshow, false);
dpshell.addEventListener("mouseover", dpshow, false);
dpshelltrigger.addEventListener("mouseout", dphide, false);
dpshell.addEventListener("mouseout", dphide, false);

function dpshow() { 
  document.getElementById("dp-shell-dialog").removeAttribute("hidden");
}

function dphide() {  
  document.getElementById("dp-shell-dialog").setAttribute("hidden", "true");
}

var cpshelltrigger = document.getElementById("copyrights");
var cpshell = document.getElementById("copy-shell-dialog");
cpshelltrigger.addEventListener("mouseover", cpshow, false);
cpshell.addEventListener("mouseover", cpshow, false);
cpshelltrigger.addEventListener("mouseout", cphide, false);
cpshell.addEventListener("mouseout", cphide, false);

function cpshow() { 
  document.getElementById("copy-shell-dialog").removeAttribute("hidden");
}

function cphide() {  
  document.getElementById("copy-shell-dialog").setAttribute("hidden", "true");
}

var x = setInterval(function() {
  let windowwidth = window.innerWidth;
  if (windowwidth < 631) {
    document.getElementById("navbutton1").setAttribute("class","mininavbutton");
    document.getElementById("navbutton2").setAttribute("class","mininavbutton");
    document.getElementById("navbutton3").setAttribute("class","mininavbutton");
    document.getElementById("navbutton4").setAttribute("class","mininavbutton");
    document.getElementById("navbutton5").setAttribute("class","mininavbutton");
    document.getElementById("navbutton6").setAttribute("class","mininavbutton");
    document.getElementById("navbutton1").setAttribute("hidden", "true");
    document.getElementById("navbutton6").setAttribute("hidden", "true");

    document.getElementById("map").setAttribute("hidden","true");
    document.getElementById("mapmobile").removeAttribute("hidden");
    document.getElementById("track").setAttribute("hidden","true");
    document.getElementById("trackmobile").removeAttribute("hidden");
    document.getElementById("radar").setAttribute("hidden","true");
    document.getElementById("radarmobile").removeAttribute("hidden");
  } else {
    document.getElementById("navbutton1").setAttribute("class","navbutton");
    document.getElementById("navbutton2").setAttribute("class","navbutton");
    document.getElementById("navbutton3").setAttribute("class","navbutton");
    document.getElementById("navbutton4").setAttribute("class","navbutton");
    document.getElementById("navbutton5").setAttribute("class","navbutton");
    document.getElementById("navbutton6").setAttribute("class","navbutton");
    document.getElementById("navbutton1").removeAttribute("hidden");
    document.getElementById("navbutton6").removeAttribute("hidden");

    document.getElementById("mapmobile").setAttribute("hidden","true");
    document.getElementById("map").removeAttribute("hidden");
    document.getElementById("trackmobile").setAttribute("hidden","true");
    document.getElementById("track").removeAttribute("hidden");
    document.getElementById("radarmobile").setAttribute("hidden","true");
    document.getElementById("radar").removeAttribute("hidden");
  }
}, 100);

const d = new Date();
let hour = d.getHours();

if (hour >= 18) {
  document.getElementById("forecastimg").src = "https://www.weather.gov/images/mlb/graphicast/image3.png";
} else {
  document.getElementById("forecastimg").src = "https://www.weather.gov/images/mlb/graphicast/image2.png";
}

let year = d.getFullYear();
let month = d.getMonth(); month++;
let date = d.getDate();
if (month < 10) {
  month = "0"+month;
} if (date < 10) {
  date = "0"+date;
}

let feed = new XMLHttpRequest();
feed.open('GET',"https://schedbackend.5927000274.repl.co/feed.json");
feed.responseType = 'json';
feed.send();
feed.onload = function() {
  let feeds = JSON.parse(JSON.stringify(feed.response));
  function objectLength(obj) {var result = 0;
    for(var prop in obj) {
      if (obj.hasOwnProperty(prop)) {result++;}
    } return result; }
  let amnt = objectLength(feeds);
  if (amnt !== 0) {
    document.getElementById("feed-updates").innerHTML = null;
    let index = 1;
    let item = [];
    while (index <= amnt) {
      item[index] = document.createElement("li");
      item[index].innerHTML = feeds[index];
      document.getElementById("feed-updates").innerHTML += "<li>"+ item[index].innerHTML +"</li>";
      index++;
    }
  }
}

main();

//Initial References
const newTaskInput = document.querySelector("#new-task input");
const tasksDiv = document.querySelector("#tasks");
let deleteTasks, editTasks, tasks;
let updateNote = "";
let count;

//Function on window load
window.onload = () => {
  updateNote = "";
  count = Object.keys(localStorage).length;
  displayTasks();
};

//Function to display the tasks
const displayTasks = () => {
  if (Object.keys(localStorage).length > 0) {
    tasksDiv.style.display = "inline-block";
  } else {
    tasksDiv.style.display = "none";
  }

  //Clear the tasks
  tasksDiv.innerHTML = "";

  //Fetch fll the keys in local storage
  let tasks = Object.keys(localStorage);
  tasks = tasks.sort();

  for (let key of tasks) {
    let classValue = "";

    //Get all values
    let value = localStorage.getItem(key);
    let taskInnerDiv = document.createElement("div");
    taskInnerDiv.classList.add("task");
    taskInnerDiv.setAttribute("id", key);
    taskInnerDiv.innerHTML = `<span id="taskname">${key.split("_")[1]}</span>`;
    //localstorage would store boolean as string so we parse it to boolean back
    let editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    if (!JSON.parse(value)) {
      editButton.style.visibility = "visible";
    } else {
      editButton.style.visibility = "hidden";
      taskInnerDiv.classList.add("completed");
    }
    taskInnerDiv.appendChild(editButton);
    taskInnerDiv.innerHTML += `<button class="delete"><i class="fa-solid fa-trash"></i></button>`;
    tasksDiv.appendChild(taskInnerDiv);
  }

  //tasks completed
  tasks = document.querySelectorAll(".task");
  tasks.forEach((element, index) => {
    element.onclick = () => {
      //local storage update
      if (element.classList.contains("completed")) {
        updateStorage(element.id.split("_")[0], element.innerText, false);
      } else {
        updateStorage(element.id.split("_")[0], element.innerText, true);
      }
    };
  });

  //Edit Tasks
  editTasks = document.getElementsByClassName("edit");
  Array.from(editTasks).forEach((element, index) => {
    element.addEventListener("click", (e) => {
      //Stop propogation to outer elements (if removed when we click delete eventually rhw click will move to parent)
      e.stopPropagation();
      //disable other edit buttons when one task is being edited
      disableButtons(true);
      //update input value and remove div
      let parent = element.parentElement;
      newTaskInput.value = parent.querySelector("#taskname").innerText;
      //set updateNote to the task that is being edited
      updateNote = parent.id;
      //remove task
      parent.remove();
    });
  });

  //Delete Tasks
  deleteTasks = document.getElementsByClassName("delete");
  Array.from(deleteTasks).forEach((element, index) => {
    element.addEventListener("click", (e) => {
      e.stopPropagation();
      //Delete from local storage and remove div
      let parent = element.parentElement;
      removeTask(parent.id);
      parent.remove();
      count -= 1;
    });
  });
};

//Disable Edit Button
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

//Remove Task from local storage
const removeTask = (taskValue) => {
  localStorage.removeItem(taskValue);
  displayTasks();
};

//Add tasks to local storage
const updateStorage = (index, taskValue, completed) => {
  localStorage.setItem(`${index}_${taskValue}`, completed);
  displayTasks();
};

//Function To Add New Task
document.querySelector("#push").addEventListener("click", () => {
  //Enable the edit button
  disableButtons(false);
  if (newTaskInput.value.length == 0) {
    alertClient(true,"Notice","You must enter a task name.");
  } else {
    //Store locally and display from local storage
    if (updateNote == "") {
      //new task
      updateStorage(count, newTaskInput.value, false);
    } else {
      //update task
      let existingCount = updateNote.split("_")[0];
      removeTask(updateNote);
      updateStorage(existingCount, newTaskInput.value, false);
      updateNote = "";
    }
    count += 1;
    newTaskInput.value = "";
  }
});

let Options = {};
let free_cookies = {"showInfoBox":"true"};
if (window.localStorage.getItem("Options") === null) {
  Options = free_cookies;
  window.localStorage.setItem("Options", JSON.stringify(Options));
}
else {
  Options = JSON.parse(window.localStorage.getItem("Options"));
}
if (Options.showInfoBox === "true") {
  document.getElementById("alps-info").removeAttribute("hidden");
}

function dontShowAgain() {
  document.getElementById("alps-info").setAttribute("hidden","true");
  Options.showInfoBox = "false";
  window.localStorage.setItem("Options", JSON.stringify(Options));
}

function showAgain() {
  document.getElementById("alps-info").removeAttribute("hidden");
  Options.showInfoBox = "true";
  window.localStorage.setItem("Options", JSON.stringify(Options));
}