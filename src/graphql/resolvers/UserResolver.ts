import { Resolver, Query, Args, Int } from "@nestjs/graphql";
import { User } from "../models/User";
import { mockUsers } from "src/__mocks__/mockUser";


@Resolver()
export class UserResolver {

    @Query(() => [User])
    getAllUsers() {
        return mockUsers
    }

    @Query((returns) => User, { nullable: true })
    getUser(@Args('id', { type: () => Int }) id: number) {
        return mockUsers.find(user => user.id === id)
    }

}