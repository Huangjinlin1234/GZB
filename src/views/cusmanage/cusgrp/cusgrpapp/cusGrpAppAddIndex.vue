<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusGrpAppAdd_d1_BillCard.vue';
// 下一步
let jsoPar = '';

export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /*
      集团客户认定申请
      */
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;

      // 流水号
      const grpSerno = this.$xutils.getSEQWithParamFromServer('CUS_GRP_SERNO');

      // 集团客户编号
      // var grpNo = YuXPUtil.getSEQWithParamFromServer('CUS_GRP_NO');
      this.d1_BillCard.setBillCardItemValue('serno', grpSerno);

      // d1_BillCard.setBillCardItemValue("grp_no",grpNo);

      // 当前登录用户信息
      const jsoUser = this.$xutils.getLoginUserInfo();

      // 登记人
      const input_id = jsoUser['loginCode'];

      // 登记机构
      const input_br_id = jsoUser['orgCode'];

      // 登记日期
      const input_date = this.$xutils.dateFormat('yyyy-MM-dd', new Date());

      // 创建时间
      const create_time = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());

      // 审批状态 000--待发起
      const approve_status = '000';

      //根据角色获取集团性质：投资经理-R0100:02 投资集团;否则01 法人集团
      let grp_nature = '01';
      const roles = jsoUser['roles'];
      for (let key in roles) {
        if (roles[key].code == 'R0100') {
          grp_nature = '02';
          break;
        }
      }

      this.d1_BillCard.setBillCardItemValue('input_id', input_id);
      this.d1_BillCard.setBillCardItemValue('input_br_id', input_br_id);
      this.d1_BillCard.setBillCardItemValue('input_date', input_date);
      this.d1_BillCard.setBillCardItemValue('create_time', create_time);
      this.d1_BillCard.setBillCardItemValue('approve_status', approve_status);
      this.d1_BillCard.setBillCardItemValue('grp_nature', grp_nature);
      this.d1_BillCard.execBillCardDefaultValueFormula();
    },

    // 核心客户选取，可以选择对公或者同业
    onAdd () {
      // 打开选取页面
      this.$dialog.open(
        '',
        'cusmanage/cusgrp/cusgrpapp/cusGrpAppSelectIndex',
        1200,
        800,
        {},
        data => {
          // 核心客户号
          this.d1_BillCard.setBillCardItemValue('core_cus_id', data.cusId);

          // 核心客户名称
          this.d1_BillCard.setBillCardItemValue('core_cus_name', data.cusName);

          // 主办人
          this.d1_BillCard.setBillCardItemValue('manager_id', data.managerId);

          // 主管机构
          this.d1_BillCard.setBillCardItemValue('manager_br_id', data.managerBrId);

          // 企业中征码
          this.d1_BillCard.setBillCardItemValue('core_cus_loan_car', data.loanCardId);

          // 统一社会信用号码 ------未确认
          var socialCreditCode = '';
          if(data.certType === 'R'){
            socialCreditCode = data.certCode
          }
          this.d1_BillCard.setBillCardItemValue('soci_cred_code', socialCreditCode);

          // 核心客户证件号码
          this.d1_BillCard.setBillCardItemValue('core_cus_cert_no', data.certCode);

          // 实际经营地址
          this.d1_BillCard.setBillCardItemValue('office_addr', data.operAddrAct);

          // 实际办公地区划
          this.d1_BillCard.setBillCardItemValue('office_addr_admin_div', data.regiAreaCode);

          // 登记注册
          this.d1_BillCard.setBillCardItemValue('business_circles_regi_no', data.regiCode);

          // 操作类型  默认01 新增
          this.d1_BillCard.setBillCardItemValue('opr_type', '01');
        }
      );
    },

    doNextStep () {
      // 判断用户是否录入信息
      jsoPar = this.d1_BillCard.getBillCardValue();

      // 校验数据必输
      var validateFlag = this.d1_BillCard.validateBillCardValue();
      if (!validateFlag) {
        return;
      }
      // 调用后台代码，判断该核心客户是否已经存在在途集团认定或变更集团认定或集团中
      const flag = this.checkData();

      if (!flag) {
        return;
      }

      //调用后台代码，判断该核心客户是否有信贷业务记录
      // const flag2 = this.checkData2();

      // if (!flag2) {
      //   return;
      // }

      // 前端保存不要了，放入后端端保存
      if (flag) {
        // 集团认定详情展示组合模板
        jsoPar['model_group_no'] = 'CMG000245';
        jsoPar['op'] = 'update';
        this.$dialog.open('集团客户认定', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, jsoPar);
      }
    },

    /* 返回按钮*/
    onCancel () {
      this.$dialog.close(this.dialogId);
    },

    // 添加校验，判断该核心客户是否已经存在在途集团认定或变更集团认定或集团中
    checkData () {
      let flag = false;
      const param = this.d1_BillCard.getBillCardValue();

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisCus + '/api/cusgrpapp/selectbycusid',
        data: JSON.stringify(this.$xutils.toUpperCase(param, true)),

        success: (response, status, xhr) => {
          const data = response.data;

          if (data.rtnCode != 'ECS040000') {
            this.$xutils.showMsgBox('提示', '错误信息：' + data.rtnMsg, 450, 300, () => {
              flag = false;
            });
          } else {
            flag = true;
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', '处理异常： ' + JSON.stringify(result), 450, 300);
        }
      });

      return flag;
    },

       // 添加校验，判断该核心客户是否有信贷业务记录
    checkData2 () {
      let flag = false;
      const param = this.d1_BillCard.getBillCardValue();
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisLmt + '/api/apprstrmtableinfo/selectByCusId',
        data: {cusId:param.coreCusId},

        success: (response, status, xhr) => {
          const data = response.data;

          if (data.rtnCode != 'ECL070000') {
            this.$xutils.showMsgBox('提示', '错误信息：' + data.rtnMsg, 450, 300, () => {
              flag = false;
            });
          } else {
            flag = true;
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', '处理异常： ' + JSON.stringify(result), 450, 300);
        }
      });

      return flag;
    }
  }
};
</script>
