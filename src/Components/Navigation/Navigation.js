import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">
                                Branches
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create-pull-request" className="nav-link">
                                Create Pull Request
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/pull-request-list" className="nav-link">
                                Pull Request List
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
