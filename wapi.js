let foc = new XMLHttpRequest();
foc.open('GET', 'https://api.weather.gov/gridpoints/MLB/28,80/forecast');
foc.responseType = 'json';
foc.send();
foc.onload = function () {
  let forecasts = new Array(14);
  let data = JSON.parse(JSON.stringify(foc.response));
  class Forecast {
    constructor(dayName, iconFile, desc, temp, windSpeed, windDir) {
      this.dayName = dayName;
      this.icon = iconFile;
      this.desc = desc;
      this.temp = temp;
      this.windSpeed = windSpeed;
      this.windDir = windDir;
    }
  }

  let obj0 = data.properties.periods[0];
  let obj1 = data.properties.periods[1];
  let obj2 = data.properties.periods[2];
  let obj3 = data.properties.periods[3];
  let obj4 = data.properties.periods[4];
  let obj5 = data.properties.periods[5];
  let obj6 = data.properties.periods[6];
  let obj7 = data.properties.periods[7];
  let obj8 = data.properties.periods[8];
  let obj9 = data.properties.periods[9];
  let obj10 = data.properties.periods[10];
  let obj11 = data.properties.periods[11];
  let obj12 = data.properties.periods[12];
  let obj13 = data.properties.periods[13];


  forecasts[0] = new Forecast(obj0.name, obj0.icon, obj0.shortForecast, obj0.temperature, obj0.windSpeed, obj0.windDirection);
  forecasts[1] = new Forecast(obj1.name, obj1.icon, obj1.shortForecast, obj1.temperature, obj1.windSpeed, obj1.windDirection);
  forecasts[2] = new Forecast(obj2.name, obj2.icon, obj2.shortForecast, obj2.temperature, obj2.windSpeed, obj2.windDirection);
  forecasts[3] = new Forecast(obj3.name, obj3.icon, obj3.shortForecast, obj3.temperature, obj3.windSpeed, obj3.windDirection);
  forecasts[4] = new Forecast(obj4.name, obj4.icon, obj4.shortForecast, obj4.temperature, obj4.windSpeed, obj4.windDirection);
  forecasts[5] = new Forecast(obj5.name, obj5.icon, obj5.shortForecast, obj5.temperature, obj5.windSpeed, obj5.windDirection);
  forecasts[6] = new Forecast(obj6.name, obj6.icon, obj6.shortForecast, obj6.temperature, obj6.windSpeed, obj6.windDirection);
  forecasts[7] = new Forecast(obj7.name, obj7.icon, obj7.shortForecast, obj7.temperature, obj7.windSpeed, obj7.windDirection);
  forecasts[8] = new Forecast(obj8.name, obj8.icon, obj8.shortForecast, obj8.temperature, obj8.windSpeed, obj8.windDirection);
  forecasts[9] = new Forecast(obj9.name, obj9.icon, obj9.shortForecast, obj9.temperature, obj9.windSpeed, obj9.windDirection);
  forecasts[10] = new Forecast(obj10.name, obj10.icon, obj10.shortForecast, obj10.temperature, obj10.windSpeed, obj10.windDirection);
  forecasts[11] = new Forecast(obj11.name, obj11.icon, obj11.shortForecast, obj11.temperature, obj11.windSpeed, obj11.windDirection);
  forecasts[12] = new Forecast(obj12.name, obj12.icon, obj12.shortForecast, obj12.temperature, obj12.windSpeed, obj12.windDirection);
  forecasts[13] = new Forecast(obj13.name, obj13.icon, obj13.shortForecast, obj13.temperature, obj13.windSpeed, obj13.windDirection);

  let index = 0;
  while (index <= 13) {
    document.getElementById(index+"-name").innerHTML = forecasts[index].dayName;
    document.getElementById(index+"-icon").src = forecasts[index].icon;
    document.getElementById(index+"-desc").innerHTML = forecasts[index].desc;
    document.getElementById(index+"-temp").innerHTML = forecasts[index].temp;
    document.getElementById(index+"-windd").innerHTML = forecasts[index].windDir;
    document.getElementById(index+"-winds").innerHTML = forecasts[index].windSpeed;
    index++;
  }
}

let altloc = "https://api.weather.gov/alerts/active?zone=FLZ046" //"https://api.weather.gov/alerts/active?area=FL" 
let wxalert;
let art = new XMLHttpRequest();
  art.open('GET', altloc);
  art.responseType = 'json';
  art.send();
  art.onload = function() {
    wxalert = JSON.parse(JSON.stringify(art.response.features));
    function objectLength(obj) {var result = 0;
      for(var prop in obj) {
        if (obj.hasOwnProperty(prop)) {result++;}
      } return result; }
    let amnt = objectLength(wxalert);
    if (amnt != 0) {
      let index = 0;
      let apm;
      let item = []
      while (index <= amnt - 1) {
        let endtime = new Date(wxalert[index].properties.ends);
        let currentday = d.getDay();
        if (endtime == "Wed Dec 31 1969 19:00:00 GMT-0500 (Eastern Standard Time)") {endtime = "further notice"}
        else {
          let endday = endtime.getDay();
          if (endday == currentday) {endday = ""}
          else {endday = weekdays[endday]}
          let endhour = endtime.getHours();
          if (endhour >= 12) {endhour -= 12; apm = "PM"}
          else {apm = "AM"}
          let endminute = endtime.getMinutes()
          if (endminute < 10) {endminute = "0"+endminute}
          endtime = endday + " at " + endhour + ":" + endminute + " " + apm;
        }

        item[index] = document.createElement("li");
        item[index].innerHTML = wxalert[index].properties.event + " until " + endtime;
        document.getElementById("alert-list").innerHTML += "<li>"+ item[index].innerHTML +"</li>";
        index++;
      } document.getElementById("alerts").removeAttribute("hidden");
    }
  }

var updater = setInterval(function() {
  let art = new XMLHttpRequest();
  art.open('GET', altloc);
  art.responseType = 'json';
  art.send();
  art.onload = function() {
    wxalert = JSON.parse(JSON.stringify(art.response.features));
    function objectLength(obj) {var result = 0;
      for(var prop in obj) {
        if (obj.hasOwnProperty(prop)) {result++;}
      } return result; }
    let amnt = objectLength(wxalert);
    if (amnt != 0) {
      let index = 0;
      let apm;
      let item = []
      document.getElementById("alert-list").innerHTML = null
      while (index <= amnt - 1) {
        let endtime = new Date(wxalert[index].properties.ends);
        let currentday = d.getDay();
        if (endtime == "Wed Dec 31 1969 19:00:00 GMT-0500 (Eastern Standard Time)") {endtime = "further notice"}
        else {
          let endday = endtime.getDay();
          if (endday == currentday) {endday = ""}
          else {endday = weekdays[endday]}
          let endhour = endtime.getHours();
          if (endhour >= 12) {endhour -= 12; apm = "PM"}
          else {apm = "AM"}
          let endminute = endtime.getMinutes()
          if (endminute < 10) {endminute = "0"+endminute}
          endtime = endday + " at " + endhour + ":" + endminute + " " + apm;
        }

        item[index] = document.createElement("li");
        item[index].innerHTML = wxalert[index].properties.event + " until " + endtime;
        document.getElementById("alert-list").innerHTML += "<li>"+ item[index].innerHTML +"</li>";
        index++;
      } document.getElementById("alerts").removeAttribute("hidden");
    }
  }
}, 300000);