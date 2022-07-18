import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { onMounted, ref, onUnmounted } from 'vue'
BScroll.use(Slide)
export default function useSlider(wrapperRef) {
    const slider = ref(null)
    const currentPageIndex = ref(0)
    /*
    要在onMounted上获取dom元素
    在setup的时候，dom元素还没有被创建，一切都处于混沌状态，
    只有setup完毕了HTML才能完整构建，才能真正访问到value值，所以自然无法获取到dom节点
    */
    onMounted(() => {
        const sliderVal = slider.value = new BScroll(wrapperRef.value, {
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: false,
            bounce: false,
            probeType: 2,
            slide: true
        })
        sliderVal.on('slideWillChange', (page) => {
            currentPageIndex.value = page.pageX
        })
    })

    onUnmounted(() => {
        slider.value.destory()
    })

    return {
        slider,
        currentPageIndex
    }
}
