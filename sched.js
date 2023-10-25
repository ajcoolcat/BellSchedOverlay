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
          console.log(obj, "is missing!");
          SavedSettings[obj] = Settings[obj];
        }

      }
      window.localStorage.setItem("settings", JSON.stringify(SavedSettings));
      loadSettings();
    }
}
if (window.localStorage.getItem("settings") === null) {
  loadSettings();
}
else {
  fixMissingSettings();
}
    


let Settings = {};
function loadSettings() {
  if (window.localStorage.getItem("settings") === null) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'defaultSettings.json');
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
      startSched();
    }
  }
  else {
    Settings = JSON.parse(window.localStorage.getItem("settings"));
    startSched();
  }
}

function startSched() {
  let theme = Settings.theme;

  class DayEvent {
    constructor(startHour, startMin, name, endHour, endMin) {
      this.startHour = startHour;
      this.startMin = startMin;
      this.name = name;
      this.endHour = endHour;
      this.endMin = endMin;
    }
  }

  let current_lunch = 1;

  let Monday1 = new Array(12);
  Monday1[0] = new DayEvent(1, 0, "Morning", 7, 20);
  Monday1[1] = new DayEvent(7, 20, Settings.periodNames.period1, 8, 13);
  Monday1[2] = new DayEvent(8, 18, Settings.periodNames.period2, 9, 10);
  Monday1[3] = new DayEvent(9, 15, Settings.periodNames.period3, 10, 5);
  Monday1[4] = new DayEvent(10, 10, Settings.periodNames.period4, 11, 2);
  Monday1[5] = new DayEvent(11, 2, "Lunch", 11, 32);
  Monday1[6] = new DayEvent(11, 37, Settings.periodNames.period5, 12, 27);
  Monday1[7] = new DayEvent(12, 32, Settings.periodNames.period6, 13, 24);
  Monday1[8] = new DayEvent(13, 49, Settings.periodNames.period7, 14, 20);
  Monday1[9] = new DayEvent(14, 20, "Dismissal", 14, 25);
  Monday1[10] = new DayEvent(14, 25, "After School", 23, 59);
  Monday1[11] = new DayEvent(23, 59, "End", 23, 59);

  let Monday2 = new Array(12);
  Monday2[0] = new DayEvent(1, 0, "Morning", 7, 20);
  Monday2[1] = new DayEvent(7, 20, Settings.periodNames.period1, 8, 13);
  Monday2[2] = new DayEvent(8, 18, Settings.periodNames.period2, 9, 10);
  Monday2[3] = new DayEvent(9, 15, Settings.periodNames.period3, 10, 5);
  Monday2[4] = new DayEvent(10, 10, Settings.periodNames.period4, 11, 2);
  Monday2[5] = new DayEvent(11, 7, Settings.periodNames.period5, 11, 57);
  Monday2[6] = new DayEvent(11, 57, "Lunch", 12, 27);
  Monday2[7] = new DayEvent(12, 32, Settings.periodNames.period6, 13, 24);
  Monday2[8] = new DayEvent(13, 49, Settings.periodNames.period7, 14, 20);
  Monday2[9] = new DayEvent(14, 20, "Dismissal", 14, 25);
  Monday2[10] = new DayEvent(14, 25, "After School", 23, 59);
  Monday2[11] = new DayEvent(23, 59, "End", 23, 59);
  
  let Wednesday1 = new Array(9);
  Wednesday1[0] = new DayEvent(1, 0, "Morning", 7, 20);
  Wednesday1[1] = new DayEvent(7, 20, Settings.periodNames.period2, 8, 49);
  Wednesday1[2] = new DayEvent(8, 55, Settings.periodNames.period4, 10, 21);
  Wednesday1[3] = new DayEvent(10, 21, "Lunch", 10, 51);
  Wednesday1[4] = new DayEvent(10, 57, "Homeroom", 11, 47);
  Wednesday1[5] = new DayEvent(11, 53, Settings.periodNames.period6, 13, 20);
  Wednesday1[6] = new DayEvent(13, 20, "Dismissal", 13, 25);
  Wednesday1[7] = new DayEvent(13, 25, "After School", 23, 59);
  Wednesday1[8] = new DayEvent(23, 59, "End", 23, 59);

  let Wednesday2 = new Array(9);
  Wednesday2[0] = new DayEvent(1, 0, "Morning", 7, 20);
  Wednesday2[1] = new DayEvent(7, 20, Settings.periodNames.period2, 8, 49);
  Wednesday2[2] = new DayEvent(8, 55, Settings.periodNames.period4, 10, 21);
  Wednesday2[3] = new DayEvent(10, 27, "Homeroom", 11, 17);
  Wednesday2[4] = new DayEvent(11, 17, "Lunch", 11, 47);
  Wednesday2[5] = new DayEvent(11, 53, Settings.periodNames.period6, 13, 20);
  Wednesday2[6] = new DayEvent(13, 20, "Dismissal", 13, 25);
  Wednesday2[7] = new DayEvent(13, 25, "After School", 23, 59);
  Wednesday2[8] = new DayEvent(23, 59, "End", 23, 59);

  let Thursday1 = new Array(9);
  Thursday1[0] = new DayEvent(1, 0, "Morning", 7, 20);
  Thursday1[1] = new DayEvent(7, 20, Settings.periodNames.period1, 8, 55);
  Thursday1[2] = new DayEvent(9, 1, Settings.periodNames.period3, 10, 33);
  Thursday1[3] = new DayEvent(10, 33, "Lunch", 11, 3);
  Thursday1[4] = new DayEvent(11, 9, Settings.periodNames.period5, 12, 41);
  Thursday1[5] = new DayEvent(12, 47, Settings.periodNames.period7, 14, 20);
  Thursday1[6] = new DayEvent(14, 20, "Dismissal", 14, 25);
  Thursday1[7] = new DayEvent(14, 25, "After School", 23, 59);
  Thursday1[8] = new DayEvent(23, 59, "End", 23, 59);

  let Thursday2 = new Array(9);
  Thursday2[0] = new DayEvent(1, 0, "Morning", 7, 20);
  Thursday2[1] = new DayEvent(7, 20, Settings.periodNames.period1, 8, 55);
  Thursday2[2] = new DayEvent(9, 1, Settings.periodNames.period3, 10, 33);
  Thursday2[3] = new DayEvent(10, 39, Settings.periodNames.period5, 12, 11);
  Thursday2[4] = new DayEvent(12, 11, "Lunch", 12, 41);
  Thursday2[5] = new DayEvent(12, 47, Settings.periodNames.period7, 14, 20);
  Thursday2[6] = new DayEvent(14, 20, "Dismissal", 14, 25);
  Thursday2[7] = new DayEvent(14, 25, "After School", 23, 59);
  Thursday2[8] = new DayEvent(23, 59, "End", 23, 59);

  let Activity1 = new Array(13);
  Activity1[0] = new DayEvent(1, 0, "Morning", 7, 20);
  Activity1[1] = new DayEvent(7, 20, Settings.periodNames.period1, 8, 5);
  Activity1[2] = new DayEvent(8, 10, Settings.periodNames.period2, 8, 50);
  Activity1[3] = new DayEvent(8, 55, Settings.periodNames.period3, 9, 35);
  Activity1[4] = new DayEvent(9, 40, Settings.periodNames.period4, 10, 20);
  Activity1[5] = new DayEvent(10, 20, "Lunch", 10, 50);
  Activity1[6] = new DayEvent(10, 55, Settings.periodNames.period5, 11, 35);
  Activity1[7] = new DayEvent(11, 40, "Homeroom", 12, 45);
  Activity1[8] = new DayEvent(12, 50, Settings.periodNames.period6, 13, 30);
  Activity1[9] = new DayEvent(13, 35, Settings.periodNames.period7, 14, 20);
  Activity1[10] = new DayEvent(14, 20, "Dismissal", 14, 25);
  Activity1[11] = new DayEvent(14, 25, "After School", 23, 59);
  Activity1[12] = new DayEvent(23, 59, "End", 23, 59);

  let Activity2 = new Array(13);
  Activity2[0] = new DayEvent(1, 0, "Morning", 7, 20);
  Activity2[1] = new DayEvent(7, 20, Settings.periodNames.period1, 8, 5);
  Activity2[2] = new DayEvent(8, 10, Settings.periodNames.period2, 8, 50);
  Activity2[3] = new DayEvent(8, 55, Settings.periodNames.period3, 9, 35);
  Activity2[4] = new DayEvent(9, 40, Settings.periodNames.period4, 10, 20);
  Activity2[5] = new DayEvent(10, 25, Settings.periodNames.period5, 11, 5);
  Activity2[6] = new DayEvent(11, 5, "Lunch", 11, 35);
  Activity2[7] = new DayEvent(11, 40, "Homeroom", 12, 45);
  Activity2[8] = new DayEvent(12, 50, Settings.periodNames.period6, 13, 30);
  Activity2[9] = new DayEvent(13, 35, Settings.periodNames.period7, 14, 20);
  Activity2[10] = new DayEvent(14, 20, "Dismissal", 14, 25);
  Activity2[11] = new DayEvent(14, 25, "After School", 23, 59);
  Activity2[12] = new DayEvent(23, 59, "End", 23, 59);
  
  
  
  let SAT1 = new Array(12);
  SAT1[0] = new DayEvent(1, 0, "Morning", 7, 20);
  SAT1[1] = new DayEvent(7, 20, Settings.periodNames.period1, 8, 5);
  SAT1[2] = new DayEvent(8, 10, Settings.periodNames.period2, 8, 52);
  SAT1[3] = new DayEvent(8, 57, Settings.periodNames.period3, 9, 39);
  SAT1[4] = new DayEvent(9, 44, Settings.periodNames.period4, 10, 26);
  SAT1[5] = new DayEvent(10, 26, "Lunch", 10, 56);
  SAT1[6] = new DayEvent(11, 1, Settings.periodNames.period5, 11, 46);
  SAT1[7] = new DayEvent(11, 51, Settings.periodNames.period6, 12, 33);
  SAT1[8] = new DayEvent(12, 38, Settings.periodNames.period7, 13, 20);
  SAT1[9] = new DayEvent(13, 20, "Dismissal", 13, 25);
  SAT1[10] = new DayEvent(13, 25, "After School", 23, 59);
  SAT1[11] = new DayEvent(23, 59, "End", 23, 59);

  let SAT2 = new Array(12);
  SAT2[0] = new DayEvent(1, 0, "Morning", 7, 20);
  SAT2[1] = new DayEvent(7, 20, Settings.periodNames.period1, 8, 5);
  SAT2[2] = new DayEvent(8, 10, Settings.periodNames.period2, 8, 52);
  SAT2[3] = new DayEvent(8, 57, Settings.periodNames.period3, 9, 39);
  SAT2[4] = new DayEvent(9, 44, Settings.periodNames.period4, 10, 26);
  SAT2[5] = new DayEvent(10, 31, Settings.periodNames.period5, 11, 16);
  SAT2[6] = new DayEvent(11, 16, "Lunch", 11, 46);
  SAT2[7] = new DayEvent(11, 51, Settings.periodNames.period6, 12, 33);
  SAT2[8] = new DayEvent(12, 38, Settings.periodNames.period7, 13, 20);
  SAT2[9] = new DayEvent(13, 20, "Dismissal", 13, 25);
  SAT2[10] = new DayEvent(13, 25, "After School", 23, 59);
  SAT2[11] = new DayEvent(23, 59, "End", 23, 59);
  
  let ExamFri1 = new Array(9);
  ExamFri1[0] = new DayEvent(1, 0, "Morning", 7, 20);
  ExamFri1[1] = new DayEvent(7, 20, Settings.periodNames.period2, 8, 55);
  ExamFri1[2] = new DayEvent(9, 1, Settings.periodNames.period4, 10, 33);
  ExamFri1[3] = new DayEvent(10, 33, "Lunch", 11, 3);
  ExamFri1[4] = new DayEvent(11, 9, "Homeroom", 12, 41);
  ExamFri1[5] = new DayEvent(12, 47, Settings.periodNames.period6, 14, 20);
  ExamFri1[6] = new DayEvent(14, 20, "Dismissal", 14, 25);
  ExamFri1[7] = new DayEvent(14, 25, "After School", 23, 59);
  ExamFri1[8] = new DayEvent(23, 59, "End", 23, 59);

  let ExamFri2 = new Array(9);
  ExamFri2[0] = new DayEvent(1, 0, "Morning", 7, 20);
  ExamFri2[1] = new DayEvent(7, 20, Settings.periodNames.period2, 8, 55);
  ExamFri2[2] = new DayEvent(9, 1, Settings.periodNames.period4, 10, 33);
  ExamFri2[3] = new DayEvent(10, 38, "Homeroom", 12, 11);
  ExamFri2[4] = new DayEvent(12, 11, "Lunch", 12, 41);
  ExamFri2[5] = new DayEvent(12, 47, Settings.periodNames.period6, 14, 20);
  ExamFri2[6] = new DayEvent(14, 20, "Dismissal", 14, 25);
  ExamFri2[7] = new DayEvent(14, 25, "After School", 23, 59);
  ExamFri2[8] = new DayEvent(23, 59, "End", 23, 59);
  
  
  
  let AppBgColor = "white";

  if (theme == "dark") {
    AppBgColor = "rgb(40,40,40)"
  }
  document.body.style.backgroundColor = AppBgColor;

  const app = new PIXI.Application({background: AppBgColor, width: 346, height: 65, antialias:true});
  document.body.appendChild(app.view);

  let textColor = "black";
  if (theme == "dark") {
    textColor = "white";
  }

  const DateAndTime = new PIXI.Text("Loading...", {fontFamily: 'SegUI', fontSize: 17.5, fill: textColor});
  app.stage.addChild(DateAndTime);

  const SchoolDayType = new PIXI.Text("Loading...", {fontFamily: 'SegUI', fontSize: 17.5, fill: textColor});
  SchoolDayType.y = DateAndTime.height + 2;
  app.stage.addChild(SchoolDayType);

  const CurrentPeriod = new PIXI.Text("Loading...", {fontFamily: 'SegUI', fontSize: 17.5, fill: textColor});
  CurrentPeriod.y = SchoolDayType.y + SchoolDayType.height + 2;
  app.stage.addChild(CurrentPeriod);

  const CurrentPeriodSeconds = new PIXI.Text("Loading...", {fontFamily: 'SegUI', fontSize: 17.5, fill: "grey"});
  CurrentPeriodSeconds.y = SchoolDayType.y + CurrentPeriodSeconds.height + 2;
  CurrentPeriodSeconds.visible = Settings.showSeconds;
  app.stage.addChild(CurrentPeriodSeconds);
  
  let ringBGColor = "grey";
  let ringColor = "white";
  
  
  const CurrentPeriodProgressRingContainer = new PIXI.Container();
  
  
  
  const CurrentPeriodProgressRingBG = new PIXI.Graphics();
  if (Settings.theme == "dark"){
    CurrentPeriodProgressRingBG.lineStyle(6, ringBGColor, 1);
    CurrentPeriodProgressRingBG.drawCircle(0,0,10);
  }
  else {
    CurrentPeriodProgressRingBG.lineStyle(1, ringBGColor, 1);
    CurrentPeriodProgressRingBG.drawCircle(0,0,13);
    CurrentPeriodProgressRingBG.drawCircle(0,0,7);
    CurrentPeriodProgressRingBG.lineStyle(7, ringBGColor, 1);
    CurrentPeriodProgressRingBG.drawCircle(0,0,10);
  }
  
  CurrentPeriodProgressRingContainer.addChild(CurrentPeriodProgressRingBG);
  
  const CurrentPeriodProgressRing = new PIXI.Graphics();
  CurrentPeriodProgressRing.lineStyle(57,ringColor, 1);
  let percent = 0;
  CurrentPeriodProgressRing.arc(0,0,100, -((Math.PI/100)*percent), (Math.PI/100)*percent);
  //CurrentPeriodProgressRing.mask = CurrentPeriodProgressRingMask;
  CurrentPeriodProgressRing.scale.x = 0.10;
  CurrentPeriodProgressRing.scale.y = 0.10;
  CurrentPeriodProgressRing.rotation =  ((Math.PI/100)*percent);
  CurrentPeriodProgressRingContainer.addChild(CurrentPeriodProgressRing);
  
  
  CurrentPeriodSeconds.x = CurrentPeriod.width;
  CurrentPeriodProgressRingContainer.y = SchoolDayType.y + CurrentPeriodSeconds.height + (CurrentPeriodProgressRingBG.height/2) - 2;
  app.stage.addChild(CurrentPeriodProgressRingContainer);

  CurrentPeriodProgressRingContainer.visible = Settings.showTimeRemainingRing;
  CurrentPeriodProgressRingContainer.rotation = -Math.PI/2;
  CurrentPeriodProgressRingContainer.scale.x = 0.7;
  CurrentPeriodProgressRingContainer.scale.y = 0.7;

  class Button {
    constructor(text, textColor, BGcolor, width, height, bgHighlightColor) {
      const buttonBG = new PIXI.Graphics();
      buttonBG.beginFill(BGcolor);
      buttonBG.drawRoundedRect(0, 0, width, height, 2);
      const buttonText = new PIXI.Text(text, {fontFamily: 'SegUI', fontSize: 15, fill: textColor});
      buttonText.x = (width / 2) - (buttonText.width / 2);
      buttonText.y = (height / 2) - (buttonText.height / 2);
      buttonText.resolution = 3;
      buttonBG.addChild(buttonText);
      buttonBG.eventMode = "static";
      buttonBG.on("pointerover", () => {
        buttonBG.clear();
        buttonBG.beginFill(bgHighlightColor);
        buttonBG.drawRoundedRect(0, 0, width, height, 2);
      });
      buttonBG.on("pointerout", () => {
        buttonBG.clear();
        buttonBG.beginFill(BGcolor);
        buttonBG.drawRoundedRect(0, 0, width, height, 2);
      })
      buttonBG.cursor = 'pointer';
      return buttonBG;
    }
  }

  let PrimaryColor = "#e0991d";
  let PrimaryColorHighlight = "#f7ab28";
  let SecondaryColor = "#640024";
  let SecondaryColorHighlight = "#740034";
  let width = 65;
  let height = 20;

  let isALunch = true;
  let isBLunch = false;

  if(Settings.defaultLunch == "B Lunch"){
    isALunch = false;
    isBLunch = true;
    current_lunch = 2;
  }
  else {
    isALunch = true;
    isBLunch = false;
    current_lunch = 1;
  }

  const ALunchButton = new Button("A Lunch", "white", isALunch ? PrimaryColor : SecondaryColor, width, height, isALunch ? PrimaryColorHighlight : SecondaryColorHighlight);
  ALunchButton.x = 346 - 75;
  const BLunchButton = new Button("B Lunch", "white", isBLunch ? PrimaryColor : SecondaryColor, width, height, isBLunch ? PrimaryColorHighlight : SecondaryColorHighlight);
  BLunchButton.x = 346 - 75;
  BLunchButton.y = 20 + 2;
  app.stage.addChild(ALunchButton);
  app.stage.addChild(BLunchButton);
  let eventNumber = 1;

  ALunchButton.on("click", () => {
    current_lunch = 1;
    mainLoop();
    mainLoop();
    ALunchButton.clear();
    ALunchButton.beginFill(PrimaryColorHighlight);
    ALunchButton.drawRoundedRect(0, 0, width, height, 2);
    ALunchButton.on("pointerover", () => {
      ALunchButton.clear();
      ALunchButton.beginFill(PrimaryColorHighlight);
      ALunchButton.drawRoundedRect(0, 0, width, height, 2);
    });
    ALunchButton.on("pointerout", () => {
      ALunchButton.clear();
      ALunchButton.beginFill(PrimaryColor);
      ALunchButton.drawRoundedRect(0, 0, width, height, 2);
    })
    BLunchButton.clear();
    BLunchButton.beginFill(SecondaryColor);
    BLunchButton.drawRoundedRect(0, 0, width, height, 2);
    BLunchButton.on("pointerover", () => {
      BLunchButton.clear();
      BLunchButton.beginFill(SecondaryColorHighlight);
      BLunchButton.drawRoundedRect(0, 0, width, height, 2);
    });
    BLunchButton.on("pointerout", () => {
      BLunchButton.clear();
      BLunchButton.beginFill(SecondaryColor);
      BLunchButton.drawRoundedRect(0, 0, width, height, 2);
    })
  })

  BLunchButton.on("click", () => {
    current_lunch = 2;
    mainLoop();
    mainLoop();
    BLunchButton.clear();
    BLunchButton.beginFill(PrimaryColorHighlight);
    BLunchButton.drawRoundedRect(0, 0, width, height, 2);
    BLunchButton.on("pointerover", () => {
      BLunchButton.clear();
      BLunchButton.beginFill(PrimaryColorHighlight);
      BLunchButton.drawRoundedRect(0, 0, width, height, 2);
    });
    BLunchButton.on("pointerout", () => {
      BLunchButton.clear();
      BLunchButton.beginFill(PrimaryColor);
      BLunchButton.drawRoundedRect(0, 0, width, height, 2);
    })
    ALunchButton.clear();
    ALunchButton.beginFill(SecondaryColor);
    ALunchButton.drawRoundedRect(0, 0, width, height, 2);
    ALunchButton.on("pointerover", () => {
      ALunchButton.clear();
      ALunchButton.beginFill(SecondaryColorHighlight);
      ALunchButton.drawRoundedRect(0, 0, width, height, 2);
    });
    ALunchButton.on("pointerout", () => {
      ALunchButton.clear();
      ALunchButton.beginFill(SecondaryColor);
      ALunchButton.drawRoundedRect(0, 0, width, height, 2);
    })
  })
  //main loop is called twice before being used in setInterval so that the text doesnt say "Loading..." or the current period text isnt wrong for 2 seconds.
  mainLoop();
  mainLoop();
  setInterval(mainLoop, 1000);

  let SettingsColor = "rgb(200,200,200)"; let SettingsColorHighlight = "rgb(230,230,230)"
  const SettingsButton = new Button("Settings", "white", SecondaryColor, 65, 20, SecondaryColorHighlight);
  SettingsButton.x = 346 - 75;
  SettingsButton.y = 42 + 2;
  app.stage.addChild(SettingsButton);
  SettingsButton.on("click", () => {
    let x = (screen.width/2) - 200;
    let y = (screen.height/2) - 420;
    let settingsWindow = window.open("./settings.html", "settings", "status=0,toolbar=0,location=0,width=400,height=720,screenX="+ x +",screenY="+y, "popup=true");
    let isClosedInterval = setInterval(()=>{
      if (settingsWindow.closed){
        clearInterval(isClosedInterval);
        window.location.href = "./";
      }
    },50);
  });






  function mainLoop() {
    let Periodmsg = "";
    drawDateTime();
    let currentDay = Monday1;
    let now = new Date();
    let day = now.getDay();
    if (current_lunch == 1) {
      if (day == 1) {currentDay = Monday1; Periodmsg = "Today is a Normal Day.";}
      else if (day == 2) {currentDay = Monday1; Periodmsg = "Today is a Normal Day.";}
      //else if (day == 3) {currentDay = Wednesday1; Periodmsg = "Today is an EVEN Block Day.";}
      else if (day == 3) {currentDay = SAT1; Periodmsg = "Today is a Normal Day.";}
      else if (day == 4) {currentDay = Thursday1; Periodmsg = "Today is an ODD Block Day.";}
      //else if (day == 5) {currentDay = Monday1; Periodmsg = "Today is a Normal Day.";}
      else if (day == 5) {currentDay = ExamFri1; Periodmsg = "Today is an EVEN Block Day.";}
    } else if (current_lunch == 2) {
      if (day == 1) {currentDay = Monday2; Periodmsg = "Today is a Normal Day.";}
      else if (day == 2) {currentDay = Monday2; Periodmsg = "Today is a Normal Day.";}
      //else if (day == 3) {currentDay = Wednesday2; Periodmsg = "Today is an EVEN Block Day.";}
      else if (day == 3) {currentDay = SAT2; Periodmsg = "Today is a Normal Day.";}
      else if (day == 4) {currentDay = Thursday2; Periodmsg = "Today is an ODD Block Day.";}
      //else if (day == 5) {currentDay = Monday2; Periodmsg = "Today is a Normal Day.";}
      else if (day == 5) {currentDay = ExamFri2; Periodmsg = "Today is an EVEN Block Day.";}
    } else {current_lunch = 1}

    let currentEvent = currentDay[eventNumber - 1];

    for (let i = 0; i < currentDay.length; i++) {
      let event_sec = hms2sec(currentDay[i].endHour, currentDay[i].endMin, 0);
      let now_sec = hms2sec(now.getHours(), now.getMinutes(), now.getSeconds());
      //console.log(event_sec - now_sec < 0);
      if (event_sec - now_sec < 0) {
        // hopefully this works
        eventNumber = i + 2;
      }
      else {
        if (eventNumber >= currentDay.length) {
          eventNumber = 0;
        }
        break;
      }
      if (eventNumber >= currentDay.length) {
        eventNumber = 0;
      }

    }

    drawPeriodMsg(Periodmsg);
    drawEventCountDown(currentEvent);
  }
  function hms2sec(hours, minutes, seconds) {
    let sec = (hours * 3600) + (minutes * 60) + seconds;
    return sec;
  }
  function sec2hms(sec) {
    let remaining = sec;
    let hms = "";
    let hours = Math.floor(sec / 3600);
    remaining -= hours * 3600;
    let minutes = Math.floor(remaining / 60);
    remaining -= minutes * 60;
    if (sec >= 36000) {
      hms = hours.toString() + ":";
    }
    else {
      hms = "0" + hours.toString() + ":";
    }
    if (minutes >= 10) {
      hms += minutes.toString();
    }
    else {
      hms += "0" + minutes.toString();
    }
    return hms;

  }
  function difTime(currentEvent) {
    let now = new Date();
    let event_sec = hms2sec(currentEvent.endHour, currentEvent.endMin, 0);
    let now_sec = hms2sec(now.getHours(), now.getMinutes(), now.getSeconds());
    let remaining = sec2hms(event_sec - now_sec);
    return remaining;
  }
   function diffTimeNum(currentEvent) {
    let now = new Date();
    let event_sec = hms2sec(currentEvent.endHour, currentEvent.endMin, 0);
    let now_sec = hms2sec(now.getHours(), now.getMinutes(), now.getSeconds());
    let remaining = (event_sec - now_sec)
    return remaining;
  }
  function drawDateTime() {
    let now = new Date();
    let day = now.getDay();
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    let dayname = weekday[day];
    let month = now.getMonth() + 1
    let date = now.getDate()
    let year = now.getFullYear()
    let time12h = now.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
    let dateString = dayname + "  " + month + "/" + date + "/" + year + "  " + time12h
    DateAndTime.text = dateString;
  }
  function drawPeriodMsg(Periodmsg) {
    SchoolDayType.text = Periodmsg
  }
  function drawEventCountDown(currentEvent) {
    CurrentPeriod.style.fill = textColor;
    CurrentPeriodSeconds.style.fill = "grey";
    CurrentPeriodSeconds.visible = Settings.showSeconds;
    let now = new Date();
    let EventName = currentEvent.name;
    let hours = currentEvent.endHour - now.getHours();
    let minutes = currentEvent.endMin - now.getMinutes() - 1;
    let seconds = 60 - now.getSeconds();
    if (seconds == 60) seconds = 0;
    if (seconds < 10) seconds = "0" + seconds;
    let remaining = (hours * 3600) + (minutes * 60) + seconds;
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    let event_sec = hms2sec(currentEvent.endHour, currentEvent.endMin, 0);
    let start_event_sec = hms2sec(currentEvent.startHour, currentEvent.startMin, 0);
    let now_sec = hms2sec(now.getHours(), now.getMinutes(), now.getSeconds());
    let count_down = sec2hms(event_sec - now_sec);
    if (event_sec - now_sec <= 600) {CurrentPeriod.style.fill = "rgb(255,100,100)";CurrentPeriodSeconds.style.fill = "rgb(255, 150, 150)"}
    if (event_sec - now_sec <= 60 && now_sec % 2 == 1) {CurrentPeriod.style.fill = textColor; CurrentPeriodSeconds.style.fill = "grey";}

    CurrentPeriod.text = EventName + ", Time Left: " + count_down.toString(); //don't do seconds, it represents 0 as 60 and is
                                                                  //i just fixed this + added a 0 before the seconds if its less than 10 and added it with a different, darker color.
    CurrentPeriodSeconds.x = CurrentPeriod.width;
    CurrentPeriodSeconds.text = ":" + seconds;
    if (Settings.showSeconds) {
      CurrentPeriodProgressRingContainer.x = CurrentPeriodSeconds.x + CurrentPeriodSeconds.width + (CurrentPeriodProgressRingBG.width/2);
    }
    else {
      CurrentPeriodProgressRingContainer.x = CurrentPeriodSeconds.x + (CurrentPeriodProgressRingBG.width/2);
    }
    

    // wtf??? how do i calculate the percentage of class time left??????
    
    percent = ((event_sec-now_sec)/(event_sec-start_event_sec))*100;
    
    //percent = 100;
    CurrentPeriodProgressRing.clear();
    CurrentPeriodProgressRing.lineStyle(50,ringColor, 1);
    CurrentPeriodProgressRing.arc(0,0,100, -((Math.PI/100)*percent), (Math.PI/100)*percent);
    CurrentPeriodProgressRing.rotation = ((Math.PI/100)*percent);
    //console.log(percent);
  }
}