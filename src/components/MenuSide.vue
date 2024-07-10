<template>
  <div class="menuLeft">
    <div class="q-pa-md text-center">
      <img src="images/rivalogo.svg" alt="" />
    </div>
    <div style="text-align: center">
      <img src="images/profile.svg" alt="" />
    </div>
    <div class="row justify-center q-pb-md">
      <div style="font-size: 16px">{{ usernameDisplay }}</div>
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

            <q-item-section> <B>RI</B> </q-item-section>
          </template>
        </q-expansion-item>
        <q-separator />
        <q-expansion-item v-model="vaExpanded" dark>
          <template v-slot:header>
            <q-item-section avatar>
              <img src="images/vamenu.svg" alt="" />
            </q-item-section>

            <q-item-section> <B>VA</B> </q-item-section>
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
            Individual Economics
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
        <q-expansion-item v-model="userExpanded" dark>
          <template v-slot:header>
            <q-item-section avatar>
              <img src="images/usermenu.svg" alt="" />
            </q-item-section>

            <q-item-section> <b>User</b> </q-item-section>
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
  </div>
</template>

<script setup>
import { LocalStorage } from "quasar";
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { serverSetup } from "../pages/server.js";

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
