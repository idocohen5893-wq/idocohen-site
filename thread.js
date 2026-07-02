(function () {
  "use strict";

  var html = document.documentElement;
  html.classList.add("js");

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var svg = document.getElementById("thread");
  var NS = "http://www.w3.org/2000/svg";
  var path = document.createElementNS(NS, "path");
  var circle = document.createElementNS(NS, "circle");
  circle.setAttribute("r", "3");
  svg.appendChild(path);
  svg.appendChild(circle);

  var JITTER = [0.9, -1.0, 0.7, -0.5, 0.35, -0.28, 0.18, -0.08, 0];
  var main = document.getElementById("main");

  var pathLength = 0;
  var p = 0;
  var raf = null;
  var resizeTimer = null;

  function breakpoint() {
    var w = window.innerWidth;
    if (w < 720) return "mobile";
    if (w < 1100) return "tablet";
    return "desktop";
  }

  function docHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
  }

  function buildPoints() {
    var bp = breakpoint();
    var anchors = document.querySelectorAll("[data-thread]");
    var mainRect = main.getBoundingClientRect();
    var colLeft = mainRect.left + window.scrollX;

    var baseX, ampMax, topOffset;
    if (bp === "desktop") {
      baseX = colLeft - 48;
      ampMax = 34;
      topOffset = 26;
    } else if (bp === "tablet") {
      baseX = Math.max(colLeft - 28, 16);
      ampMax = 24;
      topOffset = 18;
    } else {
      baseX = 18;
      ampMax = 14;
      topOffset = 10;
    }

    var n = anchors.length;
    var points = [];
    for (var i = 0; i < n; i++) {
      var rect = anchors[i].getBoundingClientRect();
      var y = rect.top + window.scrollY + rect.height / 2;
      var amp = n > 1 ? ampMax * (1 - i / (n - 1)) : 0;
      var jitter = JITTER[i] !== undefined ? JITTER[i] : 0;
      var x = bp === "mobile" ? baseX + jitter * amp : baseX + jitter * amp;
      points.push({ x: x, y: y });
    }

    if (points.length) {
      var first = points[0];
      points.unshift({ x: first.x + topOffset, y: first.y - 90 });
    }

    return points;
  }

  function catmullRomToBezier(pts, tension) {
    if (pts.length < 2) return "";
    var d = "M " + pts[0].x + " " + pts[0].y + " ";
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i];
      var p1 = pts[i];
      var p2 = pts[i + 1];
      var p3 = pts[i + 2] || p2;

      var c1x = p1.x + ((p2.x - p0.x) / 6) * tension * 3;
      var c1y = p1.y + ((p2.y - p0.y) / 6) * tension * 3;
      var c2x = p2.x - ((p3.x - p1.x) / 6) * tension * 3;
      var c2y = p2.y - ((p3.y - p1.y) / 6) * tension * 3;

      d += "C " + c1x + " " + c1y + ", " + c2x + " " + c2y + ", " + p2.x + " " + p2.y + " ";
    }
    return d;
  }

  function generatePath() {
    svg.style.height = docHeight() + "px";

    var points = buildPoints();
    if (!points.length) return;

    var d = catmullRomToBezier(points, 0.5);
    path.setAttribute("d", d);

    var last = points[points.length - 1];
    circle.setAttribute("cx", last.x);
    circle.setAttribute("cy", last.y);

    pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;

    applyProgress();
  }

  function applyProgress() {
    var offset = pathLength * (1 - p);
    path.style.strokeDashoffset = offset;
    circle.style.opacity = p >= 0.985 ? 1 : 0;
  }

  function currentT() {
    var max = docHeight() - window.innerHeight;
    if (max <= 0) return 1;
    var t = window.scrollY / max;
    return Math.min(1, Math.max(0, t));
  }

  function tick() {
    var t = currentT();
    p += (t - p) * 0.08;
    applyProgress();
    if (Math.abs(t - p) > 0.001) {
      raf = requestAnimationFrame(tick);
    } else {
      p = t;
      applyProgress();
      raf = null;
    }
  }

  function ensureLoop() {
    if (reduced) return;
    if (raf === null) raf = requestAnimationFrame(tick);
  }

  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      generatePath();
      ensureLoop();
    }, 150);
  }

  generatePath();

  if (reduced) {
    p = 1;
    applyProgress();
  } else {
    window.addEventListener("scroll", ensureLoop, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
  }

  if (!reduced && "IntersectionObserver" in window) {
    var fadeTargets = document.querySelectorAll("main > section, footer#contact");
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    fadeTargets.forEach(function (el) {
      io.observe(el);
    });
  }
})();
