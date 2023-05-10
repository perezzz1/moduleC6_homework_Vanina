const wsUri = "wss://echo-ws-service.herokuapp.com";

const output = document.getElementById("output");
const btnSendMes = document.querySelector('.j-btn-send');
const btnSendGeo = document.querySelector('.j-btn-geolocation');


let websocket;

function writeToScreenSend(message) {
  let pre = document.createElement("p");
  let pre_sp = document.createElement("span")

  pre.style.margin = "20px 10px 30px 10px";
  pre.style.padding = "5px 10px 5px 10px";
  pre.style.textAlign = "end"

  pre_sp.style.width = "5px 10px 5px 10px";
  pre_sp.style.border = "solid 4px #85CDFD";
  pre_sp.style.borderRadius = "8px"
  pre_sp.style.padding = "10px 20px";
  pre_sp.style.color = "blue"

  pre_sp.innerHTML = message;
  output.appendChild(pre);
  pre.appendChild(pre_sp);
}


function writeToScreenResponse(message) {
  let pre = document.createElement("p");
  let pre_sp = document.createElement("span")

  pre.style.margin = "20px 10px 30px 10px";
  pre.style.padding = "20px 20px 5px 10px";
  pre.style.textAlign = "start"

  pre_sp.style.width = "5px 10px 5px 10px";
  pre_sp.style.border = "solid 4px #85CDFD";
  pre_sp.style.borderRadius = "8px"
  pre_sp.style.padding = "10px 20px";
  pre_sp.style.color = "red"

  pre_sp.innerHTML = message;
  output.appendChild(pre);
  pre.appendChild(pre_sp);
}

btnSendMes.addEventListener('click', () => {
  websocket = new WebSocket(wsUri);
  const message = document.querySelector(".message").value;

  websocket.onopen = function(evt) {
    writeToScreenSend(message);
    websocket.send(message);
  };
  websocket.onclose = function(evt) {
    if (evt.wasClean) {
      alert(`Соединение закрыто чисто, код=${evt.code} причина=${evt.reason}`);
    } else {
      alert('Соединение прервано');
    }
  };
  websocket.onmessage = function(evt) {
    writeToScreenResponse(evt.data);
  };
  websocket.onerror = function(evt) {
    writeToScreenSend(
      '<span style="color: red;">ERROR:</span> ' + evt.data
    );
  };
});



const mapLink = document.querySelector('#map-link');

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = 'Ссылка на карту';
    
    mapLink.style.margin = "40px 10px 30px 10px";
    mapLink.style.padding = "10px 20px";

    mapLink.style.border = "solid 4px #85CDFD";
    mapLink.style.borderRadius = "8px"
}

btnSendGeo.addEventListener('click', () => {
    mapLink.href = '';
    mapLink.textContent = '';
    navigator.geolocation.getCurrentPosition(success);

});