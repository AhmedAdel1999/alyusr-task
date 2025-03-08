import { Route, Routes,BrowserRouter } from "react-router-dom";
import Register from "./components/register";
import UsersList from "./components/userslist";
import EditUser from "./components/edituser";

function App() {
  return (
    <div dir="rtl">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/:id" element={<EditUser />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
