<template>
  <div class="row">
    <div style="width: 260px"><MenuSide :menu="29" :openMenu="2" /></div>
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
              src="../../public/images/210-1.jpg"
              alt=""
              style="width: 100%"
            />
          </div>
          <div style="width: 100px"></div>
          <div style="font-size: 16px" class="q-pt-xl">
            <div class="row q-pt-xl">
              <div style="width: 140px">Table:</div>
              <div style="width: 300px">va_forward1</div>
            </div>
            <div class="row">
              <div style="width: 140px">Data folder:</div>
              <div style="width: 300px">Forward_linkages/IND</div>
            </div>
          </div>
        </div>
        <hr />
        <div class="title">Section 2</div>
        <div class="row">
          <div style="width: 600px">
            <img
              src="../../public/images/210-2.jpg"
              alt=""
              style="width: 100%"
            />
            <br />
            <img
              src="../../public/images/210-3.jpg"
              alt=""
              style="width: 100%"
            />
          </div>
          <div style="width: 100px"></div>
          <div style="font-size: 16px" class="q-pt-xl">
            <div class="row q-pt-xl">
              Use the data from section 1 of the forward linkages<br />select
              byexporting sector.
            </div>
          </div>
        </div>
        <hr />
        <div class="title">Select by importing economy</div>
        <div class="title">Section 1</div>
        <div class="row">
          <div style="width: 600px">
            <img
              src="../../public/images/210-4.jpg"
              alt=""
              style="width: 100%"
            />
          </div>
          <div style="width: 100px"></div>
          <div style="font-size: 16px" class="q-pt-xl">
            <div class="row q-pt-xl">
              Use the data from section 1 of the forward linkages<br />select
              byexporting sector.
            </div>
          </div>
        </div>
        <hr />
        <div class="title">Section 2</div>
        <div class="row">
          <div style="width: 600px">
            <img
              src="../../public/images/210-5.jpg"
              alt=""
              style="width: 100%"
            />
            <br />
            <img
              src="../../public/images/210-6.jpg"
              alt=""
              style="width: 100%"
            />
          </div>
          <div style="width: 100px"></div>
          <div style="font-size: 16px" class="q-pt-xl">
            <div class="row q-pt-xl">
              Use the data from section 1 of the forward linkages<br />select
              byexporting sector.
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

const sectionID = ref(0);

//upload  CSV full file Dialog
const isUploadFull = ref(false);
const uploadFullBtn = (id) => {
  isUploadFull.value = true;
  sectionID.value = id;
};
const closeUploadFullCSVBtn = (id) => {
  isUploadFull.value = false;
};
const isUploadFullFile = ref(false);
const fullFileCSV = ref(null);
const understandUploadFullCsvBtn = (id) => {
  isUploadFullFile.value = true;
  isUploadFull.value = false;
  fullFileCSV.value = null;
};

const cancelUploadFullCSV = () => {
  isUploadFullFile.value = false;
};
const UploadFullCsvBtn = () => {
  isUploadFullFile.value = false;
  console.log(`upload full CSV in section ${sectionID.value}`);
};

//Upload CSV partial file
const isUploadPartialFile = ref(false);
const partialFileCSV = ref(null);
const uploadPartialBtn = (id) => {
  sectionID.value = id;
  isUploadPartialFile.value = true;
  partialFileCSV.value = null;
};
const cancelUploadPartialCSV = () => {
  isUploadPartialFile.value = false;
};
const UploadPartialCsvBtn = () => {
  isUploadPartialFile.value = false;
  console.log(`upload partial CSV in section ${sectionID.value}`);
};
</script>

<style lang="scss" scoped>
.fixedScreen {
  height: 100vh;
  overflow-y: auto;
}
.uploadFullDia {
  width: 100%;
  max-width: 450px;
  height: 215px;
  background-color: white;
  overflow: hidden;
}
.headBar {
  background-color: #04284d;
  color: white;
  height: 45px;
  line-height: 45px;
}

.CtaBtn {
  width: 120px;
  background-color: #ffca4f;
}
</style>
