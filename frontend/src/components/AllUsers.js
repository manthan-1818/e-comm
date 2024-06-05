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
import Select from "react-select";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, Controller } from "react-hook-form";

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
    // Simulate fetching data from backend
    try {
      // Simulated response data
      const response = {
        data: [
          {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            role: "Admin",
          },
          // Add more user data if needed
        ],
      };
      const rowDataWithId = response.data.map((user) => ({
        ...user,
        id: user.id,
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

  const handleDeleteClick = (rowData) => {
    setUserToDelete(rowData);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    const newData = rowData.filter((user) => user.id !== userToDelete.id);
    setRowData(newData);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const ActionRenderer = ({ data }) => (
    <div>
      <IconButton onClick={() => handleEditClick(data)}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => handleDeleteClick(data)}>
        <DeleteIcon />
      </IconButton>
    </div>
  );

  const onSubmit = async (data) => {
    // Simulated update operation
    const newData = rowData.map((user) =>
      user.id === selectedUser.id ? { ...user, ...data } : user
    );
    setRowData(newData);
    handleClose();
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
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
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
                  placeholder="Select Role"
                  styles={{
                    container: (base) => ({ ...base, marginTop: '16px', marginBottom: '16px' }),
                    control: (base) => ({ ...base, height: '56px' }),
                  }}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mt: 2,
                backgroundColor: '#d63384', 
                '&:hover': {
                  backgroundColor: '#d63384', 
                },
                color: '#fff', 
                borderRadius: 2
              }}
            >
              Save
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={showDeleteModal}
        onClose={handleCancelDelete}
        aria-labelledby="modal-delete-title"
        aria-describedby="modal-delete-description"
        centered
      >
        <Box sx={style}>
          <Typography id="modal-delete-title" variant="h6" component="h2">
            Confirm Delete
          </Typography>
          <Typography id="modal-delete-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this user?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button
              variant="contained"
              onClick={handleCancelDelete}
              sx={{
                mr: 2,
                backgroundColor: '#6c757d',
                '&:hover': { backgroundColor: '#5a6268' },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirmDelete}
              sx={{
                backgroundColor: '#d63384',
                '&:hover': { backgroundColor: '#d63384' },
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default AllUsers;
