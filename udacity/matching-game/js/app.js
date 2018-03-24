/*
 * Create a list that holds all of your cards
 */

class MatchingGame {
    constructor(containerEl) {
        this.container = containerEl;
        this.cards = [...containerEl.getElementsByClassName('card')];
        this.openedCards = [];

        this.deck = containerEl.getElementsByClassName('deck')[0];
        this.matchedCard = containerEl.getElementsByClassName('match');
        this.moves = containerEl.querySelector('.moves');
        this.stars = containerEl.querySelector('.stars');
        containerEl.querySelector('.restart').addEventListener('click', this.restart.bind(this));
        let game = this;
        this.cards.forEach(function(card){
            card.addEventListener('click', game.showCard.bind(game))
        })

        this.restart();
    }

    restart() {
        this.cards = this.shuffle(this.cards);
        this.deck.innerHTML = '';
        for (let i = 0; i < this.cards.length; i++) {
            let card = this.cards[i];
            card.classList.remove('show', 'open', 'match');
            this.deck.appendChild(card);
        }
    }

    showCard(el){
        el.currentTarget.classList.toggle("open");
        el.currentTarget.classList.toggle("show");
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
