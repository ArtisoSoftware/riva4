<template>
  <div class="row">
    <div style="width: 260px"><MenuSide :menu="25" :openMenu="2" /></div>
    <div class="col fixedScreen">
      <GVC_1 />
      <GVC_2 />
      <GVC_3 />
      <!-- <div style="width: 1000px; margin: auto">
        <div class="q-px-xl q-py-md" style="font-size: 24px; font-weight: 500">
          Section 1
        </div>
        <div class="row items-center">
          <div class="col-8">
            <img
              src="../../public/images/overview.jpg"
              alt=""
              style="width: 100%; max-width: 800px"
            />
          </div>
          <div class="col">
            <div class="row">
              <div>
                <q-file
                  v-model="file1"
                  label="Upload CSV"
                  accept=".csv"
                  outlined
                  style="width: 200px"
                  dense
                />
              </div>
              <div class="q-px-md">
                <q-btn
                  label="Upload"
                  no-caps
                  class="btnLine1"
                  color="primary"
                  @click="uploadFile1"
                />
              </div>
            </div>
            <div class="q-pt-md row">
              <div>
                <q-btn
                  label="Clear data"
                  no-caps
                  class="btnLine2"
                  color="negative"
                  outline
                  @click="clearData1()"
                />
              </div>
              <div class="q-pl-md">
                <q-btn
                  label="Optimize database"
                  no-caps
                  class="btnLine2"
                  color="secondary"
                  outline
                  @click="makeIndex1()"
                />
              </div>
            </div>
          </div>
        </div>
        <hr style="width: 100%" />
      </div> -->

      <!-- <div style="width: 1000px; margin: auto">
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
              <div class="q-pt-lg">
                <q-file
                  v-model="file2"
                  label="Upload CSV"
                  accept=".csv"
                  @input="uploadFile2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr style="width: 95%" /> -->
      <!-- <div style="width: 1000px; margin: auto">
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
              <div class="q-pt-lg">
                <q-file
                  v-model="file3"
                  label="Upload CSV"
                  accept=".csv"
                  @input="uploadFile3"
                />
              </div>
            </div>
          </div>
        </div>
      </div> -->
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
