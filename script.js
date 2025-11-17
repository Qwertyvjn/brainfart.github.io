// ===== TODAY'S PULSE — IQAir Integration (Safe & Robust) =====

function getLocation() {
    const locationData = document.getElementById('location-data');
    if (!locationData) return;

    // Check if the placeholder API key is still present
    if (fetchIQAirData.toString().includes(f74e14f9-86c9-4246-8065-ec2018624690)) {
        locationData.textContent = '⚠️ Please replace YOUR_IQAIR_API_KEY with your actual key.';
        return;
    }

    locationData.textContent = '📍 Detecting your location...';
    locationData.classList.remove('hidden');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            success => fetchIQAirData(success.coords.latitude, success.coords.longitude),
            error => {
                console.warn('Geolocation denied or failed:', error);
                locationData.textContent = '❌ Location denied/failed. Using Jakarta.';
                fetchIQAirData(-6.2088, 106.8456); // Jakarta fallback
            },
            { timeout: 10000 } // Add a timeout option for better handling
        );
    } else {
        locationData.textContent = '❌ Geolocation not supported. Using Jakarta.';
        fetchIQAirData(-6.2088, 106.8456);
    }
}

async function fetchIQAirData(lat, lon) {
    // 1. 🛑 FIX: Ensure you replace this placeholder key!
    const API_KEY = 'YOUR_IQAIR_API_KEY'; // 🔑 REPLACE THIS WITH YOUR KEY

    const url = `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${API_KEY}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.status !== 'success' || !data.data) {
            throw new Error(`Invalid response from IQAir. Status: ${data.status} | Message: ${data.data.message || 'No data.'}`);
        }
        
        // ... (rest of your successful data processing code) ...
        const city = data.data.city || 'Nearby City';
        const state = data.data.state || '';
        const aqius = data.data.current.pollution.aqius;
        const tempC = data.data.current.weather.tp;
        const co2Estimate = Math.round(400 + (aqius / 300) * 150);

        // AQI Category Mapping
        const categories = [
            { max: 50, name: 'Good', color: '#00e400' },
            { max: 100, name: 'Moderate', color: '#ffff00' },
            { max: 150, name: 'Unhealthy for Sensitive', color: '#ff7e00' },
            { max: 200, name: 'Unhealthy', color: '#ff0000' },
            { max: 300, name: 'Very Unhealthy', color: '#8f3f97' },
            { max: Infinity, name: 'Hazardous', color: '#7e0023' }
        ];
        const category = categories.find(c => aqius <= c.max) || categories[0];

        // DOM Elements
        const locationData = document.getElementById('location-data');
        const aqiDisplay = document.getElementById('aqi-display');
        const cityName = document.getElementById('city-name');
        const aqiValue = document.getElementById('aqi-value');
        const aqiCategory = document.getElementById('aqi-category');
        const co2Value = document.getElementById('co2-value');
        const tempValue = document.getElementById('temp-value');

        if (!aqiDisplay || !cityName || !aqiValue || !aqiCategory || !co2Value || !tempValue || !locationData) {
            throw new Error('Required DOM elements missing');
        }

        cityName.textContent = `${city}${state ? `, ${state}` : ''}`;
        aqiValue.textContent = aqius;
        aqiCategory.textContent = category.name;
        aqiCategory.style.color = category.color;
        co2Value.textContent = co2Estimate;
        tempValue.textContent = tempC;

        locationData.classList.add('hidden');
        aqiDisplay.classList.remove('hidden');
    } catch (err) {
        console.error('IQAir error:', err);
        const locationData = document.getElementById('location-data');
        const aqiDisplay = document.getElementById('aqi-display');
        if (locationData) {
            locationData.textContent = `⚠️ Data unavailable. See console for error.`;
        }
        if (aqiDisplay) aqiDisplay.classList.add('hidden');
    }
}

// ===== CORE INITIALIZATION (FIXED) =====
document.addEventListener('DOMContentLoaded', () => {
    // 3. ✅ FIX: THEME TOGGLE
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Toggle the 'dark' class on the <html> element
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
        });
        
        // Initial state check for visual consistency (optional)
        if (document.documentElement.classList.contains('dark')) {
             // You can add logic here to visually reflect the dark state on the button itself
        }
    }


    // 2. ✅ FIX: CARBON FOOTPRINT COUNTER
    let secondsSpent = 0;
    const timeSpentEl = document.getElementById('time-spent');
    const carbonValueEl = document.getElementById('carbon-value');
    const equivalentEl = document.getElementById('equivalent');

    if (timeSpentEl && carbonValueEl && equivalentEl) {
        // Run the counter function every 1000 milliseconds (1 second)
        setInterval(() => {
            secondsSpent++;
            timeSpentEl.textContent = secondsSpent;
            // Your CO2 calculation: (secondsSpent * 0.0003 g/s)
            const co2Grams = (secondsSpent * 0.0003).toFixed(1); 
            carbonValueEl.textContent = co2Grams;
            
            // Your Rice Equivalent calculation (0.001 g rice is not 0.001 g CO2, 
            // so I adjusted the factor based on your example `0.001 g of rice` for `0.0 g CO2`):
            const riceEquivalent = (parseFloat(co2Grams) * 3333.33).toFixed(3); // 1g CO2 = ~3333g rice for your initial 0.001g example
            equivalentEl.textContent = `${riceEquivalent} g of rice`;
        }, 1000);
    }

    // 1. ✅ FIX: AIR QUALITY METER
    getLocation();
});
