import Link from 'next/link';
import renderHTML from 'react-render-html';
import { useState, useEffect } from 'react';
import { listSearch } from '../../actions/blog';

function SearchBlog() {
	const [ values, setValues ] = useState({
		search: undefined,
		results: [],
		searched: false, //to check if something was searched so we can clear the existing result
		message: ''
	});

	const { search, results, searched, message } = values;

	const searchSubmit = (e) => {
		e.preventDefault();

		listSearch({ search }).then((data) => {
			// we shouldn't have any error here so no need to check
			setValues({ ...values, results: data, searched: true, message: `${data.length} blogs found` });
		});
	};

	const handleChange = (e) => {
		setValues({ ...values, search: e.target.value, searched: false, results: [] });
	};

	const searchedBlogs = (results = []) => {
		return (
			<div className="jumbotron bg-white">
				{message && <p className="pt-4 text-muted font-italic">{message}</p>}

				{results.map((blog, index) => (
					<div key={index}>
						<Link href={`/blogs/${blog.slug}`}>
							<a className="text-primary">{blog.title}</a>
						</Link>
					</div>
				))}
			</div>
		);
	};

	const searchForm = () => (
		<form onSubmit={searchSubmit}>
			<div className="row">
				<div className="col-md-8">
					<input type="search" className="form-control" placeholder="Search blogs" onChange={handleChange} />
				</div>
				<div className="col-md-4">
					<button className="btn btn-block btn-outline-primary" type="submit">
						Search
					</button>
				</div>
			</div>
		</form>
	);

	return (
		<React.Fragment>
			<div className="container-fluid">
				<div className="pt-3 pb-5">{searchForm()}</div>
				{searched && <div style={{ marginTop: '-120px', marginBottom: '-80px' }}>{searchedBlogs(results)}</div>}
			</div>
		</React.Fragment>
	);
}

export default SearchBlog;
