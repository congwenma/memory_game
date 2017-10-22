import mobx, { observable, computed } from 'mobx'

const expand = n => Object.keys([...Array(n)])
const remove = (arr, item) => arr.filter(arrItem => arrItem !== item) // TODO: or splice

export const shuffle = (a) => {
  a = [...a]
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a
}

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
  markDone = () => { this.state = DONE }

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
  @computed get isGameOver() {
    return this.doneCards.length === 24
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
      } else {
        setTimeout(() =>
          this.flippedCards.map(card => card.flipDown()), 3000
        )
      }
    }
  }

  checkPair = (cardA, cardB) => {
    if (cardA.name === cardB.name) {
      cardA.markDone()
      cardB.markDone()
    }
  }
}

export default new ObservableMemoryGame