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
  Card,
  CardContent,
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
        <title>AI Flashcard</title>
        <meta name="description" content="create flashcard from your text" />
      </Head>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#ff9800", boxShadow: "none" }}
      >
        <Toolbar sx={{ minHeight: 70, padding: "0 20px" }}>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold", fontSize: "1.5rem" }}
          >
            Generate Flashcard using LLM
          </Typography>
          <SignedOut>
            <Button
              color="inherit"
              href="/sign-in"
              sx={{
                marginRight: 2,
                color: "#ffffff",
                textTransform: "none",
                fontWeight: "medium",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#303f9f",
                  borderRadius: "4px",
                },
              }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              href="/sign-up"
              sx={{
                color: "#ffffff",
                textTransform: "none",
                fontWeight: "medium",
                fontSize: "1rem",
                border: "1px solid #ffffff",
                borderRadius: "4px",
                padding: "6px 16px",
                "&:hover": {
                  backgroundColor: "#303f9f",
                  borderColor: "#ffffff",
                },
              }}
            >
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton
              sx={{
                marginLeft: 2,
                padding: "4px 8px",
                backgroundColor: "#ffffff",
                color: "#3f51b5",
                borderRadius: "50%",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2"> Welcome to AI Flashcards </Typography>
        <Typography variant="h5">
          Transform your text into AI-powered flashcards with ease.
        </Typography>
        <SignedIn>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </SignedIn>
      </Box>
      <Box sx={{ my: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 4, textAlign: "center" }}
        >
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                p: 2,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 6,
                  backgroundColor: "#FFCC99",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Easy Text Input
                </Typography>
                <Typography>
                  Just type in your text, and we'll take care of everything
                  else. Making flashcards has never been this easy and fun!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                p: 2,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 6,
                  backgroundColor: "#FFCC99",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Smart Flashcards
                </Typography>
                <Typography>
                  Our AI smartly transforms your text into clear, bite-sized
                  flashcards, making studying a breeze.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                p: 2,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 6,
                  backgroundColor: "#FFCC99",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Accessible Anywhere
                </Typography>
                <Typography>
                  Take your flashcards with you anywhere, on any device.
                  Studying on the go has never been easier.
                </Typography>
              </CardContent>
            </Card>
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
              <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
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
              <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
                Choose Pro Plan
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
