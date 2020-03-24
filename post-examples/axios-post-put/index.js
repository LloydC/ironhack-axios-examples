// When the WALL-E button is clicked
const theNames = document.getElementsByClassName("the-name");
const theOccupations = document.getElementsByClassName("the-occupation");
const theWeapons = document.getElementsByClassName("the-weapon");

// HANDLER FOR "CREATE CHARACTER" ACTION 
document.getElementById("character-form").onsubmit = event => {
event.preventDefault(); // <= !!!

const characterInfo = {
        name: theNames[0].value,
        occupation: theOccupations[0].value,
        weapon: theWeapons[0].value
    };

axios
.post("https://ih-crud-api.herokuapp.com/characters", characterInfo)
.then(response => {
const { name, id } = response.data;
const newCharacterHtml = `
    <li>
        <h3> ${name} </h3>
        <p> Id: ${id} </p>
    </li>
    `;
document.getElementById("characters-list").innerHTML += newCharacterHtml;
// Clear the form after submitting:
document.getElementById("character-form").reset();
})
.catch(error => console.log("Error is: ", error));
};

document.getElementById("getButton").onclick = event => {
const theId = document.getElementById("the-char-id").value;
axios.get(`https://ih-crud-api.herokuapp.com/characters/${theId}`)
.then(response => {
// console.log('Response from the API is: ', response.data);

// The following lane hides the form to create a new character when we are updating one
document.getElementById("character-form").style.display = "none";
document.getElementById("update-section").style.display = "block";
theNames[1].value = response.data.name;
theOccupations[1].value = response.data.occupation;
theWeapons[1].value = response.data.weapon;
})
.catch(error => {
// console.log("The error is: ", error);
document.getElementById("updateForm").style.display="none";
if(error.response.status === 404){
    const errorMessage = `There's no character with id: ${theId}. Try some other ID.`
    const errDiv = document.createElement("div");
    errDiv.setAttribute("class", "error");
    errDiv.innerHTML = errorMessage;
    document.body.appendChild(errDiv);
}
});
}

document.getElementById("update-form").onsubmit = event => {
event.preventDefault();
const theId = document.getElementById("the-char-id").value;
const updatedcharacterInfo = {
name: theNames[1].value,
occupation: theOccupations[1].value,
weapon: theWeapons[1].value
};

axios.patch(`https://ih-crud-api.herokuapp.com/characters/${theId}`, updatedcharacterInfo)
.then(response => {
  console.log('update successful: ', response);
  document.getElementById("update-form").style.display = "none";
  const { name, id } = response.data;
  const updatedCharacterHtml = `
  <h2>Updated character with ID ${theId}: </h2>
  <li>
    <h3> ${name} </h3>
    <p> Id: ${id} </p>
  </li>
  `;
  document.getElementById("characters-list").innerHTML = "";
  document.getElementById("characters-list").innerHTML += updatedCharacterHtml;
})
.catch(error => console.log(error))
}

document.getElementById("add-char").onclick = event => document.getElementById("character-form").style.display = "block"

document.getElementById("update-char").onclick = event => document.getElementById("update-form").style.display = "block"