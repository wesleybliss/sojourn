import { throttledQueue, seconds } from 'throttled-queue'

const throttle = throttledQueue({
    maxPerInterval: 1,
    interval: seconds(1),
}) // at most make 1 request every second.
