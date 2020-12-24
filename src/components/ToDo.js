import React from 'react';
import {connect} from 'react-redux';
import { deleteToDo } from '../store';
import { Link } from 'react-router-dom';

const ToDo = ({text, onBtnClick, id}) => {
    return (
        <li>
            <Link to={`/${id}`}>{text}</Link>
            <button onClick={onBtnClick}>삭제</button>
        </li>
    );
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { id } = ownProps;
    return {
        onBtnClick: () => dispatch(deleteToDo(parseInt(id)))
    }
}

export default connect(null, mapDispatchToProps)(ToDo);