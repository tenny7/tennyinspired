import React,{Component} from 'react';
import landingImg from '../images/bookapp.jpg';
import '../../css/index.css';

export default class Landing extends Component{
    render(){
        return(
            <>
                <img src={landingImg} className="img-edit" />
            </>
        );
    }
}
