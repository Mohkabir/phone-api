import React from 'react';
import { Link } from "react-router-dom";
import noimage from "../asset/noimage.jpg"

const Product = ({product}) => {

  const viewDetails = () => {
    console.log("single product", product);
    localStorage.setItem("phonedetails", JSON.stringify(product))
  }

  return (
    <div className="product">
      <Link to="/productdetails" onClick={viewDetails}>
      <img src={product.imgUrl? product.imgUrl:noimage} alt={product.brand} />
      </Link>
      <div className="card">
      <h3>{product?.name}</h3>
      <p><small><strong>Category</strong>: {product?.category}</small></p>
      <p><small><strong>Grade</strong>: {product?.lowestAsk?.grade}</small></p>
      <p><small><strong>Storage</strong>: {product?.lowestAsk?.storageSize}</small></p>
      <p><small><strong>Price</strong>:${product?.lowestAsk?.price}.00</small></p>
   
    </div>
    </div>
  )
}

export default Product
