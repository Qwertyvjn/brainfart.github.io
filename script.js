// TEST VERSION — ONLY THEME TOGGLE + CARBON COUNTER
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Script loaded successfully!');

  // Theme toggle
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      console.log('🎯 Theme toggled!');
      document.documentElement.classList.toggle('dark');
    });
  } else {
    console.error('❌ #theme-toggle not found');
  }

  // Carbon counter
  let sec = 0;
  const timeEl = document.getElementById('time-spent');
  const co2El = document.getElementById('carbon-value');
  const equivEl = document.getElementById('equivalent');

  if (timeEl && co2El && equivEl) {
    setInterval(() => {
      sec++;
      timeEl.textContent = sec;
      const co2 = (sec * 0.0003).toFixed(1);
      co2El.textContent = co2;
      equivEl.textContent = `${(co2 * 1).toFixed(3)} g of rice`;
    }, 1000);
    console.log('✅ Carbon counter started');
  } else {
    console.error('❌ Carbon elements missing:', { timeEl, co2El, equivEl });
  }

  // Pulse fallback (static)
  const pulseDisplay = document.getElementById('aqi-display');
  const locationData = document.getElementById('location-data');
  if (pulseDisplay && locationData) {
    locationData.classList.add('hidden');
    pulseDisplay.classList.remove('hidden');
    document.getElementById('city-name').textContent = 'Jakarta';
    document.getElementById('aqi-value').textContent = '78';
    document.getElementById('aqi-category').textContent = 'Moderate';
    document.getElementById('co2-value').textContent = '470';
    document.getElementById('temp-value').textContent = '29';
    console.log('✅ Pulse fallback loaded');
  }
});
