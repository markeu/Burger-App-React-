import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import checkOut from './containers/CheckOut/CheckOut';


class App extends Component{
  render(){
    return (
      <div>
       <Layout>
          <BurgerBuilder/>
          <checkOut />
       </Layout>
      </div>
    );
  }
}

export default App;
