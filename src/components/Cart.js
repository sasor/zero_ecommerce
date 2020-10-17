import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import { connect } from 'react-redux';
import { removeFromCart } from '../store/cart/actions';
import { clearOrder, createOrder } from '../store/order/actions';

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

  closeModal = _ => {
    this.props.clearOrder()
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
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((acc, item) => {
        return item.price * item.count + acc
      }, 0)
    };
    this.props.createOrder(order);
  }

  render() {
    const { showCheckout } = this.state;
    const { cartItems, removeFromCart, order } = this.props;
    const total = cartItems.reduce((acc, item) => {
      return item.price * item.count + acc
    }, 0);

    return (
      <div>
        <div className="cart cart-header">
          {
            cartItems.length === 0
              ? `Cart is empty`
              : `You have ${cartItems.length} items in the cart `
          }
        </div>
        {
          order && (
            <Modal isOpen={true} onRequestClose={this.closeModal}>
              <Zoom>
                <button onClick={this.closeModal} className="close-modal">x</button>
                <div className="order-details">
                  <h3 className="success-message">Your order has been placed.</h3>
                  <h2>Order {order._id}</h2>
                  <ul>
                    <li>
                      <div>Name: </div>
                      <div>{order.name}</div>
                    </li>
                    <li>
                      <div>Email: </div>
                      <div>{order.email}</div>
                    </li>
                    <li>
                      <div>Address: </div>
                      <div>{order.address}</div>
                    </li>
                    <li>
                      <div>Total: </div>
                      <div>{formatCurrency(order.total)}</div>
                    </li>
                    <li>
                      <div>Items: </div>
                      <div>{order.cartItems.map(item => {
                        return (<div key={item._id}>{item.count} {"x"} {item.title}{" "}</div>)
                      })}</div>
                    </li>
                  </ul>
                </div>
              </Zoom>
            </Modal>
          )
        }
        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {
                  cartItems.map(item => (
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
            cartItems.length > 0 && (
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

const mapStateToProps = state => {
  return {
    order: state.order.order,
    cartItems: state.cart.cartItems
  }
}

export default connect(mapStateToProps, { removeFromCart, createOrder, clearOrder })(Cart);