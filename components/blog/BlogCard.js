import styles from '../../styles/blogcard.module.css';
import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

function BlogCard({ blog }) {
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

	return (
		<div className="profile-card-4 text-center">
			<img src={`${API}/blog/photo/${blog.slug}`} className="img img-responsive" alt={blog.title} />
			<div className="profile-content">
				<div className="profile-name">
					<Link href={`/blogs/${blog.slug}`}>
						<a style={{ color: 'black', textDecoration: 'none' }}>{blog.title}</a>
					</Link>
					<p style={{ color: 'black' }}>
						{' '}
						By{' '}
						<Link href={`/profile/${blog.postedBy.username}`}>
							<a>@{blog.postedBy.username}</a>
						</Link>
					</p>
				</div>

				<div className="profile-description">
					{renderHTML(blog.excerpt)}
					<br />
					<span style={{ color: 'black' }}>Published {moment(blog.updatedAt).fromNow()}</span>
				</div>
				<div>
					{showBlogCategories(blog)}
					{showBlogTags(blog)}
					<br />
				</div>
				<div>
					<Link href={`/blogs/${blog.slug}`}>
						<a className="btn btn-primary pt-2">Read more</a>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default BlogCard;
