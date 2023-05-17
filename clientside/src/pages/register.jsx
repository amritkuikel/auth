import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const registerSubmit = async (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.pwd,
    };
    await axios.post("/auth/register", userData).then((log) => {
      if (log.data.success) {
        alert("user registered and verification mail has been sent");
      } else {
        alert("user not registered");
      }
    });
  };
  return (
    <div>
      <div>Register</div>
      <form onSubmit={handleSubmit(registerSubmit)}>
        <label>name</label>
        <br />
        <input
          type="text"
          {...register("name", {
            required: true,
            minLength: 6,
            pattern: /^[a-zA-Z\s']+$/,
          })}
        />
        {errors.name && (
          <div>plz enter name of min 6 characters of letter only</div>
        )}
        <br />
        <label>email</label>
        <br />
        <input
          type="text"
          {...register("email", {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
        />
        {errors.email && <div>plz enter valid email</div>}
        <br />
        <label>password</label>
        <br />
        <input
          type="text"
          {...register("pwd", {
            required: true,
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          })}
        />
        {errors.pwd && (
          <div>
            {" "}
            password must includes at least one lowercase letter, one uppercase
            letter, one digit, and one special character among these @$!%*?& and
            must be min 8 characters
          </div>
        )}
        <br />
        <label>confirm password</label>
        <br />
        <input
          type="text"
          {...register("cpwd", {
            required: true,
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          })}
        />
        {errors.cpwd && (
          <div>
            {" "}
            password must includes at least one lowercase letter, one uppercase
            letter, one digit, and one special character among these @$!%*?& and
            must be min 8 characters
          </div>
        )}
        <br />
        <button>submit</button>
        <br />
        <Link to={"/"}>already registered?login here</Link>
      </form>
    </div>
  );
};
export default Register;
