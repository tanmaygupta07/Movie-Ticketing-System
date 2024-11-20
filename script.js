const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
];

function populateDropdown() {
    const selectMovie = document.getElementById("selectMovie");
    moviesList.forEach((movie) => {
        const option = document.createElement("option");
        option.text = movie.movieName;
        selectMovie.add(option);
    });
}

function updateMovieInfo() {
    const selectMovie = document.getElementById("selectMovie");
    const selectedIndex = selectMovie.selectedIndex;
    const movieNameElement = document.getElementById("movieName");
    const moviePriceElement = document.getElementById("moviePrice");

    if (selectedIndex !== -1) {
        const selectedMovie = moviesList[selectedIndex];
        movieNameElement.textContent = selectedMovie.movieName;
        moviePriceElement.textContent = `$ ${selectedMovie.price}`;
        updateTotalPrice();
    }
}

function updateTotalPrice() {
    const selectedSeats = document.querySelectorAll("#seatCont .seat.selected");
    const selectedMovieIndex = document.getElementById("selectMovie").selectedIndex;
    const moviePrice = moviesList[selectedMovieIndex].price;
    const totalPriceElement = document.getElementById("totalPrice");
    totalPriceElement.textContent = `$ ${selectedSeats.length * moviePrice}`;
}

function handleSeatSelection(event) {
    const seat = event.target;
    if (!seat.classList.contains("occupied")) {
        seat.classList.toggle("selected");
        updateTotalPrice();
        updateSelectedSeats();
    }
}

function updateSelectedSeats() {
    const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
    const selectedSeats = document.querySelectorAll("#seatCont .seat.selected");
    const numberOfSeatElement = document.getElementById("numberOfSeat");

    if (selectedSeats.length === 0) {
        selectedSeatsHolder.innerHTML = "<span class='noSelected'>No Seat Selected</span>";
        numberOfSeatElement.textContent = "0";
    } else {
        selectedSeatsHolder.innerHTML = "";
        selectedSeats.forEach((seat) => {
            const seatNumber = seat.dataset.seatNumber;
            const seatElement = document.createElement("span");
            seatElement.classList.add("selectedSeat");
            seatElement.textContent = `${seatNumber}`;
            selectedSeatsHolder.appendChild(seatElement);
        });
        numberOfSeatElement.textContent = selectedSeats.length.toString();
    }
}

function handleBookingConfirmation() {
    const selectedSeats = document.querySelectorAll("#seatCont .seat.selected");
    if (selectedSeats.length === 0) {
        alert("NO SEAT SELECTED");
    } else {
        alert("Yayy! Your seats have been booked.");
        selectedSeats.forEach((seat) => {
            seat.classList.remove("selected");
            seat.classList.add("occupied");
        });
        updateTotalPrice();
        updateSelectedSeats();
    }
}

function handleCancellation() {
    const selectedSeats = document.querySelectorAll("#seatCont .seat.selected");
    selectedSeats.forEach((seat) => {
        seat.classList.remove("selected");
    });
    updateTotalPrice();
    updateSelectedSeats();
}

document.addEventListener("DOMContentLoaded", () => {
    populateDropdown();
    updateMovieInfo();

    const seats = document.querySelectorAll("#seatCont .seat");
    seats.forEach((seat, index) => {
        seat.dataset.seatNumber = index + 1;
    });

    document.getElementById("selectMovie").addEventListener("change", updateMovieInfo);
    document.querySelectorAll("#seatCont .seat").forEach((seat) => {
        seat.addEventListener("click", handleSeatSelection);
    });
    document.getElementById("proceedBtn").addEventListener("click", handleBookingConfirmation);
    document.getElementById("cancelBtn").addEventListener("click", handleCancellation);
});