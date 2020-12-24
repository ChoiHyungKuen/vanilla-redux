import React, { useState } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

const Detail = ({toDo}) => {
    return (
        <>
            <h1>{toDo?.text}</h1>
            <h3>생성됨: {toDo?.id}</h3>
        </>
    );
}

const mapStateToProps = (state, ownProps) => {
    console.log(state, ownProps, ' detail')
    const { 
        match: {
            params: { id } 
        }
     } = ownProps;
    return { toDo: state.find(toDo => toDo.id === parseInt(id) ) }
}

export default connect(mapStateToProps)(Detail);