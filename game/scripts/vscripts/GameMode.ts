import { reloadable } from "./lib/tstl-utils";
import './lib/timers'
import "./abilities/modifier/ship_move_speed"
import { GenerateMap } from "./Land/Generator_main";
const heroSelectionTime = 10;

declare global {
    interface CDOTAGamerules {
        Addon: GameMode;
        Map:GenerateMap;
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
    }

    constructor() {
        this.configure();
        ListenToGameEvent("game_rules_state_change", () => this.OnStateChange(), undefined);
        ListenToGameEvent("npc_spawned", event => this.OnNpcSpawned(event), undefined);
        CustomGameEventManager.RegisterListener('MapUpdate',(id,player) =>{
            GameRules.Map.InitMap2D()
            print("niubi")
            CustomNetTables.SetTableValue("map","date",GameRules.Map.InitLand())
        })
    }

    private configure(): void {
        GameRules.SetCustomGameTeamMaxPlayers(DOTATeam_t.DOTA_TEAM_GOODGUYS, 3);
        GameRules.SetCustomGameTeamMaxPlayers(DOTATeam_t.DOTA_TEAM_BADGUYS, 3);
        GameRules.GetGameModeEntity().SetFogOfWarDisabled(true)

        GameRules.SetShowcaseTime(0);
        GameRules.SetHeroSelectionTime(heroSelectionTime);
    }

    public OnStateChange(): void {
        if(GameRules.State_Get() == DOTA_GameState.DOTA_GAMERULES_STATE_PRE_GAME)
        {
            GameRules.Map = new GenerateMap(256,0.4)
        }
    }
    public Reload() {
        print("Script reloaded!");
    }

    private OnNpcSpawned(event: NpcSpawnedEvent) {
        let unit = (EntIndexToHScript(event.entindex) as CDOTA_BaseNPC_Hero);
       // unit.SetBaseMoveSpeed(0.01);
        huanzhuang(unit)
        // DOTA_SpawnMapAtPosition("land/ceshi1",Vector(2944,1920,0),false,()=>{},()=>{
        //     test.forEach(vec=>{
        //         DebugDrawCircle(Vector(vec.x,vec.y,500).__add(Vector(2944,1920,0)),Vector(255,0,0),100,100,false,10)
        //         DebugDrawText(Vector(vec.x,vec.y,500).__add(Vector(2944,1920,0)),`检查边缘坐标${Vector(vec.x,vec.y,10).__add(Vector(2944,1920,0))}`,false,10)
        //     })
        //     Timers.CreateTimer(10,()=>{Entities.FindAllByName("one")[0].SetAbsAngles(0,90,0);
        //     test.forEach(vec=>{
        //         let lastvec = RotatePosition(Vector(2944,1920,500),QAngle(0,90,0),Vector(vec.x + 2944,vec.y + 1920,500))
        //         DebugDrawCircle(lastvec,Vector(255,0,0),100,100,false,30)
        //         DebugDrawText(lastvec,`检查边缘坐标${lastvec.x + "," + lastvec.y}`,false,30)
        //     })
        //     })
        // },undefined)
        //unit.AddNewModifier(unit,undefined,"ship_move_speed",{})

    }
    //     Timers.CreateTimer(()=>{ let b = this.FindPoint(EntIndexToHScript(event.entindex) as CDOTA_BaseNPC_Hero);
    //         if(b.x != 0)
    //         {
    //             DebugDrawCircle(b as Vector,Vector(0,255,255),10,20,false,30)
    //             DebugDrawText(b as Vector,`找到了可以生成的位置${b.toString()}`,false,30)
    //             return
    //         }
    //         else{
    //             return 0.01
    //         }},1)
    // }

    // private FindPoint(unit:CDOTA_BaseNPC_Hero){
    //     let center = Vector(RandomInt(-2000,2000),RandomInt(-2000,2000),128)
    //     let list = [
    //         {x:148.961,y:-271.158},
    //         {x:-276,y:-108},
    //         {x:-274,y:-294},
    //         {x:90,y:310},
    //         {x:250,y:-30},
    //     ]
    //     let find = Vector(0,0,0)
    //     let count = 0
    //     list.forEach((table,index)=>{
    //         let abs = math.abs
    //         let tmp = Vector(table.x,table.y,333)
    //         let lastvec = tmp.__add(center)
    //         let ground = GetGroundPosition(lastvec,unit)

    //         DebugDrawText(ground,ground.toString(),false,0.5)
    //         DebugDrawCircle(ground,Vector(22,111,44),100,100,true,0.5)
    //         if(ground.z != 128)
    //         {
    //             find = Vector(0,0,0)
    //         }
    //         else if(ground.z == 128)
    //         {
    //             count++
    //         }
            
    //     })
    //     if(count == 5){
    //         return center
    //     }
    //     else{
    //         return Vector(0,0,0)
    //     }
    // }
}

function huanzhuang(entiti:CDOTA_BaseNPC_Hero){
    let modelname = 'models/ship/sm_prop_shipwreck_01.vmdl';
    let model = entiti.FirstMoveChild();
    while (model != null) {
        if (model.GetClassname() == "dota_item_wearable") {
            model.RemoveSelf()
            print("hahah")
        }
        model = model.NextMovePeer();
    }
    entiti.SetModel(modelname);
    entiti.SetOriginalModel(modelname);
    entiti.SetModelScale(3)
}