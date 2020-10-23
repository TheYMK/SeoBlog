import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import BlogCard from '../../components/blog/BlogCard';
import { withRouter } from 'next/router';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';

function Blogs({ blogs, categories, tags, totalBlogs, blogsLimit, blogsSkip, router }) {
	const [ limit, setLimit ] = useState(blogsLimit);
	const [ skip, setSkip ] = useState(blogsSkip);
	const [ size, setSize ] = useState(totalBlogs);
	const [ loadedBlogs, setLoadedBlogs ] = useState([]);

	const head = () => (
		<Head>
			<title>Programming blogs | {APP_NAME} </title>
			<meta name="description" content="Programming blogs and tutorials on software development" />
			<link rel="canonical" href={`${DOMAIN}${router.pathname}`} />

			<meta property="og:title" content={`Latest software development tutorials | ${APP_NAME}`} />
			<meta property="og:description" content="Programming blogs and tutorials on software development" />

			<meta property="og:type" content="website" />
			<meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
			<meta property="og:site_name" content={`${APP_NAME}`} />

			<meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
			<meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
			<meta property="og:image:type" content="image/jpg" />
			<meta property="og:fb:app_id" content={`${FB_APP_ID}`} />
		</Head>
	);

	const showAllBlogs = () => {
		return blogs.map((blog, index) => {
			return (
				<div className="col-md-4" key={index}>
					<BlogCard blog={blog} />
				</div>
			);
		});
	};

	const showAllCategories = () => {
		return categories.map((category, index) => {
			return (
				<Link href={`categories/${category.slug}`} key={index}>
					<a className="btn btn-outline-primary mr-1 ml-1 mt-3 mb-3">{category.name}</a>
				</Link>
			);
		});
	};

	const showAllTags = () => {
		return tags.map((tag, index) => {
			return (
				<Link href={`tags/${tag.slug}`} key={index}>
					<a className="btn btn-outline-danger mr-1 ml-1 mt-3 mb-3">{tag.name}</a>
				</Link>
			);
		});
	};

	const loadMore = () => {
		let toSkip = skip + limit;
		listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setLoadedBlogs([ ...loadedBlogs, ...data.blogs ]);
				setSize(data.size);
				setSkip(toSkip);
			}
		});
	};

	const loadMoreButton = () => {
		return (
			size > 0 &&
			size >= limit && (
				<button onClick={loadMore} className="btn btn-outline-primary btn-lg">
					Load more
				</button>
			)
		);
	};

	const showLoadedBlogs = () => {
		return loadedBlogs.map((blog, index) => (
			<div className="col-md-4" key={index}>
				<BlogCard blog={blog} />
			</div>
		));
	};

	return (
		<React.Fragment>
			{head()}
			<Layout>
				<main>
					<div className="container-fluid">
						<header>
							<div className="col-md-12 pt-3">
								<h1 className="display-4 font-weight-bold text-center">
									Programming blogs and tutorials
								</h1>
							</div>
							<section className="text-center">
								{showAllCategories()}
								<br />
								{showAllTags()}
							</section>
						</header>
					</div>
					<div className="container-fluid">
						<div className="row">
							{showAllBlogs()} {showLoadedBlogs()}
						</div>
					</div>

					<div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
				</main>
			</Layout>
		</React.Fragment>
	);
}

// if there is a fetching issue I will know it's you stupid function. You'll get replaced by getInitialProps...just wait for it
export const getServerSideProps = async () => {
	let skip = 0;
	let limit = 3;
	return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
		if (data.error) {
			console.log(data.error);
		} else {
			return {
				props: {
					blogs: data.blogs,
					categories: data.categories,
					tags: data.tags,
					totalBlogs: data.size,
					blogsLimit: limit,
					blogsSkip: skip
				}
			};
		}
	});
};

export default withRouter(Blogs);
