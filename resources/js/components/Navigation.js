import React, { Component } from "react";
import {Link} from '@reach/router'

export default class Navigation extends Component {

    render(){
        const {userName, logOutUser} = this.props;
        return(
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Book App</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">

                            <li className="nav-item active">
                                <Link to="/" className="nav-link">
                                    <span className="sr-only">(current)</span>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/books" className="nav-link">
                                    Books
                                </Link>
                            </li>
                            {userName == null?
                            <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link">
                                    Register
                                </Link>
                            </li>
                            </> :


                            <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link" onClick={e => logOutUser(e)} >
                                    Logout
                                </Link>
                            </li>
                            </>
                            }



                        </ul>
                    </div>
                </nav>

        );
    }
}
