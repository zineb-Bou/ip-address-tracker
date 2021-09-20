// varaibles

let form = document.querySelector('.form');
let ipAdress = document.querySelector('#ip-address');
let country = document.querySelector('#country');
let timeZone = document.querySelector('#timezone');
let isp = document.querySelector('#isp');

var mymap = L.map('mapid').setView([36.75587, 5.08433], 13);
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
var marker = L.marker([36.75587, 5.08433]).addTo(mymap);
var polygon = L.polygon([[36.75587, 5.08433]]).addTo(mymap);

// handle the event when the form is submitted

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let ipAdress = document.querySelector('.submit-input').value;

  request(ipAdress);
});

// make a request to retieve data

function request(ipAdress) {
  fetch(
    `https://geo.ipify.org/api/v1?apiKey=at_E6727iJ7USiRAYIPBgNuuPOv5kmjL&ipAddress=${ipAdress}`
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
}

// displying the result on the page
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
