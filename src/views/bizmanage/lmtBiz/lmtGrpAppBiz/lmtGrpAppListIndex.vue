<template>
  <yu-tabs type="card">
    <yu-tab-pane label="集团客户授信申报">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="集团客户授信历史">
      <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './lmtGrpAppList_d1_1_BillList.vue';
import d12Billlist from './lmtGrpAppList_d1_2_BillList.vue';
var param = {};

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
    /**
     * title 授信管理/单一客户授信/单一客户授信申报
     * author xiamc
     * date 2021-04-02
     * */
    AfterInit () {
      param = this.pageParams;
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_2_BillList = this.$refs.d1_2_BillList;
    },

    add () {
      this.$dialog.open('增加', 'bizmanage/lmtBiz/lmtGrpAppBiz/lmtGrpAddIndex', '500', '400', null, () => {
        this.d1_1_BillList.queryDataByCondition();
      });
    },

    view () {
      const row = this.d1_1_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox('提示', '请选择一条记录！');
        return;
      }

      const params = {
        serno: row.serno,
        grpCusId: row.grpCusId,
        grpCusName: row.grpCusName
      };

      // 将主页面的业务类型传给查看页面
      params['lmtType'] = row.lmtType;

      params['model_group_no'] = 'CMG000153'; // 贷款台账模块
      params['op'] = 'VIEW';

      this.$dialog.open('集团客户授信申报', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', 1400, 600, params);
    },

    // 删除方法
    onDelete () {
      const jsoPar = this.d1_1_BillList.getSelectedRowData();

      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          const row = this.d1_1_BillList.getSelectedRowData();

          if (row == null) {
            this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
            return;
          }
          this.$xutils.request({
            // 同步请求
            async: false,

            type: 'POST',
            // url: this.$backend.cmisBiz + "/api/lmtgrpapp/delete/" + jsoPar.pkId,
            url: this.$backend.cmisBiz + '/api/lmtgrpapp/deletenfo/',
            data: {
              pkId: jsoPar.pkId
            },
            success: (response, status, xhr) => {
              if (response.code == '0') {
                this.rtnData = response.data;
                this.d1_1_BillList.queryDataByCondition();
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
    },

    // 更新方法
    doUpdate () {
      // 获取选择数据
      let params = this.d1_1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      params['op'] = 'EDIT';
      // 弹出框调用
      this.$dialog.open(
        '',
        'bizmanage/lmtBiz/lmtGrpAppBiz/lmtGroupAppIndex',
        -1,
        -1,
        params,
        () => {
          this.d1_1_BillList.queryDataByCondition();
        },
        true,
        true
      );
    },
    // begin
    onReconcide () {
      debugger;
      console.log('执行复议逻辑');
      const row = this.d1_2_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'POST',
        // url: this.$backend.cmisBiz + "/api/lmtgrpapp/delete/" + jsoPar.pkId,
        url: this.$backend.cmisBiz + '/api/lmtgrpapp/onreconside',
        data: JSON.stringify(row),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.rtnData = response.data;
            this.d1_1_BillList.queryDataByCondition();
            this.$xutils.showMsgBox('复议插入成功');
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },


    // end
    // begin
    onRedicuss () {
      debugger;
      console.log('执行再议逻辑');
      const row = this.d1_2_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      this.$xutils.request({
        // 同步请求
        async: false,

        type: 'POST',
        // url: this.$backend.cmisBiz + "/api/lmtgrpapp/delete/" + jsoPar.pkId,
        url: this.$backend.cmisBiz + '/api/lmtgrpapp/onredicuss',
        data: JSON.stringify(row),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.rtnData = response.data;
            this.d1_1_BillList.queryDataByCondition();
            this.$xutils.showMsgBox('再议插入成功');
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }


  // end

  }
};
</script>
