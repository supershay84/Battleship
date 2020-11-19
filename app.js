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
const shootButton = document.querySelector("#shoot");
const startButton = document.querySelector("#start");
const rotateButton = document.querySelector("#rotate");
const turnDisplay = document.querySelector("#turn");
const infoDisplay = document.querySelector("#info");


// //===============//
// //  GLOBAL VARS  //
// //===============//

const userSquares = [];
const computerSquares = [];
const width = 10;
let isHorizontal = true;
let isGameOver = false;
let currentPlayer = "user";
let destroyerCount = 0;
let submarineCount = 0;
let cruiserCount = 0;
let battleshipCount = 0;
let carrierCount = 0;
let computerDestroyerCount = 0;
let computerSubmarineCount = 0;
let computerCruiserCount = 0;
let computerBattleshipCount = 0;
let computerCarrierCount = 0;





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


// ROTATE SHIPS //

// rotateShip = () => {
//     if (isHorizontal){
//         destroyer.classList.toggle("destroyer-container-vertical");
//         submarine.classList.toggle("submarine-container-vertical");
//         cruiser.classList.toggle("cruiser-container-vertical");
//         battleship.classList.toggle("battleship-container-vertical");
//         carrier.classList.toggle("carrier-container-vertical");
//         isHorizontal = false;
//         return;
//     }
//     if (!isHorizontal){
//         destroyer.classList.toggle("destroyer-container");
//         submarine.classList.toggle("submarine-container");
//         cruiser.classList.toggle("cruiser-container");
//         battleship.classList.toggle("battleship-container");
//         carrier.classList.toggle("carrier-container");
//         isHorizontal = true;
//         return;
//     }
// }



// USER SHIPS //

generateShip = (ship) => {
    let randomDirection = Math.floor(Math.random() * ship.directions.length);
    let current = ship.directions[randomDirection];
    if(randomDirection === 0) direction = 1;
    if(randomDirection === 1) direction = 10;
    let randomStart = Math.abs(Math.floor(Math.random() * userSquares.length - (ship.directions[0].length * direction)));
//CHECK TO SEE IF SQUARE IS TAKEN OR IF SHIP IS AT END OF GAME BOARD (SO NO SHIPS HANG OFF BOARD//
//SATCKFLOW.COM AND W3SCHOOLS//
const isTaken = current.some(index => userSquares[randomStart + index].classList.contains("taken"));
const rightEnd = current.some(index => (randomStart + index) % width === width - 1);
const leftEnd = current.some(index => (randomStart + index) % width === 0);

if(!isTaken && !rightEnd && !leftEnd) current.forEach(index => userSquares[randomStart + index].classList.add("taken", ship.name));
else generateShip(ship)
};


generateShip(shipArray[0]);
generateShip(shipArray[1]);
generateShip(shipArray[2]);
generateShip(shipArray[3]);
generateShip(shipArray[4]);

//==============//
//  GAME LOGIC  //
//==============//

playGame = () => {
    if (isGameOver) return;
    if (currentPlayer === "user") {
        turnDisplay.innerHTML = "Your Turn"
        computerSquares.forEach(square => square.addEventListener("click", function(e){
            showSquare(square);
        }))
    }
    if (currentPlayer === "computer") {
        turnDisplay.innerHTML = "Computer's Turn"
        setTimeout (computerTurn, 2000);
    }
}




showSquare = (square) => {
  if (!square.classList.contains("kaboom") && currentPlayer === "user" && !isGameOver) {
    if (square.classList.contains("destroyer")) destroyerCount++
    if (square.classList.contains("submarine")) submarineCount++
    if (square.classList.contains("cruiser")) cruiserCount++
    if (square.classList.contains("battleship")) battleshipCount++
    if (square.classList.contains("carrier")) carrierCount++
  }
  if (square.classList.contains("taken")) {
    square.classList.add("kaboom")
    } else {
    square.classList.add("splash")
    }
    determineWin()
   currentPlayer= "computer";
   playGame();
}

computerTurn = () => {
    let random = Math.floor(Math.random() * userSquares.length)
    if (!userSquares[random].classList.contains("kaboom")) {
        if (userSquares[random].classList.contains("destroyer")) computerDestroyerCount++
        if (userSquares[random].classList.contains("submarine")) computerSubmarineCount++
        if (userSquares[random].classList.contains("cruiser")) computerCruiserCount++
        if (userSquares[random].classList.contains("battleship")) computerBattleshipCount++
        if (userSquares[random].classList.contains("carrier")) computerCarrierCount++
    
    if (userSquares[random].classList.contains("taken")){
        userSquares[random].classList.add("kaboom")
    }
    if (!userSquares[random].classList.contains("taken")) {
        userSquares[random].classList.add("splash")
    }
    currentPlayer = "user"
    turnDisplay.innerHTML = "Your Turn" 
}
 determineWin();
}


//  WIN LOGIC //

determineWin = () => {
    if (destroyerCount === 2) {
        infoDisplay.innerHTML = "You sunk the enemy Destroyer!"
        destroyerCount = 10
    }
    if (submarineCount === 3) {
        infoDisplay.innerHTML = "You sunk the enemy Submarine!"
        submarineCount = 10
    }
    if (cruiserCount === 3) {
        infoDisplay.innerHTML = "You sunk the enemy Cruiser!"
        cruiserCount = 10
    }
    if (battleshipCount === 4) {
        infoDisplay.innerHTML = "You sunk the enemy Battleship!"
        battleshipCount = 10
    }
    if (carrierCount === 5) {
        infoDisplay.innerHTML = "You sunk the enemy Carrier!"
        carrierCount = 10
    }
    if (computerDestroyerCount === 2) {
        infoDisplay.innerHTML = "Your Destroyer was sunk!"
        computerDestroyerCount = 10
    }
    if (computerSubmarineCount === 3) {
        infoDisplay.innerHTML = "Your Submarine was sunk!"
        computerSubmarineCount = 10
    }
    if (computerCruiserCount === 3) {
        infoDisplay.innerHTML = "Your Cruiser was sunk!"
        computerCruiserCount = 10
    }
    if (computerBattleshipCount === 4) {
       infoDisplay.innerHTML = "Your Battleship was sunk!"
        computerBattleshipCount = 10
    }
    if (computerCarrierCount === 5) {
        infoDisplay.innerHTML = "Your Carrier was sunk!"
        computerCarrierCount = 10
    }
    
    if ((destroyerCount + submarineCount + cruiserCount + battleshipCount + carrierCount) === 50) {
        infoDisplay.innerHTML = "You destroyed the enemy fleet! YOU WIN!"
        gameOver();
    }
    if ((computerDestroyerCount + computerSubmarineCount + computerCruiserCount + computerBattleshipCount + computerCarrierCount) === 50) {
        infoDisplay.innerHTML = "The computer destroyed your fleet! YOU Lose!"
        gameOver();
    }
}



gameOver = () => {
    isGameOver = true
    startButton.removeEventListener("click", playGame)

 }



 

// //=======================//
// //    EVENT LISTENERS    //
// //=======================//
beginButton.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
startButton.addEventListener("click", playGame);
// rotateButton.addEventListener("click", rotateShip);












// // DRAG AND DROP USER SHIPS //

// // DRAG AND DROP FUNCTIONS//
// // web.dev/drag-and-drop //

// let selectedShipNameWithIndex
// let draggedShip
// let draggedShipLength


// ships.forEach(ship => ship.addEventListener("mousedown", (e) => {
//     selectedShipNameWithIndex = e.target.id  
//     console.log(selectedShipNameWithIndex)
// }))



// dragStart = () =>  {
//     draggedShip = this
//     draggedShipLength = document.querySelectorAll(`.${draggedShip.classList[1]} > *`).length;
//     console.log(draggedShip)
// }

// dragOver = (e) =>  {
//     e.preventDefault()
// }

// dragEnter = (e) =>  {
//     e.preventDefault()
// }

// dragLeave = () =>  {
//     console.log("drag leave")
// }

// dragDrop = () => {
//     let shipNameWithLastId = draggedShip.lastElementChild.id
//     let shipClass = shipNameWithLastId .slice(0, -2)
//     console.log(shipClass)
//     let lastShipIndex = parseInt(shipNameWithLastId.substr(-1)) // parseInt() Converts a string to number//
//     let shipLastId = lastShipIndex + parseInt(this.dataset.id)
//     console.log(shipLastId)

//     selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))
   
//     shipLastId = shipLastId - selectedShipIndex
//     console.log(shipLastId)
   
//     if (isHorizontal) {
//         for (let i = 0; i < draggedShipLength; i++) {
//             userSquares[parseInt(this.dataset.id) - selectedShipIndex + i].classList.add("taken",  shipClass)
//         }
//     } else if (!isHorizontal) {
//         for (let i = 0; i < draggedShipLength; i++) {
//             userSquares[parseInt(this.dataset.id) - selectedShipIndex + width * i].classList.add("taken", shipClass);
//         }
//     } else return;
    
//    displayGrid.removeChild(draggedShip);
// }

// dragEnd = () =>  {

// }

// ships.forEach(ship => ship.addEventListener("dragstart", dragStart));
// userSquares.forEach(square => square.addEventListener("dragstart", dragStart));
// userSquares.forEach(square => square.addEventListener("dragover", dragOver));
// userSquares.forEach(square => square.addEventListener("dragenter", dragEnter));
// userSquares.forEach(square => square.addEventListener("dragleave", dragLeave));
// userSquares.forEach(square => square.addEventListener("drop", dragDrop));
// userSquares.forEach(square => square.addEventListener("dragend", dragEnd));




