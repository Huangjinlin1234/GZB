<template>
  <div>
    <div style="height:30%">
      <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div style="height:calc(100% - 30%)">
      <d1-b_billlist ref="d1_B_BillList"></d1-b_billlist>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './lmtAppSubInfo_d1_A_BillCard.vue';
import d1A11Billcard from './lmtAppSubInfo_d1_A_11_BillCard.vue';
import d1A15Billcard from './lmtAppSubInfo_d1_A_15_BillCard.vue';
import d1BBilllist from './lmtAppSubInfo_d1_B_BillList.vue';
import d1B18Billlist from './lmtAppSubInfo_d1_B_18_BillList.vue';
import d1B12Billlist from './lmtAppSubInfo_d1_B_12_BillList.vue';
export default {
  components: {d1ABillcard, d1A11Billcard, d1A15Billcard, d1BBilllist, d1B18Billlist, d1B12Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_A_BillCard: null,
      d1_A_11_BillCard: null,
      d1_A_15_BillCard: null,
      d1_B_BillList: null,
      d1_B_18_BillList: null,
      d1_B_12_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      if (this.getFactory().contextData.op == 'ADD') {
        this.d1_A_BillCard = this.$refs.d1_A_BillCard;
        this.d1_B_BillList = this.$refs.d1_B_BillList;
      } else if (this.getFactory().contextData.op == 'EDIT') {
        this.d1_A_BillCard = this.$refs.d1_A_BillCard;
        this.d1_B_BillList = this.$refs.d1_B_BillList;
      } else if (this.getFactory().contextData.op == 'VIEW') {
        this.d1_A_BillCard = this.$refs.d1_A_BillCard;
        this.d1_B_BillList = this.$refs.d1_B_BillList;
        this.d1_A_BillCard.setBillCardItemRequired('*', false);
        this.d1_A_BillCard.setBillCardItemEditable('*', false);
      }

      this.d1_A_BillCard.setBillCardValue(this.getFactory().contextData);
      this.d1_B_BillList.queryDataByCondition({'subSerno': this.getFactory().contextData.sub_serno});
    },

    showAction () {},

    // 点击“新增”按钮进入授信分项新增页面
    add () {
      this.getFactory().contextData['op'] = 'add';

      this.$dialog.open(
        '适应授信品种',
        'bizmanage/lmtBiz/lmtAppSubPrdBiz/lmtAppSubPrdIndex',
        -1,
        -1,
        this.getFactory().contextData,
        () => {
          this.d1_B_BillList.queryDataByCondition({'subSerno': this.getFactory().contextData.sub_serno});
        }
      );
    },

    // 保存授信分项修改信息
    onSave () {
      let rtnData = {};
      const jsoPar = this.d1_A_BillCard.getBillCardValue();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      // showHtmlConfirmBox('提示', '是否确认删除', 150, 100, _callback)
      // 待开发
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtappsub/updatelmtappsub',
        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '修改成功!', 350, 150, this.getRefreshList);
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

    // 进入适用授信产品修改页面
    update () {
      const jsoPar = this.d1_B_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      this.getFactory().contextData['op'] = 'edit';
      this.getFactory().contextData['value'] = jsoPar;

      this.$dialog.open(
        '适应授信品种',
        'bizmanage/lmtBiz/lmtAppSubPrdBiz/lmtAppSubPrdIndex',
        -1,
        -1,
        this.getFactory().contextData,
        () => {
          this.d1_B_BillList.queryDataByCondition({'subSerno': this.getFactory().contextData.sub_serno});
        }
      );
    },

    // 点击进入适用授信产品详情查看页面
    view () {
      const jsoPar = this.d1_B_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      this.getFactory().contextData['op'] = 'view';
      this.getFactory().contextData['value'] = jsoPar;

      this.$dialog.open(
        '适应授信品种',
        'bizmanage/lmtBiz/lmtAppSubPrdBiz/lmtAppSubPrdIndex',
        -1,
        -1,
        this.getFactory().contextData,
        () => {
          this.d1_B_BillList.queryDataByCondition({'subSerno': this.getFactory().contextData.sub_serno});
        }
      );
    },

    // 逻辑删除授信适用产品记录
    deleteLmtAppSubPrd () {
      let rtnData = {};
      const jsoPar = this.d1_B_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      // showHtmlConfirmBox('提示', '是否确认删除', 150, 100, _callback)
      this.$xutils.request({
        // 同步请求
        async: false,

        url: this.$backend.cmisBiz + '/api/lmtappsubprd/deletelmtappsubprd',
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
      this.d1_B_BillList.queryDataByCondition({'subSerno': this.getFactory().contextData.sub_serno});
    },

    onBack () {
      // 返回操作
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
