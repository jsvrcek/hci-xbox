import './App.css'
import Home from './components/Home.tsx'
import store from "./redux/store.ts";
import {Provider} from "react-redux";

function App() {
    return (
        <Provider store={store}>
            <Home/>
        </Provider>
    )
}

export default App
