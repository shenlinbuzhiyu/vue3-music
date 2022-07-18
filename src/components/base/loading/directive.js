import { createApp } from 'vue'
import Loading from './loading'
import { addClass, removeClass } from '@/assets/js/dom'

const relativeCls = 'g-relative'
const loadingDirective = {
    mounted(el, binding) {
        const app = createApp(Loading)
        const instance = app.mount(document.createElement('div'))
        el.instance = instance
        const title = binding.arg
        if (typeof title !== 'undefined') {
            instance.setTitle(title)
        }
        if (binding.value) {
            append(el)
        }
    },
    updated(el, binding) {
        const title = binding.arg
        if (typeof title !== 'undefined') {
            el.instance.setTitle(title)
        }
        if (binding.value !== binding.oldValue) {
            binding.value ? append(el) : remove(el)
        }
    }
}
function append(el) {
    const style = getComputedStyle(el)
    if (['absoult', 'relative', 'fixed'].indexOf(style.position) === -1) {
        addClass(el, relativeCls)
    }
    el.appendChild(el.instance.$el)
}
function remove(el) {
    el.removeChild(el.instance.$el)
    removeClass(el, relativeCls)
}
export default loadingDirective
