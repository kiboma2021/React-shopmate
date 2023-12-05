import React from 'react'
import Logo from '../assets/logo.png'
import styles from './header.module.css'

const Header = () => {
  return (
    <div className={styles.header}>
        <img src={Logo} alt="Shopmate" />
        <ul className={styles.headerlist}>
            <li>Home</li>
            <li>Products</li>
            <li>About us</li>
            <li>Careers</li>
            <li>Login</li>
        </ul>
      
    </div>
  )
}

export default Header
