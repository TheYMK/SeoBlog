import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

function SmallBlogCard({ blog }) {
	return (
		<div className="card mt-3">
			<section>
				<Link href={`/blogs/${blog.slug}`}>
					<a>
						<img
							className="img img-fluid"
							style={{ height: '250px', width: '100%', objectFit: 'cover' }}
							src={`${API}/blog/photo/${blog.slug}`}
							alt={blog.title}
						/>
					</a>
				</Link>
			</section>

			<div className="card-body">
				<section>
					<Link href={`/blogs/${blog.slug}`}>
						<a className="card-title text-center">
							<h5 style={{ color: 'black' }}>{blog.title}</h5>
						</a>
					</Link>
					{/* <p className="card-text">{renderHTML(blog.excerpt.substring(0, 50))}</p> */}
				</section>
			</div>

			<div className="mr-2 ml-2">
				Posted {moment(blog.updatedAt).fromNow()} by {' '}
				<Link href={`/profile/${blog.postedBy.username}`}>
					<a className="">@{blog.postedBy.username}</a>
				</Link>
				{/* <Link href={`/blogs/${blog.slug}`}>
					<a className="btn btn-primary pt-2 btn-block">Read more</a>
				</Link> */}
			</div>
		</div>
	);
}

export default SmallBlogCard;
