import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { MuiOtpInput } from "mui-one-time-password-input";
import InputAdornment from "@mui/material/InputAdornment";
import { alpha, useTheme } from "@mui/material/styles";
import { useRouter } from "../../hooks";
import { bgGradient } from "../../theme/css";
import { Logo, Iconify } from "../../components";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  CONFIRM_VERIFY_ACCOUNT,
  CREATE_OFFICER,
  GET_OFFICES,
  GET_POSITIONS,
  REQUEST_VERIFY_ACCOUNT,
} from "../../graphql/users";
import { Positions, Role } from "../../__generated__/graphql";

// ----------------------------------------------------------------------

interface OfficerInput {
  firstName: string;
  lastName: string;
  positionId: string;
  officeId: string;
  username: string;
  password: string;
}

function filterPositions(office: string, positions: Positions[]) {
  if (office.includes("Regional Director")) {
    return positions.filter(
      (pos) => pos.role === Role.Director || pos.role === Role.Officer
    );
  } else if (office.includes("Division")) {
    return positions.filter(
      (pos) =>
        (pos.role === Role.Chief && pos.label.includes("Chief")) ||
        pos.role === Role.Officer
    );
  } else if (office.includes("Revenue District Office")) {
    return positions.filter(
      (pos) =>
        (pos.role === Role.Chief && pos.label.includes("District Officer")) ||
        pos.role === Role.Officer
    );
  } else {
    return positions.filter((pos) => pos.role === Role.Officer);
  }
}

export default function RegisterView() {
  const theme = useTheme();

  const router = useRouter();

  // register variables
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<OfficerInput>({
    firstName: "",
    lastName: "",
    positionId: "",
    officeId: "",
    username: "",
    password: "",
  });

  // verification variables
  const [code, setCode] = useState<string>("");
  const [officerId, setOfficerId] = useState<string | null>(null);
  const [verification, setVerification] = useState<boolean>(false);
  const [filteredPositions, setFilteredPositions] = useState<Positions[]>([]);

  const [error, setError] = useState<string>();

  const { firstName, lastName, positionId, officeId, username, password } =
    formData;

  const { data: positions, error: positionError } = useQuery(GET_POSITIONS);

  const { data: offices, error: officeError } = useQuery(GET_OFFICES);

  const [createOfficer, { error: createError }] = useMutation(CREATE_OFFICER);
  const [requestVerify, { error: requestError }] = useLazyQuery(
    REQUEST_VERIFY_ACCOUNT
  );
  const [confirmVerify, { error: confirmError }] = useLazyQuery(
    CONFIRM_VERIFY_ACCOUNT
  );

  useEffect(() => {
    if (formData.officeId && positions?.getPositions && offices?.getOffices) {
      const office = offices.getOffices.find(
        (office) => office.id === formData.officeId
      );

      if (office) {
        setFilteredPositions(
          filterPositions(
            office.name,
            positions.getPositions.map((pos) => ({
              id: pos.id,
              label: pos.label,
              role: pos.role,
            }))
          )
        );
      }
    }
  }, [formData.officeId, offices, positions]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleResendCode = (event: React.MouseEvent<unknown>) => {
    if (officerId) {
      requestVerify({
        variables: {
          uuid: officerId,
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

    // check username provided
    let email: string | null = null;
    let phone: string | null = null;
    if (username.includes("@")) {
      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

      if (!emailRegex.test(username)) {
        setError("Invalid email address.");
        return;
      }

      email = username;
    } else {
      const startIndex = username.indexOf("9");

      if (startIndex < 0) {
        setError("Invalid phone number.");
        return;
      }

      const phoneNumber = username.substring(startIndex, username.length);

      if (phoneNumber.length !== 10 || !/^\d+$/.test(username)) {
        setError("Invalid phone number.");
        return;
      }

      phone = phoneNumber;
    }

    if (!email && !phone) {
      setError("Please provide valid email or phone number.");
      return;
    }

    const officer = await createOfficer({
      variables: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        positionId: parseInt(positionId),
        officeId: parseInt(officeId),
        email: email,
        phone: phone,
        password: password,
      },
    });

    if (officer.data && officer.data.createOfficer) {
      const uuid = officer.data.createOfficer.uuid;

      setOfficerId(uuid);

      requestVerify({
        variables: {
          uuid: uuid,
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
    } else setError("Account already exists.");
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
        if (data && data.confirmAccountVerify) router.push("/login");
        else setError("Invalid verification code.");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleCodeCompleted = (value: string) => {
    confirmVerify({
      variables: {
        code: value,
        contact: username,
      },
    })
      .then(({ data }) => {
        if (data && data.confirmAccountVerify) router.push("/login");
        else setError("Invalid verification code.");
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
            {verification ? "ACCOUNT VERIFICATION" : "SIGN UP"}
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
                  onComplete={handleCodeCompleted}
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
                {"Verify Account"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <Typography variant="body2" sx={{ my: 2 }}>
                Already have an account?
                <Link
                  href="/login"
                  variant="subtitle2"
                  sx={{ ml: 0.5, cursor: "pointer" }}
                >
                  Sign in
                </Link>
              </Typography>

              <Stack spacing={2} sx={{ mb: 2 }}>
                <TextField
                  name="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={handleChange}
                  required
                  fullWidth
                />

                <TextField
                  name="lastName"
                  label="Last Name"
                  value={lastName}
                  onChange={handleChange}
                  required
                  fullWidth
                />

                {offices && (
                  <TextField
                    name="officeId"
                    select
                    label="Office"
                    value={officeId}
                    onChange={handleChange}
                    required
                    fullWidth
                  >
                    {offices.getOffices.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}

                {positions && (
                  <TextField
                    name="positionId"
                    select
                    label="Position"
                    value={positionId}
                    onChange={handleChange}
                    required
                    fullWidth
                  >
                    {filteredPositions.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}

                <TextField
                  name="username"
                  label="Email or Phone Number (+63)"
                  value={username}
                  onChange={handleChange}
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
                justifyContent="center"
                sx={{ my: 2 }}
              >
                {(error ||
                  positionError?.message ||
                  officeError?.message ||
                  createError?.message) && (
                  <Typography variant="body2" align="center" color="error">
                    {error ||
                      positionError?.message ||
                      officeError?.message ||
                      createError?.message}
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
                Sign up
              </Button>
            </form>
          )}
        </Card>
      </Stack>
    </Box>
  );
}
