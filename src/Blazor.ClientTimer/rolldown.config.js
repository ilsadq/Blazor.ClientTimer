import {defineConfig} from "rolldown";

export default defineConfig({
    input: "TimerCountdown.js",
    output: {
        file: "wwwroot/TimerCountdown.js",
        format: "iife",
        sourcemap: true,
        minify: true,
    },
    treeshake: true,
    platform: "browser",
})