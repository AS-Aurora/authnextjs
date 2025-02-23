
import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {

    console.log('Starting email send process');
    console.log('Email:', email);
    console.log('EmailType:', emailType);
    console.log('UserId:', userId);

    // Check if required parameters exist
    if (!email || !emailType || !userId) {
      throw new Error("Missing required parameters");
    }

    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenexpire: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USER || "8e2621dcdca06f",
        pass: process.env.PASS || "772dad8dbc154e",
      },
    });

    const mailOptions = {
      from: 'aayushsharma.lucky97@gmail.com',
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <div style="max-width: 600px; margin: 0 auto;">
      <h1>${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}</h1>
      <p>Click the link below to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}:</p>
      <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
        Click here
      </a>
      <p>Or copy and paste this link in your browser:</p>
      <p>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>
    </div>
      `
    };

    console.log("Sending email to:", email); // Debug log
    const mailresponse = await transport.sendMail(mailOptions);
    console.log("Email sent:", mailresponse); // Debug log
    return mailresponse;

  } catch (error: any) {
    console.error("Error sending email:", error);
    throw error; // Re-throw to handle in the calling function
  }
};
