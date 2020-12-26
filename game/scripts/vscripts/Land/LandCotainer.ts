import  * as Enum  from '../System/Enum'
import { climate_vector } from '../System/Enum';
import { DecoratorFactory } from '../System/Decorate';

type cosmetics = Record<string,string>

export interface Landtemplate {
    _name?:string
    _LandInstance:CBaseEntity
    _Cosmetics?:cosmetics
    _GetAllCosmetics?:()=>string[]
    _climate?:Enum.climate
    _origin:Vector
    _x:number;
    _y:number;
}

export class Land implements Landtemplate{
    _name?: string;
    _LandInstance: CBaseEntity;
    _Cosmetics?: Record<string, string>;
    _GetAllCosmetics?: () => string[];
    _climate?: Enum.climate;
    _origin: Vector;
    _x:number;
    _y:number;

    constructor(entiti:CBaseModelEntity,origin:Vector,x:number,y:number){
        this._LandInstance = entiti
        this._origin = origin
        this._x = x
        this._y = y
    }

}

export class LandCotainerManager {
    private static _LandCotainerManager:LandCotainerManager
    private _Cotainer:Record<string,Landtemplate>

    private constructor()
    {
        this._Cotainer = {}
    }

    public static getinstance():LandCotainerManager{
        if(this._LandCotainerManager == null)
        {
            this._LandCotainerManager = new LandCotainerManager()
        }
        return this._LandCotainerManager
    }

    public registerLand(name:string,_examples:Landtemplate){
        this._Cotainer[name] = _examples;
        let origin = _examples._origin
        let season_value = climate_vector.寒带起始坐标.__sub(_examples._origin).Length2D() / 463 ;
        let index = math.floor(season_value / 10);
        let random = RandomInt(-2,2);
        (_examples._LandInstance as CBaseModelEntity).SetSkin(math.min(Enum.SeasonSort[index+random],11)) // 根据气候不同给予陆地皮肤
        DebugDrawText(Vector(origin.x,origin.y,200),"当前值"+season_value,false,989888)
        DebugDrawCircle(Vector(origin.x,origin.y,200),Vector(255,255,255),100,100,false,99999)
        Timers.CreateTimer(()=>{
            this.CreateDecorate(origin,_examples._x,_examples._y,season_value)
        })
    }

    private CreateDecorate(vector:Vector,x:number,y:number,season:number){
        //先创树测试
        let area = x * y
        let TreeCount = area * 100
        for(let i = 0 ; i < TreeCount ; i++){
            Timers.CreateTimer(i*0.01,()=>{
                let Dec = new DecoratorFactory(season)
                let models = Dec.GetRandomModel()
                let create_model = ""
                table.foreach(models,(k,v)=>{
                let ThisRandom = math.random()
                     if(ThisRandom < k)
                     {
                         create_model =  table.random(models[k][Enum.model_type.树].models)
                         return 'stop'
                     }
                 })
                let collisionU = CreateUnitByName("npc_dota_hero_crystal_maiden",vector,false,null,null,null)
                let randomV = vector.__add(RandomVector(area * 2048))
                let h = GetGroundHeight(randomV,collisionU)
                h > 90 && SpawnEntityFromTableSynchronous('prop_dynamic',{
                    model : "models/lowpoly_tree/sm_tree_round_03.vmdl",
                    scales:"0.2 0.2 0.2",
                    origin:randomV,
                    angles:`0 ${RandomInt(0,360)} 0`
                })
            })
        }
    }
}