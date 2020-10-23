import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic'; // because we're gonna use a rich text editor and we only want it to work with the client not the server
import { withRouter } from 'next/router'; // so we have access to router props (so that we can maybe grap router parameters)
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { createBlog } from '../../actions/blog';

import { QuillModules, QuillFormats } from '../../helpers/quill';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';

function CreateBlog({ router }) {
	// Grab the blog from the local storage
	const getBlogFromLS = () => {
		if (typeof window === 'undefined') {
			return false;
		}

		if (localStorage.getItem('blog')) {
			return JSON.parse(localStorage.getItem('blog'));
		} else {
			return false;
		}
	};

	const [ categories, setCategories ] = useState([]);
	const [ tags, setTags ] = useState([]);

	const [ checkedCategories, setCheckedCategories ] = useState([]); //categories
	const [ checkedTags, setCheckedTags ] = useState([]); //tags

	const [ body, setBody ] = useState(getBlogFromLS());
	const [ values, setValues ] = useState({
		error: '',
		sizeError: '',
		success: '',
		formData: '',
		title: '',
		hidePublishButton: false
	});

	const { error, sizeError, success, formData, title, hidePublishButton } = values;
	const token = getCookie('token');

	// anytime the route change we run this
	useEffect(
		() => {
			setValues({ ...values, formData: new FormData() });
			initCategories();
			initTags();
		},
		[ router ]
	);

	const initCategories = () => {
		getCategories().then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setCategories(data);
			}
		});
	};

	const initTags = () => {
		getTags().then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setTags(data);
			}
		});
	};

	const createBlogForm = () => {
		return (
			<form onSubmit={publishBlog}>
				<div className="form-group">
					<label className="text-muted">Title</label>
					<input className="form-control" value={title} type="text" onChange={handleChange('title')} />
				</div>
				<div className="form-group">
					<ReactQuill
						modules={QuillModules}
						formats={QuillFormats}
						value={body}
						placeholder="Write something amazing..."
						onChange={handleBody}
					/>
				</div>
				<div>
					<button className="btn btn-primary" value={body}>
						Publish
					</button>
				</div>
			</form>
		);
	};

	const publishBlog = (e) => {
		e.preventDefault();
		// console.log('Ready to publish this blog');
		createBlog(formData, token).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({ ...values, title: '', error: '', success: `A new blog is created: ${data.title}` });
				setBody('');
				setCategories([]);
				setTags([]);
			}
		});
	};

	const handleChange = (name) => (e) => {
		// console.log(e.target.value);
		const value = name === 'photo' ? e.target.files[0] : e.target.value;
		// because we will send form data we need the browser API called form data (also check on useEffect())
		formData.set(name, value);
		setValues({ ...values, [name]: value, formData: formData, error: '' });
	};

	const handleBody = (e) => {
		// console.log(e);
		setBody(e);
		formData.set('body', e);
		if (typeof window !== 'undefined') {
			localStorage.setItem('blog', JSON.stringify(e));
		}
	};

	// for categories - checking if checkbox is checked or not
	// we return a function of a function to avoid too many re-render.... I guess
	const handleToggleCategories = (categoryID) => () => {
		setValues({ ...values, error: '' });

		// return the first index or -1
		const clickedCategory = checkedCategories.indexOf(categoryID);
		const allCategories = [ ...checkedCategories ];

		// if it didn't find the index in the state - we can push it into
		if (clickedCategory === -1) {
			allCategories.push(categoryID);
		} else {
			allCategories.splice(clickedCategory, 1);
		}

		// console.log(allCategories);
		setCheckedCategories(allCategories);
		formData.set('categories', allCategories);
	};

	const handleToggleTags = (tagID) => () => {
		setValues({ ...values, error: '' });

		const clickedTag = checkedTags.indexOf(tagID);
		const allTags = [ ...checkedTags ];

		if (clickedTag === -1) {
			allTags.push(tagID);
		} else {
			allTags.splice(clickedTag, 1);
		}
		console.log(allTags);
		setCheckedTags(allTags);
		formData.set('tags', allTags);
	};

	const showCategories = () => {
		return (
			categories &&
			categories.map((category, index) => (
				<li className="list-unstyled" key={index}>
					<input className="mr-2" type="checkbox" onChange={handleToggleCategories(category._id)} />
					<label className="form-check-label">{category.name}</label>
				</li>
			))
		);
	};

	const showTags = () => {
		return (
			tags &&
			tags.map((tag, index) => (
				<li className="list-unstyled" key={index}>
					<input className="mr-2" type="checkbox" onChange={handleToggleTags(tag._id)} />
					<label className="form-check-label">{tag.name}</label>
				</li>
			))
		);
	};

	const showError = () => {
		return (
			<div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
				{error}
			</div>
		);
	};

	const showSuccess = () => {
		return (
			<div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
				{success}
			</div>
		);
	};

	return (
		<div className="container-fluid pb-5">
			<div className="row">
				<div className="col-md-8">
					{createBlogForm()}
					<div className="pt-3">
						{showError()}
						{showSuccess()}
					</div>
				</div>
				<div className="col-md-4">
					<div>
						<div className="form-group pb-2">
							<h5>Featured Image</h5>
							<hr />
							<small className="text-muted">Max size: 1MB</small> <br />
							<label className="btn btn-outline-info">
								Upload featured image
								<input type="file" accept="image/*" onChange={handleChange('photo')} hidden />
							</label>
						</div>
					</div>
					<div>
						<h5>Categories</h5>
						<ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showCategories()}</ul>

						<hr />
					</div>
					<div>
						<h5>Tags</h5>
						<ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showTags()}</ul>

						<hr />
					</div>
				</div>
			</div>
		</div>
	);
}

export default withRouter(CreateBlog);
