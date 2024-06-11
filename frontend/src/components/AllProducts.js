import React, { useState, useEffect } from "react";
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
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../utils/services/productservices";
import { useSnackbar } from "notistack";

const AllProducts = () => {
  const [open, setOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [readFileData, setReadFileData] = useState([]);
  const [showStatus, setShowStatus] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      enqueueSnackbar(`Error fetching products: ${error.message}`, {
        variant: "error",
      });
    }
  };

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

      if (isUpdateMode) {
        formData.append("productId", currentProduct._id);
        await updateProduct(formData);
      } else {
        await addProduct(formData);
      }

      handleClose();
      resetForm();
      fetchProducts();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Unknown error occurred";
      enqueueSnackbar(`Error submitting product: ${errorMessage}`, {
        variant: "error",
      });
    }
  };

  const handleUpdateProduct = async (productId) => {
    try {
      // Implement your own logic to fetch a single product by ID here
      // Example: const product = await fetchProduct(productId);
      // setCurrentProduct(product.data);
      setIsUpdateMode(true);
      setOpen(true);
      // reset(product.data);
    } catch (error) {
      enqueueSnackbar(`Error submitting product: ${error.message}`, { variant: 'error' });
    }
  };

  const handleRemoveProduct = async (productId) => {
    const confirmation = window.confirm('Are you sure you want to delete it?');
    if (confirmation) {
      try {
        await deleteProduct(productId);
        fetchProducts(); // Assuming this function reloads the products
      } catch (error) {
        enqueueSnackbar(`Error deleting product: ${error.message}`, { variant: 'error' });
      }
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          top: "100px",
          right: "30px",
          zIndex: 999,
          color: "white",
          outline: "none",
          backgroundColor: "#d63384",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          padding: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AddIcon fontSize="large" />
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
              Upload images
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
                      statusToggleIcon="inProgress"
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
            <br />

            <Button
              variant="primary"
              type="submit"
              style={{ backgroundColor: "#d63384", border: "none" }}
            >
              {isUpdateMode ? "Update Product" : "Add Product"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Container>
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${product.productImage[0]}`}
                    alt={product.productName}
                  />

                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {product.productName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      {product.description}
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="body1" color="text.primary">
                        ${product.price}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {product.rating} ★
                      </Typography>
                    </Box>
                    <Button variant="contained" onClick={() => handleUpdateProduct(product._id)}>Edit</Button>
                    <Button variant="contained" onClick={() => handleRemoveProduct(product._id)}>Delete</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No products available</Typography>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default AllProducts;
