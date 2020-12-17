export class IocCotainer{
    private static _instance:IocCotainer
    private _dependencies:{[key:string]:Object}

    private constructor(){
        this._dependencies = {}
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

}

export function RegisterIoc(name:string,dependencies:string[]):Function{
    let container = IocCotainer.instance;
    return function<T extends {new (...arg:any[]):{} }>(constructor:T){
        container.register(name,dependencies,constructor);
    }
}