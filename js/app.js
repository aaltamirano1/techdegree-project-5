const main = document.querySelector("#main");
const url = 'https://randomuser.me/api/';

function getUser(response){
  var data = response.data['results'][0];
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

document.addEventListener("DOMContentLoaded",()=>{
  for(let i=0; i<9; i++){
     axios.get(url)
    .then(getUser)
    .catch(function(error){
      alert('Oh no, something went wrong.\n\n' + error);
    });
  }
});
