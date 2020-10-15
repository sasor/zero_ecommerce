import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';

class Cart extends Component {

  state = {
    name: "",
    email: "",
    address: "",
    showCheckout: false
  };

  toggleFormCheckout = _ => {
    return this.setState(prevState => {
      return { showCheckout: !prevState.showCheckout }
    }, _ => console.log("toggle checkout form"));
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  createOrder = e => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.items
    };
    this.props.createOrder(order);
  }

  render() {
    const { showCheckout } = this.state;
    const { items, removeFromCart } = this.props;
    const total = items.reduce((acc, item) => {
      return item.price * item.count + acc
    }, 0);

    return (
      <div>
        <div className="cart cart-header">
          {
            items.length === 0
              ? `Cart is empty`
              : `You have ${items.length} items in the cart `
          }
        </div>
        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {
                  items.map(item => (
                    <li key={item._id}>
                      <div>
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div>
                        <div>{item.title}</div>
                        <div className="right">
                          {formatCurrency(item.price)} x {item.count}{" "}
                          <button className="button" onClick={_ => removeFromCart(item)}>Remove</button>
                        </div>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </Fade>
          </div>
          {
            items.length > 0 && (
              <div className="cart">
                <div className="total">
                  <div>
                    Total:{" "}
                    {formatCurrency(total)}
                  </div>
                  <button onClick={_ => this.toggleFormCheckout()} className="button primary">Proceed</button>
                </div>
              </div>
            )
          }
          {
            showCheckout && (
              <Fade right cascade>
                <div className="cart">
                  <form onSubmit={this.createOrder}>
                    <ul className="form-container">
                      <li>
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" required onChange={this.handleInput} />
                      </li>
                      <li>
                        <label htmlFor="name">Name</label>
                        <input id="name" name="name" type="text" required onChange={this.handleInput} />
                      </li>
                      <li>
                        <label htmlFor="address">Address</label>
                        <input id="address" name="address" type="text" required onChange={this.handleInput} />
                      </li>
                      <li>
                        <button className="button primary">Checkout</button>
                      </li>
                    </ul>
                  </form>
                </div>
              </Fade>
            )
          }
        </div>
      </div >
    );
  }

}

export default Cart;