package com.example.wbdecoded

import android.annotation.SuppressLint
import android.content.Context
import android.content.SharedPreferences
import android.graphics.Bitmap
import android.os.Bundle
import android.view.View
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import android.widget.ProgressBar
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback

class MainActivity : ComponentActivity() {

    private lateinit var webView: WebView
    private lateinit var progressBar: ProgressBar
    private lateinit var prefs: SharedPreferences

    // The Full Original Next.js Application Endpoints
    private val defaultWifiIp = "10.206.255.148"
    private val defaultPort = "3000"
    private val primaryUrl = "http://10.206.255.148:3000"
    private val emulatorUrl = "http://10.0.2.2:3000"

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        prefs = getSharedPreferences("wb_decoded_prefs", Context.MODE_PRIVATE)

        // Set status bar & navigation bar colors
        window.statusBarColor = android.graphics.Color.parseColor("#121820")
        window.navigationBarColor = android.graphics.Color.parseColor("#FFFFFF")

        // Root container with system window insets protection
        val rootLayout = FrameLayout(this).apply {
            layoutParams = FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
            )
            fitsSystemWindows = true
            setBackgroundColor(android.graphics.Color.parseColor("#121820"))
        }

        // Horizontal Loading Bar
        progressBar = ProgressBar(this, null, android.R.attr.progressBarStyleHorizontal).apply {
            layoutParams = FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                8
            )
            max = 100
            visibility = View.VISIBLE
        }

        // Web View Setup for Full Next.js Application
        webView = WebView(this).apply {
            layoutParams = FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
            )

            clearCache(false)

            settings.apply {
                javaScriptEnabled = true
                domStorageEnabled = true
                databaseEnabled = true
                useWideViewPort = true
                loadWithOverviewMode = false
                displayZoomControls = false
                builtInZoomControls = false
                textZoom = 100
                allowFileAccess = true
                allowContentAccess = true
                cacheMode = WebSettings.LOAD_DEFAULT
                mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                userAgentString = "$userAgentString WBDecodedMobileApp/1.0 Mobile"
            }

            addJavascriptInterface(WebAppInterface(this@MainActivity), "AndroidBridge")

            webViewClient = object : WebViewClient() {
                override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                    return false
                }

                override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                    super.onPageStarted(view, url, favicon)
                    progressBar.visibility = View.VISIBLE
                }

                override fun onPageFinished(view: WebView?, url: String?) {
                    super.onPageFinished(view, url)
                    progressBar.visibility = View.GONE
                }

                override fun onReceivedError(view: WebView?, request: WebResourceRequest?, error: WebResourceError?) {
                    super.onReceivedError(view, request, error)
                    if (request?.isForMainFrame == true) {
                        val failedUrl = request.url.toString()
                        if (failedUrl.contains(defaultWifiIp)) {
                            // Try emulator url fallback
                            view?.loadUrl(emulatorUrl)
                        } else {
                            // Show connection helper portal to allow entering server IP / cloud URL
                            showServerConnectionPortal(view, "Cannot connect to Next.js server at $failedUrl")
                        }
                    }
                }
            }

            webChromeClient = object : WebChromeClient() {
                override fun onProgressChanged(view: WebView?, newProgress: Int) {
                    progressBar.progress = newProgress
                    if (newProgress >= 100) {
                        progressBar.visibility = View.GONE
                    }
                }
            }
        }

        rootLayout.addView(webView)
        rootLayout.addView(progressBar)
        setContentView(rootLayout)

        // Handle hardware back button inside Next.js router
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack()
                } else {
                    finish()
                }
            }
        })

        // Load the full Next.js application
        val customUrl = prefs.getString("custom_server_url", null)
        if (!customUrl.isNullOrBlank()) {
            webView.loadUrl(customUrl)
        } else {
            webView.loadUrl(primaryUrl)
        }
    }

    private fun showServerConnectionPortal(view: WebView?, errorReason: String) {
        val savedIp = prefs.getString("custom_server_ip", defaultWifiIp) ?: defaultWifiIp
        val savedPort = prefs.getString("custom_server_port", defaultPort) ?: defaultPort

        val htmlContent = """
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                <title>WB Decoded — Server Connection</title>
                <style>
                    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
                    body { background: #0F172A; color: #F8FAFC; padding: 24px 20px; display: flex; flex-direction: column; min-height: 100vh; justify-content: center; }
                    .card { background: #1E293B; border: 1px solid #334155; border-radius: 24px; padding: 24px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }
                    .badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(37, 99, 235, 0.2); color: #60A5FA; border: 1px solid rgba(37, 99, 235, 0.4); border-radius: 9999px; padding: 4px 12px; font-size: 11px; font-weight: 800; text-transform: uppercase; margin-bottom: 16px; }
                    h1 { font-size: 22px; font-weight: 900; color: #FFFFFF; margin-bottom: 8px; }
                    p.sub { font-size: 13px; color: #94A3B8; line-height: 1.5; margin-bottom: 18px; }
                    .form-group { margin-bottom: 14px; }
                    label { display: block; font-size: 11px; font-weight: 700; color: #CBD5E1; text-transform: uppercase; margin-bottom: 6px; }
                    input { width: 100%; background: #0F172A; border: 1.5px solid #475569; border-radius: 14px; padding: 14px 16px; font-size: 15px; color: #FFFFFF; font-weight: 600; outline: none; }
                    input:focus { border-color: #3B82F6; }
                    .btn-primary { width: 100%; background: #2563EB; color: #FFFFFF; border: none; border-radius: 14px; padding: 15px; font-size: 14px; font-weight: 800; cursor: pointer; margin-top: 10px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4); }
                    .btn-primary:active { background: #1D4ED8; }
                    .instructions { margin-top: 20px; background: rgba(15, 23, 42, 0.6); border: 1px solid #334155; border-radius: 16px; padding: 16px; font-size: 12px; color: #94A3B8; line-height: 1.6; }
                    .instructions strong { color: #F1F5F9; }
                    .status-box { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 10px 14px; font-size: 12px; color: #FCA5A5; margin-bottom: 16px; }
                </style>
            </head>
            <body>
                <div class="card">
                    <div class="badge">🌐 Full App Connection</div>
                    <h1>WB Decoded Full Platform</h1>
                    <p class="sub">To access the full live application (Auth, PYQ, NCERT, Magazines, Admin Lab &amp; Full CBT Tests), enter your server host.</p>
                    
                    <div class="status-box">
                        ⚠️ <strong>Status:</strong> ${errorReason.replace("<", "&lt;").replace(">", "&gt;")}
                    </div>

                    <div class="form-group">
                        <label>Host / IP / Cloud URL</label>
                        <input type="text" id="ipInput" value="$savedIp" placeholder="e.g. 10.206.255.148 or myapp.vercel.app">
                    </div>

                    <div class="form-group">
                        <label>Port (leave blank for https/cloud)</label>
                        <input type="text" id="portInput" value="$savedPort" placeholder="3000">
                    </div>

                    <button class="btn-primary" onclick="connectToServer()">
                        🚀 Launch Full App
                    </button>

                    <div class="instructions">
                        <strong>📌 How to connect on other devices:</strong><br>
                        • <strong>Same Wi-Fi / Hotspot:</strong> Enter your PC's Wi-Fi IP (<code>10.206.255.148</code>).<br>
                        • <strong>Remote / Mobile Data:</strong> Enter your public server URL (e.g. Cloudflare / Vercel domain).
                    </div>
                </div>

                <script>
                    function connectToServer() {
                        var host = document.getElementById('ipInput').value.trim();
                        var port = document.getElementById('portInput').value.trim();
                        if (!host) {
                            alert('Please enter a host or IP.');
                            return;
                        }
                        var fullUrl = '';
                        if (host.startsWith('http://') || host.startsWith('https://')) {
                            fullUrl = host;
                        } else if (port && port !== '80' && port !== '443') {
                            fullUrl = 'http://' + host + ':' + port;
                        } else {
                            fullUrl = 'https://' + host;
                        }

                        if (window.AndroidBridge && window.AndroidBridge.setCustomServerUrl) {
                            window.AndroidBridge.setCustomServerUrl(host, port, fullUrl);
                        } else {
                            window.location.href = fullUrl;
                        }
                    }
                </script>
            </body>
            </html>
        """.trimIndent()

        view?.loadDataWithBaseURL(null, htmlContent, "text/html", "UTF-8", null)
    }

    class WebAppInterface(private val activity: MainActivity) {
        @JavascriptInterface
        fun setCustomServerUrl(ip: String, port: String, fullUrl: String) {
            activity.runOnUiThread {
                activity.prefs.edit()
                    .putString("custom_server_ip", ip)
                    .putString("custom_server_port", port)
                    .putString("custom_server_url", fullUrl)
                    .apply()

                Toast.makeText(activity, "Connecting to $fullUrl...", Toast.LENGTH_SHORT).show()
                activity.webView.loadUrl(fullUrl)
            }
        }
    }

    override fun onResume() {
        super.onResume()
        webView.onResume()
    }

    override fun onPause() {
        super.onPause()
        webView.onPause()
    }

    override fun onDestroy() {
        webView.destroy()
        super.onDestroy()
    }
}
