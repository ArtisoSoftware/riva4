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
        <div style="width: 20%" class="text-center">region</div>
        <div style="width: 10%" class="text-center">Edit</div>
        <div style="width: 10%" class="text-center">Delete</div>
      </div>
      <div
        class="row q-px-md resultList"
        :class="{ resultBlue: index % 2 == 1 }"
        v-for="(item, index) in economicList"
        :key="index"
      >
        <div>{{ index + 1 }}</div>
        <div class="col q-px-lg">{{ item.economic }}</div>
        <div style="width: 15%" class="text-center">{{ item.iso }}</div>
        <div style="width: 20%" class="text-center">{{ item.region }}</div>
        <div style="width: 10%" class="text-center">
          <u class="cursor-pointer" @click="editEco(item.id)">Edit</u>
        </div>
        <div style="width: 10%" class="text-center">
          <q-icon
            name="fa-solid fa-trash"
            class="cursor-pointer"
            @click="delEco(item.id)"
          />
        </div>
      </div>
    </div>
    <!-- Add new eco -->
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

    <!-- Edit economic -->
    <q-dialog v-model="isEditEcoDia" persistent>
      <q-card class="addNewEcoDiv">
        <div class="q-px-md headBar">Editconomic</div>
        <div class="row justify-center q-pt-md">
          <div class="q-pt-sm" style="width: 40px">Economic</div>
          <div class="q-px-md"></div>
          <div>
            <q-input
              v-model="edit.economic"
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
            <q-input v-model="edit.iso" outlined dense style="width: 300px" />
          </div>
        </div>
        <div class="row justify-center q-pt-md">
          <div class="q-pt-sm" style="width: 40px">Region</div>
          <div class="q-px-md"></div>
          <div>
            <q-select
              v-model="edit.region"
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
              @click="cancelEditBtn()"
            />
          </div>
          <div style="width: 30px"></div>
          <div>
            <q-btn label="Save" no-caps class="btnSave" @click="EditEcoBtn()" />
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- //Confirm delete economic -->
    <q-dialog v-model="isConfirmDel" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Do you want to delete this economic?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Yes, delete it"
            color="primary"
            @click="deleteEconomic()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import MenuSide from "../components/MenuSide.vue";
import { ref, onMounted } from "vue";
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

//****Add new economic

const AddNewEcoBtn = () => {
  addNewEcoDia.value = true;
  input.value.economic = "";
  input.value.iso = "";
  input.value.region = regionList.value[0];
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
  Notify.create({
    message: "Add new economic finish",
    color: "positive",
    position: "top",
    icon: "fa-solid fa-circle-check",
  });
  addNewEcoDia.value = false;
  loadData();
};

//****Load economic data
const economicList = ref([]);
const loadData = async () => {
  const url = serverData.value + "cc/getEconomic.php";
  const res = await axios.get(url);
  economicList.value = res.data;
  economicList.value.sort((a, b) => (a.economic > b.economic ? 1 : -1));
};
onMounted(loadData);

//***del Economic */
const isConfirmDel = ref(false);
const ecoDelID = ref(0);
const delEco = (id) => {
  isConfirmDel.value = true;
  ecoDelID.value = id;
};
const deleteEconomic = async () => {
  const url = serverData.value + "cc/delEco.php";
  const dataSend = {
    ecoID: ecoDelID.value,
  };
  const res = axios.post(url, JSON.stringify(dataSend));
  isConfirmDel.value = false;
  loadData();
};

// ***Edit Economic
const isEditEcoDia = ref(false);
const editEcoID = ref(0);

const editEco = (id) => {};
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
.resultBlue {
  background-color: #e5ebf8;
}
.resultList {
  height: 30px;
  line-height: 30px;
}
</style>
