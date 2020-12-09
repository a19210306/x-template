import { __LandbetweenDistance, __LandAngle, __LandCount, __LandPrefixName } from "./Const";
import { LandGenerator } from './Lands';
import { reloadable } from '../lib/tstl-utils';


@reloadable
export class GenerateMap {
    private _map_data: Array<number | undefined>[];
    private _size: number;
    private _original: number;
    private _smooth: number;
    private _border: number;
    private _LandPrefixName: string;


    public constructor(smooth: 32 | 64 | 128 | 256, border: 0.1 | 0.2 | 0.3 | 0.4) {
        this._map_data = [];
        this._smooth = smooth;
        this._original = 32768;
        this._size = this._original / smooth;
        this._border = border;
        this._LandPrefixName = __LandPrefixName;
        this.Init2DArray();
        this.InitMap2D();
    }

    Init2DArray() {
        for (let i = 0; i < this._size; i++) {
            this._map_data[i] = [];
        }
    }

    InitMap2D() {
        for (let i = 0; i < this._size; i++) {
            for (let j = 0; j < this._size; j++) {
                this._map_data[i][j] = 0;
            }
        }
    }


    tryCreateLand() {
        let tmp:{widthindex:number,heightindex:number,angle:number,landName:string}[] = []
        while(tmp[__LandCount] == null){
            let widthIndex = RandomInt(-math.floor(this._size * this._border),math.floor(this._size * this._border))
            let heightIndex = RandomInt(-math.floor(this._size * this._border),math.floor(this._size * this._border))
            let tryPackage = LandGenerator.getinstance().trySimulation2Create(Vector(widthIndex * this._smooth,heightIndex * this._smooth,0))
            if(tryPackage._landName != ""){
                DeepPrintTable(tryPackage)
                tmp.push({widthindex:widthIndex * this._smooth,heightindex:heightIndex * this._smooth,angle:tryPackage._angle,landName:tryPackage._landName})
            }
        }
        print("Create over")
        return tmp

        // let tmp:{widthindex:number,heightindex:number,angle:number,landName:string}[] = []
        // let count = 0
        // while(tmp[__LandCount] == null)
        // {
        //     let on_off = false;
        //     let widthIndex = RandomInt(-math.floor(this._size * this._border),math.floor(this._size * this._border))
        //     let heightIndex = RandomInt(-math.floor(this._size * this._border),math.floor(this._size * this._border))
        //     let _my_vec = Vector(widthIndex,heightIndex)
        //     if(tmp)
        //     {
        //         tmp.map(value=> {
        //             let _target_vec = Vector(value.widthindex / this._smooth,value.heightindex / this._smooth)
        //             if(_target_vec.__sub(_my_vec).Length2D() < 20)
        //             {
        //                 on_off = true
        //                 return;
        //             } 
        //         })
        //     }
        //     if(on_off == false)
        //     {
        //         let t = LandGenerator.getinstance().tryCreateLand(Vector(widthIndex * this._smooth,
        //             heightIndex * this._smooth,0),'land')
        //         if(t.angle != -1)
        //         tmp.push({widthindex:widthIndex * this._smooth,heightindex:heightIndex * this._smooth,angle:t.angle,landName:t.name})
        //     }
        // }
        // return tmp
    }


} 
