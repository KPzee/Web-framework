import { model } from "./model";
import {Attributes} from "./attributes"
import { ApiSync } from "./ApiSync";
import {Eventing} from "./eventing"
import { Collection } from "./collection";

export interface UserProps {
    name?: string;
    age?:number;
    id?: number;
}

const rootUrl =  'http://localhost:3000/user'

export class User extends model<UserProps>{
    static buildUser(attrs: UserProps): User {
        return new User(
            new Attributes<UserProps>(attrs),
            new Eventing,
            new ApiSync<UserProps>(rootUrl),
        )
    }
    
    static buildUserCollection(): Collection<User, UserProps> {
        return new Collection<User, UserProps>(rootUrl,
        (json:UserProps) => User.buildUser(json))
    
    }
}
