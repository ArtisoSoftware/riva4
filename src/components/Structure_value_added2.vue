<template>
  <div>
    <div style="width: 1000px; margin: auto">
      <div class="q-px-xl q-py-md" style="font-size: 24px; font-weight: 500">
        Section 2
      </div>
      <div class="row items-center">
        <div class="col-8">
          <img
            src="../../public/images/26-2.jpg"
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
                @click="uploadFile2"
              />
            </div>
          </div>
          <div class="row">
            The CSV file you upload must contain data for only one economic
            exp_country, and the file size should not exceed 30 MB.
          </div>
          <div class="q-pt-md row">
            <div>
              <q-btn
                label="Clear data"
                no-caps
                class="btnLine2"
                color="negative"
                outline
                @click="clearData2()"
              />
            </div>
            <div class="q-pl-md">
              <q-btn
                label="Optimize database"
                no-caps
                class="btnLine2"
                color="secondary"
                outline
                @click="makeIndex2()"
              />
            </div>
          </div>
        </div>
      </div>
      <hr style="width: 100%" />
      <q-dialog v-model="confirmDialog1">
        <q-card>
          <q-card-section>
            <div class="text-h6">Confirm Deletion</div>
            <div>
              The following countries already exist in the database:
              {{ existingCountries1.join(", ") }}. Do you want to delete them
              before uploading the new data?
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn
              flat
              label="Delete"
              color="primary"
              @click="confirmDeletion2()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="confirmClearData1">
        <q-card>
          <q-card-section>
            <div class="text-h6">Confirm Deletion</div>
            <div>
              Do you want to delete all data from structrue of value added
              graph#2?
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn
              flat
              label="Delete"
              color="primary"
              @click="confirmClear2()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { serverSetup } from "../pages/server";
import { Notify } from "quasar";
import axios from "axios";
import { useQuasar } from "quasar";
const { serverData } = serverSetup();

const $q = useQuasar();

const file1 = ref(null);
const existingCountries1 = ref([]);

const confirmDialog1 = ref(false);
const confirmClearData1 = ref(false);

const uploadFile2 = async () => {
  if (file1.value) {
    const formData = new FormData();

    formData.append("file", file1.value);

    try {
      $q.loading.show();
      let url = serverData.value + "cc/strupload2.php";
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      $q.loading.hide();
      if (result.existingCountries.length > 0) {
        existingCountries1.value = result.existingCountries;
        confirmDialog1.value = true;
      } else {
        Notify.create({
          message: "Data uploaded successfully.",
          color: "positive",
          position: "top",
          icon: "fa-solid fa-circle-check",
        });
        file1.value = null;
      }
    } catch (error) {}
  } else {
    Notify.create({
      message: "Please select CSV file before uploading",
      color: "negative",
      icon: "fa-solid fa-circle-exclamation",
      position: "top",
    });
  }
};

const confirmDeletion2 = async () => {
  $q.loading.show();
  let url = serverData.value + "cc/strdelete2.php";
  let dataSend = {
    exp_country: existingCountries1.value,
  };
  let res = await axios.post(url, JSON.stringify(dataSend));
  uploadFile2();
  confirmDialog1.value = false;
};

const clearData2 = () => {
  confirmClearData1.value = true;
};

const confirmClear2 = async () => {
  $q.loading.show();
  let res2 = await axios.get(serverData.value + "cc/strclear2.php");
  $q.loading.hide();
  if (res2.data == "clear data successfully") {
    Notify.create({
      message: "Clear all data successfully.",
      color: "positive",
      position: "top",
      icon: "fa-solid fa-circle-check",
    });
  }
  confirmClearData1.value = false;
};

const makeIndex2 = async () => {
  $q.loading.show();
  let res2 = await axios.get(serverData.value + "cc/strmakeindex2.php");
  $q.loading.hide();
  if (res2.data == "finish") {
    Notify.create({
      message: "Optimize database successfully.",
      color: "positive",
      position: "top",
      icon: "fa-solid fa-circle-check",
    });
  }
};
</script>

<style lang="scss" scoped>
.btnLine2 {
  width: 150px;
}
.btnLine1 {
  width: 100px;
}
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
