<template>
  <div class="row">
    <div style="width: 260px"><MenuSide :menu="24" :openMenu="2" /></div>
    <div class="col q-pa-md">
      <div class="row justify-between">
        <div class="row">
          <q-avatar
            size="30px"
            font-size="16px"
            color="primary"
            text-color="white"
            icon="fa-solid fa-angle-left"
            class="cursor-pointer"
            @click="goToExporting()"
          />
          <div class="q-px-md q-pt-xs">{{ catName }}</div>
        </div>

        <div>
          <q-btn
            label="Add sub-category"
            class="btn"
            icon="fa-solid fa-plus"
            no-caps
            @click="AddSubCategory()"
          />
        </div>
      </div>

      <div class="headBar q-mt-md row q-px-md">
        <div style="width: 10%" class="text-center">Order ID</div>
        <div class="col q-px-lg">Sub-category name</div>
        <div style="width: 10%" class="text-center">Edit</div>
        <div style="width: 10%" class="text-center">Delete</div>
      </div>
    </div>

    <!-- Dialog for add new sub-category -->
    <q-dialog v-model="isAddSub" persistent>
      <q-card class="newCategoryDia">
        <div class="headBar q-px-md">Add new sub-category</div>
        <div class="justify-center row q-pt-md">
          <div class="q-pt-sm" style="width: 100px">OrderID</div>
          <div style="width: 25px"></div>
          <div>
            <q-input v-model="orderID" outlined dense style="width: 350px" />
          </div>
        </div>
        <div class="justify-center row q-pt-md">
          <div class="q-pt-sm" style="width: 100px">Sub-category</div>
          <div style="width: 25px"></div>
          <div>
            <q-input
              v-model="subCategory"
              outlined
              dense
              style="width: 350px"
            />
          </div>
        </div>

        <div class="q-px-md row justify-center q-pt-md">
          <div>
            <q-btn
              label="Cancel"
              no-caps
              class="CancelBtn"
              outline
              @click="closeAddDia"
            />
          </div>
          <div style="width: 25px"></div>
          <div>
            <q-btn
              label="Save"
              no-caps
              class="CtaBtn"
              @click="addSubCategoryBtn"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import MenuSide from "../components/MenuSide.vue";
import { serverSetup } from "./server.js";
import { ref, onMounted } from "vue";
import { Notify } from "quasar";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { useAuth } from "./auth";
const { checkHashkey } = useAuth();
checkHashkey();

const router = useRouter();
const route = useRoute();
const catID = ref(route.params.id);
const { serverData } = serverSetup();

// Load Category name
const catName = ref("");
const loadCatName = async () => {
  const url = serverData.value + "cc/getCategoryByID.php";
  const dataSend = {
    id: catID.value,
  };
  const res = await axios.post(url, JSON.stringify(dataSend));

  catName.value = res.data[0].category;
};
onMounted(() => {
  loadCatName();
});

//back btn
const goToExporting = () => {
  router.push("/exporting");
};

//Add sub-category
const isAddSub = ref(false);
const orderID = ref("");
const subCategory = ref("");

const AddSubCategory = () => {
  isAddSub.value = true;
  orderID.value = "";
  subCategory.value = "";
};
const closeAddDia = () => {
  isAddSub.value = false;
};
const addSubCategoryBtn = async () => {};
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
.newCategoryDia {
  width: 100%;
  max-width: 550px;
  height: 235px;
}
.CancelBtn {
  width: 120px;
}
.CtaBtn {
  width: 120px;
  background-color: #ffca4f;
}
</style>
