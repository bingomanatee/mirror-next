import sti from '../lib/stringToImage';

describe('mirror-next', () => {
  describe('stringToImage', () => {
    it('returns words', async () => {
      const {in: wordsIn} = await sti('a set of words');
      expect(wordsIn).toEqual(['words', 'set']);
    })

    it('returns longest N words', async () => {
      const {in: wordsIn} = await (sti('now is the time for all good men to come to the aid of their country', 4));
      expect(wordsIn).toEqual(["country", "time", "good", "men",]);
      expect(wordsIn.length).toBe(4);

    });

    it ('gets results', async() => {
      const {in: wordsIn, out: result} = await (sti('now is the time for all good men to come to the aid of their country', 4));
     // console.log('result:', result);
      expect(Array.isArray(result.country)).toBeTruthy();
    })
  })
})
