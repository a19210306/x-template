import { Landtemplate, climate, LandCotainerManager } from './LandCotainer';
import { LandCollision } from './LandColisionList';
import { LandAngle, LandPrefixName } from './Const';
import { reloadable } from "../lib/tstl-utils";
import '../utils/table'

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

    public tryCreateLand(point: Vector,landtype:"land"|"island") {
        let coliision_unit = CreateUnitByName("npc_dota_hero_earthshaker",Vector(0,0,0),true,null,null,DOTATeam_t.DOTA_TEAM_BADGUYS)
        let switchCollision = true;
        let tmp = Object.keys(LandCollision)
        let tmpShuffle = table.shuffle(tmp)
         for (let land of tmpShuffle) {
            switchCollision = true
            let collisions = LandCollision[land].LandCollisionList;
            let angle = -1;
            let original_height = LandCollision[land].LandHeight
            let anglekey = Object.keys(LandAngle)
            let tmpangle = table.shuffle(anglekey)
            for (let j of tmpangle) {
                let new_angle = collisions.map((value) => {
                    let pointArray = value.origin.split(" ");
                    let x = pointArray[0];
                    let y = pointArray[1];
                    let vec = Vector(+x, +y, 0);
                    return RotatePosition(point, QAngle(0, LandAngle[+j], 0), vec);
                });
                for (let i of new_angle) {
                    let height = GetGroundHeight(i, coliision_unit);
                    print("height"+height)
                    if (height < -9999999999) {
                        switchCollision = false;
                        break;
                    }
                    angle = LandAngle[+j -1];
                }
                print(switchCollision)
                if(switchCollision)
                {
                 //   DOTA_SpawnMapAtPosition(`${landtype + "/" + land }`,Vector(point.x,point.y,height),false,()=>{},()=>{},undefined)
                    let landex = SpawnEntityFromTableSynchronous("prop_dynamic",{
                        model:`models/land/${land}.vmdl`,
                        angles:`0 ${angle} 0`,
                        origin:`${point.x} ${point.x} ${original_height}`
                    })
                    print(landex.GetAbsOrigin())
                    coliision_unit.RemoveSelf()
                    return {angle:angle,name:land}}
                }
            }
        }
}


