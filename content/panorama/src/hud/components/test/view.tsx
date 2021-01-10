import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { PanelContainerState } from './panelContainer';

 
export function App(){
    const count:PanelContainerState = useSelector((state:any)=>state.PanelContainer)

    return (
        <>
        {$.Msg(count)}
        <Panel style={{backgroundColor:'rgba(125,100,255,0.5)',width:'500px',height:'500px'}}>
        <Panel style={{backgroundColor:'black',width:'200px',height:'200px'}}/>
        </Panel>
        </>
    )
}