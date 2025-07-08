import transporter from '../config/mailer.js'

export const defaultMessages = {
  passwordReset: {
    subject: "Password Reset",
    text: (token) => { return `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${process.env.APP_URL}/reset-password/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`},
  },
}

export const sendEmail = async (to, subject, text) => {
  try {
    const mailOPtions = {
      to: to,
      from: process.env.MAIL_USER,
      subject: subject,
      text: text,
    }

    await transporter.sendMail(mailOPtions)

    return true
  }
  catch (error) {
    console.error(error)
    throw new Error("Error while sending email")
  }
}


