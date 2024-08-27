<template>
  <div class="row">
    <div style="width: 260px"><MenuSide :menu="26" :openMenu="2" /></div>
    <div class="col fixedScreen">
      <SVA_1 />
      <SVA_2 />
      <SVA_3 />
    </div>
  </div>
</template>

<script setup>
import MenuSide from "../components/MenuSide.vue";
import SVA_1 from "../components/Structure_value_added1.vue";
import SVA_2 from "../components/Structure_value_added2.vue";
import SVA_3 from "../components/Structure_value_added3.vue";
</script>

<style lang="scss" scoped>
.fixedScreen {
  height: 100vh;
  overflow-y: auto;
}
</style>
