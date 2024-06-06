import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  Container,
  IconButton,
  TextField,
  Box,
  Button,
  Typography,
  Modal,
} from "@mui/material";
import {
  fetchUserData,
  updateUserData,
  deleteUserData,
} from "../utils/services";
import Select from "react-select";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const AllUsers = () => {
  const [rowData, setRowData] = useState(null);
  const [open, setOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const currentUser = useSelector((state) => state.auth.user);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const gridRef = useRef();

  const handleOpen = (data) => {
    setSelectedUser(data);
    setOpen(true);
    reset(data);
  };
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    try {
      const response = await fetchUserData();
      const rowDataWithId = response.data.map((user, index) => ({
        ...user,
        id: index + 1,
      }));
      setRowData(rowDataWithId);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (rowData) => {
    handleOpen(rowData);
  };

  const handleDeleteClick = async (rowData) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await deleteUserData(rowData._id);
        fetchData(); // Refresh the data after deletion
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const ActionRenderer = ({ data }) => (
    <div>
      <IconButton onClick={() => handleEditClick(data)}>
        <EditIcon />
      </IconButton>
      <IconButton
        onClick={() => handleDeleteClick(data)}
        disabled={currentUser._id === data._id} // Disable delete button for the current user
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );

  const onSubmit = async (data) => {
    try {
      await updateUserData(selectedUser._id, data); // Use the correct user ID for updating
      handleClose();
      fetchData(); // Refresh the data after update
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  useEffect(() => {
    if (rowData) {
      const adjustColumnSize = () => {
        const api = gridRef.current.api;
        api.sizeColumnsToFit();
      };
      adjustColumnSize();
    }
  }, [rowData]);

  const colDefs = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    { field: "role", headerName: "Role" },
    {
      headerName: "Actions",
      cellRenderer: ActionRenderer,
      maxWidth: 195,
    },
  ];

  return (
    <Container maxWidth="xl">
      <div className="ag-theme-quartz" style={{ height: 500, width: "100%" }}>
        <AgGridReact rowData={rowData} columnDefs={colDefs} ref={gridRef} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit User
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              variant="outlined"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: "User", label: "User" },
                    { value: "Admin", label: "Admin" },
                  ]}
                  defaultValue={field.value}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
            >
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </Container>
  );
};

export default AllUsers;
