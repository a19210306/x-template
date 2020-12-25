import { GameMode } from "./GameMode";
import  * as GameState from './System/GameState';
import { Graphs } from "./utils/Graph";
import { Linkedlist } from "./utils/linkedlist";
import { Stack } from "./utils/Stack";

Object.assign(getfenv(), {
    Activate: GameMode.Activate,
    Precache: GameMode.Precache,
    Scenes:GameState,
    // Stack:Stack,
    // LinkedList:Linkedlist,
    // Graphs:Graphs
});

if (GameRules.Addon) {
    GameRules.Addon.Reload();
}