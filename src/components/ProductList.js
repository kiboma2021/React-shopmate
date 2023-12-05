import React, { useState, useEffect, useRef } from 'react'

export default function ProductList() {

  const [products, setProducts] = useState([]);
  const [toggle, setToggle] = useState(true);

  console.log(products)

  useEffect(() =>{
    fetch('http://localhost:8000/products/')
    .then((response) =>response.json())
    .then((data) => setProducts(data))
  },[])
  return (
    <div>
        <h2>Product List</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {toggle && products.map((product) => 
            <tr key={product.id} className={product.in_stock?"in_stock":"outof_stock"}>
              <td>{product.id} </td>
              <td>{product.name} </td>
              <td>{product.price} </td>
              <td> </td>
            </tr>
            )}
          </tbody>
        </table>
      
    </div>
  )
}
