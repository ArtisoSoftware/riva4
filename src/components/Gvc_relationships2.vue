<template>
  <div>
    <div style="width: 1000px; margin: auto">
      <div class="q-px-xl q-py-md" style="font-size: 24px; font-weight: 500">
        Section 2
      </div>
      <div class="row items-center">
        <div class="col-8">
          <img
            src="../../public/images/byExporting.jpg"
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
              @click="confirmDeletion1()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="confirmClearData1">
        <q-card>
          <q-card-section>
            <div class="text-h6">Confirm Deletion</div>
            <div>
              Do you want to delete all data from GVC top 5 exporting sectors?
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn
              flat
              label="Delete"
              color="primary"
              @click="confirmClear1()"
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
const { serverData } = serverSetup();

const file1 = ref(null);
const existingCountries1 = ref([]);

const confirmDialog1 = ref(false);
const confirmClearData1 = ref(false);

const uploadFile1 = async () => {
  if (file1.value) {
    const formData = new FormData();

    formData.append("file", file1.value);

    try {
      let url = serverData.value + "cc/gvcupload2.php";
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

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

const confirmDeletion1 = async () => {
  let url = serverData.value + "cc/gvcdelete2.php";
  let dataSend = {
    exp_country: existingCountries1.value,
  };
  let res = await axios.post(url, JSON.stringify(dataSend));
  uploadFile1();
  confirmDialog1.value = false;
};

const clearData1 = () => {
  confirmClearData1.value = true;
};

const confirmClear1 = async () => {
  let res2 = await axios.get(serverData.value + "cc/gvcclear2.php");
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

const makeIndex1 = async () => {
  let res2 = await axios.get(serverData.value + "cc/gvcmakeindex2.php");
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
