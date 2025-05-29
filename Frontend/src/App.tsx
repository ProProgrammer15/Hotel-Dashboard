import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import RoomDetailsPage from "./pages/create-room/CreateRoom";
import UpdateRoomPage from "./pages/UpdateRoom/UpdateRoom";

import MainLayout from "./layouts/MainLayout";
import "./App.css";

// import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-room" element={<RoomDetailsPage />} />
          <Route path="/room/:id" element={<UpdateRoomPage />}/>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
