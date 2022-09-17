<template>
  <choose-list ref="chooseList"></choose-list>
</template>
<script>
import chooseList from './brightsassignChooseList.vue';
export default {
  components: {chooseList},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      chooseList: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /**
       业务权分配申请信息选取人员
       */
    afterInit () {
      this.chooseList = this.$refs.chooseList;
    },
    // 选取
    choose () {
      // 获得选取人员信息
      const chooseData = this.chooseList.$refs.refTable.selections[0];
      if(!this.validateRoleFn(chooseData.roleCode)){
        this.$xutils.showMsgBox('提示', '综合客户经理及小企业客户经理不允许两两间分配业务权', 400, 300);
        return;
      }
      // 将人员信息转换为对应的变量
      const jsonChooseData = {
        'bizRightsRecipientUser': chooseData.loginCode,
        'bizRightsRecipientUserName': chooseData.userName,
        'bizRightsRecipientBelgOrg': chooseData.orgName
      };
      this.$dialog.close(this.dialogId, jsonChooseData);
    },
    back () {
      this.$dialog.close(this.dialogId);
    },
    validateRoleFn: function (roleCode) {
      let flag = true;
      const _this = this;
      let roles = _this.$xutils.getLoginUserInfo().roles;
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].code == 'R0020' || roles[i].code == 'R0050') {
          if (roleCode.indexOf('R0020') !== -1 || roleCode.indexOf('R0050') !== -1) {
            flag = false;
          }
        }
      }
      return flag;
    }
  }
};
</script>
