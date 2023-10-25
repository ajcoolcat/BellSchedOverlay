var root = document.querySelector(':root');
var rootStyles = getComputedStyle(root);

let Settings = {};
if (window.localStorage.getItem("settings") === null) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', '/defaultSettings.json');
  xhr.responseType = 'json';
  xhr.send();
  xhr.onload = function () {
    Settings = xhr.response;

    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkThemeMq.matches) {
      Settings.theme = "dark";
    } else {
      Settings.theme = "light";
    }

    window.localStorage.setItem("settings", JSON.stringify(Settings));
  }
}
else {
  Settings = JSON.parse(window.localStorage.getItem("settings"));
}

const derp = new Date();
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day = weekdays[derp.getDay()];

if (Settings.theme == "light") {
  root.style.setProperty("--theme", "light");
  document.getElementById(day+"Lunch").style.backgroundColor = "#640024";
  document.getElementById(day+"Lunch").style.color = "#ffffff";
} else {
  root.style.setProperty("--theme", "dark");
  document.getElementById(day+"Lunch").style.backgroundColor = "#ff034e";
  document.getElementById(day+"Lunch").style.color = "#000000";
}

function feedback() {
  alertClient(true, "Submit Feedback", "<iframe style='border:0;margin:0;padding:0;width:100%;height:400px;' src='https://forms.gle/6euhoUTeJaUFafGQ8'></iframe>")
}

function poll() {
  alertClient(true, "Daily Poll", "<iframe style='border:0;margin:0;padding:0;width:100%;height:400px;' src='https://croomssched.glitch.me/redir.html?loc=poll'></iframe>")
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function ad() {
  let id = getRandomInt(1,3);
  if (id == 1) {
    window.open("https://croomssched.glitch.me/ads/softram/","ad","status=0,toolbar=0,location=0,width=400,height=300,popup=true");
  } else if (id == 2) {
    poll();
  }
}