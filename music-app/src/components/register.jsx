import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
	state = {
		data: {
			username: "",
			password: "",
			name: ""
		},
		errors: {}
	};

	schema = {
		username: Joi.string()
			.email()
			.required()
			.label("Username"),
		password: Joi.string()
			.required()
			.min(5)
			.label("Password"),
		name: Joi.string()
			.required()
			.label("Name")
	};

	doSubmit = () => {
		console.log("submitted");
	};

	render() {
		return (
			<div>
				<h1>Register form</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("username", "Username")}
					{this.renderInput("password", "Password", "password")}
					{this.renderInput("name", "Name")}
					{this.renderButton("Register")}
				</form>
			</div>
		);
	}
}

export default RegisterForm;
