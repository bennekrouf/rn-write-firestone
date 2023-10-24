package com.yourprojectname;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import java.util.HashMap;
import java.util.Map;

public class FirebaseConfigExtractorModule extends ReactContextBaseJavaModule {

    public FirebaseConfigExtractorModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "FirebaseConfigExtractor";
    }

    @ReactMethod
    public void extractConfig(Promise promise) {
        try {
            // Use AssetManager to read the google-services.json file from the assets folder
            AssetManager assetManager = getReactApplicationContext().getAssets();
            InputStream input = assetManager.open("google-services.json");
            
            // Convert InputStream to String
            String json = convertStreamToString(input);

            // Use JSONObject to parse the JSON string
            JSONObject jsonObject = new JSONObject(json);
            JSONArray clientArray = jsonObject.getJSONArray("client");
            JSONObject clientObject = clientArray.getJSONObject(0);
            JSONObject projectInfo = jsonObject.getJSONObject("project_info");
            JSONArray apiKeyArray = clientObject.getJSONArray("api_key");
            JSONObject apiKeyObject = apiKeyArray.getJSONObject(0);
            
            // Extract the values
            Map<String, String> config = new HashMap<>();
            config.put("apiKey", apiKeyObject.getString("current_key"));
            config.put("authDomain", projectInfo.getString("project_id") + ".firebaseapp.com");
            config.put("projectId", projectInfo.getString("project_id"));
            config.put("storageBucket", projectInfo.getString("storage_bucket"));
            config.put("messagingSenderId", projectInfo.getString("project_number"));
            config.put("appId", clientObject.getJSONObject("client_info").getString("mobilesdk_app_id"));
            // Add logic for measurement ID if needed
            config.put("databaseURL", "https://" + projectInfo.getString("project_id") + ".firebaseio.com");
            
            promise.resolve(config);
        } catch (Exception e) {
            promise.reject("ERR_UNEXPECTED_EXCEPTION", "Error extracting Firebase config on Android", e);
        }
    }

    // Helper method to convert InputStream to String
    private String convertStreamToString(InputStream is) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(is));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line).append("\n");
        }
        reader.close();
        return sb.toString();
    }

}
