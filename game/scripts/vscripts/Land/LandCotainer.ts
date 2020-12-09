
export enum climate {"极炎热","炎热","温带","寒冷","极寒冷"}
type cosmetics = Record<string,string>

export interface Landtemplate {
    _name:string
    _point:Vector
    _LandInstance:CBaseEntity
    _Climate:climate
    _Cosmetics:cosmetics
    _GetAllCosmetics:()=>string[]
    _Collisions:any
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
        this._Cotainer[name] = _examples
    }

}