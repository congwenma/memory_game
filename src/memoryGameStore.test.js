import memoryGameStore, {
  MemoryGameStore,
  Card,
  shuffle,
  FLIPDOWN_DURATION,
  DONE, INVALID, BACK, FRONT
} from './memoryGameStore'

const expand = n => Object.keys([...Array(n)])
const unique = arr => arr.filter(
  (value, index, self) => self.indexOf(value) === index
)
const EXPECTED_SET = expand(12).reduce(
  (arr, v) => [...arr, v, v],
  []
)

jest.useFakeTimers()
describe('memoryTestStore', () => {
  it('should contain 24 random cards', () => {
    // console.log(memoryGameStore.cards.map(c => c.name))
  })

  describe('game progression', () => {
    const game = memoryGameStore
    const cardsWith = n => memoryGameStore.cards.filter(card => card.name === n)
    it('e2e works', () => {
      const elevens = cardsWith('11')
      elevens.map(game.flipCard)
      expect(elevens.map(card => card.state)).toContain(DONE, DONE)

      const oneAndTwo = [cardsWith('1')[0], cardsWith('2')[0]]
      oneAndTwo.map(game.flipCard)
      expect(oneAndTwo.map(card => card.state)).toContain(INVALID, INVALID)
      jest.runTimersToTime(FLIPDOWN_DURATION);
      expect(oneAndTwo.map(card => card.state)).toContain(BACK, BACK)

      // mark single
      const one = oneAndTwo[0]
      game.flipCard(one)
      expect(one.state).toBe(FRONT)
      jest.runTimersToTime(FLIPDOWN_DURATION);
      expect(one.state).toBe(BACK)

      // game over
      expand(11).map(n => cardsWith(n).forEach(game.flipCard))
      expect(game.isGameOver).toBe(true)
    })
  })
})

describe('Card', () => {
  describe('.generateSet', () => {
    let set
    beforeEach(() => {
      set = Card.generateSet();
    });

    it('generate 24 cards', () => {
      // this.set = Card.generateSet()
      expect(set.length).toBe(24)
      expect(unique(set.map(card => card.constructor))).toEqual([Card])
      expect(set.map(card => card.name)).toContain( ...EXPECTED_SET )
    })
  })
})

describe('shuffle()', () => {
  it("result should be random, not meant to be tested but rather observed", () => {
    var set = expand(20); // 1...20
    var data = expand(1000).map(n => {
      return shuffle(set);
    });
    var frequency = {};
    // initialize all number's appearance to 0
    set.forEach(n => (frequency[n] = 0));

    // check the number of times the shuffled number is in the first half
    data.forEach(d => {
      set.forEach(n => {
        d.indexOf(n) < 10 && frequency[n]++;
      });
    });

    // console.log(frequency) // check stats
    expect(// expect 10 number to be greater than 10 each time,
      // 10 * 1000 (units) = 10000
      set.reduce((sum, n) => sum + frequency[n], 0)).toBe(10000);
  })
})
