import React, { useState, useEffect, useRef } from 'react'

export default function ProductList() {

  const [products, setProducts] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [url, setUrl] = useState("http://localhost:8000/products/");

  const stock_status = useRef(false);

  const output = {
    color: 'red',
  }

  const fetchProducts = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setProducts(data);
  }

  useEffect(() =>{
    fetchProducts();
    console.log("--------------------------------")
  },[]);

  function handleDelete(id){
    setProducts(products.filter(product => product.id != id));
  }

  function handleName(e){
    setProductName(e.target.value);
  }

  function handlePrice(e){
    setProductPrice(e.target.value);
  }

  function handleReset(){
    setProductName("");
    setProductPrice("");
    stock_status.current.value=false;
  }

  function handleSubmit(){
    const ref_id = Math.floor(Math.random()*10000)
    const product = {
      id: ref_id,
      name: productName,
      price: productPrice,
      in_stock: stock_status.current.value === "true"
    }

    setProducts([product]);
  }


  return (
    <>
      <div className='toggle'>
        <button onClick={()=> setToggle(!toggle)} >{toggle?"Hide Products":"Show products"}</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleName} type="text" placeholder='Product Name' value={productName} />
        <input onChange={handlePrice} type="text" placeholder='Price' value={productPrice} />
        <select ref={stock_status}>
          <option value="true"> In Stock</option>
          <option value="false">Out of Stock</option>
        </select>
        <span onClick={handleReset} className='reset-btn'>Reset Input</span>
        <button className='form-btn'>Add Product</button>
      </form>
      <div>
        <h2>Product Name: <span style={output}>{productName} </span></h2>
        <h2>Product Price: <span style={output}>{productPrice} </span></h2>
      </div>
      <div className='filter-btns'>
        <button onClick={()=> setUrl("http://localhost:8000/products/")}>All Products</button>
        <button onClick={()=> setUrl("http://localhost:8000/products?in_stock=true")}>In Stock</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {toggle && products.map((product) => 
            <tr key={product.id} className={product.in_stock?"in_stock":"outof_stock"}>
              <td>{product.id} </td>
              <td>{product.name} </td>
              <td>{product.price} </td>
              <td><span onClick={()=>handleDelete(product.id)} className='delete-btn'>Delete</span> </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
