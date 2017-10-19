import mobx, { observable, computed } from 'mobx'


class Card {
  static generateSet() {

  }
}

class ObservableMemoryGame {
  @observable cards = []
}

export default new ObservableMemoryGame