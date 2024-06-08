import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserSetting {

    @Field((type) => Int)
    userId: number;

    @Field({defaultValue: false, nullable: true})
    recieveNotifications?: boolean;

    @Field({defaultValue: false, nullable: true})
    recieveEmails?: boolean;

}