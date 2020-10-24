import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { listSingleBlog, listAllBlogs, listRelatedBlogs } from '../../actions/blog';
import SmallBlogCard from '../../components/blog/SmallBlogCard';
import moment from 'moment';
import renderHTML from 'react-render-html';

import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import '../../styles/singleblog.module.css';
import DisqusThread from '../../components/DisqusThread';

const SingleBlog = ({ blog, params }) => {
	const [ relatedBlogs, setRelatedBlogs ] = useState([]);

	const loadRelated = () => {
		listRelatedBlogs({ blog }).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setRelatedBlogs(data);
			}
		});
	};

	useEffect(() => {
		loadRelated();
	}, []);

	const head = () => (
		<Head>
			<title>
				{blog.title} | {APP_NAME}{' '}
			</title>
			<meta name="description" content={blog.mdesc} />
			<link rel="canonical" href={`${DOMAIN}/blogs/${params.slug}`} />

			<meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
			<meta property="og:description" content={blog.mdesc} />

			<meta property="og:type" content="website" />
			<meta property="og:url" content={`${DOMAIN}/blogs/${params.slug}`} />
			<meta property="og:site_name" content={`${APP_NAME}`} />

			<meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
			<meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`} />
			<meta property="og:image:type" content="image/jpg" />
			<meta property="og:fb:app_id" content={`${FB_APP_ID}`} />
		</Head>
	);

	const showBlogCategories = (blog) => {
		return blog.categories.map((category, index) => (
			<Link href={`/categories/${category.slug}`} key={index}>
				<a className="btn btn-outline-primary mr-1 ml-1 mt-3 mb-3">{category.name}</a>
			</Link>
		));
	};

	const showBlogTags = (blog) => {
		return blog.tags.map((tag, index) => (
			<Link href={`/tags/${tag.slug}`} key={index}>
				<a className="btn btn-outline-danger mr-1 ml-1 mt-3 mb-3">{tag.name}</a>
			</Link>
		));
	};

	const showRelatedBlogs = () => {
		return relatedBlogs.map((blog, index) => (
			<div className="col-md-4" key={index}>
				<article>
					<SmallBlogCard blog={blog} />
				</article>
			</div>
		));
	};

	// Disqus
	const showComments = () => {
		console.log(blog.title);
		return (
			<div>
				<DisqusThread id={blog._id} title={blog.title} path={`/blog/${blog.slug}`} />
			</div>
		);
	};

	return (
		<React.Fragment>
			{head()}
			<Layout>
				<main>
					<article>
						<div className="container-fluid">
							<section>
								<div className="row" style={{ marginTop: '-30px' }}>
									<img
										src={`${API}/blog/photo/${blog.slug}`}
										alt={blog.title}
										className="img img-fluid featured-image"
									/>
								</div>
							</section>

							<section>
								<div className="container">
									<h1 className="display-4 pb-3 pt-3 text-center font-weight-bold">{blog.title}</h1>
									<p className="lead mt-3 mark">
										Written by{' '}
										<Link href={`/profile/${blog.postedBy.username}`}>
											<a>{blog.postedBy.name}</a>
										</Link>{' '}
										| Published {moment(blog.updatedAt).fromNow()}
									</p>

									<div className="pb-3">
										{showBlogCategories(blog)}
										{showBlogTags(blog)}

										<br />
										<br />
									</div>
								</div>
							</section>
						</div>

						<div className="container">
							<section>
								<div className="col-md-12 lead">{renderHTML(blog.body)}</div>
							</section>
						</div>

						<div className="container pb-5">
							<h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
							<hr />
							<div className="row">{showRelatedBlogs()}</div>
						</div>

						<div className="container pb-5">{showComments()}</div>
					</article>
				</main>
			</Layout>
		</React.Fragment>
	);
};

// This function gets called at build time
// export async function getStaticPaths() {
// 	return listAllBlogs().then((data) => {
// 		if (data.error) {
// 			console.log(data.error);
// 		} else {
// 			const paths = data.map((blog) => ({
// 				params: { slug: blog.slug }
// 			}));

// 			return { paths, fallback: true };
// 		}
// 	});
// }

export async function getServerSideProps({ params }) {
	return listSingleBlog(params.slug).then((data) => {
		if (data.error) {
			console.log(data.error);
		} else {
			return {
				props: {
					blog: data,
					params: params
				}
			};
		}
	});
}

export default SingleBlog;
