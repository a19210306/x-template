import { registerModifier, BaseModifier } from '../../lib/dota_ts_adapter';

@registerModifier()
export class ship_move_speed extends BaseModifier {
    DeclareFunctions(){
        return [modifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE]
    }

    GetModifierMoveSpeedBonus_Percentage(){
        return 0.001
    }
}