<template>
  <div class="row">
    <div style="width: 260px"><menu-side :menu="0" :openMenu="0" /></div>
    <div class="col">
      <div
        style="
          width: 100%;
          height: 50vh;
          background-color: #0f4c8a;
          color: white;
        "
        class="row justify-center"
      >
        <div>
          <div class="text-center welcomeText q-pt-xl">Welcome to</div>
          <div class="text-center subTitleText">RIVA Control Center</div>
        </div>
      </div>
      <div class="welcomePic row justify-center">
        <img src="images/welcome.png" alt="" />
      </div>
      <div class="row justify-center" style="position: relative; top: -50px">
        <div><img src="images/arrowleft.svg" alt="" /></div>
        <div class="promptText q-px-md q-pt-sm">Please select left menu</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MenuSide from "../components/MenuSide.vue";
import { useAuth } from "./auth";
const { checkHashkey } = useAuth();
checkHashkey();
</script>

<style lang="scss" scoped>
.welcomeText {
  font-size: 80px;
  font-weight: 500;
}
.subTitleText {
  font-size: 36px;
}
.welcomePic {
  position: relative;
  top: -200px;
}
.promptText {
  font-size: 36px;
  color: #0f4c8a;
}
</style>
