import mobx, { observable, computed } from 'mobx'

const expand = n => Object.keys([...Array(n)])
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

export class Card {
  @observable state = 'blocked'
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
}

export class ObservableMemoryGame {
  @observable cards = []
  constructor() {
    this.cards = shuffle(Card.generateSet())
  }
}

export default new ObservableMemoryGame