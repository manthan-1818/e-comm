import React, { useState } from "react";
import { Button, Form, Modal, Col } from "react-bootstrap";
import {
  MultipleFileUpload,
  MultipleFileUploadMain,
  MultipleFileUploadStatus,
  MultipleFileUploadStatusItem,
  HelperText,
  HelperTextItem,
} from "@patternfly/react-core";
import UploadIcon from "@patternfly/react-icons/dist/esm/icons/upload-icon";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { addProduct, updateProduct } from "../utils/services/productservices";
import { useSnackbar } from "notistack";

const AllProducts = () => {
  const [open, setOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [readFileData, setReadFileData] = useState([]);
  const [statusIcon, setStatusIcon] = useState("inProgress");

  const [showStatus, setShowStatus] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const resetForm = () => {
    reset();
    setSelectedFiles([]);
    setReadFileData([]);
    setShowStatus(false);
    setIsUpdateMode(false);
    setCurrentProduct(null);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleFileDrop = (_event, droppedFiles) => {
    const currentFileNames = selectedFiles.map((file) => file.name);
    const reUploads = droppedFiles.filter((droppedFile) =>
      currentFileNames.includes(droppedFile.name)
    );
    Promise.resolve()
      .then(() => removeFiles(reUploads.map((file) => file.name)))
      .then(() => updateCurrentFiles(droppedFiles));
  };

  const removeFiles = (namesOfFilesToRemove) => {
    const newCurrentFiles = selectedFiles.filter(
      (currentFile) =>
        !namesOfFilesToRemove.some((fileName) => fileName === currentFile.name)
    );
    setSelectedFiles(newCurrentFiles);
    const newReadFiles = readFileData.filter(
      (readFile) =>
        !namesOfFilesToRemove.some((fileName) => fileName === readFile.fileName)
    );
    setReadFileData(newReadFiles);
  };

  const updateCurrentFiles = (files) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    setShowStatus(true);
  };

  const handleReadSuccess = (data, file) => {
    setReadFileData((prevReadFiles) => [
      ...prevReadFiles,
      { data, fileName: file.name, loadResult: "success" },
    ]);
  };

  const handleReadFail = (error, file) => {
    setReadFileData((prevReadFiles) => [
      ...prevReadFiles,
      { loadError: error, fileName: file.name, loadResult: "danger" },
    ]);
  };

  const createHelperText = (file) => {
    const fileResult = readFileData.find(
      (readFile) => readFile.fileName === file.name
    );
    if (fileResult?.loadError) {
      return (
        <HelperText isLiveRegion>
          <HelperTextItem variant="error">
            {fileResult.loadError.toString()}
          </HelperTextItem>
        </HelperText>
      );
    }
  };
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
  
      formData.append("productName", data.productName);
      formData.append("brandName", data.brandName);
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("price", data.price);
  
      Array.from(selectedFiles).forEach((file) => {
        formData.append("images", file);
      });
  
      console.log("Form Data:", formData);
  
      if (isUpdateMode) {
        formData.append("productId", currentProduct._id);
        await updateProduct(formData);
      } else {
        await addProduct(formData);
      }
  
      handleClose();
      resetForm();
    } catch (error) {
      console.error("Submission error:", error);  // Log the entire error object
  
      // Extract the error message from different possible structures
      const errorMessage = error?.response?.data?.message || error?.message || "Unknown error occurred";
      enqueueSnackbar(`Error submitting product: ${errorMessage}`, {
        variant: "error",
      });
    }
  };
  
  

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        style={{
          position: "absolute",
          top: "100px",
          marginTop: "-5px",
          right: "30px",
          color: "white",
          outline: "none",
          backgroundColor: "#d63384",
          border: "none",
        }}
      >
        <AddIcon fontSize="small" /> Add Product
      </Button>

      <Modal show={open} onHide={handleClose} size="lg" centered>
        <Modal.Header>
          <Modal.Title>
            {isUpdateMode ? "Update Product" : "Add Product"}
          </Modal.Title>
          <button className="btn btn-lg close" onClick={handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                {...register("productName", { required: true })}
              />
              {errors.productName && (
                <Form.Text className="text-danger">
                  Product name is required.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="brandName">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand name"
                {...register("brandName", { required: true })}
              />
              {errors.brandName && (
                <Form.Text className="text-danger">
                  Brand name is required.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                {...register("category", { required: true })}
              />
              {errors.category && (
                <Form.Text className="text-danger">
                  Category is required.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter description"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <Form.Text className="text-danger">
                  Description is required.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <Form.Text className="text-danger">
                  Price is required.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Label column sm={0}>
              Upload Images
            </Form.Label>
            <Col>
              <MultipleFileUpload
                onFileDrop={handleFileDrop}
                dropzoneProps={{
                  accept: {
                    "image/jpeg": [".jpg", ".jpeg"],
                    "application/msword": [".doc"],
                    "application/pdf": [".pdf"],
                    "image/png": [".png"],
                  },
                }}
              >
                <Box sx={{ border: 1, borderColor: "grey.500" }}>
                  <MultipleFileUploadMain
                    titleIcon={<UploadIcon />}
                    titleText="Drag and drop files here"
                    titleTextSeparator="or"
                    infoText="Accepted file types: doc, docx, pdf, jpg, png"
                  />
                  {showStatus && (
                    <MultipleFileUploadStatus
                      statusToggleText={`${selectedFiles.length} files uploaded`}
                      statusToggleIcon={statusIcon}
                    >
                      {selectedFiles.map((f) => (
                        <MultipleFileUploadStatusItem
                          key={f.name}
                          file={f}
                          onClearClick={() => removeFiles([f.name])}
                        >
                          {createHelperText(f)}
                        </MultipleFileUploadStatusItem>
                      ))}
                    </MultipleFileUploadStatus>
                  )}
                </Box>
              </MultipleFileUpload>
            </Col>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {isUpdateMode ? "Update Product" : "Add Product"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AllProducts;
