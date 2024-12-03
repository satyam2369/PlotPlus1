import './App.css';
import Home from './Containers/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../src/Components/Login/Login';
import SignUp from '../src/Components/SignUp/SignUp';
// import Write from './Containers/Write/Write';
import Upload from './Components/CharUpload/Upload';
import WriteStory from './Components/Write/WriteStory';
import Stories from './Components/StoriesDisplay/Stories';
import Display from './Components/StoriesDisplay/Display';
import AdminDashboard from './Components/Admin_Dashboard/AdminDashboard';
import AdminLogin from './Components/Login/AdminLogin';
import UserProfile from './Components/Profile/UserProfile';
// import { UserProvider } from './Components/Login/UserContext';

function App() {
  return (
    // <UserProvider >
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}> </Route>
          <Route path="/login" element={<Login />}> </Route>
          <Route path="/signup" element={<SignUp />}> </Route>
          <Route path="/adminLogin" element={<AdminLogin />}> </Route>
          <Route path="/write" element={<WriteStory />}> </Route>
          <Route path="/upload" element={<Upload />}> </Route>
          <Route path="/read" element={<Stories />}> </Route>
          <Route path="/story" element={<Display />}> </Route>
          <Route path="/admindashboard" element={<AdminDashboard />}> </Route>
          <Route path="/userprofile" element={< UserProfile />}> </Route>

          <Route path="/story/:id" element={<Display />} />
        {/* <Route path="/character/:id" element={<CharacterDetail />} /> */}
        {/* <Route path="/user/:id" element={<UserDetail />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
    // </UserProvider>
  );
}

export default App;
