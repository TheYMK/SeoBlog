import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import '../styles/homepage.module.css';

export default function Home() {
	return (
		<Layout>
			<article className="overflow-hidden">
				<div className="container">
					<div className="row">
						<div className="col-md-12 text-center">
							<h1 className="display-4 font-weight-bold">
								PROGRAMMING & WEB DEVELOPMENT BLOGS/TUTORIALS
							</h1>
						</div>
					</div>
				</div>

				<div className="container">
					<div className="row">
						<div className="col-md-12 text-center pt-4 pb-5">
							<p className="lead">
								Best programming and web development blogs and tutorials on React Node NextJs and
								JavaScript
							</p>
						</div>
					</div>
				</div>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-4">
							<div className="flip flip-horizontal">
								<div
									className="front"
									style={{
										backgroundImage:
											'url(' +
											'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
											')'
									}}
								>
									<h2 className="text-shadow text-center h1">Front End</h2>
								</div>
								<div className="back text-center">
									<Link href="/categories/frontend">
										<a>
											<h3 className="h1">Front End</h3>
										</a>
									</Link>
									<p className="lead">
										Discover what our users are saying about front end technologies
									</p>
								</div>
							</div>
						</div>

						<div className="col-md-4">
							<div className="flip flip-horizontal">
								<div
									className="front"
									style={{
										backgroundImage:
											'url(' +
											'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
											')'
									}}
								>
									<h2 className="text-shadow text-center h1">Back End</h2>
								</div>
								<div className="back text-center">
									<Link href="/categories/backend">
										<a>
											<h3 className="h1">Back End</h3>
										</a>
									</Link>
									<p className="lead">
										Discover what our users are saying about back end technologies
									</p>
								</div>
							</div>
						</div>

						<div className="col-md-4">
							<div className="flip flip-horizontal">
								<div
									className="front"
									style={{
										backgroundImage:
											'url(' +
											'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
											')'
									}}
								>
									<h2 className="text-shadow text-center h1">Full Stack</h2>
								</div>
								<div className="back text-center">
									<Link href="/categories/fullstack">
										<a>
											<h3 className="h1">Full Stack</h3>
										</a>
									</Link>
									<p className="lead">
										Discover what our users are saying about full stack technologies
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</article>
		</Layout>
	);
}
