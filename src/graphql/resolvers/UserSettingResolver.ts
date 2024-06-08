import { Resolver, Query, Args, Int, ResolveField, Parent, Mutation } from "@nestjs/graphql";

import { UserSetting } from "../models/UserSetting";
import { mockUserSettings } from "src/__mocks__/mockUserSettings";
import { CreateUserSettingInput } from "../utils/CreatUserSettingInput";


@Resolver(of => UserSetting)
export class UserSettingResolver {

    @Query(() => [UserSetting])
    getUserSettings() {
        return mockUserSettings
    }

    @Mutation(returns => UserSetting)
    CreateUserSetting(
        @Args('createUserSettingInput') createUserSettingInput: CreateUserSettingInput
    ) {
        const { userId, recieveEmails, recieveNotifications } = createUserSettingInput
        const newSetting = { userId, recieveEmails, recieveNotifications }
        mockUserSettings.push(newSetting)
        return newSetting
    }

}