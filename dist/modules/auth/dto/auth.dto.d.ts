export declare class LoginPostDTO {
    email: string;
    password: string;
}
export declare class RegisterPostDTO {
    email: string;
    password: string;
    fullName: string;
    phone: number;
    code: number;
    address: string;
    balance: number;
}
export declare class ChangePasswordDTO {
    currentPassword: string;
    password: string;
}
export declare class ForgotPasswordDTO {
    email: string;
}
