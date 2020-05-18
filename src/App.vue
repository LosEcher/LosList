<!-- @format -->

<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "App",
});
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}
html,
body {
    padding: 0;
    margin: 0;
    background-color: var(--main-bg-color)
}
</style>

<style >
@import './assets/css/basic.css';
</style>
