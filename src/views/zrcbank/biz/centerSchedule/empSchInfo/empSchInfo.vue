
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——表单+列表
  -->
  <div>
    <yu-panel title="排班表" :hideFilter="false" :collapseHide="false">
      <template slot="right">
        <yu-button-drop>
          <yu-button type="primary" @click="doDelete" :hidden="showSaveBtn">删除</yu-button>
          <yu-button type="primary" @click="doAllDelete" :hidden="showSaveBtn">全部删除</yu-button>
          <yufp-excel-import type="primary" :import-url="excelImportUrl" :hidden="showSaveBtn" title="导入" max-file-size="200" :async="false" :biz-data-params="bizDataParams" @import-success="doAutoQuery"></yufp-excel-import>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" selection-type="radio"  row-number :data="repData">
        <yu-xtable-column label="员工号" prop="userCode" width=""></yu-xtable-column>
        <yu-xtable-column label="员工姓名" prop="userName" width=""></yu-xtable-column>
        <yu-xtable-column label="值班日期" prop="dutyDate" width=""></yu-xtable-column>
        <yu-xtable-column label="时间段1" prop="scheduleTimeA" width=""></yu-xtable-column>
        <yu-xtable-column label="时间段2" prop="scheduleTimeB" width=""></yu-xtable-column>
        <yu-xtable-column label="时间段3" prop="scheduleTimeC" width=""></yu-xtable-column>
        <yu-xtable-column label="时间段4" prop="scheduleTimeD" width=""></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel is-collapse>
      <yu-xform ref="refForm" label-width="100px" v-model="formdata">
        <yu-xform-group>
          <yu-xform-item label="登记人" name="inputId" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrId" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>

    <yu-form-buttons align="center">
      <yu-button type="primary" @click="doSave" :disabled="showSaveBtn">保存</yu-button>
      <yu-button type="primary" @click="doCancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>

import { mapState } from 'vuex';
import { dateFormat, genUUID } from '@/utils';
import { getToken } from '@/utils/oauth';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
yufp.lookup.reg('STD_OPR_TYPE');
export default {
  components: { YufpExcelImport },
  data: function () {
    return {
      expandCollapseName: ['base'],
      showSaveBtn: true,
      baseFormRules: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      formdata: {},
      repData: [],
      sernoData: '',
      uploadHeader: {
        Authorization: 'Bearer ' + getToken().access_token
      },
      url: `${backend.appOcaService}/api/empscheduleinfo/asyncimport/batch`,
      excelImportUrl: `${backend.appOcaService}/api/empscheduleinfo/importEmpScheduleInfoTemplate`,
      total: '',
      bizDataParams: {
      }
    };
  },

  // vuex中存储数据获取：
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      org: state => state.oauth.org
    })
  },
  mounted () {
    var _this = this;
    if (this.$route.meta.params.op == 'add') {
      // 启用按钮
      _this.showSaveBtn = false;
    } else {
      // op = 'view'  禁用按钮 初始化数据
      _this.sernoData = this.$route.meta.params.serno;
      _this.initialization();
    }

    // 默认值
    let parmas = {
      inputId: this.userInfo,
      inputBrId: this.org.name,
      inputDate: this.formatTime(),
      year: new Date().getFullYear(),
      oprType: '01',
      month: this.$route.meta.params.month
    };
    _this.bizDataParams.month = this.$route.meta.params.month;
    yufp.clone(parmas, this.formdata);
  },

  methods: {
    // 页面初始化方法
    initialization () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: `${backend.appOcaService}/api/empscheduleinfo/queryBySerno/` + _this.sernoData,
        callback: function (code, message, response) {
          _this.repData = response.data || [];
        }
      });
    },

    // 日期格式化
    formatTime () {
      var timeDt = new Date();
      var dt = dateFormat(timeDt, '{y}-{m}-{d}');
      return dt;
    },
    // 保存
    doSave: function () {
      var _this = this;
      // 保存数据时需用到
      let num = _this.$refs.refTable.total;
      if (num == 0) {
        _this.$message({
          message: '请先导入排班数据！',
          type: 'warning'
        });
        return;
      }
      let serno = genUUID(16, 16) + Date.parse(new Date());
      _this.formdata.serno = serno;

      yufp.service.request({
        method: 'POST',
        url: `${backend.appOcaService}/api/empscheduleinfo/updatetoserno/` + serno,
        callback: function (code, message, response) {
        }
      });

      yufp.service.request({
        method: 'POST',
        url: `${backend.appOcaService}/api/empscheduleinfomtable/`,
        data: _this.formdata,
        callback: function (code, message, response) {
          _this.$message('操作成功');
          yufp.router.removeTab(_this.$route.path);
        }
      });
    },
    // 取消
    doCancel: function () {
      var serno = '1';
      yufp.service.request({
        method: 'POST',
        url: `${backend.appOcaService}/api/empscheduleinfo/deleteOnLogic/` + serno,
        callback: function (code, message, response) {
        }
      });
      // 已导入数据 全部删除
      yufp.router.removeTab(this.$route.path);
    },
    /**
     * 删除
     */
    doDelete: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length != 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var pkId = selections[0].pkId;
      _this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: `${backend.appOcaService}/api/empscheduleinfo/deleteOnLogicByPk/` + pkId,
              callback: function (code, message, response) {
                _this.doAutoQuery();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },
    /**
     * 根据批次号全部删除
     */
    doAllDelete: function () {
      var _this = this;
      var serno = '1';
      if (serno != null) {
        _this.$confirm('是否全部删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: function (action) {
            if (action === 'confirm') {
              yufp.service.request({
                method: 'POST',
                url: `${backend.appOcaService}/api/empscheduleinfo/deleteOnLogic/` + serno,
                callback: function (code, message, response) {
                  _this.doAutoQuery();
                  _this.$message('操作成功');
                }
              });
            }
          }
        });
      }
    },
    doAutoQuery: function () {
      var _this = this;
      let model = {};
      model.default = '1';
      model.oprType = '01';
      yufp.service.request({
        method: 'POST',
        url: `${backend.appOcaService}/api/empscheduleinfo/`,
        data: JSON.stringify({ condition: JSON.stringify(model) }),
        callback: function (code, message, response) {
          _this.repData = response.data || [];
        }
      });
    }
  }
};
</script>
<style>
.upload {display: inline-block;}
</style>
