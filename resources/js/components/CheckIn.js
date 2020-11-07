import React,{ Component } from 'react';
import firebase from './Firebase'
import {navigate} from '@reach/router'
import FormError from './FormError';

export default class CheckIn extends Component{
    constructor(props){
        super(props);

        this.state = {
            displayName : '',
            email: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        const itemName = e.target.name;
        const itemValue = e.target.value;

        this.setState({ [itemName] : itemValue})
    }

    handleSubmit(e){

        e.preventDefault();
        const ref = firebase.auth().database(`books/${this.props.userID}/${this.}`).ref();
        ref.push({

        });


    }


    render(){
        return (
            <>
            <br/>
                <div className="container">
                    <br/>
                    <h2>Login</h2>
                        <div className="row">

                            <div className="col-6">
                            {this.state.errorMessage != null ? (
                                    <FormError theMessage={this.state.errorMessage}/>
                                ): null }
                                <form onClick={this.handleSubmit}>

                                    <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                    <input
                                        className="form-control"
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}

                                    />
                                    <button type="submit" className="btn btn-success">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
            </>
        );
    }
}
