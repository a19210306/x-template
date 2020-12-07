declare interface CustomNetTableDeclarations {
    game_timer: {
        game_timer: {
            current_time: number;
            current_state: 1 | 2 | 3 | 4 | 5;
            current_round: number;
        };
    };
    hero_list: {
        hero_list: Record<string, string> | string[];
    };
    map: {
        date: Record<number,{widthindex:number,heightindex:number}>;
    };
    custom_net_table_3: {
        key_1: number;
        key_2: string;
    };
}
