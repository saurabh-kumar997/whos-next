import {
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  TextField,
} from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { validateEmail, validateText } from "../helper/validations.js";

function Signup() {
  // const navigate = useNavigate();

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
    // console.log(event.target);
    setSignUpData({ ...signUpData, [event.target.name]: event.target.value });
  };

  const onSignUpSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setLoader(true);
  };

  const validateFields = () => {
    debugger;
    let { name, email, retypePassword, password } = signUpData;
    setError(false);
    if (name || email || retypePassword || password) {
      setError(true);
      setErrorMsg("Please provide values for required fields!");
      return false;
    } else if (password !== retypePassword) {
      setError(true);
      setErrorMsg("Password doesn't match");
      return false;
    } else {
      //validate
      if (!validateEmail(email)) {
        setError(true);
        setErrorMsg("Please provide valid email");
        return false;
      }
      if (!validateText(name)) {
        setError(true);
        setErrorMsg("Please provide valid name");
        return false;
      }

      setError(false);
      setErrorMsg("");
      return true;
    }
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
                {/* {error && <CustomAlert severity={"error"} msg={errorMsg} />} */}
              </Grid>
            </Grid>
            <form onSubmit={onSignUpSubmit}>
              <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        required
                        value={signUpData.name}
                        onChange={onInputChange}
                        name="name"
                        error={error && !Boolean(signUpData.name)}
                        helperText={
                          error &&
                          !validateText(signUpData.name) &&
                          "Name field should contain only alphabets."
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        value={signUpData.email}
                        onChange={onInputChange}
                        name="email"
                        error={error && !Boolean(signUpData.email)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        required
                        value={signUpData.password}
                        onChange={onInputChange}
                        name="password"
                        error={error && !Boolean(signUpData.password)}
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        id="outlined-basic"
                        label="Retype Password"
                        variant="outlined"
                        fullWidth
                        required
                        value={signUpData.retypePassword}
                        onChange={onInputChange}
                        name="retypePassword"
                        type="password"
                        error={error && !Boolean(signUpData.retypePassword)}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={onSignUpSubmit}
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
