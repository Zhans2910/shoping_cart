import React, { Component } from 'react'
import { connect } from 'react-redux';
import {filterProducts, sortProducts} from '../actions/productActions';

class Filter extends Component {
    render() {
        return ( !this.props.filteredProducts ? (<div>Loading...</div>) :
            <div className='filter'>
                <div className='filter-result'>
                {this.props.filteredProducts.length} Products
                </div>
                <div className='filter-sort'>
                    Order by price {" "}
                    <select value={this.props.sort} onChange={(e) => this.props.sortProducts(this.props.filteredProducts, e.target.value)}>
                    <option value='latest'>Latest</option>
                    <option value='lowest'>Lowest</option>
                    <option value='highest'>Highest</option>
                    </select>
                </div>
                <div className='filter-size'>
                    Choose the size{" "}
                    <select value={this.props.size} onChange={(e) => this.props.filterProducts(this.props.products, e.target.value)} >
                        <option value='ALL'>All
                        </option>
                        <option value='XS'>XS</option>
                        <option value='S'>S</option>
                        <option value='M'>M</option>
                        <option value='L'>L</option>
                        <option value='XL'>XL</option>
                        <option value='XXL'>XXL</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({products: state.products.items, filteredProducts: state.products.filteredItems, size: state.size, sort: state.sort}), {filterProducts, sortProducts} )(Filter)
