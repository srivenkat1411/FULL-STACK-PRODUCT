// import React, { useState } from "react";
// import ProductList from "./components/ProductList";
// import AddProduct from "./components/AddProduct";

// const App = () => {
//   const [update, setUpdate] = useState(false);

//   const handleProductAdded = () => {
//     setUpdate(!update); // trigger re-fetch in ProductList
//   };

//   return (
//     <div>
//       <h1>Product Management</h1>
//       <AddProduct onProductAdded={handleProductAdded} />
//       <ProductList key={update} />
//     </div>
//   );
// };

// export default App;
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

const App = () => {
  const [update, setUpdate] = useState(false);

  const handleProductAdded = () => {
    setUpdate(!update); // trigger re-fetch in ProductList
  };

  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Product Management</h1>

        {/* Navigation */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "10px" }}>Product List</Link>
          <Link to="/add">Add Product</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<ProductList key={update} />} />
          <Route path="/add" element={<AddProduct onProductAdded={handleProductAdded} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
