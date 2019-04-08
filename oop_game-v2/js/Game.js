/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
            new Phrase('PHRASE one'),
            new Phrase('PHRASE two'),
            new Phrase('PHRASE three'),
            new Phrase('PHRASE four'),
            new Phrase('PHRASE five')
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
        return this.phrases[Math.floor(Math.random() * 5)];
    }

    // handle input
    handleInteraction(button) {
        button.disabled = true;
        // If letter mathces
        if (this.activePhrase.checkLetter(button.textContent)) {
            button.classList.add('chosen');
            this.activePhrase.showMatchedLetter(button.textContent);
            if (this.checkForWin()) { this.gameOver('win') }
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


