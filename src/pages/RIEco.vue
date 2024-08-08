<template>
  <div class="row">
    <div style="width: 260px"><MenuSide :menu="11" :openMenu="1" /></div>
    <div class="col q-pa-md">
      <div class="text-right">
        <q-btn
          label="JSON sample file"
          class="btn"
          no-caps
          @click="downloadJSONSample()"
          style="background-color: #2c4e96; color: white"
        />
      </div>
      <div class="headBar q-mt-md row q-px-md">
        <div style="width: 5%">No.</div>
        <div class="col q-px-lg">Economics</div>
        <div style="width: 20%" class="text-center">Date</div>
        <div style="width: 10%" class="text-center">Upload</div>
      </div>
      <div
        class="row q-px-md resultList"
        v-for="n in 24"
        :key="n"
        :class="{ resultBlue: n % 2 == 0 }"
      >
        <div class="text-center" style="width: 5%">{{ n }}</div>
        <div class="col q-px-lg">{{ labelArr[n - 1] }}</div>
        <div style="width: 20%" class="text-center">{{ status(n) }}</div>
        <div
          style="width: 10%"
          class="text-center cursor-pointer"
          @click="uploadFile(n)"
        >
          <u>Upload</u>
        </div>
      </div>
    </div>
    <q-dialog v-model="isUploadShow" persistent>
      <q-card class="uploadDia">
        <div class="uploadFullDia">
          <div class="headBar">
            <div class="q-px-md" style="font-size: 20px">
              {{ labelArr[fileNum - 1] }}
            </div>
          </div>

          <div class="">
            <q-input
              @update:model-value="
                (val) => {
                  jsonFile = val[0];
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
                @click="cancelUpload"
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
                @click="UploadBtn"
              />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import MenuSide from "../components/MenuSide.vue";
import { ref, onMounted } from "vue";
import { useAuth } from "./auth.js";
import { serverSetup } from "./server.js";
import axios from "axios";
import { Notify } from "quasar";
const { checkHashkey } = useAuth();
checkHashkey();
const { serverData } = serverSetup();
const fileNum = ref(0);
const isUploadShow = ref(false);
const jsonFile = ref(null);
const labelArr = ref([
  "Integration overview",
  "Intra-group (sustainable)",
  "Intra-group (conventional)",
  "Economy-partner-reporter (sustainable)",
  "Economy-partner-partner (sustainable)",
  "Economy-partner-reporter (conventional)",
  "Economy-partner-partner (conventional)",
  "Build your own-reporter (sustainable)",
  "Build your own-partner (sustainable)",
  "Build your own-reporter (conventional)",
  "Build your own-partner (conventional)",
  "Data availability all data (sustainable)",
  "Data availability all data (conventional)",
  "Data availability DigiSRII (sustainable)",
  "Data availability DigiSRII (conventional)",
  "Data availability spec all data reporter (sustainable)",
  "Data availability spec all data partner (sustainable)",
  "Data availability spec DigiSRII reporter (sustainable)",
  "Data availability spec DigiSRII partner (sustainable)",
  "Data availability spec all data reporter (conventional)",
  "Data availability spec all data partner (conventional)",
  "Data availability spec DigiSRII reporter (conventional)",
  "Data availability spec DigiSRII partner (conventional)",
  "Country brief",
]);
const uploadFile = (fileNo) => {
  fileNum.value = fileNo;
  isUploadShow.value = true;
};

const cancelUpload = () => {
  isUploadShow.value = false;
};
const UploadBtn = async () => {
  if (!jsonFile.value) {
    alert("Please select a file");
    return;
  }
  const formData = new FormData();
  formData.append("jsonFile", jsonFile.value);
  formData.append("fileNum", fileNum.value);
  const url = serverData.value + "cc/ri_loadJSON.php";

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    Notify.create({
      message: "File uploaded successfully",
      color: "positive",
      position: "top",
      icon: "fa-solid fa-circle-check",
    });
    isUploadShow.value = false;
    loadUpdateDate();
  } catch (error) {
    console.error("Error uploading file:", error);
    Notify.create({
      message: "Error uploading file",
      color: "negative",
      icon: "fa-solid fa-circle-exclamation",
      position: "top",
    });
  }
};
const statusJSON = ref([]);
const loadUpdateDate = async () => {
  const url = serverData.value + "cc/ri_getJsonInfo.php";
  const res = await axios.get(url);
  statusJSON.value = res.data;
};
const status = (fileNo) => {
  const result = statusJSON.value.filter((x) => x.ecoID == fileNo);
  if (result[0]) {
    return result[0].updatedDate;
  } else {
    return "-";
  }
};
onMounted(() => {
  loadUpdateDate();
});
</script>

<style lang="scss" scoped>
.headBar {
  background-color: #04284d;
  color: white;
  height: 45px;
  line-height: 45px;
}
.resultList {
  height: 30px;
  line-height: 30px;
}
.resultBlue {
  background-color: #e5ebf8;
}

.newYearDia {
  width: 100%;
  max-width: 400px;
  height: 200px;
  background-color: white;
}
.CtaBtn {
  width: 120px;
  background-color: #ffca4f;
}

.deleteDia {
  width: 100%;
  max-width: 350px;
  height: 160px;
  background-color: white;
  overflow: hidden;
}
.uploadDia {
  width: 100%;
  max-width: 450px;
  height: 175px;
  background-color: white;
  overflow: hidden;
}
</style>
