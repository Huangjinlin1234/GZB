<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './gtrauarass_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    // 一般担保合同列表界面
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      // this.d1_BillList.setAppendSQLCondition({'guar_cont_type=\'00\' and opr_type = \'01\'');
      this.d1_BillList.queryDataByCondition({guar_cont_type: '00', opr_type: '01'});
      // this.d1_BillList.setBillListButtonVisable('新增', false);
      // this.d1_BillList.setBillListButtonVisable('修改', false);
      // this.d1_BillList.setBillListButtonVisable('删除', false);
      // this.d1_BillList.setBillListButtonVisable('签订', false);
      // this.d1_BillList.setBillListButtonVisable('多表新增', false);
      // this.d1_BillList.setBillListButtonVisable('多表修改', false);
      this.d1_BillList.max = false;
      // 过滤申请状态，隐藏【信用】等数据字典
      this.d1_BillList.setSelectOptions('guar_way', 'hidden', '400');
    },

    // 注销有效状态的担
    onLogout () {
      let jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      if (jsoPar.guarContState != '100') {
        this.$xutils.showMsgBox('提示', '生效状态的担保合同不能做注销操作', 350, 150);
        return;
      }

      jsoPar['model_group_no'] = 'GRT_GUAR_CONT_ADD';
      jsoPar['myop'] = 'onLogout';
      jsoPar['bizTyp'] = 'CHG';// 增加业务类型用于区分业务申请与担保变更申请

      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar
      );
    },

    // 查看担保合同
    onView () {
      let selfPars = this.d1_BillList.getSelectedRowData();

      if (selfPars == null || selfPars == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      selfPars['model_group_no'] = 'GRT_GUAR_CONT_ADD';
      selfPars['op'] = 'VIEW';
      selfPars['bizTyp'] = 'CHG';// 增加业务类型用于区分业务申请与担保变更申请

      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        selfPars
      );
    },

    getDialogDataFunc (jsoPar) {
      // this.d1_BillList.setAppendSQLCondition({guar_cont_type: '00', opr_type: '01'});
      this.d1_BillList.queryDataByCondition({guar_cont_type: '00', opr_type: '01'});
    },

    // 打印
    onPrint () {
      let params = this.d1_BillList.getSelectedRowData();
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      let contPrintNum = params.contPrintNum;
      if (params.guarContState != '101') {
        this.$xutils.showMsgBox('提示', '请选择一条担保合同状态为"生效"状态的记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      params['contPrintNum'] = parseInt(contPrintNum) + 1;
      params['myop'] = 'onPrint';

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/grtguarcont/updateSelectiveByParams',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '打印成功');
            this.d1_BillList.queryDataByCondition({guar_cont_type: '00', opr_type: '01'});
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', b + '；错误信息：' + result.message); // 弹出提示
        }
      });
    }
  }
};
</script>
