export class IocCotainer{
    private static _instance:IocCotainer
    private _dependencies:{[key:string]:Object}
    private _DelayInjectkeyTable:{key:string,dependencies:string[]}[]

    private constructor(){
        this._dependencies = {}
        this._DelayInjectkeyTable = []
    }

    public static get instance(){
        if(this._instance == null){
            this._instance = new IocCotainer()
        }
        return this._instance
    }

    register(name:string,dependencies:string[],implementtation:any){
        if(this._dependencies[name]){
            print("register is onwer")
        }
        let dependenciesImplementtations = this.getDependenciesimplementtations(dependencies)
        this._dependencies[name] = new implementtation(...dependenciesImplementtations)
    }

    resolve<T>(name:string):T{
        if(!this._dependencies[name]){
            print("no dependencies")
        }
        return this._dependencies[name] as T;
    }

    private getDependenciesimplementtations(name:string[]):Object[]{
        return name.map(name => this.resolve(name))
    }

    public Inject(introduction:string){
        print("Inject")
        print(introduction)
        this._DelayInjectkeyTable.forEach(list=>{
            list.dependencies.forEach((dependens,index)=>{
                if(dependens == introduction)
                {
                    print(`gei ${list.key} zhuru`)
                    this.resolve<any>(list.key).Inject(this.resolve<any>(introduction))
                    list.dependencies[index] = null
                }
            })
        })
    }

    public registerDaleyTablle(table:{key:string,dependencies:string[]}){
        DeepPrintTable(table)
        this._DelayInjectkeyTable.push(table)
    }
}

export function RegisterIoc(name:string,dependencies:string[],Delay:boolean):Function{
    let container = IocCotainer.instance;
    return function<T extends {new (...arg:any[]):{} }>(constructor:T){
        if(Delay){
            container.registerDaleyTablle({key:name,dependencies:dependencies});
            container.register(name,[],constructor);
            container.Inject(name)
            return
        }
        container.register(name,dependencies,constructor);
        container.Inject(name)
    }
}
