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
          <u
            class="cursor-pointer"
            @click="resetPassword(item.username, item.staffID)"
            >Reset password</u
          >
        </div>
        <div style="width: 10%" class="text-center">
          <q-icon
            name="fa-solid fa-trash"
            class="cursor-pointer"
            @click="deleteStaff(item.staffID, item.username)"
          />
        </div>
      </div>
    </div>

    <!-- Dialog for add new staff -->
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

    <!-- Dialog for reset password -->
    <q-dialog v-model="isReset" persistent>
      <q-card class="newStaffDia">
        <div class="headBar q-px-md">Reset password</div>
        <div class="justify-center row q-pt-md">
          <div class="q-pt-sm">Username</div>
          <div style="width: 25px"></div>
          <div><q-input v-model="usernameReset" outlined dense readonly /></div>
        </div>
        <div class="justify-center row q-pt-md">
          <div class="q-pt-sm">Password</div>
          <div style="width: 25px"></div>
          <div><q-input v-model="passwordReset" outlined dense /></div>
        </div>
        <div class="q-px-md row justify-center q-pt-md">
          <div>
            <q-btn
              label="Cancel"
              no-caps
              class="CancelBtn"
              outline
              @click="CancelResetBtn"
            />
          </div>
          <div style="width: 25px"></div>
          <div>
            <q-btn
              label="Save"
              no-caps
              class="CtaBtn"
              @click="resetPasswordBtn()"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- //Confirm delete staff -->
    <q-dialog v-model="isConfirmDel" persistent>
      <div class="deleteDia">
        <div class="headBar">
          <div class="q-px-md">Delete staff</div>
        </div>
        <div class="q-px-md q-pt-lg" style="font-size: 16px">
          Do you want to delete this staff?
        </div>
        <div class="q-pt-md text-right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Yes, delete it"
            color="primary"
            @click="deleteStaffBtn()"
          />
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script setup>
import MenuSide from "../components/MenuSide.vue";
import { serverSetup } from "./server.js";
import { ref } from "vue";
import { Notify, LocalStorage } from "quasar";
import axios from "axios";
import { useAuth } from "./auth";
const { checkHashkey } = useAuth();
checkHashkey();
const { serverData } = serverSetup();

// Add new staff
const isAddNew = ref(false);
const username = ref("");
const password = ref("");

const AddNewStaffBtn = () => {
  isAddNew.value = true;
  username.value = "";
  password.value = "";
};

const closeDia = () => {
  isAddNew.value = false;
};

// Add new staff
const saveNewStaff = async () => {
  if (!username.value || !password.value) {
    Notify.create({
      message: "Both username and password fields are required.",
      color: "negative",
      icon: "fa-solid fa-circle-exclamation",
      position: "top",
    });
    return;
  }
  const url = serverData.value + "cc/addNewStaff.php";
  const dataSent = {
    username: username.value,
    password: password.value.toString(),
  };
  const res = await axios.post(url, JSON.stringify(dataSent));
  if (res.data == "username exists") {
    Notify.create({
      message: "This username already exists.",
      color: "negative",
      position: "top",
      icon: "fa-solid fa-circle-exclamation",
    });
    return;
  } else {
    isAddNew.value = false;
    Notify.create({
      message: "New staff has been successfully added.",
      color: "positive",
      position: "top",
      icon: "fa-solid fa-circle-check",
    });
    loadUser();
  }
};

//Reset password
const isReset = ref(false);
const resetData = ref({
  username: "",
  staffID: 0,
});
const usernameReset = ref("");
const passwordReset = ref("");

const resetPassword = (username, ID) => {
  resetData.value.username = username;
  resetData.value.staffID = ID;
  usernameReset.value = username;
  isReset.value = true;
  passwordReset.value = "";
};

const resetPasswordBtn = async () => {
  if (!passwordReset.value) {
    Notify.create({
      message: "Password is required.",
      color: "negative",
      icon: "fa-solid fa-circle-exclamation",
      position: "top",
    });
    return;
  }
  const url = serverData.value + "cc/resetPasswordStaff.php";
  const dataSend = {
    staffID: resetData.value.staffID,
    password: passwordReset.value,
  };
  const res = await axios.post(url, JSON.stringify(dataSend));
  if (res.data == "reset password complete") {
    const msg = ref(
      `Password for ${usernameReset.value} has been reset successfully.`
    );
    Notify.create({
      message: msg.value,
      color: "positive",
      position: "top",
      icon: "fa-solid fa-circle-check",
    });
    isReset.value = false;
  }
};

const CancelResetBtn = () => {
  passwordReset.value = "";
  isReset.value = false;
};

//Delete staff
const delID = ref(0);
const delUsername = ref("");
const isConfirmDel = ref(false);
const deleteStaff = (id, username) => {
  isConfirmDel.value = true;
  delID.value = id;
  delUsername.value = username;
};

const deleteStaffBtn = async () => {
  const url = serverData.value + "cc/delStaffbyID.php";
  const dataSend = {
    staffID: delID.value,
  };
  const res = await axios.post(url, JSON.stringify(dataSend));

  if (res.data == "delete staff finish") {
    const msg = ref(delUsername.value + " has been successfully deleted.");
    Notify.create({
      message: msg,
      color: "positive",
      position: "top",
      icon: "fa-solid fa-circle-check",
    });

    isConfirmDel.value = false;
    loadUser();
  }
};

//load user in the list
const userList = ref([]);
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
.deleteDia {
  width: 100%;
  max-width: 350px;
  height: 160px;
  background-color: white;
  overflow: hidden;
}
</style>
