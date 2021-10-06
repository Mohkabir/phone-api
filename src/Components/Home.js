import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Products from './Products';
import Search from './Search';
import phoneimg from "../asset/phonestore.jpg";
import Fuse from "fuse.js";

const Home = () => {

  const api = "https://ezeapi-prod-copy.herokuapp.com/api/v1/sell-request/in-stock?sort=new&limit=40&page=1&minPrice=50&maxPrice=&storageSizeString=&conditionString=&category=Smartphones&brand=Apple,Samsung,Google,Huawei,LG,Motorola,OnePlus.";

  const [url, setUrl] = useState(api)
  const [loading, setloading] = useState(false)
  const [products, setProducts] = useState();
  const [productCopy, setProductCopy] = useState();

  const [search, setSearch] = useState({
    property:"",
    min:0,
    max:0
  });


  const handleChange = (key, value) => {

    setSearch(value);

    if(key === "search"){
      setSearch({...search, property: value});
      searchProducts(value);
    }else if(key === "min"){
      setSearch({...search, min: value});
    }else if(key === "max"){
      setSearch({...search, max: value});
    }
  }

  const handleMaxMinSubmit = () => {
    setUrl(`https://ezeapi-prod-copy.herokuapp.com/api/v1/sell-request/in-stock?sort=new&limit=20&page=1&minPrice=${search.min}&maxPrice=${search.max}&storageSizeString=&conditionString=&category=Smartphones&brand=Apple,Samsung,Google,Huawei,LG,Motorola,OnePlus.`)
  }

  useEffect(()=>{
    setloading(true);
    axios.get(url)
    .then((res)=> {
      setProducts(res.data.data.data)
      setProductCopy(res.data.data.data)
      setloading(false);
    }).catch(err => console.log("fetch error log", err));

  },[url])

  const fuse = new Fuse(products,{
    keys: ["name", "grade", "storageSize"],
  });

  const searchProducts = (pattern) => {
    console.log(pattern)
    if (!pattern) {
        setProductCopy(products)
    }
    const result = fuse.search(pattern);
    const prorRes = result.map(products=>products.item)
    if (result.length = 0 ) {
        return(<div><span className="nos">No result for products...</span><span className="click">pls review categories to see products</span></div>)
    } 
    setProductCopy(prorRes)
  }


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
        products={productCopy}
        />
      }
      
    </div>
  )
}

export default Home
