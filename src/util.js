export function createToggle(thingsToToggle, cb = el => { }) {
	return e => {
		e.target.classList.toggle("active");
		cb(e.target);
		thingsToToggle()
			.forEach(panel => panel.classList.toggle("active"));
	};
}

