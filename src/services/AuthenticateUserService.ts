import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const userExists = await usersRepositories.findOne({ email });

    if (!userExists) {
      throw new Error("Email/Password incorrect");
    }

    const passwordMatch = await compare(password, userExists.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    const token = sign(
      {
        email: userExists.email,
      },
      "fba0c363fb347d4859c5ea379ee46569",
      {
        subject: userExists.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
