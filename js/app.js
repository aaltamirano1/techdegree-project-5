const main = document.querySelector("#main");
const url = 'https://randomuser.me/api/';

function handleErrors(response){
  if (!response.ok){
    throw Error(response.status);
  }
  return response;
}
function parseJSON(response){
  return response.json().then(function(data){
    return data['results'][0];;
  });
}
function addUser(data){
  main.innerHTML +=`
    <div class="employee">
      <img src="`+data.picture.medium+`" class="profile-pic" alt="Profile Pic">
      <div class="info">
        <h3 class="name">`+data.name.first + ' ' + data.name.last+`</h3>
        <p class="email">`+data.email+`</p>
        <p class="city">`+data.location.city+`</p>
      </div>
    </div>`;
}
function displayErrors(error){
  console.log(error);
}

document.addEventListener("DOMContentLoaded",()=>{
  for(let i=0; i<9; i++){
    fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(addUser)
    .catch(displayErrors);
  }

});