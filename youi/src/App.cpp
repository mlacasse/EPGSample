// © You i Labs Inc. 2000-2019. All rights reserved.
#include "App.h"
#include "DimensionsModule.h"
#include "OrientationLockModule.h"

#include <JSBundlingStrings.h>
#include <appium/YiWebDriverLocator.h>
#include <cxxreact/JSBigString.h>
#include <glog/logging.h>

#include <logging/YiLogger.h>
#include <logging/YiLoggerHelper.h>
#include <framework/YiFramework.h>

App::App() = default;

App::~App() = default;

using namespace yi::react;

bool App::UserInit()
{
    enum
    {
      /** This value was picked through trial and error.
       Too small makes the application crash; better to be safe and pick a larger buffer
       size for networking than guessing the lowest magical value.
       */
          oneMegabyteInBytes = 1048576
    };

    // Disable hud
    SetHUDVisibility(false);

    // Setup Logging Preferences
    std::shared_ptr<CYIPreferences> pPreferences(new CYIPreferences());

    // App wide Log preferences
    pPreferences->Set("TAG_GENERAL", "DEBUG");

    // Error messages
    pPreferences->Set("TAG_CYIAssetDownloadHelper", "ERROR");
    pPreferences->Set("TAG_CYIExoPlayer", "ERROR");
    pPreferences->Set("TAG_CYIHTTPService", "ERROR");
    pPreferences->Set("TAG_CYIHTTPServiceStats", "ERROR");
    pPreferences->Set("TAG_CYILRUCache", "ERROR");
    pPreferences->Set("TAG_CYIPersistentStorePriv_Default", "ERROR");
    pPreferences->Set("TAG_CYISceneManager", "ERROR");
    pPreferences->Set("TAG_CYITransferHandle", "ERROR");
    pPreferences->Set("TAG_DecoratorMap", "ERROR");
    pPreferences->Set("TAG_EventDispatcherModule", "ERROR");
    pPreferences->Set("TAG_NativeAnimatedNodesManager", "ERROR");
    pPreferences->Set("TAG_CYIScreenTransitionManager", "ERROR");
    pPreferences->Set("TAG_CYISecureStorageBridgeDefault", "ERROR");
    pPreferences->Set("TAG_ScrollViewManagerModule", "ERROR");
    pPreferences->Set("TAG_ShadowTree", "ERROR");
    pPreferences->Set("TAG_CYITCPSocketPriv_Base", "ERROR");
    pPreferences->Set("TAG_TimingModule", "ERROR");
    pPreferences->Set("TAG_Transfer", "ERROR");
    pPreferences->Set("TAG_UIManagerModule", "ERROR");

    // Debug messages
    pPreferences->Set("TAG_CYIPersistentCache", "DEBUG");

    // Info messages
    pPreferences->Set("TAG_JavaScript", "INFO");

    // Suppressed messages
    pPreferences->Set("TAG_CYIImageView", "NONE");
    pPreferences->Set("TAG_CYISceneNode", "NONE");

    CYILogger::SetPreferences(pPreferences);

    CYINetworkConfiguration config;

    config.SetResponseCacheSize(oneMegabyteInBytes * 12);
    config.SetPersistentCacheSize(0);

    CYIHTTPService::GetInstance()->Start(config);
    CYIHTTPService::GetInstance()->ClearCache();

    // Start the web driver for allowing the use of Appium.
    CYIWebDriver *pWebDriver = CYIWebDriverLocator::GetWebDriver();
    if (pWebDriver)
    {
        pWebDriver->Start();
    }

#if !defined(YI_MINI_GLOG)
    // miniglog defines this using a non-const char * causing a compile error and it has no implementation anyway.
    static bool isGoogleLoggingInitialized = false;
    if (!isGoogleLoggingInitialized)
    {
        google::InitGoogleLogging("--logtostderr=1");
        isGoogleLoggingInitialized = true;
    }
#endif

    std::unique_ptr<JsBundleLoader>pBundleLoader(GetBundler());

    PlatformApp::SetJsBundleLoader(std::move(pBundleLoader));

    bool result = PlatformApp::UserInit();

    GetBridge().AddModule<OrientationLockModule>();
    GetBridge().AddModule<DimensionsModule>();

    return result;
}

bool App::UserStart()
{
    return PlatformApp::UserStart();
}

void App::UserUpdate()
{
    PlatformApp::UserUpdate();
}
