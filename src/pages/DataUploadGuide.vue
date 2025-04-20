<template>
  <div class="row">
    <div style="width: 260px"><MenuSide :menu="25" :openMenu="2" /></div>
    <div class="col">
      <div style="font-size: 24px" class="text-center q-pt-md">
        Data Upload Guide
      </div>
      <div style="width: 500px; margin: auto" class="text-center q-pt-md">
        <div>This table shows where each dataset should be imported.</div>
        <div>
          "Table" indicates the name of the MySQL table in the database.
        </div>
        <div>
          "Data Folder" shows the folder where the source CSV files are located.
        </div>
      </div>
      <div class="row justify-center q-py-md">
        <table style="border-collapse: collapse">
          <tr>
            <td style="width: 200px; background-color: gray; color: white">
              Table
            </td>
            <td style="width: 300px; background-color: gray; color: white">
              Data Folder
            </td>
          </tr>
          <tr>
            <td>va_gvc_overview</td>
            <td>GVC_relationships/overview</td>
          </tr>
          <tr>
            <td>va_str_value_added1</td>
            <td>Structure_of_value_added/REP_PART_X</td>
          </tr>
          <tr>
            <td>va_str_value_added2</td>
            <td>Structure_of_value_added/REP_PART_TB</td>
          </tr>
          <tr>
            <td>va_backward1</td>
            <td>Backward_linkages/IND</td>
          </tr>
          <tr>
            <td>va_backward2</td>
            <td>Backward_linkages/SOURCE</td>
          </tr>
          <tr>
            <td>va_forward1</td>
            <td>Forward_linkages/IND</td>
          </tr>
        </table>
      </div>
      <div class="text-center q-py-md">
        All files must be imported using Navicat by the data team.
        <br />Please make sure each file is complete and correctly structured
        before import.
      </div>
    </div>
  </div>
</template>

<script setup>
import MenuSide from "../components/MenuSide.vue";
</script>

<style lang="scss" scoped>
td {
  border: 1px solid #000;
  text-align: center;
}
</style>
