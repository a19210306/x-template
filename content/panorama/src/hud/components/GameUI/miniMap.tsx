import React, { memo, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { render, useGameEvent, useNetTableKey, useNetTableValues } from 'react-panorama';
import raf from 'raf';
import { Context, ui_list, ui_state } from './Gcontext';
import * as id from 'hyperid';
import { useRegisterPresentPanel } from '../Use/RegisterPanel';


const My_coor = memo(() => {
    const { __ui_Manager, __register } = useContext(Context);
    const [__my_angles, __set_my_angles] = useState([0, 0, 0]);
    const __my_position = useRef([0, 0, 0]);

    const Coordinatemapping = useMemo(() => {
        return {
            align: 'center center',
            preTransformRotate2d: __my_angles[1].toString() ? (__my_angles[1] + 450).toString() + "deg" : "0" + "deg",
            position: `${__my_position.current[0] / 16}px ${__my_position.current[1] / 16}px 0px`,
        };
    }, [__my_angles]);

    useLayoutEffect(() => {
        if (__ui_Manager![ui_list.大地图] && __ui_Manager![ui_list.大地图]._PanelState == ui_state.开启 && Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer())) {
            let _system_angles = Entities.GetAbsAngles(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));
            let _system_position = Entities.GetAbsOrigin(Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()));
            raf((time) => {
                __set_my_angles(_system_angles);
                __my_position.current = _system_position;
            });
        }
    }, [__ui_Manager, __my_angles]);

    return <Image
        src={'file://{images}/custom_game/test/minimap_icon_ship.png'}
        scaling="stretch-to-fit-y-preserve-aspect"
        style={{ ...Coordinatemapping, width: '30px', height: '80px' }}
        ref={(panel) => __register?.current({ _Panel: panel!, _active: ui_state.跟随父级的子面板, _operation_panel: 'my-coor', _type: 'addUilist' })} className="my-coor" />;
});

const Backgroud = memo(() => {
    return <Panel className="miniMapBackGroud" />;
});


const Land = () => {

    const __land = useNetTableValues('map');

    const Mapdata = useCallback(() => {
        let list: JSX.Element[] = [];
        $.Msg(__land)
        for (let i in __land.LandData) {
            list.push(<Image key={id().uuid} 
            src={`file://{images}/custom_game/minimap/land/${i}.png`}
            style={{
                align: 'center center',
                position: `${__land.LandData[i].widthindex / 16}px ${__land.LandData[i].heightindex / 16}px 0px`,
                preTransformRotate2d:__land.LandData[i].angle + "deg"
            }}
            />)
        }
        return list
    }, [__land]);

    return <>
        {Mapdata()}
    </>;
};

const Map = memo(() => {


    return <Panel className="map">
        <Panel style={{backgroundColor:'blue',width:'2048px',height:'2048px'}}>
        <Land />
        <My_coor />
        </Panel>
        </Panel>;
});//

export const MiniMap = () => {
    const { __register } = useContext(Context);
    const __gameuistate = useNetTableKey("ui", 'alluiState');

    useEffect(() => {
    });

    const fefresh = useCallback(() => {
        if (__gameuistate && __gameuistate.switch == 'GameStart') {
            return (
                <Panel className="main-minimap" ref={(panel) => { __register!.current!({ _active: ui_state.开启, _type: 'addUilist', _operation_panel: ui_list.大地图, _Panel: panel! }); }}>
                    <Backgroud />
                    <Map />
                </Panel>);
        }
        else {
            return <>
            </>;
        }//
    }, [__gameuistate]);

    return (fefresh()
    );
};

export default memo(MiniMap);