import React,{ Component } from 'react';
import FormError from './FormError';
import firebase from './Firebase';

export default class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayName: '',
            email : '',
            passOne: '',
            passTwo:'',
            errorMessage:null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        const itemName = e.target.name;
        const itemValue = e.target.value;

        this.setState({ [itemName]: itemValue }, () => {
            if(this.state.passOne !== this.state.passTwo){
                this.setState({errorMessage:"The password doesn't match"});
            }else {
                this.setState({errorMessage:null});
            }
        });
    }

    handleSubmit(e){
        var registrationInfo = {
            displayName : this.state.displayName,
            email : this.state.email,
            password : this.state.passOne
        }
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(
            registrationInfo.email,
            registrationInfo.password
        ).then(()=>{
            this.props.registerUser(registrationInfo.displayName);
        }).catch(error => {
            if(error.message !== null){
                this.setState({errorMessage:error.message});
            }else {
                this.setState({errorMessage:null});
            }
        });

    }
    render(){
        return (
            <>
                <div className="container">
                <br/>
                <h2>Register</h2>
                    <div className="row">

                        <div className="col-6">

                                {this.state.errorMessage != null ? (
                                    <FormError theMessage={this.state.errorMessage}/>
                                ): null }

                            <label htmlFor="displayName">Name</label>
                            <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                className="form-control"
                                name="displayName"
                                placeholder="Enter Name"
                                required
                                value={this.state.displayName}
                                onChange={this.handleChange}
                            />
                            <br/>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Email"
                                required
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                            <br/>
                            <label htmlFor="passOne">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="passOne"
                                placeholder="Password"
                                required
                                value={this.state.passOne}
                                onChange={this.handleChange}
                            />
                            <br/>
                            <label htmlFor="passTwo">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="passTwo"
                                placeholder="Confirm Password"
                                required
                                value={this.state.passTwo}
                                onChange={this.handleChange}
                            />

                                <br/>
                               <button type="submit" className="btn btn-success">Submit</button>

                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
