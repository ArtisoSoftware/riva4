<template>
  <div class="row">
    <div style="width: 260px"><MenuSide :menu="27" :openMenu="2" /></div>
    <div class="col fixedScreen">
      <div style="width: 1000px; margin: auto">
        <div class="q-px-xl q-py-md" style="font-size: 24px; font-weight: 500">
          Section 1
        </div>
        <div class="row items-center">
          <div class="col-8">
            <img
              src="../../public/images/27-1.jpg"
              alt=""
              style="width: 100%; max-width: 600px"
            />
          </div>
          <div class="col row justify-center">
            This data can be integrated with the data in Section 1 in Structure
            of value added page.
          </div>
        </div>
        <hr style="width: 100%" />
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
