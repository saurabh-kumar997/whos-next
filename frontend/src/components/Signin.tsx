import { ChangeEvent, SyntheticEvent, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  TextField,
  Card,
  CardContent,
  Link,
  LinearProgress,
  Alert,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { userService } from "../apiServices/services";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store/store";
import { setAuthUser } from "../store/authStore";

const Login = (): React.ReactElement => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const [passwordValues, setPassword] = useState({
    showPassword: false,
    password: "",
    email: "",
  });

  const [loader, setLoader] = useState(false);

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>("");

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...passwordValues, [event.target.name]: event.target.value });
  };

  const onShowPassword = () => {
    setPassword({
      ...passwordValues,
      showPassword: !passwordValues.showPassword,
    });
  };

  const onSubmitLogin = async (event: SyntheticEvent) => {
    setLoader(true);
    event.preventDefault();

    const { password, email } = passwordValues;
    if (email.trim() === "" || password.trim() === "") {
      setLoader(false);
      setError(true);
      setErrorMsg("Please provide required fields value");
    } else {
      setError(false);
      setErrorMsg("");
      const body = { email: email.trim(), password: password.trim() };
      const resp = await userService.signIn(body);
      console.log("RESP", resp);

      if (resp?.status === 200) {
        setLoader(false);
        setError(false);
        setErrorMsg("");
        const token = resp.data ? resp.data.token : "";
        const refToken = resp.data ? resp.data.refreshToken : "";
        const user = resp.data ? resp.data.user : null;
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refToken);
        dispatch(setAuthUser(user));
        navigate("/dashboard", { replace: true });
      } else {
        setLoader(false);
        setError(true);
        setErrorMsg(resp?.message);
      }
    }
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        "& .MuiTextField-root": { mb: 2 },
        "& .MuiFormControl-root": { mb: 2 },
        "& .MuiButton-root": { p: 1 },
        "& .MuiIconButton-root": { m: 2 },
        height: "100vh",
      }}
    >
      <Grid item>
        <Card>
          {loader && <LinearProgress sx={{ height: "6px" }} />}
          <Grid container justifyContent="center">
            <Grid item>
              <h1>Login</h1>
            </Grid>
          </Grid>
          <Grid container justifyContent={"center"}>
            <Grid item>
              {error && <Alert severity={"error"}>{errorMsg}</Alert>}
            </Grid>
          </Grid>
          <CardContent>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <form onSubmit={onSubmitLogin}>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        value={passwordValues.email}
                        onChange={onPasswordChange}
                        name="email"
                        error={error && !passwordValues.email}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        error={error && !passwordValues.password}
                        required
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          Password
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={
                            passwordValues.showPassword ? "text" : "password"
                          }
                          value={passwordValues.password}
                          onChange={onPasswordChange}
                          name="password"
                          required
                          fullWidth
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={onShowPassword}
                                edge="end"
                              >
                                {passwordValues.showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                      </FormControl>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={12}>
                        <Button
                          fullWidth
                          variant="outlined"
                          onClick={onSubmitLogin}
                        >
                          Login
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item>
                <Grid container justifyContent={"center"}>
                  {/* <Grid item>
                <Link href="/forgot-password" underline="none">
                  <h4 style={{ color: "red" }}>Forgot Password?</h4>
                </Link>
              </Grid> */}
                  <Grid item>
                    <Link href="/signup" underline="none">
                      <Typography variant="body1" color="steelblue">
                        Not a memeber yet? Signup
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
