export enum RoleType {
    'ADMIN' = 'ADMIN',
    'USER' = 'USER',
}

export interface IUserDtoBD{
    email: string;
    _id: string;
    isActivated: boolean;
    role: RoleType;
    avatar: string;
    status: string;
}

export interface IUserDto{
    email: string;
    id: string;
    isActivated: boolean;
    role: RoleType;
    avatar: string;
    status: string;
}

export class UserDto {
    email;
    id;
    isActivated;
    role;
    avatar;
    status;

    constructor(model: IUserDtoBD) {
        this.email = model.email
        this.id = model._id
        this.isActivated = model.isActivated
        this.role = model.role
        this.avatar = model.avatar
        this.status = model.status
    }
}