document.addEventListener('DOMContentLoaded', async () => {
  // Load content
  const content = await fetch('content.json').then(r => r.json());

  // Render hero
  document.getElementById('hero').innerHTML = `
    <h1>${content.hero.title}</h1>
    <p>${content.hero.description}</p>
  `;

  // Render simulations
  const simHtml = content.simulations.map(sim => `
    <div class="card">
      <h3>${sim.emoji} ${sim.title}</h3>
      <p><strong>${sim.tagline}:</strong> ${sim.description}</p>
      <div class="embed-placeholder">${sim.embedPlaceholder}</div>
      <a href="#" class="card-link">${sim.linkText}</a>
    </div>
  `).join('');
  
  document.getElementById('simulations').innerHTML = `
    <h2>🔬 Featured Simulations</h2>
    <div class="grid">${simHtml}</div>
  `;

  // Render data
  document.getElementById('data').innerHTML = `
    <h2>📊 ${content.data.title}</h2>
    <p>${content.data.description}</p>
    <div class="card full">
      <div class="embed-placeholder large">${content.data.embedPlaceholder}</div>
    </div>
  `;

  // Render pulse (fallback only for now)
  const p = content.pulse.fallback;
  document.getElementById('pulse').innerHTML = `
    <h2>${content.pulse.title}</h2>
    <div class="card">
      <p><strong>📍 City:</strong> ${p.city}</p>
      <p><strong>Air Quality:</strong> ${p.aqi} (${p.category})</p>
      <p><strong>CO₂:</strong> ${p.co2} ppm</p>
      <p><strong>Temp:</strong> ${p.temp}°C</p>
    </div>
  `;

  // Render concepts
  const conceptHtml = content.concepts.map(c => `
    <div class="card concept">
      <a href="#" class="card-title">${c.title}</a>
      <p class="card-desc">${c.description}</p>
    </div>
  `).join('');

  document.getElementById('concepts').innerHTML = `
    <h2>📚 Featured Concepts</h2>
    <p>My long-form analysis, academic summaries, and articles exploring the theoretical underpinnings of sustainability.</p>
    <div class="grid">${conceptHtml}</div>
  `;

  // Theme toggle
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('theme') || 'dark';
  root.classList.toggle('light', saved === 'light');
  root.classList.toggle('dark', saved === 'dark');

  toggle.addEventListener('click', () => {
    const isDark = root.classList.contains('dark');
    root.classList.toggle('light', isDark);
    root.classList.toggle('dark', !isDark);
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });
});

// Render pulse
const p = content.pulse.fallback;
document.getElementById('pulse').innerHTML = `
  <h2>${content.pulse.title}</h2>
  <div class="card">
    <div class="city-header">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.27-.13-.53-.23-.75C5.3 10.4 4 9.1 4 7.5 4 5.9 5.3 4.6 7 4.6c1.7 0 3 1.3 3 2.9 0 1.6-1.3 2.9-3 2.9 0 0-1 0-1-1h2c>
