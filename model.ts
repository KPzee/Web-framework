import { AxiosPromise, AxiosResponse } from "axios"

interface ModelAttibutes<T> {
    set(update:T): void
    getAll(): T 
    get<K extends keyof T>(key:K): T[K]
}

interface Sync<T>{
    fetch(id: number):AxiosPromise
    save(data: T):AxiosPromise 
}

interface Events {
    on(eventName: string, callBack: () => void): void
    trigger(eventName: string): void
}
interface HasId {
    id?: number
}

export class model<T extends HasId> {
    constructor (
        private attributtes: ModelAttibutes<T>,
        private events: Events,
        private sync: Sync<T>,
    ) {}

    
    on = this.events.on
    trigger = this.events.trigger
    get = this.attributtes.get
    
    
    set(update: T): void {
        this.attributtes.set(update);
        this.events.trigger('change');

    }

    fetch(): void {
        const id = this.get('id')

        if (typeof id !== 'number') {
            throw new Error('cannot fetch without id')
        }

        this.sync.fetch(id).then((response: AxiosResponse):void => {
            this.set(response.data)
        })
    }
    save():void {
        this.sync.save(this.attributtes.getAll()).then((response: AxiosResponse):void => {
            this.trigger('save')
        }).catch(() => {
            this.trigger('error')
        })
    }
}