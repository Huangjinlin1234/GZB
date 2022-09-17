<template>
  <!--
    @created by dongan
    @updated by
    @description 空白模板
  -->
  <div class="blank_template">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="待领取" name="first">
        <centralCreditCardTaskList ref="centralCreditCardTaskList"></centralCreditCardTaskList>
      </yu-tab-pane>
      <yu-tab-pane label="历史记录" name="second">
        <centralCreditCardTaskHis ref="centralCreditCardTaskHis"></centralCreditCardTaskHis>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
import centralCreditCardTaskList from './centralCreditCardTaskList.vue';
import centralCreditCardTaskHis from './centralCreditCardTaskHis.vue';
export default {
  components: {
    centralCreditCardTaskList,
    centralCreditCardTaskHis
  },
  data: function () {
    return {
      activeName: 'first',
      centralCreditCardTaskList: null,
      centralCreditCardTaskHis: null
    };
  },
  mounted () {
    this.centralCreditCardTaskList = this.$refs.centralCreditCardTaskList;
    this.centralCreditCardTaskHis = this.$refs.centralCreditCardTaskHis;
  },
  methods: {
    handleClick () {
      this.centralCreditCardTaskList.$refs.refTable.remoteData();
      this.centralCreditCardTaskHis.$refs.refHisTable.remoteData();
    }
  }
};
</script>
