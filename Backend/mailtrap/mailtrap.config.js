import {MailtrapClient} from "mailtrap";

const MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN

const TOKEN = MAILTRAP_TOKEN;

export const client = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Henok",
};
// const recipients = [
//   {
//     email: "henokaragaw17@gmail.com",
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);