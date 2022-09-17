
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="时效管理" :hideFilter="false" :collapseHide="false" style="margin-top:20px">
      <template>
        <div>
          <yu-button type="primary" :hidden="viewType == 'DETAIL'" @click="addFn" v-if="checkCtrl('add')">添加</yu-button>
          <yu-button type="primary" :hidden="viewType == 'DETAIL'" @click="doSave" v-if="checkCtrl('save')">保存</yu-button>
          <yu-button type="primary" :hidden="viewType == 'DETAIL'" @click="deleteFn" v-if="checkCtrl('delete')">删除</yu-button>
        </div>
      </template>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :pageable="false" requestType="POST" selection-type="radio" :base-params="baseParams">
        <yu-xtable-column align="center" ctype="input" label="时效规则编号" prop="ppiSerno" disabled></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="条目名称" prop="entryName" :disabled="viewType == 'DETAIL'" data-code="STD_ENTRY_NAME"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="input" label="时效值" prop="prescValue"  :disabled="viewType == 'DETAIL'"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="时效单位" prop="prescUnit" :disabled="viewType == 'DETAIL'" data-code="STD_PRESC_UNIT"></yu-xtable-column>
        <yu-xtable-column align="center" ctype="select" label="是否启动" prop="isBegin"  :disabled="viewType == 'DETAIL'" data-code="STD_ZB_YES_NO"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { dateFormat } from '@/utils';
yufp.lookup.reg('STD_ENTRY_NAME,STD_PRESC_UNIT,STD_ZB_YES_NO');
// 注册字典项

export default {
  data: function () {
    return {
      searchFormdata: {},
      baseParams: {},
      dataUrl: backend.cmisNpam + '/api/plapescinfo/selectByCondition',
      viewType: 'EDIT',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      baseTable: {}
    };
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      // 登记人
      userName: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      // 登记机构
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    })
  },
  mounted () {
  },

  methods: {
    /*
    添加
     */
    addFn () {
      this.$refs.refTable.clearValidateMessage();
      this.pushRefTableRow();
    },
    // 添加数据 添加一条空白数据
    pushRefTableRow: function () {
      let isRefTableValidateOk = false;
      this.$refs.refTable.validate(function (fields) {
        if (!fields) { // 如果校验通过, fields为null
          isRefTableValidateOk = true;
        }
      });
      if (isRefTableValidateOk) {
        let serno = this.$xutils.getUUID();
        let ppiSerno = this.$xutils.getUUID();
        let row = {serno: serno, ppiSerno: ppiSerno, bizLine: '', paramsCode: '', oprSymbol: '', paramValue: '', actPdoAmt: '', actPdoFinshDate: '', pdoActCaseMemo: ''};
        this.$refs.refTable.tabledata.push(row);
        // this.$refs.refTable.setCurrentRow(row);
      }
    },
    /*
    删除
     */
    deleteFn () {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      const ppiSerno = selections[0].ppiSerno;
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plapescinfo/deletePescInfo/' + ppiSerno,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message.success('删除成功！');
                  _this.$refs.refTable.remoteData();
                } else {
                  _this.$message.error(response.message);
                }
              }
            });
          }
        }
      });
    },

    /*
    保存
     */
    doSave () {
      var _this = this;
      var modal = {};
      yufp.clone(_this.baseTable, modal);
      var selections = _this.$refs.refTable.tabledata;
      var len = selections.length;
      var arr = [];
      for (var i = 0; i < len; i++) {
        let item = {};
        item.ppiSerno = selections[i].ppiSerno;
        item.entryName = selections[i].entryName;
        item.prescValue = selections[i].prescValue;
        item.prescUnit = selections[i].prescUnit;
        item.isBegin = selections[i].isBegin;
        arr.push(item);
      }
      // 校验都通过时，发送保存请求
      // 新增保存
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plapescinfo/insertReplyPescs',
        data: JSON.stringify(arr),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message.success('保存成功');
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message.error(response.message);
          }
        }
      });
    },

    /*
     返回上级页面
     */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    },
    /*
     格式化日期
     */
    formatTime () {
      var dt = new Date();
      return dateFormat(dt, '{y}-{m}-{d}');
    }
  }
};
</script>
