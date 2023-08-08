// 1. make API call
// 2. Iterate over the cars
// 3. Make the car card -> insert them into the list

const url = "https://wagon-garage-api.herokuapp.com/porto/cars";

const displayCars = () => {
  const cards = document.querySelector(".cars-list");

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // data is an array of car objects
      console.log(data);
      // iterate over the cars (data)
      cards.innerHTML = ""; // Clear the cars for when adding a new one

      data.forEach((car) => {
        cards.insertAdjacentHTML(
          "beforeend",
          `<div class="car">
            <div class="car-image">
            <img src="http://loremflickr.com/280/280/${car.brand}"/>
              </div>
              <div class="car-info">
              <h4>${car.brand} - ${car.model}</h4>
              <p>
              <strong>Owner:</strong> ${car.owner}
              </p>
              <p>
              <strong>Plate:</strong> ${car.plate}
              </p>
              </div>
              </div>`
        );
      });
      // on every iteration create the car div
      // insert them into the .cars-list
    });
};

displayCars(); // for the first page load

// Adding a car
// 1. select the form
const form = document.querySelector(".car-form");
// 2. Add an event listener to the form (submit)
form.addEventListener("submit", (event) => {
  // 3. prevent the default behavior (reload)
  event.preventDefault();
  // 4. make an API call (POST) with the car info
  const car = {
    brand: form.querySelector("input[name=brand]").value,
    model: form.querySelector("input[name=model]").value,
    owner: form.querySelector("input[name=owner]").value,
    plate: form.querySelector("input[name=plate]").value,
  };

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
  });
  // 5. display cars
  displayCars();
});
