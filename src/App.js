import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Frontend/Pages/Home";
import Snackbar from "./Frontend/Utility/components/Snackbar";
import { useSnackBar } from "./Frontend/Context/SnackMessage";

function App() {
  const { message } = useSnackBar();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {message && <Snackbar />}
    </div>
  );
}

export default App;
