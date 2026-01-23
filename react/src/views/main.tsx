import { Container } from "@mui/material";

import Editor from "../components/editor/editor";
import Header from "../components/header/header";

function Main() {

  return (
    <>
      <title>Main</title>
      <Header />

      <Container sx={{ mt: 2 }}>
        <Editor />
      </Container>
    </>
  );
};

export default Main;