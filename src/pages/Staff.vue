<template>
  <div class="row">
    <div style="width: 260px"><MenuSide :menu="32" :openMenu="3" /></div>
    <div class="col q-pa-md">
      <div class="text-right">
        <q-btn
          label="Add new staff"
          class="btn"
          icon="fa-solid fa-plus"
          no-caps
          @click="AddNewStaffBtn()"
        />
      </div>
      <div class="headBar q-mt-md row q-px-md">
        <div class="col q-px-lg">Username</div>
        <div style="width: 15%" class="text-center">Reset password</div>
        <div style="width: 10%" class="text-center">Delete</div>
      </div>
      <div
        class="row resultList q-px-md"
        :class="{ resultBlue: index % 2 == 1 }"
        v-for="(item, index) in userList"
        :key="index"
      >
        <div class="col q-px-lg">{{ item.username }}</div>
        <div style="width: 15%" class="text-center">
          <u class="cursor-pointer">Reset password</u>
        </div>
        <div style="width: 10%" class="text-center">
          <q-icon name="fa-solid fa-trash" class="cursor-pointer" />
        </div>
      </div>
    </div>
    <q-dialog v-model="isAddNew" persistent>
      <q-card class="newStaffDia">
        <div class="headBar q-px-md">Add new starff</div>
        <div class="justify-center row q-pt-md">
          <div class="q-pt-sm">Username</div>
          <div style="width: 25px"></div>
          <div><q-input v-model="username" outlined dense /></div>
        </div>
        <div class="justify-center row q-pt-md">
          <div class="q-pt-sm">Password</div>
          <div style="width: 25px"></div>
          <div><q-input v-model="password" outlined dense /></div>
        </div>
        <div class="q-px-md row justify-center q-pt-md">
          <div>
            <q-btn
              label="Cancel"
              no-caps
              class="CancelBtn"
              outline
              @click="closeDia"
            />
          </div>
          <div style="width: 25px"></div>
          <div>
            <q-btn label="Save" no-caps class="CtaBtn" @click="saveNewStaff" />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import MenuSide from "../components/MenuSide.vue";
import { serverSetup } from "./server.js";
import { ref } from "vue";
import { Notify } from "quasar";
import axios from "axios";
const { serverData } = serverSetup();

const isAddNew = ref(false);
const username = ref("");
const password = ref("");
const userList = ref([]);
const AddNewStaffBtn = () => {
  isAddNew.value = true;
  username.value = "";
  password.value = "";
};

const closeDia = () => {
  isAddNew.value = false;
};

const saveNewStaff = async () => {
  if (!username.value || !password.value) {
    Notify.create({
      message: "Username / password is required",
      color: "negative",
      icon: "fa-solid fa-circle-exclamation",
      position: "top",
    });
    return;
  }
  const url = serverData.value + "cc/addNewStaff.php";
  const dataSent = {
    username: username.value,
    password: password.value,
  };
  const res = await axios.post(url, JSON.stringify(dataSent));
  if (res.data == "username exists") {
    Notify.create({
      message: "Username exists",
      color: "negative",
      position: "top",
      icon: "fa-solid fa-circle-exclamation",
    });
    return;
  } else {
    isAddNew.value = false;
    Notify.create({
      message: "Add new staff finish",
      color: "positive",
      position: "top",
      icon: "fa-solid fa-circle-check",
    });
  }
};

const loadUser = async () => {
  const url = serverData.value + "cc/getStaff.php";
  const res = await axios.get(url);
  userList.value = res.data;
};
loadUser();
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
.newStaffDia {
  width: 100%;
  max-width: 450px;
  height: 235px;
}
.CancelBtn {
  width: 120px;
}
.CtaBtn {
  width: 120px;
  background-color: #ffca4f;
}
.resultList {
  height: 30px;
  line-height: 30px;
}
.resultBlue {
  background-color: #e5ebf8;
}
</style>
