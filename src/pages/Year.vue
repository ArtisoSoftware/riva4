<template>
  <div class="row">
    <div style="width: 260px"><MenuSide :menu="21" :openMenu="2" /></div>
    <div class="col q-pa-md">
      <div class="text-right">
        <q-btn
          label="Add new year"
          class="btn"
          icon="fa-solid fa-plus"
          no-caps
          @click="AddNewYearBtn()"
          style="background-color: #2c4e96; color: white"
        />
      </div>
      <div class="headBar q-mt-md row q-px-md">
        <div class="col q-px-lg">Year</div>
        <div style="width: 80%" class="text-center">Status</div>
        <div style="width: 10%" class="text-center">Delete</div>
      </div>
      <div
        class="resultList row q-px-md"
        v-for="(item, index) in yearList"
        :class="{ resultBlue: index % 2 == 1 }"
      >
        <div class="col q-px-lg">{{ item.year }}</div>
        <div
          style="width: 80%"
          class="text-center text-red"
          v-if="item.active == '0'"
        >
          <u class="cursor-pointer" @click="changeStatus(item.id)">Inactive</u>
        </div>
        <div
          style="width: 80%"
          class="text-center text-green"
          v-if="item.active != '0'"
        >
          <u class="cursor-pointer" @click="changeStatus(item.id)">Active</u>
        </div>
        <div style="width: 10%" class="text-center">
          <q-icon name="fa-solid fa-trash" class="cursor-pointer" />
        </div>
      </div>
    </div>
    <!-- Dialog add new year -->
    <q-dialog v-model="isAddYear" persistent>
      <div class="newYearDia">
        <div class="headBar q-px-md">Add new year</div>

        <div class="row justify-center" style="padding-top: 40px">
          <div class="q-pt-sm">Year</div>
          <div style="width: 25px"></div>
          <div><q-input v-model="yearInput" outlined dense /></div>
        </div>
        <div class="q-px-md row justify-center q-pt-lg">
          <div>
            <q-btn
              label="Cancel"
              no-caps
              class="CancelBtn"
              outline
              @click="closeDia"
              style="width: 120px"
            />
          </div>
          <div style="width: 25px"></div>
          <div>
            <q-btn label="Save" no-caps class="CtaBtn" @click="saveNewYear" />
          </div>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script setup>
import { Notify } from "quasar";
import { serverSetup } from "./server.js";
import axios from "axios";
import MenuSide from "../components/MenuSide.vue";
import { ref } from "vue";
import { useAuth } from "./auth";
const { checkHashkey } = useAuth();
checkHashkey();
const { serverData } = serverSetup();
const yearInput = ref("");
// add New Year
const isAddYear = ref(false);
const AddNewYearBtn = () => {
  isAddYear.value = true;
};
const closeDia = () => {
  isAddYear.value = false;
  yearInput.value = "";
};
const saveNewYear = async () => {
  if (!yearInput.value) {
    Notify.create({
      message: "Year is required",
      color: "negative",
      icon: "fa-solid fa-circle-exclamation",
      position: "top",
    });
    return;
  }
  const url = serverData.value + "cc/addNewYear.php";
  const dataSend = {
    year: yearInput.value,
  };
  const res = await axios.post(url, JSON.stringify(dataSend));
  if (res.data == "Add new year finish") {
    Notify.create({
      message: "Add new year finish",
      color: "positive",
      position: "top",
      icon: "fa-solid fa-circle-check",
    });
    isAddYear.value = false;
    yearInput.value = "";
    loadYearData();
  }
};

//Load year data
const yearList = ref([]);
const loadYearData = async () => {
  const url = serverData.value + "cc/getYear.php";
  const res = await axios.get(url);
  yearList.value = res.data;
  yearList.value.sort((a, b) => Number(a.year) - Number(b.year));
};

loadYearData();

//change status
const changeStatus = async (id) => {
  const url = serverData.value + "cc/changeYearStatus.php";
  const dataSend = {
    id: id,
  };
  const res = await axios.post(url, JSON.stringify(dataSend));
  loadYearData();
};
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
  max-width: 450px;
  height: 235px;
  background-color: white;
}
.CtaBtn {
  width: 120px;
  background-color: #ffca4f;
}
</style>
