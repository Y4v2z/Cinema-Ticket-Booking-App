const container = document.querySelector(".container");
const count = document.querySelector("#count");
const amount = document.querySelector("#amount");
const selectBoxForMovies = document.querySelector("#movies");
const allSeatsExceptReserved = document.querySelectorAll(".seat:not(.reserved)");
getDataFromLocalStorage()
calculateTotal();
container.addEventListener("click", function (e) {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("reserved")) {
        e.target.classList.toggle("selected");
        calculateTotal();
    }
});
selectBoxForMovies.addEventListener("change", function (e) {
    calculateTotal();
});
function calculateTotal() {
    const selectedSeats = container.querySelectorAll(".seat.selected");
    const selectedSeatsArr = [];
    selectedSeats.forEach(function (seat) {
        selectedSeatsArr.push(seat);
    });
    const allSeatsExceptReservedArr = [];
    allSeatsExceptReserved.forEach(function (seat) {
        allSeatsExceptReservedArr.push(seat);
    });
    let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
        return allSeatsExceptReservedArr.indexOf(seat);
    });
    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * selectBoxForMovies.value;
    saveDataToLocalStorage(selectedSeatIndexs)
};
function getDataFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if (selectedSeats != null && selectedSeats.length > 0) {
        allSeatsExceptReserved.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        })
    };
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex != null) {
        selectBoxForMovies.selectedIndex = selectedMovieIndex;
    };
};
function saveDataToLocalStorage(index) {
    localStorage.setItem("selectedSeats", JSON.stringify(index));
    localStorage.setItem("selectedMovieIndex", selectBoxForMovies.selectedIndex);
};    