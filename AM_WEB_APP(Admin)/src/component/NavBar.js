import React from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

function NavBar(props) {



    return (
        <div>
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Article Management</h3>
                </div>

                <ul className="list-unstyled components">
                    <li className="active">
                        <Link to="/news">Article Management</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;
