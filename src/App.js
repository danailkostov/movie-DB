import Content from "./components/Content";
import Header from "./components/Header";
console.log(process.env.REACT_APP_API_KEY);


function App() {
  return (
    <div className="App" style={{ backgroundColor: "black", color: "white" }}>
      <Header />
      <Content />
    </div>
  );
}

export default App;

//how to hide my API key
//research about folder structures
//auto sugges earch
