export enum model_type {
    "石头",
    "草",
    "杂物",
    "树"
}

export const model_probability = {
    [model_type.石头] : 0.2,
    [model_type.杂物]:0.4,
    [model_type.树]:0.4,
}


export enum climate {
    "寒带",
    "亚寒带",
    "温带",
    "温热带",
    "热带"
}

export const climate_vector ={
    "寒带起始坐标" : Vector(-16384,16384,0),
    "热带起始坐标" : Vector(-16384,16384,0),
}

export enum land_climate {
    "淡绿黄",
    "矿山",
    "咖啡黑",
    "雪地",
    "黄灰色",
    "红土",
    "翠绿黄",
    "藏蓝黑",
    "金红色",
    "热带雨林",
    "石灰质",
}

export const SeasonSort = [
    land_climate.雪地,
    land_climate.藏蓝黑,
    land_climate.石灰质,
    land_climate.咖啡黑,
    land_climate.黄灰色,
    land_climate.淡绿黄,
    land_climate.翠绿黄,
    land_climate.热带雨林,
    land_climate.金红色,
    land_climate.矿山,
    land_climate.红土,
]

