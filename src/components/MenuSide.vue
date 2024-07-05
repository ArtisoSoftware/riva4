<template>
  <div class="menuLeft">
    <div class="q-pa-md text-center">
      <img src="images/rivalogo.svg" alt="" />
    </div>
    <div style="text-align: center">
      <img src="images/profile.png" alt="" />
    </div>
    <div class="row justify-center q-pb-md">
      <div style="font-size: 16px">{{ usernameDisplay }}</div>
      <div class="q-px-sm cursor-pointer" style="padding-top: 3px">
        <img src="images/editProfile.svg" alt="" @click="editProfileBtn()" />
      </div>
    </div>
    <div>
      <q-list
        bordered
        class="rounded-borders"
        style="width: 90%; background-color: #0f4c8a; margin-left: 5%"
      >
        <q-expansion-item disable>
          <template v-slot:header>
            <q-item-section avatar>
              <img src="images/rimenu.svg" alt="" />
            </q-item-section>

            <q-item-section> RI </q-item-section>
          </template>
        </q-expansion-item>
        <q-separator />
        <q-expansion-item v-model="vaExpanded">
          <template v-slot:header>
            <q-item-section avatar>
              <img src="images/vamenu.svg" alt="" />
            </q-item-section>

            <q-item-section> VA </q-item-section>
          </template>
          <div class="q-px-lg subTopic">General Data</div>
          <div
            class="q-px-lg q-py-sm cursor-pointer"
            :class="{ selectedMenu: menu == 21 }"
            @click="goToYear()"
          >
            Year
          </div>
          <div
            class="q-px-lg q-py-sm cursor-pointer"
            @click="goToEco()"
            :class="{ selectedMenu: menu == 22 }"
          >
            Economics
          </div>
          <div
            class="q-px-lg q-py-sm cursor-pointer"
            @click="goToEcoGroup()"
            :class="{ selectedMenu: menu == 23 }"
          >
            Economy groups
          </div>
          <div
            class="q-px-lg q-py-sm cursor-pointer"
            @click="goToExporting()"
            :class="{ selectedMenu: menu == 24 }"
          >
            Exporting section
          </div>

          <div class="q-px-lg subTopic">Page Data</div>
          <div
            class="q-px-lg q-py-sm cursor-pointer"
            @click="goToGvcRelationship()"
            :class="{ selectedMenu: menu == 25 }"
          >
            GVC relationships
          </div>

          <div
            class="q-px-lg q-py-sm cursor-pointer"
            @click="goTostructureofvalueadded()"
            :class="{ selectedMenu: menu == 26 }"
          >
            Structure of value added
          </div>

          <div
            class="q-px-lg q-py-sm cursor-pointer"
            @click="goToparticipationingvcs()"
            :class="{ selectedMenu: menu == 27 }"
          >
            Participation in GVCs
          </div>

          <div
            class="q-px-lg q-py-sm cursor-pointer"
            @click="goTobackwardlinkages()"
            :class="{ selectedMenu: menu == 28 }"
          >
            Backward linkages
          </div>
          <div
            class="q-px-lg q-py-sm cursor-pointer"
            @click="goToforwardlinkages()"
            :class="{ selectedMenu: menu == 29 }"
          >
            Forward linkages
          </div>
          <div
            class="q-px-lg q-py-sm cursor-pointer"
            @click="goTocountrybriefs()"
            :class="{ selectedMenu: menu == 210 }"
          >
            Country briefs
          </div>
        </q-expansion-item>
        <q-separator />
        <q-expansion-item v-model="userExpanded">
          <template v-slot:header>
            <q-item-section avatar>
              <img src="images/usermenu.svg" alt="" />
            </q-item-section>

            <q-item-section> User </q-item-section>
          </template>
          <div class="q-px-lg q-py-sm cursor-pointer">Member</div>
          <div
            class="q-px-lg q-py-sm cursor-pointer"
            :class="{ selectedMenu: menu == 32 }"
            @click="goToStaff()"
          >
            Staff
          </div>
        </q-expansion-item>
      </q-list>
      <div>
        <div
          style="
            width: 240px;
            background-color: #0f4c8a;
            margin-left: 13px;
            position: absolute;
            bottom: 10px;
          "
          class="cursor-pointer"
          @click="logOutBtn()"
        >
          <div class="row q-pl-md q-pt-md">
            <div><img src="images/exit.svg" alt="" /></div>
            <div style="padding-left: 37px; height: 35 px">Log out</div>
          </div>
        </div>
      </div>
    </div>
    <!-- edit password dialog -->
    <q-dialog v-model="isEditProfile" persistent>
      <div class="editProfileDia">
        <div class="headBar">
          <div class="q-px-md" style="font-size: 20px">Change password</div>
        </div>
        <div class="row items-center justify-center q-pt-md">
          <div style="width: 180px">Current password</div>
          <div><q-input outlined dense v-model="currentPassword" /></div>
        </div>
        <div class="row items-center justify-center q-pt-sm">
          <div style="width: 180px">New password</div>
          <div><q-input outlined dense v-model="newPassword" /></div>
        </div>
        <div class="row items-center justify-center q-pt-sm">
          <div style="width: 180px">Confirm new password</div>
          <div><q-input outlined dense v-model="ConfirmNewPassword" /></div>
        </div>
        <div class="q-px-md row justify-center q-pt-lg text-black">
          <div>
            <q-btn
              label="Cancel"
              no-caps
              outline
              @click="cancelEditProfileBtn"
              style="width: 120px"
            />
          </div>
          <div style="width: 25px"></div>
          <div>
            <q-btn
              label="Save"
              no-caps
              style="width: 120px; background-color: #ffca4f"
              @click="saveEditProfileBtn"
            />
          </div>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script setup>
import { Notify, LocalStorage } from "quasar";
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { serverSetup } from "../pages/server.js";
import axios from "axios";

const { serverData } = serverSetup();

const vaExpanded = ref(false);
const userExpanded = ref(false);
const router = useRouter();
// รับ prop จาก parent
const props = defineProps({
  menu: {
    type: Number,
    required: true,
  },
  openMenu: {
    type: Number,
    required: true,
  },
});
if (props.openMenu == 3) {
  userExpanded.value = true;
} else if (props.openMenu == 2) {
  vaExpanded.value = true;
}

watch(vaExpanded, (newVal) => {
  if (newVal) {
    userExpanded.value = false;
  }
});

watch(userExpanded, (newVal) => {
  if (newVal) {
    vaExpanded.value = false;
  }
});

const goToYear = () => {
  router.push("/year");
};
const goToEco = () => {
  router.push("/economics");
};
const goToEcoGroup = () => {
  router.push("/economyGroup");
};
const goToExporting = () => {
  router.push("/exporting");
};
const goToGvcRelationship = () => {
  router.push("/gvcrelationship");
};
const goTostructureofvalueadded = () => {
  router.push("/structureofvalueadded");
};
const goToparticipationingvcs = () => {
  router.push("/participationingvcs");
};
const goTobackwardlinkages = () => {
  router.push("/backwardlinkages");
};
const goToforwardlinkages = () => {
  router.push("/forwardlinkages");
};
const goTocountrybriefs = () => {
  router.push("/countrybriefs");
};

const goToStaff = () => {
  router.push("/staff");
};

const logOutBtn = () => {
  LocalStorage.clear();
  router.push("/");
};

//Change password
const isEditProfile = ref(false);
const currentPassword = ref("");
const newPassword = ref("");
const ConfirmNewPassword = ref("");

const editProfileBtn = () => {
  isEditProfile.value = true;
};
const cancelEditProfileBtn = () => {
  isEditProfile.value = false;
};
const saveEditProfileBtn = async () => {
  if (
    !newPassword.value ||
    !currentPassword.value ||
    !ConfirmNewPassword.value
  ) {
    Notify.create({
      message:
        "Current password / new password / confirm password is required.",
      color: "negative",
      icon: "fa-solid fa-circle-exclamation",
      position: "top",
    });
    return;
  }
  if (newPassword.value != ConfirmNewPassword.value) {
    Notify.create({
      message: "New password and confirm password do not match.",
      color: "negative",
      icon: "fa-solid fa-circle-exclamation",
      position: "top",
    });
    return;
  }
  const url = serverData.value + "cc/changePassword.php";
  const dataSend = {
    username: usernameDisplay.value,
    oldpassword: currentPassword.value,
    newpassword: newPassword.value,
    hashkey: LocalStorage.getItem("myKey"),
  };
  const res = await axios.post(url, JSON.stringify(dataSend));
  if (res.data == "update password finish") {
    Notify.create({
      message: "New password updated",
      color: "positive",
      position: "top",
      icon: "fa-solid fa-circle-check",
    });
  } else if (res.data == "old password incorrect") {
    Notify.create({
      message: "Current password incorrect",
      color: "negative",
      icon: "fa-solid fa-circle-exclamation",
      position: "top",
    });
  } else {
    Notify.create({
      message: "something wrongs",
      color: "negative",
      icon: "fa-solid fa-circle-exclamation",
      position: "top",
    });
    localStorage.clear();
    router.push("/");
  }
};

const usernameDisplay = ref("");

onMounted(() => {
  usernameDisplay.value = LocalStorage.getItem("myUsername");
});
</script>

<style lang="scss" scoped>
.menuLeft {
  width: 260px;
  height: 100vh;
  background-color: #04284d;
  color: white;
  font-size: 16 px;
}
.subTopic {
  color: #80aedc;
  font-size: 14px;
}
.selectedMenu {
  color: #e0d04e;
}
.editProfileDia {
  width: 100%;
  max-width: 500px;
  height: 285px;
  background-color: white;
  overflow: hidden;
}
.headBar {
  background-color: #04284d;
  color: white;
  height: 45px;
  line-height: 45px;
}
</style>
