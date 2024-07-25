import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const sendEmail = async (req: Request, res: Response) => {
  const { firstName, lastName, email, message } = req.body;

  // Проверка наличия всех обязательных данных
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).send('All fields are required');
  }

  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail', // Выберите свой почтовый сервис
      auth: {
        user: process.env.GMAIL_LOGIN!, // Ваша почта
        pass: process.env.GMAIL_PASSWORD!, // Ваш пароль
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
    await transporter.sendMail(mailOptions);
    res.status(200).send('Message sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send message');
  }
};