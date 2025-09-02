<!-- examples/vue-example.vue -->
<template>
  <div class="weather-app">
    <h1>Vue.js Weather Widget Example</h1>
    
    <div class="widget-grid">
      <!-- Using as custom elements -->
      <div class="widget-card">
        <h2>London Weather</h2>
        <weather-widget 
          city="London" 
          theme="light" 
          show-forecast="true">
        </weather-widget>
      </div>
      
      <div class="widget-card">
        <h2>Tokyo Weather (Dark)</h2>
        <weather-widget 
          city="Tokyo" 
          theme="dark" 
          show-forecast="true">
        </weather-widget>
      </div>
      
      <div class="widget-card">
        <h2>New York Weather (Minimal)</h2>
        <weather-widget 
          city="New York" 
          theme="light" 
          show-forecast="false">
        </weather-widget>
      </div>
    </div>
  </div>
</template>

<script>
// Import the widget library to register the custom elements
import '@your-org/react-web-component-widget';

export default {
  name: 'WeatherApp',
  mounted() {
    console.log('Weather widgets should be rendered');
  }
}
</script>

<style scoped>
.weather-app {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.widget-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.widget-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.widget-card h2 {
  margin: 0 0 16px 0;
  color: #333;
  font-size: 1.2rem;
}

h1 {
  color: #333;
  text-align: center;
}
</style>
