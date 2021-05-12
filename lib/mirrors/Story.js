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
      this.text = text;
      this.order = order;
      this.primaryImage = primaryImage;
      this._tempId = nanoid();
    }
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
    return this._text || [];
  }

  set text(list) {
    if (Array.isArray(list)) {
      this._text = list.map(StoryLine.create);
    }
  }

  toJSON() {
    return {
      title: this.title,
      text: this.text,
      id: this.id,
      primaryImage: this.primaryImage
    }
  }
}
