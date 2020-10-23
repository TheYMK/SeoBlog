import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { listAllBlogs, removeBlog, updateBlog } from '../../actions/blog';
import moment from 'moment';

const BlogRead = ({ username }) => {
	const [ blogs, setBlogs ] = useState([]);
	const [ message, setMessage ] = useState('');
	const token = getCookie('token');

	useEffect(() => {
		loadBlogs();
	}, []);

	const loadBlogs = () => {
		listAllBlogs(username).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setBlogs(data);
			}
		});
	};

	const deleteConfirm = (slug) => {
		let answer = window.confirm('Are you sure you want to delete this blog?');

		if (answer) {
			deleteBlog(slug);
		}
	};

	const deleteBlog = (slug) => {
		removeBlog(slug, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setMessage(data.message);
				loadBlogs();
			}
		});
	};

	const showUpdateButton = (blog) => {
		if (isAuth() && isAuth().role === 0) {
			return (
				<Link href={`/user/crud/${blog.slug}`}>
					<a className="ml-2 btn btn-warning ml-2">Update</a>
				</Link>
			);
		} else if (isAuth() && isAuth().role === 1) {
			return (
				<a href={`/admin/crud/${blog.slug}`} className="btn btn-sm btn-warning ml-2">
					Update
				</a>
			);
		}
	};

	const showAllBlogs = () => {
		return blogs.map((blog, index) => {
			return (
				<div key={index} className="pb-5">
					<h3>{blog.title}</h3>
					<p className="mark">
						Written by {blog.postedBy.name} | Published on {moment(blog.updatedAt).fromNow()}
					</p>
					<button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(blog.slug)}>
						Remove
					</button>
					{/* Because later on we will need to allow admin to update posts and other users to update their own post so we need a way to redirect them differently*/}
					{showUpdateButton(blog)}
				</div>
			);
		});
	};

	return (
		<React.Fragment>
			<div className="row">
				<div className="col-md-12">
					{message && <div className="alert alert-warning">{message}</div>}
					{showAllBlogs()}
				</div>
			</div>
		</React.Fragment>
	);
};

export default BlogRead;
