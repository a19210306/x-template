import { __LandbetweenDistance, __LandAngle, __LandCount, __LandPrefixName, __border, __land_beetween_distance } from './Const';
import { LandGenerator } from './Lands';
import { reloadable } from '../lib/tstl-utils';
import { LandCollision, Landtetris } from "./LandColisionList";

type Trypackage = { x?: number, y?: number; }[];
type CreateLandNamePackage = { name: string, package: Trypackage, ABSorigin: Vector; };

@reloadable
export class GenerateMap {
    public static _GenerateMap: GenerateMap;
    private _map_data: number[][];
    private _size: number;
    private _original: number;
    private _smooth: number;
    private _LandPrefixName: string;


    public constructor() {
        this._map_data = [];
        this._original = 32768;
        this._size = this._original / 2048 / 2;
        this._LandPrefixName = __LandPrefixName;
        this.InitMap2D();
        this.Generator();
    }

    public static Getinstance() {
        if (this._GenerateMap == null) {
            this._GenerateMap = new GenerateMap();
        }
        return this._GenerateMap;
    }

    Init2DArray() {
        for (let i = -this._size; i < this._size; i++) {
            this._map_data[i] = [];
        }
    }

    InitMap2D() {
        this.Init2DArray();
        for (let i = -this._size + 1; i < this._size; i++) {
            for (let j = -this._size + 1; j < this._size; j++) {
                this._map_data[i][j] = 0;
            }
        }
    }

    Generator() {
        let tmp: CreateLandNamePackage[] = [];
        for (let GeneraCount = 0; GeneraCount < __LandCount; GeneraCount++) {
            let PresentCreateland = this.CreateLand();
            if (PresentCreateland) {
                if (tmp.length == 0) {
                    tmp.push(PresentCreateland);
                    continue;
                }
                table.foreach(tmp, (_, v: CreateLandNamePackage) => {
                    if(this.collisionDetection(this.theEdge(PresentCreateland.package),v.package)){
                        tmp.push(PresentCreateland)
                        return 'stop'
                    }else{
                        GeneraCount--;
                    }
                });
            } else {
                GeneraCount--;
            }
        }

        if (tmp) {
            table.foreach(tmp, (_, v: CreateLandNamePackage) => {
                DOTA_SpawnMapAtPosition("land/test3", Vector(v.ABSorigin.x *2048,v.ABSorigin.y * 2048), false, () => { print("create nav"); }, () => { }, undefined);
                DebugDrawText(Vector(v.ABSorigin.x * 2048, v.ABSorigin.y * 2048, 100), "这里生成岛", false, 999999);
                table.foreach(v.package, (k, v: { x?: number; y?: number; }) => {
                    this._map_data[v.x][v.y] = 1;
                });
            });
        }
        this.floorInstanceLand();
    }

    floorInstanceLand() {
        for (let i = -this._size + 1; i < this._size; i++) {
            for (let j = -this._size + 1; j < this._size; j++) {
                if (this._map_data[i][j] == 0) {
                    DOTA_SpawnMapAtPosition("land/test", Vector(i * 2048, j * 2048, 0), false, () => { print("create nav"); }, () => { }, undefined);
                    DebugDrawText(Vector(i * 2048, j * 2048, 0), i + "," + j.toString(), false, 999999);
                }else{
                    DebugDrawCircle(Vector(i * 2048, j * 2048, 300),Vector(0,0,255),10,50,false, 999999)
                }
            }
        }
    }

    CreateLand(): CreateLandNamePackage {
        let x = RandomInt(-this._size, this._size);
        let y = RandomInt(-this._size, this._size);
        print("xy=" + x, y);
        let randomSelectLand = table.random(Landtetris);
        print("select=" + `x =${randomSelectLand.x}  y=${randomSelectLand.y}`);
        let tmp: Trypackage = [];
        let CreateLandNamePackage: CreateLandNamePackage = undefined;
        if (this._map_data[x] && this._map_data[y]) {
            for (let $x = 0; $x < randomSelectLand.x ; $x++) {
                for (let $y = 0; $y < randomSelectLand.y; $y++) {
                    if (!this._map_data[x - $x] || !this._map_data[x - $x][y + $y]) return undefined;
                    if ($x * $y == (randomSelectLand.x - 1 ) * (randomSelectLand.y -1)) {
                        tmp.push({ x: x - $x, y: y + $y });
                        CreateLandNamePackage = { name: randomSelectLand.name, package: tmp, ABSorigin: Vector(x, y, 0) };
                        return CreateLandNamePackage;
                    }
                    if (this._map_data[x - $x][y + $y] == 0) {
                        tmp.push({ x: x - $x, y: y + $y });
                    }
                    else {
                        return undefined;
                    }
                }
            }
        } else { return undefined; }
    }


    PrintMap2D() {
        print(this._map_data);
        DeepPrintTable(this._map_data);
    }

    collisionDetection(a:{x?:number,y?:number}[],b:{x?:number,y?:number}[]){
        let last = true
        table.foreach(a,(_,v:{x:number,y:number})=>{
            table.foreach(b,(_,s:{x:number,y:number})=>{
                if(v.y == s.y && s.x == v.x){
                    last = false
                    return 'stop'
                }
            })
        })
        return last
    }

    theEdge(data: Trypackage) {
        let newTrypackage: Trypackage = [];
        table.foreach(data, (_, v: { x: number, y: number; }) => {
                for(let i = 1 ; i < 10 ; i++)
                {
                    if(i != 5)
                    {
                        let v2d = this.direction(i)(v)
                        if(this.isOwnet(v2d,data)){
                            newTrypackage.push(this.direction(i)(v))
                        }
                    }
                }
        });
        print("newtrypack" + "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        print(newTrypackage.length + "length")
        return newTrypackage
    }

    isOwnet(v2d:{ x: number, y: number; },obj:Trypackage):Boolean{
        let off = true
        table.foreach(obj,(_,v:{ x: number, y: number; })=>{
            if(v.y == v2d.y && v.x == v2d.x){
                off = false
                return 'stop'
            }
        })
        return off
    }

    direction(dir: number) {
        switch (dir) {
            case 1:
                return function (data: { x: number, y: number; }) { return { x: data.x - 1, y: data.y - 1 }; };
                break;
            case 2:
                return function (data: { x: number, y: number; }) { return { x: data.x + 0, y: data.y - 1 }; };
                break;
            case 3:
                return function (data: { x: number, y: number; }) { return { x: data.x + 1, y: data.y - 1 }; };
                break;
            case 4:
                return function (data: { x: number, y: number; }) { return { x: data.x - 1, y: data.y - 0 }; };
                break;
            case 6:
                return function (data: { x: number, y: number; }) { return { x: data.x + 1, y: data.y + 0 }; };
                break;
            case 7:
                return function (data: { x: number, y: number; }) { return { x: data.x - 1, y: data.y + 1 }; };
                break;
            case 8:
                return function (data: { x: number, y: number; }) { return { x: data.x + 0, y: data.y + 1 }; };
                break;
            case 9:
                return function (data: { x: number, y: number; }) { return { x: data.x + 1, y: data.y + 1 }; };
                break;
        }
    }


} 
