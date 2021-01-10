import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { render, useGameEvent, useNetTableValues } from 'react-panorama';
import { connect, Provider,useDispatch,useSelector } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import loggedReducer from './components/test/loggedReducer';
import counterReducer from './components/test/counterReducer';
import { App } from './components/test/view';
import { panelContainerRedux, PanelContainerTypeEnum } from './components/test/panelContainer';
import { PopWindosAction, PopWindosActionEnum, PopWindosQueueReduer } from './components/test/queueReducer';
import id from 'hyperid'
import { polyfill } from 'raf';
const store = createStore(combineReducers({log:loggedReducer,popQueue:PopWindosQueueReduer,PanelContainer:panelContainerRedux}))


const Anniu = () => {
   const dispatch = useDispatch()

   return (
    <Panel style={{flowChildren:'down'}} >
             <TextButton text="调试脚本" onactivate={()=>{
                 GameEvents.SendCustomGameEventToServer("test",{sdsd:123});
                 dispatch<PopWindosAction>({type:PopWindosActionEnum.push,uiname:id().uuid})
             }}
   style={{backgroundColor:"blue",width:'200px',height:'70px'}}
   />
<TextButton ref={(panel)=>{dispatch({type:PanelContainerTypeEnum.注册,uiName:'321',panelExample:panel})}} text="删除粒子" onactivate={()=>{
                 GameEvents.SendCustomGameEventToServer("test2",{sdsd:123})
                 dispatch<PopWindosAction>({type:PopWindosActionEnum.pop})
             }}
   style={{backgroundColor:"blue",width:'200px',height:'70px'}}
   />
   </Panel>
   )
}
render(
<>
<Provider store={store}>
<App/>
<Anniu/>
</Provider>
</>
 ,$.GetContextPanel()); // 默认在中间渲染的红色REACT-PANORAMA标志，从这里开始修改为你自己喜欢的

 
 
(() => {
    // GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_HEROES, false); // 你也可以按你之前喜欢的方式写代码
    // GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_TIMEOFDAY, false);
    GameUI.SetCameraDistance(2200)
    GameUI.SetCameraPitchMax(90)
    GameUI.SetCameraPitchMin(90)
    GameUI.SetCameraYaw(450)
    GameEvents.Subscribe( "dota_player_update_query_unit", (event)=>{$.Msg(event);$.Msg("hahahahah")} )

})();
