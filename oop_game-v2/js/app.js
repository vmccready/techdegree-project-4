/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */


 //
 const startButton = document.querySelector('#btn__reset');
 const overlay = document.querySelector('#overlay');
 const keyBoardButtons = document.querySelectorAll('#qwerty button.key');
 const keyBoard = document.getElementById('qwerty');
 const game = new Game();

// start game with start button
startButton.addEventListener('click', event => {
    //overlay.style.display = 'none';
    game.startGame();
});

//listeners on each key
keyBoardButtons.forEach(key => {
    key.addEventListener('click', event => {
        game.handleInteraction(event.target);
    });
});

//add keydown listener
document.addEventListener('keydown', event=> {
    //only on letters
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        const letter = String.fromCharCode(event.keyCode).toLowerCase();
        //activate button
        keyBoardButtons.forEach(button => {
            if (button.textContent === letter) {
                if(!button.disabled){
                    game.handleInteraction(button);
                }
            }
        });
    }
});