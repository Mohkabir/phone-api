import './App.css';
import Home from './Components/Home';
import ProductDetails from "./Components/ProductDetails";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './Components/Header';

function App() {
  return (

    <div className="App">
      <Header />
      <Router>
        <Switch>
          <div className="container">
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/productdetails">
              <ProductDetails />
            </Route>
          </div>
          
        </Switch>
      </Router>
     
    </div>
  );
}

export default App;
