import views from './buttons/index'
import asButton from "./asButton";
import PauseBase from './buttons/Pause';
import PlayBase from './buttons/Play';
import PauseActive from "./buttons/PauseActive";
import PlayActive from "./buttons/PlayActive";
import PlayOver from './buttons/PlayHl';
import PauseOver from './buttons/PauseHl';

export const Play = asButton('Play', PlayBase, PlayOver, PlayActive);
export const Pause = asButton('Pause', PauseBase, PauseOver, PauseActive);
