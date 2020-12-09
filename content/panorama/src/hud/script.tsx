import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { render, useGameEvent, useNetTableValues } from 'react-panorama';
import { GContext } from './components/GameUI/Gcontext'
import raf from 'raf';
import {Context} from './components/GameUI/Gcontext'
import {useRegisterPresentPanel} from './components/Use/RegisterPanel'
import MiniMap from './components/GameUI/miniMap';


const Anniu = () => {
    const {__ui_Manager,__ui_sendmassage} = useContext(Context)

   return (
       <Panel style={{flowChildren:'down'}}>
       <TextButton text="点击刷新地图" onactivate={()=>{
       GameEvents.SendCustomGameEventToServer("MapUpdate",{})}} 
   style={{backgroundColor:"blue",width:'200px',height:'70px'}}
   />
          <TextButton text="开启关闭地图" onactivate={()=>{
       __ui_sendmassage!({_type:'togglePanel',_operation_panel:'minimap'})}} 
   style={{backgroundColor:"blue",width:'200px',height:'70px'}}
   />
   </Panel>)
}


render(
<>
<GContext>
<Anniu/>
<MiniMap/>
</GContext>
</>, $.GetContextPanel()); // 默认在中间渲染的红色REACT-PANORAMA标志，从这里开始修改为你自己喜欢的

(() => {
    // GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_HEROES, false); // 你也可以按你之前喜欢的方式写代码
    // GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_TIMEOFDAY, false);
    GameUI.SetCameraDistance(1100)
    GameUI.SetCameraPitchMax(90)
    GameUI.SetCameraPitchMin(90)
})();
