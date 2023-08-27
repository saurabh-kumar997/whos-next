import {
  Alert,
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  TextField,
} from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { validateEmail, validateText } from "../common/common.js";
import { userService } from "../apiServices/services.js";
import { useNavigate } from "react-router-dom";

function Signup(): React.ReactElement {
  const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    retypePassword: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loader, setLoader] = useState(false);

  //onchange function
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setErrorMsg("");
    setSignUpData({ ...signUpData, [event.target.name]: event.target.value });
  };

  const onSignUpSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setLoader(true);
    console.log("SIGNUP called");
    if (validateFields()) {
      // signup api
      const body = {
        name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password,
      };
      const resp = await userService.signUp(body);
      setLoader(false);
      console.log("RESP", resp);
      if (resp && resp.status === 200) {
        navigate("/signin", { replace: true });
      } else if (resp && resp.status === 400) {
        setError(true);
        setErrorMsg(resp.message);
      } else {
        setError(true);
        setErrorMsg(
          "Oops! Something went wrong, Please try again after sometime"
        );
      }
    } else {
      setLoader(false);
    }
  };

  const validateFields = () => {
    debugger;
    let { name, email, retypePassword, password } = signUpData;
    let isValid = false;
    setError(false);
    if (
      name === "" ||
      email === "" ||
      retypePassword === "" ||
      password === ""
    ) {
      setError(true);
      setErrorMsg("Please provide values for required fields!");
      isValid = false;
    } else if (password !== retypePassword) {
      setError(true);
      setErrorMsg("Password doesn't match");
      isValid = false;
    } else {
      //validate
      if (!validateEmail(email)) {
        setError(true);
        setErrorMsg("Please provide valid email");
        isValid = false;
      }
      if (!validateText(name)) {
        setError(true);
        setErrorMsg("Please provide valid name");
        isValid = false;
      }

      setError(false);
      setErrorMsg("");
      isValid = true;
    }
    return isValid;
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        "& .MuiTextField-root": { mb: 2 },
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
              <h1>Sign Up</h1>
            </Grid>
          </Grid>

          <CardContent>
            <Grid container justifyContent={"center"}>
              <Grid item>
                {error && <Alert severity={"error"}>{errorMsg}</Alert>}
              </Grid>
            </Grid>
            <form onSubmit={onSignUpSubmit}>
              <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        required
                        value={signUpData.name}
                        onChange={onInputChange}
                        name="name"
                        error={error && !Boolean(signUpData.name)}
                        disabled={loader}
                        helperText={
                          error &&
                          !validateText(signUpData.name) &&
                          "Name field should contain only alphabets."
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        value={signUpData.email}
                        onChange={onInputChange}
                        name="email"
                        error={error && !Boolean(signUpData.email)}
                        disabled={loader}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        required
                        value={signUpData.password}
                        onChange={onInputChange}
                        name="password"
                        error={error && !Boolean(signUpData.password)}
                        type="password"
                        disabled={loader}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        label="Retype Password"
                        variant="outlined"
                        fullWidth
                        required
                        value={signUpData.retypePassword}
                        onChange={onInputChange}
                        name="retypePassword"
                        type="password"
                        error={error && !Boolean(signUpData.retypePassword)}
                        disabled={loader}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={onSignUpSubmit}
                        disabled={loader}
                      >
                        Sign Up
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>

            <Grid container justifyContent={"center"}>
              <Grid item>
                <Link href="/signin" underline="none">
                  <h4>Already a member?</h4>
                </Link>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Signup;
