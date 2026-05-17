'use strict';

const SECTOR_SPECIAL_NAMES = {
	doom: {
		0: 'Normal',
		1: 'Blink random',
		2: 'Blink 0.5s',
		3: 'Blink 1.0s',
		4: '20% damage/s + blink 0.5s',
		5: '10% damage/s',
		7: '5% damage/s',
		8: 'Oscillates',
		9: 'Secret',
		10: 'Close door (30s)',
		11: '20% damage/s + death exit',
		12: 'Blink 1.0s sync',
		13: 'Blink 0.5s sync',
		14: 'Open door (300s)',
		16: '20% damage/s',
		17: 'Flicker random'
	},
	heretic: {
		0: 'Normal',
		1: 'Blink random',
		2: 'Blink 0.5s',
		3: 'Blink 1.0s',
		4: '5% lava/s + scroll E + blink 0.5s',
		5: '5% lava damage/s',
		7: '4% sludge damage/s',
		8: 'Oscillates',
		9: 'Secret',
		10: 'Close door (30s)',
		11: '(no-op)',
		12: 'Blink 0.5s sync',
		13: 'Blink 1.0s sync',
		14: 'Open door (300s)',
		15: 'Low friction',
		16: '8% lava damage/s',
		20: 'Scroll east 5',
		21: 'Scroll east 10',
		22: 'Scroll east 25',
		23: 'Scroll east 30',
		24: 'Scroll east 35',
		25: 'Scroll north 5',
		26: 'Scroll north 10',
		27: 'Scroll north 25',
		28: 'Scroll north 30',
		29: 'Scroll north 35',
		30: 'Scroll south 5',
		31: 'Scroll south 10',
		32: 'Scroll south 25',
		33: 'Scroll south 30',
		34: 'Scroll south 35',
		35: 'Scroll west 5',
		36: 'Scroll west 10',
		37: 'Scroll west 25',
		38: 'Scroll west 30',
		39: 'Scroll west 35',
		40: 'Push east 5',
		41: 'Push east 10',
		42: 'Push east 25',
		43: 'Push north 5',
		44: 'Push north 10',
		45: 'Push north 25',
		46: 'Push south 5',
		47: 'Push south 10',
		48: 'Push south 25',
		49: 'Push west 5',
		50: 'Push west 10',
		51: 'Push west 25'
	},
	hexen: {
		0: 'Normal',
		1: 'Phased light',
		2: 'Phased light start',
		3: 'Light step',
		4: 'Light step',
		9: 'Secret',
		26: 'Stairs normal',
		27: 'Stairs sync',
		40: 'Push east 5',
		41: 'Push east 10',
		42: 'Push east 25',
		43: 'Push north 5',
		44: 'Push north 10',
		45: 'Push north 25',
		46: 'Push south 5',
		47: 'Push south 10',
		48: 'Push south 25',
		49: 'Push west 5',
		50: 'Push west 10',
		51: 'Push west 25',
		198: 'Lightning +64',
		199: 'Lightning +32',
		200: 'Secondary sky',
		201: 'Scroll north 5',
		202: 'Scroll north 10',
		203: 'Scroll north 25',
		204: 'Scroll east 5',
		205: 'Scroll east 10',
		206: 'Scroll east 25',
		207: 'Scroll south 5',
		208: 'Scroll south 10',
		209: 'Scroll south 25',
		210: 'Scroll west 5',
		211: 'Scroll west 10',
		212: 'Scroll west 25',
		213: 'Scroll northwest 5',
		214: 'Scroll northwest 10',
		215: 'Scroll northwest 25',
		216: 'Scroll northeast 5',
		217: 'Scroll northeast 10',
		218: 'Scroll northeast 25',
		219: 'Scroll southeast 5',
		220: 'Scroll southeast 10',
		221: 'Scroll southeast 25',
		222: 'Scroll southwest 5',
		223: 'Scroll southwest 10',
		224: 'Scroll southwest 25'
	}
};

function trackTransforms(ctx) {
	var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
	var xform = svg.createSVGMatrix();
	ctx.getTransform = function(){ return xform; };
	
	var savedTransforms = [];
	var save = ctx.save;
	ctx.save = function(){
		savedTransforms.push(xform.translate(0,0));
		return save.call(ctx);
	};
	var restore = ctx.restore;
	ctx.restore = function(){
		xform = savedTransforms.pop();
		return restore.call(ctx);
	};

	var scale = ctx.scale;
	ctx.scale = function(sx,sy){
		xform = xform.scaleNonUniform(sx,sy);
		return scale.call(ctx,sx,sy);
	};
	var rotate = ctx.rotate;
	ctx.rotate = function(radians){
		xform = xform.rotate(radians*180/Math.PI);
		return rotate.call(ctx,radians);
	};
	var translate = ctx.translate;
	ctx.translate = function(dx,dy){
		xform = xform.translate(dx,dy);
		return translate.call(ctx,dx,dy);
	};
	var transform = ctx.transform;
	ctx.transform = function(a,b,c,d,e,f){
		var m2 = svg.createSVGMatrix();
		m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
		xform = xform.multiply(m2);
		return transform.call(ctx,a,b,c,d,e,f);
	};
	var setTransform = ctx.setTransform;
	ctx.setTransform = function(a,b,c,d,e,f){
		xform.a = a;
		xform.b = b;
		xform.c = c;
		xform.d = d;
		xform.e = e;
		xform.f = f;
		return setTransform.call(ctx,a,b,c,d,e,f);
	};
	var pt  = svg.createSVGPoint();
	ctx.transformedPoint = function(x,y){
		pt.x=x; pt.y=y;
		return pt.matrixTransform(xform.inverse());
	}
	ctx.resetTransform = function() {
		xform = svg.createSVGMatrix();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.zoom = 1.0;
	}
	ctx.zoom = 1.0;
}

window.addEventListener('DOMContentLoaded', (event) => {
	const $iwad = document.getElementById('iwad');
	const $pwads = document.getElementById('pwads');
	const $wadsel = document.getElementById('wadsel');
	const $mapsel = document.getElementById('mapsel');
	const $difficulty = document.getElementById('difficulty');
	const $netgame = document.getElementById('netgame');
	const $wad_msg = document.getElementById('wad-msg');

	let iwad;
	let redraw = () => {};
	let refreshMap = () => {};

	const fmtCoord = (value) => {
		if (!Number.isFinite(value)) return value;
		return parseFloat(value.toFixed(2)).toString();
	};

	const escapeHtml = (value) => String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

	const hex = (value, width = 4) => '0x' + value.toString(16).padStart(width, '0');

	$wadsel.addEventListener('submit', (event) => {
		event.stopPropagation();
		event.preventDefault();

		load_selected_wads().then((ok) => {
			if (ok) {
				document.getElementById('nav-map-tab').click();
				focusPlayerStart();
			}
		});
	});

	const $canvas = document.getElementById('map');
	const ctx = $canvas.getContext('2d');

	var lastX=$canvas.width/2, lastY=$canvas.height/2;

	var dragStart,dragged,curzoom=1,mouseDownX=0,mouseDownY=0;

	$canvas.addEventListener('mousedown',(event) => {
		document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
		lastX = event.offsetX || (event.pageX - $canvas.offsetLeft);
		lastY = event.offsetY || (event.pageY - $canvas.offsetTop);
		mouseDownX = lastX;
		mouseDownY = lastY;
		dragStart = ctx.transformedPoint(lastX,lastY);
		dragged = false;
	},false);
	$canvas.addEventListener('mousemove',(event) => {
		lastX = event.offsetX || (event.pageX - $canvas.offsetLeft);
		lastY = event.offsetY || (event.pageY - $canvas.offsetTop);
		if (Math.hypot(lastX - mouseDownX, lastY - mouseDownY) > 3) {
			dragged = true;
		}
		if (dragStart && dragged){
			hideThingTooltip();
			var pt = ctx.transformedPoint(lastX,lastY);
			ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
			redraw();
		} else {
			updateThingTooltip(event);
		}
	},false);
	$canvas.addEventListener('mouseup',(event) => {
		dragStart = null;
		if (!dragged) {
			if (event.shiftKey) {
				zoom(-1);
			} else {
				selectAt(lastX, lastY);
			}
		}
	},false);
	$canvas.addEventListener('mouseleave', () => hideThingTooltip(), false);

	var scaleFactor = 1.1;
	var zoom = function(clicks){
		var pt = ctx.transformedPoint(lastX,lastY);
		ctx.translate(pt.x,pt.y);
		var factor = Math.pow(scaleFactor,clicks);
		ctx.zoom *= factor;
		ctx.scale(factor,factor);
		ctx.translate(-pt.x,-pt.y);
		redraw();
	}

	const resize = (event) => {
		$canvas.width = Math.max(320, Math.min(window.innerWidth, 1320));
		$canvas.height = window.innerHeight - 100;
		$canvas.style.width = $canvas.width + 'px';
		$canvas.style.height = $canvas.height + 'px';

		lastX = $canvas.width/2;
		lastY = $canvas.height/2;
		ctx.resetTransform();

		redraw();
	};
	window.addEventListener('resize', resize);
	resize();

	var handleScroll = function(evt){
		var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
		if (delta) zoom(delta);
		return evt.preventDefault() && false;
	};
	$canvas.addEventListener('DOMMouseScroll',handleScroll,false);
	$canvas.addEventListener('mousewheel',handleScroll,false);
	trackTransforms(ctx);

	const $thing = document.getElementById('thing');
	const $thingtype = document.getElementById('thingtype');
	const $thinglist = document.getElementById('thinglist');
	const $thingheader = document.getElementById('thingheader');
	const $secretlist = document.getElementById('secretlist');
	const $secretheader = document.getElementById('secretheader');
	const $selectionInfo = document.getElementById('selection-info');
	const $thingTooltip = document.createElement('div');
	const $thingTooltipCanvas = document.createElement('canvas');
	const $thingTooltipName = document.createElement('div');
	const $thingTooltipDetails = document.createElement('div');
	$thingTooltip.id = 'thing-tooltip';
	$thingTooltip.hidden = true;
	$thingTooltip.appendChild($thingTooltipCanvas);
	$thingTooltip.appendChild($thingTooltipName);
	$thingTooltip.appendChild($thingTooltipDetails);
	document.body.appendChild($thingTooltip);
	let tooltipThing = null;
	const populateThingCategories = (game) => {
		$thingtype.innerHTML = '<option selected value="all">Everything</option>';
		$thing.innerHTML = '<option selected value="all">Everything</option>';

		const THING_TYPES = [];
		let category_index = 0;
		let skip = false;

		THING_DATA.forEach(([id, name]) => {
			if (id) {
				if (skip) return;
				const $option = document.createElement('option');
				$option.value = id;
				$option.text = name;
				$option.classList.add('thing-type-' + category_index);
				$thing.add($option);
				return;
			}

			const m = /^(Doom|Heretic|Hexen|Strife)\b/.exec(name);
			const cat_game = m ? m[1].toLowerCase() : null;

			if (game && cat_game && cat_game !== game) {
				skip = true;
				return;
			}
			skip = false;
			category_index++;
			THING_TYPES.push(name);
			const $option = document.createElement('option');
			$option.disabled = true;
			$option.text = name;
			$option.classList.add('thing-type-' + category_index);
			$thing.add($option);
		});

		THING_TYPES.forEach((typ, i) => {
			const $option = document.createElement('option');
			$option.value = 'thing-type-' + (i + 1);
			$option.text = typ;
			$thingtype.add($option);
		});
	};
	populateThingCategories();

	$thingtype.addEventListener('change', (event) => {
		const current = $thingtype.options[$thingtype.selectedIndex].value;
		Array.from($thing.options).forEach((option) => {
			if (current == 'all' || option.classList.contains(current)) {
				option.hidden = false;
			} else if (option.value == 'all') {
				option.hidden = false;
			} else {
				option.hidden = true;
			}
		});
	});

	const difficultyFlag = () => {
		if ($difficulty.value == 'easy') return 0x01;
		if ($difficulty.value == 'hard') return 0x04;
		return 0x02;
	};

	const thingPresent = (thing) => {
		const skill_ok = (thing.flags & difficultyFlag()) != 0;
		if (!skill_ok) return false;
		if (iwad && iwad.isHexen) {
			const has_mode_flags = (thing.flags & 0x00e0) != 0;
			if (!has_mode_flags) return true;
			return $netgame.checked ? (thing.flags & 0x00c0) != 0 : (thing.flags & 0x0020) != 0;
		}
		return $netgame.checked || (thing.flags & 0x0010) == 0;
	};

	const thingName = (thing) => {
		const gameNames = THING_NAMES_BY_GAME[iwad ? iwad.game : 'doom'] || {};
		return gameNames[thing.type] || THING_NAMES_BY_GAME.generic[thing.type] || ('Thing ' + thing.type);
	};

	const sectorSpecialName = (special) => {
		const names = SECTOR_SPECIAL_NAMES[iwad ? iwad.game : 'doom'] || {};
		return names[special];
	};

	const thingTypeMarkup = (thing) =>
		'<span title="' + thing.type + '">' + escapeHtml(thingName(thing)) + '</span>';

	const thingFlagDefs = () => {
		if (iwad && iwad.isHexen) {
			return [
				[0x0001, 'E', 'Easy'],
				[0x0002, 'M', 'Medium'],
				[0x0004, 'H', 'Hard'],
				[0x0008, 'Amb', 'Ambush'],
				[0x0010, 'Dorm', 'Dormant'],
				[0x0020, 'Ftr', 'Fighter'],
				[0x0040, 'Clr', 'Cleric'],
				[0x0080, 'Mag', 'Mage'],
				[0x0100, 'SP', 'Single-player'],
				[0x0200, 'Coop', 'Cooperative'],
				[0x0400, 'DM', 'Deathmatch']
			];
		}
		return [
			[0x0001, 'E', 'Easy'],
			[0x0002, 'M', 'Medium'],
			[0x0004, 'H', 'Hard'],
			[0x0008, 'Amb', 'Ambush'],
			[0x0010, 'Net', 'Multiplayer only'],
			[0x0020, '!DM', 'Not deathmatch'],
			[0x0040, '!Coop', 'Not cooperative'],
			[0x0080, 'Friend', 'Friendly']
		];
	};

	const decodedThingFlags = (thing, verbose = false) => {
		const defs = thingFlagDefs();
		const labels = defs
			.filter(([flag]) => (thing.flags & flag) != 0)
			.map(([, compact, long]) => verbose ? long : compact);
		const known = defs.reduce((mask, [flag]) => mask | flag, 0);
		const unknown = thing.flags & ~known;
		if (unknown) labels.push(hex(unknown));
		return labels.length ? labels.join(' ') : '-';
	};

	const thingFlagsMarkup = (thing) =>
		'<span title="' + hex(thing.flags) + '">' + escapeHtml(decodedThingFlags(thing)) + '</span>';

	const spriteCache = {};

	const spritePatchForThing = (thing) => {
		if (!iwad) return null;
		const gameSprites = THING_SPRITES[iwad.game] || {};
		const sprite = gameSprites[thing.type];
		if (!sprite) return null;
		const preferred = ['A1', 'A2A8', 'A2', 'B1', 'B2B8'];
		for (const suffix of preferred) {
			const patch = iwad.patches[sprite + suffix];
			if (patch) return patch;
		}
		const name = Object.keys(iwad.patches).find((patchName) =>
			patchName.substr(0, 4) == sprite && /^[A-Z][0-9]/.exec(patchName.substr(4)));
		return name ? iwad.patches[name] : null;
	};

	const drawThingTooltipImage = (thing) => {
		const patch = spritePatchForThing(thing);
		const size = 72;
		$thingTooltipCanvas.width = size;
		$thingTooltipCanvas.height = size;
		const tctx = $thingTooltipCanvas.getContext('2d');
		tctx.clearRect(0, 0, size, size);
		if (!patch) {
			tctx.fillStyle = '#dc3545';
			tctx.beginPath();
			tctx.arc(size / 2, size / 2, 12, 0, 2 * Math.PI);
			tctx.fill();
			return;
		}
		if (spriteCache[patch.name]) {
			const bitmap = spriteCache[patch.name];
			const scale = Math.min(size / bitmap.width, size / bitmap.height, 2);
			const width = bitmap.width * scale;
			const height = bitmap.height * scale;
			tctx.drawImage(bitmap, (size - width) / 2, size - height - 4, width, height);
			return;
		}
		createImageBitmap(patch.imageData).then((bitmap) => {
			spriteCache[patch.name] = bitmap;
			if (tooltipThing === thing) {
				drawThingTooltipImage(thing);
			}
		});
	};

	const hideThingTooltip = () => {
		tooltipThing = null;
		$thingTooltip.hidden = true;
	};

	const showThingTooltip = (thing, clientX, clientY) => {
		tooltipThing = thing;
		$thingTooltipName.innerText = thingName(thing);
		$thingTooltipDetails.innerText = 'Type ' + thing.type + '\nFlags ' + decodedThingFlags(thing, true) + ' (' + hex(thing.flags) + ')';
		drawThingTooltipImage(thing);
		$thingTooltip.style.left = (clientX + 14) + 'px';
		$thingTooltip.style.top = (clientY + 14) + 'px';
		$thingTooltip.hidden = false;
	};

	const thingMatchesFilter = (thing) => {
		const thing_value = $thing.options[$thing.selectedIndex].value;
		return thingPresent(thing) && (thing_value == 'all' || thing.type == parseInt(thing_value));
	};

	const thingAt = (x, y) => {
		if (!map) return null;
		const p = ctx.transformedPoint(x, y);
		const radius = Math.max(8 / ctx.zoom, 5);
		let best = null;
		let bestDistance = radius;
		map.things.forEach((thing) => {
			if (!thingMatchesFilter(thing)) return;
			const distance = Math.hypot(p.x - thing.x, p.y - thing.y);
			if (distance < bestDistance) {
				bestDistance = distance;
				best = thing;
			}
		});
		return best;
	};

	const updateThingTooltip = (event) => {
		const thing = thingAt(lastX, lastY);
		if (!thing) {
			hideThingTooltip();
			return;
		}
		showThingTooltip(thing, event.clientX, event.clientY);
	};

	const selected = {
		type: null,
		item: null
	};
	const hoverHighlight = {
		type: null,
		item: null
	};

	const lineTag = (linedef) => {
		return iwad && iwad.isHexen ? (linedef.args[0] || 0) : linedef.tag;
	};

	const triggerSectorsFor = (linedef) => {
		const tag = lineTag(linedef);
		if (!tag || !linedef.special_type) return [];
		return map.sectors.filter((sector) => sector.tag == tag);
	};

	const triggerLinesFor = (sector) => {
		if (!sector.tag) return [];
		return map.linedefs.filter((linedef) => linedef.special_type && lineTag(linedef) == sector.tag);
	};

	const DOOM_TELEPORT_SPECIALS = {
		39: true,
		97: true,
		125: true,
		126: true,
		174: true,
		195: true,
		207: true,
		208: true,
		209: true,
		210: true,
		243: true,
		244: true,
		262: true,
		263: true,
		264: true,
		265: true,
		266: true,
		267: true,
		268: true,
		269: true
	};

	const HEXEN_TELEPORT_SPECIALS = {
		70: true,
		71: true,
		72: true
	};

	const isTeleportLinedef = (linedef) => {
		if (!linedef || !linedef.special_type) return false;
		if (iwad && iwad.isHexen) return !!HEXEN_TELEPORT_SPECIALS[linedef.special_type];
		return !!DOOM_TELEPORT_SPECIALS[linedef.special_type];
	};

	const uniqueItems = (items) => items.filter((item, i, all) => item && all.indexOf(item) == i);

	const teleportDestinationsFor = (linedef) => {
		if (!isTeleportLinedef(linedef)) return [];
		if (iwad && iwad.isHexen) {
			const tid = linedef.args[0] || 0;
			if (!tid) return [];
			return map.things.filter((thing) => thing.tid == tid);
		}

		const sectors = triggerSectorsFor(linedef);
		return map.things.filter((thing) => thing.type == 14 && sectors.includes(thing.sector));
	};

	const teleportDestinationsForSector = (sector) => {
		return uniqueItems(triggerLinesFor(sector).flatMap(teleportDestinationsFor));
	};

	const jumpTo = (x, y) => {
		document.getElementById('nav-map-tab').click();
		const z = ctx.zoom;
		ctx.resetTransform();
		ctx.zoom = z;
		ctx.scale(z, z);
		const tl = ctx.transformedPoint(0, 0);
		const br = ctx.transformedPoint($canvas.width, $canvas.height);
		ctx.translate(-x+(br.x+tl.x)/2, -y+(br.y+tl.y)/2);
		redraw();
	};

	const focusPlayerStart = () => {
		if (!map) return;
		const start = map.things.find((thing) => thing.type == 1);
		if (start) {
			jumpTo(start.x, start.y);
		}
	};

	const describeLinedef = (linedef) => {
		const tag = lineTag(linedef);
		const sectors = triggerSectorsFor(linedef);
		const links = sectors.map((sector) =>
			'<a href="#" data-action="select-sector" data-id="' + sector.id + '">S' + sector.id + '</a>'
		).join('');
		const destinations = teleportDestinationsFor(linedef).map((thing) =>
			'<a href="#" data-action="select-thing" data-id="' + thing.id + '">T' + thing.id + ' ' + thingName(thing) + '</a>'
		).join('');
		return 'Linedef L' + linedef.id + ', special ' + linedef.special_type +
			', tag ' + tag + (links ? ', affects ' + links : ', no tagged sectors found') +
			(destinations ? ', teleports to ' + destinations : '');
	};

	const describeSector = (sector) => {
		const lines = triggerLinesFor(sector);
		const links = lines.map((linedef) =>
			'<a href="#" data-action="select-linedef" data-id="' + linedef.id + '">L' + linedef.id + '</a>'
		).join('');
		const destinations = teleportDestinationsForSector(sector).map((thing) =>
			'<a href="#" data-action="select-thing" data-id="' + thing.id + '">T' + thing.id + ' ' + thingName(thing) + '</a>'
		).join('');
		let specialPart = '';
		if (sector.special_type) {
			const specialName = sectorSpecialName(sector.special_type);
			if (specialName) {
				specialPart = ', sector special ' + sector.special_type + ' (' + specialName + ')';
			} else {
				specialPart = ', sector special ' + sector.special_type;
			}
		}
		return 'Sector S' + sector.id + ', tag ' + sector.tag + specialPart +
			(links ? ', opened/changed by ' + links : ', no matching trigger linedefs found') +
			(destinations ? ', teleport destinations ' + destinations : '');
	};

	const describeThing = (thing) => {
		const sector = thing.sector ? ' in S' + thing.sector.id : '';
		return 'Thing T' + thing.id + ': ' + thingName(thing) + sector +
			' at ' + fmtCoord(thing.x) + ', ' + fmtCoord(-thing.y);
	};

	const linkedSelection = (link) => {
		if (link.dataset.action == 'select-sector') {
			return {
				type: 'sector',
				item: map.sectors.find((s) => s.id == parseInt(link.dataset.id))
			};
		}
		if (link.dataset.action == 'select-linedef') {
			return {
				type: 'linedef',
				item: map.linedefs.find((l) => l.id == parseInt(link.dataset.id))
			};
		}
		if (link.dataset.action == 'select-thing') {
			return {
				type: 'thing',
				item: map.things.find((t) => t.id == parseInt(link.dataset.id))
			};
		}
		return {type: null, item: null};
	};

	const bindSelectionLinkHover = (link) => {
		link.addEventListener('mouseenter', (event) => {
			const linked = linkedSelection(link);
			if (!linked.item) return;
			hoverHighlight.type = linked.type;
			hoverHighlight.item = linked.item;
			redraw();
		});
		link.addEventListener('mouseleave', (event) => {
			hoverHighlight.type = null;
			hoverHighlight.item = null;
			redraw();
		});
	};

	const updateSelectionInfo = () => {
		if (!$selectionInfo) return;
		if (!selected.item) {
			$selectionInfo.innerHTML = 'Click a linedef or sector to inspect trigger links.';
			return;
		}
		if (selected.type == 'linedef') {
			$selectionInfo.innerHTML = describeLinedef(selected.item);
		} else if (selected.type == 'sector') {
			$selectionInfo.innerHTML = describeSector(selected.item);
		} else {
			$selectionInfo.innerHTML = describeThing(selected.item);
		}
		$selectionInfo.querySelectorAll('[data-action=select-sector]').forEach((link) => {
			bindSelectionLinkHover(link);
			link.addEventListener('click', (event) => {
				event.preventDefault();
				const linked = linkedSelection(link);
				if (linked.item) {
					selected.type = linked.type;
					selected.item = linked.item;
					updateSelectionInfo();
					redraw();
				}
			});
		});
		$selectionInfo.querySelectorAll('[data-action=select-linedef]').forEach((link) => {
			bindSelectionLinkHover(link);
			link.addEventListener('click', (event) => {
				event.preventDefault();
				const linked = linkedSelection(link);
				if (linked.item) {
					selected.type = linked.type;
					selected.item = linked.item;
					updateSelectionInfo();
					redraw();
				}
			});
		});
		$selectionInfo.querySelectorAll('[data-action=select-thing]').forEach((link) => {
			bindSelectionLinkHover(link);
			link.addEventListener('click', (event) => {
				event.preventDefault();
				const linked = linkedSelection(link);
				if (linked.item) {
					selected.type = linked.type;
					selected.item = linked.item;
					updateSelectionInfo();
					jumpTo(linked.item.x, linked.item.y);
				}
			});
		});
	};

	const distanceToSegment = (p, a, b) => {
		const dx = b.x - a.x;
		const dy = b.y - a.y;
		const len2 = dx * dx + dy * dy;
		if (len2 == 0) return Math.hypot(p.x - a.x, p.y - a.y);
		const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2));
		return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
	};

	const pointInPolygon = (p, polygon) => {
		let inside = false;
		for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
			const a = polygon[i];
			const b = polygon[j];
			if (((a.y > p.y) != (b.y > p.y)) &&
				(p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x)) {
				inside = !inside;
			}
		}
		return inside;
	};

	const pointInPaths = (p, paths) => {
		return paths.reduce((inside, path) => inside != pointInPolygon(p, path), false);
	};

	const sectorAtPoint = (p) => {
		if (!map) return null;
		for (const sector of map.sectors) {
			if (sector.paths && sector.paths.length && pointInPaths(p, sector.paths)) {
				return sector;
			}
		}
		return null;
	};

	const assignThingSectors = () => {
		if (!map) return;
		map.things.forEach((thing) => {
			thing.sector = sectorAtPoint(thing);
		});
	};

	const selectAt = (x, y) => {
		if (!map) return;
		const p = ctx.transformedPoint(x, y);
		const maxdist = 8 / ctx.zoom;
		let bestLine = null;
		let bestDistance = maxdist;
		map.linedefs.forEach((linedef) => {
			if (!linedef.from || !linedef.to) return;
			const distance = distanceToSegment(p, linedef.from, linedef.to);
			if (distance < bestDistance) {
				bestDistance = distance;
				bestLine = linedef;
			}
		});
		if (bestLine) {
			selected.type = 'linedef';
			selected.item = bestLine;
		} else {
			const bestSector = sectorAtPoint(p);
			selected.type = bestSector ? 'sector' : null;
			selected.item = bestSector;
		}
		updateSelectionInfo();
		redraw();
	};

	const rething = () => {
		if (!map) return;
		const things = map.things.filter(thingMatchesFilter).sort((thing) => thing.id);
		$thinglist.innerHTML = '';
		things.forEach((thing) => {
			const $thing = $thingheader.cloneNode(true);
			$thing.querySelectorAll('[data-template]').forEach((node) => {
				node.innerHTML = eval(node.dataset.template);
			});
			$thinglist.appendChild($thing);
		});
		$thinglist.querySelectorAll('[data-action=jump]').forEach((jump) => {
			jump.addEventListener('click', (event) => {
				event.preventDefault();
				event.stopPropagation();
				jumpTo(parseFloat(jump.dataset.x), parseFloat(jump.dataset.y));
			});
		});
	};

	const resecret = () => {
		if (!map) return;
		const secrets = map.sectors.filter((s) => s.special_type == 9 && s.midpoint);
		$secretlist.innerHTML = '';
		secrets.forEach((secret) => {
			const $secret = $secretheader.cloneNode(true);
			$secret.querySelectorAll('[data-template]').forEach((node) => {
				node.innerHTML = eval(node.dataset.template);
			});
			$secretlist.appendChild($secret);
		});
		$secretlist.querySelectorAll('[data-action=jump]').forEach((jump) => {
			jump.addEventListener('click', (event) => {
				event.preventDefault();
				event.stopPropagation();
				jumpTo(parseFloat(jump.dataset.x), parseFloat(jump.dataset.y));
			});
		});
	};

	$thing.addEventListener('change', (event) => {
		if (!map) return;
		redraw();
		rething();
	});
	$difficulty.addEventListener('change', (event) => {
		redraw();
		rething();
	});
	$netgame.addEventListener('change', (event) => {
		redraw();
		rething();
	});

	let map = null;

	$mapsel.addEventListener('change', (event) => {
		refreshMap();
	});

	const flats = {};

	const flatPattern = (texture) => {
		if (flats[texture]) return ctx.createPattern(flats[texture], 'repeat');
		return null;
	};

	const loadMapFlats = () => {
		const textures = new Set();
		if (map) {
			map.sectors.forEach((sector) => textures.add(sector.floor.texture));
		}
		return Promise.all(Array.from(textures).map((texture) => {
			if (flats[texture] || !iwad.flats[texture]) {
				return Promise.resolve();
			}
			return createImageBitmap(iwad.flats[texture].imageData).then((bitmap) => {
				flats[texture] = bitmap;
			});
		}));
	};

	const drawSubsectorPath = (subsector) => {
		ctx.beginPath();
		const points = subsector.path || subsector.vertexes;
		points.forEach((v, i) => {
			if (i == 0) {
				ctx.moveTo(v.x, v.y);
			} else {
				ctx.lineTo(v.x, v.y);
			}
		});
		ctx.closePath();
	};

	const drawSectorPath = (sector) => {
		ctx.beginPath();
		(sector.paths || []).forEach((path) => {
			path.forEach((v, i) => {
				if (i == 0) {
					ctx.moveTo(v.x, v.y);
				} else {
					ctx.lineTo(v.x, v.y);
				}
			});
			ctx.closePath();
		});
	};

	const drawLinedef = (linedef) => {
		if (!linedef.from || !linedef.to) return;
		ctx.beginPath();
		ctx.moveTo(linedef.from.x, linedef.from.y);
		ctx.lineTo(linedef.to.x, linedef.to.y);
		ctx.stroke();
	};

	const sectorsForSelection = (selection) => {
		if (!selection.item) return [];
		if (selection.type == 'thing') return selection.item.sector ? [selection.item.sector] : [];
		return selection.type == 'linedef' ? triggerSectorsFor(selection.item) : [selection.item];
	};

	const linesForSelection = (selection) => {
		if (!selection.item || selection.type == 'thing') return [];
		return selection.type == 'sector' ? triggerLinesFor(selection.item) : [selection.item];
	};

	const thingsForSelection = (selection) => {
		if (!selection.item) return [];
		if (selection.type == 'thing') return [selection.item];
		if (selection.type == 'linedef') return teleportDestinationsFor(selection.item);
		if (selection.type == 'sector') return teleportDestinationsForSector(selection.item);
		return [];
	};

	const highlightedSectors = () => uniqueItems(sectorsForSelection(selected));
	const highlightedLines = () => uniqueItems(linesForSelection(selected));
	const highlightedThings = () => uniqueItems(thingsForSelection(selected));

	const setupRedraw = () => {
		redraw = () => {
			const tl = ctx.transformedPoint(0, 0);
			const br = ctx.transformedPoint($canvas.width, $canvas.height);
			ctx.clearRect(tl.x, tl.y, br.x - tl.x, br.y - tl.y);

			if (!map) {
				return;
			}

			ctx.lineWidth = 1;
			ctx.font = '10px serif';

			map.sectors.forEach((sector) => {
				if (!sector.paths || !sector.paths.length) return;
				ctx.save();
				drawSectorPath(sector);
				const pattern = flatPattern(sector.floor.texture);
				ctx.fillStyle = pattern || 'rgb(0,0,32)';
				ctx.fill('evenodd');
				ctx.restore();
			});

			const sectors = highlightedSectors();
			if (sectors.length) {
				ctx.save();
				ctx.fillStyle = 'rgba(255, 193, 7, 0.35)';
				sectors.forEach((sector) => {
					drawSectorPath(sector);
					ctx.fill('evenodd');
				});
				ctx.restore();
			}

			const hoverSectors = hoverHighlight.type == 'sector' && hoverHighlight.item ? [hoverHighlight.item] : [];
			if (hoverSectors.length) {
				ctx.save();
				ctx.lineWidth = Math.max(2, 5 / ctx.zoom);
				ctx.strokeStyle = '#0d6efd';
				hoverSectors.forEach((sector) => {
					drawSectorPath(sector);
					ctx.stroke();
				});
				ctx.restore();
			}

			ctx.save();
			ctx.strokeStyle = 'brown';
			map.linedefs.forEach(drawLinedef);
			ctx.restore();

			const lines = highlightedLines();
			if (lines.length) {
				ctx.save();
				ctx.lineWidth = Math.max(2, 4 / ctx.zoom);
				ctx.strokeStyle = selected.type == 'sector' ? '#0d6efd' : '#dc3545';
				lines.forEach(drawLinedef);
				ctx.restore();
			}

			const hoverLines = hoverHighlight.type == 'linedef' && hoverHighlight.item ? [hoverHighlight.item] : [];
			if (hoverLines.length) {
				ctx.save();
				ctx.lineWidth = Math.max(3, 6 / ctx.zoom);
				ctx.strokeStyle = '#ffc107';
				hoverLines.forEach(drawLinedef);
				ctx.restore();
			}

			ctx.fillStyle = 'red';
			ctx.strokeStyle = 'brown';
			map.things.forEach((thing) => {
				if (thingMatchesFilter(thing)) {
					ctx.beginPath();
					ctx.arc(thing.x, thing.y, 5, 0, 2 * Math.PI, false);
					ctx.fill();

					ctx.beginPath();
					ctx.arc(thing.x, thing.y, 5, 0, 2 * Math.PI, false);
					ctx.stroke();
				}
			});

			const things = highlightedThings();
			if (things.length) {
				ctx.save();
				ctx.lineWidth = Math.max(2, 4 / ctx.zoom);
				ctx.strokeStyle = '#0dcaf0';
				things.forEach((thing) => {
					ctx.beginPath();
					ctx.arc(thing.x, thing.y, 11, 0, 2 * Math.PI, false);
					ctx.stroke();
				});
				ctx.restore();
			}

			const hoverThings = hoverHighlight.type == 'thing' && hoverHighlight.item ? [hoverHighlight.item] : [];
			if (hoverThings.length) {
				ctx.save();
				ctx.lineWidth = Math.max(3, 6 / ctx.zoom);
				ctx.strokeStyle = '#ffc107';
				hoverThings.forEach((thing) => {
					ctx.beginPath();
					ctx.arc(thing.x, thing.y, 15, 0, 2 * Math.PI, false);
					ctx.stroke();
				});
				ctx.restore();
			}

			ctx.font = '15px serif';
			map.sectors.filter((s) => s.special_type == 9).forEach((sector) => {
				if (!sector.midpoint) return;

				ctx.save();
				ctx.fillStyle = 'red';
				ctx.strokeText('secret S' + sector.id, sector.midpoint.x, sector.midpoint.y);
				ctx.strokeStyle = 'blue';
				ctx.strokeText('secret S' + sector.id, sector.midpoint.x, sector.midpoint.y);
				ctx.restore();
			});

			ctx.save();
			ctx.font = '13px serif';
			map.sectors.forEach((sector) => {
				if (!sector.midpoint || (!sector.tag && sector.special_type != 9)) return;
				ctx.strokeStyle = 'yellow';
				ctx.strokeText('S' + sector.id, sector.midpoint.x, sector.midpoint.y);
				ctx.strokeStyle = 'black';
				ctx.strokeText('S' + sector.id, sector.midpoint.x, sector.midpoint.y);
			});
			ctx.restore();
		};
	};

	refreshMap = () => {
		if (!iwad || !$mapsel.options.length) return Promise.resolve(false);
		map = iwad.maps[$mapsel.options[$mapsel.selectedIndex].value];
		assignThingSectors();
		selected.type = null;
		selected.item = null;
		updateSelectionInfo();
		$wad_msg.innerText = 'Loading map textures...';
		return loadMapFlats()
			.then(() => {
				resize();
				rething();
				resecret();
				$wad_msg.innerText = '';
				return true;
			})
			.catch((err) => {
				$wad_msg.innerText = 'ERROR: ' + err;
				return false;
			});
	};

	const load_wad = (arrayBuffers) => {
		try {
			iwad = new WAD(arrayBuffers);
		} catch(err) {
			$wad_msg.innerText = err;
			return Promise.resolve(false);
		}
		window.iwad = iwad;
		Object.keys(flats).forEach((key) => delete flats[key]);
		populateThingCategories(iwad.game);

		const selectedMap = $mapsel.value;
		$mapsel.innerHTML = '';
		Object.keys(iwad.maps).forEach((map) => {
			const $option = document.createElement('option');
			$option.value = map;
			$option.text = iwad.maps[map].name;
			$mapsel.add($option);
		});
		if (!$mapsel.options.length) {
			$wad_msg.innerText = 'No maps found';
			return Promise.resolve(false);
		}
		if (iwad.maps[selectedMap]) {
			$mapsel.value = selectedMap;
		}
		setupRedraw();
		return refreshMap();
	};

	const load_selected_wads = () => {
		if ($iwad.files.length !== 1) {
			$wad_msg.innerText = 'Choose one IWAD';
			return Promise.resolve(false);
		}
		$wad_msg.innerText = 'Loading...';
		const files = [$iwad.files[0]].concat(Array.from($pwads.files));
		return Promise.all(files.map((file) => file.arrayBuffer()))
			.then(load_wad)
			.catch((err) => {
				$wad_msg.innerText = 'ERROR: ' + err;
				return false;
			});
	};

	$iwad.addEventListener('change', load_selected_wads);
	$pwads.addEventListener('change', load_selected_wads);

	if ($iwad.files.length === 1) {
		load_selected_wads();
	}
});

// vim: ai:ts=8:sw=8:noet:syntax=js
