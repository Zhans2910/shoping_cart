import React from 'react';
import Products from "./components/Products";
import Cart from "./components/Cart";
import Filter from './components/Filter';
import store from './store';
import { Provider } from 'react-redux';

class App extends React.Component {

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
          <Products/>
          </div>
          <div className="sidebar">
          <Cart/>
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
