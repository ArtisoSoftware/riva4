<template>
  <div class="menuLeft">
    <div class="q-pa-md text-center">
      <img src="../../public//images/rivalogo.svg" alt="" />
    </div>
    <div style="text-align: center">
      <img src="../../public/images/profile.png" alt="" />
    </div>
    <div class="row justify-center q-pb-md">
      <div style="font-size: 16px">Lisa</div>
      <div class="q-px-sm" style="padding-top: 3px">
        <img src="../../public/images/editProfile.svg" alt="" />
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
              <img src="../../public/images/rimenu.svg" alt="" />
            </q-item-section>

            <q-item-section> RI </q-item-section>
          </template>
        </q-expansion-item>
        <q-separator />
        <q-expansion-item v-model="vaExpanded">
          <template v-slot:header>
            <q-item-section avatar>
              <img src="../../public/images/vamenu.svg" alt="" />
            </q-item-section>

            <q-item-section> VA </q-item-section>
          </template>
          <div class="q-px-lg subTopic">General Data</div>
          <div class="q-px-lg q-py-sm">Year</div>
          <div class="q-px-lg q-py-sm">Economics</div>
          <div class="q-px-lg q-py-sm">Economics group</div>
          <div class="q-px-lg q-py-sm">Exporting section</div>

          <div class="q-px-lg subTopic">Page Data</div>
          <div class="q-px-lg q-py-sm">GVC relationships</div>
          <div class="q-px-lg q-py-sm">Structure of value added</div>
          <div class="q-px-lg q-py-sm">Participation in GVCs</div>
          <div class="q-px-lg q-py-sm">Backward linkages</div>
          <div class="q-px-lg q-py-sm">Forward linkages</div>
          <div class="q-px-lg q-py-sm">Country briefs</div>
        </q-expansion-item>
        <q-separator />
        <q-expansion-item v-model="userExpanded">
          <template v-slot:header>
            <q-item-section avatar>
              <img src="../../public/images/usermenu.svg" alt="" />
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
            <div><img src="../../public/images/exit.svg" alt="" /></div>
            <div style="padding-left: 37px; height: 35 px">Log out</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { LocalStorage } from "quasar";
import { ref, watch } from "vue";
import { defineProps } from "vue";
import { useRouter } from "vue-router";

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

const goToStaff = () => {
  router.push("/staff");
};

const logOutBtn = () => {
  LocalStorage.clear();
  router.push("/");
};
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
</style>
