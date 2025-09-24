# Age of Mythology: Retold - Player Statistics Website

A comprehensive web application for tracking and displaying player statistics, rankings, and match history for Age of Mythology: Retold. Built with modern web technologies and integrated with real-time data from the aomstats.io API.

Link to view: https://cbieks.github.io/aom-retold-website/

## 🎮 Features

### **Real-Time Player Statistics**
- **Live Leaderboard** - View top players across different game modes
- **Player Search** - Find any player with autocomplete suggestions
- **Detailed Profiles** - Comprehensive player statistics and match history
- **Clan Support** - Display clan tags and affiliations

### **Multiple Game Modes**
- **Supremacy 1v1** - Ranked individual matches
- **Supremacy Team** - Team-based ranked matches
- **Deathmatch 1v1** - Individual deathmatch rankings
- **Deathmatch Team** - Team deathmatch rankings

### **Advanced Features**
- **Match History** - Recent games with win/loss results
- **Rating Changes** - Track ELO progression over time
- **God Statistics** - Favorite gods and performance data
- **Real-Time Updates** - Data refreshes weekly from official sources

## 🛠️ Technical Stack

### **Frontend**
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with animations and responsive design
- **Vanilla JavaScript** - No frameworks, pure performance
- **Pako.js** - Client-side gzip decompression

### **Data Sources**
- **aomstats.io API** - Official weekly database dumps
- **CORS Proxy** - api.codetabs.com for cross-origin requests
- **Local Caching** - Browser localStorage for performance

### **Deployment Options**
- **GitHub Pages** - Static hosting with API integration
- **Apache Tomcat** - Java servlet for server-side proxy
- **Local Development** - Python HTTP server or npx serve

## 📊 Data Architecture

### **API Integration**
```javascript
// Weekly data updates from aomstats.io
const API_ENDPOINT = 'https://aomstats.io/api/db_dumps';
const LEADERBOARD_URL = 'https://aomstats.io/static/db_dumps/leaderboard_dump.csv.gz';
```

### **Data Processing**
- **CSV Parsing** - Efficient chunked processing for large datasets
- **Gzip Decompression** - Client-side decompression of compressed files
- **Data Filtering** - Leaderboard-specific player filtering
- **Performance Optimization** - Lazy loading and pagination

### **Caching Strategy**
- **30-minute cache** - Reduces API calls and improves performance
- **Top 10,000 players** - Cached for quick access
- **Automatic refresh** - Updates when cache expires

## 🎯 Key Features Explained

### **Player Search with Autocomplete**
```javascript
// Real-time search with clan tag support
function handleSearchInput() {
    let query = playerSearch.value.trim();
    query = query.replace(/^\[.*?\]/, ''); // Strip clan tags
    // Search logic...
}
```

### **Dynamic Leaderboard**
- **Pagination** - 100 players per page for optimal performance
- **Batch Rendering** - Prevents UI freezing with large datasets
- **Real-time Filtering** - Switch between game modes instantly

### **Match History System**
- **Recent Matches** - Last 10 games with detailed information
- **Win/Loss Tracking** - Visual indicators for match results
- **Rating Changes** - ELO progression for ranked matches
- **Filter Options** - Separate ranked and custom games

## 🔧 Installation & Setup

### **Local Development**
```bash
# Clone the repository
git clone https://github.com/cbieks/aom-retold-website.git
cd aom-retold-website

# Start local server
python -m http.server 8000
# OR
npx serve .

# Open browser
http://localhost:8000
```

### **Tomcat Deployment**
```bash
# Copy files to Tomcat webapps
xcopy /E /I . "C:\Program Files\Apache Software Foundation\Tomcat 10.1\webapps\aom-stats-website\"

# Start Tomcat
# Access at http://localhost:8080/aom-stats-website/
```

### **GitHub Pages**
1. Fork the repository
2. Enable GitHub Pages in repository settings
3. Select source branch (usually `main`)
4. Site will be available at `https://username.github.io/aom-retold-website/`

## 📈 Performance Optimizations

### **Data Loading**
- **Chunked Processing** - 10,000 row chunks prevent browser freezing
- **Progress Indicators** - Visual feedback during data loading
- **Timeout Handling** - 15-second timeout prevents hanging requests
- **Error Recovery** - Graceful fallback to mock data if API fails

### **UI Performance**
- **Batch Rendering** - 25 rows per frame using requestAnimationFrame
- **Lazy Loading** - Load more players on demand
- **Efficient DOM Updates** - Minimal re-rendering for better performance

### **Memory Management**
- **Array Pre-allocation** - Better performance for large datasets
- **Garbage Collection** - Proper cleanup of event listeners
- **Cache Limits** - Prevents memory overflow with large datasets

## 🎨 Design Features

### **Visual Design**
- **Mythological Theme** - Age of Mythology: Retold inspired design
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Smooth Animations** - CSS transitions and hover effects
- **Loading States** - Clear feedback during data operations

### **User Experience**
- **Intuitive Navigation** - Easy-to-use interface
- **Search Functionality** - Quick player lookup
- **Data Visualization** - Clear presentation of statistics
- **Error Handling** - User-friendly error messages

## 🔄 Data Update Cycle

### **Weekly Updates**
- **Sunday 4:00 PM UTC** - New data available on aomstats.io
- **Automatic Refresh** - Site fetches latest data on user visits
- **Cache Management** - 30-minute cache with automatic expiration
- **Real-time Status** - API status indicator shows data source

### **Data Sources**
- **Official API** - aomstats.io weekly database dumps
- **300,000+ Players** - Comprehensive player database
- **Match History** - Recent games and statistics
- **Leaderboard Data** - Current rankings and ratings

## 🐛 Troubleshooting

### **Common Issues**
- **Slow Loading** - Check network connection and API status
- **CORS Errors** - Ensure using CORS proxy or local server
- **Data Not Loading** - Clear browser cache and refresh
- **Performance Issues** - Reduce initial load size in settings

### **Debug Tools**
```javascript
// Available in browser console
debugAOM.allPlayers()     // View loaded players
debugAOM.csvCache()       // Check cached data
debugAOM.forceReload()    // Force fresh data load
debugAOM.clearCache()     // Clear all cached data
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **aomstats.io** - For providing the comprehensive database dumps
- **Age of Mythology: Retold** - Microsoft and Relic Entertainment
- **Community** - Age of Mythology players and contributors

## 📞 Contact

- **GitHub:** [@cbieks](https://github.com/cbieks)
- **Website:** [https://cbieks.github.io/aom-retold-website/](https://cbieks.github.io/aom-retold-website/)

---

**Note:** This project is not affiliated with Microsoft or Relic Entertainment. All game data is sourced from publicly available APIs and database dumps.
