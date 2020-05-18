<!-- @format -->

<template>
    <div class="wrapper">
        <header>
            <router-link class="homebtn" to="/">.home.</router-link>
        </header>
        <section class="main">
            <router-view></router-view>
        </section>
    </div>
</template>

<script lang="ts">
export default {
    name: "Home",
};
</script>

<style scoped>
header {
    background: var(--header-color);
}
section {
    flex: 1;
    text-align: left;
    flex-flow: row wrap;
    display: flex;
    background: var(--main-bg-color);
}
</style>
