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
	}
}

window.addEventListener('DOMContentLoaded', (event) => {
	const $iwad = document.getElementById('iwad');
	const reader = new FileReader();
	const $wadsel = document.getElementById('wadsel');
	const $mapsel = document.getElementById('mapsel');
	const $wad_msg = document.getElementById('wad-msg');

	$iwad.addEventListener('change', (event) => {
		if ($iwad.files.length !== 1) {
			return;
		}

		reader.readAsArrayBuffer($iwad.files[0]);
	});

	let iwad;
	let redraw = () => {};

	$wadsel.addEventListener('submit', (event) => {
		event.stopPropagation();
		event.preventDefault();

		if (iwad) {
			redraw();
			document.getElementById('nav-map-tab').click();
		}
	});

	const $canvas = document.getElementById('map');
	const ctx = $canvas.getContext('2d');

	var lastX=$canvas.width/2, lastY=$canvas.height/2;

	var dragStart,dragged;

	$canvas.addEventListener('mousedown',(event) => {
		document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
		lastX = event.offsetX || (event.pageX - $canvas.offsetLeft);
		lastY = event.offsetY || (event.pageY - $canvas.offsetTop);
		dragStart = ctx.transformedPoint(lastX,lastY);
		dragged = false;
	},false);
	$canvas.addEventListener('mousemove',(event) => {
		lastX = event.offsetX || (event.pageX - $canvas.offsetLeft);
		lastY = event.offsetY || (event.pageY - $canvas.offsetTop);
		dragged = true;
		if (dragStart){
			var pt = ctx.transformedPoint(lastX,lastY);
			ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
			redraw();
		}
	},false);
	$canvas.addEventListener('mouseup',(event) => {
		dragStart = null;
		if (!dragged) zoom(event.shiftKey ? -1 : 1 );
	},false);

	var scaleFactor = 1.1;
	var zoom = function(clicks){
		var pt = ctx.transformedPoint(lastX,lastY);
		ctx.translate(pt.x,pt.y);
		var factor = Math.pow(scaleFactor,clicks);
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
		scaleFactor = 1.1;
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
	const THING_TYPES = [];
	THING_DATA.forEach(([id, name]) => {
		const $option = document.createElement('option');
		if (id) {
			$option.value = id;
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

	$thing.addEventListener('change', (event) => {
		redraw();
	});

	let map = null;

	$mapsel.addEventListener('change', (event) => {
		map = iwad.maps[$mapsel.options[$mapsel.selectedIndex].value];
		redraw();
	});

	const load_wad = (arrayBuffer) => {
		try {
			iwad = new WAD(arrayBuffer);
		} catch(err) {
			$wad_msg.innerText = err;
			return false;
		}
		window.iwad = iwad;

		$mapsel.innerHTML = '';
		Object.keys(iwad.maps).forEach((map) => {
			const $option = document.createElement('option');
			$option.value = map;
			$option.text = map;
			$mapsel.add($option);
		});
		map = iwad.maps[$mapsel.options[0].value];

		const flats = {};
		const promises = map.sectors.map((sector) => {
			if (flats[sector.floor.texture] || !iwad.flats[sector.floor.texture]) {
				return Promise.resolve();
			}

			return createImageBitmap(
				iwad.flats[sector.floor.texture].imageData
			).then((bitmap) => {
				flats[sector.floor.texture] = bitmap;
			});
		});

		redraw = () => {
			const tl = ctx.transformedPoint(0, 0);
			const br = ctx.transformedPoint($canvas.width, $canvas.height);
			ctx.clearRect(tl.x, tl.y, br.x - tl.x, br.y - tl.y);

			if (!map) {
				return;
			}

			ctx.lineWidth = 1;
			ctx.strokeStyle = 'black';
			ctx.font = '15px serif';
			
			ctx.strokeStyle = 'black';
			map.sectors.forEach((sector) => {
				if (!sector.midpoint) return;

				ctx.beginPath();
				let prev = null;
				sector.linedefs.forEach((v, i) => {
					const {from, to} = v;
					if (ctx.isPointInPath(from.x, from.y) && ctx.isPointInPath(to.x, to.y)) {
						return;
					}
					if (!prev) {
						ctx.moveTo(from.x, from.y);
					}
					ctx.lineTo(to.x, to.y);
					prev = to;
				});
				ctx.closePath();
				if (flats[sector.floor.texture]) {
					ctx.fillStyle = ctx.createPattern(flats[sector.floor.texture], 'repeat');
				} else {
					ctx.fillStyle = 'rgb(0,0,16)';
				}
				ctx.fill();

				ctx.save();
				ctx.fillStyle = 'green';
				ctx.strokeText('S' + sector.id, sector.midpoint.x, sector.midpoint.y);
				ctx.strokeStyle = 'yellow';
				ctx.strokeText('S' + sector.id, sector.midpoint.x, sector.midpoint.y);
				ctx.restore();
			});

			ctx.font = '10px serif';

			map.subsectors.forEach((subsector) => {
				if (!subsector.midpoint) return;

				ctx.save();
				ctx.beginPath();
				subsector.vertexes.forEach((v, i) => {
					if (i == 0) {
						ctx.moveTo(v.x, v.y);
					} else {
						ctx.lineTo(v.x, v.y);
					}
				});
				ctx.closePath();
				if (subsector.sector) {
					if (flats[subsector.sector.floor.texture]) {
						ctx.fillStyle = ctx.createPattern(flats[subsector.sector.floor.texture], 'repeat');
					} else {
						ctx.fillStyle = 'rgb(0,0,32)';
					}
					ctx.fill('evenodd');
				} else {
					ctx.fillStyle = 'red';
					ctx.fill('evenodd');
				}
				ctx.fillStyle = 'black';
				ctx.strokeText(subsector.id, subsector.midpoint.x, subsector.midpoint.y);
				ctx.strokeStyle = 'white';
				ctx.strokeText(subsector.id, subsector.midpoint.x, subsector.midpoint.y);
				ctx.restore();
			});

			ctx.fillStyle = 'red';
			ctx.strokeStyle = 'brown';

			map.sectors.forEach((sector) => {
				if (!sector.midpoint) return;

				ctx.beginPath();
				sector.linedefs.forEach((v, i) => {
					const {from, to} = v;
					ctx.moveTo(from.x, from.y);
					ctx.lineTo(to.x, to.y);
				});
				ctx.stroke();
			});

			const thing_value = $thing.options[$thing.selectedIndex].value;

			map.things.forEach((thing) => {
				if (thing_value == 'all' || thing.type == parseInt(thing_value)) {
					ctx.beginPath();
					ctx.arc(thing.x, thing.y, 5, 0, 2 * Math.PI, false);
					ctx.fill();

					ctx.beginPath();
					ctx.arc(thing.x, thing.y, 5, 0, 2 * Math.PI, false);
					ctx.stroke();
				}
			});
		};
		Promise.all(promises)
			.then(() => {
				resize();
				$wad_msg.innerText = '';
			})
			.catch((err) => {
				$wad_msg.innerText = 'ERROR: ' + err;
			});
	};

	reader.addEventListener('load', (event) => {
		const arrayBuffer = event.target.result;
		$wad_msg.innerText = 'Loading...';
		setTimeout(load_wad, 100, arrayBuffer);
	});

	if ($iwad.files.length === 1) {
		reader.readAsArrayBuffer($iwad.files[0]);
	}
});

// vim: ai:ts=8:sw=8:noet:syntax=js
