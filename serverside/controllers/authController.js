import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mail from "../utils/mailsender.js";
import Token from "../models/tokenModel.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(200).send({ success: false, msg: "user already exists" });
  } else {
    try {
      var salt = await bcrypt.genSalt(10);
      var hash = await bcrypt.hash(password, salt);
      const newUser = await User.create({
        name: name,
        email: email,
        password: hash,
      });
      await mail(newUser,'verify-mail')
      return res.status(200).send({ success: true, msg: "user created" });
    } catch (error) {
      return res.status(200).send({ success: false, msg: "user not created" });
    }
  }
};
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const hashCmpResult = await bcrypt.compare(password, user.password);
  if (user) {
    if (user && hashCmpResult) {
      if(user.isVerified){
        const tokenData = {
          _id: user._id,
          name: user.name,
          email: user.email,
        };
        const token = jwt.sign(tokenData, "asdfghjkl", { expiresIn: "30d" });
        return res
          .status(200)
          .send({ success: true, msg: "logged in", token: token });
      }
     else{
      return res.status(200).send({ success: false, msg: "plz verify email" });
     }
    } else {
      return res.status(200).send({ success: false, msg: "not logged in" });
    }
  } else {
    return res.status(200).send({ success: false, msg: "not logged in" });
  }
};
export const userData = (req, res) => {
  try {
    res.status(200).send({ success: true, data: req.body.user });
  } catch (error) {
    res.status(400).send(error);
  }
};
export const updateUser = async (req, res) => {
  const {  email, currentPwd, password } = req.body;
  const user = await User.findOne({ email });
  if (user && bcrypt.compare(currentPwd, user.password)) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const isSuccessful = await User.findByIdAndUpdate(user._id, {
      email: email,
      password: hash,
    });

    if (!isSuccessful) {
      return res.status(200).send({ success: false, msg: "sth went wrong" });
    } else {
      return res.status(200).send({ success: true, msg: "password updated" });
    }
  } else {
    return res.status(200).send({ success: false, msg: "sth went wrong" });
  }
};
export const verifyMail =async (req,res)=>{
  try {
    const token = await Token.findOne({token:req.body.token})
    if(token){
      await User.findOneAndUpdate({_id:token.userid,isVerified:true})
      await Token.findOneAndDelete({token:req.body.token})
      return res.status(200).send({ success: true, msg: "email verified" });
    }
    else{
      return res.status(200).send({ success: false, msg: "invalid token" });
    }
  } catch (error) {
    return res.status(200).send({ success: false, msg: "invalid token" });
  }
}
