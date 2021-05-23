import React from 'react';
import data from "./data.json";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Filter from './components/Filter';
import store from './store';
import { Provider } from 'react-redux';

class App extends React.Component {
  constructor(){
    super();
    this.state={
      products:data.products,
      cartItems:localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [],
      size:"",
      sort:""
    }
  }
  createOrder=(order)=>{
    alert("Need to save orfer for "+order.name);
  }
  removeFromCart=(product)=>{
    const cartItems=this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x)=> x._id!==product._id),
    })
    localStorage.setItem('items',JSON.stringify(cartItems.filter((x)=> x._id!==product._id)));
  }
  addtoCart=(product)=>{
    const cartItems=this.state.cartItems.slice();
    let inCart=false;
    cartItems.forEach((item)=>{
      if (item._id===product._id){
        item.count++;
        inCart=true;
      }
    });
    if (!inCart){
      cartItems.push({...product,count:1});
    }
    this.setState({cartItems});
    localStorage.setItem('items',JSON.stringify(cartItems));
  };
  filterProducts=(event) => {
    if (event.target.value==="" || event.target.value==="ALL"){
      this.setState({size:event.target.value, product:data.products});
    }
    else{
      this.setState({
        size: event.target.value,
        products:data.products.filter((product)=> product.availableSizes.indexOf(event.target.value)>=0)
  
      })
    }
  }
  sortProducts=(event)=>{
    const sort=event.target.value;
    this.setState({
      sort:sort,
      products: this.state.products.slice().sort((a,b)=>
      sort==='lowest'?
      a.price>b.price?1:-1
      :sort==='highest'?
      a.price<b.price?1:-1
      :a._id>b._id?1:-1
      )
    })
  }
  render(){
  return (
    <Provider store={store}>
    <div className="grid-container">
      <header className="App-header">
       <a href="/">Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
          <Filter count={this.state.products.length} 
          size={this.state.size}
          sort={this.state.sort}
          filterProducts={this.filterProducts}
          sortProducts={this.sortProducts} 
          />
          <Products addtoCart={this.addtoCart}/>
          </div>
          <div className="sidebar">
          <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} 
          createOrder={this.createOrder}/>
          </div>
        </div>
      </main>
      <footer>
        All rights are reserved.
      </footer>
    </div>
    </Provider>
  );
  }
}

export default App;
