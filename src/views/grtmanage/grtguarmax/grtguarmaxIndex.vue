<template>
  <d1-billlist ref="d1_BillList" :max="max"></d1-billlist>
</template>
<script>
import d1Billlist from './grtguarmax_d1_BillList.vue';
export default {
  components: { d1Billlist },
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
    // 最高额担保合同列表界面
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.queryDataByCondition({
        guar_cont_type: '01',
        oprType: '01'
      });
      // 过滤申请状态，隐藏【信用】等数据字典
      this.d1_BillList.setSelectOptions('guarWay', 'hidden', '400');
    },

    // 新增最高额担保合同
    onInsert () {
      this.$dialog.open(
        '新增页面',
        'grtmanage/grtguarmax/grtguarnextstepIndex',
        900,
        500,
        {},
        this.getDialogDataFunc,
        true,
        true
      );
    },

    // 修改最高额担保合同
    onUpdate () {
      let params = this.d1_BillList.getSelectedRowData();

      if (params == null || params == '') {
        this.$xutils.showMsgBox(
          '提示',
          '必须选择一条记录进行操作!\r\n请重新操作!',
          350,
          150
        );
        return;
      }

      if (params.guarContState != '100') {
        this.$xutils.showMsgBox(
          '提示',
          '已生效状态的担保合同不能做修改操作!',
          350,
          150
        );
        return;
      }

      params['model_group_no'] = 'GRT_GUAR_CONT_ADD';
      params['op'] = 'EDIT';
      params['guar_way'] = params.guarWay;

      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params,
        this.getDialogDataFunc,
        true,
        true
      );
    },

    // 更新最高额担保合同列表数据
    getDialogDataFunc () {
      // this.d1_BillList.setAppendSQLCondition('guar_cont_type=\'01\' and opr_type = \'01\'');
      this.d1_BillList.queryDataByCondition({
        guar_cont_type: '01',
        oprType: '01'
      });
    },

    // 担保变更合同列表数据
    getDialogDataFuncChg () {
      this.d1_BillList.queryDataByCondition();
    },

    // 签订登记状态的担保合同
    onSign () {
      let jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox(
          '提示',
          '必须选择一条记录进行操作!\r\n请重新操作!',
          350,
          150
        );
        return;
      }

      if (jsoPar.guarContState != '101') {
        this.$xutils.showMsgBox(
          '提示',
          '未生效状态的担保合同不能做签订操作!',
          350,
          150
        );
        return;
      }

      jsoPar['model_group_no'] = 'GRT_GUAR_CONT_ADD';
      jsoPar['myop'] = 'SIGN';
      jsoPar['guar_way'] = jsoPar.guarWay;

      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar,
        this.getDialogDataFunc,
        true,
        true
      );
    },

    // 注销有效状态的担保合同
    onLogout () {
      var _this = this;
      let jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox(
          '提示',
          '必须选择一条记录进行操作!\r\n请重新操作!',
          350,
          150
        );
        return;
      }

    //  if (jsoPar.guarContState != '101') {
    //    this.$xutils.showMsgBox(
    //      '提示',
    //      '未生效状态的担保合同不能做注销操作',
    //      350,
    //      150
    //    );
    //    return;
    //  }
      let guarContNo = this.d1_BillList.getSelectedRowData().guarContNo;

      yufp.service.request({
        async: false,
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/grtguarcont/checkOnLogout/' + guarContNo,
        callback: function (code, message, response) {
          if (response.code == '0') {
            jsoPar['model_group_no'] = 'GRT_GUAR_CONT_ADD';
            jsoPar['myop'] = 'onLogout';
            _this.$dialog.open(
              '',
              'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
              -1,
              -1,
              jsoPar,
              _this.getDialogDataFunc,
              true,
              true
            );
          } else {
            _this.$message({ message: response.erortx, type: 'error' });
          }
        }
      });
    },

    // 查看担保合同
    onView () {
      let jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox(
          '提示',
          '必须选择一条记录进行操作!\r\n请重新操作!',
          350,
          150
        );
        return;
      }

      jsoPar['model_group_no'] = 'GRT_GUAR_CONT_ADD';
      jsoPar['op'] = 'VIEW';

      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar,
        this.getDialogDataFunc,
        true,
        true
      );
    },

    // 删除
    onDelete () {
      let params = this.d1_BillList.getSelectedRowData();

      if (params == null || params == '') {
        this.$xutils.showMsgBox(
          '提示',
          '必须选择一条记录进行操作!\r\n请重新操作!',
          350,
          150
        );
        return;
      }

      if (params.guarContState != '100') {
        this.$xutils.showMsgBox(
          '提示',
          '“已生效”状态的担保合同，不能删除操作！',
          350,
          150
        );
        return;
      }

      this.$xutils.showConfirmBox(
        '提示',
        '是否确认删除?\r\n请谨慎操作!',
        350,
        150,
        isOK => {
          if (isOK) {
            this.$xutils.request({
              // 同步请求
              async: false,

              url:
                this.$backend.cmisBiz +
                '/api/grtguarcont/updateSelectiveByParams',
              data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
              success: (response, status, xhr) => {
                if (response.data > 0) {
                  this.$xutils.showMsgBox('提示', '删除成功', 350, 150, () => {
                    // this.d1_BillList.queryDataByCondition({guar_cont_type:'01', opr_type = '01', guarContState !=\'02\'');
                  });
                }
              },

              error: (result, b) => {
                this.$xutils.showMsgBox(
                  '提示',
                  b + '；错误信息：' + result.responseJSON.message
                ); // 弹出提示
              }
            });
          }
        }
      );
    },

    // 打印
    onPrint () {
      let params = this.d1_BillList.getSelectedRowData();

      if (params == null || params == '') {
        this.$xutils.showMsgBox(
          '提示',
          '必须选择一条记录进行操作!\r\n请重新操作!',
          350,
          150
        );
        return;
      }

      if (params.guarContState != '101') {
        this.$xutils.showMsgBox(
          '提示',
          '请选择一条担保合同状态为"生效"状态的记录进行操作!\r\n请重新操作!',
          350,
          150
        );
        return;
      }

      let contPrintNum = params.contPrintNum;
      params['contPrintNum'] = parseInt(contPrintNum) + 1;
      params['myop'] = 'onPrint';

      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/grtguarcont/updateSelectiveByParams',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),

        success: (response, status, xhr) => {
          if (response.data > 0) {
            this.$xutils.showMsgBox('提示', '打印成功！'); // 弹出提示
            this.d1_BillList.queryDataByCondition({
              guar_cont_type: '01',
              opr_type: '01'
            });
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox(
            '提示',
            b + '；错误信息：' + result.responseJSON.message
          ); // 弹出提示
        }
      });
    },

    // 多表保存新增
    Insert () {
      this.$dialog.open(
        '新增',
        'grtmanage/grtguarmax/grtInsertTestIndex',
        -1,
        -1,
        {},
        this.getDialogDataFunc
      );
    },

    // 多表保存修改
    update () {
      let params = this.d1_BillList.getSelectedRowData();

      if (params == null || params == '') {
        this.$xutils.showMsgBox(
          '提示',
          '必须选择一条记录进行操作!\r\n请重新操作!',
          350,
          150
        );
        return;
      }

      this.$dialog.open(
        '新增',
        'grtmanage/grtguarmax/grtUpdateTestIndex',
        -1,
        -1,
        params,
        this.getDialogDataFunc
      );
    }
  }
};
</script>
