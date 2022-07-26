import { hash } from 'bcryptjs';
import prismaClient from '../../prisma';

interface IUserRequest {
  name: string,
  email: string,
  password: string
}

class CreateUserService {
  async execute({ name, email, password }: IUserRequest) {

    if(!email) {
      throw new Error('Invalid email');
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email: email }
    });

    if(userAlreadyExists) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    return user;
  }
}

export { CreateUserService };