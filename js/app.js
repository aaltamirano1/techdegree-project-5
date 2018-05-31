const main = document.querySelector("#main");
const url = 'https://randomuser.me/api/';
let employees = [];

function Employee(first, last, email, city, pic, phone, address, birthday) {
    this.firstName = first;
    this.lastName = last;
    this.email = email;
    this.city = city;
    this.profilePic = pic;
    this.phoneNumber = phone;
    this.address = address;
    this.birthday = birthday;
}

function closeModal(){
  document.querySelector("#modal").style.display = 'none';
}

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
function addEmployee(data){
  employees.push(new Employee(data.name.first, data.name.last, data.email, data.location.city, data.picture.medium, data.location.street, data.dob));
  $("#main").append(`
    <div class="employee">
      <img src="`+data.picture.medium+`" class="profile-pic" alt="Profile Pic">
      <div class="info">
        <h3 class="name">`+data.name.first + ' ' + data.name.last+`</h3>
        <p class="email">`+data.email+`</p>
        <p class="city">`+data.location.city+`</p>
      </div>
    </div>`);
}
function displayErrors(error){
  console.log(error);
}
for(let i=0; i<9; i++){
    fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(addEmployee)
    .catch(displayErrors);
  }
$(document).ready(function(){
  
  $('#main').on('click', '.employee', function (e) {
    var emailSelected = this.childNodes[3].childNodes[3].innerHTML;
    employees.forEach(function(employee,i){
      if(employee.email===emailSelected){
        $('.modal-container').append(`
          <p id="close-modal" onclick="closeModal()">x</p>
          <img src="`+employee.profilePic+`" class="profile-pic" alt="Profile Pic"> 
          <h3 class="name">`+employee.firstName+` `+employee.lastName+`</h3>
          <p class="email">`+employee.email+`</p>
          <p class="city">`+employee.city+`</p>
          <hr>
          <p class="email">`+employee.phoneNumber+`</p>
          <p class="city">`+employee.address+`</p>
          <p>`+employee.birthday+`</p>`
        );
      }
      $('#modal').css('display', 'flex');
    });
    
  });

});
