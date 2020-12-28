import * as Enum from '../System/Enum';
import { climate_vector } from '../System/Enum';
import { DecoratorFactory } from './Decorate';
import { InitDecorate } from './InitDecorate';

type cosmetics = Record<string, string>;


export type AllLand = Record<string,{vec:Vector,range:number,season:number}>

export interface Landtemplate {
    _name?: string;
    _LandInstance: CBaseEntity;
    _Cosmetics?: cosmetics;
    _GetAllCosmetics?: () => string[];
    _climate?: Enum.climate;
    _origin: Vector;
    _x: number;
    _y: number;
    _season:number;
}

export class Land implements Landtemplate {
    _name?: string;
    _LandInstance: CBaseEntity;
    _Cosmetics?: Record<string, string>;
    _GetAllCosmetics?: () => string[];
    _climate?: Enum.climate;
    _origin: Vector;
    _x: number;
    _y: number;
    _season:number

    constructor(entiti: CBaseModelEntity, origin: Vector, x: number, y: number,season:number) {
        this._LandInstance = entiti;
        this._origin = origin;
        this._x = x;
        this._y = y;
        this._season = season
    }

}

export class LandCotainerManager {
    private static _LandCotainerManager: LandCotainerManager;
    private _Cotainer: Record<string, Landtemplate>;

    private constructor() {
        this._Cotainer = {};
    }

    public static getinstance(): LandCotainerManager {
        if (this._LandCotainerManager == null) {
            this._LandCotainerManager = new LandCotainerManager();
        }
        return this._LandCotainerManager;
    }

    CreateDecorate() {
        let tmp:AllLand = {}
        for(let i in this._Cotainer){
            let record = this._Cotainer[i]
            tmp[RandomInt(0,999999)] = {vec:record._origin,range:math.max(record._x * record._y) * 1024,season:record._season}
        }
        InitDecorate.InitAllDecorator(tmp)
    }

    public registerLand(name: string, _examples: Landtemplate) {
        this._Cotainer[name] = _examples;
    }

    // private CreateDecorate(vector: Vector, x: number, y: number, season: number) {
    //     //先创树测试
    //     let area = x * y;
    //     let TreeCount = area * 100;
    //     for (let i = 0; i < TreeCount; i++) {
    //         Timers.CreateTimer(i * 0.01, () => {
    //             let collisionU = CreateUnitByName("npc_dota_hero_crystal_maiden", vector, false, null, null, DOTATeam_t.DOTA_TEAM_BADGUYS);
    //             let randomV = vector.__add(Vector(RandomInt(-area * 2048,area*2048),(RandomInt(-area * 2048,area*2048),0)));
    //             let h = GetGroundHeight(randomV, collisionU);
    //             let lastvec = Vector(randomV.x, randomV.y, h);
    //             collisionU.RemoveSelf();
    //             do {
    //                 collisionU = CreateUnitByName("npc_dota_hero_crystal_maiden", vector, false, null, null, DOTATeam_t.DOTA_TEAM_BADGUYS);
    //                 randomV = vector.__add(RandomVector(area * 2048));
    //                 h = GetGroundHeight(randomV, collisionU);
    //                 lastvec = Vector(randomV.x, randomV.y, h);
    //                 collisionU.RemoveSelf();
    //             } while (h > 100);
    //             let Dec = new DecoratorFactory(season);
    //             let models = Dec.GetRandomModel();
    //             let create_model = "";
    //             table.foreach(models, (k, v) => {
    //                 let ThisRandom = math.random();
    //                 if (ThisRandom < k) {
    //                     create_model = table.random(models[k][Enum.model_type.树].models);
    //                     return 'stop';
    //                 }
    //             });
    //             h > 90 && SpawnEntityFromTableSynchronous('prop_dynamic', {
    //                 model: "models/lowpoly_tree/sm_tree_round_03.vmdl",
    //                 scales: "0.2 0.2 0.2",
    //                 origin: lastvec,
    //                 angles: `0 ${RandomInt(0, 360)} 0`
    //             })
    //         })}}
}
  