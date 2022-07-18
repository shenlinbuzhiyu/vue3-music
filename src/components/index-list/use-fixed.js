import { ref, watch, nextTick } from 'vue'
export default function useFixed(props) {
    const groupRef = ref(null)
    const listHeight = ref([])
    watch(() => props.data, async() => {
        await nextTick()
        calculate()
    })
    function calculate() {
        const list = groupRef.value.children
        let height = 0
        const listHeightVal = listHeight.value
        listHeightVal.length = 0
        listHeightVal.push(height)

        for (let i = 0; i < list.length; i++) {
            height += list[i].clientHeight
            listHeight.value.push(height)
        }
    }
    function onScroll() {

    }
    return { groupRef, onScroll }
}
