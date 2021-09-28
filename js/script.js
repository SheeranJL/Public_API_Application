const personUrl = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector('.grid-container');
let people = [];
let overlay = document.querySelector('.overlay');
let modal = document.querySelector('.modal-content');
let closeButton = document.querySelector('.modal-close')

//The following code will fetch the API data which contains all the employee information we need for our project
fetch(personUrl)
  .then(response => response.json()) //converting the returned JSON object from fetch into a format we can use and manipulate
  .then(response => response.results)
  .then(displayPeople) //calling the displayPeople function passing it through the response data from the fetch call
  .catch(err => (console.log('Error fetching data', err)))


//Using template literals, the following function will display the grid of twelve employees using the data fetched from the API.
function displayPeople(data) {
  people = data //passing the data into the new 'people' array so it can be used outside the function
  let displayHTML = ''
  people.forEach((person, index) => {
    let {name:{first, last}, email, phone, dob:{date}, location:{city, postcode, state}, picture} = people[index]; //deconstructing the object to use key names as variables.
    let html =
    `
    <div class="card" data-index=${index}>
      <img src=${picture.large} class="avatar">
      <div class="test-container">
        <h2 class="name">${first} ${last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}, ${state}</p>
      </div>
    </div>
    `
    displayHTML += html;
  })
  gridContainer.innerHTML = displayHTML;
}


//The following function will display the HTML of the modal when a user clicks on an employee profile.
function displayOverlay(index) {
  let {name:{first, last}, email, phone, dob, location:{city, street, postcode, state}, picture} = people[index]; //deconstrucing the object so we can use key value names as variables to display info
  let date = new Date(dob.date)
  let modalHTML =
  `
  <div class="modal-content">
    <img src=${picture.large} class="avatar modalimage">
    <div class="test-container">
      <h2 class="name">${first} ${last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}, ${state}</p>
      <hr />
      <p>${phone}</p>
      <p class="address">${street.number} ${street.name}, ${city}, ${state}, ${postcode}</p>
      <p>Bithday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
  </div>
  `
  modal.innerHTML = modalHTML;
  overlay.classList.remove('hidden'); //removing the 'hidden' class from the modal so it appears.
};


//The following code will listen for clicks on an employees profile and will call the displayOverlay function to construct the HTML used to display the modal
gridContainer.addEventListener('click', (e) => {
  target = e.target;
  if (target !== gridContainer) { //this statement will ensure that only clicks on user profiles trigger a response.
    let card = target.closest('.card');
    let index = card.getAttribute('data-index');
    displayOverlay(index)
  };
});


//This code will listen for clicks on the 'x' button within the modal and will hide the modal by applying the 'hidden' class
closeButton.addEventListener('click', (e) => {
  target = e.target
  console.log(target)
  overlay.classList.add('hidden');
})
