import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";

const Profile = () => {

  const user = useSelector((state) => state.auth.user);


  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    role: user ? user.role : "",
  });

  const StyledCard = styled(Card)({
    backgroundColor: '#FFC0CB',
    padding: '20px',
  });
 
  const [editMode, setEditMode] = useState(false);

  const handleClose = () => {
  
  };

  const handleEdit = () => {
  
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    setEditMode(false);
  };

  const handleCancel = () => {
   
    setFormData({
      name: user ? user.name : "",
      email: user ? user.email : "",
      role: user ? user.role : "",
    });
  
    setEditMode(false);
  };

  const handleImageUpload = (e) => {
   
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
        
      <Card>
        <Box p={3} position="relative">
          {editMode && (
            <IconButton
              aria-label="change-image"
              component="label"
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 1,
              }}
            >
              <PhotoCameraIcon />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </IconButton>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} md={3}>
              <Box display="flex" justifyContent="center" mb={2}>
                <Avatar
                  alt={user ? user.name : ""}
                  src={user ? user.imageUrl : ""}
                  sx={{ width: 120, height: 120 }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Typography variant="h4" gutterBottom>
                Profile Information
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  disabled={!editMode}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  disabled={!editMode}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  disabled={!editMode}
                  sx={{ mb: 2 }}
                />
                {!editMode ? (
                  <IconButton
                    aria-label="edit"
                    onClick={handleEdit}
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      zIndex: 1,
                    }}
                  >
                    <EditRoundedIcon />
                  </IconButton>
                ) : (
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mr: 2, backgroundColor: "#d63384" }}
                    >
                      Submit
                    </Button>
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={handleCancel}
                      sx={{
                        color: "black",
                        borderColor: "black",
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
              </form>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Container>
  );
};

export default Profile;
