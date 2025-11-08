import React from "react";
import AddProduct from "../components/AddProduct";

const AddProductPage = ({ onProductAdded }) => {
  return (
    <div>
      <AddProduct onProductAdded={onProductAdded} />
    </div>
  );
};

export default AddProductPage;
