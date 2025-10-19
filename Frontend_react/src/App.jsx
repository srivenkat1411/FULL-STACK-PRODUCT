import React, { useState } from "react";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

const App = () => {
  const [update, setUpdate] = useState(false);

  const handleProductAdded = () => {
    setUpdate(!update); // trigger re-fetch in ProductList
  };

  return (
    <div>
      <h1>Product Management</h1>
      <AddProduct onProductAdded={handleProductAdded} />
      <ProductList key={update} />
    </div>
  );
};

export default App;
