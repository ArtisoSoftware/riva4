<template>
  <div class="row">
    <div style="width: 260px"><MenuSide :menu="21" :openMenu="2" /></div>
    <div class="col q-pa-md">
      <div class="text-right">
        <q-btn
          label="Add new year"
          class="btn"
          icon="fa-solid fa-plus"
          no-caps
          @click="AddNewYearBtn()"
          style="background-color: #2c4e96; color: white"
        />
      </div>
      <div class="headBar q-mt-md row q-px-md">
        <div class="col q-px-lg">Year</div>
        <div style="width: 80%" class="text-center">Status</div>
        <div style="width: 10%" class="text-center">Delete</div>
      </div>
      <div class="resultList row q-px-md">
        <div class="col q-px-lg">2010</div>
        <div style="width: 80%" class="text-center">Active</div>
        <div style="width: 10%" class="text-center">
          <q-icon name="fa-solid fa-trash" class="cursor-pointer" />
        </div>
      </div>
    </div>
    <!-- Dialog add new year -->
    <q-dialog v-model="isAddYear" persistent>
      <div class="newYearDia">
        <div class="headBar q-px-md">Add new year</div>

        <div class="row justify-center q-pt-xl">
          <div class="q-pt-sm">Year</div>
          <div style="width: 25px"></div>
          <div><q-input v-model="username" outlined dense /></div>
        </div>
        <div class="q-px-md row justify-center q-pt-lg">
          <div>
            <q-btn
              label="Cancel"
              no-caps
              class="CancelBtn"
              outline
              @click="closeDia"
              style="width: 120px"
            />
          </div>
          <div style="width: 25px"></div>
          <div>
            <q-btn label="Save" no-caps class="CtaBtn" @click="saveNewStaff" />
          </div>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script setup>
import MenuSide from "../components/MenuSide.vue";
import { ref } from "vue";
// add New Year
const isAddYear = ref(false);
const AddNewYearBtn = () => {
  isAddYear.value = true;
};
</script>

<style lang="scss" scoped>
.headBar {
  background-color: #04284d;
  color: white;
  height: 45px;
  line-height: 45px;
}
.resultList {
  height: 30px;
  line-height: 30px;
}
.resultBlue {
  background-color: #e5ebf8;
}

.newYearDia {
  width: 100%;
  max-width: 450px;
  height: 235px;
  background-color: white;
}
.CtaBtn {
  width: 120px;
  background-color: #ffca4f;
}
</style>
