#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(FirebaseConfigExtractor, NSObject)

RCT_EXTERN_METHOD(extractConfig: (RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter)

@end
