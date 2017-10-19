import memoryGameStore, { MemoryGameStore, Card } from './memoryGameStore'

const expand = n => Object.keys([...Array(n)])
const EXPECTED_SET = expand(12).reduce(
  (arr, v) => [...arr, v, v],
  []
)

const unique = function(arr) {
  return arr.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
}

describe('Card', function() {
  describe('.generateSet', function() {
    let set
    beforeEach(function() {
      set = Card.generateSet();
    });

    it('generate 24 cards', function() {
      // this.set = Card.generateSet()
      expect(set.length).toBe(24)
      expect(unique(set.map(card => card.constructor))).toEqual([Card])
      expect(set.map(card => card.name)).toContain( ...EXPECTED_SET )
    })
  })
})