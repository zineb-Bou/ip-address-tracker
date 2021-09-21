// varaibles

let form = document.querySelector('.form');
let ipAdress = document.querySelector('#ip-address');
let country = document.querySelector('#country');
let timeZone = document.querySelector('#timezone');
let isp = document.querySelector('#isp');

// Map initialization
var mymap = L.map('mapid').setView([36.75587, 5.08433], 13);
// osm layers
L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 15,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      'pk.eyJ1Ijoia2V2ZXRpaDg2MSIsImEiOiJja2h4MzFxaG8wOW5pMzBsdGZ1NXFoeHh5In0.hw5mLyF4KWalDgcxAWrmuw',
  }
).addTo(mymap);

// Marker

var myIcon = L.icon({
  iconUrl: 'assets/icon-location.svg',
  iconSize: [46, 56],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});
var marker = L.marker([36.19112, 5.41373], { icon: myIcon }).addTo(mymap);

// Add google map
googleStreets = L.tileLayer(
  'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
  {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  }
).addTo(mymap);

// Handle the event when the form is submitted

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let inputValue = document.querySelector('.submit-input').value.trim();

  if (checkValidDomain(inputValue)) {
    request(inputValue, 'domain');
  } else if (checkValidIpv4(inputValue) || checkValidIpv6(inputValue)) {
    request(inputValue);
  } else {
    throwErroMsg();
  }
});

// Make a request to retieve data
function request(value, typeRequest = 'ip') {
  let requestQuery = 'ipAddress=' + value;
  // console.log(`Search by ${typeRequest}`);
  if (typeRequest === 'domain') {
    requestQuery = requestQuery.replace('ipAddress', 'domain');
  }
  fetch(
    `https://geo.ipify.org/api/v1?apiKey=at_E6727iJ7USiRAYIPBgNuuPOv5kmjL&${requestQuery}`
  )
    .then((result) => {
      if (result.ok) {
        return result.json();
      } else {
        return Promise.reject({
          status: result.status,
          statusText: result.statusText,
        });
      }
    })
    .then((data) => {
      displyResult(data);
      setMap(data);
    })
    .catch(function () {
      throwErroMsg();
    });
}

// Displying the result on the page
function displyResult(data) {
  ipAdress.innerHTML = data.ip;
  country.innerHTML = data.location.city;
  timeZone.innerHTML = data.location.timezone;
  isp.innerHTML = data.isp;
}

// setting the map state

function setMap(data) {
  mymap.setView([data.location.lat, data.location.lng], 13);
  marker.setLatLng([data.location.lat, data.location.lng]);
}

let filtter = document.querySelector('.bg-filter');
let modal = document.querySelector('.modal-error');
let close_btn = document.querySelector('.close-btn');

// function that display a modal is case of a wrong ip address
function throwErroMsg() {
  filtter.style.visibility = 'visible';
  modal.style.visibility = 'visible';
}
close_btn.addEventListener('click', () => {
  filtter.style.visibility = 'hidden';
  modal.style.visibility = 'hidden';
});

// functions to test the input value.
function checkValidIpv4(value) {
  const pattern =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
  return pattern.test(value);
}
function checkValidIpv6(value) {
  const pattern =
    /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/;
  return pattern.test(value);
}
function checkValidDomain(value) {
  const pattern =
    /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;
  return pattern.test(value);
}
