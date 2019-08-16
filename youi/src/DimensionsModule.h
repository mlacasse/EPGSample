#ifndef _DIMENSIONS_MODULE_H_
#define _DIMENSIONS_MODULE_H_

#include <signal/YiSignalHandler.h>
#include <youireact/NativeModule.h>
#include <youireact/modules/EventEmitter.h>

namespace yi
{
namespace react
{
class YI_RN_MODULE(DimensionsModule, EventEmitterModule)
{
public:
    YI_RN_EXPORT_NAME(Dimensions);
    DimensionsModule();

    YI_RN_EXPORT_CONSTANT(window);

private:
    float ratio;

    void InitReactNativeView();
    void OnSurfaceSizeChanged(int32_t width, int32_t height);
};

} // namespace react
} // namespace yi

#endif
