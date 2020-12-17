import { RegisterIoc } from "./IOCotainer";

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


@RegisterIoc("Scence",[])
export class Scenes {
    private _GameStatePackage: GameStatePackage;
    private _time:number

    constructor(GameStatePackage: GameStatePackage) {
        this._GameStatePackage = GameStatePackage;
        Timers.CreateTimer(()=>{this.ScenesRun()});
        this._time = 0
    }

    public set ChangeState(GameStatePackage: GameStatePackage){
        this._GameStatePackage = GameStatePackage
        this._GameStatePackage.Begin()
    }

    ScenesRun() {
        if (GameRules.IsGamePaused()) {
            return FrameTime();
        }
        this._time++
        CustomNetTables.SetTableValue("game_timer", "game_timer", {
            current_time: this._time,
            current_state: this.ChangeState._StateName,
        });
        if (!this._GameStatePackage.Run()) {
            this._GameStatePackage.End(); 
        }
        return 1;
    }
}


@RegisterIoc("AwaitStart",["Scence","initCharacter"])
export class AwaitStart implements GameStatePackage{

    _Context: Scenes;
    _StateName: StateName;
    _NextState: GameStatePackage
    _remaining:number

    constructor(context:Scenes,time:number|-1 = -1,NextState:GameStatePackage){
        this._Context = context
        this._NextState = NextState
        this._StateName = StateName.null
        this._remaining = time
    }

    Begin(){
        CustomNetTables.SetTableValue('ui','alluiState',{switch:'close'})
    }
 
    End(){
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

}

@RegisterIoc("initCharacter",["Scence","InitMap"])
export class initCharacter implements GameStatePackage{

    _Context: Scenes;
    _StateName: StateName;
    _NextState: GameStatePackage;
    _remaining:number;

    constructor(context:Scenes,time:number|-1,NextState:GameStatePackage){
        this._Context = context
        this._NextState = NextState
        this._StateName = StateName.null
        this._remaining = time
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

}

@RegisterIoc("InitMap",["Scence","GameStart"])
export class InitMap implements GameStatePackage{
    _Context: Scenes;
    _StateName: StateName;
    _NextState: GameStatePackage;
    _remaining:number;

    constructor(context:Scenes,time:number|-1 = -1,NextState:GameStatePackage){
        this._Context = context
        this._StateName = StateName.MapCreation
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

@RegisterIoc("GameStart",["Scence","GameEnd"])
export class GameStart implements GameStatePackage{
    _Context: Scenes;
    _StateName: StateName;
    _NextState: GameStatePackage;
    _remaining:number;

    constructor(context:Scenes,time:number|-1 = -1,NextState:GameStatePackage){
        this._Context = context
        this._StateName = StateName.GameStart
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

@RegisterIoc("GameEnd",["Scence"])
export class GameEnd implements GameStatePackage{
    _Context: Scenes;
    _StateName: StateName;
    _NextState: GameStatePackage;
    _remaining:number;

    constructor(context:Scenes,time:number|-1 = -1,NextState:GameStatePackage){
        this._Context = context
        this._StateName = StateName.GameOver
        this._remaining = time
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