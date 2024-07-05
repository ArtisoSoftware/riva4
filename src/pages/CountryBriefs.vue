<template>
  <div class="row">
    <div style="width: 260px"><MenuSide :menu="210" :openMenu="2" /></div>
    <div class="col fixedScreen">
      <div style="width: 1000px; margin: auto">
        <div class="q-px-xl q-py-md" style="font-size: 24px; font-weight: 500">
          Section 1
        </div>
        <div class="row items-center">
          <div class="col-8">
            <img
              src="../../public/images/210.jpg"
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
                @click="uploadFullBtn(1)"
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
                @click="uploadPartialBtn(1)"
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
              src="../../public/images/29-2.jpg"
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
                @click="uploadFullBtn(2)"
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
                @click="uploadPartialBtn(2)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- upload full CSV dialog -->
    <q-dialog v-model="isUploadFull" persistent>
      <div class="uploadFullDia">
        <div class="headBar">
          <div class="q-px-md" style="font-size: 20px">Upload Full CSV</div>
        </div>
        <div class="q-pt-lg row justify-center" style="font-size: 16px">
          Uploading new data will delete existing records. <br />Continue?
        </div>
        <div class="q-px-md row justify-center q-pt-lg">
          <div>
            <q-btn
              label="No, cancel"
              no-caps
              class="CancelBtn"
              outline
              @click="closeUploadFullCSVBtn"
              style="width: 140px"
            />
          </div>
          <div style="width: 25px"></div>
          <div>
            <q-btn
              label="Yes, I understand"
              no-caps
              class="CtaBtn"
              style="width: 140px; background-color: #ffca4f"
              @click="understandUploadFullCsvBtn"
            />
          </div>
        </div>
      </div>
    </q-dialog>
    <!-- upload full CSV file dialog -->
    <q-dialog v-model="isUploadFullFile" persistent>
      <div class="uploadFullDia">
        <div class="headBar">
          <div class="q-px-md" style="font-size: 20px">
            Please choose CSV file to upload
          </div>
          <div>
            <q-input
              @update:model-value="
                (val) => {
                  fullFileCSV = val[0];
                }
              "
              filled
              type="file"
            />
          </div>
          <div class="q-px-md row justify-center q-pt-lg text-black">
            <div>
              <q-btn
                label="Cancel"
                no-caps
                outline
                @click="cancelUploadFullCSV"
                style="width: 140px"
              />
            </div>
            <div style="width: 25px"></div>
            <div>
              <q-btn
                label="Upload"
                no-caps
                class="CtaBtn"
                style="width: 140px; background-color: #ffca4f"
                @click="UploadFullCsvBtn"
              />
            </div>
          </div>
        </div>
      </div>
    </q-dialog>

    <!-- upload partial CSV file dialog -->
    <q-dialog v-model="isUploadPartialFile" persistent>
      <div class="uploadFullDia">
        <div class="headBar">
          <div class="q-px-md" style="font-size: 20px">
            Please choose CSV file to upload
          </div>
        </div>

        <div class="">
          <q-input
            @update:model-value="
              (val) => {
                partialFileCSV = val[0];
              }
            "
            filled
            type="file"
          />
        </div>
        <div class="q-px-md row justify-center q-pt-md text-black">
          <div>
            <q-btn
              label="Cancel"
              no-caps
              outline
              @click="cancelUploadPartialCSV"
              style="width: 140px"
            />
          </div>
          <div style="width: 25px"></div>
          <div>
            <q-btn
              label="Upload"
              no-caps
              class="CtaBtn"
              style="width: 140px; background-color: #ffca4f"
              @click="UploadPartialCsvBtn"
            />
          </div>
        </div>
        <div class="text-black q-pa-md">
          Uploading this CSV file will delete and replace the existing economic
          data for the specified countries.
        </div>
      </div>
    </q-dialog>
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
