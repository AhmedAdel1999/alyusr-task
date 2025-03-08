import { Route, Routes,BrowserRouter } from "react-router-dom";
import Register from "./components/register";
import UsersList from "./components/userslist";

function App() {
  return (
    <div dir="rtl">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/:id" element={<Register />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
