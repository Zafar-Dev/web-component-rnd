import WeatherWidget from '../../../src/components/WeatherWidget';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Next.js Weather Widget Example</h1>
        <p>Server-side rendered React Web Component Widget</p>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h2>Weather Dashboard</h2>
          <div className={styles.widgetsShowcase}>
            <WeatherWidget 
              city="London" 
              theme="light" 
              showForecast={true}
            />
            <WeatherWidget 
              city="Tokyo" 
              theme="dark" 
              showForecast={true}
            />
          </div>
        </section>

        <section className={styles.grid}>
          <div className={styles.card}>
            <h3>Shadow DOM Encapsulation</h3>
            <p>Each widget is completely isolated with its own styles</p>
            <WeatherWidget city="Paris" theme="light" showForecast={false} />
          </div>

          <div className={styles.card}>
            <h3>Theme Support</h3>
            <p>Built-in light and dark theme variants</p>
            <WeatherWidget city="Sydney" theme="dark" showForecast={false} />
          </div>

          <div className={styles.card}>
            <h3>Responsive Design</h3>
            <p>Works perfectly on all device sizes</p>
            <WeatherWidget city="Mumbai" theme="light" showForecast={true} />
          </div>

          <div className={styles.card}>
            <h3>Easy Integration</h3>
            <p>Drop-in component for any React/Next.js app</p>
            <WeatherWidget city="Berlin" theme="dark" showForecast={true} />
          </div>
        </section>

        <section className={styles.usageExample}>
          <h2>Usage Example</h2>
          <pre><code>{`import { WeatherWidget } from '@your-org/react-web-component-widget';

export default function MyPage() {
  return (
    <div>
      <WeatherWidget 
        city="London" 
        theme="light" 
        showForecast={true}
      />
    </div>
  );
}`}</code></pre>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Built with Next.js and React Web Component Widget</p>
      </footer>
    </div>
  );
}
