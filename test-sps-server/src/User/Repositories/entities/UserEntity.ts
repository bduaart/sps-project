import { v4 as uuidv4 } from "uuid";

export class UserEntity {
  public id: string;
  public name: string;
  public email: string;
  public type: string;
  public password: string;
  public createdAt: Date;
  public updatedAt?: Date;

  constructor(props: Omit<UserEntity, "id" | "createdAt">, id?: string) {
    this.id = id || uuidv4();
    this.name = props.name;
    this.email = props.email;
    this.type = props.type;
    this.password = props.password;
    this.createdAt = new Date();
  }
}
