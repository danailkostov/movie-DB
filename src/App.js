import Content from "./components/Content";
import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App" style={{ backgroundColor: "black", color: "white" }}>
      <Header />
      <Content />
      {/* <Sidebar /> */}
    </div>
  );
}

export default App;
