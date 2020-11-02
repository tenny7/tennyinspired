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






export default class Index extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: null,
            displayName: null,
            userID: null
        };
    }

    componentDidMount(){
        const ref = firebase.database().ref('user')
        ref.on('value', snapshot => {
            let FBUser = snapshot.val();
            this.setState({user: FBUser});
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
                navigate('/');
            })
        })
    }

    render() {
        return (
            <>
             <Navigation />
            {this.state.displayName !==null ? <h1 style={{alignText:'center'}}>Welcome {this.state.displayName}!</h1> : ""}
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

