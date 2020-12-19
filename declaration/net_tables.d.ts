declare interface CustomNetTableDeclarations {
    Game_State: {
        game_state: {
            current_time: number;
            current_state: number;
            current_loacl_time?:number;
        };
        progress: {
            current_name:string;
            max_render_count:number;
        }
        current_render_count:{
            count:number;
        };
    };
    hero_list: {
        hero_list: Record<string, string> | string[];
    };
    map: {
        LandData:Record<string,{widthindex:number,heightindex:number,angle:number}>
    };
    ui: {
        alluiState:{switch:"close"|"initCharacter"|"Initmap"|"GameStart"|"GameEnd"}
    }
    custom_net_table_3: {
        key_1: number;
        key_2: string;
    };
}
