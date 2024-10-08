import { User } from '@services/users/domain/user';
import { UserEmail } from '@services/users/domain/valueObjects/userEmail';
import { UserId } from '@services/users/domain/valueObjects/userId';
import { UserName } from '@services/users/domain/valueObjects/userName';
import { UserPassword } from '@services/users/domain/valueObjects/userPassword';

describe('Tests User domain entity', () => {
  test('Test create instance object', () => {
    const user = User.create({
      userId: UserId.newId(),
      username: UserName.build('Michel'),
      email: UserEmail.build('mtraatabladaa94@gmail.com'),
      password: UserPassword.build('michel@2023'),
    });

    expect(user.toPrimitives()).toEqual({
      userId: expect.any(String),
      username: 'Michel',
      email: 'mtraatabladaa94@gmail.com',
      password: 'michel@2023',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});
