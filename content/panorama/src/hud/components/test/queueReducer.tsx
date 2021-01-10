import * as data from '@nickradford/ts-data-structures'
import id from 'hyperid'


export type PopWindosQueueReduerType<T> = {
    data:data.Stack<T>
}

export type PopWindosAction = {
    type:PopWindosActionEnum.push | PopWindosActionEnum.pop
    uiname?:string
}

export enum PopWindosActionEnum {
    "push",
    "pop",
}

var PopWindosQueueReduerInitState = new data.BinaryTree<string>()

export const PopWindosQueueReduer = (state = PopWindosQueueReduerInitState,action:PopWindosAction) => {
    switch(action.type){
        case PopWindosActionEnum.push:
            if(action.uiname){
                PopWindosQueueReduerInitState.add(action.uiname)
                $.Msg("add =" + action.uiname)
                return state
            }
        case PopWindosActionEnum.pop:
            let Tpop = PopWindosQueueReduerInitState.map((a:any)=>$.Msg(a))
            $.Msg(Tpop)
            return state
        default:
            return state
    }
}