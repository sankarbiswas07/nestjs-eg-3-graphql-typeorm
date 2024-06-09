import { Resolver, Query, Args, Int, ResolveField, Parent, Mutation } from "@nestjs/graphql";
import { User } from "../graphql/models/User";
import { mockUsers } from "src/__mocks__/mockUsers";
import { UserSetting } from "../graphql/models/UserSetting";
import { mockUserSettings } from "src/__mocks__/mockUserSettings";
import { CreateUserInput } from "../graphql/utils/CreatUserInput";
import { UserService } from "./UserService";
import { relative } from "path";
import { UserSettingService } from "./UserSettingService";


@Resolver(of => User)
export class UserResolver {

    constructor(
        private userService: UserService,
        private userSettingService : UserSettingService
    ) { }

    @Query(() => [User])
    getUsers() {
        // return mockUsers

        return this.userService.getUsers()
    }

    @Query((returns) => User, { nullable: true })
    async getUser(@Args('id', { type: () => Int }) id: number) {
        return this.userService.getUserById(id)
        // return mockUsers.find(user => user.id === id)
    }


    // NOte: in graphQL, we can use @ResolveField, in that case DB call will be 
    // twice for a singe user, while we can use relations to get the userSettting.

    @ResolveField(returns => UserSetting, { name: 'settings', nullable: true })
    getUserSettings(@Parent() user: User) {
        //  // return mockUserSettings.find(setting => setting.userId === user.id) // :test: 
        return this.userSettingService.getUserSettingById(user.id);
    }

    @Mutation(returns => User)
    async CreateUser(
        @Args('createUserInput') createUserInput: CreateUserInput
    ) {
        const { userName, displayName } = createUserInput
        const newUser = {
            userName,
            displayName
        }
        // mockUsers.push(newUser);
        const user = await this.userService.createUser(newUser)
        return user;
    }

}