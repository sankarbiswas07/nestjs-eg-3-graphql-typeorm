import { Resolver, Query } from "@nestjs/graphql";
import { User } from "../models/User";


@Resolver()
export class UserResolver {

    @Query((returns) => User)
    getUsers(){
        return {
            id:1,
            username: 'john',
            displayName : 'j.doe'
        }
    }

}