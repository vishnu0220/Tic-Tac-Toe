let boxes = document.querySelectorAll(".box");
let resetGameButton = document.querySelector("#resetBtn");
let newGameButton = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");

let turnO = true; // PlayerX
let buttonClickCount = 0;


const resetGame = ()=> {
    buttonClickCount = 0;
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const winningPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

let changecolorOfO = (box) => {
    box.style.backgroundColor = "yellow";
};

let changecolorOfX = (box) => {
    box.style.backgroundColor = "lightgreen";
};

boxes.forEach((box) => {
    box.addEventListener("click", ()=> {
        // console.log("Box was clicked");
        // console.dir(box);
        buttonClickCount++;
        if(turnO) { // Player X
            box.innerText = "O";
            changecolorOfO(box);
            turnO = false;
        }
        else{ // Player Y
            box.innerText = "X";
            changecolorOfX(box);
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for (box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText ="";
        box.style.backgroundColor = "lightyellow";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations Winner is ${winner}`;
    msgContainer.classList.remove("hide");
};

const drawMatch = () => {
    msg.innerText = "It's a Draw";
    msgContainer.classList.remove("hide");
};

const checkWinner = () =>{
    if(buttonClickCount === 9){
        drawMatch();
    }
    else {
        for(let pattern of winningPatterns) {
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;
            
            if(pos1Val != "" && pos2Val!= "" && pos3Val !="") {
                if(pos1Val === pos2Val && pos2Val === pos3Val) {
                    // console.log("winner", pos1Val);
                    disableBoxes();
                    showWinner(pos1Val);
                }
            }
        }
    }
};

newGameButton.addEventListener("click", resetGame);
resetGameButton.addEventListener("click", resetGame);