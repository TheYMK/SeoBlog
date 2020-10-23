import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getSingleTag } from '../../actions/tag';
import moment from 'moment';
import renderHTML from 'react-render-html';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import BlogCard from '../../components/blog/BlogCard';

function Tag({ tag, blogs, params }) {
	const head = () => (
		<Head>
			<title>
				{tag.name} | {APP_NAME}{' '}
			</title>
			<meta name="description" content={`All you need to know about ${tag.name}`} />
			<link rel="canonical" href={`${DOMAIN}/tags/${params.slug}`} />

			<meta property="og:title" content={`${tag.name} | ${APP_NAME}`} />
			<meta property="og:description" content={`All you need to know about ${tag.name}`} />

			<meta property="og:type" content="website" />
			<meta property="og:url" content={`${DOMAIN}/tags/${params.slug}`} />
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
							<h1 className="display-4 font-weight-bold">{tag.name}</h1>
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
	return getSingleTag(params.slug).then((data) => {
		if (data.error) {
			console.log(data.error);
		} else {
			return {
				props: {
					tag: data.tag,
					blogs: data.blogs,
					params
				}
			};
		}
	});
}

export default Tag;
