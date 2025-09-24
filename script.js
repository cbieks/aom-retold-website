// Age of Mythology: Retold - Player Statistics Website
// Main JavaScript file

// Mock data for demonstration
const mockPlayers = [
    {
        id: 1,
        username: 'ZeusMaster',
        rating: 2456,
        wins: 342,
        losses: 89,
        winRate: 79.4,
        favoriteGod: 'Zeus',
        rank: 1,
        totalMatches: 431,
        avgMatchDuration: '12:34',
        currentStreak: 8,
        bestStreak: 15,
        eloHistory: [2400, 2410, 2425, 2440, 2456],
        recentMatches: [
            { opponent: "PoseidonKing", result: "W", rating: "+12" },
            { opponent: "HadesLord", result: "W", rating: "+8" },
            { opponent: "AthenaWarrior", result: "L", rating: "-15" }
        ]
    },
    {
        id: 2,
        username: 'PoseidonKing',
        rating: 2389,
        wins: 298,
        losses: 112,
        winRate: 72.7,
        favoriteGod: 'Poseidon',
        rank: 2,
        totalMatches: 410,
        avgMatchDuration: '11:45',
        currentStreak: 3,
        bestStreak: 12,
        eloHistory: [2350, 2365, 2378, 2385, 2389],
        recentMatches: [
            { opponent: "ZeusMaster", result: "L", rating: "-12" },
            { opponent: "HadesLord", result: "W", rating: "+10" },
            { opponent: "AresFighter", result: "W", rating: "+7" }
        ]
    },
    {
        id: 3,
        username: 'HadesLord',
        rating: 2321,
        wins: 267,
        losses: 98,
        winRate: 73.2,
        favoriteGod: 'Hades',
        rank: 3,
        totalMatches: 365,
        avgMatchDuration: '13:22',
        currentStreak: 5,
        bestStreak: 18,
        eloHistory: [2280, 2295, 2308, 2315, 2321],
        recentMatches: [
            { opponent: "PoseidonKing", result: "L", rating: "-10" },
            { opponent: "AthenaWarrior", result: "W", rating: "+9" },
            { opponent: "ApolloArcher", result: "W", rating: "+6" }
        ]
    },
    {
        id: 4,
        username: 'AthenaWarrior',
        rating: 2287,
        wins: 245,
        losses: 89,
        winRate: 73.4,
        favoriteGod: 'Athena',
        rank: 4,
        totalMatches: 334,
        avgMatchDuration: '10:58',
        currentStreak: 2,
        bestStreak: 14,
        eloHistory: [2250, 2265, 2278, 2282, 2287],
        recentMatches: [
            { opponent: "ZeusMaster", result: "W", rating: "+15" },
            { opponent: "HadesLord", result: "L", rating: "-9" },
            { opponent: "AresFighter", result: "W", rating: "+8" }
        ]
    },
    {
        id: 5,
        username: 'AresFighter',
        rating: 2245,
        wins: 289,
        losses: 134,
        winRate: 68.3,
        favoriteGod: 'Ares',
        rank: 5,
        totalMatches: 423,
        avgMatchDuration: '9:45',
        currentStreak: 1,
        bestStreak: 11,
        eloHistory: [2200, 2215, 2228, 2235, 2245],
        recentMatches: [
            { opponent: "AthenaWarrior", result: "L", rating: "-8" },
            { opponent: "ApolloArcher", result: "W", rating: "+12" },
            { opponent: "DionysusBrewer", result: "W", rating: "+5" }
        ]
    },
    {
        id: 6,
        username: 'ApolloArcher',
        rating: 2198,
        wins: 234,
        losses: 156,
        winRate: 60.0,
        favoriteGod: 'Apollo',
        rank: 6,
        totalMatches: 390,
        avgMatchDuration: '12:00',
        currentStreak: 2,
        bestStreak: 9,
        eloHistory: [2150, 2165, 2178, 2185, 2198],
        recentMatches: [
            { opponent: "AresFighter", result: "L", rating: "-12" },
            { opponent: "DionysusBrewer", result: "W", rating: "+8" },
            { opponent: "HermesRunner", result: "W", rating: "+6" }
        ]
    },
    {
        id: 7,
        username: 'DionysusBrewer',
        rating: 2156,
        wins: 198,
        losses: 142,
        winRate: 58.2,
        favoriteGod: 'Dionysus',
        rank: 7,
        totalMatches: 340,
        avgMatchDuration: '11:20',
        currentStreak: 0,
        bestStreak: 7,
        eloHistory: [2100, 2115, 2128, 2135, 2156],
        recentMatches: [
            { opponent: "ApolloArcher", result: "L", rating: "-8" },
            { opponent: "HermesRunner", result: "W", rating: "+10" },
            { opponent: "ZeusMaster", result: "L", rating: "-15" }
        ]
    },
    {
        id: 8,
        username: 'HermesRunner',
        rating: 2123,
        wins: 267,
        losses: 189,
        winRate: 58.5,
        favoriteGod: 'Hermes',
        rank: 8,
        totalMatches: 456,
        avgMatchDuration: '10:30',
        currentStreak: 4,
        bestStreak: 8,
        eloHistory: [2050, 2065, 2078, 2085, 2123],
        recentMatches: [
            { opponent: "DionysusBrewer", result: "L", rating: "-10" },
            { opponent: "PoseidonKing", result: "W", rating: "+7" },
            { opponent: "HadesLord", result: "W", rating: "+5" }
        ]
    }
];

// API Configuration
const API_CONFIG = {
    APIS: [
        {
            name: 'aomstats.io-dumps',
            baseUrl: 'https://aomstats.io/api/db_dumps',
            dataType: 'csv-dumps',
            available: false,
            endpoints: {
                LEADERBOARD: '', // Will parse CSV data
                PLAYERS: '',
                MATCHES: ''
            }
        },
        {
            name: 'worlds-edge-community',
            baseUrl: 'https://api.worlds-edge-community.com',
            dataType: 'live-api',
            available: false,
            endpoints: {
                LEADERBOARD: '/aom/leaderboard',
                PLAYERS: '/aom/players',
                MATCHES: '/aom/matches'
            }
        },
        {
            name: 'xbox-live-api',
            baseUrl: 'https://api.xboxlive.com',
            dataType: 'live-api',
            available: false,
            endpoints: {
                LEADERBOARD: '/aom/leaderboard',
                PLAYERS: '/aom/players',
                MATCHES: '/aom/matches'
            }
        },
        {
            name: 'mock-data',
            baseUrl: 'localhost',
            dataType: 'mock',
            available: true,
            endpoints: {
                LEADERBOARD: '/leaderboard',
                PLAYERS: '/players',
                MATCHES: '/matches'
            }
        }
    ],
    activeApi: null
};

// Global state
let allPlayers = [...mockPlayers];
let searchTimeout = null;
let currentSuggestions = [];
let csvDataCache = {
    players: null,
    matches: null,
    leaderboard: null,
    lastUpdated: null
};

// Cache settings
const CACHE_KEY = 'aom_stats_cache';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Loading state
let isLoading = false;

// Leaderboard pagination
let currentPage = 1;
const playersPerPage = 100;
let currentLeaderboardType = 'supremacy-1v1';

// DOM Elements
const playerSearch = document.getElementById('playerSearch');
const searchBtn = document.getElementById('searchBtn');
const searchSuggestions = document.getElementById('searchSuggestions');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const loadMoreContainer = document.getElementById('loadMoreContainer');
const loadedCount = document.getElementById('loadedCount');
const totalCount = document.getElementById('totalCount');
const searchResults = document.getElementById('searchResults');
const playerStats = document.getElementById('playerStats');
const closeResults = document.getElementById('closeResults');
const leaderboard = document.getElementById('leaderboard');
const leaderboardBody = document.getElementById('leaderboardBody');
const globalStats = document.getElementById('globalStats');
const filterBtns = document.querySelectorAll('.filter-btn');
const loadingOverlay = document.getElementById('loadingOverlay');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupEventListeners();
    
    
    // Add global cache clear function for debugging
    window.clearCache = () => {
        console.log('🗑️ Clearing cache...');
        localStorage.removeItem(CACHE_KEY);
        csvDataCache = { players: null, matches: null, leaderboard: null, lastUpdated: null };
        allPlayers = [...mockPlayers];
        console.log('✅ Cache cleared');
        location.reload();
    };
    
    // Add function to force fresh data load
    window.forceFreshLoad = () => {
        console.log('🔄 Forcing fresh data load...');
        localStorage.removeItem(CACHE_KEY);
        csvDataCache = { players: null, matches: null, leaderboard: null, lastUpdated: null };
        testAvailableAPIs().then(() => {
            updateAPIStatus();
            loadInitialData();
    animateStats();
        });
    };
    
    // Add debug function to check what's happening
    window.debugLoad = () => {
        console.log('🔍 Current state:');
        console.log('API Config:', API_CONFIG);
        console.log('All Players:', allPlayers.length);
        console.log('CSV Cache:', csvDataCache);
        console.log('Is Loading:', isLoading);
    };
    
    // Test available APIs and load data
    console.log('🔍 Testing available APIs...');
    testAvailableAPIs().then(() => {
        updateAPIStatus();
        loadInitialData();
        animateStats();
    }).catch(error => {
        console.error('❌ API testing failed, using mock data:', error);
        API_CONFIG.activeApi = API_CONFIG.APIS.find(api => api.name === 'mock-data');
        updateAPIStatus();
        loadInitialData();
    animateStats();
    });
});

function initializeWebsite() {
    // Clear initial stats - will be populated when real data loads
    document.getElementById('totalPlayers').textContent = 'Loading...';
    document.getElementById('totalMatches').textContent = 'Loading...';
    document.getElementById('avgRating').textContent = 'Loading...';
    
    // Don't populate leaderboard yet - wait for data to load
    if (leaderboardBody) {
        leaderboardBody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem; color: #999;">Loading player data...</td></tr>';
    }
}

function setupEventListeners() {
    if (playerSearch) {
        playerSearch.addEventListener('input', handleSearchInput);
        playerSearch.addEventListener('focus', handleSearchInput);
        playerSearch.addEventListener('blur', () => {
            setTimeout(() => searchSuggestions.classList.add('hidden'), 100);
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            let query = playerSearch.value.trim();
            // Remove clan tag brackets if user types them (e.g., "[CLAN]username" -> "username")
            query = query.replace(/^\[.*?\]/, '');
            if (query) {
                fetchPlayerStats(query);
            }
        });
    }

    if (closeResults) {
        closeResults.addEventListener('click', () => {
        searchResults.classList.add('hidden');
            playerStats.innerHTML = '';
    });
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMorePlayers);
    }

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);

            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Leaderboard filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            filterLeaderboard(filter);
            
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Optimized CSV Parsing with streaming
async function parseCSV(csvText, onProgress = null, maxRows = null) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const data = [];
    const totalLines = lines.length - 1;
    const processLimit = maxRows || totalLines;
    
    console.log(`📊 Parsing CSV: ${Math.min(processLimit, totalLines)} rows to process (${totalLines} total available)`);
    
        // Load from the end where ranked players are located
        let startIndex = 1;
        let endIndex = lines.length;
        
        if (maxRows && maxRows < totalLines) {
            // Load from the end of the file where ranked players are
            const sampleSize = Math.min(maxRows, totalLines);
            startIndex = Math.max(1, totalLines - sampleSize + 1);
            endIndex = lines.length;
            console.log(`📊 Loading from end: rows ${startIndex} to ${endIndex - 1} (${endIndex - startIndex} rows) to find ranked players`);
        }
    
    // Process in larger chunks for better performance
    const chunkSize = 10000;
    let processedLines = 0;
    
    for (let i = startIndex; i < endIndex && processedLines < processLimit; i += chunkSize) {
        const chunkEnd = Math.min(i + chunkSize, endIndex, i + (processLimit - processedLines));
        
        // Process chunk efficiently
        for (let j = i; j < chunkEnd; j++) {
            const line = lines[j];
            if (line.trim()) {
                const values = line.split(',');
                const row = {};
                
                for (let k = 0; k < headers.length && k < values.length; k++) {
                    row[headers[k]] = values[k].trim().replace(/"/g, '');
                }
                data.push(row);
                processedLines++;
            }
        }
        
        // Update progress less frequently
        if (onProgress && processedLines % 5000 === 0) {
            const progress = Math.round((processedLines / processLimit) * 100);
            onProgress(progress, processedLines, processLimit);
        }
        
        // Yield control to prevent UI freezing
        if (i % (chunkSize * 3) === 0) {
            await new Promise(resolve => setTimeout(resolve, 0));
        }
    }
    
    console.log(`✅ CSV parsing complete: ${data.length} records processed`);
    return data;
}

// Optimized CSV fetching with timeout and error handling
async function fetchCSVData(url, onProgress = null, maxRows = null) {
    try {
      console.log(`🌐 Fetching CSV from: ${url}`);
  
      // 15s timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.log('⏰ Request timeout, aborting...');
        controller.abort();
      }, 15000);
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'text/csv,application/csv,application/gzip,application/x-gzip',
          // User-Agent is ignored by browsers; harmless
        },
        // mode:'cors' not needed for most proxy URLs, but OK to leave
        signal: controller.signal,
      });
  
      clearTimeout(timeoutId);
  
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
  
      // Read raw bytes once; decide gzip by *bytes* or *headers*, not URL.
      const arrayBuffer = await response.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
  
      // Detect gzip by magic number 0x1f, 0x8b (31,139) or by headers.
      const contentType = (response.headers.get('content-type') || '').toLowerCase();
      const contentEncoding = (response.headers.get('content-encoding') || '').toLowerCase();
      const looksLikeGzip = bytes.length >= 2 && bytes[0] === 0x1f && bytes[1] === 0x8b;
      const headerSaysGzip =
        contentEncoding.includes('gzip') ||
        contentType.includes('application/gzip') ||
        contentType.includes('application/x-gzip');
  
      let csvText;
      if (looksLikeGzip || headerSaysGzip) {
        console.log('📦 Decompressing gzipped CSV (magic/header detected)…');
        csvText = pako.inflate(bytes, { to: 'string' });
        console.log('✅ Decompression successful');
      } else {
        // If a proxy already decompressed it, treat as plain text.
        csvText = new TextDecoder('utf-8').decode(bytes);
      }
  
      return await parseCSV(csvText, onProgress, maxRows);
  
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out - the server is taking too long to respond');
      }
      console.error('❌ CSV fetch error:', error);
      throw error;
    }
  }
  

// Optimized API testing with direct proxy usage
async function testAvailableAPIs() {
    console.log('🔍 Testing aomstats.io API...');
    
    // Check cache first (disabled temporarily to test fresh data)
    const cachedData = loadFromCache();
    if (false && cachedData && cachedData.leaderboard) { // Temporarily disabled cache
        console.log('📦 Using cached data');
        csvDataCache = cachedData;
        allPlayers = processCSVPlayers(cachedData.leaderboard);
        API_CONFIG.activeApi = API_CONFIG.APIS.find(api => api.name === 'aomstats.io-dumps');
        return;
    }

    const aomstatsApi = API_CONFIG.APIS.find(api => api.name === 'aomstats.io-dumps');
    
    try {
        console.log('🌐 Testing aomstats.io API via proxy...');
        
        // Use working proxy directly
        const proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=https%3A%2F%2Faomstats.io%2Fapi%2Fdb_dumps';
        
        const response = await fetch(proxyUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'AOM-Stats-Website/1.0'
            }
        });
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        
        const dumpsData = await response.json();
        console.log('✅ aomstats.io API available:', dumpsData);
        
        // Validate response structure
        if (!dumpsData.leaderboard || !dumpsData.leaderboard.url) {
            throw new Error('Invalid API response structure');
        }
        
        aomstatsApi.available = true;
        API_CONFIG.activeApi = aomstatsApi;
        
        // Load leaderboard data efficiently
        await loadLeaderboardData(dumpsData);
        
    } catch (error) {
        console.error('❌ aomstats.io API failed:', error.message);
        console.log('📊 Falling back to mock data');
        API_CONFIG.activeApi = API_CONFIG.APIS.find(api => api.name === 'mock-data');
    }
}

// Optimized leaderboard data loading
async function loadLeaderboardData(dumpsData) {
    try {
        console.log('📥 Loading leaderboard data...');
        console.log(`📊 Total players available: ${dumpsData.leaderboard.num_entries.toLocaleString()}`);
        
        const leaderboardUrl = `https://aomstats.io${dumpsData.leaderboard.url}`;
        const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(leaderboardUrl)}`;
        
        console.log('🌐 Fetching via proxy:', proxyUrl);
        
        // Load a smaller sample but from the very end where top players should be
        const maxPlayers = 200000; // Load 200k from the end to find ranked players
        
        const csvData = await fetchCSVData(proxyUrl, (progress, processed, total) => {
            console.log(`📊 Loading progress: ${progress}% (${processed.toLocaleString()}/${total.toLocaleString()})`);
        }, maxPlayers);
        
        console.log(`✅ Loaded ${csvData.length} player records`);
        
        // Load recent matches data (latest week)
        if (dumpsData.weekly_matches && dumpsData.weekly_matches.length > 0) {
            const latestMatch = dumpsData.weekly_matches[0]; // Most recent week
            const matchesUrl = `https://aomstats.io${latestMatch.url}`;
            const matchesProxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(matchesUrl)}`;
            
            console.log('🌐 Loading recent matches:', matchesUrl);
            
            try {
                const matchesData = await fetchCSVData(matchesProxyUrl, null, 50000); // Load 50k recent matches
                csvDataCache.matches = matchesData;
                console.log(`✅ Loaded ${matchesData.length} recent matches`);
            } catch (error) {
                console.warn('⚠️ Failed to load matches data:', error);
                csvDataCache.matches = [];
            }
        }
        
        // Process and cache the data (filter for current leaderboard type)
        const realPlayers = processCSVPlayers(csvData, currentLeaderboardType);
        allPlayers = realPlayers;
        
        // Cache the data
        csvDataCache.leaderboard = csvData;
        csvDataCache.lastUpdated = new Date();
        saveToCache(csvDataCache);
        
        console.log(`🎉 Successfully loaded ${realPlayers.length} real players from aomstats.io!`);
        console.log('🏆 Top 5 real players:', realPlayers.slice(0, 5).map(p => `${p.username} (${p.rating})`));
        console.log('📊 Sample real player data:', realPlayers[0]);
        
        
        // Success notification removed
        
    } catch (error) {
        console.error('❌ Failed to load leaderboard data:', error);
        throw error;
    }
}

// Success notification function removed

// API Functions
async function fetchPlayerSearch(query) {
    const api = API_CONFIG.activeApi;
    if (!api) return [];

    if (api.dataType === 'mock' || api.dataType === 'csv-dumps') {
        return allPlayers.filter(player =>
            player.username.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 10);
    } else {
        const url = `${api.baseUrl}${api.endpoints.PLAYERS}?query=${encodeURIComponent(query)}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Player search failed: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`❌ Player search API error:`, error);
            return [];
        }
    }
}

async function fetchPlayerStats(username) {
    const api = API_CONFIG.activeApi;
    if (!api) return null;

    let player = null;

    if (api.dataType === 'mock' || api.dataType === 'csv-dumps') {
        player = allPlayers.find(p => p.username.toLowerCase() === username.toLowerCase());
    } else {
        const url = `${api.baseUrl}${api.endpoints.PLAYERS}?username=${encodeURIComponent(username)}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Player stats failed: ${response.status}`);
            }
            player = await response.json();
        } catch (error) {
            console.error(`❌ Player stats API error:`, error);
            return null;
        }
    }

        if (player) {
            displayPlayerStats(player);
        } else {
        alert('Player not found!');
    }
}

async function fetchLeaderboard() {
    const api = API_CONFIG.activeApi;
    if (!api) return [];

    if (api.dataType === 'mock' || api.dataType === 'csv-dumps') {
        return allPlayers;
    } else {
        const url = `${api.baseUrl}${api.endpoints.LEADERBOARD}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Leaderboard failed: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`❌ Leaderboard API error:`, error);
            return [];
        }
    }
}

async function fetchGlobalStats() {
    const api = API_CONFIG.activeApi;
    if (!api) return {};

    if (api.dataType === 'mock' || api.dataType === 'csv-dumps') {
        const totalPlayers = allPlayers.length;
        const totalMatches = allPlayers.reduce((sum, p) => sum + p.totalMatches, 0);
        const avgRating = totalPlayers > 0 ? (allPlayers.reduce((sum, p) => sum + p.rating, 0) / totalPlayers).toFixed(0) : 0;
        
        return {
            totalPlayers: totalPlayers,
            totalMatches: totalMatches,
            activePlayers: totalPlayers,
            avgRating: parseInt(avgRating)
        };
    } else {
        const url = `${api.baseUrl}${api.endpoints.GLOBAL_STATS}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Global stats failed: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`❌ Global stats API error:`, error);
            return {};
        }
    }
}

// Enhanced API Status Display
function updateAPIStatus() {
    // Remove existing status
    const existingStatus = document.getElementById('api-status');
    if (existingStatus) {
        existingStatus.remove();
    }
    
    // Create status indicator
    const statusDiv = document.createElement('div');
    statusDiv.id = 'api-status';
    statusDiv.className = 'api-status';
    
    if (API_CONFIG.activeApi) {
        const api = API_CONFIG.activeApi;
        const isRealData = api.dataType === 'csv-dumps' && allPlayers.length > 8;
        const statusClass = api.available ? 'online' : 'offline';
        const dataType = isRealData ? 'Real Data' : 'Mock Data';
        
        statusDiv.innerHTML = `
            <div class="status-indicator">
                <span class="status-dot ${statusClass}"></span>
                <span class="status-text">${api.name} - ${dataType}</span>
                ${isRealData ? `<span class="player-count">(${allPlayers.length.toLocaleString()} players)</span>` : ''}
            </div>
        `;
    } else {
        statusDiv.innerHTML = `
            <div class="status-indicator">
                <span class="status-dot offline"></span>
                <span class="status-text">No API Available</span>
            </div>
        `;
    }
    
    // Add to bottom right corner
    statusDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 15px;
        border-radius: 8px;
        font-size: 12px;
        z-index: 1000;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 215, 0, 0.3);
    `;
    
    document.body.appendChild(statusDiv);
}

function displayPlayerStats(player) {
    if (!searchResults || !playerStats) return;
    
    // Get real match history
    const matchHistory = getPlayerMatchHistory(player.id, 10);
    
    searchResults.classList.remove('hidden');
    playerStats.innerHTML = `
        <div class="player-header">
            <h2 class="player-username">
                ${player.clanTag ? `<span class="clan-tag">[${player.clanTag}]</span>` : ''}${player.username}
            </h2>
            <span class="player-rating">Rating: ${player.rating}</span>
            </div>
        <div class="player-details">
            <p>Rank: #${player.rank}</p>
            <p>Wins: ${player.wins}</p>
            <p>Losses: ${player.losses}</p>
            <p>Win Rate: ${player.winRate}%</p>
            <p>Favorite God: ${player.favoriteGod}</p>
            <p>Total Matches: ${player.totalMatches}</p>
            <p>Current Streak: ${player.currentStreak}</p>
            <p>Highest Rank: ${player.highestRank || 'N/A'}</p>
            <p>Highest Rating: ${player.highestRating || 'N/A'}</p>
            <p>Last Match: ${player.lastMatchDate ? player.lastMatchDate.toLocaleDateString() : 'N/A'}</p>
            <p>Country: ${player.country || 'Unknown'}</p>
            ${player.socialLink ? `<p><a href="${player.socialLink}" target="_blank">Social Link</a></p>` : ''}
            </div>
        <div class="matches-section">
            <div class="matches-header">
                <h3>Recent Matches</h3>
                <div class="match-filters">
                    <button class="filter-btn active" data-filter="all">All</button>
                    <button class="filter-btn" data-filter="ranked">Ranked 1v1</button>
                    <button class="filter-btn" data-filter="custom">Custom/Quickplay</button>
            </div>
            </div>
            <div class="recent-matches" id="recentMatches">
            ${matchHistory.length > 0 ? matchHistory.map(match => `
                <div class="match-item ${match.result === 'W' ? 'win' : 'loss'}" data-match-type="${match.matchType || 'ranked'}">
                    <div class="match-opponent">vs. ${match.opponent}</div>
                    <div class="match-result ${match.result === 'W' ? 'win' : 'loss'}">${match.result}</div>
                    ${match.isRanked ? `
                        <div class="match-rating ${match.ratingChange >= 0 ? 'positive' : 'negative'}">
                            ${match.ratingChange >= 0 ? '+' : ''}${match.ratingChange}
            </div>
                    ` : '<div class="match-rating">-</div>'}
                    <div class="match-god">${match.god}</div>
                    <div class="match-map">${match.map}</div>
                    <div class="match-duration">${match.duration}</div>
                    <div class="match-date">${match.date.toLocaleDateString()}</div>
            </div>
            `).join('') : '<p class="no-matches">No recent matches found</p>'}
            </div>
        </div>
    `;
    
    // Add event listeners for match filters
    const matchFilters = document.querySelectorAll('.match-filters .filter-btn');
    matchFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            matchFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter matches
            const filter = btn.dataset.filter;
            filterMatches(filter);
        });
    });
}

function filterMatches(filter) {
    const matchItems = document.querySelectorAll('.match-item');
    
    matchItems.forEach(item => {
        const matchType = item.dataset.matchType;
        
        if (filter === 'all' || matchType === filter) {
            item.style.display = 'grid';
        } else {
            item.style.display = 'none';
        }
    });
}

function handleSearchInput() {
    let query = playerSearch.value.trim();
    
    // Remove clan tag brackets if user types them (e.g., "[CLAN]username" -> "username")
    query = query.replace(/^\[.*?\]/, '');
    
    if (query.length < 2) {
        searchSuggestions.classList.add('hidden');
        return;
    }

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
        const suggestions = await fetchPlayerSearch(query);
        displaySearchSuggestions(suggestions);
    }, 300);
}

function displaySearchSuggestions(suggestions) {
    searchSuggestions.innerHTML = '';
    if (suggestions.length === 0) {
        searchSuggestions.classList.add('hidden');
        return;
    }

    suggestions.forEach(player => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('search-suggestion-item');
        suggestionItem.innerHTML = `
            <span class="suggestion-username">
                ${player.clanTag ? `<span class="clan-tag">[${player.clanTag}]</span>` : ''}${player.username}
            </span>
            <span class="suggestion-rating">${player.rating}</span>
            <span class="suggestion-rank">#${player.rank}</span>
        `;
        suggestionItem.addEventListener('click', () => {
            // Search by username only, not including clan tag
            playerSearch.value = player.username;
            searchSuggestions.classList.add('hidden');
            fetchPlayerStats(player.username);
        });
        searchSuggestions.appendChild(suggestionItem);
    });
    searchSuggestions.classList.remove('hidden');
}

function loadInitialData() {
    try {
        console.log('📊 Loading initial data...');
        
        // Only populate if we have actual data
        if (allPlayers && allPlayers.length > 0) {
            populateLeaderboard();
            updateGlobalStats();
        } else {
            console.log('⏳ Waiting for data to load...');
            // Show loading state
            if (leaderboardBody) {
                leaderboardBody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem; color: #999;">Loading player data...</td></tr>';
            }
        }
    } catch (error) {
        console.error('Error loading initial data:', error);
    }
}

function updateGlobalStats() {
    const totalPlayersElement = document.getElementById('totalPlayers');
    const totalMatchesElement = document.getElementById('totalMatches');
    const activePlayersElement = document.getElementById('activePlayers');
    const avgRatingElement = document.getElementById('avgRating');

    if (totalPlayersElement) totalPlayersElement.textContent = allPlayers.length.toLocaleString();
    if (totalMatchesElement) totalMatchesElement.textContent = allPlayers.reduce((sum, p) => sum + p.totalMatches, 0).toLocaleString();
    if (activePlayersElement) activePlayersElement.textContent = allPlayers.length.toLocaleString();
    if (avgRatingElement) avgRatingElement.textContent = (allPlayers.length > 0 ? (allPlayers.reduce((sum, p) => sum + p.rating, 0) / allPlayers.length).toFixed(0) : 0).toLocaleString();
}

function animateStats() {
    // Simple animation for stats if needed
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.hero, .search-results, .leaderboard').forEach(section => {
        section.classList.add('hidden');
    });

    // Show target section
    if (sectionId === 'home') {
        document.querySelector('.hero').classList.remove('hidden');
    } else if (sectionId === 'leaderboard') {
        document.querySelector('.leaderboard').classList.remove('hidden');
        currentPage = 1;
        populateLeaderboard();
    } else if (sectionId === 'search') {
        document.querySelector('.hero').classList.remove('hidden');
        playerSearch.focus();
    }
}

// Filter players by leaderboard type
function filterPlayersByLeaderboard(csvPlayers, leaderboardType = 'supremacy-1v1') {
    const leaderboardMap = {
        'supremacy-1v1': '1',
        'supremacy-team': '2', 
        'deathmatch-1v1': '3',
        'deathmatch-team': '4'
    };
    
    const targetLbId = leaderboardMap[leaderboardType];
    if (!targetLbId) {
        console.warn('Unknown leaderboard type:', leaderboardType);
        return csvPlayers;
    }
    
    const filtered = csvPlayers.filter(player => player.leaderboard_id === targetLbId);
    console.log(`📊 Filtered to ${leaderboardType} (ID: ${targetLbId}): ${filtered.length} players`);
    return filtered;
}

// Optimized CSV player processing
function processCSVPlayers(csvPlayers, leaderboardType = 'supremacy-1v1') {
    console.log('🔄 Processing CSV players...');
    
    if (csvPlayers.length === 0) {
        console.warn('No CSV player data to process');
        return [];
    }
    
    // Debug: Show the first player's data structure
    console.log('📊 First player raw data:', csvPlayers[0]);
    console.log('📊 Available columns:', Object.keys(csvPlayers[0]));
    
    // Debug: Show leaderboard ID distribution
    const leaderboardCounts = {};
    for (let i = 0; i < Math.min(csvPlayers.length, 1000); i++) {
        const lbId = csvPlayers[i].leaderboard_id;
        leaderboardCounts[lbId] = (leaderboardCounts[lbId] || 0) + 1;
    }
    console.log('📊 Leaderboard ID distribution (first 1000 players):', leaderboardCounts);
    
    // Filter by leaderboard type
    const filteredPlayers = filterPlayersByLeaderboard(csvPlayers, leaderboardType);
    
    if (filteredPlayers.length === 0) {
        console.warn('No players found for leaderboard type:', leaderboardType);
        return [];
    }
    
    // Debug: Show the last few players to see the highest ratings
    console.log('📊 Last 5 players in filtered data:', filteredPlayers.slice(-5).map(p => `${p.alias}: ${p.rating} (rank: ${p.rank}, lb: ${p.leaderboard_id})`));
    
    // Debug: Find the highest rating in the filtered data
    let maxRating = 0;
    let topPlayer = null;
    for (let i = 0; i < filteredPlayers.length; i++) {
        const rating = parseInt(filteredPlayers[i].rating) || 0;
        if (rating > maxRating) {
            maxRating = rating;
            topPlayer = filteredPlayers[i];
        }
    }
    console.log('🏆 Highest rating found:', maxRating, 'Player:', topPlayer?.alias, 'Leaderboard ID:', topPlayer?.leaderboard_id);
    
    // Pre-allocate array for better performance
    const players = new Array(filteredPlayers.length);
    
    for (let i = 0; i < filteredPlayers.length; i++) {
        const player = filteredPlayers[i];
        
        // Extract and validate data
        const username = player.alias || player.username || `Player${i + 1}`;
        const rating = parseInt(player.rating) || 1500;
        const wins = parseInt(player.wins) || 0;
        const losses = parseInt(player.losses) || 0;
        const totalMatches = wins + losses;
        const winRate = totalMatches > 0 ? Math.round((wins / totalMatches) * 1000) / 10 : 0;
        const clanTag = player.clan_tag || '';
        const clanName = player.clan_name || '';
        
        players[i] = {
            id: parseInt(player.profile_id) || i + 1,
            username: username,
            rating: rating,
            wins: wins,
            losses: losses,
            winRate: winRate,
            favoriteGod: player.one_trick_god || 'Unknown',
            rank: parseInt(player.rank) || i + 1,
            totalMatches: totalMatches,
            avgMatchDuration: '10:00',
            currentStreak: parseInt(player.streak) || 0,
            bestStreak: Math.abs(parseInt(player.streak) || 0),
            eloHistory: [],
            recentMatches: [],
            leaderboardId: parseInt(player.leaderboard_id) || 1,
            highestRank: parseInt(player.highestrank) || parseInt(player.rank) || i + 1,
            highestRating: parseInt(player.highestrating) || rating,
            lastMatchDate: player.lastmatchdate ? new Date(parseInt(player.lastmatchdate) * 1000) : new Date(),
            country: player.country || 'Unknown',
            socialLink: player.social_link || '',
            clanTag: clanTag,
            clanName: clanName
        };
    }
    
    // Debug: Show top 5 players before sorting
    console.log('📊 Top 5 players before sorting:', players.slice(0, 5).map(p => `${p.username}: ${p.rating} (wins: ${p.wins}, losses: ${p.losses})`));
    
    // Sort by rating (descending) - optimized for large arrays
    console.log('🔄 Sorting players by rating...');
    players.sort((a, b) => b.rating - a.rating);
    
    // Debug: Show top 5 players after sorting
    console.log('🏆 Top 5 players after sorting:', players.slice(0, 5).map(p => `${p.username}: ${p.rating} (wins: ${p.wins}, losses: ${p.losses})`));
    
    console.log(`✅ Processed ${players.length} players`);
    return players;
}

// Optimized leaderboard rendering
function populateLeaderboard() {
    if (!leaderboardBody) {
        console.warn('Leaderboard body not found');
        return;
    }
    
    // Check if we have data to show
    if (!allPlayers || allPlayers.length === 0) {
        leaderboardBody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem; color: #999;">Loading player data...</td></tr>';
        return;
    }
    
    const startIndex = (currentPage - 1) * playersPerPage;
    const endIndex = startIndex + playersPerPage;
    const playersToShow = allPlayers.slice(startIndex, endIndex);
    
    console.log(`📊 Rendering leaderboard page ${currentPage}: players ${startIndex + 1}-${endIndex} of ${allPlayers.length}`);
    
    // Clear existing content
    leaderboardBody.innerHTML = '';
    
    // Render in batches to prevent UI freezing
    const batchSize = 25;
    let currentIndex = 0;
    
    const renderBatch = () => {
        const batchEnd = Math.min(currentIndex + batchSize, playersToShow.length);
        
        for (let i = currentIndex; i < batchEnd; i++) {
            const player = playersToShow[i];
        const winRateClass = player.winRate >= 75 ? 'high' : player.winRate >= 60 ? 'medium' : 'low';
            const displayRank = startIndex + i + 1;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="rank">#${displayRank}</td>
                <td class="player-name clickable-player" data-username="${player.username}">
                    ${player.clanTag ? `<span class="clan-tag">[${player.clanTag}]</span>` : ''}${player.username}
                </td>
                <td class="rating">${player.rating}</td>
                <td>${player.wins}</td>
                <td>${player.losses}</td>
                <td class="win-rate ${winRateClass}">${player.winRate}%</td>
                <td class="favorite-god">
                    <div class="god-icon">${player.favoriteGod.charAt(0)}</div>
                    ${player.favoriteGod}
                </td>
            `;
            
            // Add click event to player name
            const playerNameCell = row.querySelector('.clickable-player');
            playerNameCell.addEventListener('click', () => {
                fetchPlayerStats(player.username);
            });
            
            leaderboardBody.appendChild(row);
        }
        
        currentIndex = batchEnd;
        
        if (currentIndex < playersToShow.length) {
            requestAnimationFrame(renderBatch);
        } else {
            addPaginationControls();
        }
    };
    
    renderBatch();
}

function addPaginationControls() {
    // Remove existing pagination
    const existingPagination = document.getElementById('leaderboardPagination');
    if (existingPagination) {
        existingPagination.remove();
    }
    
    const totalPages = Math.ceil(allPlayers.length / playersPerPage);
    const startPlayer = (currentPage - 1) * playersPerPage + 1;
    const endPlayer = Math.min(currentPage * playersPerPage, allPlayers.length);
    
    if (totalPages <= 1) {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'pagination-info-only';
        infoDiv.innerHTML = `Showing all ${allPlayers.length} players`;
        
        const leaderboardTable = document.querySelector('.leaderboard table');
        if (leaderboardTable) {
            leaderboardTable.parentNode.insertBefore(infoDiv, leaderboardTable.nextSibling);
        }
        return;
    }
    
    const pagination = document.createElement('div');
    pagination.id = 'leaderboardPagination';
    pagination.className = 'pagination';
    pagination.innerHTML = `
        <button id="prevPage" class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i> Previous
        </button>
        <span class="pagination-info">
            Showing players ${startPlayer}-${endPlayer} of ${allPlayers.length} (Page ${currentPage} of ${totalPages})
        </span>
        <button id="nextPage" class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''}>
            Next <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    const leaderboardTable = document.querySelector('.leaderboard table');
    if (leaderboardTable) {
        leaderboardTable.parentNode.insertBefore(pagination, leaderboardTable.nextSibling);
    }
    
    // Add event listeners
    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            populateLeaderboard();
        }
    });
    
    document.getElementById('nextPage').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            populateLeaderboard();
        }
    });
}

function filterLeaderboard(filter) {
    console.log('🔄 Switching to leaderboard type:', filter);
    
    // Update active filter button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    
    // Update current leaderboard type
    currentLeaderboardType = filter;
    
    // Reset to first page
    currentPage = 1;
    
    // If we have CSV data, reprocess it with the new filter
    if (csvDataCache.leaderboard && csvDataCache.leaderboard.length > 0) {
        console.log('🔄 Reprocessing CSV data for leaderboard type:', filter);
        const realPlayers = processCSVPlayers(csvDataCache.leaderboard, filter);
        allPlayers = realPlayers;
        
        // Update the leaderboard display
        populateLeaderboard();
        
        console.log(`✅ Switched to ${filter}: ${allPlayers.length} players loaded`);
        } else {
        // If no CSV data, just refresh the current display
        populateLeaderboard();
    }
}


// Match History Functions
function getPlayerMatchHistory(playerId, limit = 10) {
    if (!csvDataCache.matches || csvDataCache.matches.length === 0) {
        console.log('No match data available');
        return [];
    }
    
    // Filter matches for this player and sort by most recent
    const playerMatches = csvDataCache.matches
        .filter(match => parseInt(match.profile_id) === playerId)
        .sort((a, b) => parseInt(b.completiontime) - parseInt(a.completiontime))
        .slice(0, limit);
    
    return playerMatches.map(match => {
        const isRanked = parseInt(match.leaderboard_id) === 1;
        const ratingChange = isRanked ? parseInt(match.elo) - parseInt(match.old_elo) : 0;
        
        // Fix win/loss detection - check resulttype field
        let result = 'L';
        if (match.resulttype === '1' || match.win === 'true' || match.win === true) {
            result = 'W';
        } else if (match.resulttype === '0' || match.win === 'false' || match.win === false) {
            result = 'L';
        }
        
        // Debug logging for first few matches
        if (playerMatches.indexOf(match) < 3) {
            console.log('Match debug:', {
                matchId: match.match_id,
                resulttype: match.resulttype,
                win: match.win,
                detectedResult: result,
                isRanked: isRanked
            });
        }
        
        return {
            matchId: match.match_id,
            opponent: getOpponentFromMatch(match),
            result: result,
            ratingChange: ratingChange,
            newRating: parseInt(match.elo),
            god: match.god,
            map: match.mapname,
            duration: formatDuration(parseInt(match.duration)),
            date: new Date(parseInt(match.completiontime) * 1000),
            eapm: match.eapm ? parseInt(match.eapm) : null,
            titan: match.titan === 'true',
            wonder: match.wonder === 'true',
            matchType: isRanked ? 'ranked' : 'custom',
            isRanked: isRanked
        };
    });
}

function getOpponentFromMatch(match) {
    // Find other players in the same match
    const matchId = match.match_id;
    const otherPlayers = csvDataCache.matches.filter(m => 
        m.match_id === matchId && m.profile_id !== match.profile_id
    );
    
    if (otherPlayers.length > 0) {
        return otherPlayers[0].alias || 'Unknown';
    }
    return 'Unknown';
}

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
}

// Cache Functions
function saveToCache(data) {
    try {
        // Only cache essential data to avoid quota issues
        const cacheData = {
            leaderboard: data.leaderboard ? data.leaderboard.slice(0, 10000) : null, // Only cache top 10k players
            lastUpdated: data.lastUpdated,
            cachedAt: Date.now()
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        console.log('💾 Data saved to cache (top 10k players only)');
    } catch (error) {
        console.warn('Failed to save to cache:', error);
        // Clear cache if quota exceeded
        if (error.name === 'QuotaExceededError') {
            console.log('🗑️ Cache quota exceeded, clearing old cache...');
            localStorage.clear();
        }
    }
}

function loadFromCache() {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            const data = JSON.parse(cached);
            const age = Date.now() - data.cachedAt;
            if (age < CACHE_DURATION) {
                console.log('📦 Using cached data (age:', Math.round(age / 1000), 'seconds)');
                return data;
            } else {
                console.log('⏰ Cache expired, clearing...');
                localStorage.removeItem(CACHE_KEY);
            }
        }
    } catch (error) {
        console.warn('Failed to load from cache:', error);
    }
    return null;
}

// Load More Functions
function loadMorePlayers() {
    // For now, just show a message
    alert('Load more functionality will be available when real data is loaded');
}