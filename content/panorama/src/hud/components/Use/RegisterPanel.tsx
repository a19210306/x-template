import React,{useContext,useEffect} from 'react';
import { Context } from '../GameUI/Gcontext';

type useRegisterPresentPanelProps = {
    __set_prsend_panel:(Panel: Panel | undefined) => void
}

export const useRegisterPresentPanel = (props:useRegisterPresentPanelProps) => {

    return {
        onmouseover:(panel:Panel)=>{
            $.Msg("over")
            props.__set_prsend_panel(panel)},
        onmouseout:(panel:Panel)=>{
            $.Msg("out")
            props.__set_prsend_panel(undefined)},
    }
}

type useRegisterUi = {
    _Panel: Panel | undefined
    _UiName:string
}

export const useRegisterUi = (props:useRegisterUi) => {
    const {__uilist_dispatch} = useContext(Context)
    
    useEffect(()=>{
        __uilist_dispatch!({_type:'addUilist',_UiName:props._UiName,_Panel:props._Panel})
    },[])
}