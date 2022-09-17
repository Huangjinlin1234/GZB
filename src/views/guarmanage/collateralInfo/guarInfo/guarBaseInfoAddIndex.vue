<template>
  <div>
    <d1-billcard ref="d1_BillCard"></d1-billcard>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center">
      <yu-button v-if="allowWrite" type="primary" @click="save">保存</yu-button>
      <yu-button type="primary" @click="cancel">关闭</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import d1Billcard from './guarBaseInfoAdd_d1_BillCard.vue';
export default {
  components: { d1Billcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      allowWrite: true
    };
  },
  mounted () {
    this.allowWrite = this.getFactory().contextData.op == 'ADD' || this.getFactory().contextData.op == 'EDIT';
    this.AfterInit();
  },
  methods: {
    // 押品基本信息新增页面
    AfterInit () {
      var _this = this;

      this.d1_BillCard = this.$refs.d1_BillCard;

      // 获取符合条件的列表数据
      this.d1_BillCard.queryDataByCondition({
        serno: _this.getFactory().contextData.serno
      });

      if (this.getFactory().contextData.op == 'ADD') {
        // 新增时回显和设置默认值
        this.d1_BillCard.setItemValue('serno', this.getFactory().contextData.serno); // 流水号

        this.d1_BillCard.setItemValue('is_scan_mater', this.getFactory().contextData.isScanMater); // 是否扫描资料
        this.d1_BillCard.setItemValue('guar_type_cd', this.getFactory().contextData.guarTypeCd); // 押品类型
        this.d1_BillCard.setItemValue('pldimn_memo', this.getFactory().contextData.pldimnMemo); // 押品类型名称

        this.d1_BillCard.setItemValue('ringht_no_and_other_no', this.getFactory().contextData.ringhtNoAndOtherNo); // 权证编号及其他编号

        this.d1_BillCard.setItemValue('grt_flag', this.getFactory().contextData.grtFlag); // 押品类型(押品标识)

        // 卡片新增时为主键设置默认值
        // 执行默认值公式
        this.d1_BillCard.execBillCardDefaultValueFormula();
      } else if (this.getFactory().contextData.op == 'VIEW') {
        // 设置只读
        this.d1_BillCard.setItemEditable('*', false);
      } else if (this.getFactory().contextData.op == 'EDIT') {
        this.d1_BillCard.setItemEditable('*', true);
      }

      // 设置CHANGE事件
      // d1_BillCard.addEditChangeAction(onChange);
      // 验证界面字段是否显示
      // cardFieldVisible();
      // 模板工厂主页面数据加载成功事件
      this.getFactory().triggerAction(this.d1_BillCard.getBillCardValue());
    },

    // 保存
    save () {
      // 校验必输项

      const validate = this.d1_BillCard.validateBillCardValue();

      if (!validate) {
        return false;
      }

      const rsPars = {};
      const params = this.d1_BillCard.getBillCardValue();

      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'POST',
        url: this.$backend.cmisBiz + '/api/guarbaseinfo/preserveGuarInfo',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),

        success: (response, status, xhr) => {
          if (response.data != null) {
            rsPars['handleFlag'] = true;
          }

          if (response.code != '0') {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            rsPars['handleFlag'] = false;
          }
        },

        error: (result, status, errorThrown) => {
          this.$xutils.showMsgBox('提示', '错误代码：' + result.status + '；错误信息1：' + errorThrown); // 弹出提示
          rsPars['handleFlag'] = false;
        }
      });

      if (rsPars.handleFlag) {
        this.$xutils.showMsgBox('提示', '保存成功', 350, 200, null);
      }
    },

    // 关闭
    cancel () {
      this.$xutils.getParentPage2(this, 'd1_BillList', 'queryDataByCondition');
      this.getFactory().back();
    }
  }
};
</script>
