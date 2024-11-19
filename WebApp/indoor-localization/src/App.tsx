import "./App.css";
import AssetsManager from "./components/AssetsManager";
import Header from "./components/Header";

function App() {
  return (
    <div className="application">
      <Header />
      <div className="content">
        <AssetsManager></AssetsManager>
      </div>
    </div>
  );
}

export default App;
