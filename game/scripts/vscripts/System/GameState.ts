import { reloadable } from "../lib/tstl-utils";
import { IocCotainer, RegisterIoc } from "./IOCotainer";

export class GameStateData {

}

export enum StateName {
    "null",
    "CharacterCreation" ,
    "MapCreation" ,
    "GameStart" ,
    "GameOver"
}

interface GameStatePackage {
    _Context: Scenes;
    _StateName: StateName;
    _NextState:GameStatePackage
    End:()=>void
    Begin:()=>void
    Run:()=>boolean
}

export function GetScence() {
    IocCotainer.instance.register("GameEnd",["Scence"],GameEnd)
    return IocCotainer.instance.resolve<Scenes>("Scence")
}

@RegisterIoc("AwaitStart",["Scenes","initCharacter"],true)
export class AwaitStart implements GameStatePackage{

    _Context: Scenes;
    _StateName: StateName;
    _NextState: GameStatePackage
    _remaining:number

    constructor(){
        this._StateName = StateName.null
        print(" bei chuang zao")
    }

    public set Context(Scenes:Scenes){
        this._Context = Scenes
    }

    Begin(){
        CustomNetTables.SetTableValue('ui','alluiState',{switch:'close'})
    }
 
    End(){
        print("end end end")
        DeepPrintTable(this._NextState)
        this._Context.ChangeState = this._NextState
    }

    Run(){
        if(this.isGameStart && this.isPlayerHeroSpawn) return false
        print("await game start")
        return true
    }

    get isGameStart(){
       return GameRules.State_Get() > DOTA_GameState.DOTA_GAMERULES_STATE_PRE_GAME
    }

    get isPlayerHeroSpawn(){
        let allSpawned = true;
        GameRules.AllPlayers.forEach((player) => {
            let hero = player.GetAssignedHero();
            if (hero == null) {
                allSpawned = false;
            }
        })
        return allSpawned
    }

    Inject(obj:Object){
            print(obj.constructor.name + " constructor")
            if(obj.constructor.name == 'Scenes'){
                this._Context = obj as Scenes
            }
            if(obj.constructor.name == 'initCharacter'){
                print("_NextState yi zhu ru")
                this._NextState = obj as GameStatePackage
            }
    }
}

@RegisterIoc("initCharacter",["Scence"],true)
export class initCharacter implements GameStatePackage{

    _Context: Scenes;
    _StateName: StateName;
    _NextState: GameStatePackage;
    _remaining:number;

    constructor(){
        this._StateName = StateName.CharacterCreation
        this._remaining = 120
        print("initCharacter")
    }

    Begin(){
        CustomNetTables.SetTableValue('ui','alluiState',{switch:'initCharacter'})
    }
 
    End(){
        this._Context.ChangeState = this._NextState
    }

    Run(){
        if(this._remaining === 0) return false
        this._remaining--
        return true
    }


    Inject(obj:Object){
        if(obj.constructor.name == 'Scenes'){
            this._Context = obj as Scenes
        }
        if(obj.constructor.name == 'GameStatePackage'){
            this._NextState = obj as GameStatePackage
        }
    }

}

//@RegisterIoc("InitMap",["Scence","GameStart"])
export class InitMap implements GameStatePackage{
    _Context: Scenes;
    _StateName: StateName;
    _NextState: GameStatePackage;
    _remaining:number;

    constructor(context:Scenes,time:number|-1 = -1,NextState:GameStatePackage){
        this._Context = context
        this._StateName = StateName.MapCreation
        print("InitMap = " + context)
    }

    Begin(){
        CustomNetTables.SetTableValue('ui','alluiState',{switch:'Initmap'})
    }
 
    End(){
        this._Context.ChangeState = this._NextState
    }

    Run(){
        if(this._remaining === 0) return false
        return true
    }

}

//@RegisterIoc("GameStart",["Scence","GameEnd"])
export class GameStart implements GameStatePackage{
    _Context: Scenes;
    _StateName: StateName;
    _NextState: GameStatePackage;
    _remaining:number;

    constructor(context:Scenes,time:number|-1 = -1,NextState:GameStatePackage){
        this._Context = context
        this._StateName = StateName.GameStart
        print("GameStart = " + context)
    }

    Begin(){
        CustomNetTables.SetTableValue('ui','alluiState',{switch:'GameStart'})
    }
 
    End(){
        this._Context.ChangeState = this._NextState
    }

    Run(){
        if(this._remaining === 0) return false
        return true
    }

}

//@RegisterIoc("GameEnd",["Scence"])
export class GameEnd implements GameStatePackage{
    _Context: Scenes;
    _StateName: StateName;
    _NextState: GameStatePackage;
    _remaining:number;

    constructor(context:Scenes,time:number|-1 = -1,NextState:GameStatePackage){
        this._Context = context
        this._StateName = StateName.GameOver
        this._remaining = time
        print("GameEnd = " + context)
    }

    Begin(){
        CustomNetTables.SetTableValue('ui','alluiState',{switch:'GameEnd'})
    }
 
    End(){
        this._Context.ChangeState = this._NextState
    }

    Run(){
        if(this._remaining === 0) return false
        return true
    }

    

}

@RegisterIoc("Scenes",["AwaitStart"],false)
export class Scenes {
    private _GameStatePackage: GameStatePackage;
    private _time:number

    constructor(GameStatePackage: GameStatePackage) {
        this._GameStatePackage = GameStatePackage;
        print("init=======================================")
        Timers.CreateTimer(()=>{return this.ScenesRun()});
        this._time = 0
    }

    public set ChangeState(GameStatePackage: GameStatePackage){
        this._GameStatePackage = GameStatePackage
        this._GameStatePackage.Begin()
    }

    ScenesRun() {
        this._time++
        CustomNetTables.SetTableValue("game_timer", "game_timer", {
            current_time: this._time,
            current_state: this._GameStatePackage._StateName,
        });
        print(this._time)
        if (GameRules.IsGamePaused() || !this._GameStatePackage) {
            print("1")
            return FrameTime();
        }
        if (!this._GameStatePackage.Run()) {
            this._GameStatePackage.End()
        }
        return 1;
    }
}