import React, { Component } from 'react';
import formatCurrency from '../util';

class Cart extends Component {

  render() {
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
          </div>
          {
            items.length > 0 && (
              <div className="cart">
                <div className="total">
                  <div>
                    Total:{" "}
                    {formatCurrency(total)}
                  </div>
                  <button className="button primary">Proceed</button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }

}

export default Cart;