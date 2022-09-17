<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cfgFlexQryListPop_d1_BillList.vue'
// 初始加载
// 根据角色查询权限下数据
// 获取当前登录用户角色
const userInfo = this.$xutils.getLoginUserInfo();

const rolesList = userInfo.roles;
const role = [];
let condition = '';

// 灵活查询详情界面
const indexPage = '/yuxp/product/pages/cfgmanage/productconfig/cfgFlexQry/cfgFlexQryDetail.js';

export default {
  components:{d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillList: null,
    }
  },
  mounted() {
    this.$lookup.reg("STD_ZB_OPR_TYPE")
    this.AfterInit()
  },
  methods:{
    /**
       * 灵活查询
       */
    AfterInit() {
      // YuXP.createBillList('yuxpservice', 'd1', 'cfg_flex_qry_List', '确定/onConfirm/check;取消/onCancel/el-icon-yx-undo2');
      this.d1_BillList = this.$refs.d1_BillList;
  
      for (let i = 0; i < rolesList.length; i++) {
        role.push('\'' + rolesList[i].code + '\'');
      }
  
      // 数据授权过滤
      condition = ' QRY_CODE in (SELECT DISTINCT QRY_CODE from cfg_qry_report_auth where ROLE_CODE in(' + role.toString() + '))';
  
      this.d1_BillList.queryDataByCondition(condition);
  
      // 点击查询框加载
      // this.d1_BillList.addCustQueryAction(custQueryAction);
  
      // this.d1_BillList.addRowDBClickAction(onRowDBClickAction);
    },
  
    // 点击查询框加载数据
    custQueryAction() {
      this.d1_BillList.queryDataByCondition(condition);
    },
  
    // 新增
    addFn() {
      /* var params = {
            opType: 'add'
          };
          YuXP.openDialog('灵活查询参数配置新增(配置的查询条件、显示列、分组汇总等参数字段所在表需属于同一对象指标)', indexPage, -1, -1, params, function () {
            d1_BillList.queryDataByCondition(condition);
          });*/
  
      const addPage = '/yuxp/product/pages/cfgmanage/productconfig/cfgFlexQry/cfgFlexQryAdd.js';
  
      this.$dialog.open('灵活查询参数配置引导', 'undefined', 950, 650, null, () => {
        this.d1_BillList.queryDataByCondition(condition);
      });
    },
  
    // 修改
    updateFn() {
      const row = this.d1_BillList.getSelectedRowData();
  
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
  
      row.opType = 'edit';
      row.parentId = row.index_code;
  
      this.$dialog.open(
        '灵活查询参数配置修改(配置的查询条件、显示列、分组汇总等参数字段所在表需属于同一对象分组)',
        'undefined',
        -1,
        -1,
        row,
        () => {
          this.d1_BillList.queryDataByCondition(condition);
        }
      );
    },
  
    // 查看
    viewFn() {
      const row = this.d1_BillList.getSelectedRowData();
  
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
  
      row.opType = 'view';
      row.parentId = row.index_code;
  
      this.$dialog.open('查看', 'undefined', -1, -1, row, () => {
        this.d1_BillList.queryDataByCondition(condition);
      });
    },
  
    // 逻辑删除
    deleteFn() {
      const row = this.d1_BillList.getSelectedRowData();
  
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
  
      // 如果删除对象指标，联动删除下级分组指标及分组指标明细数据
      this.$xutils.showMsgBox('提示', '将联动删除该查询报表下的配置的报表参数明细数据，确认删除？', 350, 150, _rt => {
        // 调用后台进行逻辑删除
        this.logicDeleteQryCode(row);
      });
    },
  
    // 调用后台进行逻辑删除，联动删除参数明细数据、报表权限
    logicDeleteQryCode(row) {
      this.$xutils.request({
        // 同步请求
        async: false,
  
        url: this.$backend.cmisCfg + '/api/cfgflexqry/logicDelete/' + row.qry_code,
        type: 'POST',
  
        success: (response, status, xhr) => {
          if (response.code != '0') {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          } else {
            this.d1_BillList.queryDataByCondition();
            this.$xutils.showMsgBox('提示', '删除成功！');
          }
        },
  
        error: (result, b) => {
          // YuXP.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          const responseJSON = result.responseJSON;
  
          this.$xutils.showMsgBox('提示', b + '；错误信息：' + responseJSON.message); // 弹出提示
        }
      });
    },
  
    onRowDBClickAction() {
      const selectDate = this.d1_BillList.getSelectedRowData();
  
      if (selectDate == null) {
        this.$xutils.showMsgBox('提示', '请选择一条记录！');
        return;
      }
  
      this.$dialog.close(this.dialogId, selectDate);
    },
  
    onConfirm() {
      const selectDate = this.d1_BillList.getSelectedRowData();
  
      if (selectDate == null) {
        this.$xutils.showMsgBox('提示', '请选择一条记录！');
        return;
      }
  
      this.$dialog.close(this.dialogId, selectDate);
    },
  
    onCancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
