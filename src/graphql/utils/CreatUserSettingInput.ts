import { Field, InputType, Int } from "@nestjs/graphql";


@InputType()
export class CreateUserSettingInput{

    @Field(returns => Int)
    userId: number;

    @Field({ nullable: true })
    recieveNotifications: boolean;

    @Field({ nullable: true })
    recieveEmails: boolean;
}