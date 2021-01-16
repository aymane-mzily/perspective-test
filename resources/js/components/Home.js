import Question from './Question';
import axios from 'axios';
import React from 'react';
import { withRouter } from "react-router-dom";
import Loader from 'react-loader-spinner'

class Home extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            validQuestions: {},
            answers: {},
            isValid: true,
            errorMessage: '',
            email: '',
            loaded: false,
        };
        this.handleSelection = this.handleSelection.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.sendAnswers = this.sendAnswers.bind(this);
    }

    emailValid(email){
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(email);
    }

    componentDidMount(){
        axios.get(`/api/questions`)
          .then(res => {
            const questions = res.data;
            const loaded = true;
            this.setState({ questions });
            this.setState({ loaded });
          })
    }

    sendAnswers(){
        this.setState({isValid: true, errorMessage: ''});
        var filteredValidQuestions = Object.fromEntries(Object.entries(this.state.validQuestions).filter(([k,v]) => (v==true)));
        if(Object.keys(filteredValidQuestions).length == Object.keys(this.state.questions).length){
            const email = this.state.email.trim();
            if(!email){
                this.setState({isValid: false, errorMessage: 'Please Enter Your Email'});
            }else if(!this.emailValid(email)){
                this.setState({isValid: false, errorMessage: 'Please Enter a Valid Email'});
            }else{
                axios.post('/api/send_answers', {email: email, answers: this.state.answers}).then(response => {
                    if(response.status == 200)
                    {
                        this.props.history.push({
                            pathname:'/result',
                            state : {
                                leanings : response.data.leanings,
                                perspective : response.data.perspective
                            }
                        });
                    }
                });
            }
        }else{
            this.setState({isValid: false, errorMessage: 'Please Answer All Questions'});
        }
    }

    handleEmailChange(e){
        this.setState({email: e.target.value});
    }

    handleSelection(e){
        let validQuestions = this.state.validQuestions;
        let answers = this.state.answers;
        if(e.rate > 0){
            validQuestions[e.id] = true;
            answers[e.id] = e.rate;
        }else{
            validQuestions[e.id] = false;
        }
        this.setState({validQuestions});
        this.setState({answers});
    }

    render(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 pt-4">
                            <h4>Discover Your Perspective</h4>
                            <h5>Complete the 7 min test and get a detailed report of your lenses on the world.</h5>
                        </div>
                        <div className="col-md-8 offset-md-2 pt-5">
                            <div className="row justify-content-center">
                                
                                {!this.state.loaded && <div className="col-12 text-center">
                                    <Loader
                                        type="Puff"
                                        color="#00BFFF"
                                        height={100}
                                        width={100}
                                    />
                                </div>}
                                
                                <div className="col-12">
                                    {this.state.questions.map((item) => 
                                    <Question 
                                        data={item} 
                                        key={item.id}
                                        handleSelection={this.handleSelection}>
                                    </Question>
                                    )}
                                </div>
                                
                                {(this.state.loaded && this.state.questions.length > 0) && <div className="col-12">
                                    <div className="row">
                                        <div className="card box-shadow text-center mx-auto" style={{width:'80rem'}}>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="row justify-content-center align-self-center">
                                                            <h5>Your Email</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="row justify-content-center align-self-center">
                                                            <form>
                                                                <div className="form-group">
                                                                    <input type="email" 
                                                                    value={this.state.email}
                                                                    onChange={this.handleEmailChange}
                                                                    className="form-control mt-2" 
                                                                    aria-describedby="emailHelp" 
                                                                    placeholder="your@email.com"
                                                                    />
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>}

                                {(!this.state.isValid) && 
                                <div className="col-12 mt-4">
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.errorMessage}
                                    </div>
                                </div>
                                }
                                
                                {(this.state.loaded && this.state.questions.length > 0) && <div className="col-12 my-4 text-center">
                                    <button type="button" className="btn btn-primary" onClick={this.sendAnswers}>Save & Continue</button>
                                </div>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);