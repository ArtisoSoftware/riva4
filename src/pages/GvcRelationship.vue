<template>
  <div class="row">
    <div style="width: 260px"><MenuSide :menu="31" :openMenu="2" /></div>
    <div class="col fixedScreen">
      <div style="width: 1000px; margin: auto">
        <div class="q-px-xl q-py-md" style="font-size: 24px; font-weight: 500">
          Section 1
        </div>
        <div class="row items-center">
          <div class="col-8">
            <img
              src="../../public/images/overview.jpg"
              alt=""
              style="width: 100%; max-width: 600px"
            />
          </div>
          <div class="col row justify-center">
            <div class="q-pt-lg">
              <q-btn
                label="Upload full CSV"
                no-caps
                dense
                style="
                  width: 180px;
                  font-size: 16px;
                  background-color: #2c4e96;
                  color: white;
                "
              />
            </div>
            <div class="q-pt-lg">
              <q-btn
                label="Upload partial CSV"
                no-caps
                dense
                style="
                  width: 180px;
                  font-size: 16px;
                  background-color: #2c4e96;
                  color: white;
                "
              />
            </div>
          </div>
        </div>
        <hr style="width: 100%" />
      </div>

      <div style="width: 1000px; margin: auto">
        <div class="q-px-xl q-py-md" style="font-size: 24px">Secton 2</div>
        <div class="row items-center">
          <div class="col-8">
            <img
              src="../../public/images/byExporting.jpg"
              alt=""
              style="width: 100%; max-width: 600px"
            />
          </div>
          <div class="col row justify-center">
            <div class="q-pt-lg">
              <q-btn
                label="Upload full CSV"
                no-caps
                dense
                style="
                  width: 180px;
                  font-size: 16px;
                  background-color: #2c4e96;
                  color: white;
                "
              />
            </div>
            <div class="q-pt-lg">
              <q-btn
                label="Upload partial CSV"
                no-caps
                dense
                style="
                  width: 180px;
                  font-size: 16px;
                  background-color: #2c4e96;
                  color: white;
                "
              />
            </div>
          </div>
        </div>
      </div>
      <hr style="width: 95%" />
      <div style="width: 1000px; margin: auto">
        <div class="q-px-xl q-py-md" style="font-size: 24px">Section 3</div>
        <div class="row items-center">
          <div class="col-8">
            <img
              src="../../public/images/byPartner.jpg"
              alt=""
              style="width: 100%; max-width: 600px"
            />
          </div>
          <div class="col row justify-center">
            <div class="q-pt-lg">
              <q-btn
                label="Upload full CSV"
                no-caps
                dense
                style="
                  width: 180px;
                  font-size: 16px;
                  background-color: #2c4e96;
                  color: white;
                "
              />
            </div>
            <div class="q-pt-lg">
              <q-btn
                label="Upload partial CSV"
                no-caps
                dense
                style="
                  width: 180px;
                  font-size: 16px;
                  background-color: #2c4e96;
                  color: white;
                "
              />
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
