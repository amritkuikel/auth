import nodemailer from "nodemailer";
import Token from "../models/tokenModel.js";
import bcrypt from "bcryptjs";

const mail = async (data, mailType) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, 
      auth: {
        user: "amritkuikel5689@gmail.com", 
        pass: "jsfbbvmbzctnrysw", 
      },
    });

    const verifyToken = await bcrypt
      .hashSync(data._id.toString(), 10)
      .replaceAll("/", " ");
    const token = new Token({ userid: data._id, token: verifyToken });
    await token.save();
    const content = `<div>
          <h1>click to verify</h1><br/>
          <a href="http://localhost:3000/verify/${verifyToken}">click here</a>
          </div>`;

    const mailOptions = {
      from: "amritkuikel5689@gmail.com",
      to: data.email,
      subject: "login verification",
      html: content,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

export default mail;
