import {Body, Controller, Get, Param, Post, Query, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {TransactionService} from "./transaction.service";
import {GetUser} from "../../decorators/auth.decorator";
import {SendResponse} from "../../utils/send-response";
import code from "../../configs/code";
import {QueryListDto} from "../../global/dto/query-list.dto";
import {JwtAuthGuard} from "../../guard/jwt.guard";
import {SendMoneyExchangesDTO, SendMoneyUserDTO} from "./dto/send-money.dto";
import {UserService} from "../user/user.service";
import { includes } from 'lodash';
import {Notification, Transaction, User} from "../../database/entities";
import {NotificationService} from "../notification/notification.service";
import { DataSource } from 'typeorm';
import {BuyRiceExchangesDTO} from "./dto/rice-post.dto";
import {RiceService} from "../rice/rice.service";

@ApiTags('Transaction')
@Controller()
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly riceService: RiceService,
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
  ){}

  @Get('list')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getAllTransaction(@Query() query: QueryListDto){
    try{
      query.page = !query.page ? 1 : query.page;
      query.perPage = !query.perPage ? 10 : query.perPage;
      query.sort ? query.sort.toUpperCase() : 'DESC'



      const transaction = await this.transactionService.getAllTransaction(query);

      const pagi = (transaction.count / query.perPage) | 0;
      const pages = transaction.count % query.perPage == 0 ? pagi : pagi + 1;
      const page = +query.page;
      const total = transaction.count;
      return SendResponse.success({
        page,
        pages,
        total,
        listTransaction: transaction.list,
      },'Get list transaction success!');
    }catch (error) {
      return SendResponse.error(error);
    }
  }

  @Get('by-user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getTransactionByUser(@GetUser() user, @Query() query: QueryListDto){
    try{
      if(!user){
        throw code.USER_NOT_FOUND.type
      }
      const email = user.email;
      query.page = !query.page ? 1 : query.page;
      query.perPage = !query.perPage ? 10 : query.perPage;
      query.sort ? query.sort.toUpperCase() : 'DESC'



      const transaction = await this.transactionService.getTransactionByUser(email, query);

      const pagi = (transaction.count / query.perPage) | 0;
      const pages = transaction.count % query.perPage == 0 ? pagi : pagi + 1;
      const page = +query.page;
      const total = transaction.count;
      return SendResponse.success({
        page,
        pages,
        total,
        listTransaction: transaction.list,
      },'Get list transaction success!');
    }catch (error) {
      return SendResponse.error(error);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getOneTransaction(@Param('id') id: number){
    try{
      const transaction = await this.transactionService.getDetailTransaction(id);

      return SendResponse.success(transaction,'Get details transaction success!')
    }catch (error) {
      return SendResponse.error(error);
    }
  }


  @Post('send-money-user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async sendMoneyToUser(@GetUser() user: User, @Body() body :SendMoneyUserDTO){

    try{
      const sender = await this.userService.findUserByEmail(user.email);
      let { amount, receiverEmail, description } = body;
      if(amount <= 0) {
        throw code.AMOUNT_NOT_LESS_OR_EQUAL_ZERO.type;
      }
      // Check not my email
      if(sender.email === receiverEmail){
        throw code.NOT_YOUR_EMAIL.type;
      }
      // Check email exist
      const receiver = await this.userService.findUserByEmail(receiverEmail);
      if(!receiver){
        throw code.EMAIL_NOT_EXIST.type;
      }
      for (const role of receiver.role) {
        if (includes(role, 'ADMIN')) throw code.EMAIL_NOT_EXIST.type;
      }

      // Check balance
      if(sender.balance < amount){
        throw code.DOES_NOT_ENOUGH_BALANCE.type
      }

      // Plus and Minute money
      await this.userService.transferMoney(sender.email, receiver.email, amount);

      // Create history transaction
      const transactionSender = await this.transactionService.createHistoryTransactionSender(sender, receiver, amount, description);
      const transactionReceiver = await this.transactionService.createHistoryTransactionReceiver(sender, receiver, amount, description);

      // Create notifications to sender and receiver
      let title = `Đã Gửi ${amount} USDT Thành Công`;
      let type = 'send_money';
      let image = '[]';
      let content = `Bạn đã gửi ${amount} VNĐ từ đến tài khoản người dùng ${receiver.fullName} có địa chỉ ví ${receiver.address_wallet}`;
      const notificationSender = await this.notificationService.createNotification(type, title, image, description, content , sender, transactionSender.id);

      title = `Nhận Được ${amount} USDT Thành Công`;
      type = 'receive_money';
      image = '[]';
      content = `Bạn đã nhận được ${amount} VNĐ từ tài khoản người dùng ${sender.fullName} có địa chỉ ví ${sender.address_wallet}`;
      const notificationReceiver = await this.notificationService.createNotification(type, title, image, description, content , receiver, transactionReceiver.id);

      return SendResponse.success([], 'Transfer user success!');
    }catch (error) {
      console.log(error)
      return SendResponse.error(error);
    }
  }


  @Post('send-money-exchanges')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async sendMoneyToExchanges(@GetUser() user: User, @Body() body: SendMoneyExchangesDTO){
    try{
      const sender = await this.userService.findUserByEmail(user.email);
      let { amount, description } = body;
      if(amount <= 0) {
        throw code.AMOUNT_NOT_LESS_OR_EQUAL_ZERO.type;
      }
      // Check not my email

      // Check email exist
      const receiver = await this.userService.findAdmin();
      if(!receiver){
        throw code.EMAIL_NOT_EXIST.type;
      }
      if(sender.email === receiver.email){
        throw code.NOT_YOUR_EMAIL.type;
      }

      // Check balance
      if(sender.balance < amount){
        throw code.DOES_NOT_ENOUGH_BALANCE.type
      }

      // Plus and Minute money
      await this.userService.transferMoney(sender.email, receiver.email, amount);

      // Create history transaction
      const transactionSender = await this.transactionService.createHistoryTransactionSender(sender, receiver, amount, description);
      const transactionReceiver = await this.transactionService.createHistoryTransactionReceiver(sender, receiver, amount, description);

      // Create notifications to sender and receiver
      let title = `Đã Gửi ${amount} USDT Thành Công`;
      let type = 'send_money';
      let image = '[]';
      let content = `Bạn đã gửi ${amount} VNĐ từ đến tài khoản Administrator có địa chỉ ví ${receiver.address_wallet}`;
      const notificationSender = await this.notificationService.createNotification(type, title, image, description, content , sender, transactionSender.id);

      title = `Nhận Được ${amount} USDT Thành Công`;
      type = 'receive_money';
      image = '[]';
      content = `Bạn đã nhận được ${amount} VNĐ từ tài khoản người dùng ${sender.fullName} có địa chỉ ví ${sender.address_wallet}`;
      const notificationReceiver = await this.notificationService.createNotification(type, title, image, description, content , receiver, transactionReceiver.id);

      return SendResponse.success([], 'Transfer user success!');
    }catch (error) {
      return SendResponse.error(error);
    }
  }

  @Post('buy-rice')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async buyRiceExchanges(@GetUser() user: User, @Body() body: BuyRiceExchangesDTO) {
    try{
      let { amount, rice_id, description } = body;

      if(amount <= 0) {
        throw code.AMOUNT_NOT_LESS_OR_EQUAL_ZERO.type;
      }
      // Check not my email
      const buyer = await this.userService.findUserByEmail(user.email);
      if(!buyer){
        throw code.EMAIL_NOT_EXIST.type;
      }

      // Check email exist
      const seller = await this.userService.findAdmin();
      const userRice = await this.userService.findAdminByRice(rice_id);
      const rice = await this.riceService.findRiceById(rice_id);
      const priceRice = rice.price * amount;
      if(!userRice) {
        throw code.RICE_NOT_FOUND.type;
      }
      if(userRice.quantity < amount){
        throw code.NOT_ENOUGH_RICE.type;
      }
      if(!seller){
        throw code.EMAIL_NOT_EXIST.type;
      }
      if(buyer.balance < priceRice){
        throw code.DOES_NOT_ENOUGH_BALANCE.type;
      }
      if(buyer.email === seller.email){
        throw code.NOT_YOUR_EMAIL.type;
      }
      // Plus and Minute money
      await this.userService.transferMoney(buyer.email, seller.email, priceRice);
      // Plus and Minute rice
      await this.userService.buyRice(buyer.email, seller.email, amount, rice_id);
      await this.riceService.updatePriceRice(rice_id);

      // Create history transaction
      const transactionSender = await this.transactionService.createHistoryTransactionBuyer(buyer, seller, amount, description);
      const transactionReceiver = await this.transactionService.createHistoryTransactionSeller(buyer, seller, amount, description);

      // Create notifications to sender and seller
      let title = `Mua ${amount} Gạo Thành Công`;
      let type = 'buy_rice';
      let image = '[]';
      let content = `Bạn đã mua thành công ${amount} gạo từ sàn có địa chỉ ví ${seller.address_wallet}`;
      await this.notificationService.createNotificationRice(type, title, image, description, content , buyer, transactionSender.id);

      title = `Bán ${amount} Gạo Thành Công`;
      type = 'sell_rice';
      image = '[]';
      content = `Bạn đã bán thành công ${amount} gạo cho tài khoản có địa chỉ ví ${buyer.address_wallet} của chủ sở hữu ${buyer.fullName}`;
       await this.notificationService.createNotificationRice(type, title, image, description, content , seller, transactionReceiver.id);

      return SendResponse.success([], 'Buy rice successful!');
    }catch (error) {
      console.log(error)
      return SendResponse.error(error);
    }
  }

  @Post('sell-rice')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async sellRiceExchanges(@GetUser() user: User, @Body() body: BuyRiceExchangesDTO) {
    return SendResponse.success([], 'Sell rice successful!');
  }

}