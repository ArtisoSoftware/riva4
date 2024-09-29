<template>
  <div class="row">
    <div style="width: 260px"><MenuSide :menu="25" :openMenu="2" /></div>
    <div class="col fixedScreen q-pa-lg">
      <div style="width: 1140px; margin: auto">
        <div class="row justify-between">
          <div class="title">Section 1</div>
          <div class="cursor-pointer"><u>How do I upload data?</u></div>
        </div>

        <div class="row">
          <div style="width: 600px">
            <img
              src="../../public/images/overview.jpg"
              alt=""
              style="width: 100%"
            />
          </div>
          <div style="width: 100px"></div>
          <div style="font-size: 16px">
            <div class="row q-pt-xl">
              <div style="width: 140px">Table:</div>
              <div style="width: 300px">va_gvc_overview</div>
            </div>
            <div class="row">
              <div style="width: 140px">Data folder:</div>
              <div style="width: 300px">GVC_relationships/overview</div>
            </div>
          </div>
        </div>
        <hr />
        <div class="title">Section 2</div>
        <div class="row">
          <div style="width: 600px">
            <img
              src="../../public/images/byExporting.jpg"
              alt=""
              style="width: 100%"
            />
          </div>
          <div style="width: 100px"></div>
          <div style="font-size: 16px">
            <div class="row q-pt-xl">
              <div style="width: 140px">Main table:</div>
              <div style="width: 300px">va_gvc_indicator</div>
            </div>
            <div class="row">
              <div style="width: 140px">Main data folder:</div>
              <div style="width: 300px">GVC_relationships/TOP5_IND</div>
            </div>
            <br />
            <div class="row">
              <div style="width: 140px">Detail table:</div>
              <div style="width: 300px">va_gvc_indicatot_partner</div>
            </div>
            <div class="row">
              <div style="width: 140px">Detail data folder:</div>
              <div style="width: 300px">GVC_relationships/TOP5_IND/PART</div>
            </div>
          </div>
        </div>
        <hr />
        <div class="title">Section 3</div>
        <div class="row">
          <div style="width: 600px">
            <img
              src="../../public/images/byPartner.jpg"
              alt=""
              style="width: 100%"
            />
          </div>
          <div style="width: 100px"></div>
          <div style="font-size: 16px">
            <div class="row q-pt-xl">
              <div style="width: 140px">Main table:</div>
              <div style="width: 300px">va_gvc_partner</div>
            </div>
            <div class="row">
              <div style="width: 140px">Main data folder:</div>
              <div style="width: 300px">GVC_relationships/TOP5_PART</div>
            </div>
            <br />
            <div class="row">
              <div style="width: 140px">Detail table:</div>
              <div style="width: 300px">va_gvc_partner_indicator</div>
            </div>
            <div class="row">
              <div style="width: 140px">Detail data folder:</div>
              <div style="width: 300px">GVC_relationships/TOP5_PART/IND</div>
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
