import { AuthModule } from 'src/modules/auth/auth.module';
import { RiceModule } from "../modules/rice/rice.module";
import { TransactionModule } from "../modules/transaction/transaction.module";
import { NotificationModule } from "../modules/notification/notification.module";
import { UserModule } from "../modules/user/user.module";
import {ImageModule} from "../modules/image/image.module";


export const Routes = [
  {
    path: 'api',
    children: [

      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'rice',
        module: RiceModule,
      },
      {
        path: 'transaction',
        module: TransactionModule,
      },
      {
        path: 'notification',
        module: NotificationModule,
      },
      {
        path: 'user',
        module: UserModule,
      },
      {
        path: 'image',
        module: ImageModule,
      }
    ],
  },
];
