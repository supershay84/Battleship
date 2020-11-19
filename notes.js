// DRAG AND DROP USER SHIPS //

// DRAG AND DROP FUNCTIONS//
// web.dev/drag-and-drop //

let selectedShipNameWithIndex
let draggedShip
let draggedShipLength


ships.forEach(ship => ship.addEventListener("mousedown", (e) => {
    selectedShipNameWithIndex = e.target.id  
    console.log(selectedShipNameWithIndex)
}))



dragStart = () =>  {
    draggedShip = this
    draggedShipLength = document.querySelectorAll(`.${draggedShip.classList[1]} > *`).length;
    console.log(draggedShip)
}

dragOver = (e) =>  {
    e.preventDefault()
}

dragEnter = (e) =>  {
    e.preventDefault()
}

dragLeave = () =>  {
    console.log("drag leave")
}

dragDrop = () => {
    let shipNameWithLastId = draggedShip.lastElementChild.id
    let shipClass = shipNameWithLastId .slice(0, -2)
    console.log(shipClass)
    let lastShipIndex = parseInt(shipNameWithLastId.substr(-1)) // parseInt() Converts a string to number//
    let shipLastId = lastShipIndex + parseInt(this.dataset.id)
    console.log(shipLastId)

    selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))
   
    shipLastId = shipLastId - selectedShipIndex
    console.log(shipLastId)
   
    if (isHorizontal) {
        for (let i = 0; i < draggedShipLength; i++) {
            userSquares[parseInt(this.dataset.id) - selectedShipIndex + i].classList.add("taken",  shipClass)
        }
    } else if (!isHorizontal) {
        for (let i = 0; i < draggedShipLength; i++) {
            userSquares[parseInt(this.dataset.id) - selectedShipIndex + width * i].classList.add("taken", shipClass);
        }
    } else return;
    
   displayGrid.removeChild(draggedShip);
}

dragEnd = () =>  {

}

ships.forEach(ship => ship.addEventListener("dragstart", dragStart));
userSquares.forEach(square => square.addEventListener("dragstart", dragStart));
userSquares.forEach(square => square.addEventListener("dragover", dragOver));
userSquares.forEach(square => square.addEventListener("dragenter", dragEnter));
userSquares.forEach(square => square.addEventListener("dragleave", dragLeave));
userSquares.forEach(square => square.addEventListener("drop", dragDrop));
userSquares.forEach(square => square.addEventListener("dragend", dragEnd));






// ========================================================================================




function checkForWins() {
    let enemy = 'computer'
    if (destroyerCount === 2) {
      infoDisplay.innerHTML = `You sunk the ${enemy}'s destroyer`
      destroyerCount = 10
    }
    if (submarineCount === 3) {
      infoDisplay.innerHTML = `You sunk the ${enemy}'s submarine`
      submarineCount = 10
    }
    if (cruiserCount === 3) {
      infoDisplay.innerHTML = `You sunk the ${enemy}'s cruiser`
      cruiserCount = 10
    }
    if (battleshipCount === 4) {
      infoDisplay.innerHTML = `You sunk the ${enemy}'s battleship`
      battleshipCount = 10
    }
    if (carrierCount === 5) {
      infoDisplay.innerHTML = `You sunk the ${enemy}'s carrier`
      carrierCount = 10
    }
    if (cpuDestroyerCount === 2) {
      infoDisplay.innerHTML = `${enemy} sunk your destroyer`
      cpuDestroyerCount = 10
    }
    if (cpuSubmarineCount === 3) {
      infoDisplay.innerHTML = `${enemy} sunk your submarine`
      cpuSubmarineCount = 10
    }
    if (cpuCruiserCount === 3) {
      infoDisplay.innerHTML = `${enemy} sunk your cruiser`
      cpuCruiserCount = 10
    }
    if (cpuBattleshipCount === 4) {
      infoDisplay.innerHTML = `${enemy} sunk your battleship`
      cpuBattleshipCount = 10
    }
    if (cpuCarrierCount === 5) {
      infoDisplay.innerHTML = `${enemy} sunk your carrier`
      cpuCarrierCount = 10
    }

    if ((destroyerCount + submarineCount + cruiserCount + battleshipCount + carrierCount) === 50) {
      infoDisplay.innerHTML = "YOU WIN"
      gameOver()
    }
    if ((cpuDestroyerCount + cpuSubmarineCount + cpuCruiserCount + cpuBattleshipCount + cpuCarrierCount) === 50) {
      infoDisplay.innerHTML = `${enemy.toUpperCase()} WINS`
      gameOver()
    }
  }

  function gameOver() {
    isGameOver = true
    startButton.removeEventListener('click', playGameSingle)
  }


