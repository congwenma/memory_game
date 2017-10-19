import mobx, { observable, computed } from 'mobx'

const expand = n => Object.keys([...Array(n)])
export class Card {
  constructor(name) {
    this.name = name
  }
  static generateSet() {
    return expand(12).reduce(
      (arr, n) => [...arr, new Card(n), new Card(n)],
      []
    )
  }
}

export class ObservableMemoryGame {
  @observable cards = []
}

export default new ObservableMemoryGame