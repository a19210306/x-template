type Collisions = {
   LandHeight:number
   LandCollisionList:{origin:string}[]
}

export const LandCollision:Record<string,Collisions> = 
    {land_1 : {
        LandHeight:-448,
        LandCollisionList:[
            {
                origin : "3123.9 -3206.62 7.06519"
            },
            {
                origin : "3384.45 -2223.57 6.70435"
            },
            {
                origin : "3204.29 213.053 6.20288"
            },
            {
                origin : "3057.18 2179.65 103.132"
            },
            {
                origin : "1555.08 2626.83 86.8207"
            },
            {
                origin : "54.5073 3280.29 46.4651"
            },
            {
                origin : "-1036.62 1767.59 37.3359"
            },
            {
                origin : "-1652.52 -102.65 70.689"
            },
            {
                origin : "-2158.15 -2982.78 60.8069"
            },
            {
                origin : "-919.06 -3384.06 38.4141"
            }
        ]
    },
    land_2 : {
        LandHeight:64,
        LandCollisionList:[
            {
                origin : "-2569.53 895.359 34.993"
            },
            {
                origin : "-1575.96 3113.75 28.7949"
            },
            {
                origin : "-397.563 3050.99 58.2394"
            },
            {
                origin : "1468.98 1132.18 105.098"
            },
            {
                origin : "2313.32 -1732.95 56.5548"
            },
            {
                origin : "857.299 -3444.58 31.1028"
            },
            {
                origin : "-804.772 -2596.97 31.819"
            },
            {
                origin : "-2439.18 -685.998 37.3942"
            }
                ]
    },
    land_3 : { 
        LandHeight:192,
        LandCollisionList:[
            {
                origin : "-3483.05 1435.52 9.10962"
            },{
                origin : "-3039.86 -170.171 8.18188"
            },{
                origin : "-1292.96 -1421.16 9.64648"
            },{
                origin : "904.56 -1991.46 5.31079"
            },{
                origin : "2870.48 -1006.93 6.96143"
            },{
                origin : "3316.59 301.678 7.09314"
            },{
                origin : "1528.32 1284.59 6.91406"
            },{
                origin : "-1673.07 1946.18 2.94928"
            }            
                ]
        },
    land_4 : {
        LandHeight:-512,
        LandCollisionList:[
            {
                origin : "-1549.64 879.773 36.3311"
            },{
                origin : "-966.955 1911.98 69.5481"
            },{
                origin : "114.862 3178.43 36.9297"
            },{
                origin : "1330.27 1777.48 83.9324"
            },{
                origin : "2216.98 -417.046 125.445"
            },{
                origin : "2370.28 -2007.88 221.853"
            },{
                origin : "168.455 -3550.6 92.9183"
            },{
                origin : "-1469 -2872.99 87.9288"
            },{
                origin : "-2001.96 -2256.51 50.25"
            },{
                origin : "-689.652 -58.8643 29.1733"
            }
        ]
    }
}

export const Landtetris = [
    {name:"land_2_deg0",x:3,y:4},
]



