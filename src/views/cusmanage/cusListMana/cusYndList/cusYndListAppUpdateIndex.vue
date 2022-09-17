<template>
  <div>
    <div>
      <d1-a-billcard ref="d1_A_BillCard"  :operate="operate"></d1-a-billcard>
    </div>
    <yufp-nwf-init ref="yufpNwfInit"></yufp-nwf-init>
  </div>
</template>
<script>
import d1ABillcard from './cusYndListAppUpdate_d1_A_BillCard.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import { dateFormat } from '@/utils';
export default {
  components: {d1ABillcard, yufpNwfInit},
  props: {
    pageParams: Object,
    dialogId: String,
    saveFlag: {
      type: String,
      default: 'tempSave'
    }
  },
  data () {
    return {
      d1_A_BillCard: null,
      operate: ''
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
       * 刘愿 优农贷新增基本信息
       */

    AfterInit () {
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.operate = this.getFactory().contextData.opType;
      if (this.getFactory().contextData.instanceInfo && this.getFactory().contextData.instanceInfo.bizId) {
        var serno = this.getFactory().contextData.instanceInfo.bizId;
        this.d1_A_BillCard.queryDataByCondition({serno: serno});
        this.d1_A_BillCard.changeStatus();
        this.d1_A_BillCard.onlyView = false;
      } else {
        if (this.operate == 'add') {
          this.d1_A_BillCard.execBillCardDefaultValueFormula();
        }
        let serno = this.getFactory().contextData.serno;
        if (!serno) {
          serno = this.pageParams.serno;
          this.isDialogOpen = true;
        }
        if (this.getFactory().contextData.op == 'VIEW') {
          this.d1_A_BillCard.changeStatus();
        }
        this.d1_A_BillCard.setBillCardValue(this.getFactory().contextData);
      }
    },

    // 配偶信息隐藏与显示
    showStyleFun () {
      if (this.d1_A_BillCard.getBillCardItemValue('mar_status') == '02') {
        // 默认单选
        this.d1_A_BillCard.setItemVisible('spouse_name;spouse_idcard_no;spouse_mobile_no;', true);
        // d1_A_BillCard.setVisible()
      } else {
        this.d1_A_BillCard.setItemVisible('spouse_name;spouse_idcard_no;spouse_mobile_no;', false);
      }
    },

    bycancel () {
      this.$dialog.close(this.dialogId);
    },

    showAction () {
      const serno = this.d1_A_BillCard.getBillCardItemValue('serno');
      this.getFactory().contextData.serno = serno;
    },

    // 保存，提交通用的方法
    commonSave (func) {
      var _this = this;
      var validate = this.d1_A_BillCard.validateBillCardValue();
      if (!validate) {
        _this.$message({ message: '校验失败', type: 'error' });
        return;
      }
      var dataTable = this.d1_A_BillCard.formdata;
      if (typeof dataTable.createTime === 'number') {
        dataTable.createTime = dateFormat(new Date(dataTable.createTime), '{y}-{m}-{d}');
      }
      dataTable.saveFlag = this.saveFlag;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCus + '/api/cuslstyndapp/tempSave',
        data: dataTable,
        callback: function (code, message, response) {
          if (code === '0') {
            if (response.data == '1') {
              func && func();
            } else if (response.data == '-1') {
              _this.$message('该客户存在未通过的审批!');
            } else {
              _this.$message('暂存失败!');
            }
          } else {
            this.$message({
              message: message,
              type: 'error'
            });
          }
        }
      });
    },

    // 页面定义的保存方法
    doSave () {
      this.commonSave(() => {
        this.$xutils.showMsgBox('提示', '保存成功', 350, 200, () => {
          // 当前页面中的数据放入frameContext中，后续子页面可以使用
          this.getFactory().triggerAction(this.d1_A_BillCard.getBillCardValue());
        });
      });
    },

    // 提交按钮
    doSubmit () {
      // 必输校验
      let validateFlag = this.d1_A_BillCard.validateBillCardValue();
      if (!validateFlag) {
        return;
      }
      this.saveFlag = 'submit';
      this.commonSave(() => {
        // 刷新列表页面
        this.afterSaveCommit();
      });
    },

    // 保存成功后调用发起流程的方法
    afterSaveCommit () {
      var _this = this;
      var dataTable = this.d1_A_BillCard.formdata;
      var startdto = {};
      const loginUser = _this.$xutils.getLoginUserInfo();
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.org.code;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = 'KH019';
      startdto.bizId = dataTable.serno;
      startdto.bizUserName = dataTable.cusName;
      startdto.bizUserId = dataTable.cusId;
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },

    // 返回
    doBack () {
      if (this.getFactory().contextData) {
        this.getFactory().getFactory().back();
      } else {
        this.$dialog.close(this.dialogId);
      }
    }
  }
};
</script>
