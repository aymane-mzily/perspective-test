import React, { useState } from 'react';
import { RadioGroup, Radio} from 'react-radio-group'; 

const styles =  {
    radioBtns:{
      marginLeft:'1rem',
      marginRight:'1rem'
    },
};

const Question = ({data, handleSelection}) => {
        return (
            <div className="row">
                <div className="card box-shadow text-center mx-auto" style={{width:'80rem'}}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="row justify-content-center align-self-center">
                                    <h5>{data.title}</h5>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12">
                                <div className="row justify-content-center align-self-center">
                                    <form>
                                        <span className="text-danger">Disagree</span>
                                        <RadioGroup name="q_seletion"
                                        onChange={ e => {
                                            handleSelection(
                                                { rate: e, id: data.id }
                                            );
                                        }
                                            
                                        } 
                                        style={{display:"inline-block"}}>
                                            <Radio value="1" style={styles.radioBtns}/>
                                            <Radio value="2" style={styles.radioBtns}/>
                                            <Radio value="3" style={styles.radioBtns}/>
                                            <Radio value="4" style={styles.radioBtns}/>
                                            <Radio value="5" style={styles.radioBtns}/>
                                            <Radio value="6" style={styles.radioBtns}/>
                                            <Radio value="7" style={styles.radioBtns}/>
                                        </RadioGroup>
                                        <span className="text-success">Agree</span>
                                    </form>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
}

export default Question;