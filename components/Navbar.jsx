import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { urlFor } from "@/lib/client";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from "./";
import { useStateContext } from "@/context/StateContext";

const Navbar = ({ navLogo }) => {
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const langHandler = () => {
    setIsActive(!isActive);
  };
  const menuHandler = () => {
    setIsActive2(!isActive2);
  };
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <>
      <header className="fixed-top">
        <div className="container">
          <nav className="top-nav">
            <FontAwesomeIcon
              icon={faBars}
              style={{ fontSize: "25" }}
              className="bars"
              onClick={menuHandler}
            />
            <div className="logo">
              <Link href={"/"} legacyBehavior>
                <img src={urlFor(navLogo.image)} alt="logo" />
              </Link>
            </div>
            <div className="search">
              <input type="search" />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="search-icon"
              />
            </div>
            <div className="language">
              <ul className="lang-links">
                <li onClick={langHandler}>
                  Language
                  <ul>
                    <div className={`${isActive ? "active" : ""}`}>
                      <li>
                        <a href="">English</a>
                      </li>
                      <li>
                        <a href="">Arabic</a>
                      </li>
                    </div>
                  </ul>
                </li>
              </ul>
            </div>
            <div>
              <div>
                <button
                  type="button"
                  className="cart-icon"
                  onClick={() => setShowCart(true)}
                >
                  <AiOutlineShopping />
                  <span className="cart-item-qty">{totalQuantities}</span>
                </button>
                <button
                  type="button"
                  className="cart-icon"
                  onClick={() => setShowCart(true)}
                >
                  <span className="cart-span">Shopping Cart</span>
                </button>
              </div>
              {showCart && <Cart />}
            </div>
          </nav>
          <nav className={`main-nav ${isActive2 ? "active" : ""}`}>
            <ul>
              <li>
                <Link href="/categories" legacyBehavior>
                  <a>Categories</a>
                </Link>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Products</a>
              </li>
              <li>
                <a href="#">Find Us</a>
              </li>
              <li>
                <a href="#">B2B</a>
              </li>
              <li>
                <a href="#">P.O</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="navbar-space"></div>
    </>
  );
};

export default Navbar;
