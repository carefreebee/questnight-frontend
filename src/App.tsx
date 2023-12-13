import { NextUIProvider } from "@nextui-org/react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "~/components/Header";

import Events from "~/routes/Events";
import Games from "~/routes/Games";
import Home from "~/routes/Home";
import Players from "~/routes/Players";

function App() {
  // to make nextui's Link component use react-router
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <div className="dark text-foreground bg-background min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/events" element={<Events />} />
          <Route path="/players" element={<Players />} />
        </Routes>
      </div>
    </NextUIProvider>
  );
}

export default App;
