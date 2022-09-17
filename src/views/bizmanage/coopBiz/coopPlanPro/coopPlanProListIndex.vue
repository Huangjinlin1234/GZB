<template>
  <d1-billlist ref="d1_BillList" :operate="operate" :serno="serno"></d1-billlist>
</template>
<script>
import d1Billlist from './coopPlanProList_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String,
    pageData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      d1_BillList: null,
      param: {},
      operate: '',
      serno: ''
    };
  },
  created () {
    if (this.pageData) {
      this.param = this.pageData;
      this.serno = this.param.serno;
      this.operate = 'details';
    } else {
      this.param = this.$route.meta.params;
      this.serno = this.param.serno;
      this.operate = this.param.op;
    }
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    // 项目信息 列表
    afterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      this.reloadData();
    },
    validate () {
      const size = this.d1_BillList.getAllData().length;
      return size > 0;
    },
    reloadData () {
      this.d1_BillList.queryDataByCondition({serno: this.param.serno});
    },
    // 新增
    Add () {
      const _this = this;
      // 弹出新窗口
      const jsoPar = {
        'operate': 'add',
        'serno': _this.param.serno,
        'coopPlanNo':_this.param.coopPlanNo
      };
      _this.$dialog.open(
        '楼盘项目信息',
        'bizmanage/coopBiz/coopPlanPro/coopPlanProAddIndex',
        1000,
        500,
        jsoPar,
        () => {
          _this.reloadData();
          //TODO 刷新影像信息tab页
        }
      );
    },
    // 更新
    Update () {
      const _this = this;
      const jsoPar = _this.d1_BillList.getSelectedRowData();
      if (jsoPar == null || jsoPar == '') {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      jsoPar.operate = 'edit';
      _this.$dialog.open(
        '楼盘项目信息',
        'bizmanage/coopBiz/coopPlanPro/coopPlanProAddIndex',
        1000,
        500,
        jsoPar,
        () => {
          _this.reloadData();
        }
      );
    },
    // 删除
    Delete () {
      let jsoPar = this.$refs.d1_BillList.$refs.refTable.selections;
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      jsoPar = jsoPar[0];
      this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          this.$xutils.request({
            // 异步请求
            async: true,
            type: 'post',
            url: this.$refs.d1_BillList.deleteUrl + jsoPar.pkId,
            data: {pkId: jsoPar.pkId},
            success: (response, status, xhr) => {
              if (response.code == '0') {                
                let totlCoopLmtAmt = response.data;
                this.$route.params.totlCoopLmtAmt = totlCoopLmtAmt;
                this.$route.params.totlCoopLmtAmtUsed = totlCoopLmtAmt - this.$route.params.totlCoopLmtAmtUsable;
                this.$xutils.showMsgBox('提示', '删除成功', 500, 300, () => {
                  this.$refs.d1_BillList.$refs.refTable.remoteData();
                  //TODO 刷新影像信息tab页
                });
              } else {
                this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
              }
            },
            error: (result, b) => {
              this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
              // bol = false;
            }
          });
        }
      });
    },
    // 查看
    doView () {
      const _this = this;
      const jsoPar = _this.d1_BillList.getSelectedRowData();
      if (jsoPar == null || jsoPar == '') {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      jsoPar.operate = 'details';
      _this.$dialog.open(
        '楼盘项目信息',
        'bizmanage/coopBiz/coopPlanPro/coopPlanProAddIndex',
        1000,
        500,
        jsoPar
      );
    },
    uploadImage () {
      this.$xutils.showMsgBox('提示', '待开发');
    },
    selectImage () {
      this.$xutils.showMsgBox('提示', '待开发');
    },
    getTableData(){
      return this.d1_BillList.getAllData();
    }
  }
};
</script>
