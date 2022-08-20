import { NavLink } from "react-router-dom";
import { AiFillDashboard,AiOutlineUser,AiFillRead} from "react-icons/ai"
import {FaTasks} from "react-icons/fa"

export const sidebarItems = [
    {
        key: "dashboard",
        icon: <AiFillDashboard/>,
        label: <NavLink to="/">Dashboard</NavLink>
    },
    {
        key: "students",
        icon: <AiOutlineUser/>,
        label: <NavLink to="/students">Students</NavLink>
    },
    {
        key: "teachers",
        icon: <AiOutlineUser/>,
        label: <NavLink to="/teachers">Teachers</NavLink>
    },
    {
        key: "courses",
        icon: <AiFillRead/>,
        label: <NavLink to="/courses">Courses</NavLink>
    },
    {
        key: "classes",
        icon: <AiFillRead/>,
        label: <NavLink to="/classes">Classes</NavLink>
    },
    {
        key: "notes",
        icon: <FaTasks/>,
        label: <NavLink to="/notes">Notes</NavLink>
    },
]