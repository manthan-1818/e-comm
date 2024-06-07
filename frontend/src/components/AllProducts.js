import React, { useState } from "react";
import { Button, Form, InputGroup, Modal, Col } from "react-bootstrap";
import Dropzone from "react-dropzone";
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

const AllProducts = () => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [successfullyReadFileCount, setSuccessfullyReadFileCount] = useState(0);

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFiles([]);
    setProductName("");
    setBrandName("");
    setCategory("");
    setDescription("");
    setPrice("");
    setShowStatus(false);
    setSelectedFiles([]);
    setSuccessfullyReadFileCount(0);
  };

  const handleFileDrop = (droppedFiles) => {
    setSelectedFiles(droppedFiles);
    setShowStatus(true);
  };

  const removeFiles = (fileNamesToRemove) => {
    setSelectedFiles(
      selectedFiles.filter((file) => !fileNamesToRemove.includes(file.name))
    );
  };

  const handleReadSuccess = () => {
    setSuccessfullyReadFileCount(successfullyReadFileCount + 1);
  };

  const handleReadFail = () => {};

  const createHelperText = (file) => {};

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Form submitted");

    resetForm();
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
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
        Add Product
      </Button>

      <Modal show={open} onHide={handleClose} size="lg" centered>
        <Modal.Header>
          <Modal.Title>Add Product</Modal.Title>
          <button className="btn btn-lg close" onClick={handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="brandName">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => {
                  const inputPrice = e.target.value.replace(/[^0-9.]/g, "");
                  setPrice(inputPrice);
                }}
              />
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
                    infoText="Accepted file types: JPEG, Doc, PDF, PNG"
                  />
                </Box>
                {showStatus && (
                  <MultipleFileUploadStatus
                    statusToggleText={`${successfullyReadFileCount} of ${selectedFiles.length} files uploaded`}
                    aria-label="Current uploads"
                  >
                    {selectedFiles.map((file) => (
                      <MultipleFileUploadStatusItem
                        file={file}
                        key={file.name}
                        onClearClick={() => removeFiles([file.name])}
                        onReadSuccess={handleReadSuccess}
                        onReadFail={handleReadFail}
                        progressHelperText={createHelperText(file)}
                      />
                    ))}
                  </MultipleFileUploadStatus>
                )}
              </MultipleFileUpload>
            </Col>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#d63384",
              "&:hover": {
                backgroundColor: "#d63384",
              },
            }}
            type="submit"
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllProducts;
