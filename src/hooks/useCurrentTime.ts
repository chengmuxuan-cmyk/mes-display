import { ref, onMounted, onUnmounted } from 'vue'

export function useCurrentTime() {
    const currentTime = ref('')

    function formatTime(date: Date): string {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')

        const weekdays = ['日', '一', '二', '三', '四', '五', '六']
        const weekday = weekdays[date.getDay()]

        return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds} 星期${weekday}`
    }

    let timer: number | null = null

    onMounted(() => {
        currentTime.value = formatTime(new Date())
        timer = window.setInterval(() => {
            currentTime.value = formatTime(new Date())
        }, 1000)
    })

    onUnmounted(() => {
        if (timer) {
            window.clearInterval(timer)
            timer = null
        }
    })

    return {
        currentTime
    }
}
