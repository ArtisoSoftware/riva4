<template>
  <div class="row">
    <div style="width: 260px"><MenuSide :menu="23" :openMenu="2" /></div>
    <div class="col q-pa-md">
      <div class="text-right">
        <q-btn
          label="Add new eco group"
          class="btnx"
          icon="fa-solid fa-plus"
          no-caps
          @click="AddNewEcoBtn()"
        />
      </div>
      <div class="headBar q-mt-md row q-px-md">
        <div style="width: 5%">No.</div>
        <div class="col q-px-lg">Economy group</div>

        <div style="width: 10%" class="text-center">Edit</div>
        <div style="width: 10%" class="text-center">Delete</div>
      </div>
      <div
        class="row q-px-md resultList"
        :class="{ resultBlue: index % 2 == 1 }"
        v-for="(item, index) in economicList"
        :key="index"
      >
        <div style="width: 5%">{{ index + 1 }}</div>
        <div class="col q-px-lg">{{ item.economyGroup }}</div>
        <div style="width: 10%" class="text-center">
          <u class="cursor-pointer" @click="editEco(item)">Edit</u>
        </div>
        <div style="width: 10%" class="text-center">
          <q-icon
            name="fa-solid fa-trash"
            class="cursor-pointer"
            @click="delEco(item.id, item.economyGroup)"
          />
        </div>
      </div>
    </div>
    <!-- Add new eco -->
    <q-dialog v-model="addNewEcoDia" persistent>
      <q-card class="addNewEcoDiv">
        <div class="q-px-md headBar">Add new economy group</div>
        <div class="row justify-center q-pt-md">
          <div class="q-pt-sm" style="width: 100px">Economy group</div>
          <div class="q-px-md"></div>
          <div>
            <q-input
              v-model="input.economic"
              dense
              outlined
              style="width: 200px"
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
        <div class="q-px-md headBar">Edit economy group</div>
        <div class="row justify-center q-pt-md">
          <div class="q-pt-sm" style="width: 100px">Economy group</div>
          <div class="q-px-md"></div>
          <div>
            <q-input
              v-model="edit.economic"
              dense
              outlined
              style="width: 200px"
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
      <div class="deleteDia">
        <div class="headBar">
          <div class="q-px-md">Delete ecoonomy group</div>
        </div>
        <div class="q-px-md q-pt-lg" style="font-size: 16px">
          Do you want to delete this economy group?
        </div>
        <div class="q-pt-md text-right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Yes, delete it"
            color="primary"
            @click="deleteEconomic()"
          />
        </div>
      </div>
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
});

//****Add new economic

const AddNewEcoBtn = () => {
  addNewEcoDia.value = true;
  input.value.economic = "";
};

const cancelBtn = () => {
  addNewEcoDia.value = false;
  input.value.economic = "";
};

const addNewEco = async () => {
  if (!input.value.economic) {
    Notify.create({
      message: "Economy group field is required.",
      color: "negative",
      icon: "fa-solid fa-circle-exclamation",
      position: "top",
    });
    return;
  }
  const url = serverData.value + "cc/addNewEcoGroup.php";
  const dataSent = {
    economic: input.value.economic,
  };
  const res = await axios.post(url, JSON.stringify(dataSent));
  if (res.data == "This economy group is exist.") {
    Notify.create({
      message: "This economy group is exist.",
      color: "negative",
      icon: "fa-solid fa-circle-exclamation",
      position: "top",
    });
    return;
  }

  Notify.create({
    message: "New Economic group added to the system successfully.",
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
  const url = serverData.value + "cc/getEcoGroup.php";
  const res = await axios.get(url);
  economicList.value = res.data;
};
onMounted(loadData);

//***del Economic */
const isConfirmDel = ref(false);
const ecoDelID = ref(0);
const ecoDelName = ref("");
const delEco = (id, name) => {
  isConfirmDel.value = true;
  ecoDelID.value = id;
  ecoDelName.value = name;
};
const deleteEconomic = async () => {
  const url = serverData.value + "cc/delEcoGroup.php";
  const dataSend = {
    ecoID: ecoDelID.value,
  };
  const res = await axios.post(url, JSON.stringify(dataSend));
  if (res.data == "delete finish") {
    const msg = ref(ecoDelName.value + " has been successfully deleted.");
    Notify.create({
      message: msg,
      color: "positive",
      position: "top",
      icon: "fa-solid fa-circle-check",
    });
    isConfirmDel.value = false;
    loadData();
  }
};

// ***Edit Economic
const isEditEcoDia = ref(false);
const editEcoID = ref(0);
const edit = ref({
  economic: "",
});
const editEco = (item) => {
  editEcoID.value = item.id;
  edit.value.economic = item.economyGroup;

  isEditEcoDia.value = true;
};

const cancelEditBtn = () => {
  isEditEcoDia.value = false;
};

const EditEcoBtn = async () => {
  const url = serverData.value + "cc/editEcoGroup.php";
  const dataSend = {
    economic: edit.value.economic,
    id: editEcoID.value,
  };
  const res = await axios.post(url, JSON.stringify(dataSend));
  Notify.create({
    message: "Economic group data updated successfully.",
    color: "positive",
    position: "top",
    icon: "fa-solid fa-circle-check",
  });
  isEditEcoDia.value = false;
  loadData();
};
</script>

<style lang="scss" scoped>
.btnx {
  background-color: #0f4c8a;
  color: white;
  width: 220px;
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
  height: 185px;
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

.deleteDia {
  width: 100%;
  max-width: 350px;
  height: 160px;
  background-color: white;
  overflow: hidden;
}
</style>
