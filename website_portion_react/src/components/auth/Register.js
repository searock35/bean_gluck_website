import React, { useState } from 'react';

function Register() {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        passwordValidate: "",
        email: "",
        school: ""
    })

    const submitHandler = (e) => {
        e.preventDefault();
        //Add functionality later.
    }

    const onChangeHandler = (e) => {
        console.log(user.lastName);
        const { name, value } = e.target;
        setUser((user) => ({
            ...user,
            [name]: value
        }))
    }

    const TextInput = ({ name, value, ...rest }) => (<input 
            type="text"
            name={name}
            key={name}
            value={value}
            {...rest}
        />)





    return (
        <div key="divKey">
            <form onSubmit={submitHandler} key="formkey">
                First Name:<input type="text" name="firstName" value={user.firstName} onChange={onChangeHandler}/>
                Last Name:<TextInput name="lastName" value={user.lastName} onChange={onChangeHandler}/>
                Password: <TextInput name="password" value={user.password} onChange={onChangeHandler}/>
            </form>
        </div>
    );
}

export default Register;