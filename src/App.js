import React from 'react';
import Products from "./components/Products";
import Cart from "./components/Cart";
import Filter from './components/Filter';
import store from './store';
import { Provider } from 'react-redux';

class App extends React.Component {
  constructor(){
    super();
    this.state={
      cartItems:localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [],
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
          <Filter />
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
