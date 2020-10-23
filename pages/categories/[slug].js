import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getSingleCategory } from '../../actions/category';
import moment from 'moment';
import renderHTML from 'react-render-html';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import BlogCard from '../../components/blog/BlogCard';

function Category({ category, blogs, params }) {
	const head = () => (
		<Head>
			<title>
				{category.name} | {APP_NAME}{' '}
			</title>
			<meta name="description" content={`All you need to know about ${category.name}`} />
			<link rel="canonical" href={`${DOMAIN}/categories/${params.slug}`} />

			<meta property="og:title" content={`${category.name} | ${APP_NAME}`} />
			<meta property="og:description" content={`All you need to know about ${category.name}`} />

			<meta property="og:type" content="website" />
			<meta property="og:url" content={`${DOMAIN}/categories/${params.slug}`} />
			<meta property="og:site_name" content={`${APP_NAME}`} />

			<meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
			<meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
			<meta property="og:image:type" content="image/jpg" />
			<meta property="og:fb:app_id" content={`${FB_APP_ID}`} />
		</Head>
	);

	return (
		<React.Fragment>
			<Layout>
				{head()}
				<main>
					<div className="container-fluid text-center">
						<header>
							<h1 className="display-4 font-weight-bold">{category.name}</h1>
						</header>
						<div className="row">
							{blogs.map((blog, index) => (
								<div className="col-md-4 pt-4">
									<BlogCard key={index} blog={blog} />
								</div>
							))}
						</div>
					</div>
				</main>
			</Layout>
		</React.Fragment>
	);
}

export async function getServerSideProps({ params }) {
	return getSingleCategory(params.slug).then((data) => {
		if (data.error) {
			console.log(data.error);
		} else {
			return {
				props: {
					category: data.category,
					blogs: data.blogs,
					params
				}
			};
		}
	});
}

export default Category;