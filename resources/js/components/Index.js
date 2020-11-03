import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import {Router, navigate} from '@reach/router'
import firebase from './Firebase';


import '../../css/index.css'
import Navigation from './Navigation'
import Books from './Books'
import Login from './Login'
import Signup from './Signup'
import Welcome from './Welcome'






export default class Index extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: null,
            displayName: null,
            userID: null
        };

        this.registerUser = this.registerUser.bind(this);
        this.logOutUser = this.logOutUser.bind(this);
    }

    componentDidMount(){
       firebase.auth().onAuthStateChanged(FBUser => {
           if(FBUser){
               this.setState({
                user: FBUser,
                displayName: FBUser.displayName,
                userID: FBUser.uid
               })
           }
       })
    }
    logOutUser = e =>{
        e.preventDefault();
        this.setState({
            user: null,
            displayName: null,
            userID: null
        });

        firebase
        .auth()
        .signOut()
        .then(() => {
            navigate('/login');
        });
    }

    registerUser(userName){
        firebase.auth().onAuthStateChanged(FBUser=> {
            FBUser.updateProfile({
                displayName :  userName
            }).then(() => {
                this.setState({
                    user:FBUser,
                    displayName:FBUser.displayName,
                    userID:FBUser.uid
                });
                navigate('/welcome');
            })
        })
    }




    render() {
        return (
            <>
             <Navigation userName={this.state.user} logOutUser={this.logOutUser}/>

            {this.state.displayName !==null ? <Welcome userName={this.state.displayName} /> : ""}
             <Router>
                 <Books path="/books"/>
                 <Login path="/login"/>
                 <Signup path="/signup" registerUser={this.registerUser}/>
             </Router>

            </>
        );
    }

}

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}

