📰 TrendyNews
A real-time news aggregator built with React.js that pulls live headlines from NewsAPI across categories like sports, politics, entertainment, health, and fitness.
Show Image
Show Image
Show Image
Show Image

✨ Features

🔍 Live search with 500ms debounce
📂 Category filters — Sports, Politics, Entertainment, Health, Fitness
📄 Client-side pagination — no extra API calls
⚡ useRef caching — same search never hits API twice
🖼️ Lazy loading with LCP image optimization
♿ Fully accessible — ARIA roles and keyboard navigation
📱 Responsive on all screen sizes


🛠️ Tech Stack
React.js, Vite, NewsAPI, CSS Grid

⚙️ Getting Started
bashgit clone https://github.com/yourusername/trendy-news.git
cd trendy-news
npm install
npm run dev
Create a .env file in the root:
VITE_NEWS_API_KEY=your_api_key_here
Get your free key at newsapi.org

⚠️ Note
NewsAPI free plan blocks page 2+ requests. This app fetches all 100 results in one call and paginates on the client side to work around this.

📄 License
MIT