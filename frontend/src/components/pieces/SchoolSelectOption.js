import React from 'react';
import authAPI from '../../tools/api/authAPI';
import { Form } from 'react-bootstrap';

/**
 * A prop that renders a select box with schools, as a Form Group. Control Id is "school" 
 * @param {Object} schools Should be given a list of basic schools ({id, name}) 
 * @param {Function} onChanceCB a function to be called when the selection changes
 * @param {String} label a description for the dropdown
 */
function SchoolSelectOption(props) {
    let options = props.schools.map((school) => {
        return (
            <option value={school.id} key={school.id}>
                {school.name}
            </option>
        );
    });

    return (
        <Form.Group controlId="school">
            <Form.Label>{props.label}</Form.Label>
            <Form.Control
                as="select"
                value={props.value}
                defaultValue={authAPI.currentUser.school_id}
                onChange={props.onChangeCB}
            >
                <option value={0} key={0}>Select your school...</option>
                {options}
            </Form.Control>
        </Form.Group>
    );
}

export default SchoolSelectOption;
