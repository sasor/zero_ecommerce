import React, { Component } from 'react';
import { APP_URL } from './env';
import data from './data.json';
import Products from './components/Products';

class App extends Component {

  state = {
    products: []
  };

  componentDidMount() {
    this.setState({ products: data.products })
  }

  render() {
    return (
      <div className="grid-container" >
        <header>
          <a href={APP_URL}>React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">Cart items</div>
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
