import { UserCreatedEvent } from '@services/users/domain/events/userCreatedEvent';
import { UserRemovedEvent } from '@services/users/domain/events/userRemovedEvent';
import { UserSignedEvent } from '@services/users/domain/events/userSignedEvent';
import { UserEmail } from '@services/users/domain/valueObjects/userEmail';
import { UserId } from '@services/users/domain/valueObjects/userId';
import { UserName } from '@services/users/domain/valueObjects/userName';
import { UserPassword } from '@services/users/domain/valueObjects/userPassword';
import { UserPhone } from '@services/users/domain/valueObjects/userPhone';
import { AggregateRoot } from '@shared/domain/aggregateRoot';
import { DateValueObject } from '@shared/domain/valueObjects/dateValueObject';

type UserProps = {
  userId: UserId;
  username: UserName;
  email: UserEmail;
  password: UserPassword;
  phone?: UserPhone;

  createdAt?: DateValueObject;
  updatedAt?: DateValueObject;
};

export type UserPrimitivesProps = {
  userId: string;
  username: string;
  email: string;
  password: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
};

export class User extends AggregateRoot {
  readonly userId: UserId;
  private username: UserName;
  private email: UserEmail;
  private _password: UserPassword;
  private phone?: UserPhone;

  private constructor(props: UserProps) {
    super();

    this.userId = props.userId;
    this.username = props.username;
    this.email = props.email;
    this._password = props.password;
    this.phone = props.phone;

    this.createdAt = props.createdAt ?? DateValueObject.now();
    this.updatedAt = props.updatedAt ?? DateValueObject.now();
  }

  public get password(): UserPassword {
    return this._password;
  }

  public static build(props: UserProps): User {
    return new User(props);
  }

  public static create(props: UserProps): User {
    const newUser = User.build(props);
    const event = UserCreatedEvent.build(newUser);
    newUser.pushEvent(event);

    return newUser;
  }

  public static fromPrimitives(props: UserPrimitivesProps): User {
    return new User({
      userId: UserId.fromString(props.userId),
      username: UserName.build(props.username),
      email: UserEmail.build(props.email),
      password: UserPassword.build(props.password),
      phone: props.phone ? UserPhone.build(props.phone) : undefined,

      createdAt: DateValueObject.fromString(props.createdAt),
      updatedAt: DateValueObject.fromString(props.updatedAt),
    });
  }

  public remove(): void {
    const event = UserRemovedEvent.build(this);
    this.pushEvent(event);
  }

  public signin(): void {
    const event = UserSignedEvent.build(this);
    this.pushEvent(event);
  }

  public toPrimitives(): UserPrimitivesProps {
    return {
      userId: this.userId.toString(),
      username: this.username.value,
      email: this.email.value,
      password: this._password.value,
      phone: this.phone?.value,

      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
    };
  }
}
