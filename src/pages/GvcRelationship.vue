<template>
  <div class="row">
    <div style="width: 260px"><MenuSide :menu="25" :openMenu="2" /></div>
    <div class="col fixedScreen">
      <GVC_1 />
      <GVC_2 />
      <GVC_3 />
    </div>
  </div>
</template>

<script setup>
import MenuSide from "../components/MenuSide.vue";
import GVC_1 from "../components/Gvc_relationships1.vue";
import GVC_2 from "../components/Gvc_relationships2.vue";
import GVC_3 from "../components/Gvc_relationships3.vue";
</script>

<style lang="scss" scoped>
.fixedScreen {
  height: 100vh;
  overflow-y: auto;
}
</style>
