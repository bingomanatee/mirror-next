import { nanoid } from "nanoid";

 class StoryLine {
  constructor(params, story) {
    this.identity = nanoid();
    if (!params) {
      console.log('--- bad storyLine - no params');
      return;
    }
    this.story = story;
    if (typeof params === 'string') {
      this.text = params;
    } else {
      const {text = '', image = '', level = 0, type = 'line'} = params;
      this.text = text;
      this.image = image;
      this.level = level;
    }
  }

  get level() {
    return this._level || 0;
  }

  set level(n) {
    this._level = n;
  }

  get text() {
    return this._text || '';
  }

  set text(t) {
    this._text = t;
  }

  get image() {
    return this._image || '';
  }

  set image(t) {
    this._image = t;
  }

  toJSON() {
    return {
      text: this.text, image: this.image, level: this.level
    }
  }
}

StoryLine.create = (params, story) => {
  if (params instanceof StoryLine) {
    if (story) params.story = story;
    return params;
  }

  return new StoryLine(params, story);
}
export default StoryLine;
