import asButton from "./asButton";
import PauseBase from './buttons/Pause';
import PlayBase from './buttons/Play';
import PauseActive from "./buttons/PauseActive";
import PlayActive from "./buttons/PlayActive";
import PlayOver from './buttons/PlayHl';
import PauseOver from './buttons/PauseHl';
import ExitBase from './buttons/Exit';
import ExitOver from './buttons/Exit';
import ExitActive from "./buttons/ExitActive";

import PlayBigBase from './buttons/Play@2X';
import PlayBigActive from './buttons/PlayActive@2X';
import PlayBigOver from './buttons/PlayHl@2X';

const PlayBigView =  asButton('PlayBig', PlayBigBase, PlayBigOver, PlayBigActive);
export const PlayBig = (props) => (<PlayBigView {...props} scale={2} />);
export const Play = asButton('Play', PlayBase, PlayOver, PlayActive);
export const Pause = asButton('Pause', PauseBase, PauseOver, PauseActive);
export const Exit = asButton('Exit', ExitBase, ExitOver, ExitActive);
