import React from 'react';
import data from "./data.json";
import Products from "./components/Products";
import Cart from "./components/Cart";

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
  render(){
  return (
    <div className="grid-container">
      <header className="App-header">
       <a href="/">Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
          <Products products={this.state.products} addtoCart={this.addtoCart}/>
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
  );
  }
}

export default App;
