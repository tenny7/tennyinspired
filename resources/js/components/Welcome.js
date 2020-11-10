import React,{ Component } from 'react';
import firebase from './Firebase'
import Features from './Features';
export default class Welcome extends Component{
  render(){
        const {userName} = this.props;


        return (
            <>
            <div className="text-center mt-4">
                <span className="text-secondary font-weight-bold pl-1">
                <h1>Welcome, {userName} !</h1>
                </span>
            </div>

            <div className="container">
                <div className="row d-flex justify-content-center">
                    <Features />
                </div>
            </div>
            </>
        );
    }
}
