package com.kt3k.app.whatsmyip;

import org.kt3k.straw.Straw;

import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.Window;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.LinearLayout;

import com.google.android.gms.ads.*;

public class BaseActivity extends Activity {

    private WebView webView;
    private AdView adView;
    private LinearLayout layout;

    private Straw straw;

    private Boolean adEnabled = true;
    private String url;

    private static final String DEFAULT_START_PATH = "file:///android_asset/index.html";
    private static final String AD_UNIT_ID = "ca-app-pub-3872994406664392/3965510198";

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

        // if ad enabled then put ads
        if (this.adEnabled) {
            // create layout parameter
            LinearLayout.LayoutParams p = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT, 0.0f);
            p.gravity = Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL;

            // create and layout ad
            this.adView = this.createAd();
            this.layout.addView(this.adView, p);
        }
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

    /**
     * set up the AdView
     */
    private AdView createAd() {
        AdView adView = new AdView(this);
        adView.setAdUnitId(AD_UNIT_ID);
        adView.setAdSize(AdSize.SMART_BANNER);

        // set up the request
        AdRequest adRequest = new AdRequest.Builder()
                .addTestDevice(AdRequest.DEVICE_ID_EMULATOR)
                //.addTestDevice("DA5B0069BA8827B46FD8DBDB70EB7FAE") // Test Device 1
                //.addTestDevice("7DCEAF5D75884209E5102213D1EA33C6") // Test Device 2
                .build();

        // request an ad
        adView.loadAd(adRequest);

        return adView;
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
        if (this.adView != null) {
            this.adView.destroy();
        }

        super.onDestroy();
    }

    @Override
    public void onResume() {
        super.onResume();

        if (this.adView != null) {
            this.adView.resume();
        }
    }

    @Override
    public void onPause() {
        if (this.adView != null) {
            this.adView.pause();
        }

        super.onPause();
    }

}
