<template>
  <!--
    @created by chenlong9
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 银承合同申请列表入口
  -->
  <yu-tabs type="card">
    <yu-tab-pane label="银承合同申请">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="银承合同申请历史">
      <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './iqpAccpAppList_d1_1_BillList.vue';
import d12Billlist from './iqpAccpAppList_d1_2_BillList.vue';
export default {
  components: { d11Billlist, d12Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_1_BillList: null,
      d1_2_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    // 用信管理/银承合同申请/银承合同申请历史
    AfterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_2_BillList = this.$refs.d1_2_BillList;

      // 过滤申请状态，移除【取消、拿回、再议、自行退出、通过、否决】数据字典
      this.d1_1_BillList.setSelectOptions('apprStatus', 'hidden', '990,991,993,996,997,998');

      // 过滤申请状态，移除【取消、打回、再议、拿回、代发起、审批中】数据字典
      this.d1_2_BillList.setSelectOptions('apprStatus', 'hidden', '990,992,993,991,000,111');
    },

    // 新增
    doAdd () {
      this.$dialog.open('银承合同申请', 'bizmanage/iqpBiz/iqpAccpApp/iqpAccpAppAddIndex', 800, 700, null, () => {
        this.d1_1_BillList.queryDataByCondition(); // 刷新页面
      });
    },

    // 删除
    doDelete () {
      let rtnData = {};
      let jsoPar = this.d1_1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      if (jsoPar.approveStatus != '000' && jsoPar.approveStatus != '992') {
        this.$xutils.showMsgBox('提示', '仅允许删除【待发起】【打回】的数据', 350, 150);
        return;
      }

      // 状态为待发起（000）则物理删除
      if (jsoPar.approveStatus == '000') {
        // 进行逻辑删除
        this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
          if (isOK) {
            this.$xutils.request({
              // 同步请求
              async: false,

              url: this.$backend.cmisBiz + '/api/iqpaccpapp/logicdelete',
              data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

              success: (response, status, xhr) => {
                if (response.code == '0') {
                  this.$xutils.showMsgBox('提示', '删除成功!', 350, 150, this.getRefreshList);
                  rtnData = response.data;
                } else {
                  this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
                }
              },

              error: (result, b) => {
                this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
              }
            });
          }
        });
      }

      // 状态为打回（992）则更新审批状态为自行退回（996）
      if (jsoPar.approveStatus == '992') {
        jsoPar['approveStatus'] = '996';

        this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
          if (isOK) {
            this.$xutils.request({
              // 同步请求
              async: false,

              url: this.$backend.cmisBiz + '/api/iqpaccpapp/logicdelete',
              data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

              success: (response, status, xhr) => {
                if (response.code == '0') {
                  this.$xutils.showMsgBox('提示', '删除成功!', 350, 150, this.getRefreshList);
                  rtnData = response.data;
                } else {
                  this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
                }
              },

              error: (result, b) => {
                this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
              }
            });
          }
        });
      }
    },

    // 刷新列表
    getRefreshList () {
      this.d1_1_BillList.queryDataByCondition();
    },

    // 修改
    doUpdate () {
      let _jsoPar = this.d1_1_BillList.getSelectedRowData();
      const jsoPar = this.$utils.clone(_jsoPar, jsoPar);

      if (_jsoPar == null || _jsoPar == '') {
        this.$xutils.showMsgBox('提示:', '必须选择一条记录进行操作!');
        return;
      }

      if (jsoPar.approveStatus == '111') {
        this.$xutils.showMsgBox('提示', '"审批中"状态的申请记录不能进行修改操作！', 350, 150);
        return;
      }

      jsoPar.opType = 'edit';
      jsoPar.op = 'EDIT';
      jsoPar.imageType = '2';
      this.goToDetailFn(jsoPar);
    },

    // 调用模板工厂配置的详情界面
    goToDetailFn (row) {
      row.model_group_no = 'CMG000393';
      row.biz_serno = row.serno;
      row.biz_op = row.op;
      row.period = '02';
      row.bizLine = '03';
      row.busiType = '07';
      row.guarWay = row.guarMode;
      if (row.guarWay == '21') {
        row['isAddGuar'] = '0';
      }
      row.topOutsystemCode = 'CDHPDY;CDHPZY;';
      row.imageParams = {
        contid: row.contNo,
        businessid: row.serno,
        docid: row.serno
      };
      var _this = this;
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: row.biz_serno + row.op,
        title: '银承合同申请详情',
        data: row
      });
      _this.refreshBillListData();
    },

    // 修改后列表回调函数，实现列表数据自动刷新
    refreshBillListData () {
      this.d1_1_BillList.queryDataByCondition();
    },

    // 查看
    doView () {
      let _jsoPar = this.d1_1_BillList.getSelectedRowData();
      const jsoPar = this.$utils.clone(_jsoPar, jsoPar);

      if (_jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      jsoPar.opType = 'view';
      jsoPar.op = 'VIEW';
      this.goToDetailFn(jsoPar);
    },

    // 查看历史
    doViewHis () {
      let _jsoPar = this.d1_2_BillList.getSelectedRowData();
      const jsoPar = this.$utils.clone(_jsoPar, jsoPar);

      if (_jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      jsoPar.opType = 'view';
      jsoPar.op = 'VIEW';
      this.goToDetailFn(jsoPar);
    }
  }
};
</script>
