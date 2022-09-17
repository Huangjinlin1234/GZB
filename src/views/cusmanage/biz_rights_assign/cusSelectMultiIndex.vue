<template>
  <yu-tabs type="card" v-model="tabb">
    <yu-tab-pane label="公司客户">
      <cus-select-comp ref="cusSelectComp"></cus-select-comp>
    </yu-tab-pane>
    <yu-tab-pane label="个人客户">
      <cus-select ref="cusSelect"></cus-select>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import cusSelectComp from './cusSelectMultiCompList.vue';
import cusSelect from './cusSelectMultiList.vue';
/**
 * 客户选取共用页面
 */

export default {
  components: {cusSelectComp, cusSelect},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      cusSelectComp: null,
      cusSelect: null,
      tabb: '0'
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.cusSelectComp = this.$refs.cusSelectComp;
      this.cusSelect = this.$refs.cusSelect;
      const loginCode = this.$xutils.getLoginUserInfo().loginCode;
      const orgCode = this.$xutils.getLoginUserInfo().orgCode;
      const dutys = this.$xutils.getLoginUserInfo().dutys;
      this.cusSelectComp.searchFormdata.source = '2'; //送2则通过上送条件查询
      this.cusSelect.searchFormdata.source = '2'; //送2则通过上送条件查询
      if(this.pageParams && (this.pageParams.launchType === '2' || this.pageParams.launchType === '') && this.validateRoleFn()){
        this.cusSelectComp.searchFormdata.managerId = loginCode;
        this.cusSelect.searchFormdata.managerId = loginCode;
      } else if(this.pageParams && this.pageParams.launchType === '1') {
        this.cusSelectComp.searchFormdata.managerId = this.pageParams.handoverId;
        this.cusSelect.searchFormdata.managerId = this.pageParams.handoverId;
      } else {
        this.cusSelectComp.searchFormdata.managerBrId = orgCode;
        this.cusSelect.searchFormdata.managerBrId = orgCode;
      }
      this.cusSelectComp.customSearch();
      this.cusSelect.customSearch();
    },
    validateRoleFn() {
      let flag = true;
      const _this = this;
      const dutys = this.$xutils.getLoginUserInfo().dutys;
      for (let i = 0; i < dutys.length; i++) {
        var dutysArr = "FZH10,FZH11,FZH12,FZH13,FZH14,FZH15";
         if (dutysArr.indexOf(dutys[i].code) >= 0){//分支机构负责人可对辖内所有客户及业务进行移交
           flag = false;
         }
      }
      return flag;
    },

    confimBtn () {
      let data;
      if (this.tabb == 0) {
        data = this.cusSelectComp.$refs.refTable.selections;
      } else {
        data = this.cusSelect.$refs.refTable.selections;
      }
      if (!data) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      data.forEach(item => {
        item.serno = this.pageParams.serno
      })
      this.$dialog.close(this.dialogId, data);
    },
    back () {
      this.$dialog.close(this.dialogId);// 关闭查看页面
    }
  }
};
</script>
