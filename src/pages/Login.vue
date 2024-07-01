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
              <div><q-input outlined dense style="width: 180px" /></div>
            </div>
            <div class="row q-pt-lg" style="font-size: 16px">
              <div style="width: 100px">Password</div>
              <div><q-input outlined dense style="width: 180px" /></div>
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
              @click="goToWelcome()"
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
const router = useRouter();
const goToWelcome = () => {
  router.push("/welcome");
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
