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
        <div style="width: 10%" class="text-center">Status</div>
        <div style="width: 10%" class="text-center">Delete</div>
      </div>
      <div
        class="resultList row q-px-md"
        v-for="(item, index) in yearList"
        :key="index"
        :class="{ resultBlue: index % 2 == 1 }"
      >
        <div class="col q-px-lg">{{ item.year }}</div>
        <div
          style="width: 10%"
          class="text-center text-red"
          v-if="item.active == '0'"
        >
          <u class="cursor-pointer" @click="changeStatus(item.id)">Inactive</u>
        </div>
        <div
          style="width: 10%"
          class="text-center text-green"
          v-if="item.active != '0'"
        >
          <u class="cursor-pointer" @click="changeStatus(item.id)">Active</u>
        </div>
        <div style="width: 10%" class="text-center">
          <q-icon
            name="fa-solid fa-trash"
            class="cursor-pointer"
            @click="delYear(item.id, item.year)"
          />
        </div>
      </div>
    </div>
    <!-- Dialog add new year -->
    <q-dialog v-model="isAddYear" persistent>
      <div class="newYearDia">
        <div class="headBar q-px-md">Add new year</div>

        <div class="row justify-center" style="padding-top: 30px">
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

    <!-- //Confirm delete staff -->
    <q-dialog v-model="isConfirmDel" persistent>
      <div class="deleteDia">
        <div class="headBar">
          <div class="q-px-md">Delete year</div>
        </div>
        <div class="q-px-md q-pt-lg" style="font-size: 16px">
          Do you want to delete this year?
        </div>
        <div class="q-pt-md text-right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Yes, delete it"
            color="primary"
            @click="deleteYearBtn()"
          />
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
      message: "The year field is required.",
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
  const msgAdd = ref(
    "Year " + yearInput.value + " has been successfully added."
  );
  const msgDup = ref("Year " + yearInput.value + " is already in the system.");
  if (res.data == "Add new year finish") {
    Notify.create({
      message: msgAdd.value,
      color: "positive",
      position: "top",
      icon: "fa-solid fa-circle-check",
    });
    isAddYear.value = false;
    yearInput.value = "";
    loadYearData();
  } else {
    Notify.create({
      message: msgDup.value,
      color: "negative",
      icon: "fa-solid fa-circle-exclamation",
      position: "top",
    });
    return;
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

//Del year
const isConfirmDel = ref(false);
const delYearID = ref(0);
const yearDel = ref(0);
const delYear = (id, yearDelx) => {
  delYearID.value = id;
  yearDel.value = yearDelx;
  isConfirmDel.value = true;
};

const deleteYearBtn = async () => {
  const url = serverData.value + "cc/delYear.php";
  const dataSend = {
    yearID: delYearID.value,
  };
  const res = await axios.post(url, JSON.stringify(dataSend));
  if (res.data == "delete year finish") {
    const msg = ref(
      "Year " + yearDel.value + " has been successfully deleted."
    );

    Notify.create({
      message: msg.value,
      color: "positive",
      position: "top",
      icon: "fa-solid fa-circle-check",
    });
    loadYearData();
    isConfirmDel.value = false;
  }
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
</style>
