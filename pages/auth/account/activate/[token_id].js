import { useState, useEffect } from 'react';
import Layout from '../../../../components/Layout';
import { withRouter } from 'next/router';
import { signup } from '../../../../actions/auth';
import jwt from 'jsonwebtoken';

const ActivateAccount = ({ router }) => {
	const [ values, setValues ] = useState({
		name: '',
		token: '',
		error: '',
		loading: false,
		success: false,
		showButton: true
	});

	const { name, token, error, loading, success, showButton } = values;

	useEffect(
		() => {
			let token = router.query.token_id;
			if (token) {
				const { name } = jwt.decode(token);
				setValues({ ...values, name: name, token: token });
			}
		},
		[ router ]
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, loading: true, error: false });
		signup({ token }).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, loading: false, showButton: false });
			} else {
				setValues({ ...values, loading: false, success: true, showButton: false });
			}
		});
	};

	const showLoading = () => (loading ? <h2>Loading...</h2> : '');

	return (
		<Layout>
			<div className="container text-center">
				<h3 className="pb-4">Hey {name}, Ready to activate your account?</h3>
				{showLoading()}
				{error && error}
				{success && 'Your account has been successfully verified. Please sign in'}
				{showButton && (
					<button className="btn btn-outline-warning" onClick={handleSubmit}>
						Activate Account
					</button>
				)}
			</div>
		</Layout>
	);
};

export default withRouter(ActivateAccount);
