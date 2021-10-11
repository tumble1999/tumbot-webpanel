import React from 'react';

export function App() {


	return (
		<div id="dashboard" class="modules">
			<div id="server">
				<img src="assets/img/tumbot.svg" alt="tumblot_logo" />
				Tumbot
				<i>V</i>
			</div>
			<div id="nav">
				<a href="#">Modules</a>
				<a href="#">Users</a>
				<img src="assets/img/tumbot.svg" alt="tumblot_logo" />
			</div>
			<div id="modules">
				<a href="#">Module 1</a>
				<a href="#">Module 2</a>
				<a href="#">Module 3</a>
				<a href="#">Module 4</a>
				<a href="#">Module 5</a>
			</div>
			<div id="main">
				<div className="panel page-header">
					<h1>Page Title</h1>
					<a href="#" class="btn">JSON</a>
					<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium rerum adipisci necessitatibus accusamus repudiandae nostrum voluptates asperiores veritatis et quas, odit sunt dolores aliquid fugiat atque, optio perferendis totam illum?</p>
				</div>

				<div className="panel">
					hmm
				</div>
			</div>
		</div>
	);
}
