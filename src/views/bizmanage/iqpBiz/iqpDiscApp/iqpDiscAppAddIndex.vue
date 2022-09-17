<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './iqpDiscAppAdd_d1_BillCard.vue';
/**
 * 贴现申请向导页面
 */
let selfPar = {};

export default {
  components: { d1Billcard },
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
    AfterInit () {
      selfPar = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard; // 创建卡片

      // 执行配置的默认值公式
      this.d1_BillCard.execBillCardDefaultValueFormula();
      // 是否使用授信额度
      this.d1_BillCard.formdata.isRenew = '0';
      this.d1_BillCard.formdata.isUtilLmt = '1';
      // 页面录入框下拉框绑定onchange事件
      this.d1_BillCard.addEditChangeAction(this.isBasicChange);
    },

    isBasicChange (thisCard, itemKey, oldVal, newVal) {
      // onchang事件，若“票据种类 = 商业承兑汇票”,则展示  “承兑企业客户编号、名称”字段，否则隐藏不展示
      if (itemKey == 'drftType' && newVal == '1') {
        // 银行承兑1
        this.d1_BillCard.setBillCardItemVisible('acptCrpCusId', false);
        this.d1_BillCard.setBillCardItemRequired('acptCrpCusId', false);
        this.d1_BillCard.setBillCardItemVisible('acptCrpCusName', false);
        this.d1_BillCard.setBillCardItemRequired('acptCrpCusName', false);
        this.d1_BillCard.setSelectOptions('discContType', 'hidden', '*');
        // thisCard.setSelectOptions('discContType', 'add', '01');
        // 隐藏后清空原有数据值
        this.d1_BillCard.setBillCardItemClearValue('acptCrpCusId');
        this.d1_BillCard.setBillCardItemClearValue('acptCrpCusName');
      } else if (itemKey == 'drftType' && newVal == '2') {
        // 商业承兑2
        this.d1_BillCard.setBillCardItemVisible('acptCrpCusId', true);
        this.d1_BillCard.setBillCardItemRequired('acptCrpCusId', true);
        this.d1_BillCard.setBillCardItemVisible('acptCrpCusName', true);
        this.d1_BillCard.setBillCardItemRequired('acptCrpCusName', true);
        this.d1_BillCard.setSelectOptions('discContType', 'hidden', '2');
      }
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

      let iqpAppDisc = this.$xutils.toUpperCase(jsoPar, true);

      // 保存操作
      let rtnData = '';

      let rtnFlag = true;

      // 调用ajax请求落地后端接口数据
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/iqpdiscapp/saveiqpdiscappinfo',
        data: JSON.stringify(iqpAppDisc),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            rtnData = response.data;
          } else {
            rtnFlag = false;
            this.$xutils.showMsgBox('提示', response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });

      // 针对异常的场景，rtnData未赋值，直接返回不进行后续处理
      if (!rtnFlag || JSON.stringify(rtnData) == '{}' || JSON.stringify(rtnData) == '') {
        return;
      }

      if (rtnData.rtnCode != '000000') {
        this.$xutils.showMsgBox('提示', rtnData.rtnMsg); // 弹出提示
        return;
      }

      this.$xutils.showMsgBox('提示', '新增成功', null, null, () => {
        this.$xutils.getParentPage(this, null, 'refreshBillListData');
        jsoPar['model_group_no'] = 'CMG000172';
        jsoPar['op'] = 'EDIT';
        jsoPar['imageType'] = '2';
        // 办理人员页面为通用的js，其中关联主键名称为biz_serno,因此入参新增biz_serno字段并赋值iqp_serno

        jsoPar['biz_serno'] = rtnData.serno;

        // 增加类型字段，用于判断业务规则校验
        jsoPar['bizType'] = 'iqp';

        // this.$dialog.open('', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, jsoPar, true, true);
        var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
        this.$router.addTab({
          name: path,
          key: jsoPar.biz_serno + jsoPar.op,
          title: '贴现协议申请',
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
