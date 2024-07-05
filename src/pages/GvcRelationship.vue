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
                @click="uploadFullBtn(3)"
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
      <div class="uploadFullDia">xxxx</div>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MenuSide from "../components/MenuSide.vue";

const isUploadFull = ref(false);
const uploadFullBtn = (id) => {
  isUploadFull.value = true;
};
const closeUploadFullCSVBtn = (id) => {
  isUploadFull.value = false;
};

const isUploadFullFile = ref(false);
const understandUploadFullCsvBtn = (id) => {
  isUploadFullFile.value = true;
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
  height: 235px;
  background-color: white;
}
.headBar {
  background-color: #04284d;
  color: white;
  height: 45px;
  line-height: 45px;
}
</style>
