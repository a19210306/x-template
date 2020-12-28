import { IocCotainer, RegisterIoc } from "./IOCotainer";
import { GenerateMap } from '../Land/2DGenerator';
import * as Enum from "./Enum";
import { Land, LandCotainerManager } from '../Land/LandCotainer';
import { IslandTetris, Landtetris } from '../Land/LandColisionList';
import { SeasonSort } from './Enum';
import { DecoratorFactory } from '../Land/Decorate';

export class GameStateData {

}


enum State2Name {
    "无",
    "初始化角色",
    "地图创建",
    "游戏开始",
    "游戏结束",
}


interface GameStatePackage {
    _Context: Scenes;
    _StateName: State2Name;
    _NextState: GameStatePackage;
    _remaining?: number;
    Inject: (arg: Object) => void;
    End: () => void;
    Begin: () => void;
    Run: () => boolean;
}

@RegisterIoc("AwaitStart", ["Scenes", "initCharacter"], true)
export class AwaitStart implements GameStatePackage {

    _Context: Scenes;
    _StateName: State2Name;
    _NextState: GameStatePackage;
    _remaining: number;

    constructor() {
        this._StateName = State2Name.初始化角色;
        print(" bei chuang zao");
    }

    public set Context(Scenes: Scenes) {
        this._Context = Scenes;
    }

    Begin() {
        CustomNetTables.SetTableValue('ui', 'alluiState', { switch: 'close' });
    }

    End() {
        print("end end end");
        this._Context.ChangeState = this._NextState;
    }

    Run() {
        if (this.isGameStart && this.isPlayerHeroSpawn) return false;
        print("await game start");
        return true;
    }

    get isGameStart() {
        return GameRules.State_Get() > DOTA_GameState.DOTA_GAMERULES_STATE_PRE_GAME;
    }

    get isPlayerHeroSpawn() {
        let allSpawned = true;
        GameRules.AllPlayers.forEach((player) => {
            let hero = player.GetAssignedHero();
            if (hero == null) {
                allSpawned = false;
            }
        });
        return allSpawned;
    }

    Inject(obj: Object) {
        print(obj.constructor.name + " constructor");
        if (obj.constructor.name == 'Scenes') {
            this._Context = obj as Scenes;
        }
        if (obj.constructor.name == 'initCharacter') {
            this._NextState = obj as GameStatePackage;
        }
    }
}

@RegisterIoc("initCharacter", ["Scenes", "InitMap"], true)
export class initCharacter implements GameStatePackage {

    _Context: Scenes;
    _StateName: State2Name;
    _NextState: GameStatePackage;
    _remaining: number;

    constructor() {
        this._StateName = State2Name.初始化角色;
        this._remaining = 1;
        print("initCharacter");
    }

    Begin() {
        CustomNetTables.SetTableValue('ui', 'alluiState', { switch: 'initCharacter' });
    }

    End() {
        this._Context.ChangeState = this._NextState;
    }

    Run() {
        if (this._remaining === 0) return false;
        this._remaining--;
        return true;
    }


    Inject(obj: Object) {
        if (obj.constructor.name == 'Scenes') {
            this._Context = obj as Scenes;
        }
        if (obj.constructor.name == 'InitMap') {
            this._NextState = obj as GameStatePackage;
        }
    }

}

@RegisterIoc("InitMap", ["Scenes", "GameStart"], true)
export class InitMap implements GameStatePackage {
    _Context: Scenes;
    _StateName: State2Name;
    _NextState: GameStatePackage;
    _remaining: number;
    private _current_count: number;
    private _IsOver: boolean;
    private _progress: { current_name: string, current_render_count: number, max_render_count: number; };

    constructor(context: Scenes, time: number | -1 = -1, NextState: GameStatePackage) {
        this._Context = context;
        this._StateName = State2Name.地图创建;
        this._progress = { current_name: '', current_render_count: 0, max_render_count: 0 };
        this._current_count = 0;
        this._IsOver = false;
        print("InitMap = " + context);
        CustomNetTables.SetTableValue('Game_State', 'progress', this._progress);
        CustomNetTables.SetTableValue('Game_State', 'current_render_count', { count: this._current_count });
    }

    set SetProgress(progree: { current_name: string, current_render_count: number, max_render_count: number; }) {
        this._progress = progree;
        this._current_count = 0;
        CustomNetTables.SetTableValue('Game_State', 'progress', this._progress);
    }

    ProgressCountADD() {
        this._current_count++;
        CustomNetTables.SetTableValue('Game_State', 'current_render_count', { count: this._current_count });
        print(CustomNetTables.GetTableValue('Game_State', 'current_render_count').count + "dang qian scenes");
    }

    set SetIsOver(isover: boolean) {
        print("IsOVER")
        this._IsOver = isover;
    }


    Begin() {
        CustomNetTables.SetTableValue('ui', 'alluiState', { switch: 'Initmap' });
        GenerateMap.Getinstance();
    }

    End() {
        GameRules.AllHeroes.forEach(hero => {
            print("haalasldlsdlsdldldsl");
            hero.SetAbsOrigin(Vector(RandomInt(-10000, 10000), RandomInt(-10000, 10000), 300));
        });
        this._Context.ChangeState = this._NextState;
    }

    Run() {
        if (this._IsOver) return false;
        return true;
    }

    Inject(obj: Object) {
        if (obj.constructor.name == 'Scenes') {
            this._Context = obj as Scenes;
        }
        if (obj.constructor.name == 'GameStart') {
            this._NextState = obj as GameStatePackage;
        }
    }
}

@RegisterIoc("GameStart", ["Scenes", "GameEnd"], true)
export class GameStart implements GameStatePackage {
     _Context: Scenes;
     _StateName: State2Name;
     _NextState: GameStatePackage;
     _remaining: number;
     _LandData: Record<string, { widthindex: number, heightindex: number, angle: number; }>;
     _Coliision:CDOTA_BaseNPC;

    constructor(context: Scenes, time: number | -1 = -1, NextState: GameStatePackage) {
        this._Context = context;
        this._StateName = State2Name.游戏开始;
        this._LandData = {};
        this._Coliision = CreateUnitByName("npc_dota_hero_crystal_maiden", Vector(0,0,0), false, null, null, DOTATeam_t.DOTA_TEAM_GOODGUYS)
        this._Coliision.SetModelScale(0.2)
        print("GameStart = " + context);
    }

    Begin() {
        print("game start")
        this.CreateMiniMap();
        CustomNetTables.SetTableValue('ui', 'alluiState', { switch: 'GameStart' });
    }

    End() {
        this._Context.ChangeState = this._NextState;
        this._Coliision.RemoveSelf()
    }

    Run() {
        if (this._remaining === 0) return false;
        return true;
    }

    Inject(obj: Object) {
        if (obj.constructor.name == 'Scenes') {
            this._Context = obj as Scenes;
        }
        if (obj.constructor.name == 'GameEnd') {
            this._NextState = obj as GameStatePackage;
        }
    }

    CreateMiniMap() {
        Entities.FindAllByName("init_land").forEach((land) => {
            let vec = land.GetAbsOrigin();
            let _x_y = [0,0]
            let name = land.GetChildren()[0].GetName()
            if(string.find(name,"is").length > 0){
                table.foreach(IslandTetris,(k,v)=>{
                    if(v.name == name){
                        _x_y = [v.x,v.y]
                        return 'stop'
                    }
                })
            }else{
                table.foreach(Landtetris,(k,v)=>{
                    if(v.name == name){
                        _x_y = [v.x,v.y]
                        return 'stop'
                    }
                })
            }
            let origin = land.GetAbsOrigin();
            let season_value = Enum.climate_vector.寒带起始坐标.__sub(origin).Length2D() / 463;
            let index = math.floor(season_value / 10);
            let random = RandomInt(-2, 2);
            let lastindex = random + index;
            lastindex > Enum.SeasonSort.length ? lastindex = Enum.SeasonSort.length : lastindex;
            lastindex < 0 ? lastindex = 0 : lastindex;
            (land as CBaseModelEntity).SetSkin(lastindex); // 根据气候不同给予陆地皮肤
            DebugDrawText(Vector(origin.x, origin.y, 200), "当前值" + season_value, false, 989888);
            DebugDrawCircle(Vector(origin.x, origin.y, 200), Vector(255, 255, 255), 100, 100, false, 99999);
            LandCotainerManager.getinstance().registerLand(RandomInt(0,99998).toString(),new Land(land as CBaseModelEntity,vec,_x_y[0],_x_y[1],season_value))
            // this._LandData[land.GetChildren()[0].GetName()] = {widthindex:vec.x,heightindex:vec.y,angle:land.GetAngles().y}
        });
        LandCotainerManager.getinstance().CreateDecorate();
        CustomNetTables.SetTableValue('map', 'LandData', this._LandData);
    }

}

@RegisterIoc("GameEnd", ["Scenes"], true)
export class GameEnd implements GameStatePackage {
    _Context: Scenes;
    _StateName: State2Name;
    _NextState: GameStatePackage;
    _remaining: number;

    constructor(context: Scenes, time: number | -1 = -1, NextState: GameStatePackage) {
        this._Context = context;
        this._StateName = State2Name.游戏结束;
        this._remaining = time;
    }

    Begin() {
        CustomNetTables.SetTableValue('ui', 'alluiState', { switch: 'GameEnd' });
    }

    End() {
        this._Context.ChangeState = this._NextState;
    }

    Run() {
        if (this._remaining === 0) return false;
        return true;
    }

    Inject(obj: Object) {
        if (obj.constructor.name == 'Scenes') {
            this._Context = obj as Scenes;
        }
        if (obj.constructor.name == 'GameStatePackage') {
            this._NextState = obj as GameStatePackage;
        }
    }

}

@RegisterIoc("Scenes", ["AwaitStart"], false)
export class Scenes {
    private _GameStatePackage: GameStatePackage;
    private _time: number;

    constructor(GameStatePackage: GameStatePackage) {
        this._GameStatePackage = GameStatePackage;
        print("init=======================================");
        Timers.CreateTimer(() => { return this.ScenesRun(); });
        this._time = 0;
    }

    public set ChangeState(GameStatePackage: GameStatePackage) {
        this._GameStatePackage = GameStatePackage;
        this._GameStatePackage.Begin();
    }

    ScenesRun() {
        this._time++;
        CustomNetTables.SetTableValue('Game_State', 'game_state', {
            current_time: this._time,
            current_state: this._GameStatePackage._StateName,
            current_loacl_time: this._GameStatePackage._remaining ? this._GameStatePackage._remaining : -1
        });
        print(this._time);
        if (GameRules.IsGamePaused() || !this._GameStatePackage) {
            return FrameTime();
        }
        if (!this._GameStatePackage.Run()) {
            this._GameStatePackage.End();
        }
        return 1;
    }
}