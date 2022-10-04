const candyBoard = document.querySelector(".candy-grid")
const scoreElement = document.getElementById("score")
const numOfSquareperRow = 8;
const squares = [];
let score = 0



const candy = [
    "url('assets/img/blue-candy.png')",
    "url('assets/img/green-candy.png')",
    "url('assets/img/orange-candy.png')",
    "url('assets/img/purple-candy.png')",
    "url('assets/img/red-candy.png')",
    "url('assets/img/yellow-candy.png')"
]



function populatedBoard() {
    for (let index = 0; index < numOfSquareperRow * numOfSquareperRow; index++) {
        const square = document.createElement("div")
        const randomCandy = Math.floor(Math.random() * candy.length)
        console.log(randomCandy)
        square.style.backgroundImage = candy[randomCandy]

        square.setAttribute("draggable", true)
        square.setAttribute("id", index)


        candyBoard.appendChild(square)
        squares.push(square)
    }
}
populatedBoard()

let candyBeingDragged;
let candyIdBeingDragged;
let candyBeingDropped;
let candyIdBeingDropped;


squares.forEach((square) => square.addEventListener("dragstart", dragStart))
squares.forEach((square) => square.addEventListener("dragend", dragEnd))
squares.forEach((square) => square.addEventListener("dragover", dragOver))
squares.forEach((square) => square.addEventListener("dragenter", dragEnter))
squares.forEach((square) => square.addEventListener("dragleave", dragLeave))
squares.forEach((square) => square.addEventListener("drop", dragDrop))

function dragStart(event) {
    console.log(this.id, 'drag started')
    // this.classList.add('dragging')
    event.target.classList.add('dragging')

    candyBeingDragged = this.style.backgroundImage
    // candyIdBeingDragged = parseInt(this.id)
    candyIdBeingDragged = +this.id
}


function dragOver(event) {
    console.log(this.id, "drag over")
    this.style.border = '1px solid black'
    event.preventDefault()

}

function dragEnter(event) {
    console.log(this.id, 'drag enter')
    event.preventDefault()
}

function dragLeave(event) {
    console.log(this.id, 'drag leave')
    this.style.border = 'none'
}

function dragDrop(event) {
    console.log(this.id, 'drop')
    this.style.border = 'none'

    candyBeingDropped = this.style.backgroundImage
    candyIdBeingDropped = + this.id;

    this.style.backgroundImage = candyBeingDragged
    squares[candyIdBeingDragged].style.backgroundImage = candyBeingDropped;
}
function dragEnd(event) {
    console.log(this.id, 'drag ended')
    // this.classList.remove('dragging')
    event.target.classList.remove('dragging')
    const validMoves = [
        candyIdBeingDragged - 1,
        candyIdBeingDragged - numOfSquareperRow,
        candyIdBeingDragged + numOfSquareperRow,
        candyIdBeingDragged + 1,

    ]

    const isValidMove = validMoves.includes(candyIdBeingDropped);

    if (candyIdBeingDropped && isValidMove) {
        
        const isColumnOfFourMatched = checkColumnForFour();
        const isRowOfFourMatched= checkRowForFour();
        const isRowOfThreeMatched = checkRowForThree();
        const isColumnOfThreeMatched = checkColumnForThree();

        if (!isRowOfThreeMatched && !isColumnOfThreeMatched&&!isColumnOfFourMatched&&!isRowOfFourMatched) {
            squares[candyIdBeingDropped].style.backgroundImage = candyBeingDropped;
            squares[candyIdBeingDragged].style.backgroundImage = candyBeingDragged;
        }

    } else if (candyIdBeingDropped && !isValidMove) {
        squares[candyIdBeingDropped].style.backgroundImage = candyBeingDropped;
        squares[candyIdBeingDragged].style.backgroundImage = candyBeingDragged;
    }
}

function checkRowForThree() {
    for (let index = 0; index <= 61; index++) {
        const rowOfThree = [index, index + 1, index + 2];
        const decidingCandy = squares[index].style.backgroundImage;
        const isBlank = squares[index].style.backgroundImage === "";
        const notValidAreas = [
            6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55
        ]
      
        if (notValidAreas.includes(index)) {
            continue;
        }

        if (rowOfThree.every((item) => squares[item].style.backgroundImage === decidingCandy && !isBlank)){
        score += 3;
        scoreElement.textContent = score;
        rowOfThree.forEach((val)=>(squares[val].style.backgroundImage =""))
            return true;
        }
    }
    return false;
}


function checkColumnForThree() {
    for (let index = 0; index <= 47; index++) {
        const columnOfThree = [
            index,
            index + numOfSquareperRow,
            index + numOfSquareperRow * 2,
        ];
        const decidingCandy = squares[index].style.backgroundImage
        const isBlank = squares[index].style.backgroundImage === "";
        const isMatched = columnOfThree.every(
            (item) => squares[item].style.backgroundImage === decidingCandy && !isBlank
        );

        if (isMatched) {
            score += 3;
            scoreElement.textContent = score;
            columnOfThree.forEach((val) => (squares[val].style.backgroundImage = ""));

            return true;
        }
    }
    return false;
}
function checkRowForFour(){
    for (let index = 0; index < 60 ; index++) {
        const rowOfFour= [index, index + 1,index+ 2,index+3];
        const decidingCandy= squares[index].style.backgroundImage;
        const isBlank= squares[index].style.backgroundImage==="";

        const notValidAreas= [
            5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,
        ];

        if(notValidAreas.includes(index)){
            continue;
        }
        
        const isMatched= rowOfFour.every((item)=>squares[item].style.backgroundImage===decidingCandy&& !isBlank);

        if (isMatched){
            score+= 4;
            scoreElement.textContent= score;
            rowOfFour.forEach((val) => (squares[val].style.backgroundImage=""));
            return true;
        }
    }
    return false
}

function checkColumnForFour(){
    for(let index= 0;index< 39;index ++ ){
        const columnOfFour=[
            index,
            index + numOfSquareperRow,
            index + numOfSquareperRow*2,
            index + numOfSquareperRow*3,
        ];
        const decidingCandy = squares[index].style.backgroundImage;
        const isBlank= squares[index].style.backgroundImage==="";

        const isMatched= columnOfFour.every(
            (item)=> squares[item].style.backgroundImage===decidingCandy&& !isBlank
        );
        if(isMatched){
            score+=4;
            scoreElement.textContent= score;
            columnOfFour.forEach((val)=> (squares[val].style.backgroundImage=""));
            return true 
        }
    }
}

function moveDownCandies() {
    for (let index = 0; index <= 55; index++) {
        const isSquareBlankBelow = squares[index + numOfSquareperRow].style.backgroundImage === ""
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
        firstRow.forEach(val => {
            if (squares[val].style.backgroundImage === "") {
                const randomCandy = Math.floor(Math.random() * candy.length)
                squares[val].style.backgroundImage = candy[randomCandy]
            }
        })
        if (isSquareBlankBelow) {
            squares[index + numOfSquareperRow].style.backgroundImage = squares[index].style.backgroundImage

            squares[index].style.backgroundImage = ""
        }
    }
}


setInterval(() => {
    moveDownCandies()
    checkColumnForFour()
    checkRowForFour()
    checkRowForThree()
    checkColumnForThree();
}, 100)

