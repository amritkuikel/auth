import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
const VerifyEmail = () => {
  const params = useParams();
  const tokenVerify = async () => {
    try {
      const res = await axios.post("/auth/verify-mail", {
        token: params.token,
      });
      if(res.data.success){
        alert('success')
        setTimeout(()=>{
          window.close()
        },4000)
      }
      else{
        alert('error')
        setTimeout(()=>{
          window.close()
        },3000)
      }
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    tokenVerify();
  }, []);
  return (
    <div>
      <Link to={'/'}>Go to login page</Link>
    </div>
  );
};

export default VerifyEmail;
