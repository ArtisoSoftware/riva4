<template>
  <div class="row">
    <div style="width: 260px"><MenuSide :menu="27" :openMenu="2" /></div>
    <div class="col fixedScreen q-pa-lg">
      <div style="width: 1140px; margin: auto">
        <div class="row justify-between">
          <div class="title">Section 1</div>
          <div class="cursor-pointer"><u>How do I upload data?</u></div>
        </div>
        <div class="row">
          <div style="width: 600px">
            <img
              src="../../public/images/28-1.jpg"
              alt=""
              style="width: 100%"
            />
          </div>
          <div style="width: 100px"></div>
          <div style="font-size: 16px">
            <div class="row q-pt-xl">
              Use the data from section 1 of the structure of value added.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MenuSide from "../components/MenuSide.vue";
</script>

<style lang="scss" scoped>
.fixedScreen {
  height: 100vh;
  overflow-y: auto;
}
</style>
