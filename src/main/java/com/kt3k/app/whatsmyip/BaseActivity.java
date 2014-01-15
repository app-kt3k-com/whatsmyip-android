package com.kt3k.app.whatsmyip;

import org.kt3k.straw.Straw;

import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.LinearLayout;

public class BaseActivity extends Activity {

    private WebView webView;
    private LinearLayout layout;

    private Straw straw;

    private String url;

    private static final String DEFAULT_START_PATH = "file:///android_asset/index.html";

    /**
     * set up the main layout
     */
    private void setUpLayout() {

        // set up linear layout
        this.layout = new LinearLayout(this);

        // enable only portrait orientation
        this.layout.setOrientation(LinearLayout.VERTICAL);

        // set layout as content view
        this.setContentView(layout);

        // create, set up and layout the WebView
        this.webView = this.createWebView(DEFAULT_START_PATH);
        this.layout.addView(this.webView, new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT, 1.0f));

    }

    /**
     * create the WebView
     */
    private WebView createWebView(String url) {

        // create WebView
        WebView webView = new WebView(this);

        // setting scroll bar styles
        webView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        webView.setScrollbarFadingEnabled(true);

        // set WebViewClient
        webView.setWebViewClient(new WebViewClient());

        // set WebChromeClient
        webView.setWebChromeClient(new WebChromeClient());

        // enable JavaScript
        webView.getSettings().setJavaScriptEnabled(true);

        // enable DomStorage (i.e. localStorage and SessionStorage)
        webView.getSettings().setDomStorageEnabled(true);

        // set background color white
        webView.setBackgroundColor(Color.WHITE);

        // insert Straw into webView and init basic plugins
        this.straw = Straw.insertInto(webView);
        this.straw.addPlugins(org.kt3k.straw.plugin.BasicPlugins.names);

        // load url
        webView.loadUrl(url);

        return webView;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // no title bar
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);

        // set up content layouts
        this.setUpLayout();
    }

    @Override
    public void onBackPressed() {
        this.straw.onBackPressed();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }

    @Override
    public void onResume() {
        super.onResume();
    }

    @Override
    public void onPause() {
        super.onPause();
    }

}
