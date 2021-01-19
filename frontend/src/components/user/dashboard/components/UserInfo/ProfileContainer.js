import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../../../../tools/react/UserContext";

function ProfileContainer() {
    const history = useHistory();
    const userInfo = useContext(UserContext);
    const editRedirect = () => history.push("./" + userInfo.username + "/edit");
    const [userCourses, setUserCourses] = useState([{name: "Intro to Philosphy", id: 4142, instructors: [{first_name: "Caleb", last_name: "Miller"}]}])
    
    let courseList = userCourses.map((course) => 
        (<li className="course">
            <div className="course-name">{course.name}</div>
            <div className="course-id">{course.id}</div>
            <div className="course-instructor">{course.instructors[0].first_name[0]}. {course.instructors[0].last_name}</div>
        </li>)

    )

    return (
        <div className="dash-container profile-container">
            <div className="dash-container-header profile-container-header theme-background">
                <h1>My Profile</h1>
                <button className="profile-edit-button" onClick={editRedirect}>Edit</button>
            </div>
            <div className="dash-container-body">
                <div className="user-summary">
                    <img className="profile-user-image" src="https://via.placeholder.com/100" alt="Current User"/>
                    {userInfo.first_name} {userInfo.last_name} <br />
                    {userInfo.majors[0]} <br />
                    {userInfo.grad_year} <br />
                </div>

                {/* Replace with call to server for user's courses */}
                <div className="course-summary">
                    <h3 className="course-summary-header">Upcoming Courses</h3>
                    <ul className="course-list">
                        {courseList}
                    </ul>

                </div>
            </div>

        </div>
    );
}

export default ProfileContainer;
