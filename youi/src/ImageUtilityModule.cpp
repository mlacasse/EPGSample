#include "ImageUtilityModule.h"

#include "utility/FileUtilities.h"

#include <view/YiImageView.h>
#include <youireact/IBridge.h>
#include <youireact/ReactBridge.h>
#include <youireact/ReactBridge_inl.h>
#include <youireact/ShadowTree.h>

#define LOG_TAG "ImageUtilityModule"

YI_RN_INSTANTIATE_MODULE(ImageUtilityModule);

YI_RN_DEFINE_EXPORT_METHOD(ImageUtilityModule, reset)(uint64_t tag)
{
    auto &shadowRegistry = GetBridge().GetShadowTree().GetShadowRegistry();

    auto pComponent = shadowRegistry.Get(tag);
    if (pComponent)
    {
        auto pCounterpart = pComponent->GetCounterpart();
        if (pCounterpart)
        {
            CYIImageView *pImageView = dynamic_cast<CYIImageView *>(pCounterpart);
            if (pImageView)
            {
                pImageView->Reset();
            }
        }
    }
}

YI_RN_DEFINE_EXPORT_METHOD(ImageUtilityModule, setImage)(uint64_t tag, std::string uri)
{
    auto &shadowRegistry = GetBridge().GetShadowTree().GetShadowRegistry();

    auto pComponent = shadowRegistry.Get(tag);
    if (pComponent)
    {
        auto pCounterpart = pComponent->GetCounterpart();
        if (pCounterpart)
        {
            CYIImageView *pImageView = dynamic_cast<CYIImageView *>(pCounterpart);
            if (pImageView)
            {
                ModifyResourceFilePath(uri, &CYIAssetTextureBase::GetClassTypeInfo());
                pImageView->SetImage(CYIUrl{move(uri)});
            }
        }
    }
}

YI_RN_DEFINE_EXPORT_METHOD(ImageUtilityModule, show)(uint64_t tag, bool bVisible)
{
    auto &shadowRegistry = GetBridge().GetShadowTree().GetShadowRegistry();

    auto pComponent = shadowRegistry.Get(tag);
    if (pComponent)
    {
        auto pCounterpart = pComponent->GetCounterpart();
        if (pCounterpart)
        {
            CYISceneView *pSceneView = dynamic_cast<CYISceneView *>(pCounterpart);
            if (pSceneView)
            {
                bVisible ? pSceneView->Show() : pSceneView->Hide();
            }
        }
    }
}
