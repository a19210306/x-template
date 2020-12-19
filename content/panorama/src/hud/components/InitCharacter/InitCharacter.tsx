import { render, useNetTableValues } from 'react-panorama';
import React,{useContext,useMemo}from 'react';
import { Context, ui_state } from '../GameUI/Gcontext';

export const Time = () => {
    const __time = useNetTableValues('Game_State')
    return <Label text={__time.game_state.current_loacl_time} style={{fontSize:'50px',align:'center center'}}/>
}

export const State = () => {
    const __state = useNetTableValues('Game_State')

    return <Label text={"角色创建阶段"} style={{fontSize:'50px',align:'center center',marginTop:'150px'}}/>
}


export const InitCharacterMain = () => {
    const __state = useNetTableValues('Game_State')

    if(__state.game_state.current_state < 2)
    {
        return <Panel style={{width:'100%',height:'100%',backgroundColor:"blue"}}> 
               <State/>
               <Time/> 
               </Panel>
    }
    return <></>

}


