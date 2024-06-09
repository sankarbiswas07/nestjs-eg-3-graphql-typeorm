import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GraphQLError } from "graphql";
import { User } from "src/graphql/models/User";
import { UserSetting } from "src/graphql/models/UserSetting";
import { CreateUserSettingInput } from "src/graphql/utils/CreatUserSettingInput";
import { Repository } from "typeorm";


Injectable()
export class UserSettingService {

    constructor(
        @InjectRepository(UserSetting) private UserSettingRepository: Repository<UserSetting>
        , @InjectRepository(User) private UserRepository: Repository<User>

    ) { }

    getUserSettingById(userId: number) {
        return this.UserSettingRepository.findOneBy({ userId });
    }

    async createUserSetting(createUserSettingDoc: CreateUserSettingInput) {

        const existingUser = await this.UserRepository
            .findOneBy({ id: createUserSettingDoc.userId });

        if (!existingUser) throw new GraphQLError("User not found!");

        const newUserSetting = this.UserSettingRepository.create(createUserSettingDoc);
        const savedSetting = await this.UserSettingRepository.save(newUserSetting);

        existingUser.settings = savedSetting;

        await this.UserRepository.save(existingUser);

        return savedSetting;
    }
}