<template>
  <div class="row">
    <div style="width: 260px"><MenuSide :menu="26" :openMenu="2" /></div>
    <div class="col fixedScreen q-pa-lg">
      <div style="width: 1140px; margin: auto">
        <div class="row justify-between">
          <div class="title">Section 1</div>
          <div class="cursor-pointer"><u>How do I upload data?</u></div>
        </div>

        <div class="row">
          <div style="width: 600px">
            <img
              src="../../public/images/26-1.jpg"
              alt=""
              style="width: 100%"
            />
          </div>
          <div style="width: 100px"></div>
          <div style="font-size: 16px">
            <div class="row q-pt-xl">
              <div style="width: 140px">Table:</div>
              <div style="width: 300px">va_str_value_added1</div>
            </div>
            <div class="row">
              <div style="width: 140px">Data folder:</div>
              <div style="width: 300px">
                Structure_of_value_added/REP_PART_X
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="title">Section 2</div>
        <div class="row">
          <div style="width: 600px">
            <img
              src="../../public/images/26-2.jpg"
              alt=""
              style="width: 100%"
            />
          </div>
          <div style="width: 100px"></div>
          <div style="font-size: 16px">
            <div class="row q-pt-xl">
              <div style="width: 140px">Main table:</div>
              <div style="width: 300px">va_str_value_added2</div>
            </div>
            <div class="row">
              <div style="width: 140px">Main data folder:</div>
              <div style="width: 300px">
                Structure_of_value_added/REP_PART_TB
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="title">Section 3</div>
        <div class="row">
          <div style="width: 600px">
            <img
              src="../../public/images/26-3.jpg"
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
import MenuSide from "../components/MenuSide.vue";
</script>

<style lang="scss" scoped>
.fixedScreen {
  height: 100vh;
  overflow-y: auto;
}
</style>
