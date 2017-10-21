import mobx, { observable, computed } from 'mobx'

const expand = n => Object.keys([...Array(n)])
const remove = (arr, item) => arr.filter(arrItem => arrItem !== item) // TODO: or splice

export const shuffle = (arr, { lo, hi, mutable = false } = {}) => {
  if (!mutable) arr = arr.slice(lo, hi);

  var len = arr.length;
  var temp;
  lo = lo || 0;
  hi = hi || arr.length;
  if (len <= 1) return arr;
  for (var i = lo; i < hi; i++) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    temp = arr[randomIndex];
    arr[randomIndex] = arr[i];
    arr[i] = temp;
  }

  return arr;
};

const IMGS = expand(12).map(n => require(`./cardimgs/img${n}.jpg`))

const BACK = 'BACK'
const FRONT = 'FRONT'
const DONE = 'DONE'
const INVALID = 'INVALID'
export class Card {
  @observable state = BACK
  constructor(name) {
    this.name = name
    this.img = IMGS[+name % 12]
  }
  static generateSet() {
    return expand(12).reduce(
      (arr, n) => [...arr, new Card(n), new Card(n)],
      []
    )
  }
  flip = () => { this.state = FRONT }
  flipDown = () => { this.state = BACK }
  markInvalid = () => { this.state = INVALID }
  @computed get isFaceup() {
    return [FRONT, DONE, INVALID].includes(this.state)
  }

  @computed get isDone() {
    return this.state === DONE
  }

  @computed get isInvalid() {
    return this.state === INVALID
  }

  get isFacedown() {
    return this.state === BACK
  }
}

export class ObservableMemoryGame {
  @observable isGameOver = false
  @observable cards = []

  @computed get flippedCards() {
    return this.cards.filter(
      card => card.state === FRONT
    )
  }
  @computed get doneCards() {
    return this.cards.filter(
      card => card.state === DONE
    )
  }

  @computed get invalidCards() {
    return this.cards.filter(
      card => card.state === INVALID
    )
  }
  constructor() {
    this.cards = shuffle(Card.generateSet())
  }
  shuffle = () => { this.cards = shuffle(this.cards) }
  reset = () => { this.cards = shuffle(Card.generateSet()) }

  flipCard = card => {
    const { doneCards, flippedCards, invalidCards } = this
    if (card.state === DONE) return;
    if (flippedCards.length >= 2) return;
    if (invalidCards.length >= 2) return;

    if (card.isFacedown) {
      card.flip()
      if (this.flippedCards.length === 2) {
        this.checkPair(...this.flippedCards);
        const errorCards = this.flippedCards
        errorCards.map(card => card.markInvalid())
        setTimeout(() => {
          errorCards.map(card => card.flipDown())
        }, 2000);
      }
    }
  }

  checkPair = (cardA, cardB) => {
    if (cardA.name === cardB.name) {
      cardA.state = cardB.state = DONE
      this.checkGameOver()
    }
  }

  checkGameOver = () => {
    if (this.doneCards.length === 24) {
      this.isGameOver = true
    }
  }
}

export default new ObservableMemoryGame