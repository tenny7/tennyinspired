import React,{ Component } from 'react';
import firebase from './Firebase'


export default class Authors extends Component{
    constructor(props){
        super(props);

        this.state = {
            displayAuthors : []
        }
    }

    componentDidMount(){
        const ref = firebase.database().ref(`books/${this.props.userID}/${this.props.bookID}/author`);
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

            Authors Goes here
        </div>
        </>
        );
    }
}
