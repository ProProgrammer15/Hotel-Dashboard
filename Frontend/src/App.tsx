import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import RoomDetailsPage from "./pages/create-room/CreateRoom";
import MainLayout from "./layouts/MainLayout";
import UpdateRoomPage from "./pages/update-room/UpdateRoom";
import { Toaster } from "react-hot-toast";
import "./App.css";

// import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-room" element={<RoomDetailsPage />} />
          <Route path="/room/:id" element={<UpdateRoomPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
