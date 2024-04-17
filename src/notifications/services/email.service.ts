import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(to: string, subject: string, template: string, context: any) {
    return await this.mailerService.sendMail({
      to,
      subject,
      template: './templates/' + template, // path to your template file
      context,
    });
  }

  async sendMail1() {
    const message = `Forgot your password? If you didn't forget your password, please ignore this email!`;

    await this.mailerService.sendMail({
      from: 'Kingsley Okure <kingsleyokgeorge@gmail.com>',
      to: 'kahloon17@gmail.com',
      subject: `How to Send Emails with Nodemailer`,
      text: message,
    });
    return true;
  }
}
