import React from 'react';
import {connect} from 'react-redux';
import { actionCreators } from '../store';
import { Link } from 'react-router-dom';

const ToDo = ({text, onBtnClick, id}) => {
    return (
        <li>
            <Link to={`/${id}`}>
            {text} <button onClick={onBtnClick}>삭제</button>
            </Link>
        </li>
    );
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { id } = ownProps;
    return {
        onBtnClick: () => dispatch(actionCreators.deleteToDo(parseInt(id)))
    }
}

export default connect(null, mapDispatchToProps)(ToDo);