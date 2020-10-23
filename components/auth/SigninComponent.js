import { useEffect, useState } from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';
import LoginGoogle from './LoginGoogle';

function SigninComponent() {
	const [ values, setValues ] = useState({
		email: '',
		password: '',
		error: '',
		loading: false,
		message: '',
		showForm: true
	});

	const { email, password, error, loading, message, showForm } = values;

	useEffect(() => {
		// if there is a logged in user redirect to home page
		isAuth() && Router.push('/');
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.table({  email, password, error, loading, message, showForm });
		setValues({ ...values, loading: true, error: false });
		const user = { email, password };
		// we pass it to signup auth action
		signin(user).then((data) => {
			if (data.error) {
				// in our api design, never return an error object, we can return a string
				setValues({ ...values, error: data.error, loading: false });
			} else {
				// save user token to cookie
				// save user info to localstorage
				// authenticate user
				authenticate(data, () => {
					// check user role and redirect accordingly
					if (isAuth() && isAuth().role === 1) {
						Router.push(`/admin`);
					} else {
						Router.push(`/user`);
					}
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

	const signinForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<div className="form-group">
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
					<button className="btn btn-primary">Signin</button>
				</div>
			</form>
		);
	};

	return (
		<React.Fragment>
			{showError()}
			{showLoading()}
			{showMessage()}
			<LoginGoogle />
			{showForm && signinForm()}
			<br />

			<Link href="/auth/password/forgot">
				<a>Forgot password?</a>
			</Link>
		</React.Fragment>
	);
}

export default SigninComponent;
