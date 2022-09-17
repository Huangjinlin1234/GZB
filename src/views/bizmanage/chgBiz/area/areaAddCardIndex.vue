<template>
  <d1-billcard ref="d1_BillCard" :addBtnShow="addShow" :updBtnShow="updShow"></d1-billcard>
</template>
<script>
import d1Billcard from './areaAddCard_d1_BillCard.vue';
/*
卡片
*/
let jsoPar = '';

let parm = '';
let buttons = '';

export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1Billcard: null,
      addShow: true,
      updShow: true
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      parm = this.pageParams;
      // 设置按钮
      if (parm.op == 'INSERT') {
        this.updShow = false;
      } else if (parm.op == 'UPDATE') {
        this.addShow = false;
      }
      jsoPar = this.$refs.d1_BillCard;
      this.d1_BillCard = this.$refs.d1_BillCard;// 创建卡片

      if (parm.op == 'INSERT') {
        // 加载默认值
        this.d1_BillCard.execBillCardDefaultValueFormula();
      } else if (parm.op == 'UPDATE') {
        // 初始化数据
        this.d1_BillCard.setBillCardValue(parm);
      }
    },

    doAdd () {
      const jsoPar = this.d1_BillCard.getBillCardValue();

      this.$xutils.request({
        // 同步请求
        async: false,

        // 新增
        url: this.$backend.cmisBiz + '/api/areamanager/insert',

        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

        success: (response, status, xhr) => {
          if (response.data) {
            this.$dialog.open(null, 'bizmanage/chgBiz/area/areaManaListIndex', -1, -1, null, null);
            this.$xutils.showMsgBox('提示', '添加成功');
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    doUpdate () {
      const jsoPar = this.d1_BillCard.getBillCardValue();

      this.$xutils.request({
        // 同步请求
        async: false,

        // 修改
        url: this.$backend.cmisBiz + '/api/areamanager/update',

        data: JSON.stringify(this.$xutils.toUpperCase(jsoPar, true)),

        success: (response, status, xhr) => {
          if (response.data) {
            this.$dialog.open(null, 'bizmanage/chgBiz/area/areaManaListIndex', -1, -1, null, null);
            this.$xutils.showMsgBox('提示', '修改成功');
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 取消
    onConfirm () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
