import React, { useState } from 'react';
import Header from "../../components/Header/Header";
import ProductCard from "./ProductCards/ProductCard";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <Header onSearchChange={handleSearchChange} />
      <ProductCard searchTerm={searchTerm} />
    </div>
  );
};

export default Home;
