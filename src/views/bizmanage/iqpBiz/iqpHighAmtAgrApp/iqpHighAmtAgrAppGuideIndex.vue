<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './iqpHighAmtAgrAppGuide_d1_BillCard.vue';
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
    /**
       * 最高额授信协议申请向导
       */

    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard; // 创建卡片

      // 执行配置的默认值公式
      this.d1_BillCard.execBillCardDefaultValueFormula();

      // 页面录入框下拉框绑定onchange事件
      // this.d1_BillCard.addEditChangeAction(this.isBasicChange);

      this.d1_BillCard.setItemValue('contType', '3');
      this.d1_BillCard.setItemValue('isUtilLmt', '1');
      this.d1_BillCard.setItemValue('isRenew', '0');
    },

    // 点击下一步，保存界面信息，保存成功后，跳转到修改页面
    nextStep () {
      // 检验表单
      let checkFlag = this.d1_BillCard.validateBillCardValue();

      if (!checkFlag) {
        return;
      }

      // 获取当前界面数据，带入修改界面中
      let jsoPar = this.d1_BillCard.getBillCardValue();
      if (jsoPar.isRenew == '1' && jsoPar.origiContNo == '') {
        // this.$xutils.showMsgBox('提示', '原合同编号不能为空!\r\n请重新操作!', 350, 150);
        this.$message({ message: '原合同编号不能为空!\r\n请重新操作!', type: 'warning' });
        return;
      }
      let iqpHighAmtAgrApp = this.$xutils.toUpperCase(jsoPar, true);
      // 保存操作
      let rtnData = '';
      let rtnFlag = true;
      // 调用ajax请求落地后端接口数据
      this.$xutils.request({
      // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/iqphighamtagrapp/savehighamtagrappinfo',
        data: JSON.stringify(iqpHighAmtAgrApp),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            rtnData = response.data;
          } else {
            rtnFlag = false;
            // this.$xutils.showMsgBox('提示', response.message);
            this.$message({ message: response.message, type: 'error' });
          }
        },

        error: (result, b) => {
          // this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          this.$message({ message: result + '错误信息: ' + b, type: 'error' });
        }
      });

      // 针对异常的场景，rtnData未赋值，直接返回不进行后续处理
      if (!rtnFlag || JSON.stringify(rtnData) == '{}' || JSON.stringify(rtnData) == '') {
        return;
      }

      if (rtnData.rtnCode != '000000') {
        // this.$xutils.showMsgBox('提示', rtnData.rtnMsg); // 弹出提示
        this.$message({ message: rtnData.rtnMsg, type: 'error' });
        return;
      }

      this.$xutils.showMsgBox('提示', '新增成功', null, null, () => {
        this.$xutils.getParentPage(this, null, 'refreshBillListData');
        jsoPar['model_group_no'] = 'CMG000334';
        jsoPar['op'] = 'ADD';
        jsoPar['bizLine'] = '03';
        // 办理人员页面为通用的js，其中关联主键名称为biz_serno,因此入参新增biz_serno字段并赋值iqp_serno
        jsoPar['biz_serno'] = rtnData.serno;
        // jsoPar['lmt_serno'] = rtnData.serno;
        // // 增加类型字段，用于判断业务规则校验
        // jsoPar['bizType'] = 'lmt';

        jsoPar['period'] = '02';
        jsoPar['busiType'] = '01';
        jsoPar['guarWay'] = jsoPar.guarMode;
        if (jsoPar.guarWay == '21') {
          jsoPar['isAddGuar'] = '0';
        }
        jsoPar.imageType = '2';
        var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
        this.$router.addTab({
          name: path,
          key: jsoPar.serno + jsoPar.op,
          title: '最高额授信协议详情',
          data: jsoPar
        });
      });
      this.onCancel();
    },

    // 返回
    onCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
