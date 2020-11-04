import React,{ Component } from 'react';
import firebase from './Firebase'
export default class Welcome extends Component{
  render(){
        const {userName} = this.props;


        return (
            <>
            <div className="text-center mt-4">
                <span className="text-secondary font-weight-bold pl-1">
                Welcome {userName}
                </span>
            </div>
            </>
        );
    }
}
