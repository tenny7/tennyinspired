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
import CheckIn from './CheckIn';
import Authors from './Authors';






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
               });

               const bookRef = firebase.database().ref('books/' + FBUser.uid );
               bookRef.on('value', snapshot => {
                   let books = snapshot.val();
                   let bookList = [];

                   for(let item in books){
                       bookList.push({
                           bookID: item,
                           bookName: books[item].bookName
                       });
                   }

                   this.setState({
                       books: bookList,
                       howManyBooks : bookList.length
                   })
               });
           } else {
               this.setState({
                   user:null
               });
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

    addBookName = bookName => {
        const ref = firebase
        .database()
        .ref(`books/${this.state.user.uid}`);
        ref.push({bookName: bookName});
    }






    render() {
        return (
            <>
             <Navigation userName={this.state.user} logOutUser={this.logOutUser}/>

            {this.state.displayName !==null ? <Welcome userName={this.state.displayName} /> : ""}
             <Router>
                 <Books path="/books"
                    books={this.state.books}
                    addBookName={this.addBookName}
                    userName={this.user}
                    userID={this.state.userID}
                 />
                 <CheckIn path="/checkin/:userID/:bookID"

                 />
                 <Authors path="/authors/:userID/:bookID"
                    adminUser={this.state.userID}
                 />
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

