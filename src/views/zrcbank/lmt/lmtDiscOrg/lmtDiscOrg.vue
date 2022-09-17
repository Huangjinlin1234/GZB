<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-tabs type="card">
      <yu-tab-pane label="未生效">
        <yu-panel title="查询条件" panel-type="simple">
          <yu-xform related-table-name="refTable" ref="searchForm" v-model="searchInfoFormdata" label-width="120px">
            <yu-xform-group :column="3">
              <yu-xform-item label="机构号" name="organno" ctype="input" disabled></yu-xform-item>
              <yu-xform-item name="organname" ctype="YuXorg" @select-fn="commonSelectFn" :mapping="{'orgId':'organno','orgIdName':'organname'}" label="机构名称" ></yu-xform-item>
              <yu-xform-item label="申请状态" ctype="select" placeholder="申请状态" name="status" data-code="STD_LMT_DISC_ORG_STATUS"></yu-xform-item>
              <yu-xform-item label="生效日期" ctype="datepicker" value-format="yyyy-MM-dd" placeholder="生效日期" name="appYm"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <div class="button-group" align="center">
            <yu-button type="primary" @click="searchFn()">查询</yu-button>
            <yu-button type="primary" @click="resetFn()">重置</yu-button>
          </div>
        </yu-panel>
        <yu-panel title="贴现限额管控列表" panel-type="simple">
          <yu-button-drop :show-length="8">
            <yu-button ref="btn_doAdd" v-if="checkCtrl('add')" type="primary" @click="doAdd">新增</yu-button>
            <yu-button ref="btn_doUpdae" v-if="checkCtrl('edit')" type="primary" @click="doUpdate">修改</yu-button>
            <yu-button ref="btn_doDelete" v-if="checkCtrl('delete')" type="primary" @click="doDelete">删除</yu-button>
            <yu-button ref="btn_doView" v-if="checkCtrl('view')" type="primary" @click="doView">查看</yu-button>
            <yu-button ref="btn_doCheck" v-if="checkCtrl('check')" type="primary" @click="doCheck">审核</yu-button>
            <yufp-excel-export v-if="checkCtrl('download')" :export-url="exportTemplateUrl" title="模板下载"  type="primary"></yufp-excel-export>
            <yufp-excel-import v-if="checkCtrl('import')" :import-url="excelImportUrl" title="批量导入" max-file-size="200" :async="false" @import-success="doAutoQuery"  type="primary"></yufp-excel-import>
          </yu-button-drop>
          <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataInfoUrl"
            :base-params="infoParam" request-type="POST" :default-load="true">
            <yu-xtable-column label="机构号" prop="organno"></yu-xtable-column>
            <yu-xtable-column label="机构名称" prop="organname"></yu-xtable-column>
            <yu-xtable-column label="申请额度" prop="applyAmount"></yu-xtable-column>
            <yu-xtable-column label="核准额度" prop="approveAmount"></yu-xtable-column>
            <yu-xtable-column label="已使用额度" prop="useAmt"></yu-xtable-column>
            <yu-xtable-column label="可用额度" prop="">
              <template slot-scope="scope">
                <span>{{ parseFloat(scope.row.approveAmount - scope.row.useAmt).toFixed(2) }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="状态" prop="status" data-code="STD_LMT_DISC_ORG_STATUS"></yu-xtable-column>
            <yu-xtable-column label="生效日期" prop="appYm"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="已生效">
        <yu-panel title="查询条件" panel-type="simple">
          <yu-xform related-table-name="refBackTable" ref="searchFormHis" v-model="searchBackFormdata" label-width="120px">
            <yu-xform-group :column="3">
              <yu-xform-item label="机构号" name="organno" ctype="input" disabled></yu-xform-item>
              <yu-xform-item name="organname" ctype="YuXorg" @select-fn="commonSelectFnHis" :mapping="{'orgId':'organno','orgIdName':'organname'}" label="机构名称" ></yu-xform-item>
              <yu-xform-item label="更新日期" ctype="datepicker" value-format="yyyy-MM-dd" placeholder="更新日期" name="updDate"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <div class="button-group" align="center">
            <yu-button type="primary" @click="searchFn('his')">查询</yu-button>
            <yu-button type="primary" @click="resetFn('his')">重置</yu-button>
          </div>
        </yu-panel>
        <yu-panel title="贴现限额管控列表" panel-type="simple">
          <yu-button-drop>
            <yu-button ref="btn_doUpdae" v-if="checkCtrl('edit')" type="primary" @click="doBackUpdate">修改</yu-button>
            <yu-button ref="btn_doView" v-if="checkCtrl('view')" type="primary" @click="doBackView">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refBackTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataBackUrl"
            :base-params="backParam" request-type="POST" :default-load="true">
            <yu-xtable-column label="机构号" prop="organno"></yu-xtable-column>
            <yu-xtable-column label="机构名称" prop="organname"></yu-xtable-column>
            <yu-xtable-column label="申请额度" prop="applyAmount"></yu-xtable-column>
            <yu-xtable-column label="核准额度" prop="approveAmount"></yu-xtable-column>
            <yu-xtable-column label="已使用额度" prop="useAmt"></yu-xtable-column>
            <yu-xtable-column label="可用额度" prop="">
              <template slot-scope="scope">
                <span>{{ parseFloat(scope.row.approveAmount - scope.row.useAmt).toFixed(2) }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="状态" prop="status" data-code="STD_LMT_DISC_ORG_STATUS"></yu-xtable-column>
            <yu-xtable-column label="生效日期" prop="appYm"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import mixinForm from '@/utils/mixins/mixin-form';

yufp.lookup.reg('STD_LMT_DISC_ORG_STATUS');
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';

export default {
  components: { YufpDemoSelector, YufpExcelExport, YufpExcelImport },
  mixins: [mixinForm],
  data: function () {
    return {
      searchInfoFormdata: {},
      searchBackFormdata: {},
      dataInfoUrl: this.$backend.cmisLmt + '/api/lmtdiscorg/selectbymodel',
      infoParam: {condition: { oprType: '01', statusList: '01,02,04' }},
      dataBackUrl: this.$backend.cmisLmt + '/api/lmtdiscorg/selectbymodel',
      backParam: {condition: { oprType: '01', statusList: '03' }},
      exportTemplateUrl: backend.cmisLmt + '/api/lmtdiscorg/exportlmtdiscorgtemp',
      excelImportUrl: backend.cmisLmt + '/api/lmtdiscorg/importlmtdiscorg',
      formdata: {},
      rule: [
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
      dialogVisible: false,
      formDisabled: false,
      addFlag: false,
      checkFlag: false,
      excelImportFlag: false,
      dutysArrys: [],
      viewType: 'DETAIL',
      DZDataObject: {},
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },
  created () {
    const loginUser = this.$xutils.getLoginUserInfo();
    let rolesArry = []; //  loginUser.dutys

    for (let i = 0; i < loginUser.roles.length; i++) {
      rolesArry.push(loginUser.roles[i].code);
      // TODO
      if (loginUser.roles[i].code == 'R1048') { // 分支行贴现限额维护员
        this.addFlag = true;
      }
      if (loginUser.roles[i].code == 'R1049') { // 金融市场部贴现限额管理员
        this.addFlag = true;
        this.excelImportFlag = true;
        this.checkFlag = true;
      }
    }
    this.rolesArry = rolesArry;
    console.log('<<<<<<<<rolesArry' + rolesArry);
  },
  mounted () {
  },
  methods: {

    /**
     * 新增
     */
    doAdd: function () {
      var _this = this;
      var model = {};
      let name = 'zrcbank/lmt/lmtDiscOrg/lmtDiscOrgManagerDetail';
      model.status = '01';
      if (_this.rolesArry.indexOf('R1049') != -1) {
        name = 'zrcbank/lmt/lmtDiscOrg/lmtDiscOrgMarketDetail';
        model.status = '02';
      }
      model.serno = this.$xutils.getSEQWithParamFromServer('LMT_SERNO');
      model.applyAmount = 0;
      model.approveAmount = 0;
      model.useAmt = 0;
      var routeKey = 'lmtDiscOrg' + model.serno + 'ADD';
      model.viewType = 'ADD';
      model.routeKey = routeKey;

      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: routeKey,
          // 页签名称
          title: '新增贴现限额',
          // 传递的业务数据，可选配置
          data: model
        });
      });
    },

    /**
     * 修改
     */
    doUpdate: function () {
      var _this = this;
      var model = {};
      let name = 'zrcbank/lmt/lmtDiscOrg/lmtDiscOrgManagerDetail';
      var selectionsAry = _this.$refs.refTable.selections;

      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (_this.rolesArry.indexOf('R1048') != -1) {
        if (selectionsAry[0].status !== '01') {
          _this.$message({
            message: '分支行贴现限额维护员角色，仅可以选中待提交的数据进行修改',
            type: 'warning'
          });
          return;
        }
      }

      if (_this.rolesArry.indexOf('R1049') != -1) {
        name = 'zrcbank/lmt/lmtDiscOrg/lmtDiscOrgMarketDetail';
        if (selectionsAry[0].status !== '02') {
          _this.$message({
            message: '金融市场部贴现限额管理员角色，仅可以选中状态为待审核的数据进行修改',
            type: 'warning'
          });
          return;
        }
      }
      var routeKey = 'manaOrgLmt' + selectionsAry[0].serno + 'EDIT';
      model = selectionsAry[0];
      model.viewType = 'EDIT';
      model.routeKey = routeKey;

      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: routeKey,
          // 页签名称
          title: '修改贴现限额',
          // 传递的业务数据，可选配置
          data: model
        });
      });
    },

    /**
     * 审核
     */
    doCheck: function () {
      var _this = this;
      var model = {};
      var selectionsAry = _this.$refs.refTable.selections;

      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }
      if (selectionsAry[0].status !== '02') {
        _this.$message({
          message: '仅【待审核】状态的数据可以审核',
          type: 'warning'
        });
        return;
      }
      var routeKey = 'manaOrgLmt' + selectionsAry[0].serno + 'EDIT';
      model = selectionsAry[0];
      model.viewType = 'EDIT';
      model.routeKey = routeKey;

      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: 'zrcbank/lmt/lmtDiscOrg/lmtDiscOrgCheckDetail',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: routeKey,
          // 页签名称
          title: '审核贴现限额',
          // 传递的业务数据，可选配置
          data: model
        });
      });
    },

    /**
     * 详情
     */
    doView: function () {
      var _this = this;
      var model = {};
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var routeKey = 'manaOrgLmt' + selectionsAry[0].serno + 'DETAIL';
      model = selectionsAry[0];
      model.viewType = 'DETAIL';
      model.routeKey = routeKey;

      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: 'zrcbank/lmt/lmtDiscOrg/lmtDiscOrgViewDetail',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: routeKey,
          // 页签名称
          title: '查看贴现限额信息',
          // 传递的业务数据，可选配置
          data: model
        });
      });
    },

    /**
     * 历史修改
     */
    doBackUpdate: function () {
      var _this = this;
      var model = {};
      let name = 'zrcbank/lmt/lmtDiscOrg/lmtDiscOrgManagerDetail';
      var selectionsAry = _this.$refs.refBackTable.selections;

      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }
      if (_this.rolesArry.indexOf('R1049') != -1) {
        name = 'zrcbank/lmt/lmtDiscOrg/lmtDiscOrgMarketDetail';
      }
      var routeKey = 'manaOrgLmt' + selectionsAry[0].serno + 'EDIT';
      model = selectionsAry[0];
      model.viewType = 'EDIT';
      model.routeKey = routeKey;

      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: routeKey,
          // 页签名称
          title: '修改贴现限额',
          // 传递的业务数据，可选配置
          data: model
        });
      });
    },

    /**
     * 历史查看
     */
    doBackView: function () {
      var _this = this;
      var model = {};
      var selectionsAry = _this.$refs.refBackTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var routeKey = 'lmtDiscOrg' + selectionsAry[0].pkId + 'DETAIL';
      model = selectionsAry[0];
      model.viewType = 'DETAIL';

      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: 'zrcbank/lmt/lmtDiscOrg/lmtDiscOrgViewDetail',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: routeKey,
          // 页签名称
          title: '查看贴现限额',
          // 传递的业务数据，可选配置
          data: model
        });
      });
    },

    // 删除
    doDelete: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      // 如果未选中表格数据，则弹出提示
      if (selectionsAry.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning'});
        return;
      }
      if (_this.rolesArry.indexOf('R1048') != -1) {
        if (selectionsAry[0].status !== '01') {
          _this.$message({
            message: '支行贴现限额维护员角色，仅可以选中待提交的数据进行删除',
            type: 'warning'
          });
          return;
        }
      }

      if (_this.rolesArry.indexOf('R1049') != -1) {
        if (selectionsAry[0].status !== '02' || selectionsAry[0].inputId !== this.$store.state.oauth.loginCode) {
          _this.$message({
            message: '金融市场部贴现限额管理员角色，仅可以删除本人发起的，且状态为待审核的数据',
            type: 'warning'
          });
          return;
        }
      }
      _this.$confirm('是否确定删除该记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            // 向后台发送删除请求
            // method: 请求方式
            // url: 接口路径
            // callback: 服务请求后执行的回调函数
            // 逻辑删除，修改状态OPR_TYPE 01变为02
            yufp.service.request({
              method: 'POST',
              url: backend.cmisLmt + '/api/lmtdiscorg/delete/' + selectionsAry[0].serno,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message({ message: '数据删除成功！', type: 'info'});
                  // 删除后刷新表格数据
                  _this.$refs.refTable.remoteData();
                } else {
                  _this.$message({ message: '数据删除失败！', type: 'error'});
                }
              }
            });
          }
        }
      });
    },

    // 条件查询
    searchFn: function (data) {
      let _this = this;
      if (data !== undefined && data !== '' && data === 'his') {
        if (_this.searchBackFormdata.organno !== '' || _this.searchBackFormdata.organname !== '' || _this.searchBackFormdata.updDate !== '') {
          _this.backParam = {condition: { oprType: '01', statusList: '03,04' }};
        }
        _this.$refs.refBackTable.remoteData({ condition: JSON.stringify(_this.searchBackFormdata) });
      } else {
        _this.$refs.refTable.remoteData({ condition: JSON.stringify(_this.searchInfoFormdata) });
      }
    },
    // 重置
    resetFn: function (data) {
      let _this = this;
      if (data !== undefined && data !== '' && data === 'his') {
        // 清空条件
        _this.searchBackFormdata.organno = '';
        _this.searchBackFormdata.organname = '';
        _this.searchBackFormdata.updDate = '';
        _this.backParam = {condition: { oprType: '01', statusList: '03' }};
      } else {
        // 清空条件
        _this.searchInfoFormdata.organno = '';
        _this.searchInfoFormdata.organname = '';
        _this.searchInfoFormdata.status = '';
        _this.searchInfoFormdata.appYm = '';
      }
    },

    /** 参照公共的确认事件 */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'orgIdName') {
            this.searchInfoFormdata[mapping[item]] = data.orgName;
          } else if (item === 'orgId') {
            this.searchInfoFormdata[mapping[item]] = data.orgCode;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'orgIdName') {
            this.searchInfoFormdata[item] = data.orgName;
          } else if (item === 'orgId') {
            this.searchInfoFormdata[item] = data.orgCode;
          }
        }
      }
    },

    /** 参照公共的确认事件 */
    commonSelectFnHis: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'orgIdName') {
            this.searchBackFormdata[mapping[item]] = data.orgName;
          } else if (item === 'orgId') {
            this.searchBackFormdata[mapping[item]] = data.orgCode;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'orgIdName') {
            this.searchBackFormdata[item] = data.orgName;
          } else if (item === 'orgId') {
            this.searchBackFormdata[item] = data.orgCode;
          }
        }
      }
    }
  }
};
</script>
