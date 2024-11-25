import "./App.css";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import sketch from "./sketch";

function App() {
  return (
    <>
      <div>
        <ReactP5Wrapper sketch={sketch} />
        <div style={{ position: "absolute", top: 0, left: 20 }}>
          <div
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "black",
              backgroundColor: "white",
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            {" "}
            St Xavier's College Library Catalogue
          </div>
          <p>Click and drag to move the library</p>
        </div>
        <div 
        style={{width: "20vw", height: "100vh", position: "absolute", top: 0, right: 0, backgroundColor: "rgba(255, 255, 255, .4)", padding: 20, borderRadius: 10, color: "black" }}> 
          <div>Search for a Book</div>
          <input
          type="text" placeholder="Eg. Kafka on the shore" />
          <button style={{width: "100%"}}> Find </button>

        </div>

      </div>
    </>
  );
}

export default App;
