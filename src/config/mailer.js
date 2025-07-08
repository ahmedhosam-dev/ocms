import nodemailer from 'nodemailer'

console.log(process.env.MAIL_USER)
const transporter = nodemailer.createTransport({
  // service: process.env.MAIL_SERVICE,
  // auth: {
  //   user: process.env.MAIL_USER,
  //   pass: process.env.MAIL_PASS,
  // }
  service: "gmail",
  auth: {
    user: "ocms.blog@gmail.com",
    pass: "hevf txdp telj ehnb",
  }
})

export default transporter
