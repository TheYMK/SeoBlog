import { useState, useEffect } from 'react';
import { signup, isAuth, preSignup } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';

function SignupComponent() {
	const [ values, setValues ] = useState({
		name: '',
		email: '',
		password: '',
		error: '',
		loading: false,
		message: '',
		showForm: true
	});

	const { name, email, password, error, loading, message, showForm } = values;

	useEffect(() => {
		// if there is a logged in user redirect to home page
		isAuth() && Router.push('/');
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.table({ name, email, password, error, loading, message, showForm });
		setValues({ ...values, loading: true, error: false });
		const user = { name, email, password };
		// we pass it to signup auth action
		preSignup(user).then((data) => {
			if (data.error) {
				// in our api design, never return an error object, we can return a string
				setValues({ ...values, error: data.error, loading: false });
			} else {
				setValues({
					...values,
					name: '',
					email: '',
					password: '',
					error: '',
					loading: false,
					message: data.message,
					showForm: false
				});
			}
		});
	};

	const handleChange = (name) => (e) => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

	const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');

	const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');

	const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

	const signupForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						value={name}
						className="form-control"
						type="text"
						placeholder="Enter your name..."
						onChange={handleChange('name')}
					/>
					<input
						value={email}
						className="form-control"
						type="email"
						placeholder="Enter your email..."
						onChange={handleChange('email')}
					/>
					<input
						value={password}
						className="form-control"
						type="password"
						placeholder="Enter your password..."
						onChange={handleChange('password')}
					/>
				</div>
				<div>
					<button className="btn btn-primary">Signup</button>
				</div>
			</form>
		);
	};

	return (
		<React.Fragment>
			{showError()}
			{showLoading()}
			{showMessage()}
			{showForm && signupForm()}
			<br />
			<Link href="/auth/password/forgot">
				<a>Forgot password?</a>
			</Link>
		</React.Fragment>
	);
}

export default SignupComponent;
