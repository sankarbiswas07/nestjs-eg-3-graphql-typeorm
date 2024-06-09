import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/graphql/models/User";
import { Repository } from "typeorm";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private UserReposiory: Repository<User>
    ) { }

    getUsers() {
        return this.UserReposiory.find({ relations: ['settings'] })
    }

    async createUser(createUserDoc: User) {
        const newUser = this.UserReposiory.create(createUserDoc)
        return this.UserReposiory.save(newUser)
    }
}