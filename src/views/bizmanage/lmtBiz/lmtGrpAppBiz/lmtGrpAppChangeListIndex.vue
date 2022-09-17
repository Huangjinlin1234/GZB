<template>
  <yu-tabs  type="card">
    <yu-tab-pane label="集团客户授信变更申请">
  <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="集团客户授信变更历史">
  <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './lmtGrpAppChangeList_d1_1_BillList.vue';
import d12Billlist from './lmtGrpAppChangeList_d1_2_BillList.vue';
var param = {};

export default {
  components: {d11Billlist, d12Billlist},
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
       * title 授变更信管理/集团客户授信/集团客户授信变更列表
       * author xiamc
       * date 2021-04-17
       * */
    AfterInit () {
      param = this.pageParams;
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_2_BillList = this.$refs.d1_2_BillList;
    },

    /**
       * 新增调用到集团客户授信增加界面,这里
       * 跳转到指定的新增下下一步界面
       */
    add () {
      this.$dialog.open(
        '增加',
        'bizmanage/lmtBiz/lmtGrpAppBiz/lmtGrpChgAddIndex',
        '500',
        '400',
        null,
        () => {
          this.d1_1_BillList.queryDataByCondition();
        }
      );
    },

    view () {
      const row = this.d1_1_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox('提示', '请选择一条记录！');
        return;
      }

      const params = {
        'serno': row.serno
      };

      // 将主页面的业务类型传给查看页面
      params['lmt_type'] = row.lmt_type;

      params['model_group_no'] = 'CMG000153';// 贷款台账模块
      params['op'] = 'VIEW';

      this.$dialog.open(
        '集团客户授信申报',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params
      );
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
            url: this.$backend.cmisBiz + '/api/lmtgrpapp/delete/' + jsoPar.pkId,

            success: (response, status, xhr) => {
              if (response.code == '0') {
                this.rtnData = response.data;
                this.$xutils.showMsgBox('提示', '删除成功', null, null, () => {
                  this.d1_1_BillList.queryDataByCondition();
                });
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

      params.d1_1_BillList = this.d1_1_BillList;

      // 弹出框调用
      this.$dialog.open(
        '',
        'bizmanage/lmtBiz/lmtGrpAppBiz/lmtGroupAppIndex',
        -1,
        -1,
        params,
        () => {
          param.d1_1_BillList.queryDataByCondition();
        },
        true,
        true
      );
    },

    /**
       * 查看历史界面，直接跳转到基本信息查看界面
       */
    viewHis () {
      // 1.获取选择数据
      const jsoPar = this.d1_2_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      // 2.跳转到指定模板组，这里可能需要判断
      const params = {
        'serno': jsoPar.serno
      };

      // 将主页面的业务类型传给查看页面
      params['lmt_type'] = jsoPar.lmt_type;

      params['model_group_no'] = 'CMG000153';// 贷款台账模块
      params['op'] = 'VIEW';

      this.$dialog.open(
        '查看历史界面',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params
      );
      // end
    },

    /**
       * 根据链接跳转到制定的对公界面
       */
    clickDataRowCusNo () {
      this.$xutils.showMsgBox('提示', '对公界面待开发');
    },

    /**
       * 根据链接跳转到制定的对公界面
       */
    clickDataRow () {
      this.$xutils.showMsgBox('提示', '对公界面待开发');
    }
  }
};
</script>
