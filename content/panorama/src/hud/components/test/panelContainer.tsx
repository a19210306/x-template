type $PanelContainerState = {
    uiName:string
    panelExample:Panel
}

export type PanelContainerState = Partial<$PanelContainerState>

export type PanelContainerAction = {
    type:PanelContainerTypeEnum
    panelExample:Panel|undefined
    uiName:string
}

export enum PanelContainerTypeEnum{
    "注册",
    "注销",
    "显示",
    "隐藏"
}

export const panelContainerRedux = (state:PanelContainerState,action:PanelContainerAction) =>{
    switch(action.type){
        case PanelContainerTypeEnum.注册:
            $.Msg(action.uiName)
            return  {uiName:action.uiName,panelExample:action.panelExample}
        case PanelContainerTypeEnum.隐藏:
            if(state.panelExample){
                state.panelExample.visible = false
            }
            return state || {}
        case PanelContainerTypeEnum.显示:
                if(state.panelExample){
                    state.panelExample.visible = true
                }
                return state || {}
        default:
            return {uiName:"asd"}
    }
}