<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './iqpDiscAppPorderSubList_d1_BillList.vue';
// 贴现汇票明细
let selfPars = {};

export default {
  components: { d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null,
      selfPars: {}
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      var _this = this;
      this.d1_BillList = this.$refs.d1_BillList;
      var selfPars = {};
      var op = '';
      if (_this.getFactory().contextData.instanceInfo) {
        selfPars = _this.getFactory().contextData.instanceInfo;
        op = 'VIEW';
      } else if (_this.$route.meta.params) {
        selfPars = _this.$route.meta.params;
        op = selfPars.op;
      } else {
        selfPars = _this.getFactory().contextData;
        op = selfPars.op;
      }
      _this.selfPars = selfPars;
      if (op == 'VIEW') {
        this.d1_BillList.isHidden = false;
      }

      if (selfPars && selfPars.biz_serno) {
        this.d1_BillList.queryDataByCondition({ serno: selfPars.biz_serno || selfPars.bizId});
      }
    },

    // 点击新增，跳转新增的页面
    doAdd () {
      this.$dialog.open('贴现汇票-新增页面', 'bizmanage/iqpBiz/iqpDiscApp/iqpDiscAppPorderSub/iqpDiscAppPordSubAddIndex', -1, -1, this.selfPars, this.refresh);
    },

    // 逻辑删除
    doDel () {
      let rtnData = {};
      let rowData = this.d1_BillList.getSelectedRowData();

      if (rowData == null) {
        this.$xutils.showMsgBox('提示', '请先选择一条记录!');
        return;
      }

      // 进行逻辑删除
      this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          this.$xutils.request({
            // 同步请求
            async: false,

            url: this.$backend.cmisBiz + '/api/iqpdiscapppordersub/logicdelete',
            data: JSON.stringify(this.$xutils.toUpperCase(rowData, true)),

            success: (response, status, xhr) => {
              if (response.code == '0') {
                this.$xutils.showMsgBox('提示', '删除成功!', 350, 150, this.refresh);
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
    },

    // 修改
    doUpdate () {
      let rowData = this.d1_BillList.getSelectedRowData();

      if (rowData == null) {
        this.$xutils.showMsgBox('提示', '请先选择一条记录!');
        return;
      }
      this.$dialog.open('贴现汇票-修改页面', 'bizmanage/iqpBiz/iqpDiscApp/iqpDiscAppPorderSub/iqpDiscAppPordSubUpdIndex', -1, -1, rowData, this.refresh);
    },

    // 刷新页面
    refresh () {
      this.d1_BillList.queryDataByCondition({ serno: selfPars.biz_serno });
    },
    showAction () {
      this.d1_BillList.queryDataByCondition({ serno: selfPars.biz_serno });
    }
  }
};
</script>
