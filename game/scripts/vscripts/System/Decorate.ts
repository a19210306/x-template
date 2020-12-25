export class DecoratorFactory {
    _climat_erange: number;

    constructor() {
        this._climat_erange = 100;
    }

    GetModel():string{
        this.CurveGenerator()
        return 
    }

    CurveGenerator(season_value: number, range: number): number[] {
        let curve: number[] = [];
        for (let i = season_value - range; i < (season_value + range / 2); i++) {
            if (math.abs(i - season_value) > range) {
                print(i);
                curve[i] = 0;
                continue;
            }
            curve[i] = 0.9 / math.max(math.abs(i - season_value + 1), 1);
        }
        return curve;
    }
}

export enum model_type {
    "石头",
    "草",
    "杂物",
    "树"
}

export enum climate {
    "寒带",
    "亚寒带",
    "温带",
    "温热带",
    "热带"
}

type Decoratetype = {
    season_value: number;      //季节中心
    range: number;      //出现的范围
    model: string[] | string;      //模型地址
    type: model_type;  //模型类型
    elevation:[number,number]|"all"|"defaul"  // 海拔范围 1=中心 2=范围
}[];


export const DecorateTable: Decoratetype = [
    {
        season_value: 50,
        range: 40,
        model: ["models/lowpoly_tree/sm_swamp_root_01.vmdl",
                "models/lowpoly_tree/sm_tree_log_01.vmdl",

        ],
        type: model_type.杂物,  // 温带杂物
        elevation:"defaul"
    },
    {
        season_value: 70,
        range: 20,
        model: ["models/lowpoly_tree/sm_swamp_root_02.vmdl",
        "models/lowpoly_tree/sm_terrain_grassedge_roots_01.vmdl",
        "models/lowpoly_tree/sm_terrain_grassedge_roots_02.vmdl",
        "models/lowpoly_tree/sm_tree_log_01.vmdl",
        "models/lowpoly_tree/sm_tree_log_02.vmdl",
        "models/lowpoly_tree/sm_tree_pine_base_01.vmdl",
        "models/lowpoly_tree/sm_tree_pine_dead_01.vmdl",
        "models/lowpoly_tree/sm_tree_stump_01.vmdl",
        "models/lowpoly_tree/sm_tree_stump_02.vmdl",
        "models/lowpoly_tree/sm_tree_stump_03.vmdl",
        "models/lowpoly_tree/sm_tree_stump_04.vmdl",
        "models/lowpoly_tree/sm_tree_swamp_01.vmdl",
        "models/lowpoly_tree/sm_tree_swamp_02.vmdl",
        "models/lowpoly_tree/sm_tree_swamp_03.vmdl",
        "models/lowpoly_tree/sm_tree_swamp_04.vmdl",
        "models/lowpoly_tree/sm_tree_swamp_branch_01.vmdl",
        "models/lowpoly_tree/sm_tree_swamp_branch_02.vmdl",
        ],
        type: model_type.杂物,  // 温热带杂物
        elevation:"defaul"
    },  
    {
        season_value: 70,
        range: 20,
        model: ["models/lowpoly_tree/sm_tree_swamp_root_01.vmdl",
        "models/lowpoly_tree/sm_tree_swamp_root_02.vmdl",
        "models/lowpoly_tree/sm_tree_swamp_stump_01.vmdl",
        "models/lowpoly_tree/sm_tree_swamp_stump_02.vmdl",
        "models/lowpoly_tree/sm_tree_vines_01.vmdl",
        "models/lowpoly_tree/sm_tree_vines_02.vmdl",
        "models/lowpoly_tree/sm_tree_vines_03.vmdl",
        "models/lowpoly_tree/sm_tree_vines_04.vmdl"
        ],
        type: model_type.杂物,  // 热带杂物
        elevation:"defaul"
    },
    {
        season_value: 50,
        range: 35,
        model: ["models/lowpoly_tree/sm_plant_grass_01.vmdl",
                "models/lowpoly_tree/sm_plant_grass_02.vmdl",
                "models/lowpoly_tree/sm_plant_grass_03.vmdl",
                "models/lowpoly_tree/sm_plant_grass_04.vmdl",
                "models/lowpoly_tree/sm_plant_grass_05.vmdl",
                "models/lowpoly_tree/sm_tree_log_02.vmdl",
                "models/lowpoly_tree/sm_tree_pine_base_01.vmdl"
        ],
        type: model_type.草,  // 温带普通草
        elevation:"defaul"
    },
    {
        season_value: 75,
        range: 25,
        model: ["models/lowpoly_tree/sm_rock_caveinterior_01.vmdl",
                "models/lowpoly_tree/sm_rock_caveinterior_02.vmdl",
                "models/lowpoly_tree/sm_rock_cluster_large_01.vmdl",
                "models/lowpoly_tree/sm_rock_cluster_large_02.vmdl",
                "models/lowpoly_tree/sm_rock_cluster_large_03.vmdl",
                "models/lowpoly_tree/sm_rock_cluster_large_04.vmdl",
                "models/lowpoly_tree/sm_rock_cluster_large_05.vmdl",
                "models/lowpoly_tree/sm_rock_cluster_large_06.vmdl",
                "models/lowpoly_tree/sm_rock_pile_01.vmdl",
                "models/lowpoly_tree/sm_rock_pile_02.vmdl",
                "models/lowpoly_tree/sm_rock_pile_03.vmdl",
                "models/lowpoly_tree/sm_rock_pile_04.vmdl",
                "models/lowpoly_tree/sm_rock_pile_05.vmdl",
                "models/lowpoly_tree/sm_rock_pile_curved_01.vmdl",
                "models/lowpoly_tree/sm_rock_pile_curved_02.vmdl",
                "models/lowpoly_tree/sm_rock_rounded_01.vmdl",
                "models/lowpoly_tree/sm_rock_small_01.vmdl",
                "models/lowpoly_tree/sm_rock_small_02.vmdl",
                "models/lowpoly_tree/sm_rock_wall_01.vmdl",
                "models/lowpoly_tree/sm_rock_wall_02.vmdl",
                "models/lowpoly_tree/sm_terrain_dustpile_long_01.vmdl",
                "models/lowpoly_tree/sm_terrain_dustpile_small_01.vmdl",
                "models/lowpoly_tree/sm_terrain_dustpile_small_02.vmdl",
                "models/lowpoly_tree/sm_terrain_rubble_pebbles_01.vmdl",
                "models/lowpoly_tree/sm_terrain_rubble_pebbles_02.vmdl",
                "models/lowpoly_tree/sm_terrain_rubble_pebbles_03.vmdl",
        ],
        type: model_type.石头,  // 热带石头
        elevation:'all'
    },
    {
        season_value: 50,
        range: 30,
        model: [
            "models/lowpoly_tree/sm_terrain_grassedge_01.vmdl",
            "models/lowpoly_tree/sm_terrain_grassedge_02.vmdl",
            "models/lowpoly_tree/sm_terrain_grassedge_03.vmdl",
            "models/lowpoly_tree/sm_terrain_grassedge_04.vmdl",
            "models/lowpoly_tree/sm_terrain_rubble_pebbles_01.vmdl",
            "models/lowpoly_tree/sm_terrain_rubble_pebbles_02.vmdl",
            "models/lowpoly_tree/sm_terrain_rubble_pebbles_03.vmdl",

        ],
        type: model_type.石头,  // 温带石头
        elevation:'all'
    },
    {
        season_value: 50,
        range: 30,
        model: [
            "models/lowpoly_tree/sm_terrain_grassedge_01.vmdl",
            "models/lowpoly_tree/sm_terrain_grassedge_02.vmdl",
            "models/lowpoly_tree/sm_terrain_grassedge_03.vmdl",
            "models/lowpoly_tree/sm_terrain_grassedge_04.vmdl",
        ],
        type: model_type.石头,  // 温带石头
        elevation:'all'
    },
    {
        season_value: 50,
        range: 30,
        model: [
            "models/lowpoly_tree/sm_tree_01.vmdl",
            "models/lowpoly_tree/sm_tree_02.vmdl",
            "models/lowpoly_tree/sm_tree_tallround_01.vmdl",
        ],
        type: model_type.树,  // 温带树
        elevation:'defaul'
    },
    {
        season_value: 50,
        range: 30,
        model: [
            "models/lowpoly_tree/sm_tree_polypine_01.vmdl",
            "models/lowpoly_tree/sm_tree_polypine_02.vmdl",
            "models/lowpoly_tree/sm_tree_polypine_03.vmdl",
            "models/lowpoly_tree/sm_tree_polypine_sparse_01.vmdl",
            "models/lowpoly_tree/sm_tree_polypine_sparse_02.vmdl",
            "models/lowpoly_tree/sm_tree_polypine_sparse_03.vmdl",
            "models/lowpoly_tree/sm_tree_round_01.vmdl",
            "models/lowpoly_tree/sm_tree_round_02.vmdl",
            "models/lowpoly_tree/sm_tree_round_03.vmdl",
            "models/lowpoly_tree/sm_tree_round_04.vmdl",
            "models/lowpoly_tree/sm_tree_round_05.vmdl"
        ],
        type: model_type.树,  // 温热带树
        elevation:'defaul'
    }


];
