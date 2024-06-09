import { Resolver, Query, Args, Int, ResolveField, Parent, Mutation } from "@nestjs/graphql";

import { UserSetting } from "../models/UserSetting";
import { mockUserSettings } from "src/__mocks__/mockUserSettings";
import { CreateUserSettingInput } from "../utils/CreatUserSettingInput";
import { UserSettingService } from "src/users/UserSettingService";


@Resolver(of => UserSetting)
export class UserSettingResolver {

    constructor(private userSettingsService: UserSettingService) { }

    @Query(() => [UserSetting])
    getUserSettings() {
        return mockUserSettings
    }

    @Mutation(returns => UserSetting)
    async CreateUserSetting(
        @Args('createUserSettingInput') createUserSettingInput: CreateUserSettingInput
    ) {
        // const { userId, recieveEmails, recieveNotifications } = createUserSettingInput
        // const newSetting = { userId, recieveEmails, recieveNotifications }
        // mockUserSettings.push(newSetting)
        // return newSetting

        const savedSettings = await this.userSettingsService.createUserSetting(createUserSettingInput)
        return savedSettings
    }

}