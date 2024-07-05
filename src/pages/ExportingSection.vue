<template>
  <div class="row">
    <div style="width: 260px"><MenuSide :menu="24" :openMenu="2" /></div>
    <div class="col q-pa-md">
      <div class="text-right">
        <q-btn
          label="Add category"
          class="btn"
          icon="fa-solid fa-plus"
          no-caps
          @click="AddCategory()"
        />
      </div>
      <div class="headBar q-mt-md row q-px-md">
        <div style="width: 10%" class="text-center">Order ID</div>
        <div class="col q-px-lg">Category name</div>
        <div style="width: 20%" class="text-center">Sub-category</div>
        <div style="width: 10%" class="text-center">Edit</div>
        <div style="width: 10%" class="text-center">Delete</div>
      </div>
      <div
        v-for="(item, index) in categoryList"
        :key="index"
        class="row resultList q-px-md"
        :class="{ resultBlue: index % 2 == 1 }"
      >
        <div style="width: 10%" class="text-center">{{ item.orderID }}</div>
        <div class="col q-px-lg">{{ item.category }}</div>
        <div style="width: 20%" class="text-center">
          <u class="cursor-pointer" @click="goToSubCat(item.id)"
            >Sub-category</u
          >
        </div>
        <div style="width: 10%" class="text-center">
          <u class="cursor-pointer" @click="editCatBtn(item)">Edit</u>
        </div>
        <div style="width: 10%" class="text-center">
          <q-icon
            name="fa-solid fa-trash"
            class="cursor-pointer"
            @click="deleteCat(item.id)"
          />
        </div>
      </div>
    </div>

    <!-- Dialog for add new category -->
    <q-dialog v-model="isAddCategory" persistent>
      <q-card class="newCategoryDia">
        <div class="headBar q-px-md">Add new category</div>
        <div class="justify-center row q-pt-md">
          <div class="q-pt-sm" style="width: 65px">OrderID</div>
          <div style="width: 25px"></div>
          <div>
            <q-input v-model="orderID" outlined dense style="width: 350px" />
          </div>
        </div>
        <div class="justify-center row q-pt-md">
          <div class="q-pt-sm" style="width: 65px">Category</div>
          <div style="width: 25px"></div>
          <div>
            <q-input v-model="category" outlined dense style="width: 350px" />
          </div>
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
            <q-btn
              label="Save"
              no-caps
              class="CtaBtn"
              @click="addCategoryBtn"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- Dialog for edit category -->
    <q-dialog v-model="isEditCategory" persistent>
      <q-card class="newCategoryDia">
        <div class="headBar q-px-md">Edit category</div>
        <div class="justify-center row q-pt-md">
          <div class="q-pt-sm" style="width: 65px">OrderID</div>
          <div style="width: 25px"></div>
          <div>
            <q-input
              v-model="editCat.orderID"
              outlined
              dense
              style="width: 350px"
            />
          </div>
        </div>
        <div class="justify-center row q-pt-md">
          <div class="q-pt-sm" style="width: 65px">Category</div>
          <div style="width: 25px"></div>
          <div>
            <q-input
              v-model="editCat.category"
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
              @click="closeEditDia"
            />
          </div>
          <div style="width: 25px"></div>
          <div>
            <q-btn
              label="Save"
              no-caps
              class="CtaBtn"
              @click="editCategoryBtn"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- //Confirm delete cat -->
    <q-dialog v-model="isConfirmDel" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Do you want to delete this category?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Yes, delete it"
            color="primary"
            @click="deleteCatBtn()"
          />
        </q-card-actions>
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
import { useRouter } from "vue-router";
import { useAuth } from "./auth";
const { checkHashkey } = useAuth();
checkHashkey();

const { serverData } = serverSetup();
const router = useRouter();

// add new category
const isAddCategory = ref(false);
const orderID = ref("");
const category = ref("");
const AddCategory = () => {
  isAddCategory.value = true;
  orderID.value = "";
  category.value = "";
};
const closeDia = () => {
  isAddCategory.value = false;
};
const addCategoryBtn = async () => {
  const url = serverData.value + "cc/addCategorySection.php";
  const dataSend = {
    orderID: orderID.value,
    category: category.value,
  };
  const res = await axios.post(url, JSON.stringify(dataSend));
  Notify.create({
    message: "Add new staff finish",
    color: "positive",
    position: "top",
    icon: "fa-solid fa-circle-check",
  });
  isAddCategory.value = false;
  loadCategoryList();
};

//Load main category
const categoryList = ref([]);
const loadCategoryList = async () => {
  const url = serverData.value + "cc/getCategorySection.php";
  const res = await axios.get(url);
  categoryList.value = res.data;
};

onMounted(() => {
  loadCategoryList();
});

//Delete category
const isConfirmDel = ref(false);
const delCatID = ref(0);

const deleteCat = (id) => {
  isConfirmDel.value = true;
  delCatID.value = id;
};

const deleteCatBtn = async () => {
  const url = serverData.value + "cc/delCategorySection.php";
  const dataSend = {
    delCatID: delCatID.value,
  };
  const res = await axios.post(url, JSON.stringify(dataSend));
  isConfirmDel.value = false;
  loadCategoryList();
};

//Edit category
const isEditCategory = ref(false);
const editCat = ref({
  id: "",
  orderID: "",
  category: "",
});
const editCatBtn = (item) => {
  editCat.value.id = item.id;
  editCat.value.orderID = item.orderID;
  editCat.value.category = item.category;
  isEditCategory.value = true;
};

const closeEditDia = () => {
  isEditCategory.value = false;
};

const editCategoryBtn = async () => {
  const url = serverData.value + "cc/editCategorySection.php";
  const dataSend = {
    id: editCat.value.id,
    orderID: editCat.value.orderID,
    category: editCat.value.category,
  };
  console.log(dataSend.value);
  const res = await axios.post(url, JSON.stringify(dataSend));
  isEditCategory.value = false;
  loadCategoryList();
};

//Go to sub-category
const goToSubCat = (id) => {
  router.push("/exportingSub/" + id);
};
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
  max-width: 500px;
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
