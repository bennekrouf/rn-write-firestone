import React

@objc(FirebaseConfigExtractor)
class FirebaseConfigExtractor: NSObject, RCTBridgeModule {
  static func moduleName() -> String {
    return "FirebaseConfigExtractor"
  }

  @objc func extractConfig(_ resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
    if let path = Bundle.main.path(forResource: "GoogleService-Info", ofType: "plist"),
       let plist = NSDictionary(contentsOfFile: path) as? [String: Any] {
      let config: [String: Any] = [
        "apiKey": plist["API_KEY"] as? String ?? "",
        "authDomain": "\(plist["PROJECT_ID"] as? String ?? "").firebaseapp.com",
        "projectId": plist["PROJECT_ID"] as? String ?? "",
        "storageBucket": "\(plist["PROJECT_ID"] as? String ?? "").appspot.com",
        "messagingSenderId": plist["GCM_SENDER_ID"] as? String ?? "",
        "appId": plist["GOOGLE_APP_ID"] as? String ?? "",
        "measurementId": "", // Add logic for measurement ID if needed
        "databaseURL": "https://\(plist["PROJECT_ID"] as? String ?? "").firebaseio.com"
      ]
      resolver(config)
    } else {
      rejecter("ERR_UNEXPECTED_EXCEPTION", "Could not read the GoogleService-Info.plist", nil)
    }
  }
}
