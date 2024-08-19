import { SignIn, SignUp } from "@clerk/nextjs";
import { AppBar,Box, Button, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <Container maxWidth="50vw">
      <AppBar position="static" sx={{ backgroundColor: "#ff9800" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            AI FLashcards
          </Typography>
          <Button color="inherit">
            <Link href="/sign-up" passHref>
              {" "}
              Sign Up{" "}
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="/sign-up" passHref>
              SignUp
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" gutterBottom></Typography>
        <Typography variant="h4" gutterBottom></Typography>
        <SignUp />
      </Box>
    </Container>
  );
}
