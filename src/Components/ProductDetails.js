import React, { useState, useEffect } from 'react';

const ProductDetails = () => {
  
const [phoneDetails, setPhoneDetails] = useState(JSON.parse(localStorage.getItem("phonedetails")));

useEffect(()=>{
  setPhoneDetails(JSON.parse(localStorage.getItem("phonedetails")))
},[])

console.log("phoneDetails", phoneDetails)


  return (
  <div className="product singleproduct">
   
    <div className="card">
      <img src={phoneDetails?.imgUrl} alt={phoneDetails?.brand} />
      <h3>{phoneDetails?.name}</h3>
      <p><small><strong>Category</strong>: {phoneDetails?.category}</small></p>
      <p><small><strong>Grade</strong>: {phoneDetails?.lowestAsk?.grade}</small></p>
      <p><small><strong>Storage</strong>: {phoneDetails?.lowestAsk?.storageSize}</small></p>
      <p><small><strong>Price</strong>:${phoneDetails?.lowestAsk?.price}.00</small></p>
   
    </div>
  </div>
  )
}

export default ProductDetails
