document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Load saved theme or use system preference
  const saved = localStorage.getItem('theme');
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'light' || (!saved && !systemDark)) {
    root.classList.remove('dark');
    root.classList.add('light');
  }

  // Toggle theme
  toggle.addEventListener('click', () => {
    const isDark = root.classList.contains('dark');
    
    if (isDark) {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }

    // Optional: Add ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      pointer-events: none;
      z-index: 1;
    `;
    const rect = toggle.getBoundingClientRect();
    ripple.style.left = `${rect.left + rect.width / 2 - 20}px`;
    ripple.style.top = `${rect.top + rect.height / 2 - 20}px`;
    
    document.body.appendChild(ripple);
    
    // Animate ripple
    setTimeout(() => {
      ripple.style.transition = 'transform 0.6s, opacity 0.6s';
      ripple.style.transform = 'scale(3)';
      ripple.style.opacity = '0';
    }, 10);

    // Remove after animation
    setTimeout(() => {
      ripple.remove();
    }, 700);
  });
});
