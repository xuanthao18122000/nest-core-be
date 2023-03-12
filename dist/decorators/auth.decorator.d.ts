export declare const GetUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
export declare function Auth(data?: {
    roles?: string[];
    loginAdmin?: boolean;
    withoutActive?: boolean;
}): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
