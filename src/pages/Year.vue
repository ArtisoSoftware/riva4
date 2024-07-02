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
          @click="AddNewYear()"
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
  </div>
</template>

<script setup>
import MenuSide from "../components/MenuSide.vue";
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
</style>
