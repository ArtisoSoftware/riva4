<template>
  <div class="row">
    <div style="width: 260px"><MenuSide :menu="28" :openMenu="2" /></div>
    <div class="col fixedScreen q-pa-lg">
      <div style="width: 1140px; margin: auto">
        <div class="row justify-between">
          <div class="title">Select by exporting sector</div>
          <div class="cursor-pointer"><u>How do I upload data?</u></div>
        </div>
        <div class="title">Section 1</div>
        <div class="row">
          <div style="width: 600px">
            <img
              src="../../public/images/29-1.jpg"
              alt=""
              style="width: 100%"
            />
          </div>
          <div style="width: 100px"></div>
          <div style="font-size: 16px" class="q-pt-xl">
            <div class="row q-pt-xl">
              <div style="width: 140px">Table:</div>
              <div style="width: 300px">va_backward1</div>
            </div>
            <div class="row">
              <div style="width: 140px">Data folder:</div>
              <div style="width: 300px">Backward_linkages/IND</div>
            </div>
          </div>
        </div>
        <hr />
        <div class="title">Section 2</div>
        <div class="row">
          <div style="width: 600px">
            <img
              src="../../public/images/29-2.jpg"
              alt=""
              style="width: 100%"
            />
            <br />
            <img
              src="../../public/images/29-3.jpg"
              alt=""
              style="width: 100%"
            />
          </div>
          <div style="width: 100px"></div>
          <div style="font-size: 16px" class="q-pt-xl">
            <div class="row q-pt-xl">
              Use the data from section 1 of the backward linkages<br />
              select byexporting sector.
            </div>
          </div>
        </div>
        <hr />
        <div class="title">Select by source economy</div>
        <div class="title">Section 1</div>
        <div class="row">
          <div style="width: 600px">
            <img
              src="../../public/images/29-4.jpg"
              alt=""
              style="width: 100%"
            />
          </div>
          <div style="width: 100px"></div>
          <div style="font-size: 16px" class="q-pt-xl">
            <div class="row q-pt-xl">
              <div style="width: 140px">Table:</div>
              <div style="width: 300px">va_backward2</div>
            </div>
            <div class="row">
              <div style="width: 140px">Data folder:</div>
              <div style="width: 300px">Backward_linkages/SOURCE</div>
            </div>
          </div>
        </div>
        <hr />
        <div class="title">Section 2</div>
        <div class="row">
          <div style="width: 600px">
            <img
              src="../../public/images/29-5.jpg"
              alt=""
              style="width: 100%"
            />
            <br />
            <img
              src="../../public/images/29-6.jpg"
              alt=""
              style="width: 100%"
            />
          </div>
          <div style="width: 100px"></div>
          <div style="font-size: 16px" class="q-pt-xl">
            <div class="row q-pt-xl">
              Use the data from section 1 of the backward linkages<br />
              select source economy.
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
