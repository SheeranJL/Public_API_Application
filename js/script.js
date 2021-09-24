let employees = [];
let urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
let gridContainer = document.querySelector('.grid-container');
let overlay = document.querySelector('.overlay');
let modalContainer = document.querySelector('.modal-content');
let modelClose = document.querySelector('.modal-close');


fetch(urlAPI)
  .then(response => response.json()) //Here we're returning the JSON object into a formal we can use
  .then(response => response.results) //Logging the data to ensure the fetch worked and to see what format the data is in.
  .then(displayEmployees) //Here we're calling a function that will create the employee cards
  .catch(error => console.log('Error fetching data', error)); //This line will catch any errors and log them to the console.


function displayEmployees(employeeData) {
  employees = employeeData;
  console.log(employees)
  let employeeHTML = ''

  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture.large;

    employeeHTML += `
    <div class="card" data-index=${index}>
      <img src=${picture} class="avatar">
      <div class="test-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
      </div>
    </div>
    `
  });
  gridContainer.innerHTML = employeeHTML;
};


function displayModal(index) {
  let { name, dob, phone, email, location: {city, street, state, postcode}, picture} = employees[index];
  let date = new Date(dob.date);

  let modalHTML =
  `
    <img src="${picture.large}" class="avatar">
    <div class="test-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
      <hr />
      <p>${phone}</p>
      <p class="address">${street} ${state} ${postcode}</p>
      <p>Bithday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
  `;

  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
}


gridContainer.addEventListener('click', (e) => {
  target = e.target;
  console.log(target);

  if (target !== gridContainer) {
    const card = target.closest(".card")
    const index = card.getAttribute('data-index');

    displayModal(index);
  }
});


modelClose.addEventListener('click', (e) => {
  target = e.target;
  console.log(target.type);

  if (target.type === 'submit') {
    overlay.classList.add('hidden');
  }


})
