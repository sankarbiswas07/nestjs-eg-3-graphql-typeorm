import { Resolver, Query, Args, Int, ResolveField, Parent, Mutation } from "@nestjs/graphql";
import { User } from "../models/User";
import { mockUsers } from "src/__mocks__/mockUsers";
import { UserSetting } from "../models/UserSetting";
import { mockUserSettings } from "src/__mocks__/mockUserSettings";
import { CreateUserInput } from "../utils/CreatUserInput";
import { CreateUserSettingInput } from "../utils/CreatUserSettingInput";

let lastId = 20;

@Resolver(of => User)
export class UserResolver {

    constructor(
        
    ){}

    @Query(() => [User])
    getUsers() {
        return mockUsers
    }

    @Query((returns) => User, { nullable: true })
    getUser(@Args('id', { type: () => Int }) id: number) {
        return mockUsers.find(user => user.id === id)
    }

    @ResolveField(returns => UserSetting, { name: 'settings', nullable: true })
    getUserSettings(@Parent() user: User) {
        return mockUserSettings.find(setting => setting.userId === user.id)
    }

    @Mutation(returns => User)
    CreateUser(
        @Args('createUserInput') createUserInput: CreateUserInput
    ) {
        const {userName, displayName} = createUserInput
        const newUser = {
            id: ++lastId,
            userName,
            displayName
        }
        mockUsers.push(newUser);
        return newUser;
    }

}