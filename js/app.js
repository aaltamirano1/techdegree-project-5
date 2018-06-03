const url = 'https://randomuser.me/api/?results=12&nat=us';
let employees = [];
let selectedEmployee;

handleErrors=(response)=>{
  if (!response.ok){
    throw Error(response.status);
  }
  return response;
}
parseJSON=(response)=>{
  return response.json().then(function(data){
    return data['results'];
  });
}
// build employees array and display employees.
setEmployees=(data)=>{
  employees = data;
  employees.forEach(function(employee){
    //set birthday and address property for each employee in the array.
    employee.birthday = new Date(employee.dob);
    employee.address = employee.location.street+'<br>'+employee.location.city+' '+employee.location.state+' '+employee.location.postcode;
    // display employee.
    addEmployee(employee);
  });
}
displayErrors=(error)=>{
  console.log(error);
}
// display employee.
addEmployee=(employee)=>{
  $("#main").append(`
    <div class="employee">
      <img src="`+employee.picture.large+`" class="profile-pic" alt="Profile Pic">
      <div class="info">
        <h3 class="name">`+employee.name.first+ ' ' + employee.name.last+`</h3>
        <p class="email">`+employee.email+`</p>
        <p class="city">`+employee.location.city+`</p>
      </div>
    </div>`);
}

// display modal with info of employee clicked.
function employeeClicked(){
    // identify which employee selected by their email.
    var emailSelected = this.childNodes[3].childNodes[3].innerHTML;
    employees.forEach(function(employee,i){
      if(employee.email===emailSelected){
        changeModal(employee);
        selectedEmployee = i;
      }
      $('#modal').css('display', 'flex');
    });
}
// change modal display when selected employee changes.
changeModal=(employee)=>{
  var birthdate = (employee.birthday.getMonth()+1)+'/'+employee.birthday.getDate()+'/'+employee.birthday.getFullYear();
  $('.modal-container').append(`
    <p id="close-modal" onclick="closeModal()">x</p>
    <img src="`+employee.picture.large+`" class="profile-pic" alt="Profile Pic"> 
    <h3 class="name">`+employee.name.first+` `+employee.name.last+`</h3>
    <p class="email">`+employee.email+`</p>
    <p class="city">`+employee.location.city+`</p>
    <hr>
    <p class="email">`+employee.phone+`</p>
    <p class="address">`+employee.address+`</p>
    <p>Birthday: `+birthdate+`</p>`
  );
}
// close modal when x is clicked.
closeModal=()=>{
  $("#modal").css('display', 'none');
  $('.modal-container').empty();
}

fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(setEmployees)
    .catch(displayErrors);

$(document).ready(()=>{  
  //display modal with info of employee clicked.
  $('#main').on('click', '.employee', employeeClicked);
  
  // add a way to move back and forth between employee detail windows when the modal window is open.
  $('#left-arrow').click(()=>{
    if(selectedEmployee!==0){
      $('.modal-container').empty();
      // change selected employee and then change modal.
      selectedEmployee--;
      changeModal(employees[selectedEmployee]);
    }
  });
  $('#right-arrow').click(()=>{
    if(selectedEmployee!==11){
      $('.modal-container').empty();
      // change selected employee and then change modal.
      selectedEmployee++;
      changeModal(employees[selectedEmployee]);
    }
  });
  
  $('#search button').click(()=>{
    $('.employee').hide();
    // clear old matches every new search.
    $('.match').remove();
    var search = $('#search input').val().toLowerCase();
    
    // if search is cleared show all employees and remove any error msg.
    if (search === ''){
      $('.employee').show();
      $('#error').remove();
  
    // else filter the directory by name and email matches.
    }else{
      var matches = employees.filter((employee)=>{
        var name = employee.name.first+` `+employee.name.last;
        var email = employee.email;
        return name.indexOf(search)>=0||email.indexOf(search)>=0;
      });
  
      // if no matches found hide all employees and show error msg.
      if (matches.length==0){
        $('.employee').hide();
        $('#main').append("<p id='error'>No students found.</p>");
  
      // else display matches and remove any error msg.
      }else{
        $('#error').remove();
        $('.employee').hide();
        matches.forEach(function(match){
          $("#main").append(`
          <div class="employee match">
            <img src="`+match.picture.large+`" class="profile-pic" alt="Profile Pic">
            <div class="info">
              <h3 class="name">`+match.name.first+' '+match.name.last+`</h3>
              <p class="email">`+match.email+`</p>
              <p class="city">`+match.location.city+`</p>
            </div>
          </div>`);
        });
        
      }		
    }
  });

});
