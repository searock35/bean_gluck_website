import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import "./EditUserProfile.css"


function ProfilePreview () {
    return (
        <div className="profile-preview">
            <h1>Profile Preview</h1>
        </div>
    )
}
function EditUserProfile() {
    const [profileData, setProfileData] = useState({
        firstName: "Corey",
        lastName: "Bean",
        major: "Electrical Engineering",
        school: "Messiah University",

    });


    const onChangeHandler = (e) => {
        e.preventDefault();
        const { id, value } = e.target;
        setProfileData({
            ...profileData,
            [id]: value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        //some API call here
        console.log("Submitted form")
    }

    return (
        <div className="edit-page-container">
            <Form onSubmit={submitHandler} className="edit-profile-form">
            <h1>Edit Profile</h1>
            <Form.Group controlId="fullName">
                <Form.Label>Name</Form.Label>
                <Form.Row>
                    <Col>
                        <Form.Group controlId="firstName">
                            <Form.Control type="name" placeholder="First name" value={profileData.firstName} onChange={onChangeHandler} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="lastName">
                            <Form.Control type="name" placeholder="Last name" value={profileData.lastName} onChange={onChangeHandler} />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Text className="text-muted">
                    This is the name your peers will see for your book listings.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="major">
                <Form.Label>Pick your major</Form.Label>
                <Form.Control as="select">
                    <option>Electrical Engineering</option>
                    <option>Education</option>
                    <option>History</option>
                    <option>Athletics</option>


                </Form.Control>
            </Form.Group>

            <Form.Group controlId="school">
                <Form.Label>School</Form.Label>
                <Form.Control type="school" placeholder="Search for your school" value={profileData.school} onChange={onChangeHandler} />
                <Form.Text className="text-muted">This is where you expect to be buying and selling books. </Form.Text>
            </Form.Group>
            <Button id="reg-submit-button" variant="primary" type="submit">
                Submit
            </Button>
            </Form>
            <ProfilePreview>
                This is a preview.
            </ProfilePreview>
        </div>
    )
}

export default EditUserProfile;