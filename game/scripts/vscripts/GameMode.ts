import { reloadable } from "./lib/tstl-utils";
import './lib/timers'
import "./abilities/modifier/ship_move_speed"
import './utils/table'
import { __default_ground, __floorHeight } from './Land/Const';
import { AwaitStart, initCharacter, Scenes } from './System/GameState';
import { IocCotainer } from "./System/IOCotainer";
import { Stack } from "./utils/Stack";
import { Linkedlist } from "./utils/linkedlist";
import { Graphs } from "./utils/Graph";
import { DecorateTable, DecoratorFactory } from './Land/Decorate';
import  * as Enum  from './System/Enum'



declare global {
    interface table {
        [key: string]: any;
    }

    interface CDOTAGamerules {
        Addon: GameMode;
        AllPlayers: CDOTAPlayer[];
        AllHeroes: CDOTA_BaseNPC_Hero[];
        AllTeams: table;
        IDHeroMap: table;
        TeamHeroMap: table;
    }
}

@reloadable
export class GameMode {
    public static Precache(this: void, context: CScriptPrecacheContext) {
        PrecacheResource("particle", "particles/units/heroes/hero_meepo/meepo_earthbind_projectile_fx.vpcf", context);
        PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_meepo.vsndevts", context);
    }

    public static Activate(this: void) {
        GameRules.Addon = new GameMode();
        GameRules.AllHeroes = []
        GameRules.AllPlayers = []
        GameRules.AllTeams = {}
        GameRules.IDHeroMap = {}
        GameRules.TeamHeroMap = {}
    }
    constructor() {
        this.configure();
        ListenToGameEvent("game_rules_state_change", () => this.OnStateChange(), undefined);
        ListenToGameEvent("npc_spawned", event => this.OnNpcSpawned(event), undefined);
        ListenToGameEvent("dota_player_pick_hero", (event) => this.dota_player_pick_hero(event), undefined);
        CustomGameEventManager.RegisterListener('test',(id,player) =>{this.test()})
    }

    private configure(): void {
        GameRules.SetCustomGameTeamMaxPlayers(DOTATeam_t.DOTA_TEAM_GOODGUYS, 3);
        GameRules.SetCustomGameTeamMaxPlayers(DOTATeam_t.DOTA_TEAM_BADGUYS, 3);
        GameRules.GetGameModeEntity().SetFogOfWarDisabled(true)
        GameRules.SetShowcaseTime(0);
    }


    public OnStateChange(): void {
    }

    public Reload() {
        print("Script reloaded!");
    }

    private OnNpcSpawned(event: NpcSpawnedEvent) {}
 

    test(){
        let Dec = new DecoratorFactory(50)
        let models = Dec.GetRandomModel()
         table.foreach(models,(k,v)=>{
        let ThisRandom = math.random()
             if(ThisRandom < k)
             {
                 print(table.random(models[k][Enum.model_type.石头].models))
                 return 'stop'
             }
         })
    }



    dota_player_pick_hero(keys: DotaPlayerPickHeroEvent){
        let hero = EntIndexToHScript(keys.heroindex as EntityIndex) as CDOTA_BaseNPC_Hero;
        hero.SetAbilityPoints(0)
        huanzhuang(hero)
        GameRules.AllTeams[hero.GetTeamNumber()] = true;
        GameRules.IDHeroMap[hero.GetPlayerID()] = hero;
        GameRules.TeamHeroMap[hero.GetTeamNumber()] = hero;
        GameRules.AllHeroes.push(hero);
    }
}

function huanzhuang(entiti:CDOTA_BaseNPC_Hero){
    let modelname = 'models/ship/sm_prop_shipwreck_01.vmdl';
    let model = entiti.FirstMoveChild();
    while (model != null) {
        if (model.GetClassname() == "dota_item_wearable") {
            model.RemoveSelf()
        }
        model = model.NextMovePeer();
    }
    entiti.SetModel(modelname);
    entiti.SetOriginalModel(modelname);
    entiti.SetModelScale(4)
}



