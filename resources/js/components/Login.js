import React,{ Component } from 'react';
import firebase from './Firebase'
import {navigate} from '@reach/router'
import FormError from './FormError';

export default class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            email : '',
            password: '',
            errorMessage:null
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
        var registrationInfo = {
            email : this.state.email,
            password : this.state.password
        }
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(
            registrationInfo.email,
            registrationInfo.password
        ).then(() => {
            this.setState(() => {
                navigate('/welcome');
        }).catch(error => {
            if(error.message !== null){
                this.setState({errorMessage:error.message});
            }else {
                this.setState({errorMessage:null});
            }
        });
        })
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
