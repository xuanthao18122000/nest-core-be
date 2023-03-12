import { AuthModule } from 'src/modules/auth/auth.module';
export declare const Routes: {
    path: string;
    children: {
        path: string;
        module: typeof AuthModule;
    }[];
}[];
