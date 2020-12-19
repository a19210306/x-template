import { render, useNetTableValues } from 'react-panorama';
import React,{useContext,useMemo}from 'react';
import { Context, ui_state } from '../GameUI/Gcontext';

export const Time = () => {
    const __time = useNetTableValues('Game_State')
    return <Label text={__time.game_state.current_loacl_time} style={{fontSize:'50px',align:'center center'}}/>
}

export const State = () => {
    const __state = useNetTableValues('Game_State')
    return <Label text={"地图创建阶段"} style={{fontSize:'50px',align:'center center',marginTop:'150px'}}/>
}

export const Progress = () => {
    const __state = useNetTableValues('Game_State')

    return(
    <> 
    <Label text={`当前加载阶段:${__state.progress.current_name}`} style={{fontSize:'50px',align:'center center',marginTop:'250px'}}/>
    <Label text={`当前加载数量:${__state.current_render_count.count}`} style={{fontSize:'50px',align:'center center',marginTop:'350px'}}/>
    </>
)
}


export const InitMap = () => {
    const __state = useNetTableValues('Game_State')

    if(__state.game_state.current_state === 2)
    {
        return <Panel style={{width:'100%',height:'100%',backgroundColor:"yellow"}}> 
               <State/>
               <Progress/>
               {__state.game_state.current_time === -1 && <Time/>} 
               </Panel>
    }

    return <></>
}


