import * as React from "react";
import {
  InputText,
  InputPassword,
  Button,
  FormControl,
  Card,
  LayoutOne,
} from "upkit";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";

import StoreLogo from "../../components/StoreLogo";
import { useDispatch } from "react-redux";
import { rules } from "./validation";
import { login } from "../../api/auth";
import { userLogin } from "../../features/Auth/actions";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

export default function Login() {
  const { register, handleSubmit, errors, setError } = useForm();
  const [status, setStatus] = React.useState(statuslist.idle);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async ({ username, password }) => {
    setStatus(statuslist.process);
    let { data } = await login(username, password);

    if (data.error) {
      setError("password", {
        type: "invalidCredential",
        message: "Login Gagal! username atau password salah",
      });
      setStatus(statuslist.error);
    } else {
      let {
        username,
        name,
        email,
        password,
        phone,
        role,
        token,
        status,
        specialist,
        poliName,
      } = data.data;

      const user = {
        username: username,
        name: name,
        email: email,
        phone: phone,
        role: role,
        token: token,
        status: status,
        specialist: specialist,
        poliName: poliName,
        password: password,
      };

      console.log("data user:", user);

      dispatch(userLogin(user, token));
      history.push("/");
    }
    setStatus(statuslist.success);
  };

  return (
    <LayoutOne size="small">
      <br />
      <Card color="white">
        <div className="text-center mb-5">
          <StoreLogo />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl errorMessage={errors.username?.message}>
            <InputText
              placeholder="username"
              fitContainer
              name="username"
              ref={register(rules.username)}
            />
          </FormControl>

          <FormControl errorMessage={errors.password?.message}>
            <InputPassword
              placeholder="password"
              name="password"
              fitContainer
              ref={register(rules.password)}
            />
          </FormControl>

          <Button fitContainer size="large" disabled={status === "process"}>
            Login
          </Button>
        </form>
      </Card>
    </LayoutOne>
  );
}
