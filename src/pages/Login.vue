<template>
  <div class="fullscreen loginBg">
    <div class="loginBox absolute-center">
      <div class="row">
        <div>
          <img
            src="../../public/images/login.png"
            alt=""
            style="border-radius: 10px 0px 0px 10px"
          />
        </div>
        <div class="col">
          <div class="text-center" style="padding-top: 100px">
            <img src="../../public/images/logo.svg" alt="" />
          </div>
          <div style="font-size: 24px" class="text-center">
            RIVA 3 Control Center
          </div>
          <div class="row justify-center">
            <div class="row q-pt-lg" style="font-size: 16px">
              <div style="width: 100px">Username</div>
              <div>
                <q-input
                  outlined
                  dense
                  style="width: 180px"
                  v-model="username"
                />
              </div>
            </div>
            <div class="row q-pt-lg" style="font-size: 16px">
              <div style="width: 100px">Password</div>
              <div>
                <q-input
                  outlined
                  dense
                  style="width: 180px"
                  v-model="password"
                  type="password"
                />
              </div>
            </div>
          </div>
          <div class="text-center q-pt-lg">
            <q-btn
              label="Login"
              no-caps
              style="
                width: 180px;
                background-color: #2c4e96;
                color: white;
                font-size: 20px;
                border-radius: 5px;
              "
              @click="loginBtn()"
            />
          </div>
          <div class="q-pa-md" style="position: absolute; bottom: 0; right: 0">
            Version 1.00
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { serverSetup } from "./server.js";
import { ref } from "vue";
import { Notify, LocalStorage } from "quasar";
import axios from "axios";

const { serverData } = serverSetup();
const router = useRouter();
const username = ref("");
const password = ref("");

const loginBtn = async () => {
  if (!username.value || !password.value) {
    Notify.create({
      message: "Username / password is required",
      color: "negative",
      icon: "fa-solid fa-circle-exclamation",
      position: "top",
    });
    return;
  }
  const url = serverData.value + "cc/checkLogin.php";
  const dataSend = {
    username: username.value,
    password: password.value,
  };
  const res = await axios.post(url, JSON.stringify(dataSend));
  if (res.data == "Username / password incorrect") {
    Notify.create({
      message: "Username / password incorrect",
      color: "negative",
      icon: "fa-solid fa-circle-exclamation",
      position: "top",
    });
    return;
  } else {
    LocalStorage.set("myKey", res.data);
    router.push("/welcome");
  }
};
</script>

<style lang="scss" scoped>
.loginBg {
  background-color: #193657;
}
.loginBox {
  width: 1030px;
  height: 606px;
  background-color: white;
  border-radius: 12px;
}
</style>
