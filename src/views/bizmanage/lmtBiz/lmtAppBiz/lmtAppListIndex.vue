<template>
  <yu-tabs type="card">
    <yu-tab-pane label="单一客户授信申报">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="单一客户授信历史">
      <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './lmtAppList_d1_1_BillList.vue';
import d12Billlist from './lmtAppList_d1_2_BillList.vue';
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
       * title 单一客户授信申请/历史列表
       * author 朱滋润
       * date 2021-04-01
       * */

    // 授信管理/单一客户授信/单一客户授信申报
    AfterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_2_BillList = this.$refs.d1_2_BillList;
    },

    // 单一客户授信申报新增
    add () {
      this.$dialog.open(
        '单一客户授信申报',
        'bizmanage/lmtBiz/lmtAppBiz/lmtAppAddIndex',
        500,
        400,
        null,
        () => {
          this.getRefreshList();
        }
      );
    },

    // //单一客户授信申报逻辑删除
    deleteLmtApp () {
      let rtnData = {};
      const jsoPar = this.d1_1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      if (jsoPar.appr_status == '111') {
        this.$xutils.showMsgBox('提示', '该笔记录正在审批中!\r\n无法删除!', 350, 150);
        return;
      }

      // showHtmlConfirmBox('提示', '是否确认删除', 150, 100, _callback)
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtapp/deletelmtapp',
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
    },

    // 刷新列表
    getRefreshList () {
      this.d1_1_BillList.queryDataByCondition();
    },

    // 单一客户授信申报信息查看
    view () {
      const jsoPar = this.d1_1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      jsoPar['model_group_no'] = 'CMG000305';
      // jsoPar['pk_id'] = jsoPar.pk_id;
      // jsoPar['serno'] = jsoPar.serno;
      jsoPar['op'] = 'VIEW';
      jsoPar['scene'] = '01';// 授信场景

      this.$dialog.open(
        '单一客户授信申报',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1400,
        600,
        jsoPar,
        true,
        true
      );
    },

    // 单一客户授信申报信息修改
    update () {
      const jsoPar = this.d1_1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      if (jsoPar.apprStatus == '111') {
        this.$xutils.showMsgBox('提示', '该笔记录正在审批中!\r\n无法删除!', 350, 150);
        return;
      }

      jsoPar['model_group_no'] = 'CMG000305';
      // jsoPar['pk_id'] = jsoPar.pkId;
      // jsoPar['serno'] = jsoPar.serno;
      jsoPar['scene'] = '01';// 授信场景
      jsoPar['op'] = 'EDIT';
      this.$dialog.open(
        '单一客户授信申报',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1400,
        600,
        jsoPar,
        () => {
          this.d1_BillList.queryDataByCondition();
        },
        true,
        true
      );
    },

    // 发起复议，进入复议申请基本信息页面
    reconside () {
      const jsoPar = this.d1_2_BillList.getSelectedRowData();
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      let apprStatus = jsoPar.apprStatus;
      if (apprStatus != '997' && apprStatus != '998') {
        this.$xutils.showMsgBox('提示', '当前记录不允许发起复议!\r\n请重新操作!', 350, 150);
        return;
      }

      jsoPar['model_group_no'] = 'CMG000305';
      jsoPar['op'] = 'EDIT';
      jsoPar['flag'] = 'reconside';
      jsoPar['lmt_type'] = '05';
      jsoPar['scene'] = '01';// 授信场景

      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1400,
        600,
        jsoPar,
        true,
        true
      );
    },

    // 发起再议，进入再议申请基本信息页面
    redicuss () {
      const jsoPar = this.d1_2_BillList.getSelectedRowData();
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      const apprStatus = jsoPar.apprStatus;
      if (apprStatus != '993') {
        this.$xutils.showMsgBox('提示', '当前记录不允许发起再议!\r\n请重新操作!', 350, 150);
        return;
      }

      jsoPar['model_group_no'] = 'CMG000305';
      jsoPar['op'] = 'EDIT';
      jsoPar['flag'] = 'redicuss';
      jsoPar['lmt_type'] = '06';

      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1400,
        600,
        jsoPar,
        true,
        true
      );
    },

    // 单一客户授信申报历史信息查看
    viewHis () {
      const jsoPar = this.d1_2_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      jsoPar['model_group_no'] = 'CMG000305';
      jsoPar['op'] = 'VIEW';
      jsoPar['flag'] = 'view';

      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1400,
        600,
        jsoPar,
        true,
        true
      );
    },

    // 判断当前记录是否为授信复议
    judgeReview (json) {
      const lmtType = json.lmt_type;

      if (lmtType == '04') {
        return false;
      }

      return true;
    }
  }
};
</script>
