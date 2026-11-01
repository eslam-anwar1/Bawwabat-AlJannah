package com.rawh.islamic;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.GeolocationPermissions;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.view.KeyEvent;
import android.view.View;

/**
 * تطبيق بوابة الجنة - النشاط الرئيسي لتطبيق الهاتف بنظام أندرويد
 * تم عمل وتطوير هذا التطبيق بواسطة المهندسة إسلام أنور الفجم
 */
public class MainActivity extends Activity {

    private WebView mWebView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // إخفاء شريط العنوان وتحسين الواجهة
        getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
        );

        mWebView = new WebView(this);
        setContentView(mWebView);

        WebSettings webSettings = mWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setDatabaseEnabled(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);
        webSettings.setMediaPlaybackRequiresUserGesture(false);
        webSettings.setGeolocationEnabled(true);
        webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);

        mWebView.setWebViewClient(new WebViewClient());
        mWebView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                // منح الإذن بحساب الموقع للمواقيت والقبلة
                callback.invoke(origin, true, false);
            }
        });

        // تحميل ملفات التطبيق المحلية فائقة السرعة
        mWebView.loadUrl("file:///android_asset/www/index.html");
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if ((keyCode == KeyEvent.KEYCODE_BACK) && mWebView.canGoBack()) {
            mWebView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }
}
