#ifndef _ORIENTATION_LOCK_MODULE_H_
#define _ORIENTATION_LOCK_MODULE_H_

#include <platform/YiApplicationOrientationBridge.h>
#include <signal/YiSignalHandler.h>
#include <youireact/NativeModule.h>

class YI_RN_MODULE(OrientationLockModule)
{
public:
    YI_RN_EXPORT_NAME(OrientationLock);
    OrientationLockModule();
    YI_RN_EXPORT_METHOD(setRotationMode)(uint64_t mode);
private:
    CYIApplicationOrientationBridge *pOrientationBridge;
};

#endif
