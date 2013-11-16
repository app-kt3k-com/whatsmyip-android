package com.kt3k.app.whatsmyip;

import java.io.File;

import org.kt3k.straw.Straw;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.ProgressDialog;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.Window;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.LinearLayout;

import com.google.ads.*;

public class BaseActivity extends Activity {

	private WebView webView;
	private AdView adView;
	private LinearLayout layout;

	private Boolean adEnabled = true;
	private String url = null;

	/**
	 * do window settings
	 */
	private void windowSetting() {
		this.requestWindowFeature(Window.FEATURE_NO_TITLE);
	}

	/**
	 * set up the main layout.
	 */
	private void setUpContents() {

		// set up layout and add subviews.
		layout = new LinearLayout(this);
		layout.setOrientation(LinearLayout.VERTICAL);
		setContentView(layout);

		// set up and layout the WebView
		setUpWebView();
		layout.addView(webView, new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT, 1.0f));

		// if the ad-flag is true, then set up and layout the AdView.
		if (adEnabled) {
			setUpAdView();

			adView.setGravity(Gravity.BOTTOM);

			LinearLayout.LayoutParams p = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT, 0.0f);

			p.gravity = Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL;

			layout.addView(adView, p);
		}
	}

	/**
	 * do WebView settings
	 */
	@SuppressLint("SetJavaScriptEnabled")
	private void setUpWebView() {
		webView = new WebView(this);
		if(url == null || "".equals(url)) {
			url = this.getAppHome() + this.getAppIndex();
		}

		// スクロールバーのスタイルを設定
		webView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
		webView.setScrollbarFadingEnabled(true);

		// WebViewClient と WebChromeClient をセット
		webView.setWebViewClient(new CustomWebViewClient());
		webView.setWebChromeClient(new WebChromeClient());

		// JavaScript を有効化
		webView.getSettings().setJavaScriptEnabled(true);
		// DomStorage (Web Storage) を有効化
		webView.getSettings().setDomStorageEnabled(true);
		// DB の path を指定する。
		webView.getSettings().setDatabasePath((new File(getCacheDir(), "/database")).toString());
		// 背景色
		webView.setBackgroundColor(Color.WHITE);

		// Straw insert
		Straw.insertInto(webView).addPlugins(org.kt3k.straw.plugin.BasicPlugins.names);


		webView.loadUrl(url);
	}

	private void setUpAdView() {
		adView = new AdView(this, AdSize.BANNER, getPublisherId());

		AdRequest adRequest = new AdRequest();
		adRequest.addTestDevice(AdRequest.TEST_EMULATOR);
		adRequest.addTestDevice("DA5B0069BA8827B46FD8DBDB70EB7FAE"); // Test Device 1
		adRequest.addTestDevice("7DCEAF5D75884209E5102213D1EA33C6"); // Test Device 2
		adView.loadAd(adRequest);
	}

	private String getStringWithDefault(String key, String defaultValue) {
		String str = null;

		try {
			int resId = R.string.class.getField(key).getInt(null);
			str = this.getString(resId);
		} catch (Exception e) {
			str = defaultValue;
		}

		return str;
	}

	private String getAppHome() {
		return this.getStringWithDefault("app_home", "file:///android_asset/");
	}

	private String getAppIndex() {
		return this.getStringWithDefault("app_index", "index.html");
	}

	private String getPublisherId() {
		return this.getStringWithDefault("app_publisher_id", "");
	}

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

        this.windowSetting();

        this.setUpContents();
	}

    class CustomWebViewClient extends WebViewClient {
        private ProgressDialog dialog;

        public CustomWebViewClient() {
            super();
            dialog = null;
        }

        //ページ読み込み開始時の動作
        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            //ダイアログを作成して表示
            dialog = new ProgressDialog(view.getContext());
            dialog.setMessage(getStringWithDefault("wait_message", "Loading"));
            dialog.show();
        }

        //ページ読み込み終了時の動作
        @Override
        public void onPageFinished(WebView view, String url) {
            if (null != dialog) {
                //ダイアログを削除
                dialog.dismiss();
                dialog = null;
            }
        }
    }
}
