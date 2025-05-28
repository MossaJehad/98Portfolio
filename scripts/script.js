function updateClock()
{
	const clock = document.getElementById('clock');
	const now = new Date();
	const hours = now.getHours().toString().padStart(2, '0');
	const minutes = now.getMinutes().toString().padStart(2, '0');
	if(hours > 12)
	{
		clock.textContent = `${hours - 12}:${minutes} PM`;
	}
	else
		clock.textContent = `${hours}:${minutes} AM`;
}

setInterval(updateClock, 1000);
updateClock();

let isMuted = false;
function changeImage()
{
	const imgElement = document.getElementById('sound');

	if (isMuted)
		imgElement.src = "/assets/rays.png";
	else
		imgElement.src = "/assets/mute.png";
	isMuted = !isMuted;
}

function playSound()
{
	if(!isMuted)
	{
		const audio = new Audio('/assets/chimes-win98.mp3');
		audio.play();
	}
}

function openWindow(str)
{
	const window = document.querySelector('#default-window');
	window.style.display = 'block';
	if(str == 'about-me')
		aboutMe();
	else if(str == 'resume')
		resume();
	else if(str == 'portfolio')
		portfolio();
	else if(str == 'contact')
		contact();
	else if(str == 'minesweeper')
		minesweeper();
}

function closeWindow()
{
	const window = document.querySelector('#default-window');
	window.style.display = 'none';
}

function aboutMe()
{
	const title = document.querySelector('.title-bar-text');
	const content = document.querySelector('.window-body');
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
	`;
}

function resume()
{
	const title = document.querySelector('.title-bar-text');
	const content = document.querySelector('.window-body');
	title.textContent = "Resume";
	content.style.color = "#000";
	content.innerHTML = `
		<div class="content" style="margin-top: 10px; width: 100%; height: 33rem; overflow: auto;">
		<div class="window" >
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
					<span class="progress-indicator-bar" style="width: 95%;" />
				</div>
			</div>
			<div class="skill-bar">
				<div class="skill-label">Linux & Git</div>
				<div class="progress-indicator segmented">
					<span class="progress-indicator-bar" style="width: 85%;" />
				</div>
			</div>
			<div class="skill-bar">
				<div class="skill-label">DevOps & Infrastructure</div>
				<div class="progress-indicator segmented">
					<span class="progress-indicator-bar" style="width: 70%;" />
				</div>
			</div>
			<div class="skill-bar">
				<div class="skill-label">Design</div>
				<div class="progress-indicator segmented">
					<span class="progress-indicator-bar" style="width: 65%;" />
				</div>
			</div>
		</div>
		</div>
	</div>
	`;
}

function portfolio()
{
	const title = document.querySelector('.title-bar-text');
	const content = document.querySelector('.window-body');
	title.textContent = "Portfolio";
	content.style.color = "#000";
	content.innerHTML = `
		<div class="content" style="margin-top: 10px; width: 100%; height: 33rem; overflow: auto;">
				<div class="title-bar">
					<div class="title-bar-text">My Projects</div>
				</div>
			<div class="window-body">
				<div style="margin-bottom: 12px;">
					<button onclick="showTab('software')" style="margin-right: 8px;">Software</button>
					<button onclick="showTab('design')">Design</button>
				</div>

				<div id="software" style="display: block;">
					<div class="gridCards">
						<div class="window" style="padding: 8px;">
							<div class="title-bar">
								<div class="title-bar-text">C++ Movie Information App</div>
							</div>
							<img src="../assets/SW1.png" alt="C++ Movie Information App" style="width: 100%; height: auto;" />
							<p>A terminal-based app that fetches and displays movie details using C++ and file I/O.</p>
							<a
							href="https://github.com/MossaJehad/Movie-information-Cpp"
							target="_blank"
							class="button"
							style="display: inline-block; margin-top: 8px;">
								View Project
							</a>
						</div>

						<div class="window" style="padding: 8px;">
							<div class="title-bar">
								<div class="title-bar-text">AABU Extension – JS Vanilla</div>
							</div>
							<img src="../assets/SW2.png" alt="AABU Extension – JS Vanilla" style="width: 100%; height: auto;" />
							<p>Browser extension built with vanilla JavaScript to enhance AABU’s online platform.</p>
							<a
							href="https://github.com/MossaJehad/AABU-Portal-Enhancer-Extension"
							target="_blank"
							class="button"
							style="display: inline-block; margin-top: 8px;">
								View Project
							</a>
						</div>

						<div class="window" style="padding: 8px;">
							<div class="title-bar">
								<div class="title-bar-text">so_long – 42 Project</div>
							</div>
							<img src="../assets/SW3.png" alt="so_long – 42 Project" style="width: 100%; height: auto;" />
							<p>2D maze game built with C and MiniLibX, featuring tile-based rendering and player movement.</p>
							<a
							href="https://github.com/MossaJehad/so_long"
							target="_blank"
							class="button"
							style="display: inline-block; margin-top: 8px;">
								View Project
							</a>
						</div>

						<div class="window" style="padding: 8px;">
							<div class="title-bar">
								<div class="title-bar-text">minitalk – 42 Project</div>
							</div>
							<img src="../assets/SW4.png" alt="minitalk – 42 Project" style="width: 100%; height: auto;" />
							<p>Client-server communication app using UNIX signals to send messages in C.</p>
							<a
							href="https://github.com/MossaJehad/minitalk"
							target="_blank"
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
							<img src="../assets/Design1.jpeg" alt="NestSeek" style="width: 100%; height: auto;" />
							<p>User-friendly web app for browsing and filtering homes with ease.</p>
							<a
							href="https://www.behance.net/gallery/186774993/NestSeek"
							target="_blank"
							class="button"
							style="display: inline-block; margin-top: 8px;">
								View Project
							</a>
						</div>

						<div class="window" style="padding: 8px;">
							<div class="title-bar">
								<div class="title-bar-text">Responsive Phone Shop</div>
							</div>
							<img src="../assets/Design2.jpeg" alt="Responsive Phone Shop" style="width: 100%; height: auto;" />
							<p>Fully responsive online phone store with modern UI and mobile-first design.</p>
							<a
							href="https://www.behance.net/gallery/187716993/Responsive-Phone-Shop"
							target="_blank"
							class="button"
							style="display: inline-block; margin-top: 8px;">
								View Project
							</a>
						</div>

						<div class="window" style="padding: 8px;">
							<div class="title-bar">
								<div class="title-bar-text">Financial Solutions Website</div>
							</div>
							<img src="../assets/Design3.png" alt="Financial Solutions Website" style="width: 100%; height: auto;" />
							<p>Educational platform focused on financial literacy and personal money management tools.</p>
							<a
							href="https://www.behance.net/gallery/209978789/Ledger-Learn-Financial-Solutions-Website"
							target="_blank" 
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
}

function contact()
{
	const title = document.querySelector('.title-bar-text');
	const content = document.querySelector('.window-body');
	title.textContent = "Contact";
	content.style.color = "#000";
	content.innerHTML = `
			<div style="padding: 16px; overflow: auto; height: 100%;">
				<div class="window" style="margin-bottom: 24px;">
					<div class="title-bar">
						<div class="title-bar-text">Contact Information</div>
					</div>
					<div class="window-body">
						<div style="display: grid; grid-template-columns: 1fr; gap: 8px; margin-bottom: 16px;">
							<div style="display: flex; align-items: center; gap: 8px;">
								<img src="/assets/mail.png" alt="Email Icon" style="width: 16px; height: 16px;" />
								<a href="mailto:Moosa.Jehad65@gmail.com" style="font-size: 14px;">Moosa.Jehad65@gmail.com</a>
								||
								<a href="mailto:Mossah.dev@gmail.com" style="font-size: 14px;">Mossah.dev@gmail.com</a>
							</div>
							<div style="display: flex; align-items: center; gap: 8px;">
								<img src="/assets/phone-call.png" alt="Phone Icon" style="width: 16px; height: 16px;" />
								<a href="tel:+962799825092" style="font-size: 14px;">+962 799-825-092</a>
							</div>
							<div style="display: flex; align-items: center; gap: 8px;">
								<img src="/assets/location.png" alt="Location Icon" style="width: 16px; height: 16px;" />
								<a style="font-size: 14px;" href="https://maps.app.goo.gl/a4kGZ5CZ3PxHxAs96" target="_blank">Amman, Jordan</a>
							</div>
						</div>
					</div>
				</div>

				<div class="window">
					<div class="title-bar">
						<div class="title-bar-text">Send Message</div>
					</div>
					<div class="window-body">
					<div class="field-row-stacked" style="margin-bottom: 12px;">
						<label for="name">Name</label>
						<input id="name" type="text" />
					</div>
					<div class="field-row-stacked" style="margin-bottom: 12px;">
						<label for="email">Email</label>
						<input id="email" type="text" />
					</div>
					<div class="field-row-stacked" style="margin-bottom: 12px;">
						<label for="message">Message</label>
						<textarea id="message" rows="4" style="width: 100%; resize: none;"></textarea>
					</div>
					<div class="field-row">
						<button>Send Message</button>
					</div>
					</div>
				</div>

				<!-- Social Links -->
				<div class="window" style="margin-top: 24px;">
					<div class="title-bar">
					<div class="title-bar-text">Social Links</div>
					</div>
					<div class="window-body">
					<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
						<button style="width: 100%; display: flex; flex-direction: row; justify-content: center; align-items:center;">
							<a href="https://github.com/MossaJehad/" target="_blank">GitHub</a> &nbsp;&nbsp;
							<img src="/assets/github.svg" alt="GitHub Icon" style="width: 16px; height: 16px;" />
						</button>
						<button style="width: 100%; display: flex; flex-direction: row; justify-content: center; align-items:center;">
							<a href="https://www.linkedin.com/in/mossa-jehad/" target="_blank">LinkedIn</a> &nbsp;&nbsp;
							<img src="/assets/linkedin.png" alt="LinkedIn Icon" style="width: 16px; height: 16px;" />
						</button>
						<button style="width: 100%; display: flex; flex-direction: row; justify-content: center; align-items:center;">
							<a href="https://x.com/mossa_jehad" target="_blank">Twitter</a> &nbsp;&nbsp;
							<img src="/assets/twitter.png" alt="Twitter Icon" style="width: 16px; height: 16px;" />
						</button>
						<button style="width: 100%; display: flex; flex-direction: row; justify-content: center; align-items:center;">
							<a href="https://leetcode.com/u/Mossa_Jehad" target="_blank">LeetCode</a> &nbsp;&nbsp;
							<img src="/assets/www.png" alt="LeetCode Icon" style="width: 16px; height: 16px;" />
						</button>
					</div>
					</div>
				</div>
		</div>
	`;
}

function minesweeper() {
	const title = document.querySelector('.title-bar-text');
	const content = document.querySelector('.window-body');
	title.textContent = "Minesweeper";
	content.style.color = "#000";
	content.innerHTML = `
		<div style="display: flex; flex-direction: column; align-items: center; margin-top: 10px;">
			<div id="board" style="display: grid; grid-template-columns: repeat(8, 1fr); gap: 2px;"></div>
			<p id="status" style="margin-top: 10px; font-weight: bold;"></p>
		</div>
	`;

	const size = 8;
	const mineCount = 10;
	let gameOver = false;
	const board = document.getElementById("board");
	const status = document.getElementById("status");
	let i = 0;

	const cells = [];
	const mines = new Set();

	while (mines.size < mineCount)
		mines.add(Math.floor(Math.random() * size * size));

	while (i < size * size)
	{
		const cell = document.createElement("button");
		cell.dataset.index = i;
		cell.dataset.revealed = "false";
		cell.style.height = "60px";
		cell.style.fontSize = "14px";
		cell.style.lineHeight = "30px";
		cell.style.textAlign = "center";
		cell.style.padding = "0";
		cell.style.margin = "0";
		cell.style.border = "1px solid #888";
		cell.style.backgroundColor = "#ddd";
		cell.style.cursor = "pointer";
		cell.style.userSelect = "none";
		board.appendChild(cell);
		cells.push(cell);

		cell.addEventListener("click", () =>
			{
				if (gameOver || cell.dataset.revealed === "true") return;

				const idx = parseInt(cell.dataset.index);
				cell.dataset.revealed = "true";
				cell.style.backgroundColor = "#bbb";

				if (mines.has(idx))
				{
					cell.textContent = "💣";
					status.textContent = "Game Over!";
					revealAll();
					gameOver = true;
				}
				else
				{
					const count = countAdjacentMines(idx);
					if (count > 0)
						cell.textContent = count;
					else
						revealEmpty(idx);
					checkWin();
				}
			});
		i++;
	}

	function getNeighbors(index)
	{
		const x = index % size
		const y = Math.floor(index / size)
		let dx = -1
		const neighbors = []

		while (dx <= 1)
		{
			let dy = -1
			while (dy <= 1)
			{
				if (dx === 0 && dy === 0)
				{
					dy++
					continue
				}
				const nx = x + dx
				const ny = y + dy
				if (nx >= 0 && nx < size && ny >= 0 && ny < size)
					neighbors.push(ny * size + nx)
				dy++
			}
			dx++
		}
		return neighbors
	}


	function countAdjacentMines(index)
	{
		return getNeighbors(index).filter(i => mines.has(i)).length;
	}

	function revealEmpty(index)
	{
		const queue = [index];
		while (queue.length > 0)
		{
			const i = queue.pop();
			const cell = cells[i];
			if (cell.dataset.revealed === "true") continue;

			cell.dataset.revealed = "true";
			cell.style.backgroundColor = "#bbb";
			const count = countAdjacentMines(i);
			if (count > 0)
				cell.textContent = count;	
			else
				getNeighbors(i).forEach(n => {
						if (cells[n].dataset.revealed === "false" && countAdjacentMines(n) === 0)
							queue.push(n);
				});
		}
	}

	function revealAll()
	{
		let i = 0;
		while (i < cells.length)
		{
			if (mines.has(i))
				cells[i].textContent = "💣";
			cells[i].style.backgroundColor = "#eee";
			i++;
		}
	}

	function checkWin()
	{
		const unrevealed = cells.filter(c => c.dataset.revealed === "false");
		if (unrevealed.length === mineCount)
		{
			status.textContent = "You Win!";
			gameOver = true;
			revealAll();
		}
	}
}

			

function showTab(tabName)
{
	document.getElementById("software").style.display = (tabName === "software") ? "block" : "none";
	document.getElementById("design").style.display = (tabName === "design") ? "block" : "none";
}
