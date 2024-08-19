"use client";
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/generate");
  };
  return (
    <Container maxWidth="lg">
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="create flashcard from your text" />
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
              Login
            </Button>
            <Button color="inherit" href="/sign-up">
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2"> Welcome to Flashcard SaaS </Typography>
        <Typography variant="h5">
          The easiest way to create flashcards from your text
        </Typography>
        <SignedIn>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </SignedIn>
      </Box>
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2">
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Easy Text Input</Typography>
            <Typography>
              Simply input your text and let my software do the rest of the
              work. Creating a flashcard has never been an easier task.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Smart Flashcards</Typography>
            <Typography>
              Our AI intelligently breaks down the user text into concise
              flashcards, perfect for studying.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Accessible Anywhere</Typography>
            <Typography>
              Access your flashcards from any device, at any time. Study on the
              go with ease.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          {" "}
          Pricing{" "}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>
                Basic Plan
              </Typography>
              <Typography variant="h6" gutterBottom>
                $3/month
              </Typography>
              <Typography>
                Access to basic flashcard features and have a limited storage.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Choose Basic Plan
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>
                Pro Plan
              </Typography>
              <Typography variant="h6" gutterBottom>
                $5/month
              </Typography>
              <Typography>
                Unlimited flashcards and storage, with priority support.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Choose Pro Plan
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
