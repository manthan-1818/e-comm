import React from "react";
import { Button, Card, CardContent, CardMedia, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import imageSuccess from "../images/accepted.jpg";

const VerificationSuccess = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: "50px", padding: "20px", borderRadius: "10px", backgroundColor: "#fce4ec" }}>
      <Card sx={{ maxWidth: 400, margin: "auto", backgroundColor: "#fff", padding: "20px", borderRadius: "10px" }}>
        <CardMedia
          component="img"
          height="200"
          image={imageSuccess}
          alt="Email Verified"
        />
        <CardContent>
          <Typography variant="h3" color="primary" gutterBottom>
            Congratulations!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Your email has been successfully verified. You can now securely log in to your account.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLoginRedirect}
            sx={{ marginTop: "20px", backgroundColor: "#e91e63", color: "#fff", "&:hover": { backgroundColor: "#e91e63" } }}
          >
            Go to Login Page
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default VerificationSuccess;
