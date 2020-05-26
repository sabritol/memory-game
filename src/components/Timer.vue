<template>
    <p>Time spent playing: {{ formatedTime }}</p>
</template>

<script>
export default {
    data() {
        return {
            seconds: 0
        }
    },
    created() {
        setInterval(() => {
            if(!this.$store.state.timer) return;
            this.seconds ++;
        }, 1000);
    },
    computed: {
        formatedTime() {
            let time = new Date(null);
            time.setSeconds(this.seconds);
            return time.toISOString().substr(11, 8);
        }
    }
}
</script>