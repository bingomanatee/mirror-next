import StoryLine from "./StoryLine";
import { nanoid } from "nanoid";
import { immerable } from "immer";

export default class Story {
  [immerable] = true
  constructor(params) {
    if (!params) {
      return;
    }
    if (typeof params === "string") {
      this.title = params;
    } else {
      const {
        title, id, text, primaryImage, order
      } = params;

      this.title = title;
      this.id = id;
      this._text = Array.isArray(text) ? text.map(StoryLine.create) : [];
      this.order = order;
      this.primaryImage = primaryImage;
      this._tempId = nanoid();
    }
  }

  updateStoryLine(text, ix) {
    if (this.text[ix]) {
      if (typeof text === 'string') {
        this.text[ix].text = text;
      }
    }
  }

  addRow(ix) {
    this.text.splice(ix, 0, new StoryLine({text: 'new line'}, this))
  }

  /**
   * a unique id, even for stories without ids (new stories);
   * @returns {string}
   */
  get identity() {
    if (this.id) {
      return this.id;
    }
    return this._tempId
  }

  get text() {
    return this._text;
  }

  set text(list) {
    if (Array.isArray(list)) {
      this._text = list.map(StoryLine.create);
    }
  }

  delLine(ix) {
    this.text.splice(ix, 1);
  }

  toJSON() {
    return {
      title: this.title,
      text: this.text.map(line => line.toJSON()),
      id: this.id,
      order: this.order,
      primaryImage: this.primaryImage
    }
  }
}
