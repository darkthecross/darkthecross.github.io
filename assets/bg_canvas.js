/*jshint esversion: 6 */

// Dependency-free canvas2D starfield: a handful of drifting points, connected
// by faint lines when close together, plus a cursor-follower. Colors are kept
// in sync with the --ink / --accent tokens in default.css.

(function () {
    'use strict';

    var DOT_COLOR = '223, 227, 232';
    var LINE_COLOR = '54, 209, 220';
    var LINK_DIST = 140;
    var POINT_COUNT = 90;

    var reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    var width, height, dpr;
    var points = [];
    var mouse = { x: null, y: null };

    function makePoint() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25
        };
    }

    function resize() {
        dpr = window.devicePixelRatio || 1;
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
        resize();
        var count = reduceMotion ? Math.round(POINT_COUNT * 0.6) : POINT_COUNT;
        points = [];
        for (var i = 0; i < count; i++) {
            points.push(makePoint());
        }
    }

    function step() {
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
        }
    }

    function linkAlpha(dist, maxDist, peak) {
        return Math.max(0, 1 - dist / maxDist) * peak;
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        for (var i = 0; i < points.length; i++) {
            for (var j = i + 1; j < points.length; j++) {
                var dx = points[i].x - points[j].x;
                var dy = points[i].y - points[j].y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < LINK_DIST) {
                    ctx.strokeStyle = 'rgba(' + LINE_COLOR + ', ' + linkAlpha(dist, LINK_DIST, 0.35) + ')';
                    ctx.beginPath();
                    ctx.moveTo(points[i].x, points[i].y);
                    ctx.lineTo(points[j].x, points[j].y);
                    ctx.stroke();
                }
            }

            if (mouse.x !== null) {
                var mdx = points[i].x - mouse.x;
                var mdy = points[i].y - mouse.y;
                var mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                var mouseLinkDist = LINK_DIST * 1.4;
                if (mdist < mouseLinkDist) {
                    ctx.strokeStyle = 'rgba(' + LINE_COLOR + ', ' + linkAlpha(mdist, mouseLinkDist, 0.5) + ')';
                    ctx.beginPath();
                    ctx.moveTo(points[i].x, points[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }

        ctx.fillStyle = 'rgba(' + DOT_COLOR + ', 0.8)';
        for (var k = 0; k < points.length; k++) {
            ctx.beginPath();
            ctx.arc(points[k].x, points[k].y, 1.4, 0, Math.PI * 2);
            ctx.fill();
        }

        if (mouse.x !== null) {
            ctx.fillStyle = 'rgba(' + LINE_COLOR + ', 0.9)';
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 2.4, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function loop() {
        step();
        draw();
        requestAnimationFrame(loop);
    }

    init();
    draw();

    if (!reduceMotion) {
        requestAnimationFrame(loop);
        window.addEventListener('mousemove', function (e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
    }

    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            init();
            draw();
        }, 150);
    });
})();
