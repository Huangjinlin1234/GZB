<template>
  <!--
    @created by 屈文
    @description 集团客户授信申报列表、历史列表
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="集团客户授信申报列表" name="messageTip">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
            <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="60px">
              <yu-xform-group :column="3">
                <yu-xform-item label="集团客户名称" placeholder="集团客户名称" ctype="input" name="grpCusName"></yu-xform-item>
                <yu-xform-item label="业务类型" placeholder="业务类型" ctype="select" name="lmtType" data-code="STD_SX_LMT_TYPE" :datacode-filter="datacodeFilterFnType"></yu-xform-item>
                <yu-xform-item label="业务流水号" placeholder="业务流水号" ctype="input" name="grpSerno"></yu-xform-item>
                <yu-xform-item label="集团客户编号" placeholder="集团客户编号" ctype="input" name="grpCusId"></yu-xform-item>
                <yu-xform-item label="审批状态" placeholder="审批状态" ctype="select" name="approveStatus" data-code="STD_ZB_APPR_STATUS"  :datacode-filter="datacodeFilterFnStatus"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          <yu-toolbar>
            <yu-button type="primary" @click="addFn" v-if="checkCtrl('add')">新增</yu-button>
            <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('edit')">修改</yu-button>
            <yu-button type="primary" @click="infoFn" v-if="checkCtrl('view')">查看</yu-button>
            <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('delete')">删除</yu-button>
          </yu-toolbar>
          <!--<yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition" selection-type="radio" request-type="POST" @row-click="onSelected">-->
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition" selection-type="radio" request-type="POST">
            <yu-xtable-column label="业务流水号" prop="grpSerno"></yu-xtable-column>
            <yu-xtable-column label="业务类型" prop="lmtType" sortable data-code="STD_SX_LMT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="集团客户编号">
              <template slot-scope="scope">
                <span style="color: blue;" @click="openDialog(scope.row)">{{ scope.row.grpCusId }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="集团客户名称">
              <template slot-scope="scope">
                <span style="color: blue;" @click="openDialog(scope.row)">{{ scope.row.grpCusName }}</span>
              </template>
            </yu-xtable-column>
            <!--<yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>-->
            <yu-xtable-column label="敞口额度合计（元）" prop="openTotalLmtAmt" :formatter="formatNumber('0,000.00',2)">
            </yu-xtable-column>
            <yu-xtable-column label="低风险额度合计（元）" prop="lowRiskTotalLmtAmt" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName" ></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName"> </yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId" hide-column> </yu-xtable-column>
            <yu-xtable-column label="申请状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"> </yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="集团客户授信申报历史列表" name="deal">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
            <yu-xform related-table-name="refTableHis" form-type="search" v-model="searchHisFormdata" label-width="60px">
              <yu-xform-group :column="3">
                <yu-xform-item label="集团客户名称" placeholder="集团客户名称" label-width="120px" ctype="input" name="grpCusName"></yu-xform-item>
                <yu-xform-item label="业务类型" placeholder="业务类型" label-width="120px" ctype="select" name="lmtType" data-code="STD_SX_LMT_TYPE" :datacode-filter="datacodeFilterFnType"></yu-xform-item>
                <yu-xform-item label="业务流水号" placeholder="业务流水号" label-width="120px" ctype="input" name="grpSerno"></yu-xform-item>
                <yu-xform-item label="集团客户编号" placeholder="集团客户编号" label-width="120px" ctype="input" name="grpCusId"></yu-xform-item>
                <yu-xform-item label="审批状态" placeholder="审批状态" label-width="120px" ctype="select" name="approveStatus" data-code="STD_ZB_APPR_STATUS" :datacode-filter="datacodeFilterFnStatusHis"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          <yu-toolbar>
            <yu-button type="primary" @click="viewFn" v-if="checkCtrl('view')">查看</yu-button>
            <yu-button type="primary" @click="reconsider" v-if="checkCtrl('reconcide')">发起复议</yu-button>
            <yu-button type="primary" @click="secondDiscuss" v-if="checkCtrl('onRediscuss')">发起再议</yu-button>
            <yu-button type="primary" @click="recheck" v-if="checkCtrl('onReview')">发起复审</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTableHis" row-number :data-url="dataHisUrl" condition-key="condition" selection-type="radio" request-type="POST">
            <yu-xtable-column label="业务流水号" prop="grpSerno"></yu-xtable-column>
            <yu-xtable-column label="业务类型" prop="lmtType" sortable data-code="STD_SX_LMT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="集团客户编号">
              <template slot-scope="scope">
                <span style="color: blue;" @click="openDialog(scope.row)">{{ scope.row.grpCusId }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="集团客户名称">
              <template slot-scope="scope">
                <span style="color: blue;" @click="openDialog(scope.row)">{{ scope.row.grpCusName }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="敞口额度合计（元）" prop="openTotalLmtAmt" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column >
            <yu-xtable-column label="低风险额度合计（元）" prop="lowRiskTotalLmtAmt" :formatter="formatNumber('0,000.00',2)"></yu-xtable-column >
            <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName" ></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName"> </yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId" hide-column> </yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"> </yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <!--集团客户授信申报向导-->
      <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisibleGuide" width="650px">
        <yu-xform ref="refForm" label-width="140px" v-model="formdata" :disabled="formDisabled">
          <yu-xform-group column="1">
            <yu-xform-item label="编码" ctype="num" name="id" :hidden="true"></yu-xform-item>
            <yu-xform-item label="集团客户编号" ctype="yu-xgrp-custom" placeholder="集团客户编号" @change="getlmttypebygrpno" name="grpCusId" readonly rules="required" @select-fn="commonSelectFn" :mapping="{'grpNo':'grpCusId','grpName':'grpCusName'}" width="730" height="480"></yu-xform-item>
            <yu-xform-item label="集团客户名称" ctype="input" name="grpCusName" rules="required" placeholder="集团客户名称"></yu-xform-item>
            <yu-xform-item label="授信类型" rules="required" ctype="select" placeholder="授信类型" name="lmtType" data-code="STD_SX_LMT_TYPE" disabled></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="nextFn">下一步</yu-button>
            <yu-button type="primary" @click="cancelFn">取消</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('CRUD_TYPE,NATIONALITY,PUBLISH_STATUS,STD_SX_LMT_TYPE');
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  mixins: [mixinForm],
  props: {
    param: Object
  },
  data: function () {
    return {
      activeName: 'messageTip',
      searchFormdata: {},
      searchHisFormdata: {},
      formdataNext: {},
      dataUrl: backend.cmisBiz + '/api/lmtgrpapp/queryapplist',
      dataHisUrl: backend.cmisBiz + '/api/lmtgrpapp/queryapphislist',
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
      dialogVisibleGuide: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      replySerno: '',
      lmtTerm: ''
    };
  },
  mounted () {
    if (this.param) {
      this.searchFormdata.lmtType = this.param.lmtType;
      setTimeout(() => {
        this.$refs.refTable.remoteData({
          condition: JSON.stringify(this.searchFormdata)
        });
      }, 300);
    }
  },
  methods: {
    // 字典项过滤
    datacodeFilterFnType: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '01' || op.key === '03' || op.key === '04' || op.key === '05' || op.key === '06') {
          return true;
        }
        return false;
      });
    },

    datacodeFilterFnStatus: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '000' || op.key === '111' || op.key === '992') {
          return true;
        }
        return false;
      });
    },
    datacodeFilterFnStatusHis: function (opts, datacode, name) { // 990,991,993,997,998,996
      return opts.filter(function (op) {
        if (op.key === '990' || op.key === '991' || op.key === '993' || op.key === '996' || op.key === '997' || op.key === '998') {
          return true;
        }
        return false;
      });
    },
    // list集团客户编号
    openDialog: function (a) {
      var _this = this;

      if (a.grpCusId == null || a.grpCusId == '') {
        _this.$xutils.showMsgBox('提示', '客户号为空!');
        return;
      }
      let json = {};
      json['grpNo'] = a.grpCusId;
      // 集团认定详情展示组合模板
      json['model_group_no'] = 'CMG000311';
      json['op'] = 'view';
      this.$dialog.open(
        '集团客户',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        json,
        null,
        true,
        true
      );
    },

    // dialog集团客户编号的change事件
    getlmttypebygrpno: function () {
      var _this = this;
      var grpCusId = this.formdata.grpCusId;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpapp/getlmttypebygrpno',
        data: grpCusId,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.formdata.lmtType = response.data;
          }
        }
      });
    },
    /**
     * 取消
     */
    cancelFn: function () {
      var _this = this;
      _this.dialogVisibleGuide = false;
    },

    /**
     * 下一步
     */
    // nextFn: function () {
    //   var _this = this;
    //   var jsoPar = _this.formdata;
    //   var grpCusId = jsoPar.grpCusId;
    //   // todo 校验参数提示信息
    //   if (grpCusId == null || grpCusId == '') {
    //     _this.$message('提交参数为空');
    //     return;
    //   }
    //   // 根据客户号进行查询判断客户号是否存在台账表中 aizhag todo 先复用,不存在默认是新增，存在是细化
    //   yufp.service.request({
    //     method: 'POST',
    //     url: backend.cmisBiz + '/api/lmtgrpapp/judgeisexistonwayapp',
    //     data: grpCusId,
    //     callback: function (code, message, response) {
    //       // 在向后台返回数值,如果不存在，提示错误信息，可以进行细化操作
    //       if (response.data == 'false') {
    //         _this.$message('交易成功');
    //         _this.guideSave(jsoPar);
    //       } else {
    //         // 弹出提示:已存在...
    //         return;
    //       }
    //     }
    //   });
    // },

    // 根据主从表插入申请数据，调保存方法，返回grpSerno
    nextFn: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var jsoPar = _this.formdata;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpapp/guidesave',
        data: jsoPar,
        callback: function (code, message, response) {
          var retvalue = response.code;
          var grpSerno = response.data;
          if (retvalue == '0') {
            var idList = '';
            var pageList = '';
            idList = 'jtsxdcxx';
            pageList = '集团授信调查信息';
            _this.insertMustCheck(grpSerno, jsoPar.lmtType, idList, pageList);
            _this.$message('保存成功');
            // 返回对应的流水号去查询
            _this.addNewTab(grpSerno);
          } else {
            _this.$message(response.message);
            return;
          }
        }
      });
    },
    insertMustCheck: function (serno, lmtType, idList, pageList) {
      var _this = this;
      let obj = {};
      obj.serno = serno;
      obj.bizType = lmtType;
      obj.idList = idList;
      obj.pageList = pageList;
      yufp.service.request({
        method: 'POST',
        async: false,
        url: _this.$backend.cmisBiz + '/api/bizmustcheckdetails/insertMustCheck',
        data: obj,
        callback: function (code, message, response) {
          if (response.data == '0') {
            _this.$xutils.showMsgBox('系统异常');
          }
        }});
    },
    // 打开新的tab页签
    addNewTab: function (grpSerno) {
      var _this = this;
      _this.dialogVisibleGuide = false;
      _this.$router.addTab({
        name: 'zrcbank/biz/lmtGrpAppNew/lmtGrpAppDeclare/lmtGrpAppGroupAdd',
        title: '集团客户授信申报发起',
        key: grpSerno,
        data: {
          data: grpSerno
        }
      });
      _this.$refs.refTable.remoteData();
    },

    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.dialogVisibleGuide = true;
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      var jsoPar = _this.$refs.refTable.selections[0];
      if (jsoPar.approveStatus != '000' && jsoPar.approveStatus != '992') {
        _this.$message({
          message: '只有待发起或者打回的数据可以执行修改操作!',
          type: 'warning'
        });
        return;
      }
      _this.jumpFactoryOrAdd(jsoPar);
    },

    jumpFactoryOrAdd: function (jsoPar) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpmemrel/judgeisafterinitlmtgrpmemrelstatus',
        data: jsoPar.grpSerno,
        callback: function (code, message, response) {
          if (response.data == 'true') {
            _this.jumpFactory(jsoPar);
          } else {
            _this.addTab(jsoPar);
          }
        }
      });
    },

    // 调模版工厂
    jumpFactory: function (jsoPar) {
      var _this = this;
      var modelGroupNo = '';
      if (jsoPar.lmtType == '05') {
        modelGroupNo = 'CMG000536';
      } else if (jsoPar.lmtType == '06') {
        modelGroupNo = 'CMG000537';
      } else {
        modelGroupNo = 'CMG000153';
      }
      // jsoPar['model_group_no'] = modelGroupNo;
      // jsoPar['op'] = 'EDIT';
      // jsoPar['cusId'] = jsoPar.grpCusId;
      // _this.$dialog.open(
      //   '',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   1400,
      //   800,
      //   jsoPar,
      //   function () {
      //     _this.$refs.refTable.remoteData();
      //   },
      //   true,
      //   true
      // );
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: jsoPar.grpSerno + '_' + new Date().getTime(),
        title: '集团客户授信申报',
        data: {
          model_group_no: modelGroupNo,
          op: 'EDIT',
          grpSerno: jsoPar.grpSerno,
          serno: jsoPar.grpSerno,
          grpCusId: jsoPar.grpCusId,
          cusId: jsoPar.grpCusId,
          origiLmtSerno: jsoPar.origiLmtSerno,
          imageParams: {
            docid: jsoPar.grpSerno,
            contid: jsoPar.grpSerno,
            businessid: jsoPar.origiLmtSerno
          }
        }
      });
      _this.$refs.refTable.remoteData();
    },

    // 打开tab页签(05复议、06再议)
    addTab: function (jsoPar) {
      var _this = this;
      var name = '';
      var title = '';
      if (jsoPar.lmtType == '05') {
        name = 'zrcbank/biz/lmtGrpAppNew/lmtGrpAppReconsider/lmtGrpAppReconsiderAdd';
        title = '集团客户授信复议申报发起';
      } else if (jsoPar.lmtType == '06') {
        name = 'zrcbank/biz/lmtGrpAppNew/lmtGrpAppDicuss/lmtGrpAppDiscussAdd';
        title = '集团客户授信再议申报发起';
      } else if (jsoPar.lmtType == '01') {
        name = 'zrcbank/biz/lmtGrpAppNew/lmtGrpAppDeclare/lmtGrpAppGroupAdd';
        title = '集团客户授信申报发起';
      } else if (jsoPar.lmtType == '04') {
        name = 'zrcbank/biz/lmtGrpAppNew/lmtGrpAppRecheck/lmtGrpAppRecheckAdd';
        title = '集团客户授信复审申报发起';
      } else {
        name = 'zrcbank/biz/lmtGrpAppNew/lmtGrpAppDeclare/lmtGrpAppGroupAdd';
        title = '集团客户授信申报发起';
      }
      _this.$router.addTab({
        name: name,
        title: title,
        key: new Date().getTime(),
        data: {
          data: jsoPar.grpSerno
        }
      });
    },

    /**
     * 刪除按钮
     */
    deleteFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.refTable.selections[0];
      var grpSerno = obj.grpSerno;
      if (obj.approveStatus != '000' && obj.approveStatus != '992') {
        _this.$message({
          message: '只有待发起或者打回的数据可以执行删除操作!注:打回状态下删除操作正在开发中!',
          type: 'warning'
        });
        return;
      }
      // 暂时未处理打回状态的删除  自行退出
      _this.$confirm('确认删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            // 调用删除方法
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtgrpapp/logicdelete',
              data: grpSerno,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message('删除成功');
                  _this.$refs.refTable.remoteData();
                } else {
                  _this.$message('删除失败');
                  _this.$refs.refTable.remoteData();
                  return;
                }
              }
            });
          }
        }
      });
    },

    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var jsoPar = _this.$refs.refTable.selections[0];
      var modelGroupNo = '';
      if (jsoPar.lmtType == '05') {
        modelGroupNo = 'CMG000536';
      } else if (jsoPar.lmtType == '06') {
        modelGroupNo = 'CMG000537';
      } else {
        modelGroupNo = 'CMG000153';
      }
      // jsoPar['model_group_no'] = modelGroupNo;
      // jsoPar['op'] = 'VIEW';
      // jsoPar['cusId'] = jsoPar.grpCusId;
      // _this.$dialog.open(
      //   '',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   1400,
      //   800,
      //   jsoPar,
      //   function () {
      //     _this.$refs.refTable.remoteData();
      //   },
      //   true,
      //   true
      // );
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: jsoPar.grpSerno,
        title: '集团客户授信申报',
        data: {
          model_group_no: modelGroupNo,
          op: 'VIEW',
          grpSerno: jsoPar.grpSerno,
          serno: jsoPar.grpSerno,
          grpCusId: jsoPar.grpCusId,
          cusId: jsoPar.grpCusId,
          bizType: '011',
          origiLmtSerno: jsoPar.origiLmtSerno,
          imageParams: {
            docid: jsoPar.grpSerno,
            contid: jsoPar.grpSerno,
            businessid: jsoPar.origiLmtSerno
          }
        }
      });
    },

    /**
     * 历史详情
     */
    viewFn: function () {
      var _this = this;
      if (_this.$refs.refTableHis.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      debugger;
      var jsoPar = _this.$refs.refTableHis.selections[0];
      var modelGroupNo = '';
      if (jsoPar.lmtType == '05') {
        modelGroupNo = 'CMG000536';
      } else if (jsoPar.lmtType == '06') {
        modelGroupNo = 'CMG000537';
      } else {
        modelGroupNo = 'CMG000153';
      }
      // jsoPar['model_group_no'] = modelGroupNo;
      // jsoPar['op'] = 'VIEW';
      // jsoPar['cusId'] = jsoPar.grpCusId;
      // _this.$dialog.open(
      //   '',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   1400,
      //   800,
      //   jsoPar,
      //   function () {
      //     _this.$refs.refTableHis.remoteData();
      //   },
      //   true,
      //   true
      // );
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: jsoPar.grpSerno,
        title: '集团客户授信申报',
        data: {
          model_group_no: modelGroupNo,
          op: 'VIEW',
          grpSerno: jsoPar.grpSerno,
          serno: jsoPar.grpSerno,
          grpCusId: jsoPar.grpCusId,
          cusId: jsoPar.grpCusId,
          imageParams: {
            docid: jsoPar.grpSerno,
            contid: jsoPar.grpSerno,
            businessid: jsoPar.origiLmtSerno
          }
        }
      });
    },

    // 发起复议
    reconsider: function () {
      var _this = this;
      var jsoPar = _this.$refs.refTableHis.selections;
      if (jsoPar.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var approveStatus = jsoPar[0].approveStatus;
      if (jsoPar.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (approveStatus != '997' && approveStatus != '998') {
        _this.$message({
          message: '请选择一条状态满足复议的记录',
          type: 'warning'
        });
        return;
      }
      _this.addReconsiderStartTab(jsoPar[0]);
    },

    // 跳转复议统一发起
    addReconsiderStartTab: function (jsoPar) {
      var _this = this;
      jsoPar.lmtType = '05';
      _this.$confirm('确认发起复议?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            // 确认发起复议
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtgrpapp/guidesave',
              data: jsoPar,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  var idList = '';
                  var pageList = '';
                  idList = 'jtsxfysqb';
                  pageList = '集团授信复议申请表';
                  _this.insertMustCheck(response.data, jsoPar.lmtType, idList, pageList);
                  _this.jumpReconsiderAddTab(response.data);
                } else {
                  _this.$message('复议失败!');
                  return;
                }
              }
            });
          }
        }
      });
    },
    jumpReconsiderAddTab (grpSerno) {
      this.$router.addTab({
        name: 'zrcbank/biz/lmtGrpAppNew/lmtGrpAppReconsider/lmtGrpAppReconsiderAdd',
        title: '集团客户授信复议新增',
        key: 'key',
        data: {
          data: grpSerno
        }
      });
    },

    // 发起再议
    secondDiscuss: function () {
      var _this = this;
      var jsoPar = _this.$refs.refTableHis.selections;
      if (jsoPar.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var approveStatus = jsoPar[0].approveStatus;
      var grpSerno = jsoPar[0].grpSerno;

      if (approveStatus != '993') {
        _this.$message({
          message: '请选择一条状态为再议的记录',
          type: 'warning'
        });
        return;
      }
      this.$confirm('是否发起再议?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        var idList = '';
        var pageList = '';
        idList = 'jtzysxsq';
        pageList = '集团再议授信申请';
        _this.insertMustCheck(grpSerno, '06', idList, pageList);
        _this.addSecondDiscussStartTab(grpSerno);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },

    // 表格金额字段处理
    formatNumber: function (format, sort) {
      let _this = this;
      sort = sort === undefined ? 2 : sort;
      return function (r, c, v) {
        var val;
        switch (sort) {
        case 0:
          val = r;
          break;
        case 1:
          val = c;
          break;
        case 2:
          val = v;
          break;
        default:
          // eslint-disable-next-line no-console
          console.log('未找到分类');
          break;
        }

        if (val == undefined) {
          return '';
        }
        if (val != 0 && !parseFloat(val)) {
          return val;
        }
        return _this.number(val, format);
      };
    },
    /**
   * Formats the number according to the format string.
   * examples (123456.789):
   * 0 - (123456) show only digits, no precision<br>
   * 0.00 - (123456.78) show only digits, 2 precision<br>
   * 0.0000 - (123456.7890) show only digits, 4 precision<br>
   * 0,000 - (123,456) show comma and digits, no precision<br>
   * 0,000.00 - (123,456.78) show comma and digits, 2 precision<br>
   * 0,0.00 - (123,456.78) shortcut method, show comma and digits, 2 precision<br>
   * To reverse the grouping (,) and decimal (.) for international numbers, add /i to the end.
   * For example: 0.000,00/i
   * @param {Number} v The number to format.
   * @param {String} format The way you would like to format this text.
   * @return {String} The formatted number.
   */
    number: function (v, format) {
      if (!format) {
        return v;
      }
      if (isNaN(v)) {
        return '';
      }
      var comma = ',',
        dec = '.',
        i18n = false,
        neg = v < 0;

      v = Math.abs(v);
      if (format.substr(format.length - 2) == '/i') {
        format = format.substr(0, format.length - 2);
        i18n = true;
        comma = '.';
        dec = ',';
      }

      var hasComma = format.indexOf(comma) != -1,
        psplit = (i18n ? format.replace(/[^\d,]/g, '') : format.replace(/[^\d.]/g, '')).split(dec);

      if (psplit.length > 1) {
        v = v.toFixed(psplit[1].length);
      } else if (psplit.length > 2) {
        throw new Error('NumberFormatException: invalid format, formats should have no more than 1 period: ' + format);
      } else {
        v = v.toFixed(0);
      }

      var fnum = v.toString();

      psplit = fnum.split('.');

      if (hasComma) {
        let cnum = psplit[0],
          parr = [],
          j = cnum.length,
          // m = Math.floor(j / 3),
          n = cnum.length % 3 || 3,
          i;

        for (i = 0; i < j; i += n) {
          if (i != 0) {
            n = 3;
          }

          parr[parr.length] = cnum.substr(i, n);
          // m -= 1;
        }
        fnum = parr.join(comma);
        if (psplit[1]) {
          fnum += dec + psplit[1];
        }
      } else {
        if (psplit[1]) {
          fnum = psplit[0] + dec + psplit[1];
        }
      }

      return (neg ? '-' : '') + format.replace(/[\d,?.?]+/, fnum);
    },

    // 跳转再议统一发起
    addSecondDiscussStartTab: function (grpSerno) {
      var _this = this;
      _this.$router.addTab({
        name: 'zrcbank/biz/lmtGrpAppNew/lmtGrpAppDicuss/lmtGrpAppDiscussAdd',
        title: '集团客户授信再议新增',
        key: 'key',
        data: {
          data: grpSerno
        }
      });
    },

    // 发起复审
    recheck: function () {
      var _this = this;
      var jsoPar = _this.$refs.refTableHis.selections;
      if (jsoPar.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var approveStatus = jsoPar[0].approveStatus;
      if (approveStatus != '997') {
        _this.$message({
          message: '只有通过的数据才可以进行复审操作!',
          type: 'warning'
        });
        return;
      }
      _this.addReCheckStartTab(jsoPar[0]);
    },

    // 跳转复议统一发起
    addReCheckStartTab: function (jsoPar) {
      var _this = this;
      jsoPar.lmtType = '04';
      _this.$confirm('确认发起复审?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            // 确认发起复议
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtgrpapp/guidesave',
              data: jsoPar,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  var idList = '';
                  var pageList = '';
                  idList = 'xhedfs';
                  pageList = '循环授信额度复审';
                  _this.insertMustCheck(response.data, jsoPar.lmtType, idList, pageList);
                  _this.jumpReCheckAddTab(response.data);
                } else {
                  _this.$message('复审失败!');
                  return;
                }
              }
            });
          }
        }
      });
    },
    jumpReCheckAddTab (grpSerno) {
      this.$router.addTab({
        name: 'zrcbank/biz/lmtGrpAppNew/lmtGrpAppRecheck/lmtGrpAppRecheckAdd',
        title: '集团客户授信复审新增',
        key: 'key',
        data: {
          data: grpSerno
        }
      });
    }


  }
};
</script>
