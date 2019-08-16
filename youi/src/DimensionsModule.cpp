#include "DimensionsModule.h"

#include <cmath>
#include <glm/gtc/constants.hpp>
#include <glm/gtc/epsilon.hpp>

#include <framework/YiApp.h>
#include <framework/YiAppContext.h>
#include <framework/YiScreen.h>
#include <platform/YiDeviceBridgeLocator.h>
#include <platform/YiDeviceTypeBridge.h>
#include <view/YiSceneView.h>
#include <youireact/YiReactNativeView.h>

static const std::string SCENE_NAME = "React";

static const float FONT_SCALE = 1.f;

using namespace yi::react;

YI_RN_INSTANTIATE_MODULE(DimensionsModule, EventEmitterModule);

#ifndef YI_IOS
namespace {
    float PpiToPixelRatio(int32_t ppi)
    {
        float approximateRatio = (float)ppi / 150;
        
        float roundedRatio = std::floor((approximateRatio * 2) + 0.5) / 2;
        
        if (roundedRatio > 3.5f)
            return 3.5f;
        else if (glm::epsilonEqual(roundedRatio, 2.5f, glm::epsilon<float>()))
            return 3.f;
        else if (roundedRatio < 1.f)
            return 1.f;
        
        return roundedRatio;
    }
}

DimensionsModule::DimensionsModule() {
    SetSupportedEvents({ "change" });

    const auto ppi = CYIAppContext::GetInstance()->GetScreen()->GetXDensity();

    #if defined(YI_ANDROID)
        CYIDeviceTypeBridge *pDeviceTypeBridge = CYIDeviceBridgeLocator::GetDeviceTypeBridge();

        DimensionsModule::ratio = (pDeviceTypeBridge->GetDeviceType() == CYIDeviceTypeBridge::Type::TV) ?
            1.f :
            PpiToPixelRatio(ppi);
    #else
        DimensionsModule::ratio = PpiToPixelRatio(ppi);
    #endif

    CYIAppContext::GetInstance()->GetApp()->SurfaceSizeChanged.Connect(*this, &DimensionsModule::OnSurfaceSizeChanged);

    InitReactNativeView();
}
#endif

void DimensionsModule::InitReactNativeView()
{
    auto *pSceneMgr = CYIAppContext::GetInstance()->GetApp()->GetSceneManager();
    auto *pScene = static_cast<CYISceneView *>(pSceneMgr->GetScene(SCENE_NAME));

    if (pScene)
    {
        auto *pReactNativeView = pScene->GetNode<CYIReactNativeView>();
        const auto *pSurface = CYIAppContext::GetInstance()->GetSurface();

        pReactNativeView->SetSize(glm::vec3{static_cast<float>(pSurface->GetWidth() / DimensionsModule::ratio), static_cast<float>(pSurface->GetHeight() / DimensionsModule::ratio), 1.f});
        pReactNativeView->SetScale(glm::vec3{DimensionsModule::ratio, DimensionsModule::ratio, 1.f});
    }
}

void DimensionsModule::OnSurfaceSizeChanged(int32_t width, int32_t height)
{
    auto *pSceneMgr = CYIAppContext::GetInstance()->GetApp()->GetSceneManager();
    auto *pScene = static_cast<CYISceneView *>(pSceneMgr->GetScene(SCENE_NAME));

    if (pScene)
    {
        auto *pReactNativeView = pScene->GetNode<CYIReactNativeView>();

        YI_RECT_REL screen(0, 0, width, height);
        pSceneMgr->UpdateScene(pScene, screen, CYISceneManager::ScaleType::ResponsiveLayout, CYISceneManager::VerticalAlignmentType::Center, CYISceneManager::HorizontalAlignmentType::Center);

        pReactNativeView->SetSize(glm::vec3{static_cast<float>(width / DimensionsModule::ratio), static_cast<float>(height / DimensionsModule::ratio), 1.f});
        pReactNativeView->SetScale(glm::vec3{DimensionsModule::ratio, DimensionsModule::ratio, 1.f});
        pScene->SetSize(glm::vec3{static_cast<float>(width), static_cast<float>(height), 0.1f});
    }

    const folly::dynamic windowDimensions(folly::dynamic::object("width", width / DimensionsModule::ratio)("height", height / DimensionsModule::ratio)("scale", DimensionsModule::ratio)("fontScale", FONT_SCALE));
    
    EmitEvent("change", folly::dynamic::object("window", windowDimensions));
}

YI_RN_DEFINE_EXPORT_CONSTANT(DimensionsModule, window)
{
    folly::dynamic windowInfo = folly::dynamic::object;
    
    const auto *pSurface = CYIAppContext::GetInstance()->GetSurface();
    if (pSurface)
    {
        windowInfo["width"] = ToDynamic(pSurface->GetWidth() / DimensionsModule::ratio);
        windowInfo["height"] = ToDynamic(pSurface->GetHeight() / DimensionsModule::ratio);
        windowInfo["scale"] = ToDynamic(DimensionsModule::ratio);
        windowInfo["fontScale"] = ToDynamic(FONT_SCALE);
    }
    
    return ToDynamic(windowInfo);
}
