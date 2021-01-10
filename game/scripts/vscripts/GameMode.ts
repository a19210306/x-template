import { reloadable } from "./lib/tstl-utils";
import './lib/timers'
import "./abilities/modifier/ship_move_speed"
import './utils/table'
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
        particle:ParticleID[]
        [key:string]:any;
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
        GameRules.particle = []
    }
    constructor() {
        this.configure();
        ListenToGameEvent("game_rules_state_change", () => this.OnStateChange(), undefined);
        ListenToGameEvent("npc_spawned", event => this.OnNpcSpawned(event), undefined);
        ListenToGameEvent("dota_player_pick_hero", (event) => this.dota_player_pick_hero(event), undefined);
        CustomGameEventManager.RegisterListener('test',(id,player) =>{this.test()})
        CustomGameEventManager.RegisterListener('test2',(id,player) =>{this.test2()})
    }

    private configure(): void {
        GameRules.SetCustomGameTeamMaxPlayers(DOTATeam_t.DOTA_TEAM_GOODGUYS, 3);
        GameRules.SetCustomGameTeamMaxPlayers(DOTATeam_t.DOTA_TEAM_BADGUYS, 3);
        GameRules.GetGameModeEntity().SetFogOfWarDisabled(false)
        GameRules.SetShowcaseTime(0);
    }


    public OnStateChange(): void {
    }

    public Reload() {
        print("Script reloaded!");
    }

    private OnNpcSpawned(event: NpcSpawnedEvent) {}
 

    public test(){
        if(GameRules["城市底座"]) {
            if((GameRules["城市底座"] as CDOTA_BaseNPC).IsAlive())
            (GameRules["城市底座"] as CDOTA_BaseNPC).RemoveSelf()
        }
        GameRules["城市底座"] = CreateUnitByName("npc_dota_base_test",Vector(-2000,2000,1000),true,undefined,undefined,DOTATeam_t.DOTA_TEAM_NOTEAM);
        (GameRules["城市底座"] as CDOTA_BaseNPC).SetAbsOrigin(Vector(-608,20,-80));
        (GameRules["城市底座"] as CDOTA_BaseNPC).SetAbsAngles(0,90,0)
        Timers.CreateTimer(2,()=>{
            let id = ParticleManager.CreateParticle('particles/test123.vpcf',ParticleAttachment_t.PATTACH_POINT,GameRules["城市底座"])
            ParticleManager.SetParticleControlEnt(id,0,GameRules["城市底座"],ParticleAttachment_t.PATTACH_POINT,"port",Vector(0,0,0),false)
            GameRules.particle.push(id)
        })
        for(let i = 1 ; i <=  8 ; i++)
        {
            let b = i
            Timers.CreateTimer(b,()=>{
                let id2 = ParticleManager.CreateParticle('particles/house.vpcf',ParticleAttachment_t.PATTACH_POINT,GameRules["城市底座"])
                ParticleManager.SetParticleControlEnt(id2,0,GameRules["城市底座"],ParticleAttachment_t.PATTACH_POINT,"fangzi_"+ b,Vector(0,0,0),false)
                GameRules.particle.push(id2)
            })
        }

        
    }

    test2(){
        GameRules.particle.forEach((particle)=>{
            ParticleManager.DestroyParticle(particle,false)
            ParticleManager.ReleaseParticleIndex(particle)
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
    entiti.SetAttackCapability(DOTAUnitAttackCapability_t.DOTA_UNIT_CAP_NO_ATTACK)
}


