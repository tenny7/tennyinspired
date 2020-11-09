import React,{ Component } from 'react';
import firebase from './Firebase'
import AuthorsList from './AuthorsList';


export default class Authors extends Component{
    constructor(props){
        super(props);

        this.state = {
            displayAuthors : []
        }
    }

    componentDidMount(){
        const ref = firebase
        .database()
        .ref(`books/${this.props.userID}/${this.props.bookID}/authors`);

        ref.on('value', snapshot => {
            let authors = snapshot.val();
            let authorsList = [];
            for(let item in authors){
                authorsList.push({
                    authorID: item,
                    authorName: authors[item].authorName,
                    authorEmail: authors[item].authorEmail
                });

                this.setState({
                    displayAuthors: authorsList
                })
            }
        })
    }
    render(){
        return(
        <>
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="font-weight-light text-center">
                        Authors
                    </h1>
                </div>
            </div>

            <AuthorsList 
                adminUser={this.props.adminUser}
                bookID={this.props.bookID}
                userID={this.props.userID} 
                authors={this.state.displayAuthors}
            />
        </div>
        </>
        );
    }
}
