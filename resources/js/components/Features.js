import React,{ Component } from 'react';
import profile from './../images/profile.jpg'


export default class Features extends Component{

  render(){

    return (
            <>
            <div className="col-4 col-md-4">
                <div className="card mt-4">
                    <div className="card-body ">
                        <div className="d-flex mb-2 text-center">
                        <img src={profile} id="profile-photo" className="img-responsive img-circle pr-2"/>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Suscipit quasi, fuga 
                        </p>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
            </>
        );
    }
}
