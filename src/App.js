import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import productApi from "./api/productApi";
import "./App.css";
import Header from "./components/Header";
import AlbumFeature from "./features/Album";
import Todo from "./features/Todo";

function App() {
  useEffect(() => {
    const fetchProducts = async () => {
      const params = {
        _limit: 10,
      };
      const productList = await productApi.getAll(params);
      console.log(productList);
    };

    fetchProducts();
  }, []);
  return (
    <div className="App">
      <Header />
      <Redirect from="/" to="/todos" exact />
      <Route path="/todos" component={Todo} />
      <Route path="/album" component={AlbumFeature} />
    </div>
  );
}

export default App;
