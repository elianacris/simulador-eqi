import React, { useEffect } from "react";
import { getIndicators } from "./services/indicators";
import { getSimulator } from "./services/simulations";

function App() {
useEffect(() =>{
  getIndicators()
  getSimulator()
},[])

  return (
    <div >

    </div>
  );
}

export default App;
