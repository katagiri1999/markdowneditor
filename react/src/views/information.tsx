import { Container, Typography } from "@mui/material";

import Header from "../components/header";

function Information() {
  return (
    <>
      <title>Information</title>
      <Header />

      <Container maxWidth="xs" sx={{ marginTop: 10 }}>

        <Typography variant="h4" align="center">
          Information
        </Typography>

      </Container>
    </>
  );
};

export default Information;