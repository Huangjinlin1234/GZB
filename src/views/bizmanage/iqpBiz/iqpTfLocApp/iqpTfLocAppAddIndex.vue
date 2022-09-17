<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './iqpTfLocAppAdd_d1_BillCard.vue';
/**
 * 开证申请向导页面
 */
let selfPar = {};

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
    AfterInit () {
      selfPar = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard; // 创建卡片
      this.d1_BillCard.setItemValue('isUtilLmt', '1');
      this.d1_BillCard.setItemValue('guarMode', '10');

      // 执行配置的默认值公式
      // this.d1_BillCard.execBillCardDefaultValueFormula();
      // 0否1是
      this.d1_BillCard.setItemValue('isUtilLmt', '1');
      this.d1_BillCard.setItemValue('guarMode', '10');
      this.d1_BillCard.setItemValue('isRenew', '0');

      // 页面录入框下拉框绑定onchange事件
      this.d1_BillCard.addEditChangeAction(this.isBasicChange);

      // 过滤合同类型状态，移除【最高额授信协议】数据字典
      this.d1_BillCard.setSelectOptions('contType', 'hidden', '3');
    },

    isBasicChange (thisCard, itemKey, oldVal, newVal) {
      // onchang事件，若“是否续签合同 = 是”,则展示  “原合同编号”字段，否则隐藏不展示
      if (itemKey == 'isRenew' && newVal == '0') {
        thisCard.setBillCardItemVisible('origiContNo', false);
        thisCard.setBillCardItemRequired('origiContNo', false);
        // 隐藏后清空原有数据值
        thisCard.setBillCardItemClearValue('origiContNo');
      } else if (itemKey == 'isRenew' && newVal == '1') {
        thisCard.setBillCardItemVisible('origiContNo', true);
        thisCard.setBillCardItemRequired('origiContNo', true);
      }
    },

    // 点击下一步，保存界面信息，保存成功后，跳转到修改页面
    nextStep () {
      // 检验表单

      // this.d1_BillCard.
      let checkFlag = this.d1_BillCard.validateBillCardValue();

      if (!checkFlag) {
        return;
      }

      // 获取当前界面数据，带入修改界面中
      let jsoPar = this.d1_BillCard.getBillCardValue();

      let iqpTfLoc = this.$xutils.toUpperCase(jsoPar, true);
      // 保存操作
      let rtnData = '';

      let rtnFlag = true;

      // 调用ajax请求落地后端接口数据
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/iqptflocapp/saveiqptflocappinfo',
        data: JSON.stringify(iqpTfLoc),

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
        jsoPar['model_group_no'] = 'CMG000314';
        jsoPar['op'] = 'EDIT';

        // 办理人员页面为通用的js，其中关联主键名称为biz_serno,因此入参新增biz_serno字段并赋值iqp_serno
        jsoPar['guarWay'] = jsoPar.guarMode;
        if (jsoPar.guarMode == '21') {
          jsoPar['isAddGuar'] = '0';
        }
        jsoPar['biz_serno'] = rtnData.serno;
        jsoPar['imageType'] = '2';
        // 增加类型字段，用于判断业务规则校验
        // jsoPar['bizType'] = 'lmt';
        // this.$dialog.open(
        //   '',
        //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        //   -1,
        //   -1,
        //   jsoPar,
        //   true,
        //   true
        // );
        var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
        this.$router.addTab({
          name: path,
          key: jsoPar.biz_serno + jsoPar.op,
          title: '开证合同申请',
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
