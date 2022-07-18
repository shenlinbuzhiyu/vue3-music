import { onMounted, ref, onUnmounted } from 'vue'
import ObserveDOM from '@better-scroll/observe-dom'
import BScroll from '@better-scroll/core'
BScroll.use(ObserveDOM)
export default function useScroll(wrapperRef, options, emit) {
    const scroll = ref(null)
    onMounted(() => {
        const scrollVal = scroll.value = new BScroll(wrapperRef.value, {
            // !!!!!!!!!巨坑 observeDOM 是小写的o
            observeDOM: true,
            ...options
        })
        // scroll.value = new BScroll(wrapperRef.value, options)

        if (options.probeType > 0) {
            scrollVal.on('scroll', (pos) => {
                emit('scroll', pos)
            })
        }
    })
    onUnmounted(() => {
        scroll.value.destroy()
    })
    // return scroll
}
