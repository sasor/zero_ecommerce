import React, { Component } from 'react';
import { APP_URL } from './env';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

class App extends Component {

  state = {
    products: [],
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    size: "",
    sort: ""
  };

  componentDidMount() {
    this.setState({ products: data.products })
  }

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

  filterAction = (e) => {
    const { value } = e.target;
    let newState = null;
    if (value) {
      newState = Object.assign(
        {},
        { size: value },
        {
          products: data.products.filter(product => product.availableSizes.includes(value))
        }
      )
    } else {
      newState = Object.assign({}, { size: "" }, { products: data.products })
    }
    this.setState(newState, _ => console.log(this.state))
  }

  sortAction = (e) => {
    const { value } = e.target;
    let compareF = null;
    switch (value) {
      case "lowest": {
        compareF = (a, b) => a.price - b.price;
        break;
      }
      case "highest": {
        compareF = (a, b) => b.price - a.price;
        break;
      }
      default: {
        compareF = (a, b) => a._id - b._id;
      }
    }
    this.setState(prevState => {
      return {
        sort: value,
        products: prevState.products.slice().sort(compareF)
      }
    }, _ => console.log(this.state));
  }

  render() {
    const { products, cartItems, size, sort } = this.state;
    return (
      <div className="grid-container">
        <header>
          <a href={APP_URL}>React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={products.length}
                size={size}
                sort={sort}
                filterProducts={this.filterAction}
                sortProducts={this.sortAction} />
              <Products products={products} addToCart={this.addToCartAction} />
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
    );
  }
}

export default App;
