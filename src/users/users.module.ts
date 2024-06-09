import { Module } from '@nestjs/common';
import { UserResolver } from './UserResolver';
import { UserService } from './UserService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { UserSettingResolver } from 'src/graphql/resolvers/UserSettingResolver';
import { UserSetting } from 'src/graphql/models/UserSetting';
import { UserSettingService } from './UserSettingService';

@Module({
    imports: [TypeOrmModule.forFeature([User, UserSetting])],
    providers: [
        UserResolver, 
        UserService, 
        UserSettingService, 
        UserSettingResolver,  ]
})
export class UsersModule { }
