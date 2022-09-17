<template>
<div>
  <d1-billcard ref="d1_BillCard" :btnFlag="btnFlag"></d1-billcard>
      <yufpNwfInit ref="yufpNwfInit"></yufpNwfInit>
      </div>
</template>
<script>
import d1Billcard from './hxdPage8_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      yhll: null,
      btnFlag: 1, // 1, 2, 3,
      surveySerno: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    // 优惠利率申请
    afterInit () {
      this.yhll = this.$refs.d1_BillCard;
      try {
      // 正常页面进入 审批
        // 走新增tab页签进来的
        this.surveySerno = this.$route.meta.params.surveySerno;
      } catch (e) {
        // 走审批模版工厂
        this.surveySerno = this.getFactory().bizPageData.instanceInfo.bizId;
      }


      // 查询优惠利率信息 从而显示按钮结果
      this.yhll.setBillCardItemValue('surveySerno', this.surveySerno);
      this.selectData();
    },

    showAction () {
      this.selectData();
    },

    /* 优惠利率保存方法 */
    save: function () {
      if (!this.yhll.validateBillCardValue()) {
        return false;
      }
      this.$xutils.request({
        // 同步请求
        async: true,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/lmtperferrateapplyinfo/savebysurveyserno',
        data: JSON.stringify(this.$xutils.toUpperCase(this.yhll.getBillCardValue(), true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$message({message: '保存成功', type: 'success'});
            return true;
          } else {
            this.$message({message: '保存失败', type: 'warning'});
            return false;
          }
        }
      });
    },
    
    submit () {
      // 提交  （1）显示条件：不存在流程中或审批通过的优惠利率申请流程时显示。
      // （2）点击按钮，校验必填项填写完整。
      // d1_1_BillList.setBillListButtonVisable('重新分配', false, 3);
      if (!this.yhll.validateBillCardValue()) {
        return;
      }
      var data = this.yhll.getBillCardValue();
      var isApproval;
      this.$xutils.request({
        // 同步请求
        async: true,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/lmtperferrateapplyinfo/rateApp',
        data: data,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            isApproval = response.data;
            if (isApproval == 'Y') {
              this.selectData();
              this.$message({message: '已发起审批流程', type: 'info'});
            } else if (isApproval == 'N') {
              this.selectData();
              this.$message({message: '此优惠利率申请无需审批！', type: 'warning'});
            } else {
              this.$message({message: '审批异常！', type: 'warning'});
            }
          } else {
            this.$message({message: response.message, type: 'error'});
          }
        }
      });
    },
    // 撤销优惠利率申请
    revocation() {
      // 撤销  （1）显示条件：审批中或者审批通过可以撤销，
      // （2） 撤销后置为自行退出
      if (!this.yhll.validateBillCardValue()) {
        return;
      }
      var data = this.yhll.getBillCardValue();
      var approveStatus = data.approveStatus;
      if (approveStatus === '111' || approveStatus === '997') {
        this.$xutils.request({
          // 同步请求
          async: true,
          type: 'POST',
          url: this.$backend.cmisBiz + '/api/lmtperferrateapplyinfo/rateRev',
          data: data,
          success: (response, status, xhr) => {
            if (response.code == '0') {
              this.selectData();
              this.$message({message: '审批撤销成功', type: 'info'});
            } else {
              this.$message({message: response.message, type: 'warning'});
            }
          }
        });
      } else {
        this.$message({message: '不在审批中或者审批通过状态的利率申请不可撤回', type: 'warning'});
      }
      
    },

    // 提交返回
    onCancelPage () {},


    selectData () {
      // 查询优惠利率审批结果

      // MODEL_APPR_RESULT_INFO
      this.$xutils.request({
        // 同步请求
        async: false,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/lmtperferrateapplyinfo/selectbysurveyserno',
        data: {
          surveySerno: this.surveySerno
        },
        success: (response, status, xhr) => {
          if (response.code == '0') {
            if (response.data == null) {
              // 不存在优惠利率申请
              this.yhll.saveBtn = true;
              this.yhll.comitBtn = true;
              this.yhll.applyBtn = false;
              this.yhll.formdata.surveySerno = this.surveySerno;
              return;
            } else if (response.data.approveStatus != '111' && response.data.approveStatus != '997') {
              // 不存在存在流程中的申请
              this.yhll.saveBtn = true;
              this.yhll.comitBtn = true;
              this.yhll.applyBtn = false;
              yufp.clone(response.data, this.yhll.formdata);
            } else if (response.data.approveStatus == '111' || response.data.approveStatus == '997') {
              this.yhll.applyBtn = true;
              this.yhll.comitBtn = false;
              this.yhll.saveBtn = false;
              yufp.clone(response.data, this.yhll.formdata);
            }
          } else {
            this.$message({message: response.message, type: 'warning'});
          }
        }
      });
    }
  }
};
</script>
