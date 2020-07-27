import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/Users';
import uploadConfig from '@config/upload';
import AppError from '@shared/erros/AppError';

import IUsersRepository from "../repositories/IUsersRepository"
import { isThisYear } from 'date-fns';

interface IRequestDTO {
  user_id: string;
  avatarFilename: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) { }
  public async execute({ user_id, avatarFilename }: IRequestDTO): Promise<User> {

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can update avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    return user;
  }
}
