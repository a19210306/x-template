import { GameMode } from "./GameMode";
import  * as GameState from './System/GameState';

Object.assign(getfenv(), {
    Activate: GameMode.Activate,
    Precache: GameMode.Precache,
    Scenes:GameState
});

if (GameRules.Addon) {
    GameRules.Addon.Reload();
}