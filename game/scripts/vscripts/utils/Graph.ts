class GraphNode<T>{
    _name:string
    _data:T
    _neighbors:Record<string,GraphNode<T>>;

    constructor(value:T,name:string){
        this._data = value
        this._neighbors = {}
        this._name = name   
    }

    get Neighbors(){
        return this._neighbors
    }

    AddNeighbor(Graphnode:GraphNode<T>){
        if(this._neighbors[GraphNode.name]){
            this._neighbors[GraphNode.name] = Graphnode
            return true
        }else{
            return false
        }
    }

    RemoveNeighbor(Graphnode:GraphNode<T>){
        let obj = this._neighbors[GraphNode.name]
        this._neighbors[GraphNode.name] = null
        return obj
    }

    RemoveAllNeighbors(){
        for(let i in this._neighbors){
            this._neighbors[i] = null
        }

    }

}

export class Graphs<T>{
    _nodes:Record<string,GraphNode<T>>
    _count:number

    constructor(){
        this._nodes = {}
        this._count = 0
    }

    get Count(){
        return this._count
    }

    Clear(){
        for(let key in this._nodes){
            this._nodes[key].RemoveAllNeighbors();
            this._nodes[key] = null
        }
    }

    AddNode(value:T,name:string){
        if(this._nodes[name] != null){
            return false
        }else{
            this._nodes[name] = new GraphNode<T>(value,name)
            this._count++
            return true
        }
    }

    AddEdge(nodename1:string,nodename2:string){
        let node1 = this._nodes[nodename1]
        let node2 = this._nodes[nodename2]

        if(node1 == null || node2 == null){
            return false
        }else if(node1.Neighbors){
            return false
        }else{
            node1.AddNeighbor(node2)
            node2.AddNeighbor(node1)
        }
    }

    RemoveNode(name:string){
        if(!this._nodes[name]){
            return false
        }else{
            this._nodes[name] = null
            for(let key in this._nodes){
                this._nodes[key].RemoveNeighbor(this._nodes[name])
            }
            return true
        }
    }

}