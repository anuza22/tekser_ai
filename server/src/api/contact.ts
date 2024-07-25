import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const sendEmail = async (req: Request, res: Response) => {
  const { firstName, lastName, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail', // Выберите свой почтовый сервис
    auth: {
      user: process.env.GMAIL_LOGIN!, // Ваша почта
      pass: process.env.GMAIL_PASSWORD, // Ваш пароль
    },
  });

  // Настройка письма
  let mailOptions = {
    from: email,
    to: process.env.GMAIL_LOGIN!, // Ваша почта, куда будет приходить сообщение
    subject: `Message from ${firstName} ${lastName}`,
    text: message,
  };

  // Отправка письма
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Message sent: ' + info.response);
  });
};
