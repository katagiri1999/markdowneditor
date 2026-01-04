import { Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import { MuiOtpInput } from 'mui-one-time-password-input'

import Header from "../components/header";

function Verify() {
  const [otp, setOtp] = useState<string>('')

  const handleChange = (newValue: string) => {
    setOtp(newValue)
  }

  return (
    <>
      <title>Verify</title>
      <Header />

      <Container
        maxWidth="xs"
        sx={{
          marginTop: 7,
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "15px",
        }}
      >
        <Typography
          variant="body1"
          sx={{marginBottom: 5}}
        >
          メールアドレス送付されたワンタイムパスワードを入力し、ユーザ登録を完了してください。
        </Typography>

        <MuiOtpInput
          value={otp}
          onChange={handleChange}
          length={6}
          autoFocus
        >

        </MuiOtpInput>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ marginTop: "5%" }}
        >
          Sign Up
        </Button>

      </Container >
    </>
  );
};

export default Verify;