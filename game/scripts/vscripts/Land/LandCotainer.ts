import  * as Enum  from '../System/Enum'

type cosmetics = Record<string,string>

export interface Landtemplate {
    _name:string
    _LandInstance:CBaseEntity
    _Cosmetics:cosmetics
    _GetAllCosmetics:()=>string[]
    _climate:Enum.climate
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