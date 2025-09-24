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
    // Set initial stats
    document.getElementById('totalPlayers').textContent = '12,847';
    document.getElementById('totalMatches').textContent = '1,234,567';
    document.getElementById('avgRating').textContent = '1,856';
    
    // Initialize leaderboard
    populateLeaderboard();
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
            const query = playerSearch.value.trim();
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

// CSV Parsing Utilities with optimized performance
async function parseCSV(csvText, onProgress = null, maxRows = null) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const data = [];
    const totalLines = lines.length - 1; // Exclude header
    const processLimit = maxRows || totalLines;
    
    console.log(`📊 Parsing CSV: ${Math.min(processLimit, totalLines)} rows to process (${totalLines} total available)`);
    
    // Much larger chunk size for better performance
    const chunkSize = 5000;
    let processedLines = 0;
    
    for (let i = 1; i < lines.length && processedLines < processLimit; i += chunkSize) {
        const chunkEnd = Math.min(i + chunkSize, lines.length, i + (processLimit - processedLines));
        
        // Process chunk in one go for better performance
        for (let j = i; j < chunkEnd; j++) {
            const line = lines[j];
            if (line.trim()) {
                // Optimized CSV parsing - avoid multiple splits and maps
                const values = line.split(',');
                const row = {};
                
                // Direct assignment instead of forEach for speed
                for (let k = 0; k < headers.length && k < values.length; k++) {
                    row[headers[k]] = values[k].trim().replace(/"/g, '');
                }
                data.push(row);
                processedLines++;
            }
        }
        
        // Update progress less frequently for better performance
        if (onProgress && processedLines % 1000 === 0) {
            const progress = Math.round((processedLines / processLimit) * 100);
            onProgress(progress, processedLines, processLimit);
        }
        
        // Allow UI to update by yielding control
        if (i % (chunkSize * 2) === 0) {
            await new Promise(resolve => setTimeout(resolve, 0));
        }
    }
    
    console.log(`✅ CSV parsing complete: ${data.length} records processed`);
    return data;
}

async function fetchCSVData(url, onProgress = null, maxRows = null) {
    try {
        console.log(`Fetching CSV from: ${url}`);
        // Create an AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout to prevent hanging
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'text/csv,application/csv,application/gzip',
                'User-Agent': 'AOM-Stats-Website/1.0'
            },
            mode: 'cors',
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
        }
        
        // Check if the response is gzipped
        const contentType = response.headers.get('content-type') || '';
        const isGzipped = url.includes('.gz') || contentType.includes('gzip');
        const isLocalProxy = url.includes('proxy?') || url.includes('proxy.php');
        
        if (isGzipped && !isLocalProxy) {
            console.log('CSV is gzipped, attempting to decompress with pako...');
            try {
                // Get the response as an array buffer for binary data
                const arrayBuffer = await response.arrayBuffer();
                const uint8Array = new Uint8Array(arrayBuffer);
                
                // Decompress using pako
                const decompressed = pako.inflate(uint8Array, { to: 'string' });
                console.log('Successfully decompressed gzipped CSV');
                console.log('CSV text preview:', decompressed.substring(0, 200));
                return await parseCSV(decompressed, onProgress, maxRows);
            } catch (decompressError) {
                console.error('Failed to decompress gzipped CSV:', decompressError);
                throw new Error('Failed to decompress gzipped CSV file');
            }
        } else if (isLocalProxy) {
            console.log('Using local servlet proxy - content should already be decompressed');
        }
        
        const csvText = await response.text();
        console.log('CSV text preview:', csvText.substring(0, 200));
        return await parseCSV(csvText, onProgress, maxRows);
    } catch (error) {
        console.error('CSV fetch error:', error);
        throw error;
    }
}

// API Testing and Discovery
async function testAvailableAPIs() {
    console.log('🔍 Testing available APIs for Age of Mythology: Retold...');
    
    // Check cache first
    const cachedData = loadFromCache();
    if (cachedData && cachedData.leaderboard) {
        console.log('📦 Using cached data');
        csvDataCache = cachedData;
        allPlayers = processCSVPlayers(cachedData.leaderboard);
        API_CONFIG.activeApi = API_CONFIG.APIS.find(api => api.name === 'aomstats.io-dumps');
        return;
    }
    
    // Test aomstats.io first (most likely to work)
    const aomstatsApi = API_CONFIG.APIS.find(api => api.name === 'aomstats.io-dumps');
    if (aomstatsApi) {
        try {
            console.log('Testing aomstats.io-dumps...');
            
            // Use working proxy directly
            const proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=https%3A%2F%2Faomstats.io%2Fapi%2Fdb_dumps';
            console.log('Using proxy:', proxyUrl);
            
            const response = await fetch(proxyUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'AOM-Stats-Website/1.0'
                }
            });
            
            if (response.ok) {
                const dumpsData = await response.json();
                console.log('✅ aomstats.io-dumps available:', dumpsData);
                aomstatsApi.available = true;
                API_CONFIG.activeApi = aomstatsApi;
                
                // Load the CSV data
                await loadLatestCSVData(aomstatsApi, dumpsData);
                return;
            } else {
                console.log('❌ aomstats.io-dumps failed with status:', response.status);
            }
        } catch (error) {
            console.log('❌ aomstats.io-dumps failed:', error.message);
        }
    }
    
    // If aomstats.io fails, fall back to mock data
    console.log('📊 Using mock data as fallback');
    API_CONFIG.activeApi = API_CONFIG.APIS.find(api => api.name === 'mock-data');
}

async function loadLatestCSVData(api, dumpsData) {
    try {
        console.log('📥 Loading latest CSV data from aomstats.io...');
        
        if (dumpsData.leaderboard && dumpsData.leaderboard.url) {
            console.log('Loading leaderboard data...');
            const leaderboardUrl = `https://aomstats.io${dumpsData.leaderboard.url}`;
            const leaderboardProxy = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(leaderboardUrl)}`;
            
            console.log('Fetching leaderboard via proxy:', leaderboardProxy);
            
            const csvResponse = await fetch(leaderboardProxy, {
                method: 'GET',
                headers: {
                    'Accept': 'text/csv,application/csv,application/gzip',
                    'User-Agent': 'AOM-Stats-Website/1.0'
                }
            });
            
            if (!csvResponse.ok) {
                throw new Error(`CSV request failed: ${csvResponse.status}`);
            }
            
            // Check if it's gzipped
            const contentType = csvResponse.headers.get('content-type') || '';
            const isGzipped = leaderboardUrl.includes('.gz') || contentType.includes('gzip');
            
            let csvText;
            if (isGzipped) {
                console.log('📦 Decompressing gzipped CSV...');
                const arrayBuffer = await csvResponse.arrayBuffer();
                const uint8Array = new Uint8Array(arrayBuffer);
                csvText = pako.inflate(uint8Array, { to: 'string' });
            } else {
                csvText = await csvResponse.text();
            }
            
            console.log('📊 Parsing CSV data...');
            const csvData = await parseCSV(csvText, null, 5000); // Load only 5000 players initially
            const realPlayers = processCSVPlayers(csvData);
            
            // Store in cache
            csvDataCache.leaderboard = csvData;
            csvDataCache.lastUpdated = new Date();
            saveToCache(csvDataCache);
            
            // Update players
            allPlayers = realPlayers;
            
            console.log(`✅ Loaded ${realPlayers.length} real players from aomstats.io`);
        } else {
            throw new Error('No leaderboard data found in API response');
        }
        
    } catch (error) {
        console.error('❌ Failed to load CSV data:', error);
        throw error;
    }
}

// API Functions
async function fetchPlayerSearch(query) {
    const api = API_CONFIG.activeApi;
    if (!api) return [];

    if (api.dataType === 'mock') {
        return allPlayers.filter(player =>
            player.username.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 10); // Limit suggestions
    } else if (api.dataType === 'csv-dumps') {
        // Search in the already loaded allPlayers array
        return allPlayers.filter(player =>
            player.username.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 10); // Limit suggestions
    } else {
        // For live APIs, implement actual fetch
        const url = `${api.baseUrl}${api.endpoints.PLAYERS}?query=${encodeURIComponent(query)}`;
        console.log(`🔍 Searching player via ${api.name}:`, url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Player search failed: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            console.log(`✅ Player search from ${api.name}:`, data);
            return data;
        } catch (error) {
            console.error(`❌ Player search API error (${api.name}):`, error);
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
        // For live APIs, implement actual fetch
        const url = `${api.baseUrl}${api.endpoints.PLAYERS}?username=${encodeURIComponent(username)}`;
        console.log(`📊 Fetching player stats via ${api.name}:`, url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Player stats failed: ${response.status} ${response.statusText}`);
            }
            player = await response.json();
            console.log(`✅ Player stats from ${api.name}:`, player);
        } catch (error) {
            console.error(`❌ Player stats API error (${api.name}):`, error);
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
        console.log(`🏆 Fetching leaderboard via ${api.name}:`, url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Leaderboard failed: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            console.log(`✅ Leaderboard from ${api.name}:`, data);
            return data;
        } catch (error) {
            console.error(`❌ Leaderboard API error (${api.name}):`, error);
            return [];
        }
    }
}

async function fetchGlobalStats() {
    const api = API_CONFIG.activeApi;
    if (!api) return {};

    if (api.dataType === 'mock' || api.dataType === 'csv-dumps') {
        // Calculate global stats from allPlayers
        const totalPlayers = allPlayers.length;
        const totalMatches = allPlayers.reduce((sum, p) => sum + p.totalMatches, 0);
        const avgRating = totalPlayers > 0 ? (allPlayers.reduce((sum, p) => sum + p.rating, 0) / totalPlayers).toFixed(0) : 0;
        
        return {
            totalPlayers: totalPlayers,
            totalMatches: totalMatches,
            activePlayers: totalPlayers, // Assuming all loaded players are active
            avgRating: parseInt(avgRating)
        };
    } else {
        const url = `${api.baseUrl}${api.endpoints.GLOBAL_STATS}`;
        console.log(`🌍 Fetching global stats via ${api.name}:`, url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Global stats failed: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            console.log(`✅ Global stats from ${api.name}:`, data);
            return data;
        } catch (error) {
            console.error(`❌ Global stats API error (${api.name}):`, error);
            return {};
        }
    }
}

// UI Update Functions
function updateAPIStatus() {
    // Remove existing status if it exists
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
        statusDiv.innerHTML = `
            <div class="status-indicator">
                <span class="status-dot ${api.available ? 'online' : 'offline'}"></span>
                <span class="status-text">${api.name} - ${api.available ? 'Online' : 'Offline'}</span>
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
    
    // Add to header
    const header = document.querySelector('header');
    if (header) {
        header.appendChild(statusDiv);
    }
}

function displayPlayerStats(player) {
    if (!searchResults || !playerStats) return;

    searchResults.classList.remove('hidden');
    playerStats.innerHTML = `
        <div class="player-header">
            <h2 class="player-username">${player.username}</h2>
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
            <p>Highest Rank: ${player.highestRank}</p>
            <p>Highest Rating: ${player.highestRating}</p>
            <p>Last Match: ${player.lastMatchDate ? player.lastMatchDate.toLocaleDateString() : 'N/A'}</p>
            <p>Country: ${player.country}</p>
            ${player.socialLink ? `<p><a href="${player.socialLink}" target="_blank">Social Link</a></p>` : ''}
        </div>
        <!-- Add more stats here -->
        <h3>Recent Matches</h3>
        <div class="recent-matches">
            ${player.recentMatches.map(match => `
                <div class="match-item">
                    <span>vs. ${match.opponent}</span>
                    <span>${match.result}</span>
                    <span class="rating-change">${match.rating}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function handleSearchInput() {
    const query = playerSearch.value.trim();
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
            <span class="suggestion-username">${player.username}</span>
            <span class="suggestion-rating">${player.rating}</span>
            <span class="suggestion-rank">#${player.rank}</span>
        `;
        suggestionItem.addEventListener('click', () => {
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
        // For now, just use mock data
        console.log('📊 Loading mock data...');
        allPlayers = [...mockPlayers];
        updateLeaderboard();
        updateGlobalStats();
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
        // Reset to first page when switching to leaderboard
        currentPage = 1;
        populateLeaderboard();
    } else if (sectionId === 'search') {
        document.querySelector('.hero').classList.remove('hidden');
        playerSearch.focus();
    }
}

function processCSVPlayers(csvPlayers) {
    console.log('Processing CSV players, total records:', csvPlayers.length);
    
    if (csvPlayers.length === 0) {
        console.warn('No CSV player data to process');
        return [];
    }
    
    // Pre-allocate array for better performance
    const players = new Array(csvPlayers.length);
    
    // Convert CSV player data to our format with optimized processing
    for (let i = 0; i < csvPlayers.length; i++) {
        const player = csvPlayers[i];
        
        // Optimized field extraction with minimal operations
        const username = player.alias || player.username || `Player${i + 1}`;
        const rating = parseInt(player.rating) || 1500;
        const wins = parseInt(player.wins) || 0;
        const losses = parseInt(player.losses) || 0;
        const totalMatches = wins + losses;
        const winRate = totalMatches > 0 ? Math.round((wins / totalMatches) * 1000) / 10 : 0;
        
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
            socialLink: player.social_link || ''
        };
    }
    
    // Sort by rating (descending) - more efficient than map + sort
    players.sort((a, b) => b.rating - a.rating);
    
    console.log(`✅ Processed ${players.length} players`);
    return players;
}

function populateLeaderboard() {
    if (!leaderboardBody) {
        console.warn('Leaderboard body not found');
        return;
    }
    
    const startIndex = (currentPage - 1) * playersPerPage;
    const endIndex = startIndex + playersPerPage;
    const playersToShow = allPlayers.slice(startIndex, endIndex);
    
    console.log(`📊 Rendering leaderboard page ${currentPage}: players ${startIndex + 1}-${endIndex} of ${allPlayers.length}`);
    console.log(`📊 Players to show: ${playersToShow.length}, Total players: ${allPlayers.length}`);
    
    // Clear existing content
    leaderboardBody.innerHTML = '';
    
    // Render players in batches to prevent UI freezing
    const batchSize = 20;
    let currentIndex = 0;
    
    const renderBatch = () => {
        const batchEnd = Math.min(currentIndex + batchSize, playersToShow.length);
        
        for (let i = currentIndex; i < batchEnd; i++) {
            const player = playersToShow[i];
            const winRateClass = player.winRate >= 75 ? 'high' : player.winRate >= 60 ? 'medium' : 'low';
            
            // Calculate the correct display rank (global position, not CSV rank)
            const displayRank = startIndex + i + 1;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="rank">#${displayRank}</td>
                <td class="player-name">${player.username}</td>
                <td class="rating">${player.rating}</td>
                <td>${player.wins}</td>
                <td>${player.losses}</td>
                <td class="win-rate ${winRateClass}">${player.winRate}%</td>
                <td class="favorite-god">
                    <div class="god-icon">${player.favoriteGod.charAt(0)}</div>
                    ${player.favoriteGod}
                </td>
            `;
            leaderboardBody.appendChild(row);
        }
        
        currentIndex = batchEnd;
        
        // If there are more players to render, continue in next frame
        if (currentIndex < playersToShow.length) {
            requestAnimationFrame(renderBatch);
        } else {
            // All players rendered, add pagination controls
            addPaginationControls();
        }
    };
    
    // Start rendering
    renderBatch();
}

function addPaginationControls() {
    // Remove existing pagination if any
    const existingPagination = document.getElementById('leaderboardPagination');
    if (existingPagination) {
        existingPagination.remove();
    }
    
    const totalPages = Math.ceil(allPlayers.length / playersPerPage);
    const startPlayer = (currentPage - 1) * playersPerPage + 1;
    const endPlayer = Math.min(currentPage * playersPerPage, allPlayers.length);
    
    // Only show pagination if there are multiple pages
    if (totalPages <= 1) {
        // Just show the count info without pagination controls
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
    
    // Insert pagination after the leaderboard table
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
    // In a real implementation, this would filter by game mode
    // For now, we'll just show all players
    populateLeaderboard();
}

// Cache Functions
function saveToCache(data) {
    try {
        const cacheData = {
            ...data,
            cachedAt: Date.now()
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        console.log('💾 Data saved to cache');
    } catch (error) {
        console.warn('Failed to save to cache:', error);
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