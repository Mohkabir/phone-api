import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Products from './Products';
import Search from './Search';
import phoneimg from "../asset/phonestore.jpg"

const Home = () => {


  const api = "https://ezeapi-prod-copy.herokuapp.com/api/v1/sell-request/in-stock?sort=new&limit=40&page=1&minPrice=50&maxPrice=&storageSizeString=&conditionString=&category=Smartphones&brand=Apple,Samsung.";

  const [url, setUrl] = useState(api)

  const [loading, setloading] = useState(false)

  // "https://ezeapi-prod-copy.herokuapp.com/api/v1/sell-request/in-stock?sort=new&limit=20&page=1&minPrice=0&maxPrice=2500&storageSizeString=&conditionString=&category=Smartphones&brand=Apple,Samsung,Google,Huawei,LG,Motorola,OnePlus."


// const [products, setProducts] = useState(JSON.parse(localStorage.getItem("phones")));

const [products, setProducts] = useState();


const [search, setSearch] = useState({
  property:"",
  min:0,
  max:0
});

const handleChange = (key, value) => {
  setSearch(value);
  console.log(value);

  if(key === "search"){
    setSearch({...search, property: value});

    const conditionstring = search.property.split(",").join(","); 
    setUrl(`https://ezeapi-prod-copy.herokuapp.com/api/v1/sell-request/in-stock?sort=new&limit=20&page=1&minPrice=&maxPrice=&storageSizeString=&conditionString=${conditionstring}&category=Smartphones&brand=Apple,Samsung.`)

  }else if(key === "min"){
    setSearch({...search, min: value});
  }else if(key === "max"){
    setSearch({...search, max: value});
  }
  console.log("state log", search)

  const singleSearch = search.property.split(",");
  const storageSize =singleSearch? singleSearch.join(","):"";

}

const handleMaxMinSubmit = () => {
  setUrl(`https://ezeapi-prod-copy.herokuapp.com/api/v1/sell-request/in-stock?sort=new&limit=20&page=1&minPrice=${search.min}&maxPrice=${search.max}&storageSizeString=&conditionString=&category=Smartphones&brand=Apple,Samsung,Google,Huawei,LG,Motorola,OnePlus.`)

  //  setProducts({...products, lowestAsk })price

  //  products.filter((product)=> product.lowestAsk?.price == 0)

console.log("products filter log", products)
}

useEffect(()=>{
  setloading(true);
  axios.get(url)
  .then((res)=> {
    console.log("api log",res);
    // localStorage.setItem("phones", JSON.stringify(res.data.data.data))
    setProducts(res.data.data.data)
    setloading(false);
  }).catch(err => console.log("fetch error log", err));

},[])

useEffect(()=>{
  setloading(true);
  axios.get(url)
  .then((res)=> {
    console.log("api log",res);
    // localStorage.setItem("phones", JSON.stringify(res.data.data.data))
    setProducts(res.data.data.data)
    setloading(false);
  }).catch(err => console.log("fetch error log", err));

},[url])

// localStorage.setItem("phones", JSON.stringify(products));

  return (
    <div>
      <div className="search_wrapper">
        <div className="box1">
          <img className="phoneimg" src={phoneimg} alt="img" />
        </div>
        <Search 
        handleChange={handleChange}
        search={search}
        handleMaxMinSubmit={handleMaxMinSubmit}
        />

      </div>

      {
        loading? (
          <div class="spinner-border my-5 mx-auto d-block" role="status">
            <span class="sr-only"></span>
          </div>
        ):<Products 
        products={products}
        />
      }
      
    </div>
  )
}

export default Home
