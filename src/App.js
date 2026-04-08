import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from "./pages/Home";
import Books from "./pages/Books";
import { books } from "./data";
import BookInfo from "./pages/BookInfo.jsx";
import Cart from "./pages/Cart";
import React, { useState, useEffect } from "react";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    setCart([...cart, { ...book, quantity: 1 }])

    // OPTION 2
    // setCart(prevCart => [...prevCart, { ...book, quantity: 1 }]);
  }

  function removeItem(item) {
    setCart(cart.filter((book) => book.id !== item.id))
  }

  function itemsInCart() {
    let counter = 0;
    cart.forEach((item) => {
      counter += item.quantity 
    })
    return counter;
  }

  function changeQuantity(book, quantity) {
    setCart(cart.map(item => {
      if (item.id === book.id) {
        return {
          ...item,
          quantity: +quantity,
        }
      }
      else {
        return item
      }
    }))


    // OPTION 2
    // setCart(cart.map((item) => {
    // return item.id === book.id ?
    // {...item, quantity: +quantity,} : item}) );

    // OPTION 3
    // setCart(prevCart =>
    //   prevCart.map(item =>
    //     item.id === book.id ? { ...item, quantity: Number(quantity) } : item
    //   )
    // );
  }

  useEffect(() => {
    console.log(cart)
  }, [cart])

  return (
    <Router>
      <div className="App">
        <Nav itemsInCart={itemsInCart()} />
        <Route path="/" exact component={Home} />
        <Route path="/books" exact render={() => <Books books={books} />} />
        <Route path="/books/:id" render={() => <BookInfo books={books} cart={cart} addToCart={addToCart} />} />
        <Route path="/cart" render={() => <Cart books={books} cart={cart} changeQuantity={changeQuantity} removeItem={removeItem} />} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
