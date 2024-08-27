<template>
  <div class="row">
    <div style="width: 260px"><MenuSide :menu="28" :openMenu="2" /></div>
    <div class="col fixedScreen">
      <div style="width: 1000px; margin: auto">
        <div class="text-h4 q-py-md">Select by exporting sector</div>
        <back_1 />
        <!-- <SVA_2 />
        <SVA_3 /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import MenuSide from "../components/MenuSide.vue";
import back_1 from "../components/BackLinkSector1.vue";
// import SVA_2 from "../components/Structure_value_added2.vue";
// import SVA_3 from "../components/Structure_value_added3.vue";
</script>

<style lang="scss" scoped>
.fixedScreen {
  height: 100vh;
  overflow-y: auto;
}
</style>
