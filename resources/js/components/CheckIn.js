
import React, {Component} from 'react'
import firebase from './Firebase'
import { navigate } from '@reach/router';


export default class CheckIn extends Component{
    constructor(props){
    super(props);

        this.state = {
            email : '',
            displayName : ''

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        const itemName  = e.target.name;
        const itemValue = e.target.value;

        this.setState({
            [itemName] : itemValue
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const ref = firebase.database().ref(`books/${this.props.userID}/${this.props.bookID}/authors`);
        ref.push({
            authorName : this.state.displayName,
            authorEmail: this.state.email
        });

        navigate(`/authors/${this.props.userID}/${this.props.bookID}`);

    }


    render(){
        return(
            <>
            <div className="container">
                <div className="row d-flex justify-content-center mt-4">
                    <div className="col-md-4">

                    <h4>Check In</h4>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group"> <label htmlFor="name"> Display name</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Enter Name"
                                    name="displayName"
                                    value={this.state.displayName}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            </>
        );
    }


}
