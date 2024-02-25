import { Cartcontext } from "./components/Store/Createcart-context.jsx";

import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import Product from "./components/Product.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";
import CartcontextProvider from "./components/Store/Createcart-context.jsx";

function App() {
  return (
    <CartcontextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartcontextProvider>
  );
}

export default App;
