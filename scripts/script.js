function updateClock() {
	const clock = document.getElementById("clock");
	if (!clock) return;
	const now = new Date();
	const rawHours = now.getHours();
	const minutes = now.getMinutes().toString().padStart(2, "0");
	const period = rawHours >= 12 ? "PM" : "AM";
	const displayHours = (rawHours % 12 || 12).toString().padStart(2, "0");
	clock.textContent = `${displayHours}:${minutes} ${period}`;
}

setInterval(updateClock, 1000);
updateClock();

const SOUND_URLS = {
	rays: "https://i.ibb.co/WvVHbcB1/rays.png",
	mute: "https://i.ibb.co/Kx8g4Gx2/mute.png",
};

let isMuted = false;
let chimeRemoteFailed = false;

// Preload both speaker icon states in the background so mute toggles are instant
if (window.AssetFallbacks) {
	window.AssetFallbacks.preloadRemoteUrl(SOUND_URLS.rays);
	window.AssetFallbacks.preloadRemoteUrl(SOUND_URLS.mute);
}

function fallbackIcon(key) {
	return window.AssetFallbacks ? window.AssetFallbacks.getFallbackIcon(key) : "";
}

function hydrateImages(root) {
	if (window.AssetFallbacks) {
		window.AssetFallbacks.hydrateFallbackImages(root);
	}
}

function changeImage() {
	const imgElement = document.getElementById("sound");
	isMuted = !isMuted;

	const key = isMuted ? "mute" : "rays";
	const url = SOUND_URLS[key];

	if (imgElement) {
		imgElement.alt = isMuted ? "Sound muted" : "Sound on";
		imgElement.title = isMuted ? "Unmute sound" : "Mute sound";
		if (window.AssetFallbacks) {
			window.AssetFallbacks.applyImageWithFallback(imgElement, url, key);
		} else {
			imgElement.src = url;
		}
	}
}

function playSound() {
	if (isMuted) return;

	const playFallback = () => {
		if (window.AssetFallbacks) {
			window.AssetFallbacks.playChimeFallback();
		}
	};

	if (chimeRemoteFailed) {
		playFallback();
		return;
	}

	const audio = new Audio(
		"https://docs.google.com/uc?export=download&id=13NCiWmhfhGbaVgBilNby5wZnanm-0Wg5"
	);
	let handled = false;
	const triggerFallback = () => {
		if (handled) return;
		handled = true;
		chimeRemoteFailed = true;
		playFallback();
	};

	audio.addEventListener("error", triggerFallback, { once: true });
	const playPromise = audio.play();
	if (playPromise && typeof playPromise.catch === "function") {
		playPromise.catch(triggerFallback);
	}
}

// Active Minesweeper teardown hook
let activeMinesweeperCleanup = null;

function cleanupMinesweeper() {
	if (typeof activeMinesweeperCleanup === "function") {
		activeMinesweeperCleanup();
		activeMinesweeperCleanup = null;
	}
}

function openWindow(str) {
	cleanupMinesweeper();
	const win = document.querySelector("#default-window");
	const content = win.querySelector(".window-body");
	win.style.display = "flex";
	content.scrollTop = 0;

	if (str === "about-me") aboutMe();
	else if (str === "resume") resume();
	else if (str === "portfolio") portfolio();
	else if (str === "contact") contact();
	else if (str === "minesweeper") minesweeper();
}

function closeWindow() {
	cleanupMinesweeper();
	const win = document.querySelector("#default-window");
	win.classList.remove("is-maximized");
	win.style.display = "none";
}

function minimizeWindow() {
	cleanupMinesweeper();
	const win = document.querySelector("#default-window");
	win.style.display = "none";
}

function maximizeWindow() {
	const win = document.querySelector("#default-window");
	win.classList.toggle("is-maximized");
}

function startDrag() {
	// Window stays anchored inside the desktop grid layout
}

function aboutMe() {
	const title = document.querySelector("#default-window > .title-bar .title-bar-text");
	const content = document.querySelector("#default-window > .window-body");
	title.textContent = "About Me";
	content.style.color = "#000";
	content.innerHTML = `
		<h4 style="font-size:18px">Mossa Jehad</h4>
		<p>Software developer & Designer</p>
		<div class="window" style="margin-top: 10px; width: 100%; height: 150px; overflow: auto;">
			<div class="title-bar">
				<div class="title-bar-text">Summary</div>
			</div>
			<div class="window-body">
				<p>I'm a Creative Software Developer based in Amman, Jordan, with a strong focus on building functional, user-friendly software products. While I have experience in UI/UX design and print media, my primary focus is crafting reliable, well-structured software that solves real-world problems.
				<br><br>
				My goal is to develop software that not only works seamlessly but also delivers a smooth and visually engaging user experience.</p>
			</div>
		</div>
		<h3 style="font-size:16px; margin-top:20px">What I'm doing</h3>
		<div class="gridCards" style="margin-top: 10px; width: 100%; height: 250px; overflow: auto;">
			<div class="window">
				<div class="title-bar">
					<div class="title-bar-text">Design</div>
				</div>
				<div class="window-body">
					<p class="text-sm">
					Keeping pace with the latest design trends.
					<br />↪ Adobe XD, Illustrator, Photoshop and Figma.
					</p>
				</div>
			</div>

			<div class="window">
				<div class="title-bar">
					<div class="title-bar-text">Software Development</div>
				</div>
				<div class="window-body">
					<p class="text-sm">
					I use the best methods to create websites with high performance and attractive design.
					<br />↪ ReactJS, NextJS, NodeJS, MySQL, MongoDB and C.
					</p>
				</div>
			</div>

			<div class="window">
				<div class="title-bar">
					<div class="title-bar-text">Linux & Git</div>
				</div>
				<div class="window-body">
					<p class="text-sm">
					Confident in Unix-based environments, version control, and automation workflows.
					<br />↪ Linux, Git and Bash.
					</p>
				</div>
			</div>

			<div class="window">
				<div class="title-bar">
					<div class="title-bar-text">DevOps & Infrastructure</div>
				</div>
				<div class="window-body">
					<p class="text-sm">
					Automating deployments and managing scalable systems with containerized environments.
					<br />↪ Docker, CI/CD and Shell scripting.
					</p>
				</div>
			</div>
		</div>
	`;
}

function resume() {
	const title = document.querySelector("#default-window > .title-bar .title-bar-text");
	const content = document.querySelector("#default-window > .window-body");
	title.textContent = "Resume";
	content.style.color = "#000";
	content.innerHTML = `
		<div class="content" style="margin-top: 10px; width: 100%; height: 33rem; overflow: auto;">
		<div class="window">
		<div class="title-bar">
			<div class="title-bar-text">Education</div>
		</div>
		<div class="window-body">
			<div class="mb-4">
				<h4>42 Amman - École 42 Network</h4>
				<p class="text-muted">2024 — 2025</p>
				<p>
					Currently enrolled in the core curriculum at 42 Amman, where I'm developing advanced skills in C and C++ programming,
					system networking, and parallel processing. Projects include implementing algorithms, creating a simple game,
					building a client-server architecture, and working on a mini shell. This hands-on approach is strengthening
					my understanding of low-level programming and real-world problem solving in Unix-based environments.
				</p>
			</div>
			<br/>
			<div>
				<h4>Al Albayt University</h4>
				<p class="text-muted">2019 — 2024</p>
				<p>
					Graduated with a degree in Computer Science from Al al-Bayt University in Mafraq with a "Very Good" grade.
					I was honored on the college's distinction board for two non-consecutive semesters. During my studies,
					I gained strong foundations in programming and worked extensively with languages such as Java and PHP.
				</p>
			</div>
		</div>
		</div>

		<div class="window">
		<div class="title-bar">
			<div class="title-bar-text">Courses and Certification</div>
		</div>
		<div class="window-body">
			<div class="mb-4">
			<h4>Become a Software Developer</h4>
			<p class="text-muted">2024 • LinkedIn Learning</p>
			<p>
				This learning path provides a broad perspective on core technologies for web development, software
				development, and databases. It introduces common tools and the bigger picture of how development
				careers work.
			</p>
			</div>
			<br/>
			<div class="mb-4">
			<h4>The Web Developer Bootcamp</h4>
			<p class="text-muted">2023 • Udemy</p>
			<p>
				Completed the comprehensive Web Developer Bootcamp, taught by a professional bootcamp instructor and
				developer, Colt Steele, encompassing essential web development technologies such as HTML5, CSS3,
				JavaScript, ReactJS, NodeJS, MongoDB, through projects including YelpCamp, while also exploring
				topics like authentication, security practices, and deployment.
			</p>
			</div>
			<br/>
			<div>
			<h4>Full Stack Development Track</h4>
			<p class="text-muted">2021 • Udacity - 1 million arab coders initiative</p>
			<p>
				The One Million Arab Coders initiative works to develop the digital skills, ensuring the readiness
				for the future. The initiative achieves this through a digital platform that provides online
				programming courses and is available to all Arab youth around the world.
			</p>
			</div>
		</div>
		</div>

		<div class="window">
		<div class="title-bar">
			<div class="title-bar-text">My Skills</div>
		</div>
		<div class="window-body">
			<div class="skill-bar">
				<div class="skill-label">Software Development</div>
				<div class="progress-indicator segmented">
					<span class="progress-indicator-bar" style="width: 95%;"></span>
				</div>
			</div>
			<div class="skill-bar">
				<div class="skill-label">Linux & Git</div>
				<div class="progress-indicator segmented">
					<span class="progress-indicator-bar" style="width: 85%;"></span>
				</div>
			</div>
			<div class="skill-bar">
				<div class="skill-label">DevOps & Infrastructure</div>
				<div class="progress-indicator segmented">
					<span class="progress-indicator-bar" style="width: 70%;"></span>
				</div>
			</div>
			<div class="skill-bar">
				<div class="skill-label">Design</div>
				<div class="progress-indicator segmented">
					<span class="progress-indicator-bar" style="width: 65%;"></span>
				</div>
			</div>
		</div>
		</div>
	</div>
	`;
}

function portfolio() {
	const title = document.querySelector("#default-window > .title-bar .title-bar-text");
	const content = document.querySelector("#default-window > .window-body");
	title.textContent = "Portfolio";
	content.style.color = "#000";
	content.innerHTML = `
		<div class="content" style="margin-top: 10px; width: 100%; height: 33rem; overflow: auto;">
				<div class="title-bar">
					<div class="title-bar-text">My Projects</div>
				</div>
			<div class="window-body">
				<div style="margin-bottom: 12px;">
					<button id="tab-software" onclick="showTab('software')" style="margin-right: 8px; font-weight: bold;">Software</button>
					<button id="tab-design" onclick="showTab('design')">Design</button>
				</div>

				<div id="software" style="display: block;">
					<div class="gridCards">
						<div class="window" style="padding: 8px;">
							<div class="title-bar">
								<div class="title-bar-text">C++ Movie Information App</div>
							</div>
							<img src="${fallbackIcon("SW1")}" data-src="https://i.ibb.co/0pjjvF7L/SW1.png" data-fallback="SW1" alt="C++ Movie Information App" style="width: 100%; height: auto; display: block;" />
							<p>A terminal-based app that fetches and displays movie details using C++ and file I/O.</p>
							<a
							href="https://github.com/MossaJehad/Movie-information-Cpp"
							target="_blank"
							rel="noopener noreferrer"
							class="button"
							style="display: inline-block; margin-top: 8px;">
								View Project
							</a>
						</div>

						<div class="window" style="padding: 8px;">
							<div class="title-bar">
								<div class="title-bar-text">AABU Extension – JS Vanilla</div>
							</div>
							<img src="${fallbackIcon("SW2")}" data-src="https://i.ibb.co/NnmNLmvy/SW2.png" data-fallback="SW2" alt="AABU Extension – JS Vanilla" style="width: 100%; height: auto; display: block;" />
							<p>Browser extension built with vanilla JavaScript to enhance AABU’s online platform.</p>
							<a
							href="https://github.com/MossaJehad/AABU-Portal-Enhancer-Extension"
							target="_blank"
							rel="noopener noreferrer"
							class="button"
							style="display: inline-block; margin-top: 8px;">
								View Project
							</a>
						</div>

						<div class="window" style="padding: 8px;">
							<div class="title-bar">
								<div class="title-bar-text">so_long – 42 Project</div>
							</div>
							<img src="${fallbackIcon("SW3")}" data-src="https://i.ibb.co/X145kRp/SW3.png" data-fallback="SW3" alt="so_long – 42 Project" style="width: 100%; height: auto; display: block;" />
							<p>2D maze game built with C and MiniLibX, featuring tile-based rendering and player movement.</p>
							<a
							href="https://github.com/MossaJehad/so_long"
							target="_blank"
							rel="noopener noreferrer"
							class="button"
							style="display: inline-block; margin-top: 8px;">
								View Project
							</a>
						</div>

						<div class="window" style="padding: 8px;">
							<div class="title-bar">
								<div class="title-bar-text">minitalk – 42 Project</div>
							</div>
							<img src="${fallbackIcon("SW4")}" data-src="https://i.ibb.co/yBQSVLWT/SW4.png" data-fallback="SW4" alt="minitalk – 42 Project" style="width: 100%; height: auto; display: block;" />
							<p>Client-server communication app using UNIX signals to send messages in C.</p>
							<a
							href="https://github.com/MossaJehad/minitalk"
							target="_blank"
							rel="noopener noreferrer"
							class="button"
							style="display: inline-block; margin-top: 8px;">
								View Project
							</a>
						</div>
					</div>
				</div>

				<div id="design" style="display: none;">
					<div class="gridCards">
						<div class="window" style="padding: 8px;">
							<div class="title-bar">
								<div class="title-bar-text">NestSeek</div>
							</div>
							<img src="${fallbackIcon("Design1")}" data-src="https://i.ibb.co/C5BPqK5g/Design1.jpg" data-fallback="Design1" alt="NestSeek" style="width: 100%; height: auto; display: block;" />
							<p>User-friendly web app for browsing and filtering homes with ease.</p>
							<a
							href="https://www.behance.net/gallery/186774993/NestSeek"
							target="_blank"
							rel="noopener noreferrer"
							class="button"
							style="display: inline-block; margin-top: 8px;">
								View Project
							</a>
						</div>

						<div class="window" style="padding: 8px;">
							<div class="title-bar">
								<div class="title-bar-text">Responsive Phone Shop</div>
							</div>
							<img src="${fallbackIcon("Design2")}" data-src="https://i.ibb.co/zTTQKgf5/Design2.jpg" data-fallback="Design2" alt="Responsive Phone Shop" style="width: 100%; height: auto; display: block;" />
							<p>Fully responsive online phone store with modern UI and mobile-first design.</p>
							<a
							href="https://www.behance.net/gallery/187716993/Responsive-Phone-Shop"
							target="_blank"
							rel="noopener noreferrer"
							class="button"
							style="display: inline-block; margin-top: 8px;">
								View Project
							</a>
						</div>

						<div class="window" style="padding: 8px;">
							<div class="title-bar">
								<div class="title-bar-text">Financial Solutions Website</div>
							</div>
							<img src="${fallbackIcon("Design3")}" data-src="https://i.ibb.co/XMsXSyv/Design3.png" data-fallback="Design3" alt="Financial Solutions Website" style="width: 100%; height: auto; display: block;" />
							<p>Educational platform focused on financial literacy and personal money management tools.</p>
							<a
							href="https://www.behance.net/gallery/209978789/Ledger-Learn-Financial-Solutions-Website"
							target="_blank"
							rel="noopener noreferrer"
							class="button"
							style="display: inline-block; margin-top: 8px;">
								View Project
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;

	hydrateImages(content);
}

const CONTACT_RECIPIENT_EMAIL = "Moosa.Jehad65@gmail.com";

function buildContactMailtoUrl({ name, email, subject, message }) {
	const resolvedSubject = subject || (name ? `Message from ${name}` : "Message from 98Portfolio");
	const bodyLines = [];
	if (name) bodyLines.push(`Name: ${name}`);
	if (email) bodyLines.push(`Email: ${email}`);
	if (bodyLines.length > 0) bodyLines.push("");
	bodyLines.push(message);

	return (
		`mailto:${CONTACT_RECIPIENT_EMAIL}` +
		`?subject=${encodeURIComponent(resolvedSubject)}` +
		`&body=${encodeURIComponent(bodyLines.join("\r\n"))}`
	);
}

function handleContactSubmit(event) {
	event.preventDefault();

	const nameInput = document.getElementById("name");
	const emailInput = document.getElementById("email");
	const subjectInput = document.getElementById("subject");
	const messageInput = document.getElementById("message");
	const feedback = document.getElementById("contact-feedback");

	const name = nameInput.value.trim();
	const email = emailInput.value.trim();
	const subject = subjectInput ? subjectInput.value.trim() : "";
	const message = messageInput.value.trim();

	const setError = (text, target) => {
		feedback.className = "contact-feedback is-error";
		feedback.textContent = text;
		if (target) target.focus();
	};

	if (!name) {
		setError("Please enter your name.", nameInput);
		return;
	}
	if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		setError("Please enter a valid email address.", emailInput);
		return;
	}
	if (!message) {
		setError("Please write a message before sending.", messageInput);
		return;
	}

	const mailtoUrl = buildContactMailtoUrl({ name, email, subject, message });

	// Launch user's email client directly inside the submit interaction
	const launcher = document.createElement("a");
	launcher.href = mailtoUrl;
	launcher.style.display = "none";
	document.body.appendChild(launcher);
	launcher.click();
	document.body.removeChild(launcher);

	// Provide a direct fallback link in case no desktop mail client opened automatically
	feedback.className = "contact-feedback is-success";
	feedback.textContent = "";
	feedback.appendChild(document.createTextNode("Opening your email client... "));
	const retryLink = document.createElement("a");
	retryLink.href = mailtoUrl;
	retryLink.textContent = "Click here if it didn't open";
	feedback.appendChild(retryLink);
}

function contact() {
	const title = document.querySelector("#default-window > .title-bar .title-bar-text");
	const content = document.querySelector("#default-window > .window-body");
	title.textContent = "Contact";
	content.style.color = "#000";
	content.innerHTML = `
			<div style="padding: 16px;">
				<div class="window" style="margin-bottom: 24px;">
					<div class="title-bar">
						<div class="title-bar-text">Contact Information</div>
					</div>
					<div class="window-body">
						<div style="display: grid; grid-template-columns: 1fr; gap: 8px; margin-bottom: 8px;">
							<div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
								<img src="${fallbackIcon("mail")}" data-src="https://i.ibb.co/FL5gV44k/mail.png" data-fallback="mail" alt="Email Icon" width="16" height="16" style="width: 16px; height: 16px;" />
								<a href="mailto:Moosa.Jehad65@gmail.com" style="font-size: 14px;">Moosa.Jehad65@gmail.com</a>
								||
								<a href="mailto:Mossah.dev@gmail.com" style="font-size: 14px;">Mossah.dev@gmail.com</a>
							</div>
							<div style="display: flex; align-items: center; gap: 8px;">
								<img src="${fallbackIcon("phone-call")}" data-src="https://i.ibb.co/Yx2FM90/phone-call.png" data-fallback="phone-call" alt="Phone Icon" width="16" height="16" style="width: 16px; height: 16px;" />
								<a href="tel:+962799825092" style="font-size: 14px;">+962 799-825-092</a>
							</div>
							<div style="display: flex; align-items: center; gap: 8px;">
								<img src="${fallbackIcon("location")}" data-src="https://i.ibb.co/5xjB9fDF/location.png" data-fallback="location" alt="Location Icon" width="16" height="16" style="width: 16px; height: 16px;" />
								<a style="font-size: 14px;" href="https://maps.app.goo.gl/a4kGZ5CZ3PxHxAs96" target="_blank" rel="noopener noreferrer">Amman, Jordan</a>
							</div>
						</div>
					</div>
				</div>

				<div class="window">
					<div class="title-bar">
						<div class="title-bar-text">Send Message</div>
					</div>
					<div class="window-body">
						<form id="contact-form" novalidate>
							<div class="field-row-stacked" style="margin-bottom: 12px;">
								<label for="name">Name</label>
								<input id="name" name="name" type="text" placeholder="Your name" required />
							</div>
							<div class="field-row-stacked" style="margin-bottom: 12px;">
								<label for="email">Email</label>
								<input id="email" name="email" type="email" placeholder="you@example.com" required />
							</div>
							<div class="field-row-stacked" style="margin-bottom: 12px;">
								<label for="subject">Subject (optional)</label>
								<input id="subject" name="subject" type="text" placeholder="Project inquiry, hello, etc." />
							</div>
							<div class="field-row-stacked" style="margin-bottom: 12px;">
								<label for="message">Message</label>
								<textarea id="message" name="message" rows="4" placeholder="Write your message..." style="width: 100%; resize: vertical;" required></textarea>
							</div>
							<div class="field-row">
								<button type="submit">Send Message</button>
							</div>
							<div id="contact-feedback" class="contact-feedback" aria-live="polite"></div>
						</form>
					</div>
				</div>

				<!-- Social Links -->
				<div class="window" style="margin-top: 24px;">
					<div class="title-bar">
						<div class="title-bar-text">Social Links</div>
					</div>
					<div class="window-body">
						<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
							<button type="button" class="social-link-btn">
								<a href="https://github.com/MossaJehad/" target="_blank" rel="noopener noreferrer">
									<span>GitHub</span>
									<img src="${fallbackIcon("github")}" data-src="https://i.ibb.co/21CN2xzQ/github.png" data-fallback="github" alt="GitHub Icon" width="16" height="16" style="width: 16px; height: 16px;" />
								</a>
							</button>
							<button type="button" class="social-link-btn">
								<a href="https://www.linkedin.com/in/mossa-jehad/" target="_blank" rel="noopener noreferrer">
									<span>LinkedIn</span>
									<img src="${fallbackIcon("linkedin")}" data-src="https://i.ibb.co/zVLSzV4j/linkedin.png" data-fallback="linkedin" alt="LinkedIn Icon" width="16" height="16" style="width: 16px; height: 16px;" />
								</a>
							</button>
							<button type="button" class="social-link-btn">
								<a href="https://x.com/mossa_jehad" target="_blank" rel="noopener noreferrer">
									<span>Twitter</span>
									<img src="${fallbackIcon("twitter")}" data-src="https://i.ibb.co/9H8zq6GK/twitter.png" data-fallback="twitter" alt="Twitter Icon" width="16" height="16" style="width: 16px; height: 16px;" />
								</a>
							</button>
							<button type="button" class="social-link-btn">
								<a href="https://leetcode.com/u/Mossa_Jehad" target="_blank" rel="noopener noreferrer">
									<span>LeetCode</span>
									<img src="${fallbackIcon("www")}" data-src="https://i.ibb.co/WvLkRVdc/www.png" data-fallback="www" alt="LeetCode Icon" width="16" height="16" style="width: 16px; height: 16px;" />
								</a>
							</button>
						</div>
					</div>
				</div>
		</div>
	`;

	const form = document.getElementById("contact-form");
	if (form) {
		form.addEventListener("submit", handleContactSubmit);
		form.addEventListener("input", () => {
			const feedback = document.getElementById("contact-feedback");
			if (feedback && feedback.classList.contains("is-error")) {
				feedback.textContent = "";
				feedback.className = "contact-feedback";
			}
		});
	}

	hydrateImages(content);
}

// =========================================================================
// Authentic Windows 98 Minesweeper
// =========================================================================

const MS_DIFFICULTIES = {
	beginner: { label: "Beginner", cols: 9, rows: 9, mines: 10, cellSize: 28 },
	intermediate: { label: "Intermediate", cols: 16, rows: 16, mines: 40, cellSize: 24 },
	expert: { label: "Expert", cols: 30, rows: 16, mines: 99, cellSize: 22 },
};

function msSvgUri(svg) {
	return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.replace(/\s+/g, " ").trim())}`;
}

const MS_ART = {
	mine: msSvgUri(`
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">
			<rect x="7" y="1" width="2" height="14" fill="#000"/>
			<rect x="1" y="7" width="14" height="2" fill="#000"/>
			<rect x="3" y="3" width="2" height="2" fill="#000"/>
			<rect x="11" y="3" width="2" height="2" fill="#000"/>
			<rect x="3" y="11" width="2" height="2" fill="#000"/>
			<rect x="11" y="11" width="2" height="2" fill="#000"/>
			<rect x="4" y="4" width="8" height="8" fill="#000"/>
			<rect x="5" y="3" width="6" height="10" fill="#000"/>
			<rect x="3" y="5" width="10" height="6" fill="#000"/>
			<rect x="5" y="5" width="2" height="2" fill="#fff"/>
		</svg>
	`),
	flag: msSvgUri(`
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">
			<rect x="8" y="2" width="1.5" height="10" fill="#000"/>
			<polygon points="9,2 3,5 9,8" fill="#ff0000"/>
			<rect x="5" y="11" width="7" height="2" fill="#000"/>
			<rect x="3" y="13" width="11" height="2" fill="#000"/>
		</svg>
	`),
	mineWrong: msSvgUri(`
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">
			<rect x="7" y="1" width="2" height="14" fill="#000"/>
			<rect x="1" y="7" width="14" height="2" fill="#000"/>
			<rect x="4" y="4" width="8" height="8" fill="#000"/>
			<rect x="5" y="3" width="6" height="10" fill="#000"/>
			<rect x="3" y="5" width="10" height="6" fill="#000"/>
			<rect x="5" y="5" width="2" height="2" fill="#fff"/>
			<path d="M2 2 L14 14 M14 2 L2 14" stroke="#ff0000" stroke-width="2.2"/>
		</svg>
	`),
	faceNormal: msSvgUri(`
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<circle cx="12" cy="12" r="10" fill="#ffff00" stroke="#000" stroke-width="1.5"/>
			<circle cx="8.5" cy="9.5" r="1.5" fill="#000"/>
			<circle cx="15.5" cy="9.5" r="1.5" fill="#000"/>
			<path d="M7.5 14.5 Q12 18.5 16.5 14.5" fill="none" stroke="#000" stroke-width="1.6" stroke-linecap="round"/>
		</svg>
	`),
	faceOoh: msSvgUri(`
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<circle cx="12" cy="12" r="10" fill="#ffff00" stroke="#000" stroke-width="1.5"/>
			<circle cx="8.5" cy="9" r="1.6" fill="#000"/>
			<circle cx="15.5" cy="9" r="1.6" fill="#000"/>
			<circle cx="12" cy="15.5" r="2.6" fill="none" stroke="#000" stroke-width="1.6"/>
		</svg>
	`),
	faceWin: msSvgUri(`
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<circle cx="12" cy="12" r="10" fill="#ffff00" stroke="#000" stroke-width="1.5"/>
			<rect x="4" y="7.5" width="7" height="4.5" rx="1" fill="#000"/>
			<rect x="13" y="7.5" width="7" height="4.5" rx="1" fill="#000"/>
			<rect x="10.5" y="8.5" width="3" height="1.5" fill="#000"/>
			<rect x="5.5" y="8.5" width="2" height="1" fill="#fff"/>
			<rect x="14.5" y="8.5" width="2" height="1" fill="#fff"/>
			<path d="M7.5 14.8 Q12 18.8 16.5 14.8" fill="none" stroke="#000" stroke-width="1.6" stroke-linecap="round"/>
		</svg>
	`),
	faceDead: msSvgUri(`
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<circle cx="12" cy="12" r="10" fill="#ffff00" stroke="#000" stroke-width="1.5"/>
			<path d="M6.5 7.5 L10.5 11.5 M10.5 7.5 L6.5 11.5" stroke="#000" stroke-width="1.6"/>
			<path d="M13.5 7.5 L17.5 11.5 M17.5 7.5 L13.5 11.5" stroke="#000" stroke-width="1.6"/>
			<path d="M7.5 17 Q12 13.5 16.5 17" fill="none" stroke="#000" stroke-width="1.6" stroke-linecap="round"/>
		</svg>
	`),
};

let lastMinesweeperDifficulty = "beginner";

function formatLedNumber(val) {
	const clamped = Math.max(-99, Math.min(999, val));
	if (clamped < 0) {
		return `-${String(Math.abs(clamped)).padStart(2, "0")}`;
	}
	return String(clamped).padStart(3, "0");
}

function getBestTime(diffKey) {
	try {
		const raw = localStorage.getItem(`win98_ms_best_${diffKey}`);
		const parsed = raw ? parseInt(raw, 10) : NaN;
		return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
	} catch (_) {
		return null;
	}
}

function saveBestTime(diffKey, seconds) {
	try {
		const prev = getBestTime(diffKey);
		if (prev === null || seconds < prev) {
			localStorage.setItem(`win98_ms_best_${diffKey}`, String(seconds));
			return true;
		}
		return false;
	} catch (_) {
		return false;
	}
}

function minesweeper() {
	cleanupMinesweeper();

	const title = document.querySelector("#default-window > .title-bar .title-bar-text");
	const content = document.querySelector("#default-window > .window-body");
	title.textContent = "Minesweeper";
	content.style.color = "#000";

	content.innerHTML = `
		<div class="ms-wrapper">
			<div class="ms-toolbar">
				<button type="button" data-diff="beginner">Beginner (9×9)</button>
				<button type="button" data-diff="intermediate">Intermediate (16×16)</button>
				<button type="button" data-diff="expert">Expert (30×16)</button>
				<button type="button" id="ms-flag-mode" aria-pressed="false" title="Toggle click-to-flag mode">🚩 Flag Mode: Off</button>
				<label class="ms-marks-toggle" title="Cycle Right-Click through Flag and ?">
					<input type="checkbox" id="ms-marks-check" />
					<span>Marks (?)</span>
				</label>
			</div>

			<div class="ms-frame">
				<div class="ms-header">
					<div id="ms-mine-counter" class="ms-led" aria-label="Remaining mines">010</div>
					<button type="button" id="ms-face-btn" class="ms-face-btn" aria-label="New Game" title="New Game (F2)">
						<img id="ms-face-img" src="${MS_ART.faceNormal}" alt="New Game" />
					</button>
					<div id="ms-timer" class="ms-led" aria-label="Elapsed seconds">000</div>
				</div>
				<div class="ms-board-scroll">
					<div id="ms-board" role="grid" aria-label="Minesweeper board"></div>
				</div>
			</div>

			<div class="ms-footer">
				<p id="ms-status" class="ms-status" aria-live="polite"></p>
				<p class="ms-hint">Left-click to reveal • Right-click (or long-press) to flag • Click a satisfied number to chord • F2 to restart</p>
			</div>
		</div>
	`;

	const boardEl = document.getElementById("ms-board");
	const mineCounterEl = document.getElementById("ms-mine-counter");
	const timerEl = document.getElementById("ms-timer");
	const faceBtn = document.getElementById("ms-face-btn");
	const faceImg = document.getElementById("ms-face-img");
	const statusEl = document.getElementById("ms-status");
	const flagModeBtn = document.getElementById("ms-flag-mode");
	const marksCheck = document.getElementById("ms-marks-check");
	const diffButtons = Array.from(content.querySelectorAll("button[data-diff]"));

	let diffKey = lastMinesweeperDifficulty;
	let cols = 9;
	let rows = 9;
	let mineCount = 10;
	let cells = [];
	let minesPlaced = false;
	let gameOver = false;
	let flagCount = 0;
	let revealedSafeCount = 0;
	let elapsedSeconds = 0;
	let timerId = null;
	let flagMode = false;
	let allowQuestionMarks = false;
	let pressedIndices = [];
	let touchTimer = null;
	let suppressNextClick = false;

	function setFace(kind) {
		if (kind === "ooh") faceImg.src = MS_ART.faceOoh;
		else if (kind === "win") faceImg.src = MS_ART.faceWin;
		else if (kind === "dead") faceImg.src = MS_ART.faceDead;
		else faceImg.src = MS_ART.faceNormal;
	}

	function stopTimer() {
		if (timerId !== null) {
			clearInterval(timerId);
			timerId = null;
		}
	}

	function startTimer() {
		if (timerId !== null) return;
		timerId = setInterval(() => {
			if (elapsedSeconds < 999) {
				elapsedSeconds++;
				timerEl.textContent = formatLedNumber(elapsedSeconds);
			}
		}, 1000);
	}

	function updateMineCounter() {
		mineCounterEl.textContent = formatLedNumber(mineCount - flagCount);
	}

	function getNeighbors(index) {
		const r = Math.floor(index / cols);
		const c = index % cols;
		const neighbors = [];
		for (let dr = -1; dr <= 1; dr++) {
			for (let dc = -1; dc <= 1; dc++) {
				if (dr === 0 && dc === 0) continue;
				const nr = r + dr;
				const nc = c + dc;
				if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
					neighbors.push(nr * cols + nc);
				}
			}
		}
		return neighbors;
	}

	function clearPressedVisuals() {
		pressedIndices.forEach((idx) => {
			if (cells[idx]) cells[idx].el.classList.remove("is-pressed");
		});
		pressedIndices = [];
		if (!gameOver) setFace("normal");
	}

	function placeMines(safeIndex) {
		const total = rows * cols;
		const excluded = new Set([safeIndex, ...getNeighbors(safeIndex)]);
		if (total - excluded.size < mineCount) {
			excluded.clear();
			excluded.add(safeIndex);
		}

		const candidates = [];
		for (let i = 0; i < total; i++) {
			if (!excluded.has(i)) candidates.push(i);
		}

		// Fisher-Yates shuffle for fair, O(N) mine placement
		for (let i = candidates.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const tmp = candidates[i];
			candidates[i] = candidates[j];
			candidates[j] = tmp;
		}

		for (let i = 0; i < mineCount; i++) {
			cells[candidates[i]].isMine = true;
		}

		for (let i = 0; i < total; i++) {
			if (!cells[i].isMine) {
				cells[i].adjacent = getNeighbors(i).reduce(
					(acc, n) => acc + (cells[n].isMine ? 1 : 0),
					0
				);
			}
		}

		minesPlaced = true;
		startTimer();
	}

	function setCellGraphic(el, src, alt) {
		el.textContent = "";
		const img = document.createElement("img");
		img.src = src;
		img.alt = alt;
		el.appendChild(img);
	}

	function renderRevealedSafe(cell) {
		cell.isRevealed = true;
		cell.state = "hidden";
		cell.el.className = "ms-cell is-revealed";
		cell.el.textContent = "";

		if (cell.adjacent > 0) {
			cell.el.textContent = String(cell.adjacent);
			cell.el.classList.add(`ms-n${cell.adjacent}`, "is-chordable");
			cell.el.setAttribute("aria-label", `${cell.adjacent} adjacent mines`);
		} else {
			cell.el.setAttribute("aria-label", "Empty");
		}
	}

	function triggerLoss(detonatedIndices) {
		gameOver = true;
		stopTimer();
		clearPressedVisuals();
		setFace("dead");

		const detonatedSet = new Set(detonatedIndices);
		cells.forEach((cell) => {
			if (detonatedSet.has(cell.index)) {
				cell.isRevealed = true;
				cell.el.className = "ms-cell is-revealed is-detonated";
				setCellGraphic(cell.el, MS_ART.mine, "Detonated mine");
				cell.el.setAttribute("aria-label", "Detonated mine");
			} else if (cell.isMine && cell.state !== "flagged") {
				cell.isRevealed = true;
				cell.el.className = "ms-cell is-revealed";
				setCellGraphic(cell.el, MS_ART.mine, "Mine");
				cell.el.setAttribute("aria-label", "Mine");
			} else if (!cell.isMine && cell.state === "flagged") {
				cell.isRevealed = true;
				cell.el.className = "ms-cell is-revealed";
				setCellGraphic(cell.el, MS_ART.mineWrong, "Incorrect flag");
				cell.el.setAttribute("aria-label", "Incorrect flag");
			}
		});

		statusEl.className = "ms-status is-lose";
		statusEl.textContent = "Boom! Game Over — click the smiley or press F2 to retry.";
	}

	function checkWin() {
		if (gameOver) return;
		const totalSafe = rows * cols - mineCount;
		if (revealedSafeCount !== totalSafe) return;

		gameOver = true;
		stopTimer();
		clearPressedVisuals();
		setFace("win");

		// Auto-flag all remaining mines like classic Windows 98 Minesweeper
		cells.forEach((cell) => {
			if (cell.isMine && cell.state !== "flagged") {
				cell.state = "flagged";
				cell.el.className = "ms-cell";
				setCellGraphic(cell.el, MS_ART.flag, "Flag");
				cell.el.setAttribute("aria-label", "Flagged mine");
			}
		});
		flagCount = mineCount;
		updateMineCounter();

		const isNewBest = saveBestTime(diffKey, elapsedSeconds);
		const best = getBestTime(diffKey);
		statusEl.className = "ms-status is-win";
		if (isNewBest) {
			statusEl.textContent = `You Win! Cleared in ${elapsedSeconds}s — New Best Time!`;
		} else if (best !== null) {
			statusEl.textContent = `You Win! Cleared in ${elapsedSeconds}s • Best: ${best}s`;
		} else {
			statusEl.textContent = `You Win! Cleared in ${elapsedSeconds}s`;
		}
	}

	function revealFrom(startIndex) {
		if (gameOver) return;
		const startCell = cells[startIndex];
		if (!startCell || startCell.isRevealed || startCell.state === "flagged") return;

		if (!minesPlaced) {
			placeMines(startIndex);
		}

		if (startCell.isMine) {
			triggerLoss([startIndex]);
			return;
		}

		// Iterative BFS flood-fill: expands through 0-cells and reveals numbered boundaries
		const queue = [startIndex];
		const visited = new Set([startIndex]);
		let head = 0;

		while (head < queue.length) {
			const idx = queue[head++];
			const cell = cells[idx];
			if (cell.isRevealed || cell.state === "flagged" || cell.isMine) continue;

			renderRevealedSafe(cell);
			revealedSafeCount++;

			if (cell.adjacent === 0) {
				const neighbors = getNeighbors(idx);
				for (let k = 0; k < neighbors.length; k++) {
					const n = neighbors[k];
					const neighbor = cells[n];
					if (!visited.has(n) && !neighbor.isRevealed && neighbor.state !== "flagged") {
						visited.add(n);
						queue.push(n);
					}
				}
			}
		}

		checkWin();
	}

	function chordCell(index) {
		if (gameOver) return;
		const cell = cells[index];
		if (!cell || !cell.isRevealed || cell.adjacent <= 0) return;

		const neighbors = getNeighbors(index);
		let flaggedNeighbors = 0;
		const unrevealedUnflagged = [];

		for (let k = 0; k < neighbors.length; k++) {
			const nCell = cells[neighbors[k]];
			if (nCell.state === "flagged") {
				flaggedNeighbors++;
			} else if (!nCell.isRevealed) {
				unrevealedUnflagged.push(nCell.index);
			}
		}

		if (flaggedNeighbors !== cell.adjacent || unrevealedUnflagged.length === 0) return;

		const detonated = unrevealedUnflagged.filter((n) => cells[n].isMine);
		if (detonated.length > 0) {
			triggerLoss(detonated);
			return;
		}

		for (let k = 0; k < unrevealedUnflagged.length; k++) {
			revealFrom(unrevealedUnflagged[k]);
		}
	}

	function toggleFlag(index) {
		if (gameOver) return;
		const cell = cells[index];
		if (!cell || cell.isRevealed) return;

		if (cell.state === "hidden") {
			cell.state = "flagged";
			flagCount++;
			cell.el.className = "ms-cell";
			setCellGraphic(cell.el, MS_ART.flag, "Flag");
			cell.el.setAttribute("aria-label", "Flagged");
		} else if (cell.state === "flagged") {
			flagCount--;
			if (allowQuestionMarks) {
				cell.state = "question";
				cell.el.className = "ms-cell is-question";
				cell.el.textContent = "?";
				cell.el.setAttribute("aria-label", "Question mark");
			} else {
				cell.state = "hidden";
				cell.el.className = "ms-cell";
				cell.el.textContent = "";
				cell.el.setAttribute("aria-label", "Hidden cell");
			}
		} else if (cell.state === "question") {
			cell.state = "hidden";
			cell.el.className = "ms-cell";
			cell.el.textContent = "";
			cell.el.setAttribute("aria-label", "Hidden cell");
		}

		updateMineCounter();
	}

	function startNewGame(newDiffKey) {
		if (newDiffKey && MS_DIFFICULTIES[newDiffKey]) {
			diffKey = newDiffKey;
			lastMinesweeperDifficulty = diffKey;
		}

		const cfg = MS_DIFFICULTIES[diffKey];
		cols = cfg.cols;
		rows = cfg.rows;
		mineCount = cfg.mines;

		stopTimer();
		clearPressedVisuals();

		minesPlaced = false;
		gameOver = false;
		flagCount = 0;
		revealedSafeCount = 0;
		elapsedSeconds = 0;
		cells = [];

		diffButtons.forEach((btn) => {
			btn.classList.toggle("is-active", btn.dataset.diff === diffKey);
		});

		setFace("normal");
		updateMineCounter();
		timerEl.textContent = "000";

		const best = getBestTime(diffKey);
		statusEl.className = "ms-status";
		statusEl.textContent =
			best !== null
				? `${cfg.label} • Best time: ${best}s`
				: `${cfg.label} — ${mineCount} mines. First click is always safe!`;

		boardEl.style.setProperty("--ms-cell-size", `${cfg.cellSize}px`);
		boardEl.style.gridTemplateColumns = `repeat(${cols}, ${cfg.cellSize}px)`;
		boardEl.innerHTML = "";

		const fragment = document.createDocumentFragment();
		const total = rows * cols;
		for (let i = 0; i < total; i++) {
			const btn = document.createElement("button");
			btn.type = "button";
			btn.className = "ms-cell";
			btn.dataset.index = String(i);
			btn.setAttribute("aria-label", "Hidden cell");

			cells.push({
				index: i,
				isMine: false,
				isRevealed: false,
				state: "hidden",
				adjacent: 0,
				el: btn,
			});
			fragment.appendChild(btn);
		}
		boardEl.appendChild(fragment);
	}

	function getCellIndexFromEvent(e) {
		const cellEl = e.target.closest(".ms-cell");
		if (!cellEl || !boardEl.contains(cellEl)) return -1;
		return parseInt(cellEl.dataset.index, 10);
	}

	// Board event delegation (fast, zero per-cell listener overhead even on 480-cell Expert!)
	boardEl.addEventListener("contextmenu", (e) => {
		e.preventDefault();
		const idx = getCellIndexFromEvent(e);
		if (idx >= 0) toggleFlag(idx);
	});

	boardEl.addEventListener("mousedown", (e) => {
		if (gameOver) return;
		const idx = getCellIndexFromEvent(e);
		if (idx < 0) return;

		if (e.button === 1) {
			e.preventDefault(); // Prevent middle-click auto-scroll
		}

		const cell = cells[idx];
		clearPressedVisuals();

		if ((e.button === 0 && !flagMode) || e.button === 1) {
			if (!cell.isRevealed && cell.state !== "flagged" && e.button === 0) {
				cell.el.classList.add("is-pressed");
				pressedIndices = [idx];
				setFace("ooh");
			} else if (cell.isRevealed && cell.adjacent > 0) {
				// Visual chord preview on unrevealed, unflagged neighbors
				const preview = getNeighbors(idx).filter(
					(n) => !cells[n].isRevealed && cells[n].state !== "flagged"
				);
				if (preview.length > 0) {
					preview.forEach((n) => cells[n].el.classList.add("is-pressed"));
					pressedIndices = preview;
					setFace("ooh");
				}
			}
		}
	});

	boardEl.addEventListener("mouseup", (e) => {
		if (gameOver) return;
		const idx = getCellIndexFromEvent(e);
		clearPressedVisuals();
		if (idx < 0) return;

		if (e.button === 1) {
			e.preventDefault();
			chordCell(idx);
		}
	});

	boardEl.addEventListener("click", (e) => {
		if (suppressNextClick) {
			suppressNextClick = false;
			return;
		}
		if (gameOver) return;
		const idx = getCellIndexFromEvent(e);
		if (idx < 0) return;

		const cell = cells[idx];
		if (cell.isRevealed) {
			chordCell(idx);
		} else if (flagMode) {
			toggleFlag(idx);
		} else {
			revealFrom(idx);
		}
	});

	// Touch long-press support for mobile flagging
	boardEl.addEventListener(
		"touchstart",
		(e) => {
			if (gameOver) return;
			const idx = getCellIndexFromEvent(e);
			if (idx < 0) return;
			clearTimeout(touchTimer);
			touchTimer = setTimeout(() => {
				suppressNextClick = true;
				toggleFlag(idx);
			}, 420);
		},
		{ passive: true }
	);

	const cancelTouchTimer = () => {
		if (touchTimer !== null) {
			clearTimeout(touchTimer);
			touchTimer = null;
		}
	};
	boardEl.addEventListener("touchend", cancelTouchTimer, { passive: true });
	boardEl.addEventListener("touchmove", cancelTouchTimer, { passive: true });
	boardEl.addEventListener("touchcancel", cancelTouchTimer, { passive: true });

	// Toolbar & control listeners
	faceBtn.addEventListener("click", () => startNewGame(diffKey));

	diffButtons.forEach((btn) => {
		btn.addEventListener("click", () => startNewGame(btn.dataset.diff));
	});

	flagModeBtn.addEventListener("click", () => {
		flagMode = !flagMode;
		flagModeBtn.classList.toggle("is-active", flagMode);
		flagModeBtn.setAttribute("aria-pressed", String(flagMode));
		flagModeBtn.textContent = flagMode ? "🚩 Flag Mode: On" : "🚩 Flag Mode: Off";
	});

	marksCheck.addEventListener("change", () => {
		allowQuestionMarks = marksCheck.checked;
	});

	// Global cleanup handlers for mouse release outside the board and F2 restart shortcut
	const onDocMouseUp = () => clearPressedVisuals();
	const onDocKeyDown = (e) => {
		if (e.key === "F2") {
			e.preventDefault();
			startNewGame(diffKey);
		}
	};

	document.addEventListener("mouseup", onDocMouseUp);
	document.addEventListener("keydown", onDocKeyDown);

	activeMinesweeperCleanup = () => {
		stopTimer();
		cancelTouchTimer();
		document.removeEventListener("mouseup", onDocMouseUp);
		document.removeEventListener("keydown", onDocKeyDown);
	};

	startNewGame(diffKey);
}

function showTab(tabName) {
	const sw = document.getElementById("software");
	const des = document.getElementById("design");
	const swBtn = document.getElementById("tab-software");
	const desBtn = document.getElementById("tab-design");
	if (sw) sw.style.display = tabName === "software" ? "block" : "none";
	if (des) des.style.display = tabName === "design" ? "block" : "none";
	if (swBtn) swBtn.style.fontWeight = tabName === "software" ? "bold" : "normal";
	if (desBtn) desBtn.style.fontWeight = tabName === "design" ? "bold" : "normal";
}
