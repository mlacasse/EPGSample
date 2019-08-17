#ifndef _YOUIREACT_IMAGE_UTILITY_MODULE_H
#define _YOUIREACT_IMAGE_UTILITY_MODULE_H

#include "youireact/NativeModule.h"

class YI_RN_MODULE(ImageUtilityModule)
{
public:
    YI_RN_EXPORT_NAME(ImageUtilityModule);
    
    YI_RN_EXPORT_METHOD(reset)(uint64_t tag);

    YI_RN_EXPORT_METHOD(setImage)(uint64_t tag, std::string uri);

    YI_RN_EXPORT_METHOD(show)(uint64_t tag, bool bVisible);
};

#endif
