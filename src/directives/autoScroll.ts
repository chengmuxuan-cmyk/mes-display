// src/directives/autoScroll.ts
import type { Directive } from 'vue'
import { onBeforeUnmount } from 'vue'

const autoScroll: Directive = {
    mounted(el: HTMLElement, binding) {
        const {
            step = 1,
            interval = 50
        } = binding.value || {}

        let scrollInterval: ReturnType<typeof setInterval> | null = null

        const startScroll = () => {
            if (scrollInterval) return

            scrollInterval = setInterval(() => {
                const { scrollTop, scrollHeight, clientHeight } = el

                if (scrollTop + clientHeight >= scrollHeight) {
                    el.scrollTop = 0
                } else {
                    el.scrollTop += step
                }
            }, interval)
        }

        const stopScroll = () => {
            if (scrollInterval) {
                clearInterval(scrollInterval)
                scrollInterval = null
            }
        }

        // 启动滚动
        startScroll()

        // 绑定鼠标事件（可选）：悬停停止滚动
        el.addEventListener('mouseenter', stopScroll)
        el.addEventListener('mouseleave', startScroll)

        // 指令卸载时清除定时器
        onBeforeUnmount(() => {
            stopScroll()
            el.removeEventListener('mouseenter', stopScroll)
            el.removeEventListener('mouseleave', startScroll)
        })
    }
}

export default autoScroll
