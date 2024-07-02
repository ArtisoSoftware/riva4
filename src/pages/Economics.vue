<template>
  <div class="row">
    <div style="width: 260px"><MenuSide :menu="22" :openMenu="2" /></div>
    <div class="col q-pa-md">
      <div class="text-right">
        <q-btn
          label="Add new eco"
          class="btn"
          icon="fa-solid fa-plus"
          no-caps
          @click="AddNewEcoBtn()"
        />
      </div>
      <div class="headBar q-mt-md row q-px-md">
        <div>No.</div>
        <div class="col q-px-lg">Economic</div>
        <div style="width: 15%" class="text-center">iso</div>
        <div style="width: 10%" class="text-center">region</div>
        <div style="width: 10%" class="text-center">Edit</div>
        <div style="width: 10%" class="text-center">Delete</div>
      </div>
    </div>

    <q-dialog v-model="addNewEcoDia" persistent>
      <q-card class="addNewEcoDiv">
        <div class="q-px-md headBar">Add new Economic</div>
        <div class="row justify-center q-pt-md">
          <div class="q-pt-sm" style="width: 40px">Economic</div>
          <div class="q-px-md"></div>
          <div>
            <q-input
              v-model="input.economic"
              dense
              outlined
              style="width: 300px"
            />
          </div>
        </div>
        <div class="row justify-center q-pt-md">
          <div class="q-pt-sm" style="width: 40px">ISO</div>
          <div class="q-px-md"></div>
          <div>
            <q-input v-model="input.iso" outlined dense style="width: 300px" />
          </div>
        </div>
        <div class="row justify-center q-pt-md">
          <div class="q-pt-sm" style="width: 40px">Region</div>
          <div class="q-px-md"></div>
          <div>
            <q-select
              v-model="input.region"
              :options="regionList"
              outlined
              dense
              style="width: 300px"
            />
          </div>
        </div>
        <div class="row justify-center q-pt-md">
          <div>
            <q-btn
              label="Cancel"
              no-caps
              outline
              class="btnCancel"
              @click="cancelBtn()"
            />
          </div>
          <div style="width: 30px"></div>
          <div>
            <q-btn label="Save" no-caps class="btnSave" @click="addNewEco()" />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import MenuSide from "../components/MenuSide.vue";
import { ref } from "vue";
import { serverSetup } from "./server.js";
import axios from "axios";
import { useAuth } from "./auth";
import { Notify } from "quasar";
const { checkHashkey } = useAuth();
checkHashkey();
const { serverData } = serverSetup();

const addNewEcoDia = ref(false);
const input = ref({
  economic: "",
  iso: "",
  region: "",
});
const regionList = ref([
  "East and North-East Asia",
  "Eastern Europe",
  "Latin America and the Caribbean",
  "North America",
  "North and Central Asia",
  "Northern Europe",
  "Pacific",
  "South and South-West Asia",
  "South-East Asia",
  "Southern Europe",
  "Western Europe",
]);
input.value.region = regionList.value[0];

//Add new eco
const AddNewEcoBtn = () => {
  addNewEcoDia.value = true;
};

const cancelBtn = () => {
  addNewEcoDia.value = false;
  input.value.economic = "";
  input.value.iso = "";
  input.value.region = regionList.value[0];
};

const addNewEco = async () => {
  if (!input.value.economic || !input.value.iso) {
    Notify.create({
      message: "Economic / ISO is required",
      color: "negative",
      icon: "fa-solid fa-circle-exclamation",
      position: "top",
    });
    return;
  }
  const url = serverData.value + "cc/addNewEco.php";
  const dataSent = {
    economic: input.value.economic,
    iso: input.value.iso,
    region: input.value.region,
  };
  const res = await axios.post(url, JSON.stringify(dataSent));
  if (res.data == "This economic is exist.") {
    Notify.create({
      message: "This economic is exist",
      color: "negative",
      icon: "fa-solid fa-circle-exclamation",
      position: "top",
    });
    return;
  }
};
</script>

<style lang="scss" scoped>
.btn {
  background-color: #0f4c8a;
  color: white;
  width: 180px;
}
.headBar {
  background-color: #04284d;
  color: white;
  height: 45px;
  line-height: 45px;
}
.addNewEcoDiv {
  width: 100%;
  max-width: 450px;
  height: 285px;
}
.btnCancel {
  width: 120px;
}
.btnSave {
  width: 120px;
  background-color: #ffca4f;
}
</style>
