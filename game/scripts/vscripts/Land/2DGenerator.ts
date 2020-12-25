import { __LandbetweenDistance, __LandAngle, __LandCount, __LandPrefixName, __border, __land_beetween_distance, __is_Land_count } from './Const';
import { reloadable } from '../lib/tstl-utils';
import { IslandTetris, Landtetris } from "./LandColisionList";
import { IocCotainer } from '../System/IOCotainer';
import { InitMap } from '../System/GameState';

type Trypackage = { x?: number, y?: number; }[];
type CreateLandNamePackage = { name: string, package: Trypackage, ABSorigin: Vector; };


let LandList = Landtetris.map(list=>list)

@reloadable
export class GenerateMap {
    public static _GenerateMap: GenerateMap;
    private _map_data: number[][];
    private _size: number;
    private _original: number;
    private _smooth: number;
    private _LandPrefixName: string;
    private _Selected:string[]


    public constructor() {
        this._map_data = [];
        this._original = 32768;
        this._size = this._original / 2048 / 2;
        this._LandPrefixName = __LandPrefixName;
        this._Selected = []
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
        let islandend = false;
        IocCotainer.instance.resolve<InitMap>("InitMap").SetProgress = {current_name:'创造陆地',current_render_count:0,max_render_count:300}
        Timers.CreateTimer(()=>{
            let PresentCreateland = LandList.length == 0 ? undefined : this.CreateLand(true)
            if (PresentCreateland && tmp.length < __LandCount) {
                if (tmp.length == 0) {
                    tmp.push(PresentCreateland);
                    table.foreach(PresentCreateland.package, (k, v: { x?: number; y?: number; }) => {
                        this._map_data[v.x][v.y] = 1;
                    });
                    this.RemoveList(string.gsub(PresentCreateland.name,"deg%d*","")[0])
                }
                else{
                    table.foreach(tmp, (_, v: CreateLandNamePackage) => {
                        if(this.collisionDetection(v.package,PresentCreateland.package)){
                            tmp.push(PresentCreateland)
                            table.foreach(PresentCreateland.package, (k, v: { x?: number; y?: number; }) => {
                                this._map_data[v.x][v.y] = 1;
                            });
                            this.RemoveList(string.gsub(PresentCreateland.name,"deg%d*","")[0])
                            return 'stop'
                        }
                    });
                }
            }
        print(LandList.length)
        print("llllllllength" + tmp.length)
        if (tmp.length >= __LandCount && tmp.length <  __LandCount +__is_Land_count){
            print("island")
            let PresentCreateland = this.CreateLand(false);
            if (PresentCreateland) {
                    table.foreach(tmp, (_, v: CreateLandNamePackage) => {
                        if(this.collisionDetection(v.package,PresentCreateland.package)){
                            tmp.push(PresentCreateland)
                            table.foreach(PresentCreateland.package, (k, v: { x?: number; y?: number; }) => {
                                this._map_data[v.x][v.y] = 1;
                            });
                          //  this.RemoveList(string.gsub(PresentCreateland.name,"deg%d*","")[0])
                            return 'stop'
                        }
                    })
                    
            }}
        
        if (tmp.length >= __LandCount +__is_Land_count) {
            table.foreach(tmp, (index, v: CreateLandNamePackage) => {
                print(index + "index")
                Timers.CreateTimer(index/3,()=>{
                    print(v.name)
                    DOTA_SpawnMapAtPosition(string.find(v.name,"is").length > 0 ? "island/" + v.name : "land/" + v.name, Vector(v.ABSorigin.x *2048,v.ABSorigin.y * 2048), false, () => { print("create nav"); }, () => { }, undefined);
                    IocCotainer.instance.resolve<InitMap>("InitMap").ProgressCountADD()
                    if(index == tmp.length)
                    {
                        print("floorInstanceLand")
                        this.floorInstanceLand()
                    }
                })
            });
            return        
        }
            return 0.03
    })
}

        
    floorInstanceLand() {
        let delay = 0
        let count = 0
        print("floor!@@#@!#@!#")
        for (let i = -this._size + 1; i < this._size; i++) {
            for (let j = -this._size + 1; j < this._size; j++) {
                if (this._map_data[i][j] == 0) {
                    const $i = i
                    const $j = j
                    Timers.CreateTimer(delay += 0.03,()=>{
                        print("cuurent i j = " + $i + "," + $j)
                        DOTA_SpawnMapAtPosition("land/test", Vector($i * 2048, $j * 2048, 0), false, () => { print("create nav"); }, () => { }, undefined);
                        IocCotainer.instance.resolve<InitMap>("InitMap").ProgressCountADD()
                        print("count="+count)
                        count++
                        if(count >= ((this._size-2)  * (this._size - 2) ) ){
                            IocCotainer.instance.resolve<InitMap>("InitMap").SetIsOver = true
                        }
                    })
                }
            }
        }
    }
//
    CreateLand(islandorland:boolean): CreateLandNamePackage {
        print("~~~~~~~~~~~~~~~~~~23123"+islandorland)
        IocCotainer.instance.resolve<InitMap>("InitMap").ProgressCountADD()
        let x = RandomInt(-this._size, this._size);
        let y = RandomInt(-this._size, this._size);
        print("xy=" + x, y);
        let randomSelectLand = table.random(islandorland? LandList : IslandTetris);
        print("select=" + `x =${randomSelectLand.x}  y=${randomSelectLand.y}`);
        let tmp: Trypackage = [];
        let CreateLandNamePackage: CreateLandNamePackage = undefined;
        if (this._map_data[x] && this._map_data[x][y]) {
            for (let $x = 0; $x < randomSelectLand.x ; $x++) {
                for (let $y = 0; $y < randomSelectLand.y; $y++) {
                    if (!this._map_data[x - $x] || !this._map_data[x - $x][y + $y]) return undefined;
                    if (this._map_data[x - $x][y + $y] != 0) return undefined;
                    print("x + y = " + $x + $y)
                    print( $x == randomSelectLand.x - 1 && $y == randomSelectLand.y - 1)
                    if ($x == randomSelectLand.x - 1 && $y == randomSelectLand.y - 1) {
                        tmp.push({ x: x - $x, y: y + $y });
                        CreateLandNamePackage = { name: randomSelectLand.name, package: tmp, ABSorigin: Vector(x, y, 0) }
                        return CreateLandNamePackage
                    }
                    if (this._map_data[x - $x][y + $y] == 0) {
                        tmp.push({ x: x - $x, y: y + $y });
                    }else {
                        return undefined;
                    }
                }
            }
        } else { return undefined; }
    }

    RemoveList(str:string){
        table.foreach(LandList,(k,v)=>{
            if(string.find(v.name,str).length > 0){
                print(k+"bei shan chu")
                LandList[k] = null
            }
        })
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
                for(let i = 1 ; i < 9 ; i++)
                {
                    if(i != 5)
                    {
                        let v2d = this.direction(i)(v)
                        newTrypackage.push(this.direction(i)(v))
                    }
                }
        });
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
                return function (data: { x: number, y: number; }) { return { x: data.x - 2, y: data.y - 2 }; };
                break;
            case 2:
                return function (data: { x: number, y: number; }) { return { x: data.x + 0, y: data.y - 2 }; };
                break;
            case 3:
                return function (data: { x: number, y: number; }) { return { x: data.x + 2, y: data.y - 2 }; };
                break;
            case 4:
                return function (data: { x: number, y: number; }) { return { x: data.x - 2, y: data.y - 0 }; };
                break;
            case 6:
                return function (data: { x: number, y: number; }) { return { x: data.x + 2, y: data.y + 0 }; };
                break;
            case 7:
                return function (data: { x: number, y: number; }) { return { x: data.x - 2, y: data.y + 2 }; };
                break;
            case 8:
                return function (data: { x: number, y: number; }) { return { x: data.x + 0, y: data.y + 2 }; };
                break;
            case 9:
                return function (data: { x: number, y: number; }) { return { x: data.x + 2, y: data.y + 2 }; };
                break;
        }
    }


} 
