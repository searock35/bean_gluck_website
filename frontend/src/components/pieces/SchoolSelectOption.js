import React from 'react';
import authAPI from '../../tools/api/authAPI';
import { Form } from 'react-bootstrap';

/**
 * A prop that renders a select box with schools. 
 * @param {props} props Should be given a list of basic schools ({id, name}) and an onChangeCB function
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
        <Form.Group controlId="schoolSelect">
            <Form.Label>Select your school: </Form.Label>
            <Form.Control
                as="select"
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
