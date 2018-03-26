/*
 * Create a list that holds all of your cards
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
        this.popupBtn.addEventListener("click", this.playAgain.bind(this))
        this.movesElement = containerEl.querySelector('.moves');
        this.moves = 0;
        this.timerStarted = false;
        this.interval;
        this.stars = containerEl.querySelector('.stars');
        this.timer = containerEl.querySelector(".timer");
        containerEl.querySelector('.restart').addEventListener('click', this.restart.bind(this));
        let game = this;
        this.cards.forEach(function (card) {
            card.addEventListener('click', game.showCard.bind(game))
            card.addEventListener('click', game.checkCards.bind(game))
            card.addEventListener('click', game.checkForGameVictory.bind(game))
        })

        this.restart();
    }

    restart() {
        this.cards = this.shuffle(this.cards);
        this.deck.innerHTML = '';
        for (let i = 0; i < this.cards.length; i++) {
            let card = this.cards[i];
            card.classList.remove('show', 'open', 'match', 'disabled');
            this.deck.appendChild(card);
        }
        this.openedCards = [];
        this.movesElement.innerHTML = 0;
        this.moves = 0;
        this.timerStarted = false;
        this.timer.innerHTML = "0 mins 0 secs";
        clearInterval(this.interval);
        this.minute = 0;
        this.second = 0;
    }

    showCard(el) {
        el.currentTarget.classList.toggle("open");
        el.currentTarget.classList.toggle("show");
        el.currentTarget.classList.toggle("disabled");
    }

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

    // Shuffle function from http://stackoverflow.com/a/2450976
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

    incrementMoves() {
        this.moves = this.moves + 1;
        this.movesElement.innerHTML = this.moves;
        //TODO: lower stars
    }

    startTimer() {
        let game = this;
        this.interval = setInterval(function () {
            game.timer.innerHTML = game.minute + "mins " + game.second + "secs";
            game.second++;
            if (game.second === 60) {
                game.minute++;
                game.second = 0;
            }
        }, 1000);
    }

    matches() {
        this.openedCards[0].classList.add("match", "disabled");
        this.openedCards[0].classList.remove("show", "open", "no-event");
        this.openedCards[1].classList.add("match", "disabled");
        this.openedCards[1].classList.remove("show", "open", "no-event");
        this.openedCards = [];
    }

    unmatches() {
        this.openedCards[0].classList.add("unmatched");
        this.openedCards[1].classList.add("unmatched");
        this.disable();
        let game = this;
        setTimeout(function () {
            game.openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
            game.openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
            game.enable();
            game.openedCards = [];
        }, 1000);
    }

    disable() {
        this.cards.forEach(function (card) {
            card.classList.add('disabled');
        });
    }

    enable() {
        let game = this;
        this.cards.forEach(function (card) {
            card.classList.remove('disabled');
            for (let i = 0; i < game.matchedCard.length; i++) {
                game.matchedCard[i].classList.add("disabled");
            }
        });
    }

    checkForGameVictory() {
        if (this.matchedCard.length === this.cards.length) {
            this.congratulationsPopup();
        }
    }

    congratulationsPopup() {
        this.popup.classList.toggle("show-modal");
    }

    playAgain() {
        this.popup.classList.toggle("show-modal");
        this.restart();
    }

}

document.body.onload = function () {
    let game = new MatchingGame(document.getElementById('matching-game'));
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
