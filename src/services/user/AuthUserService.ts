import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import prismaClient from '../../prisma';

interface IAuthRequest {
  email: string,
  password: string
}

class AuthUserService {
  async execute({ email, password }: IAuthRequest) {
    
    const user = await prismaClient.user.findFirst({
      where: { email: email }
    });

    if(!user) {
      throw new Error('Invalid credential');
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new Error('Invalid credential');
    }

    const token = sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { subject: user.id, expiresIn: '12h' }
    );

    return { id: user.id, name: user.name, email: user.email, token };
  }
}

export { AuthUserService };