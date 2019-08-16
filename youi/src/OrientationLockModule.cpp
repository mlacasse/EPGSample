#include "OrientationLockModule.h"

#include <platform/YiApplicationUIBridgeLocator.h>
#include <screen/YiScreenProperty.h>

YI_RN_INSTANTIATE_MODULE(OrientationLockModule);

CYIApplicationOrientationBridge *pOrientationBridge;

OrientationLockModule::OrientationLockModule() {
    pOrientationBridge = CYIApplicationUIBridgeLocator::GetApplicationOrientationBridge();
}

YI_RN_DEFINE_EXPORT_METHOD(OrientationLockModule, setRotationMode)(uint64_t mode) {
    if (!pOrientationBridge) return;

    CYIScreenProperty::Orientation orientation = static_cast<CYIScreenProperty::Orientation>(mode);
    
    pOrientationBridge->SetOrientation(orientation);
}
