console.log("Yes Im connected");
//==================//
// CACHED DOM NODES //
//==================//

const beginButton = document.querySelector(".begin-game");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close");
const userGrid = document.querySelector(".grid-user");
const computerGrid = document.querySelector(".grid-computer");
const displayGrid = document.querySelector(".grid-display")
const ships = document.querySelectorAll(".ship");
const destroyer = document.querySelector(".destroyer-container");
const submarine = document.querySelector(".submarine-container");
const cruiser = document.querySelector(".cruiser-container");
const battleship = document.querySelector(".battleship-container");
const carrier = document.querySelector(".carrier-container");
const startButton = document.querySelector("#start");
const rotateButton = document.querySelector("#rotate");
const turnDisplay = document.querySelector("#turn");
const infoDisplay = document.querySelector("#info");
const userSquares = []
const computerSquares = []

const width = 10

// //===============//
// //  GLOBAL VARS  //
// //===============//





// //======================//
// //      FUNCTIONS       //
// //======================//

const toggleModal = () => {
    modal.classList.toggle("open");
}
//GAME BOARD//

const createBoard = (grid, squares, width) => {
    for(let i = 0; i < 100; i++){
        const square = document.createElement("div");
        square.dataset.id = i; //numbers the divs//
        grid.appendChild(square);
        squares.push(square);
    }
}

createBoard(userGrid, userSquares);
createBoard(computerGrid, computerSquares);

//SHIPS//

const shipArray = [
    {
        name: "destroyer",
        directions: [
            [0 ,1],
            [0, width]
        ]
    },
    {
        name: "submarine",
        directions: [
            [0, 1, 2],
            [0, width, width * 2]
        ]
    },
    {
        name: "cruiser",
        directions: [
            [0, 1, 2],
            [0, width, width * 2]
        ]
    },
    {
        name: "battleship",
        directions: [
            [0, 1, 2, 3],
            [0, width, width * 2, width * 3]
        ]
    },
    {
        name: "carrier",
        directions: [
            [0, 1, 2, 3, 4],
            [0, width, width * 2, width * 3, width * 4]
        ]
    },
];

//RANDOM COMPUTER SHIPS//

generateShip = (ship) => {
    let randomDirection = Math.floor(Math.random() * ship.directions.length);
    let current = ship.directions[randomDirection];
    if(randomDirection === 0) direction = 1;
    if(randomDirection === 1) direction = 10;
    let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction)));
//CHECK TO SEE IF SQUARE IS TAKEN OR IF SHIP IS AT END OF GAME BOARD (SO NO SHIPS HANG OFF BOARD//
//SATCKFLOW.COM AND W3SCHOOLS//
const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains("taken"));
const rightEnd = current.some(index => (randomStart + index) % width === width - 1);
const leftEnd = current.some(index => (randomStart + index) % width === 0);

if(!isTaken && !rightEnd && !leftEnd) current.forEach(index => computerSquares[randomStart + index].classList.add("taken", ship.name));
else generateShip(ship)
};


generateShip(shipArray[0]);
generateShip(shipArray[1]);
generateShip(shipArray[2]);
generateShip(shipArray[3]);
generateShip(shipArray[4]);





// //=======================//
// //    EVENT LISTENERS    //
// //=======================//
beginButton.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
