import { Landtemplate, climate, LandCotainerManager } from './LandCotainer';
import { LandCollision } from './LandColisionList';
import { __floorHeight, __LandAngle, __LandPrefixName } from './Const';
import { reloadable } from "../lib/tstl-utils";
import '../utils/table'


type tryCreatePackage = {
    _angle:number,
    _landName:string,
}

@reloadable
class Land implements Landtemplate {
    _name: string;
    _point: Vector;
    _LandInstance: CBaseEntity;
    _Climate: climate;
    _Cosmetics: Record<string, string>;
    _GetAllCosmetics: () => string[];
    _Collisions: any;
    _defualtHeight: number;
}

export class LandGenerator {
    private static LandGenerator: LandGenerator;

    constructor(
    ) { }

    public static getinstance(): LandGenerator {
        if (this.LandGenerator == null) {
            this.LandGenerator = new LandGenerator();
        }
        return this.LandGenerator;
    }

    public trySimulation2Create(Wrodorigin:Vector):tryCreatePackage{
        let ColiisionUnit = CreateUnitByName("npc_dota_hero_earthshaker",
        Vector(0, 0, 0), true, null, null, DOTATeam_t.DOTA_TEAM_BADGUYS);
        let LandCollisionKeys = Object.keys(LandCollision)
        let LandCollisionKeysShuffle = table.shuffle(LandCollisionKeys)
        let SelectLandName = "" //选择的大陆
        let SelectAngle:string|number = -1 //选择的角度
        DeepPrintTable(LandCollisionKeysShuffle)
        table.foreach(LandCollisionKeysShuffle,(index1,forCollisionKey)=>{
            if(SelectLandName != "") return
            table.foreach(LandCollision[forCollisionKey].LandCollisionList,(index2,vector:{origin:string})=>
            {
                SelectLandName = forCollisionKey
                let [x,y] = vector.origin.split(" ")
                let $x = (+x) + Wrodorigin.x
                let $y = (+y) + Wrodorigin.y
                let angleAarry = Object.keys(__LandAngle)
                angleAarry = table.shuffle(angleAarry)
                table.foreach(angleAarry,(index,key)=>{
                    SelectAngle = __LandAngle[key].toString()
                    let toAnglePoint = RotatePosition(Wrodorigin,QAngle(0,__LandAngle[key],0),Vector($x,$y,0))
                    if(GetGroundHeight(Vector(+x+Wrodorigin.x,+y+Wrodorigin.y,50),ColiisionUnit) < __floorHeight){
                        SelectLandName = "" // 一旦发现高度低于海面 立即中止 并把刚才设置的大陆名字置换为空
                        SelectAngle = -1
                        return 'stop'
                    }
                })
            })
        })
        print("selectlandname=" + SelectLandName)
        print("selectAngle=" + SelectAngle)
        ColiisionUnit.RemoveSelf()
        return {_angle:SelectAngle,_landName:SelectLandName}
    }
}


