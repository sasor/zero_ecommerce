import React, { Component } from 'react';
import { APP_URL } from './env';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from 'react-redux';

class App extends Component {

  state = {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  };

  createOrderAction = order => {
    console.log(order);
  }

  removeFromCartAction = (product) => {
    const items = this.state.cartItems.filter(item => item._id !== product._id);
    this.setState({
      cartItems: items
    }, _ => console.log(`Removing item from cart`))
    localStorage.setItem("cartItems", JSON.stringify(items));
  }

  addToCartAction = (product) => {
    let inCart = false;
    const items = this.state.cartItems;
    items.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        inCart = true;
      }
    });
    if (!inCart) {
      items.push({ ...product, count: 1 })
    }
    this.setState({
      cartItems: items
    }, _ => console.log(`Adding item to cart`))
    localStorage.setItem("cartItems", JSON.stringify(items));
  }

  render() {
    const { cartItems } = this.state;
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href={APP_URL}>React Shopping Cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter />
                <Products addToCart={this.addToCartAction} />
              </div>
              <div className="sidebar">
                <Cart
                  items={cartItems}
                  removeFromCart={this.removeFromCartAction}
                  createOrder={this.createOrderAction} />
              </div>
            </div>
          </main>
          <footer>
            All right is reserved.
        </footer>
        </div>
      </Provider>
    );
  }
}

export default App;
