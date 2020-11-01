import React,{ Component } from 'react';

export default class Register extends Component{
    constructor(){
        super();
        this.state = {
            displayName: '',
            email : '',
            passOne: '',
            passTwo:'',
            errorMessage:null
        }

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        const itemName = e.target.value;
        const itemValue = e.target.value;

        this.setState({ [itemName]: itemValue }, () => {
            if(this.state.passOne != this.state.passTwo){
                this.setState({errorMessage:"The password doesnt match"});
            }else {
                this.setState({errorMessage:null});
            }
        });
    }
    render(){
        return (
            <>
                <div className="container">
                    <h2 className="text-center">Register</h2>
                    <div className="form-control">
                        <label htmlFor="displayName">Name</label>
                        <input 
                            type="text"
                            name="displayName"
                            placeholder="Enter Name"
                            id="displayName"
                            required
                            value={this.state.displayName}
                            onChange={this.handleChange()}
                        />

                        <input 
                            type="email"
                            name="displayName"
                            placeholder="Email"
                            id="email"
                            required
                            value={this.state.email}
                        />

                        <input 
                            type="password"
                            name="passOne"
                            placeholder="Password"
                            id="passOne"
                            required
                            value={this.state.passOne}
                        />
                        <input 
                            type="password"
                            name="passTwo"
                            placeholder="Confirm Password"
                            id="passTwo"
                            required
                            value={this.state.passTwo}
                        />   
                    </div>
                </div>
            </>
        );
    }
}