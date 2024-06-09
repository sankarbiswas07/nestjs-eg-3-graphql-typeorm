import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity({name: 'user_settings'})
@ObjectType()
export class UserSetting {

    @PrimaryColumn()
    @Field((type) => Int)
    userId: number;

    @Column()
    @Field({defaultValue: false, nullable: true})
    recieveNotifications?: boolean;

    @Column()
    @Field({defaultValue: false, nullable: true})
    recieveEmails?: boolean;

}