import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: pwd,
    };
    axios.post("/auth/login",userData).then(
      (log)=>{
        if(log.data.success){
          alert('success')
          localStorage.setItem("data",JSON.stringify(log.data.token))
          navigate('/Dashboard')
        }
        else{
          alert('unsuccess')
        }
      }
    );
  };
  return (
    <div>
      <div>Login</div>
      <form onSubmit={submitHandler}>
        <label>email</label>
        <br />
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <label>password</label>
        <br />
        <input
          type="text"
          onChange={(e) => {
            setPwd(e.target.value);
          }}
        />
        <br />
        <button>submit</button>
        <br />
        <Link to={"/register"}>not registered?register here</Link>
      </form>
    </div>
  );
};
export default Login;
