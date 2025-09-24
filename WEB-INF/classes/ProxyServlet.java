import java.io.*;
import java.net.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.util.zip.GZIPInputStream;

public class ProxyServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // Set CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, Origin, User-Agent");
        
        // Handle preflight requests
        if ("OPTIONS".equals(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }
        
        String urlParam = request.getParameter("url");
        if (urlParam == null || urlParam.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"URL parameter is required\"}");
            return;
        }
        
        // Validate URL (only allow aomstats.io)
        if (!urlParam.startsWith("https://aomstats.io/")) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Only aomstats.io URLs are allowed\"}");
            return;
        }
        
        try {
            URL url = new URL(urlParam);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("User-Agent", "AOM-Stats-Website/1.0");
            connection.setRequestProperty("Accept", "text/csv,application/csv,application/gzip");
            connection.setRequestProperty("Accept-Encoding", "gzip, deflate");
            connection.setConnectTimeout(30000);
            connection.setReadTimeout(30000);
            
            int responseCode = connection.getResponseCode();
            if (responseCode != HttpURLConnection.HTTP_OK) {
                response.setStatus(responseCode);
                response.setContentType("application/json");
                response.getWriter().write("{\"error\": \"HTTP error: " + responseCode + "\"}");
                return;
            }
            
            // Check if content is gzipped
            String contentType = connection.getContentType();
            boolean isGzipped = urlParam.contains(".gz") || 
                               (contentType != null && contentType.contains("gzip"));
            
            InputStream inputStream = connection.getInputStream();
            
            // Set response headers for streaming
            response.setContentType("text/csv; charset=utf-8");
            response.setHeader("Cache-Control", "no-cache");
            response.setHeader("Transfer-Encoding", "chunked");
            
            if (isGzipped) {
                // Decompress gzipped content with streaming
                GZIPInputStream gzipStream = new GZIPInputStream(inputStream);
                
                // Copy decompressed content to response in chunks
                byte[] buffer = new byte[16384]; // Larger buffer for better performance
                int bytesRead;
                while ((bytesRead = gzipStream.read(buffer)) != -1) {
                    response.getOutputStream().write(buffer, 0, bytesRead);
                    response.getOutputStream().flush(); // Flush to prevent memory buildup
                }
                gzipStream.close();
            } else {
                // Copy content directly to response with streaming
                byte[] buffer = new byte[16384]; // Larger buffer for better performance
                int bytesRead;
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    response.getOutputStream().write(buffer, 0, bytesRead);
                    response.getOutputStream().flush(); // Flush to prevent memory buildup
                }
            }
            
            inputStream.close();
            
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Proxy error: " + e.getMessage() + "\"}");
        }
    }
}
