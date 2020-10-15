import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

class Products extends Component {

  state = {
    product: null
  };

  openModal = product => {
    this.setState({ product });
  }

  closeModal = _ => {
    this.setState({ product: null });
  }

  addToCartAndCloseModal = _ => {
    this.props.addToCart(this.state.product);
    this.closeModal();
  }

  render() {
    const { product } = this.state;
    const { products, addToCart } = this.props;
    return (
      <div>
        <Fade bottom cascade>
          <ul className="products">
            {
              products.map(product => {
                return (
                  <li key={product._id}>
                    <div className="product">
                      <a href={`#${product._id}`} onClick={_ => this.openModal(product)}>
                        <img src={product.image} alt={product.title} />
                        <p>{product.title}</p>
                      </a>
                      <div className="product-price">
                        <div>{formatCurrency(product.price)}</div>
                        <button onClick={_ => addToCart(product)} className="button primary">Add to Cart</button>
                      </div>
                    </div>
                  </li>
                );
              })
            }
          </ul>
        </Fade>
        {
          product && (
            <Modal isOpen={true} onRequestClose={this.closeModal}>
              <Zoom>
                <button className="close-modal" onClick={this.closeModal}>x</button>
                <div className="product-details">
                  <img src={product.image} alt={product.title} />
                  <div className="product-details-description">
                    <p><strong>{product.title}</strong></p>
                    <p>{product.description}</p>
                    <p>
                      Available Sizes:{" "}
                      {product.availableSizes.map(size => (
                        <span>{" "}
                          <button className="button">{size}</button>
                        </span>
                      ))}
                    </p>
                    <div className="product-price">
                      <div>{formatCurrency(product.price)}</div>
                      <button onClick={this.addToCartAndCloseModal} className="button primary">Add to Cart</button>
                    </div>
                  </div>
                </div>
              </Zoom>
            </Modal>
          )
        }
      </div>
    );
  }

}

export default Products;