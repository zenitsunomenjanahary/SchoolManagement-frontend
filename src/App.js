import {Layout} from "antd";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AddClass from "./pages/classes/AddClass";
import Classes from "./pages/classes/Classes";
import AddCourse from "./pages/courses/addCourse";
import Courses from "./pages/courses/Courses";
import Home from "./pages/Home";
import AddNote from "./pages/notes/AddNote";
import Notes from "./pages/notes/Notes";
import AddStudent from "./pages/students/AddStudent";
import Students from "./pages/students/Students";
import AddTeacher from "./pages/teachers/AddTeacher";
import Teachers from "./pages/teachers/Teachers";

const { Content } = Layout;
function App() {
  return (
    <Router>
      <Layout>
        <Sidebar/>
        <Layout>
          <Navbar/>
          <Content className="site-layout">
            <Routes>
              <Route path="/" element={<Home/>}/>
              {/* students-routes */}
              <Route path="/students" element={<Students/>}/>
              <Route path="/students-new" element={<AddStudent/>}/>
              {/* courses-routes */}
              <Route path="/courses" element={<Courses/>}/>
              <Route path="/courses-new" element={<AddCourse/>}/>
              {/* teachers-routes */}
              <Route path="/teachers" element={<Teachers/>}/>
              <Route path="/teachers-new" element={<AddTeacher/>}/>
              {/* classes-routes */}
              <Route path="/classes" element={<Classes/>}/>
              <Route path="/classes-new" element={<AddClass/>}/>
              {/* notes-routes */}
              <Route path="/notes" element={<Notes/>}/>
              <Route path="/notes-new" element={<AddNote/>}/>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
