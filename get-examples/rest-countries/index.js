let errDiv;

const restCountriesApi = axios.create({
      baseURL: "https://restcountries.eu/rest/v2/name/"
});

function getCountryInfo(theName) {
  restCountriesApi
    .get(theName)
    .then(responseFromAPI => {
      removeErrDiv();
      const countryName = responseFromAPI.data[0].name;
      const countryCapital = responseFromAPI.data[0].capital;
        const countryFlag = responseFromAPI.data[0].flag;
      // instead in the console, show data in the browser using JS DOM manipulation:
      document.getElementById("countryName").innerHTML = countryName;
      document.getElementById("countryCapital").innerHTML = "Capital: " + countryCapital;
      document.getElementById("countryFlag").setAttribute("src", countryFlag);
    })
    .catch(err => {
      if (err.response.status === 404) {
        removeCountryInfo();
        createDiv();
        const theErr = document.createTextNode(`What the heck is ${theName}? `);
        errDiv.appendChild(theErr);
      } else {
        console.log("err => ", err);
      }
    });
}

function createDiv() {
  errDiv = document.createElement("div");
  errDiv.setAttribute("id", "error");
  document.body.appendChild(errDiv);
}

function removeErrDiv() {
  if (document.getElementById("error")) {
    const error = document.getElementById("error");
    error.parentNode.removeChild(error);
  }
}

function removeCountryInfo() {
  document.getElementById("countryName").innerHTML = "";
  document.getElementById("countryCapital").innerHTML = "";
  document.getElementById("countryFlag").setAttribute("src", "");
}

function checkInput() {
  removeErrDiv();
  if (document.getElementById("theInput").value === "") {
        document.getElementById("theButton").disabled = true;
        removeCountryInfo();
        createDiv();
        const theErr = document.createTextNode(`Wanna input something? `);
        errDiv.appendChild(theErr);
    } else {
        document.getElementById("theButton").disabled = false;
    }
    }

    document.getElementById("theButton").onclick = function() {
    removeErrDiv();
    const country = document.getElementById("theInput").value;
    getCountryInfo(country);
    };