import "./App.scss";
//Components
import Checkout from "./Components/Checkout";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Checkout />
      </div>
    </Provider>
  );
}

export default App;
