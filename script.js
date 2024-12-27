let boxes = document.querySelectorAll(".box");
let restBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true; // playerX , player0
let count = 0; // To Track Draw

// WinPlayers patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Create reset game function
const resetGame = () => {
    turnX = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide"); // we  hide pst winner-message after when the new game starting  
};


// add eventListiner for box 
boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if (turnX) {    // if(turnO) as same as if i write if(turnO===true) 
            box.innerText = "X";
            turnX = false;
        } else {
            // player X
            box.innerText = "0";
            turnX = true;
        }
        box.disabled = true; // when you clicked the box first time then  this is box is disable so value not entered 2nd time
        count++;


        let isWinner = checkWinner();  // call the function

        if (count === 9 && !isWinner) {
            gameDraw(); // Calling gameDraw function
        }
    });
});

// Create a function when game was draw
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

// disswable the button after showing the who is winner
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
// enable the button when the new game start
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = ""; // When new game start erage the past value
    }
};

// showing the message
const showWinner = (winner) => {
    msg.innerText = `Congratulations the winner is ${winner}`;
    msgContainer.classList.remove("hide"); // we remove hide class after showing the winner
    disableBoxes();
};

// Check the winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {

                showWinner(pos1val);   // Call the showing the winner message function
                return true;

            }
        }
    }
};

// rest game function call  whenwe click new game button
newGameBtn.addEventListener("click", resetGame);
// rest game function call  whenwe click reset button
restBtn.addEventListener("click", resetGame);
