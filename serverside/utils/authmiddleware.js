import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
    
      const user = jwt.verify(token, "asdfghjkl");
      
      req.body.user = user;
      next();
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
  }
  if(!token){
    res.status(500).json({"msg":"not authorized"})
  }
};

export default authMiddleware
