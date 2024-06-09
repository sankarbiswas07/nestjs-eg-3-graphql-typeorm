import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/graphql/models/User";
import { CreateUserInput } from "src/graphql/utils/CreatUserInput";
import { Repository } from "typeorm";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private UserReposiory: Repository<User>
    ) { }

    getUsers() {
         // here mentioning relations performs joins in the background in a single query
        return this.UserReposiory.find({ relations: ['settings'] })
    }

    getUserById(id: number) {
        return this.UserReposiory.findOne({
          where: { id },
           // here mentioning relations performs joins in the background in a single query
          relations: ['settings'],
        });
      }

    async createUser(createUserDoc: CreateUserInput) {
        const newUser = this.UserReposiory.create(createUserDoc)
        return this.UserReposiory.save(newUser)
    }
}