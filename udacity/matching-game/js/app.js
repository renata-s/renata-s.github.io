/*jshint esversion: 6 */

/**
* @description Matching Game 
* @constructor
* @param {HtmlElement} containerEl - container element
*/
class MatchingGame {
    constructor(containerEl) {
        this.container = containerEl;
        this.cards = [...containerEl.getElementsByClassName('card')];
        this.openedCards = [];
        this.minute = 0;
        this.second = 0;
        this.deck = containerEl.getElementsByClassName('deck')[0];
        this.matchedCard = containerEl.getElementsByClassName('match');
        this.popup = containerEl.querySelector('.modal');
        this.popupBtn = containerEl.querySelector('.modal-btn');
        this.popupBtn.addEventListener('click', this.playAgain.bind(this));
        this.movesElement = containerEl.querySelector('.moves');
        this.moves = 0;
        this.timerStarted = false;
        this.stars = containerEl.querySelectorAll('.stars li');
        this.timer = containerEl.querySelector('.timer');

        containerEl.querySelector('.restart').addEventListener('click', this.restart.bind(this));
        let game = this;
        this.cards.forEach(function (card) {
            card.addEventListener('click', game.showCard.bind(game));
            card.addEventListener('click', game.checkCards.bind(game));
            card.addEventListener('click', game.checkForGameVictory.bind(game));
        });

        this.restart();
    }

    /**
    * @description restart game 
    */
    restart() {
        // shuffle deck
        this.cards = this.shuffle(this.cards);
        // remove all exisiting classes from each card
        this.deck.innerHTML = '';
        for (let i = 0; i < this.cards.length; i++) {
            let card = this.cards[i];
            card.classList.remove('show', 'open', 'match', 'disabled');
            this.deck.appendChild(card);
        }
        // reset moves
        this.openedCards = [];
        this.movesElement.innerHTML = 0;
        this.moves = 0;
        //reset timer
        this.timerStarted = false;
        this.timer.innerHTML = '0 mins 0 secs';
        clearInterval(this.interval);
        this.minute = 0;
        this.second = 0;
        // reset star rating
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].style.color = '#FFD700';
            this.stars[i].style.visibility = 'visible';
        }
    }

    /**
    * @description toggles open and show class to display cards
    */
    showCard(el) {
        el.currentTarget.classList.toggle('open');
        el.currentTarget.classList.toggle('show');
        el.currentTarget.classList.toggle('disabled');
    }

    /**
    * @description add opened cards to openedCards list and check if cards are match or not
    */
    checkCards(el) {
        if (!this.timerStarted) {
            this.timerStarted = true;
            this.startTimer();
        }
        let card = el.currentTarget;
        this.openedCards.push(card);

        if (this.openedCards.length === 2) {
            this.incrementMoves();
            if (this.openedCards[0].querySelector('i').classList[1] == this.openedCards[1].querySelector('i').classList[1]) {
                this.matches();
            } else {
                this.unmatches();
            }
        }
    }

    /**
    * @description shuffles cards
    * @param {array}
    * @returns shuffledarray
    */
    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    /**
     * @description count player's moves
    */
    incrementMoves() {
        this.moves = this.moves + 1;
        this.movesElement.innerHTML = this.moves;

        // setting stars rating
        switch (this.moves) {
            case 8:
                this.stars[2].style.color = 'black';
                break;
            case 15:
                this.stars[1].style.color = 'black';
                break;
        }
    }

    /**
     * @description for start timer
    */
    startTimer() {
        let game = this;
        this.interval = setInterval(function () {
            game.timer.innerHTML = game.minute + ' mins ' + game.second + ' secs';
            game.second++;
            if (game.second === 60) {
                game.minute++;
                game.second = 0;
            }
        }, 1000);
    }

    /**
     * @description cards match
    */
    matches() {
        this.openedCards[0].classList.add('match', 'disabled');
        this.openedCards[0].classList.remove('show', 'open', 'no-event');
        this.openedCards[1].classList.add('match', 'disabled');
        this.openedCards[1].classList.remove('show', 'open', 'no-event');
        this.openedCards = [];
    }

    /**
     * @description when cards unmatched
    */
    unmatches() {
        this.openedCards[0].classList.add('unmatched');
        this.openedCards[1].classList.add('unmatched');
        this.disable();
        let game = this;
        setTimeout(function () {
            game.openedCards[0].classList.remove('show', 'open', 'no-event', 'unmatched');
            game.openedCards[1].classList.remove('show', 'open', 'no-event', 'unmatched');
            game.enable();
            game.openedCards = [];
        }, 1000);
    }

    /**
     * @description disable cards
    */
    disable() {
        this.cards.forEach(function (card) {
            card.classList.add('disabled');
        });
    }

    /**
     * @description enable cards and disable matched cards
    */
    enable() {
        let game = this;
        this.cards.forEach(function (card) {
            card.classList.remove('disabled');
            for (let i = 0; i < game.matchedCard.length; i++) {
                game.matchedCard[i].classList.add('disabled');
            }
        });
    }

    /**
     * @description for game victory when all cards match, show modal
     */
    checkForGameVictory() {
        if (this.matchedCard.length === this.cards.length) {
            clearInterval(this.interval);
            this.congratulationsPopup();
        }
    }

    /**
     * @description showing final stars, total moves and total time on modal
     */
    congratulationsPopup() {
        this.popup.classList.toggle('show-modal');
        this.container.querySelector('#final-stars').innerHTML = this.container.querySelector('.stars').innerHTML;
        this.container.querySelector('#totalTime').innerHTML = this.timer.innerHTML;
        this.container.querySelector('#totalMoves').innerHTML = this.moves;
    }

    /**
     * @desciption for user to play again
    */
    playAgain() {
        this.popup.classList.toggle('show-modal');
        this.restart();
    }
}

/** 
 * @desciption for load new game
*/
document.body.onload = function () {
    (() => new MatchingGame(document.getElementById('matching-game')))();
};