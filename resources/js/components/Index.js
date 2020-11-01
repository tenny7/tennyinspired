import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import {Router} from '@reach/router'
import firebase from './Firebase'


import '../../css/index.css'
import Navigation from './Navigation'
import Books from './Books'
import Login from './Login'
import Register from './Register'






export default class Index extends Component {

    constructor(){
        super();
        this.state = { 
            user: null
        };
    }

    componentDidMount(){
        const ref = firebase.database().ref('user')
        ref.on('value', snapshot => {
            let FBUser = snapshot.val();
            this.setState({user: FBUser});
        });
    }
    render() {
        return (
            <>
             <Navigation /> 
            {this.state.user ? <h1>Hello {this.state.user}!</h1> : ""}
             <Router>
                 <Books path="/books"/>
                 <Login path="/login"/>
                 <Register path="/register"/>
             </Router>
            
            </>
        );
    }

}

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}

