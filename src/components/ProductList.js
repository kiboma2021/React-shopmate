import React, { useState, useEffect, useRef } from 'react'

export default function ProductList() {

  const [products, setProducts] = useState([]);
  const [toggle, setToggle] = useState(true);

  console.log(products)

  useEffect(() =>{
    fetch('http://localhost:8000/products/')
    .then((response) =>response.json())
    .then((data) => setProducts(data))
  },[]);

  function handleDelete(id){
    setProducts(products.filter(product => product.id != id));
  }
  return (
    <>
      <div className='toggle'>
        <button onClick={()=> setToggle(!toggle)} >{toggle?"Hide Products":"Show products"}</button>
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
