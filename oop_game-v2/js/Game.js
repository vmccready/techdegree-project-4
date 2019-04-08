/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
            new Phrase('Object Oriented'),
            new Phrase('Callback Functions'),
            new Phrase('Array Iteration'),
            new Phrase('Event Listeners'),
            new Phrase('HTML and CSS')
        ]
        this.activePhrase = null;
    }

    //resets game, remove overlay, displays phrase
    startGame() {
        this.resetGame();
        $('#overlay').fadeOut();
        //overlay.style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * (this.phrases.length))];
    }

    // handle input
    handleInteraction(button) {
        button.disabled = true;
        // If letter mathces
        if (this.activePhrase.checkLetter(button.textContent)) {
            button.classList.add('chosen');
            this.activePhrase.showMatchedLetter(button.textContent);
            //if Win
            if (this.checkForWin()) { 
                //disable buttons so phrase shows for a second
                $('#qwerty button').attr('disabled', true);
                setTimeout(()=> {this.gameOver('win')}, 1500); 
            }
        } else {
            button.classList.add('wrong');
            this.removeLife();
        }
    }

    // if missed, remove life and check if lose
    removeLife() {
        this.missed += 1;
        const heart = document.querySelector('img[src*=liveHeart]');
        heart.setAttribute('src', 'images/lostHeart.png');
        if (this.missed === 5) { this.gameOver('lose') }
        $('body').css('background-color', `rgb(217, 69, 69, ${this.missed*.2}`);
    }
//217, 69, 69
    checkForWin() {
        return document.querySelectorAll('#phrase li[class*=hide]').length == 0;
    }

    // end game, fade in overlay
    gameOver(outcome) {
        const message = document.getElementById('game-over-message');
        overlay.setAttribute('class', outcome);
        if (outcome === 'win') {
            message.textContent = 'You Win!'
        } else { message.textContent = 'You lose.' }
        //overlay.style.display = '';
        $('#overlay').fadeIn();
    }

    resetGame() {
        //clear phrase li's
        document.querySelectorAll('#phrase li').forEach(li => li.remove());
        //clear buttons
        document.querySelectorAll('#qwerty button').forEach(button => {
            button.setAttribute('class', 'key');
            button.disabled = false;
        });
        //clear hearts
        document.querySelectorAll('img[src*=lostHeart]').forEach(img => {
            img.setAttribute('src', 'images/liveHeart.png');
        });
        //clear tries
        this.missed = 0;
        $('body').css('background-color', '');
    }
}


