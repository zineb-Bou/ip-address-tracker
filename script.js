// varaibles

let form = document.querySelector('.form');
let ipAdress = document.querySelector('#ip-address');
let country = document.querySelector('#country');
let timeZone = document.querySelector('#timezone');
let isp = document.querySelector('#isp');

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
    })
}

// displying the result on the page
function displyResult(data) {
  ipAdress.innerHTML = data.ip;
  country.innerHTML = data.location.city;
  timeZone.innerHTML = data.location.timezone;
  isp.innerHTML = data.isp;
}

