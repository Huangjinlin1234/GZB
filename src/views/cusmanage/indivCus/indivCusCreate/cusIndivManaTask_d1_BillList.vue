<!--个人客户待处理-->
<template>
  <div>
    <yu-panel title="客户日常管理任务" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch" >
        <yu-xform-group :column="3">
          <yu-xform-item label="业务类型" ctype="select" data-code="STD_ZB_CUS_BIZ_TYPE" placeholder="业务类型" name="bizType" exclude-key="A01,A02,A03,A04,A05,A06,A07,A08,A09,A10,A11,A12,A13,C01,C02" :datacode-filter="datacodeFilterFn" ></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" ></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" ></yu-xform-item>
          <yu-xform-item label="任务状态" ctype="select" data-code="STD_TASK_STATUS" placeholder="任务状态" name="taskStatus" :datacode-filter="filterTaskStatus"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="approveStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number request-type="POST" condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="baseParams">
        <yu-xtable-column label="业务类型" prop="bizType" data-code="STD_ZB_CUS_BIZ_TYPE" ></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP" ></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" ></yu-xtable-column>
        <yu-xtable-column label="任务状态" prop="taskStatus" data-code="STD_TASK_STATUS" ></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" ></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" width="100px" ></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName" width="100px" ></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="操作" prop="operrate" width="100px">
          <template slot-scope="scope">
            <yu-button @click="handleClick(scope.row)" type="text" size="small">处理</yu-button>
            <yu-button @click="cancleClick(scope.row)" type="text" size="small">作废</yu-button>
          </template>
        </yu-xtable-column >
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CUS_BIZ_TYPE,STD_ZB_CERT_TYP,STD_TASK_STATUS,STD_ZB_APPR_STATUS');
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dicOptions: {},
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusmanatask/',
      baseParams: { },
      deleteUrl: this.$backend.cmisCus + '/api/cusmanatask/delete/'
    };
  },
  props: {
    activeIndex: String
  },
  created () {
    let data = this.$route.meta.params;
    if(JSON.stringify(data) !== '{}') {
      //从菜单栏进入该页面
      let inType = data.inType;
      this.baseParams = inType == 'CREATE' ? { condition: { taskStatus: '1', bizType: 'B01,B02', inputId: this.$xutils.getDefaultformulaData("$LoginLoginCode")} } : { condition: { taskStatus: '1', bizType: 'B09', inputId: this.$xutils.getDefaultformulaData("$LoginLoginCode")} };
    } else {
      //从工作台进入该页面
      if(this.activeIndex === 100) {
        this.baseParams = { condition: { taskStatus: '1', bizType: 'B01,B02', inputId: this.$xutils.getDefaultformulaData("$LoginLoginCode")} };
      } else if(this.activeIndex === 101) {
        this.baseParams = { condition: { taskStatus: '1', bizType: 'B03,B04,B05,B06,B07,B08', inputId: this.$xutils.getDefaultformulaData("$LoginLoginCode")} };
      } else if(this.activeIndex === 102) {
        this.baseParams = { condition: { taskStatus: '1', bizType: 'B09', inputId: this.$xutils.getDefaultformulaData("$LoginLoginCode")} };
      }
    }

  },
  methods: {
    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      let _this = this;
      let data = _this.$route.meta.params;
      if(JSON.stringify(data) !== '{}') {
        let inType = data.inType;
        if (inType == 'CREATE') {
          return opts.filter(function (op) {
            if (op.key === 'B01' || op.key === 'B02') {
              return true;
            }
            return false;
          });
        } else {
          return opts.filter(function (op) {
            if (op.key === 'B09') {
              return true;
            }
            return false;
          });
        }
      } else {
        if (this.activeIndex === 100) {
          return opts.filter(function (op) {
            if (op.key === 'B01' || op.key === 'B02') {
              return true;
            }
            return false;
          });
        } else {
          return opts.filter(function (op) {
            if (op.key === 'B09') {
              return true;
            }
            return false;
          });
        }
      }
    },

    // 字典项过滤
    filterTaskStatus: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '1' || op.key === '2' || op.key === '3') {
          return true;
        }
        return false;
      });
    },

    handleClick (row) {
      let _this = this;
      const bizType = row.bizType;
      let data = {};
      this.$utils.clone(row, data);
      data['op'] = 'EDIT';
      data['bizType'] = bizType;
      // 类型区分
      data['flag'] = 'edit';
      let name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
      let title = '';
      let key = '';
      // 个人正式客户创建 B01
      if (bizType == 'B01') {
        key = 'tempCusIndiv' + new Date().getTime();
        title = '个人正式客户';
        data.cusRankCls = '01';
        // 个人临时客户创建 B02
      } else if (bizType == 'B02') {
        key = 'tempCusIndivTemp' + new Date().getTime();
        title = '个人临时客户';
        data.cusRankCls = '02';
      } else if (bizType == 'B09') {
        key = 'tempCusIndivls' + new Date().getTime();
        title = '个人临时客户转正';
        data.cusRankCls = '01';
      }
      data.key = `/${name}/${key}`;
      _this.$refs.refForm.resetFields();
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key,
        // 页签名称
        title: title,
        // 传递的业务数据，可选配置
        data: data
      });
      var currentPath = _this.$route.path;
      setTimeout(function () {
        yufp.router.removeTab(currentPath);
      }, 100);
    },
    //作废
    cancleClick (row) {
      var _this = this;
      let data = row;
      if (data.approveStatus === '111') {
        _this.$message({
          message: '审批中的数据不允许修改',
          type: 'warning'
        });
        return;
      }
      data.taskStatus = '4'; // 4-作废
      _this.$xutils.request({
          type: 'POST',
          url: _this.$backend.cmisCus + '/api/cusmanatask/updateSelective',
          data: data,
          success: (response, status, xhr) => {
            var param = {
              bizId: data.serno
            };
            yufp.service.request({
              method: 'GET',
              url: backend.workflowService + '/api/core/deleteByBizId',
              data: param,
              callback: function (code, message, response) {
                if (response.code == 0) {
                  if (response.data != null) {
                    // 自动刷新列表数据
                    _this.$xutils.showMsgBox('提示', '作废成功', 500, 300, () => {
                      _this.$refs.refTable.remoteData();
                    });
                  }
                } else {
                  _this.$message({
                    duration: 4000,
                    message: '获取数据异常:' + response.message.substring(0, 100),
                    type: 'error'
                  });
                }
              }
            });
          },
          error: (result, b) => {
            _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          }
        });
    },
  }
};
</script>
