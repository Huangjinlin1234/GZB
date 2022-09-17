<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusHandoverHome_d1_BillList.vue';
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
    this.afterInit();
  },
  methods: {
    // 初始化列表
    afterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    // 新增操作
    onInsert () {
      // 定义变量op 用于标识是新增还是修改，为新增时调用插入api
      const jsoPar = {
        'op': 'add'
      };
      this.$dialog.open(
        '客户移交新增',
        'cusmanage/cushandover/cusPubHandoverAppUpdateIndex',
        1300,
        700,
        jsoPar,
        () => {
          this.reloadData();
        },
        true,
        false
      );
    },
    reloadData () {
      const model = {oprType: '01'};
      const params = { condition: JSON.stringify(model) };
      this.d1_BillList.$refs.refTable.remoteData(params);
    },
    // 修改操作
    onUpdate () {
      // 获取选中一行记录数据
      const jsonData = this.d1_BillList.getSelectedRowData();
      if (jsonData == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      if (!(jsonData.approveStatus == '000' || jsonData.approveStatus == '991' || jsonData.approveStatus == '992')) {
        this.$xutils.showMsgBox('提示', '不为【待发起】、【打回】、【重办】状态，不允许修改；当前申请状态：' + jsonData.approveStatus);
        return;
      }
      // 添加参数op 当为update时，点击暂存调用更新操作
      jsonData['op'] = 'edit';
      this.$dialog.open(
        '客户移交修改',
        'cusmanage/cushandover/cusPubHandoverAppUpdateIndex',
        1300,
        700,
        jsonData,
        () => {
          this.reloadData();
        },
        true,
        false
      );
    },
    // 查看操作
    onFind () {
      // 获取查看记录
      const par = this.d1_BillList.getSelectedRowData();
      // 判断是否选中数据
      if (par == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      // 传输op 如果是查看，则打开页面隐藏相关按钮
      par['op'] = 'details';
      this.$dialog.open(
        '修改调查',
        'cusmanage/cushandover/cusPubHandoverAppUpdateIndex',
        1300,
        700,
        par,
        () => {
          this.reloadData();
        }
      );
    },
    // 删除操作
    onDelete () {
      const _this = this;
      _this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          // 获取删除记录
          const par = this.d1_BillList.getSelectedRowData();
          if (!(par.approveStatus == '000' || par.approveStatus == '991' || par.approveStatus == '992')) {
            this.$xutils.showMsgBox('提示', '不为【待发起】、【打回】、【重办】状态，不允许修改；当前申请状态：' + par.approveStatus);
            return;
          }
          this.$xutils.request({
            // 同步请求
            async: false,
            method: 'POST',
            url: this.$backend.cmisCus + '/api/cuspubhandoverapp/update',
            data: JSON.stringify({serno: par.serno, oprType: '02'}),
            success: (response, status, xhr) => {
              if (response.code == '0') {
                this.$xutils.showMsgBox('提示', '删除成功');
                // 明细列表页面根据关联流水号查询
                this.reloadData();
              } else {
                this.$xutils.showMsgBox('提示', '查询失败');
              }
            },
            error: (result, b) => {}
          }, this);
        }
      });
    }
  }
};
</script>
