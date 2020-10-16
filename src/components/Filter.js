import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterProducts, sortProducts } from '../store/actions';


class Filter extends Component {

  componentDidUpdate() {
    console.log(this.state, this.props);
  }

  render() {
    const { products, filtered, sort, size, filterProducts, sortProducts } = this.props;
    return (
      !products
        ? <div>...loading</div>
        : (
          <div className="filter">
            <div className="result-result">{filtered.length} Products</div>
            <div className="filter-sort">{` Order `}
              <select value={sort} onChange={e => sortProducts(filtered, e.target.value)}>
                <option value="latest">Latest</option>
                <option value="lowest">Lowest</option>
                <option value="highest">Highest</option>
              </select>
            </div>
            <div className="filter-size">{` Filter `}
              <select value={size} onChange={e => filterProducts(products, e.target.value)}>
                <option value="">ALL</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
          </div>
        )
    );
  }

}

const mapStateToProps = (state) => {
  return {
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filtered: state.products.filtered
  }
}

export default connect(mapStateToProps, { filterProducts, sortProducts })(Filter);