import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <div className="application">
      <Header />
      <div className="content">
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
