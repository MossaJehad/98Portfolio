(function () {
	const IMAGE_LOAD_TIMEOUT_MS = 4000;

	function svgToDataUri(svg) {
		const compact = svg.replace(/\s+/g, " ").trim();
		return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(compact)}`;
	}

	function createProjectFallback(title, subtitle, accent, graphic) {
		return svgToDataUri(`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180">
				<rect width="320" height="180" fill="#c0c0c0"/>
				<rect x="2" y="2" width="316" height="176" fill="none" stroke="#ffffff" stroke-width="2"/>
				<rect x="4" y="4" width="312" height="172" fill="none" stroke="#808080" stroke-width="2"/>
				<rect x="8" y="8" width="304" height="22" fill="${accent}"/>
				<text x="16" y="23" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold">${title}</text>
				<rect x="292" y="12" width="14" height="14" fill="#c0c0c0" stroke="#000000" stroke-width="1"/>
				<path d="M296 16 L302 22 M302 16 L296 22" stroke="#000000" stroke-width="1.5"/>
				<rect x="10" y="34" width="300" height="114" fill="#ffffff" stroke="#808080" stroke-width="1.5"/>
				${graphic}
				<rect x="10" y="152" width="300" height="18" fill="#dfdfdf" stroke="#808080" stroke-width="1"/>
				<text x="18" y="165" fill="#222222" font-family="sans-serif" font-size="11">${subtitle}</text>
			</svg>
		`);
	}

	const FALLBACK_ASSETS = {
		// Favicon / Logo
		logo: svgToDataUri(`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">
				<rect width="32" height="32" fill="#008080"/>
				<rect x="2" y="2" width="28" height="28" fill="#c0c0c0"/>
				<rect x="2" y="2" width="28" height="2" fill="#ffffff"/>
				<rect x="2" y="2" width="2" height="28" fill="#ffffff"/>
				<rect x="28" y="2" width="2" height="28" fill="#404040"/>
				<rect x="2" y="28" width="28" height="2" fill="#404040"/>
				<rect x="5" y="5" width="22" height="6" fill="#000080"/>
				<rect x="5" y="12" width="22" height="14" fill="#008080"/>
				<rect x="7" y="15" width="3" height="8" fill="#ffffff"/>
				<rect x="10" y="16" width="2" height="3" fill="#ffffff"/>
				<rect x="12" y="15" width="3" height="8" fill="#ffffff"/>
				<rect x="19" y="15" width="6" height="2" fill="#ffff00"/>
				<rect x="22" y="17" width="3" height="5" fill="#ffff00"/>
				<rect x="18" y="21" width="6" height="2" fill="#ffff00"/>
			</svg>
		`),

		// Desktop icons (classic 32x32 Win98 pixel-art aesthetic)
		"about-me": svgToDataUri(`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">
				<rect x="3" y="3" width="26" height="19" fill="#000000"/>
				<rect x="4" y="4" width="24" height="17" fill="#dfdfdf"/>
				<rect x="4" y="4" width="24" height="1" fill="#ffffff"/>
				<rect x="4" y="4" width="1" height="17" fill="#ffffff"/>
				<rect x="27" y="4" width="1" height="17" fill="#808080"/>
				<rect x="4" y="20" width="24" height="1" fill="#808080"/>
				<rect x="6" y="6" width="20" height="13" fill="#000000"/>
				<rect x="7" y="7" width="18" height="11" fill="#008080"/>
				<rect x="13" y="8" width="6" height="5" fill="#ffe0a0"/>
				<rect x="14" y="9" width="1" height="1" fill="#000000"/>
				<rect x="17" y="9" width="1" height="1" fill="#000000"/>
				<rect x="11" y="14" width="10" height="4" fill="#000080"/>
				<rect x="12" y="22" width="8" height="3" fill="#808080"/>
				<rect x="13" y="22" width="6" height="2" fill="#c0c0c0"/>
				<rect x="7" y="25" width="18" height="4" fill="#000000"/>
				<rect x="8" y="26" width="16" height="2" fill="#dfdfdf"/>
				<rect x="21" y="26" width="2" height="1" fill="#00c000"/>
			</svg>
		`),

		resume: svgToDataUri(`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">
				<rect x="6" y="3" width="15" height="26" fill="#000000"/>
				<rect x="6" y="8" width="20" height="21" fill="#000000"/>
				<polygon points="21,3 26,8 21,8" fill="#000000"/>
				<rect x="7" y="4" width="13" height="24" fill="#ffffff"/>
				<rect x="7" y="9" width="18" height="19" fill="#ffffff"/>
				<polygon points="20,4 25,9 20,9" fill="#c0c0c0"/>
				<rect x="20" y="9" width="5" height="1" fill="#808080"/>
				<rect x="9" y="7" width="9" height="3" fill="#000080"/>
				<rect x="9" y="12" width="14" height="2" fill="#808080"/>
				<rect x="9" y="16" width="14" height="2" fill="#808080"/>
				<rect x="9" y="20" width="10" height="2" fill="#808080"/>
				<rect x="9" y="24" width="12" height="2" fill="#008080"/>
			</svg>
		`),

		portfolio: svgToDataUri(`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">
				<rect x="3" y="6" width="11" height="4" fill="#000000"/>
				<rect x="4" y="7" width="9" height="3" fill="#ffd84d"/>
				<rect x="3" y="9" width="26" height="18" fill="#000000"/>
				<rect x="4" y="10" width="24" height="16" fill="#d9a500"/>
				<rect x="6" y="11" width="18" height="4" fill="#ffffff"/>
				<rect x="8" y="12" width="12" height="1" fill="#000080"/>
				<rect x="2" y="14" width="27" height="13" fill="#000000"/>
				<rect x="3" y="15" width="25" height="11" fill="#ffe666"/>
				<rect x="3" y="15" width="25" height="1" fill="#ffffcc"/>
				<rect x="3" y="25" width="25" height="1" fill="#b38600"/>
				<rect x="27" y="15" width="1" height="11" fill="#b38600"/>
			</svg>
		`),

		contact: svgToDataUri(`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">
				<rect x="2" y="6" width="28" height="20" fill="#000000"/>
				<rect x="3" y="7" width="26" height="18" fill="#ffffff"/>
				<rect x="3" y="23" width="26" height="2" fill="#c0c0c0"/>
				<polygon points="3,7 16,17 29,7 29,9 16,19 3,9" fill="#808080"/>
				<polygon points="3,24 12,15 13,16 4,25" fill="#c0c0c0"/>
				<polygon points="29,24 20,15 19,16 28,25" fill="#c0c0c0"/>
				<rect x="22" y="9" width="5" height="5" fill="#ff3333"/>
				<rect x="23" y="10" width="3" height="3" fill="#ffff66"/>
				<rect x="5" y="19" width="7" height="2" fill="#000080"/>
				<rect x="5" y="22" width="10" height="1" fill="#808080"/>
			</svg>
		`),

		minesweeper: svgToDataUri(`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">
				<rect x="2" y="2" width="28" height="28" fill="#c0c0c0"/>
				<rect x="2" y="2" width="28" height="2" fill="#ffffff"/>
				<rect x="2" y="2" width="2" height="28" fill="#ffffff"/>
				<rect x="28" y="2" width="2" height="28" fill="#808080"/>
				<rect x="2" y="28" width="28" height="2" fill="#808080"/>
				<rect x="15" y="5" width="2" height="22" fill="#000000"/>
				<rect x="5" y="15" width="22" height="2" fill="#000000"/>
				<rect x="8" y="8" width="2" height="2" fill="#000000"/>
				<rect x="22" y="8" width="2" height="2" fill="#000000"/>
				<rect x="8" y="22" width="2" height="2" fill="#000000"/>
				<rect x="22" y="22" width="2" height="2" fill="#000000"/>
				<rect x="10" y="9" width="12" height="14" fill="#000000"/>
				<rect x="9" y="10" width="14" height="12" fill="#000000"/>
				<rect x="12" y="11" width="3" height="3" fill="#ffffff"/>
				<rect x="19" y="6" width="2" height="7" fill="#ff0000"/>
				<polygon points="21,6 27,8.5 21,11" fill="#ff0000"/>
			</svg>
		`),

		// Taskbar icons
		start: svgToDataUri(`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">
				<rect x="2" y="10" width="2" height="2" fill="#000000"/>
				<rect x="5" y="8" width="2" height="2" fill="#ff0000"/>
				<rect x="2" y="16" width="2" height="2" fill="#0080ff"/>
				<rect x="5" y="14" width="2" height="2" fill="#000000"/>
				<rect x="2" y="22" width="2" height="2" fill="#ffd800"/>
				<rect x="9" y="5" width="10" height="10" fill="#000000"/>
				<rect x="10" y="6" width="8" height="8" fill="#ff2a00"/>
				<rect x="20" y="7" width="10" height="10" fill="#000000"/>
				<rect x="21" y="8" width="8" height="8" fill="#00b800"/>
				<rect x="8" y="16" width="10" height="10" fill="#000000"/>
				<rect x="9" y="17" width="8" height="8" fill="#0080ff"/>
				<rect x="19" y="18" width="10" height="10" fill="#000000"/>
				<rect x="20" y="19" width="8" height="8" fill="#ffd800"/>
			</svg>
		`),

		rays: svgToDataUri(`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">
				<rect x="4" y="11" width="6" height="10" fill="#000000"/>
				<rect x="5" y="12" width="4" height="8" fill="#c0c0c0"/>
				<polygon points="10,11 18,5 18,27 10,21" fill="#000000"/>
				<polygon points="11,12 17,7 17,25 11,20" fill="#dfdfdf"/>
				<polygon points="11,16 17,16 17,25 11,20" fill="#808080"/>
				<rect x="21" y="12" width="2" height="8" fill="#000080"/>
				<rect x="25" y="9" width="2" height="14" fill="#000080"/>
				<rect x="23" y="10" width="2" height="2" fill="#000080"/>
				<rect x="23" y="20" width="2" height="2" fill="#000080"/>
			</svg>
		`),

		mute: svgToDataUri(`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">
				<rect x="4" y="11" width="6" height="10" fill="#000000"/>
				<rect x="5" y="12" width="4" height="8" fill="#c0c0c0"/>
				<polygon points="10,11 18,5 18,27 10,21" fill="#000000"/>
				<polygon points="11,12 17,7 17,25 11,20" fill="#dfdfdf"/>
				<polygon points="11,16 17,16 17,25 11,20" fill="#808080"/>
				<path d="M21 11 L29 21 M29 11 L21 21" stroke="#ff0000" stroke-width="3" stroke-linecap="square"/>
			</svg>
		`),

		// Contact & Social icons (crisp 24x24 vectors for 16x16 display)
		mail: svgToDataUri(`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<rect x="2" y="4" width="20" height="16" rx="1" fill="#ffffff" stroke="#000000" stroke-width="2"/>
				<path d="M3 6 L12 13 L21 6" fill="none" stroke="#000080" stroke-width="2" stroke-linejoin="round"/>
			</svg>
		`),

		"phone-call": svgToDataUri(`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1l-2.22 2.2z" fill="#008000" stroke="#000000" stroke-width="1.4" stroke-linejoin="round"/>
			</svg>
		`),

		location: svgToDataUri(`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#e53935" stroke="#000000" stroke-width="1.5"/>
				<circle cx="12" cy="9" r="2.7" fill="#ffffff" stroke="#000000" stroke-width="1"/>
			</svg>
		`),

		github: svgToDataUri(`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path fill="#111111" d="M12 1.5A10.5 10.5 0 0 0 8.68 21.96c.52.1.72-.22.72-.5v-1.78c-2.94.64-3.56-1.4-3.56-1.4-.48-1.22-1.18-1.54-1.18-1.54-.96-.66.08-.64.08-.64 1.06.08 1.62 1.08 1.62 1.08.94 1.62 2.48 1.15 3.08.88.1-.68.36-1.15.66-1.42-2.34-.26-4.8-1.17-4.8-5.22 0-1.15.41-2.1 1.09-2.84-.11-.26-.47-1.34.1-2.8 0 0 .89-.28 2.9 1.09a10.1 10.1 0 0 1 5.28 0c2.01-1.37 2.9-1.09 2.9-1.09.57 1.46.21 2.54.1 2.8.68.74 1.09 1.69 1.09 2.84 0 4.06-2.47 4.95-4.82 5.21.38.33.72.97.72 1.96v2.9c0 .28.19.61.73.5A10.5 10.5 0 0 0 12 1.5z"/>
			</svg>
		`),

		linkedin: svgToDataUri(`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<rect x="2" y="2" width="20" height="20" rx="3" fill="#0a66c2"/>
				<rect x="6" y="10" width="2.8" height="8.5" fill="#ffffff"/>
				<circle cx="7.4" cy="7" r="1.6" fill="#ffffff"/>
				<path fill="#ffffff" d="M11.2 10h2.6v1.2h.04c.36-.7 1.26-1.42 2.6-1.42 2.78 0 3.3 1.83 3.3 4.2v4.52H17v-4c0-.96-.02-2.18-1.33-2.18-1.33 0-1.54 1.04-1.54 2.1v4.08h-2.93V10z"/>
			</svg>
		`),

		twitter: svgToDataUri(`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<rect x="2" y="2" width="20" height="20" rx="3" fill="#111111"/>
				<path fill="#ffffff" d="M17.3 6h2.2l-4.8 5.5 5.6 7.5h-4.4l-3.4-4.5-4 4.5H6.3l5.1-5.9L6 6h4.5l3.1 4.1L17.3 6zm-.8 11.7h1.2L9.9 7.2H8.6l7.9 10.5z"/>
			</svg>
		`),

		www: svgToDataUri(`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<circle cx="12" cy="12" r="9.5" fill="#e6f4ff" stroke="#000080" stroke-width="1.8"/>
				<ellipse cx="12" cy="12" rx="4.5" ry="9.5" fill="none" stroke="#000080" stroke-width="1.4"/>
				<line x1="2.5" y1="12" x2="21.5" y2="12" stroke="#000080" stroke-width="1.4"/>
				<path d="M4.5 7.5 Q12 9.5 19.5 7.5 M4.5 16.5 Q12 14.5 19.5 16.5" fill="none" stroke="#000080" stroke-width="1.2"/>
			</svg>
		`),

		// Portfolio project preview fallbacks
		SW1: createProjectFallback(
			"C++ Movie Information App",
			"C++ • Terminal & File I/O",
			"#000080",
			`<rect x="18" y="42" width="284" height="98" fill="#111111"/>
			 <text x="28" y="64" fill="#00ff66" font-family="monospace" font-size="12">&gt; ./movie_info --search</text>
			 <text x="28" y="84" fill="#ffffff" font-family="monospace" font-size="11">Title:  Interstellar (2014)</text>
			 <text x="28" y="102" fill="#cccccc" font-family="monospace" font-size="11">Rating: 8.7 / 10  |  Sci-Fi</text>
			 <text x="28" y="122" fill="#00ff66" font-family="monospace" font-size="11">[File I/O Loaded OK] _</text>`
		),

		SW2: createProjectFallback(
			"AABU Portal Enhancer",
			"Vanilla JavaScript • Browser Extension",
			"#006080",
			`<rect x="18" y="42" width="284" height="20" fill="#dfdfdf" stroke="#808080"/>
			 <rect x="26" y="46" width="180" height="12" fill="#ffffff" stroke="#808080"/>
			 <rect x="268" y="45" width="26" height="14" fill="#ffd84d" stroke="#000000"/>
			 <text x="274" y="55" fill="#000000" font-family="sans-serif" font-size="9" font-weight="bold">JS</text>
			 <rect x="18" y="68" width="136" height="72" fill="#eef6ff" stroke="#808080"/>
			 <rect x="164" y="68" width="138" height="72" fill="#f5f5f5" stroke="#808080"/>
			 <rect x="28" y="80" width="90" height="8" fill="#006080"/>
			 <rect x="28" y="96" width="110" height="6" fill="#808080"/>
			 <rect x="28" y="108" width="84" height="6" fill="#808080"/>
			 <rect x="174" y="80" width="112" height="12" fill="#008000"/>
			 <rect x="174" y="100" width="90" height="8" fill="#c0c0c0"/>`
		),

		SW3: createProjectFallback(
			"so_long — 42 Project",
			"C • MiniLibX 2D Tile Maze Game",
			"#006600",
			`<rect x="18" y="42" width="284" height="98" fill="#1b2a1b"/>
			 <g fill="#5a7d5a" stroke="#0f1a0f" stroke-width="1">
			   <rect x="26" y="50" width="22" height="22"/><rect x="48" y="50" width="22" height="22"/>
			   <rect x="70" y="50" width="22" height="22"/><rect x="92" y="50" width="22" height="22"/>
			   <rect x="158" y="50" width="22" height="22"/><rect x="268" y="50" width="22" height="22"/>
			   <rect x="26" y="72" width="22" height="22"/><rect x="114" y="72" width="22" height="22"/>
			   <rect x="202" y="72" width="22" height="22"/><rect x="268" y="72" width="22" height="22"/>
			   <rect x="26" y="94" width="22" height="22"/><rect x="268" y="94" width="22" height="22"/>
			   <rect x="26" y="116" width="264" height="18"/>
			 </g>
			 <circle cx="81" cy="83" r="8" fill="#00d4ff"/>
			 <circle cx="169" cy="83" r="6" fill="#ffd800"/>
			 <rect x="234" y="82" width="20" height="24" fill="#ff4444" stroke="#ffffff"/>`
		),

		SW4: createProjectFallback(
			"minitalk — 42 Project",
			"C • UNIX Signal Client-Server",
			"#4b0082",
			`<rect x="22" y="54" width="76" height="72" fill="#222222" stroke="#808080"/>
			 <text x="38" y="76" fill="#00ff66" font-family="monospace" font-size="11">CLIENT</text>
			 <text x="34" y="98" fill="#ffffff" font-family="monospace" font-size="10">01001000</text>
			 <rect x="222" y="54" width="76" height="72" fill="#222222" stroke="#808080"/>
			 <text x="238" y="76" fill="#00d4ff" font-family="monospace" font-size="11">SERVER</text>
			 <text x="236" y="98" fill="#ffffff" font-family="monospace" font-size="10">PID 4242</text>
			 <path d="M104 82 L120 70 L136 94 L152 70 L168 94 L184 70 L200 82 L216 82" fill="none" stroke="#ff6600" stroke-width="2.5"/>
			 <text x="122" y="118" fill="#4b0082" font-family="monospace" font-size="10" font-weight="bold">SIGUSR1 / SIGUSR2</text>`
		),

		Design1: createProjectFallback(
			"NestSeek — UI/UX Design",
			"Web App • Home Search & Filtering",
			"#008080",
			`<rect x="22" y="44" width="276" height="22" fill="#e8f5f5" stroke="#808080"/>
			 <rect x="30" y="49" width="120" height="12" fill="#ffffff" stroke="#808080"/>
			 <rect x="242" y="49" width="48" height="12" fill="#008080"/>
			 <rect x="22" y="74" width="86" height="64" fill="#f4f4f4" stroke="#808080"/>
			 <polygon points="65,84 44,100 86,100" fill="#008080"/>
			 <rect x="52" y="100" width="26" height="22" fill="#ffd84d"/>
			 <rect x="117" y="74" width="86" height="64" fill="#f4f4f4" stroke="#808080"/>
			 <rect x="126" y="84" width="68" height="26" fill="#88c9c9"/>
			 <rect x="126" y="116" width="50" height="6" fill="#555555"/>
			 <rect x="212" y="74" width="86" height="64" fill="#f4f4f4" stroke="#808080"/>
			 <rect x="221" y="84" width="68" height="26" fill="#88c9c9"/>
			 <rect x="221" y="116" width="50" height="6" fill="#555555"/>`
		),

		Design2: createProjectFallback(
			"Responsive Phone Shop",
			"E-Commerce • Mobile-First Storefront",
			"#800080",
			`<rect x="24" y="46" width="166" height="92" fill="#f7f2fa" stroke="#808080"/>
			 <rect x="34" y="56" width="146" height="24" fill="#800080"/>
			 <rect x="34" y="88" width="44" height="40" fill="#d9c2e9" stroke="#808080"/>
			 <rect x="85" y="88" width="44" height="40" fill="#d9c2e9" stroke="#808080"/>
			 <rect x="136" y="88" width="44" height="40" fill="#d9c2e9" stroke="#808080"/>
			 <rect x="222" y="44" width="62" height="96" rx="6" fill="#222222"/>
			 <rect x="227" y="52" width="52" height="76" fill="#ffffff"/>
			 <rect x="232" y="58" width="42" height="24" fill="#800080"/>
			 <rect x="232" y="88" width="42" height="14" fill="#d9c2e9"/>
			 <rect x="232" y="106" width="42" height="14" fill="#008080"/>`
		),

		Design3: createProjectFallback(
			"Financial Solutions Website",
			"Ledger Learn • Personal Finance UI",
			"#004d40",
			`<rect x="22" y="44" width="276" height="96" fill="#f2faf8" stroke="#808080"/>
			 <rect x="38" y="106" width="24" height="24" fill="#80cbc4"/>
			 <rect x="74" y="92" width="24" height="38" fill="#4db6ac"/>
			 <rect x="110" y="80" width="24" height="50" fill="#26a69a"/>
			 <rect x="146" y="64" width="24" height="66" fill="#00897b"/>
			 <polyline points="48,96 86,84 122,72 158,56" fill="none" stroke="#ff6f00" stroke-width="3"/>
			 <rect x="192" y="58" width="92" height="14" fill="#004d40"/>
			 <rect x="192" y="80" width="78" height="8" fill="#808080"/>
			 <rect x="192" y="96" width="64" height="8" fill="#808080"/>
			 <rect x="192" y="112" width="52" height="14" fill="#00897b"/>`
		),

		// Generic fallback for any unknown asset
		generic: svgToDataUri(`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">
				<rect x="3" y="3" width="26" height="26" fill="#c0c0c0" stroke="#000000" stroke-width="2"/>
				<rect x="6" y="6" width="20" height="5" fill="#000080"/>
				<rect x="8" y="14" width="16" height="10" fill="#ffffff" stroke="#808080"/>
			</svg>
		`),
	};

	// Cache statuses: "loaded" | "failed"
	const imageStatusCache = new Map();
	const pendingLoads = new Map();

	function getFallbackIcon(key) {
		return FALLBACK_ASSETS[key] || FALLBACK_ASSETS.generic;
	}

	function preloadRemoteUrl(url) {
		if (!url) return Promise.resolve(false);
		const cached = imageStatusCache.get(url);
		if (cached === "loaded") return Promise.resolve(true);
		if (cached === "failed") return Promise.resolve(false);
		if (pendingLoads.has(url)) return pendingLoads.get(url);

		const promise = new Promise((resolve) => {
			const probe = new Image();
			let settled = false;

			const finish = (ok) => {
				if (settled) return;
				settled = true;
				clearTimeout(timer);
				imageStatusCache.set(url, ok ? "loaded" : "failed");
				pendingLoads.delete(url);
				resolve(ok);
			};

			const timer = setTimeout(() => {
				probe.onload = null;
				probe.onerror = null;
				finish(false);
			}, IMAGE_LOAD_TIMEOUT_MS);

			probe.onload = () => finish(probe.naturalWidth > 0);
			probe.onerror = () => finish(false);
			probe.src = url;
		});

		pendingLoads.set(url, promise);
		return promise;
	}

	/**
	 * Immediately shows a zero-latency fallback icon/image and asynchronously upgrades
	 * to the remote URL if it loads cleanly within IMAGE_LOAD_TIMEOUT_MS.
	 */
	function applyImageWithFallback(imgEl, remoteUrl, fallbackKey) {
		if (!imgEl) return;
		const fallbackSrc = getFallbackIcon(fallbackKey);
		imgEl.dataset.fallback = fallbackKey || "generic";
		if (remoteUrl) {
			imgEl.dataset.src = remoteUrl;
		}
		imgEl.dataset.activeSrc = remoteUrl || "";

		// Guard against broken images even after an upgrade
		imgEl.onerror = function () {
			this.onerror = null;
			this.src = fallbackSrc;
		};

		if (!remoteUrl || imageStatusCache.get(remoteUrl) === "failed") {
			imgEl.src = fallbackSrc;
			return;
		}

		if (imageStatusCache.get(remoteUrl) === "loaded") {
			imgEl.src = remoteUrl;
			return;
		}

		// Render instant fallback immediately so user never waits on slow ImgBB requests
		imgEl.src = fallbackSrc;

		preloadRemoteUrl(remoteUrl).then((ok) => {
			// Verify element wasn't switched to another icon (e.g., sound mute/unmute toggle)
			if (ok && imgEl.dataset.activeSrc === remoteUrl) {
				imgEl.src = remoteUrl;
			}
		});
	}

	function hydrateFallbackImages(root) {
		const container = root || document;
		const imgs = container.querySelectorAll("img[data-fallback], img[data-src]");
		imgs.forEach((img) => {
			const remoteUrl = img.getAttribute("data-src") || "";
			const fallbackKey = img.getAttribute("data-fallback") || "generic";
			applyImageWithFallback(img, remoteUrl, fallbackKey);
		});
	}

	function initFaviconFallback() {
		const link = document.querySelector('link[rel="icon"]');
		if (!link) return;
		const remoteHref = link.getAttribute("data-src") || link.getAttribute("href");
		const fallbackHref = getFallbackIcon("logo");

		link.type = "image/svg+xml";
		link.href = fallbackHref;

		if (remoteHref && !remoteHref.startsWith("data:")) {
			preloadRemoteUrl(remoteHref).then((ok) => {
				if (ok) {
					link.type = "image/png";
					link.href = remoteHref;
				}
			});
		}
	}

	/**
	 * Synthesizes a pleasant retro Windows 98-style chime chord via Web Audio API
	 * whenever the external audio file fails to load.
	 */
	function playChimeFallback() {
		try {
			const AudioCtx = window.AudioContext || window.webkitAudioContext;
			if (!AudioCtx) return;
			const ctx = new AudioCtx();
			const now = ctx.currentTime;
			const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

			notes.forEach((freq, idx) => {
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				osc.type = idx % 2 === 0 ? "triangle" : "sine";
				osc.frequency.setValueAtTime(freq, now + idx * 0.055);

				gain.gain.setValueAtTime(0.0001, now + idx * 0.055);
				gain.gain.exponentialRampToValueAtTime(0.12, now + idx * 0.055 + 0.02);
				gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.055 + 0.55);

				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(now + idx * 0.055);
				osc.stop(now + idx * 0.055 + 0.6);
			});

			setTimeout(() => {
				if (ctx.state !== "closed") ctx.close().catch(() => {});
			}, 1000);
		} catch (_) {
			// Ignore if audio context is unavailable
		}
	}

	window.AssetFallbacks = {
		icons: FALLBACK_ASSETS,
		getFallbackIcon,
		applyImageWithFallback,
		hydrateFallbackImages,
		preloadRemoteUrl,
		initFaviconFallback,
		playChimeFallback,
	};

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => {
			initFaviconFallback();
			hydrateFallbackImages(document);
		});
	} else {
		initFaviconFallback();
		hydrateFallbackImages(document);
	}
})();
