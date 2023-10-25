let saveSettings = () => {}
document.addEventListener("DOMContentLoaded", () => {

	let periodNameElements = [];
	for (let i = 1; i < 8; i++){
	  periodNameElements.push(document.querySelector("#period"+i+"Name"));
	}
	
	let Settings = {};

	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'defaultSettings.json');
	xhr.responseType = 'json';
	xhr.send();

	xhr.onload = function () {
	  Settings = xhr.response;
	  document.querySelector("#showSeconds").addEventListener("change", () => {
		saveSettings();
	  });
	  for (let i = 0; i < periodNameElements.length; i++){
		periodNameElements[i].addEventListener("change", () => {
		  saveSettings();
		});
	  }
	  document.querySelector("#DefaultLunchDropdown").addEventListener("change", () => {
		saveSettings();
	  });
	  
	  document.querySelector("#showRing").addEventListener("change", () => {
		saveSettings();
	  });
	  
	  
	  
	}

	saveSettings = () => {
	 
	  Settings.showSeconds = document.querySelector("#showSeconds").checked;
	  Settings.periodNames.period1 = periodNameElements[0].value;
	  Settings.periodNames.period2 = periodNameElements[1].value;
	  Settings.periodNames.period3 = periodNameElements[2].value; 
	  Settings.periodNames.period4 = periodNameElements[3].value;
	  Settings.periodNames.period5 = periodNameElements[4].value;
	  Settings.periodNames.period6 = periodNameElements[5].value;
	  Settings.periodNames.period7 = periodNameElements[6].value;
	  Settings.defaultLunch = document.querySelector("#DefaultLunchDropdown").value;
	  Settings.showTimeRemainingRing = document.querySelector("#showRing").checked;
	  window.localStorage.setItem("settings", JSON.stringify(Settings));
	  
	}
	
	function fixMissingSettings() {
	  let Settings = {}
	  let xhr = new XMLHttpRequest();
	  xhr.open('GET', 'defaultSettings.json');
	  xhr.responseType = 'json';
	  xhr.send();
	  xhr.onload = function () {
		Settings = xhr.response;
		const SavedSettings = JSON.parse(window.localStorage.getItem("settings"));
		for (const obj in Settings) {
		  
		  if (SavedSettings[obj] === undefined){
			console.log(obj, " is missing!");
			SavedSettings[obj] = Settings[obj];
		  }
		  
		}
		
	  }
	}

	fixMissingSettings();  
  
	let LoadSettings = {};
	if (window.localStorage.getItem("settings") === null) {
	  let xhr2 = new XMLHttpRequest();
	  xhr2.open('GET', 'defaultSettings.json');
	  xhr2.responseType = 'json';
	  xhr2.send();
	  xhr2.onload = function () {
		LoadSettings = xhr2.response;
		loadSettings();
	  }
	}
	else {
	  LoadSettings = JSON.parse(window.localStorage.getItem("settings"));
	  loadSettings();
	}

	function loadSettings() {
	  // theme
	  // showSeconds
	  switch (LoadSettings.showSeconds){
		case true:
		  document.querySelector("#showSeconds").checked = true;
		  break;
		case false:
		  document.querySelector("#showSeconds").checked = false;
		  break;
	  }
	  
	  
	  periodNameElements[0].value = LoadSettings.periodNames.period1;
	  periodNameElements[1].value = LoadSettings.periodNames.period2;
	  periodNameElements[2].value = LoadSettings.periodNames.period3;
	  periodNameElements[3].value = LoadSettings.periodNames.period4;
	  periodNameElements[4].value = LoadSettings.periodNames.period5;
	  periodNameElements[5].value = LoadSettings.periodNames.period6;
	  periodNameElements[6].value = LoadSettings.periodNames.period7;
	  
	  switch (LoadSettings.defaultLunch) {
		case "A Lunch":
		  document.querySelector("#DefaultLunchDropdown").selectedIndex = 0;
		  break;
		case "B Lunch":
		  document.querySelector("#DefaultLunchDropdown").selectedIndex = 1;
		  break;
	  }
	  
	  // showRing
	  switch (LoadSettings.showTimeRemainingRing){
		case true:
		  document.querySelector("#showRing").checked = true;
		  break;
		case false:
		  document.querySelector("#showRing").checked = false;
		  break;
	  }

	}
  



  });
  /*
function resetSettings(alert) {
  if (alert == false) {
	window.localStorage.removeItem("settings");
	resetSettings("wait");
  } else if (alert == "cancel") {
	document.getElementById("alert").setAttribute("hidden","true");
  } else if (alert == "wait") {
	document.getElementById("alert").innerHTML = '<p style="text-align: center; font-size: 1.3em; font-weight: 600; letter-spacing: 0.3px;">Reset Settings</p><p style="text-align: center; font-size: 0.8em;">Resetting settings...</p>';
	window.location.href = "settings.html";
  } else {
	document.getElementById("alert").removeAttribute("hidden");
  }*/