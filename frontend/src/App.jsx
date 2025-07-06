import Dashboard from "./components/Dashboard"
import Sidenav from "./components/Sidenav"
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import UsersPage from "./components/UsersPage";

const App = () => {
  return (
    <main className="w-full h-screen flex justify-between">
      <Sidenav />
      <div className="w-full py-5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
      </div>
    </main>
  )
}

export default App