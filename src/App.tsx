import { Route, Routes } from "react-router-dom";

import Events from "~/routes/Events";
import Games from "~/routes/Games";
import Home from "~/routes/Home";
import Players from "~/routes/Players";

function App() {
  return (
    <>
      {/* TODO: some shared components here on top, like a header/navbar? or footer */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/events" element={<Events />} />
        <Route path="/players" element={<Players />} />
      </Routes>
    </>
  );
}

export default App;
