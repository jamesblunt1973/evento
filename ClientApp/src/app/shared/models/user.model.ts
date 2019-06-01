export interface IUser {
    id: string;
    name: string;
    email: string;
    gender: boolean | null;
    token: string;
}

// export class User implements IUser {
//     constructor(
//         public id: string = '',
//         public name: string = '',
//         public email: string = '',
//         public gender: boolean | null = null,
//         public token: string = ''
//     ){}
// }