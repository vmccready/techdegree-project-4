/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase{
    constructor(phrase) {
      this.phrase = phrase.toLowerCase();
    }
    
    //Create list item for every letter in phrase
     addPhraseToDisplay() {
         const phraseList = document.querySelector('#phrase ul');
         this.phrase.split('').forEach(char => {
            const li = document.createElement('li');
            //li for space or letters
            if (char === ' ') {    
                li.classList.add('space');
                li.textContent = ' ';
            } else {
                li.classList.add(`hide`, `letter` ,`${char}`);
                li.textContent = `${char}`;
            }
            phraseList.append(li);
         });
     } 

     // Check if a letter is in the phrase
     checkLetter(letter) {
         return this.phrase.indexOf(letter) > -1;
     }

     // Show a letter
     showMatchedLetter(letter) {
         const lettersToShow = document.querySelectorAll(`#phrase li.letter.${letter}`);
         lettersToShow.forEach(element => {
             element.classList.remove('hide');
             element.classList.add('show');
         });
     }

}



