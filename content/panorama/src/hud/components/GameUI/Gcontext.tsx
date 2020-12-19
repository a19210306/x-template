import React , {useState,useCallback, createContext,useEffect,useContext ,useRef,useLayoutEffect, Children, useReducer, Dispatch} from "react";
import raf from 'raf';
import { useNetTableKey } from "react-panorama";


type GContext = {
    __set_prsend_panel:(Panel:Panel|undefined)=>void
    __uilist_dispatch?: React.Dispatch<Uiaction>
    __ui_sendmassage?: React.Dispatch<Uiaction>
    __ui_Manager?: Record<string, Panelstate>
    __register?:React.MutableRefObject<(action: Uiaction) => void>
}

let initContext:GContext = {
    __set_prsend_panel:(Panel)=>{},
}

export const Context = createContext(initContext)

type ContextProps = {
    children?:any
}

type DragExecuteProps = {
    PresentPanel:undefined|Panel
}

type Uilist = Record<string,Record<ui_state,Panel>>

const initUilist:Uilist = {}

type Uiaction = {
    _type?:'addUilist'|'ClosePanel'|'OpenPanel'|'togglePanel'
    _UiName?:string
    _Panel?:Panel
    _operation_panel?:string
    _active?:ui_state
}

export enum ui_state {
    "开启",
    "隐藏",
    "跟随父级的子面板",
}

export enum ui_list {
    "大地图" = "minimap"
}


type Panelstate = {
   _PanelState?: ui_state;
   _PanelInstance?: Panel;
}

type PanelRecord = Record<string,Panelstate>

const initRecordPanel:PanelRecord = {
     "root":{_PanelState:ui_state.开启,_PanelInstance:$.GetContextPanel()}
}

type Reducer<S,T> = (state:S,action:T) => S
type UilistReducer = Reducer<PanelRecord,Uiaction>

const UilistReducer:UilistReducer = (state:PanelRecord,action:Uiaction) => {
    let name = action._operation_panel
    switch(action._type){
        case 'addUilist':
            return {[action._operation_panel!]:{_PanelState:action._active,_PanelInstance:action._Panel}}
        case 'ClosePanel':
             state[name!]._PanelInstance!.visible = false
            return state
        case 'OpenPanel':
             state[name!]._PanelInstance!.visible = false
            return state
        case 'togglePanel':
                state[name!]._PanelInstance!.visible = state[name!]._PanelInstance!.visible ? false : true
                let visible_tag = state[name!]._PanelState =  state[name!]._PanelState == ui_state.隐藏 ? ui_state.开启 : ui_state.隐藏
                let newtag = {[action._operation_panel!]:{_PanelState:visible_tag,_PanelInstance:state[action._operation_panel!]._PanelInstance}}
            return newtag
        default:
            return state
    }
}

export const GContext = (props:ContextProps) => {
    const [__ui_Manager,__ui_sendmassage] = useReducer(UilistReducer,{})
    
    const __persend_panel = useRef<Panel|undefined>(undefined)
    const __set_persend_panel = useRef((Panel?:Panel)=>{
        if(__mouse_state.current) return
        __persend_panel.current = Panel
    })
    const __mouse_state = useRef(false)
    const __ui_static_store = useRef(initRecordPanel) 
    
    const __register = useRef((action:Uiaction)=>{
        __ui_static_store.current = UilistReducer(__ui_static_store.current,action)
    })

    const __gameuistate = useNetTableKey("ui",'alluiState')


    useEffect(()=>{
       if(__gameuistate && Object.keys(__ui_static_store.current).length != Object.keys(__ui_Manager).length)
       {
          let obj:PanelRecord = __ui_static_store.current
          let namelist = Object.keys(obj)
          namelist.forEach(value=>{
              __ui_sendmassage({_type:'addUilist',_operation_panel:value,_active:__ui_static_store.current[value]._PanelState,_Panel:__ui_static_store.current[value]._PanelInstance})
          })
       }
    },[__gameuistate])

    


    useLayoutEffect(()=>{
        GameUI.SetMouseCallback((event)=>{
            if(event == "pressed")
            {
                __mouse_state.current = true
                return false
            }
            else
            {
                __mouse_state.current = false
                return false
            }            
        })
    },[])

    const DragExecute = () =>{
        
        useLayoutEffect(()=>{
            raf(function tick(time){
                if(__persend_panel != undefined && __mouse_state.current == true && GameUI.GetCursorPosition())
                {
                    __persend_panel.current!.style.marginLeft = `${GameUI.GetCursorPosition()[0]}px`;
                    __persend_panel.current!.style.marginTop = `${GameUI.GetCursorPosition()[1]}px`;
                }
                raf(tick)
            })
        })

        return <>
               </>
    }

    return <Context.Provider value={{__set_prsend_panel:__set_persend_panel.current,
             __ui_sendmassage:__ui_sendmassage,__ui_Manager:__ui_Manager,__register:__register
            }}>
            <DragExecute/>
            {props.children}
           </Context.Provider>
}


