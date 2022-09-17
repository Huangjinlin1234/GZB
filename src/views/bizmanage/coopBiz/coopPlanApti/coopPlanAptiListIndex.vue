<template>
  <d1-billlist ref="d1_BillList" :operate="operate" :serno="serno"></d1-billlist>
</template>
<script>
import d1Billlist from './coopPlanAptiList_d1_BillList.vue';
yufp.lookup.reg('STD_PARTNER_TYPE,STD_ZB_QUAL_LEVEL,STD_PARTNER_TYPE,STD_LICE_TYPE');
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
    // 合作方资质信息 列表
    afterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      this.reloadData();
    },
    validate () {
      const size = this.d1_BillList.getAllData().length;
      return size > 0;
    },
    add () {
      const _this = this;
      let jsoPar = {};
      // 弹出新窗口
      this.$xutils.clone(this.param, jsoPar);
      jsoPar.operate = 'add';
      this.$dialog.open(
        '资质信息',
        'bizmanage/coopBiz/coopPlanApti/coopPlanAptiAddIndex',
        1000,
        500,
        jsoPar,
        () => { _this.reloadData() }
      );
    },
    reloadData () {
      this.d1_BillList.queryDataByCondition({serno: this.param.serno});
    },
    update () {
      const _this = this;
      const param = this.d1_BillList.getSelectedRowData();
      if (!param) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      // 弹出新窗口
      param.operate = 'edit';
      this.$dialog.open(
        '资质信息',
        'bizmanage/coopBiz/coopPlanApti/coopPlanAptiAddIndex',
        1000,
        500,
        param,
        () => { _this.reloadData() }
      );
    },
    delete () {
      const _this = this;
      const param = _this.d1_BillList.getSelectedRowData();
      if (!param) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      // 调用后端服务删除操作,异步请求
      _this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          const pkId = param.pkId;
          _this.$xutils.request({
            url: _this.$backend.cmisBiz + '/api/coopplanaptiinfo/batchdelete/' + pkId,
            type: 'POST',
            async: true,
            success: (response, status, xhr) => {
              if (response.code == 0) {
                _this.$xutils.showMsgBox('提示', '删除成功', '300', '150', () => {
                  // 删除成功后刷新列表
                  _this.d1_BillList.queryDataByCondition();
                });
              }
            }
          });
        }
      });
    },
    view () {
      const param = this.d1_BillList.getSelectedRowData();
      if (!param) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      // 弹出新窗口
      param.operate = 'details';
      this.$dialog.open(
        '资质信息',
        'bizmanage/coopBiz/coopPlanApti/coopPlanAptiAddIndex',
        1000,
        500,
        param
      );
    }
  }
};
</script>
