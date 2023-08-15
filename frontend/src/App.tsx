import RoutesRoot from "./routes";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RoutesRoot />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
