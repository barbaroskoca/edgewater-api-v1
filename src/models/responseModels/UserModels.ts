export class IdResponseModel{
    id!: number;
}

export class CreateAndSaveResponseModel extends IdResponseModel{

    email!: string;
    fullName?: string;
    role!: string;
    password!: string;

}

export class UpdateAndSaveResponseModel extends IdResponseModel{

    email!: string;
    fullName?: string;
    role!: string;
    password!: string;
}
