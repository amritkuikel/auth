import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState("");
  const [currentPwd, setCurrentPwd] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const clickHandler = () => {
    localStorage.removeItem("data");
    navigate("/");
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      currentPwd: currentPwd,
      password: password,
    };
    await axios.post("/auth/updateuser", userData).then((log) => {
      alert("success");
    });
  };
  const loadData = async () => {
    const token = await JSON.parse(localStorage.getItem("data"));

    const res = await axios.get("/auth/userdata", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.success) {
      setData(res.data.data);
      console.log(res.data.data);
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div>Dashboard</div>
      <button onClick={clickHandler}>logout</button>
      <div>{data?.name}</div>
      <div>{data?.email}</div>
      <h1>update details</h1>
      <form onSubmit={submitHandler}>
        <label>name:</label>
        <br />
        <input type="text" />
        <br />
        <label>email</label>
        <br />
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <label>current password</label>
        <br />
        <input
          type="text"
          onChange={(e) => {
            setCurrentPwd(e.target.value);
          }}
        />
        <br />
        <label>new password</label>
        <br />
        <input
          type="text"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <label>confirm new password</label>
        <br />
        <input type="text" />
        <br />
        <button onSubmit={submitHandler}>submit</button>
      </form>
    </div>
  );
};
export default Dashboard;
