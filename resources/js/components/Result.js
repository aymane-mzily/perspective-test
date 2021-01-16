import React from 'react';
import { withRouter, Redirect } from "react-router-dom";
import HSBar from "react-horizontal-stacked-bar-chart";

class Result extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        if(!this.props.location.state){
            return (<Redirect to="/" />);
        }else{
            return (<div className="container d-flex" style={{paddingTop:'10rem'}}>
                <div className="row align-items-center" style={{padding:'4rem', border: '1px solid grey', borderRadius : '5px'}}>
                        <div className="col-sm-6 mx-auto">
                            <div className="row">
                                <h2>Your Perspective</h2>
                                <h3>Your Persprective type is {this.props.location.state.perspective}</h3>
                            </div>    
                        </div>
                        <div className="col-sm-6">
                            {this.props.location.state.leanings.map((item, idx) => 
                                <div className="row" style={{marginTop:"2rem"}}>
                                    <div className="col-sm-3">
                                        <span>{item.leftLeaning}</span>
                                    </div>
                                    <div className="col-sm-6">
                                        <HSBar data={[{ value: 1, color:item.status?"#E9ECEF": "#A920CB"}, { value: 1 , color:!item.status?"#E9ECEF": "#A920CB"}]} />
                                    </div>
                                    <div className="col-sm-3">
                                        <span>{item.rightLeaning}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                </div>
            </div>);
        }
    }

}

export default withRouter(Result)