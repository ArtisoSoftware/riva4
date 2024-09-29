<template>
  <div class="row">
    <div style="width: 260px"><MenuSide :menu="10" :openMenu="1" /></div>
    <div class="col q-pa-md">
      <div
        class="headBar q-mt-md row q-px-md"
        style="width: 600px; margin: auto"
      >
        <div class="col">Start year</div>
        <div class="col">End year</div>
        <div style="width: 10%" class="text-center">Edit</div>
      </div>
      <div class="q-pt-md row q-px-md" style="width: 600px; margin: auto">
        <div class="col">{{ yearStart }}</div>
        <div class="col">{{ yearEnd }}</div>
        <div
          style="width: 10%"
          class="text-center cursor-pointer"
          @click="editDia = true"
        >
          <u>Edit</u>
        </div>
      </div>
    </div>

    <q-dialog v-model="editDia" persistent>
      <q-card class="editDiaBox q-pa-md">
        <div class="row justify-center">
          <div class="text-h6 text-center">Year Setting for RI</div>
        </div>
        <div class="q-pt-md row justify-center" style="">
          <div class="q-pt-sm q-pr-md">Start year</div>
          <div>
            <q-input
              v-model="yearEditStart"
              outlined
              dense
              style="width: 120px"
            />
          </div>
        </div>
        <div class="q-pt-md row justify-center">
          <div class="q-pt-sm q-pr-md">End year</div>
          <div>
            <q-input
              v-model="yearEditEnd"
              outlined
              dense
              style="width: 120px"
            />
          </div>
        </div>
        <div class="q-pt-md q-px-md row justify-center">
          <div>
            <q-btn
              label="Cancel"
              outline
              style="width: 100px"
              no-caps
              @click="cancelData()"
            />
          </div>
          <div style="width: 10px"></div>
          <div>
            <q-btn
              label="Save"
              style="width: 100px"
              class="btn"
              no-caps
              @click="saveData()"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import MenuSide from "../components/MenuSide.vue";
import { serverSetup } from "./server.js";
import axios from "axios";
import { ref, onMounted } from "vue";
import { Notify } from "quasar";

const yearStart = ref(2000);
const yearEnd = ref(2001);
const yearEditStart = ref(0);
const yearEditEnd = ref(0);
const editDia = ref(false);
const { serverData } = serverSetup();

const loadData = async () => {
  let url = serverData.value + "cc/getRiYear.php";
  let result = await axios.get(url);
  yearStart.value = result.data[0].yearStart;
  yearEnd.value = result.data[0].yearEnd;
  yearEditEnd.value = yearEnd.value;
  yearEditStart.value = yearStart.value;
};

const saveData = async () => {
  let temp = {
    yearStar: yearEditStart.value,
    yearEnd: yearEditEnd.value,
  };
  let url = serverData.value + "cc/updateRiYear.php";
  let result = await axios.post(url, JSON.stringify(temp));
  editDia.value = false;
  loadData();
  Notify.create({
    message: "Update year setting for RI successfully.",
    color: "positive",
    position: "top",
    icon: "fa-solid fa-circle-check",
  });
};

const cancelData = () => {
  editDia.value = false;
  yearEditEnd.value = yearEnd.value;
  yearEditStart.value = yearStart.value;
};

onMounted(() => {
  loadData();
});
</script>

<style lang="scss" scoped>
.headBar {
  background-color: #04284d;
  color: white;
  height: 45px;
  line-height: 45px;
}
.editDiaBox {
  width: 100%;
  max-width: 320px;
  height: 240px;
}
.btn {
  background-color: #0f4c8a;
  color: white;
}
</style>
