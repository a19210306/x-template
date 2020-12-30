import { DecoratorFactory } from './Decorate';
import  * as Enum  from '../System/Enum'
import { AllLand } from './LandCotainer';
import { IocCotainer } from '../System/IOCotainer';
import { GameStart, initCharacter } from '../System/GameState';

export class InitDecorate {

    static InitAllDecorator(AllLand:AllLand){
        let daley = 0
        for(let i in AllLand){
            InitDecorate.CreateTree(AllLand[i])
        }
    }

    static CreateTree(land:{vec:Vector,range:number,season:number}){
        let landtree:number[] = []
        let delay = 0
        Timers.CreateTimer(()=>{
            let randomV = land.vec.__add(Vector(RandomInt(-land.range , land.range ),RandomInt(-land.range , land.range),0));
            let h = GetGroundHeight(randomV, IocCotainer.instance.resolve<GameStart>("GameStart")._Coliision);
            if(h < 25 || h > 50) return 0.0001
            let lastvec = Vector(randomV.x, randomV.y, h - 3);
            let part = ParticleManager.CreateParticle("particles/decorate/tree/plam.vpcf",ParticleAttachment_t.PATTACH_WORLDORIGIN,null)
            ParticleManager.SetParticleControl(part,0,lastvec)
            ParticleManager.SetParticleControl(part,2,Vector(RandomFloat(0.7,1),0,0))
            ParticleManager.SetParticleControl(part,3,Vector(RandomFloat(0.7,1),0,0))
            ParticleManager.SetParticleControl(part,4,Vector(RandomFloat(0.7,1),0,0))
            landtree.push(part)
            print(landtree.length)
            if(landtree.length > 400){
                //this.CreateSundries(land)
                return 
            }
            // table.foreach(models, (k, v) => {
            //     let ThisRandom = math.random();
            //     if (ThisRandom < k) {
            //         create_model = table.random(models[k][Enum.model_type.树].models);
            //         return 'stop';
            //     }
            // });
            // tmpTreeEntity.push(SpawnEntityFromTableSynchronous('prop_detail', {
            //     model: create_model,
            //     scales: `${RandomFloat(0.07,0.2)} ${RandomFloat(0.07,0.2)} ${RandomFloat(0.07,0.2)}`,
            //     origin: lastvec,
            //     angles: `0 ${RandomInt(0,360)} 0`,
            //     rendercolor:`${RandomInt(200,255)} ${RandomInt(200,255)} ${RandomInt(200,255)} 255`,
            //     solid:"0",
            //     rendertocubemaps:"0"
            // }))
            // if(tmpTreeEntity.length == (land.range - 1500) / 3){
            //     InitDecorate.CreateSundries(land)
            //     return 
            // }
            return 0.0001
        })}

    static CreateSundries(land:{vec:Vector,range:number,season:number}){
            let landSundries:number[] = []
            let delay = 0
            Timers.CreateTimer(()=>{
                let randomV = land.vec.__add(Vector(RandomInt(-land.range , land.range ),RandomInt(-land.range , land.range),0));
                let h = GetGroundHeight(randomV, IocCotainer.instance.resolve<GameStart>("GameStart")._Coliision);
                if(h < 50) return 0.001
                let lastvec = Vector(randomV.x, randomV.y, h - 3);
                let part = ParticleManager.CreateParticle("particles/decorate/tree/tropical_plant.vpcf",ParticleAttachment_t.PATTACH_WORLDORIGIN,null)
                ParticleManager.SetParticleControl(part,0,lastvec)
                landSundries.push(part)
                print("sundries")
                print(landSundries.length)
                if(landSundries.length > 300){
                    return 
                }
                return 0.001
    })}
}