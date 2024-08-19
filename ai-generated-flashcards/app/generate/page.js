"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import {
  writeBatch,
  doc,
  getDoc,
  setDoc,
  collection,
} from "firebase/firestore";
import { db } from "@/firebase"; // Ensure you have Firebase configured

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true); // Start loading spinner

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }

    // Ensure this is a new batch
    let batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);

    try {
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        if (collections.find((f) => f.name === name)) {
          alert("Flashcard collection with the same name already exists.");
          return;
        } else {
          // Update the user's flashcard collections
          collections.push({ name });
          batch.set(userDocRef, { flashcards: collections }, { merge: true });

          // Commit the batch to update the user's flashcard collection
          await batch.commit();

          // Now create a new batch for the flashcards themselves
          batch = writeBatch(db);
          const colRef = collection(userDocRef, name);

          flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef);
            batch.set(cardDocRef, flashcard);
          });

          // Commit the batch to save the individual flashcards
          await batch.commit();
        }
      } else {
        // If user document doesn't exist, create it and add flashcards
        batch.set(userDocRef, { flashcards: [{ name }] });
        await batch.commit();

        // Now create a new batch for the flashcards themselves
        batch = writeBatch(db);
        const colRef = collection(userDocRef, name);

        flashcards.forEach((flashcard) => {
          const cardDocRef = doc(colRef);
          batch.set(cardDocRef, flashcard);
        });

        // Commit the batch to save the individual flashcards
        await batch.commit();
      }

      handleClose();
    } catch (error) {
      console.error("Error saving flashcards: ", error);
      alert("An error occurred while saving the flashcards. Please try again.");
    }
  };

  // Colors array for colorful flashcards
  const colors = [
    "#FFCDD2",
    "#C8E6C9",
    "#BBDEFB",
    "#FFE0B2",
    "#D1C4E9",
    "#FFECB3",
  ];

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 4,
          mb: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">AI powered Flashcards</Typography>
        <Paper sx={{ p: 4, width: "100%" }}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter the Text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            disabled={loading} // Disable button while loading
          >
            {loading ? <CircularProgress size={24} /> : "Generate"}
          </Button>
        </Paper>
      </Box>
      {flashcards.length > 0 && (
        <>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5">Flashcard Preview</Typography>
            <Grid container spacing={3}>
              {flashcards.slice(0, 9).map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      backgroundColor: colors[index % colors.length],
                      cursor: "pointer",
                      perspective: "1000px",
                    }}
                    onClick={() => handleCardClick(index)}
                  >
                    <CardActionArea>
                      <CardContent>
                        <Box
                          sx={{
                            position: "relative",
                            width: "100%",
                            height: "250px", // Increased height for better text fit
                            transformStyle: "preserve-3d",
                            transition: "transform 0.3s ease-in-out",
                            transform: flipped[index]
                              ? "rotateY(180deg)"
                              : "rotateY(0deg)",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              backfaceVisibility: "hidden",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              padding: 2,
                              boxSizing: "border-box",
                              top: 0,
                              left: 0,
                              overflow: "hidden", // Ensure content stays within the box
                              textAlign: "center", // Center the text
                              fontSize: "1rem", // Adjust font size to fit content
                              minHeight: "150px",
                            }}
                          >
                            <Typography
                              variant="h5"
                              component="div"
                              sx={{
                                fontSize: "clamp(0.8rem, 1.5vw, 1.2rem)", // Dynamically adjust font size
                                lineHeight: "1.2", // Adjust line height for better spacing
                                wordWrap: "break-word", // Ensure long words break and wrap
                                padding: "8px", // Add padding for better spacing
                              }}
                            >
                              {flashcard.front}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              position: "absolute",
                              width: "100%",
                              backfaceVisibility: "hidden",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              padding: 2,
                              boxSizing: "border-box",
                              top: 0,
                              left: 0,
                              transform: "rotateY(180deg)",
                              backgroundColor: "#FFF",
                              overflow: "hidden", // Ensure content stays within the box
                              textAlign: "center", // Center the text
                            }}
                          >
                            <Typography
                              variant="h5"
                              component="div"
                              sx={{
                                fontSize: "clamp(0.8rem, 1.5vw, 1.2rem)", // Dynamically adjust font size
                                lineHeight: "1.2", // Adjust line height for better spacing
                                wordWrap: "break-word", // Ensure long words break and wrap
                                padding: "8px", // Add padding for better spacing
                              }}
                            >
                              {flashcard.back}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              Save
            </Button>
          </Box>
        </>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcards collection
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Collection Name"
            type="fullWidth"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFlashcards}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
