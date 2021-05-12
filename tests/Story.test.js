import Story from "../lib/mirrors/Story";
const firstStoryData = require('./../fixtures/first-story.json')
describe('Story', () => {

  let firstStory;

  beforeAll(() => {
     firstStory = new Story(firstStoryData);
  })

  it('should get story parameters', () => {
    expect(firstStory.title).toBe( "State is a funny thing");
  });

  it('should get the text', () => {
    expect(firstStory.text).toHaveLength(5);
    expect(firstStory.text[0].text).toBe("What you expect state to be depends on your heritage as a developer.");
    expect(firstStory.text[4].text).toBe( "Modern developers have a right to demand more from an industry standard than Redux provides.");
  });
});
