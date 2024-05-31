import { useState } from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { MuiOtpInput } from "mui-one-time-password-input";
import { alpha, useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";

import { UserData, login } from "../../redux";
import { useAppDispatch, useRouter } from "../../hooks";

import { bgGradient } from "../../theme/css";

import { Logo, Iconify } from "../../components";

import { useLazyQuery } from "@apollo/client";
import {
  CONFIRM_VERIFY_ACCOUNT,
  LOGIN_OFFICER,
  REQUEST_VERIFY_ACCOUNT,
} from "../../graphql/users";
import { Role } from "../../__generated__/graphql";

// ----------------------------------------------------------------------

interface OfficerInput {
  username: string;
  password: string;
}

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const dispatch = useAppDispatch();

  // login variables
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<OfficerInput>({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  // verification variables
  const [code, setCode] = useState<string>("");
  const [officer, setOfficer] = useState<UserData | null>(null);
  const [verification, setVerification] = useState<boolean>(false);

  const [error, setError] = useState<string>();

  const [loginOfficer, { error: loginError }] = useLazyQuery(LOGIN_OFFICER);
  const [requestVerify, { error: requestError }] = useLazyQuery(
    REQUEST_VERIFY_ACCOUNT
  );
  const [confirmVerify, { error: confirmError }] = useLazyQuery(
    CONFIRM_VERIFY_ACCOUNT
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleResendCode = (event: React.MouseEvent<unknown>) => {
    if (officer?.uuid) {
      requestVerify({
        variables: {
          uuid: officer.uuid,
          contact: username,
        },
      })
        .then(({ data }) => {
          if (data && data.requestAccountVerify) {
            setVerification(true);
            setError(undefined);
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const officer = await loginOfficer({
      variables: {
        username: username,
        password: password,
      },
    });

    // check if logged in successfully
    if (officer.data && officer.data.loginOfficer) {
      const account = {
        uuid: officer.data.loginOfficer.uuid,
        firstName: officer.data.loginOfficer.firstName,
        lastName: officer.data.loginOfficer.lastName,
        role: officer.data.loginOfficer.position?.role,
        office: officer.data.loginOfficer.office?.id,
        position: officer.data.loginOfficer.position?.label,
        avatar: officer.data.loginOfficer.avatar,
      };

      setOfficer(account); // save uuid

      // check if verified user
      if (officer.data.loginOfficer.verified) {
        dispatch(login(account));

        const role = officer.data.loginOfficer.position?.role || Role.Officer;

        if ([Role.Superuser, Role.Director].includes(role))
          router.push("/dashboard");
        else router.push("/calendar");
      } else {
        requestVerify({
          variables: {
            uuid: officer.data.loginOfficer.uuid,
            contact: username,
          },
        })
          .then(({ data }) => {
            if (data && data.requestAccountVerify) {
              setVerification(true);
              setError(undefined);
            }
          })
          .catch((error) => {
            setError(error.message);
          });
      }
    } else setError("Wrong credentials or account is inactive.");
  };

  const handleVerifyAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    confirmVerify({
      variables: {
        code: code,
        contact: username,
      },
    })
      .then(({ data }) => {
        if (officer && data && data.confirmAccountVerify) {
          const role = data.confirmAccountVerify.position?.role;

          dispatch(login(officer));

          if (role) {
            if ([Role.Superuser, Role.Director].includes(role))
              router.push("/dashboard");
            else router.push("/calendar");
          } else {
            router.push("/login");
          }
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.5),
          imgUrl: "/assets/background/overlay_5.jpg",
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: "fixed",
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">
            {verification ? "ACCOUNT VERIFICATION" : "SIGN IN"}
          </Typography>

          {verification ? (
            <form onSubmit={handleVerifyAccount}>
              <Typography variant="body2" sx={{ my: 2 }}>
                {`Verification code was sent to ${username}.`}
                <Button onClick={handleResendCode} variant="text">
                  Resend?
                </Button>
              </Typography>

              <Stack spacing={2} sx={{ mb: 2 }}>
                <MuiOtpInput
                  length={6}
                  value={code}
                  onChange={(value) => setCode(value)}
                />
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{ my: 2 }}
              >
                {(error || requestError?.message || confirmError?.message) && (
                  <Typography variant="body2" align="center" color="error">
                    {error || requestError?.message || confirmError?.message}
                  </Typography>
                )}
              </Stack>

              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
              >
                {`Verify Account`}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <Typography variant="body2" sx={{ my: 2 }}>
                Don't have an account?
                <Link
                  href="/register"
                  variant="subtitle2"
                  sx={{ ml: 0.5, cursor: "pointer" }}
                >
                  Sign up
                </Link>
              </Typography>

              <Stack spacing={2} sx={{ mb: 2 }}>
                <TextField
                  name="username"
                  label="Email or Phone Number (+63)"
                  value={username}
                  onChange={handleChange}
                  required
                  fullWidth
                />

                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handleChange}
                  required
                  fullWidth
                  inputProps={{ minLength: 8 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          <Iconify
                            icon={
                              showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Link href="/password" variant="subtitle2" underline="hover">
                  Forgot password?
                </Link>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{ my: 2 }}
              >
                {(loginError?.message || error) && (
                  <Typography variant="body2" align="center" color="error">
                    {loginError?.message || error}
                  </Typography>
                )}
              </Stack>

              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
              >
                Sign in
              </Button>
            </form>
          )}
        </Card>
      </Stack>
    </Box>
  );
}
