'use strict';

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

	$wadsel.addEventListener('submit', (event) => {
		event.stopPropagation();
		event.preventDefault();

		load_selected_wads().then((ok) => {
			if (ok) {
				document.getElementById('nav-map-tab').click();
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
	$thingTooltip.id = 'thing-tooltip';
	$thingTooltip.hidden = true;
	$thingTooltip.appendChild($thingTooltipCanvas);
	$thingTooltip.appendChild($thingTooltipName);
	document.body.appendChild($thingTooltip);
	let tooltipThing = null;
	const THING_NAMES = {};
	const THING_TYPES = [];
	THING_DATA.forEach(([id, name]) => {
		const $option = document.createElement('option');
		if (id) {
			$option.value = id;
			if (!THING_NAMES[id]) {
				THING_NAMES[id] = name;
			}
		} else {
			$option.disabled = true;
			THING_TYPES.push(name);
		}
		$option.text = name;
		$option.classList.add('thing-type-' + THING_TYPES.length);
		$thing.add($option);
	});
	THING_TYPES.forEach((typ, i) => {
		const $option = document.createElement('option');
		$option.value = 'thing-type-' + (i + 1);
		$option.text = typ;
		$thingtype.add($option);
	});

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
		return gameNames[thing.type] || THING_NAMES[thing.type] || ('Thing ' + thing.type);
	};

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

	const uniqueThings = (things) => things.filter((thing, i, all) => all.indexOf(thing) == i);

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
		return uniqueThings(triggerLinesFor(sector).flatMap(teleportDestinationsFor));
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
		return 'Sector S' + sector.id + ', tag ' + sector.tag +
			(sector.special_type ? ', sector special ' + sector.special_type : '') +
			(links ? ', opened/changed by ' + links : ', no matching trigger linedefs found') +
			(destinations ? ', teleport destinations ' + destinations : '');
	};

	const describeThing = (thing) => {
		const sector = thing.sector ? ' in S' + thing.sector.id : '';
		return 'Thing T' + thing.id + ': ' + thingName(thing) + sector +
			' at ' + fmtCoord(thing.x) + ', ' + fmtCoord(-thing.y);
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
			link.addEventListener('click', (event) => {
				event.preventDefault();
				const sector = map.sectors.find((s) => s.id == parseInt(link.dataset.id));
				if (sector) {
					selected.type = 'sector';
					selected.item = sector;
					updateSelectionInfo();
					redraw();
				}
			});
		});
		$selectionInfo.querySelectorAll('[data-action=select-linedef]').forEach((link) => {
			link.addEventListener('click', (event) => {
				event.preventDefault();
				const linedef = map.linedefs.find((l) => l.id == parseInt(link.dataset.id));
				if (linedef) {
					selected.type = 'linedef';
					selected.item = linedef;
					updateSelectionInfo();
					redraw();
				}
			});
		});
		$selectionInfo.querySelectorAll('[data-action=select-thing]').forEach((link) => {
			link.addEventListener('click', (event) => {
				event.preventDefault();
				const thing = map.things.find((t) => t.id == parseInt(link.dataset.id));
				if (thing) {
					selected.type = 'thing';
					selected.item = thing;
					updateSelectionInfo();
					jumpTo(thing.x, thing.y);
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

	const highlightedSectors = () => {
		if (!selected.item) return [];
		if (selected.type == 'thing') return selected.item.sector ? [selected.item.sector] : [];
		return selected.type == 'linedef' ? triggerSectorsFor(selected.item) : [selected.item];
	};

	const highlightedLines = () => {
		if (!selected.item) return [];
		if (selected.type == 'thing') return [];
		return selected.type == 'sector' ? triggerLinesFor(selected.item) : [selected.item];
	};

	const highlightedThings = () => {
		if (!selected.item) return [];
		if (selected.type == 'thing') return [selected.item];
		if (selected.type == 'linedef') return teleportDestinationsFor(selected.item);
		if (selected.type == 'sector') return teleportDestinationsForSector(selected.item);
		return [];
	};

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
