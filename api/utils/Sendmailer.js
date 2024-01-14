import { createTransport } from "nodemailer";

export const emailsend = async (to, subject, text) => {
  const transport = createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "bade083164425f",
      pass: "e99fc278fcad67",
    },
  });
  await transport.sendMail({
    to,
    subject,
    text,
  });
};
