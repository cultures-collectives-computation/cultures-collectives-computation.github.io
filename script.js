(function () {
  const canvas = document.getElementById('network-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const config = {
    nodeColor: 'rgba(74, 95, 140, 0.85)',
    accentNodes: [
      'rgba(192, 100, 74, 0.95)',
      'rgba(79, 143, 138, 0.95)',
      'rgba(74, 95, 140, 0.95)',
    ],
    density: 0.00014,
    maxDistance: 160,
    nodeRadius: 2.2,
    accentRadius: 3.4,
    speed: 0.18,
    lineOpacityScale: 0.55,
  };

  let nodes = [];
  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let rafId = null;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const target = Math.max(28, Math.floor(width * height * config.density));
    if (nodes.length !== target) initNodes(target);
  }

  function initNodes(count) {
    nodes = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * config.speed,
        vy: (Math.random() - 0.5) * config.speed,
        accent: i % 11 === 0 ? config.accentNodes[i % 3] : null,
      });
    }
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < config.maxDistance) {
          const alpha = 1 - dist / config.maxDistance;
          ctx.strokeStyle = `rgba(74, 95, 140, ${alpha * config.lineOpacityScale})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      ctx.beginPath();
      ctx.fillStyle = n.accent || config.nodeColor;
      ctx.arc(n.x, n.y, n.accent ? config.accentRadius : config.nodeRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(step);
    }
  }

  function start() {
    resize();
    if (rafId) cancelAnimationFrame(rafId);
    step();
  }

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(start, 100);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!rafId && !prefersReducedMotion) {
      step();
    }
  });

  start();
})();
