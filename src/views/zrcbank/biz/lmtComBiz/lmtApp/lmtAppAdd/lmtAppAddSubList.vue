<template>
  <div>
    <yu-panel title="授信新增分项明细" :hideFilter="false" :collapseHide="false">
      <template slot="right">
        <yu-toolbar v-if="type!='VIEW'&&apprStatus!='111'">
          <yu-button type="primary" @click="addSub">新增分项</yu-button>
        </yu-toolbar>
      </template>
      <yu-xtable :data="lmtAppSubList" style="width: 100%;margin-bottom: 20px;" row-key="subPrdSerno" border
                 :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :pageable="false" row-number>
        <yu-xtable-column label="展开/收起" prop=""></yu-xtable-column>
        <yu-xtable-column prop="subPrdSerno" label="授信分项流水号" sortable width="220">
            <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewSubOrPrd(scope.row)">{{ scope.row.subPrdSerno }}</a>
            </template>
        </yu-xtable-column>
        <yu-xtable-column prop="pkId" label="主键" sortable hide-column></yu-xtable-column>
        <yu-xtable-column prop="serno" label="业务流水号" sortable hide-column></yu-xtable-column>
        <yu-xtable-column prop="origiLmtAccSubPrdNo" label="授信分项额度编号" sortable  hide-column></yu-xtable-column>
        <yu-xtable-column prop="lmtBizTypeName" label="授信品种" sortable ></yu-xtable-column>
        <yu-xtable-column prop="lmtBizTypeProp" label="授信品种类型属性"  data-code="STD_PRD_TYPE_PROP" ></yu-xtable-column>
        <yu-xtable-column prop="isRevolvLimit" label="是否循环额度" data-code="STD_ZB_YES_NO" ></yu-xtable-column>
        <yu-xtable-column prop="isPreLmt" label="是否预授信额度" data-code="STD_ZB_YES_NO" ></yu-xtable-column>
        <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>

        <yu-xtable-column prop="origiLmtAccSubPrdAmt" label="原授信额度"  hide-column></yu-xtable-column>
        <yu-xtable-column prop="lmtAmt" label="授信额度（元）"  :formatter="Currency"></yu-xtable-column>

        <yu-xtable-column prop="origiLmtAccSubPrdTerm" label="原额度期限（月）" hide-column></yu-xtable-column>
        <yu-xtable-column prop="lmtTerm" label="授信期限（月）"></yu-xtable-column>
        <yu-xtable-column prop="chgFlag" label="变更标识" hide-column></yu-xtable-column>
        <yu-xtable-column prop="isSfcaLmt" label="是否存量授信" data-code="STD_ZB_YES_NO" ></yu-xtable-column>
        <yu-xtable-column prop="todo" label="操作" width="120">
          <template slot-scope="scope">
            <a class="underline" style="text-decoration:none" v-if="scope.row.isSfcaLmt !='0'&&scope.row.isSfcaLmt !='1'&&type!='VIEW'&&apprStatus!='111'" @click="editSub(scope.row)" >修改</a>
            <a class="underline" style="text-decoration:none" v-if="scope.row.isSfcaLmt !='0'&&scope.row.isSfcaLmt !='1'&&type!='VIEW'&&apprStatus!='111'" @click="deleteSub(scope.row)" >删除</a>
            <a class="underline" style="text-decoration:none" v-if="scope.row.isSfcaLmt !='0'&&scope.row.isSfcaLmt !='1'" @click="viewSub(scope.row)">查看</a>
          </template>
        </yu-xtable-column>
      </yu-xtable>
      <yu-xdialog title="授信分项新增" :visible.sync="dialogVisibleSelected" width="800px">
            <yu-xform ref="subForm" label-width="160px" v-model="formdata">
              <yu-xform-group column="2">
                <yu-xform-item label="客户编号" rules="required" ctype="input" name="cusId" disabled colspan="10"></yu-xform-item>
                <yu-xform-item label="客户名称" rules="required" ctype="input" name="cusName" disabled colspan="10"></yu-xform-item>
                <yu-xform-item label="授信额度(元)" rules="required" ctype="yu-num" number-formatter="0,000.00" name="lmtAmt" :min="0" colspan="10"></yu-xform-item>
                <yu-xform-item label="担保方式" rules="required" ctype="select" name="guarMode" data-code="STD_ZB_GUAR_WAY" v-model="guarMode" @change="getGuarMode(formdata.guarMode)" exclude-key="21,40" :datacode-filter="datacodeFilterFn" colspan="10"></yu-xform-item>
                <yu-xform-item label="是否预授信额度" rules="required" value="0" ctype="select" v-model="isPreLmt" name="isPreLmt" data-code="STD_ZB_YES_NO" @change="getIsPreLmt(formdata.isPreLmt)" colspan="10"></yu-xform-item>
                <yu-xform-item label="是否循环额度" ctype="select" name="isRevolvLimit" rules="required" data-code="STD_ZB_YES_NO" colspan="10"></yu-xform-item>
                <yu-xform-item label="主键" ctype="input" name="pkId" hidden></yu-xform-item>
                <yu-xform-item label="分项流水号" ctype="input" name="subSerno" hidden></yu-xform-item>
                <yu-xform-item label="分项名称" ctype="input" name="subName" hidden></yu-xform-item>
                <yu-xform-item label="流水号" ctype="input" name="serno" hidden></yu-xform-item>
                <yu-xform-item label="币种" ctype="input" placeholder="币种" name="curType" hidden></yu-xform-item>
                <yu-xform-item label="预授信品种编号" ctype="input" name="preLmtBizType" hidden></yu-xform-item>
                <yu-xform-item label="授信期限" ctype="input" name="lmtTerm" hidden></yu-xform-item>
                <yu-xform-item label="原额度分项编号" ctype="input" name="origiLmtAccSubNo" hidden></yu-xform-item>
                <yu-xform-item label="原额度分项金额" ctype="yu-num" number-formatter="0,000.00" name="origiLmtAccSubAmt" hidden></yu-xform-item>
                <yu-xform-item label="原额度分项期限" ctype="input" name="origiLmtAccSubTerm" hidden></yu-xform-item>
                <yu-xform-item label="操作类型" ctype="input" name="oprType" hidden></yu-xform-item>
                <yu-xform-item label="登记人" ctype="input" name="inputId" hidden></yu-xform-item>
                <yu-xform-item label="登记机构" ctype="input" name="inputBrId" hidden></yu-xform-item>
                <yu-xform-item label="登记日期" ctype="input" name="inputDate" hidden></yu-xform-item>
                <yu-xform-item label="最近修改人" ctype="input" name="updId" hidden></yu-xform-item>
                <yu-xform-item label="最近修改机构" ctype="input" name="updBrId" hidden></yu-xform-item>
                <yu-xform-item label="最近修改日期" ctype="input" name="updDate" hidden></yu-xform-item>
                <yu-xform-item label="创建时间" ctype="input" name="createTime" hidden></yu-xform-item>
                <yu-xform-item label="修改时间" ctype="input" name="updateTime" hidden></yu-xform-item>
              </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button type="primary" @click="onNextStep">下一步</yu-button>
              <yu-button type="primary" @click="cancelFn">取消</yu-button>
            </div>
            </yu-xform>
          </yu-xdialog>
    </yu-panel>
  </div>

</template>

<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import mixin from '@/utils/mixin';
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_GUAR_WAY,STD_PRD_TYPE_PROP');
export default {
  components: { YufpDemoSelector},
  mixins: [mixin],
  data: function () {
    return {
      lmtAppSubList: [],
      formDisabled: false,
      dialogVisibleSelected: false,
      formdata: {},
      tempData: {},
      type: '',
      cusId: '',
      cusName: '',
      serno: '',
      lmtType: '',
      adjustBtnHide: true,
      isAdjust: '0',
      isPreLmt: '0',
      guarMode: '',
      apprStatus: ''
    };
  },
  mounted () {
    var _this = this;
    let data = {};
    var serno = '';
    // 待办流程进入
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      serno = data.bizId;
      _this.type = 'VIEW';
    } else if (_this.getFactory().contextData.serno) {
      data = _this.getFactory().contextData;
      serno = data.serno;
      _this.type = data.op;
    } else {
      data = _this.$route.meta.params;
      serno = data.serno;
      _this.type = data.op;
    }
    // this.getLmtGrpAppData(serno);
    this.getSubAndPrd(serno);
  },
  methods: {
    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '00' || op.key === '10' || op.key === '20' || op.key === '30' || op.key === '60') {
          return true;
        }
        return false;
      });
    },
    // 获取集团授信信息
    getLmtGrpAppData (serno) {
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpapp/querylmtgrpappbysingleserno',
        data: {
          'serno': serno
        },
        callback: function (code, message, response) {
          // 暂时弃用,需要的可直接更改
        }
      });
    },
    addFn: function () {
      var _this = this;
      _this.dialogVisible = true;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreply/getchangeablereplyno',
        callback: function (code, message, response) {
          _this.replies = response.data.lmtReplies;
        }
      });
    },
    getCusIdAndName: function (serno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapp/getlmtappbyserno',
        data: {
          'serno': serno
        },
        callback: function (code, message, response) {
          var lmtApp = response.data;
          _this.apprStatus = lmtApp.approveStatus;
          _this.cusId = lmtApp.cusId;
          _this.cusName = lmtApp.cusName;
          _this.serno = lmtApp.serno;
          _this.lmtType = lmtApp.lmtType;
        }
      });
    },
    getSubAndPrd: function (serno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtappsub/getsubandprd',
        data: serno,
        callback: function (code, message, response) {
          _this.lmtAppSubList = response.data.subList;
          _this.getCusIdAndName(serno);
        }
      });
    },
    getGuarMode: function (data) {
      var _this = this;
      if (data == '60') {
        _this.isPreLmt = '0';
      }
    },
    getIsPreLmt: function (data) {
      var _this = this;
      if (data == '1' && _this.formdata.guarMode == '60') {
        _this.guarMode = '';
      }
    },
    addSub: function () {
      var _this = this;
      _this.dialogVisibleSelected = true;
      _this.tempData.cusId = _this.cusId;
      _this.tempData.cusName = _this.cusName;
      _this.tempData.serno = _this.serno;
      _this.$nextTick(function () {
        yufp.extend(_this.formdata, _this.tempData);
      });
    },

    cancelFn: function () {
      var _this = this;
      _this.dialogVisibleSelected = false;
    },

    /**
      *修改分项信息
      */
    editSub: function (data) {
      var _this = this;
      data['model_group_no'] = 'CMG000707';
      data['op'] = 'EDIT';
      data['disAble'] = false;
      data['subSerno'] = data.subPrdSerno;
      data['guarModel'] = data.guarMode;
      data['lmtType'] = _this.lmtType;
      _this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1600,
        800,
        data,
        function () {
          _this.getSubAndPrd(_this.serno);
        },
        true,
        true
      );
    },

    /**
      *删除分项信息
      */
    deleteSub: function (data) {
      var _this = this;
      var pkId = data.pkId;
      var serno = _this.serno;
      _this.$confirm('是否确定删除该记录?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        callback: function (action) {
          if (action == 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtappsub/deletelmtappsub',
              data: pkId,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  debugger;
                  if (response.data.rtnCode == '20041') {
                    _this.$xutils.showMsgBox('提示', response.data.rtnMsg);
                  } else {
                    _this.getSubAndPrd(serno);
                    _this.$message('操作成功');
                  }
                }
              }
            });
          }
        }
      });
    },
    /**
      *查看分项信息
      */
    viewSub: function (data) {
      data['model_group_no'] = 'CMG000707';
      data['op'] = 'VIEW';
      data['subSerno'] = data.subPrdSerno;
      data['disAble'] = true;
      data['disAble'] = true;
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1600,
        800,
        data,
        null,
        true,
        true
      );
    },
    /**
     *通过分项或产品流水号查看对应详情
     */
    viewSubOrPrd: function (data) {
      var _this = this;
      if (data.lmtTerm == '' || data.lmtTerm == null) {
        _this.viewSub(data);
      } else {
        var json = {};
        json['op'] = 'VIEW';
        json['subPrdSerno'] = data.subPrdSerno;
        json['model_group_no'] = 'CMG000700';
        this.$dialog.open(
          '单一客户授信申报',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          1600,
          800,
          json,
          null,
          true,
          true
        );
      }
    },

    // 点击下一步，后台新增授信分项信息,并进入分项详情页面
    onNextStep () {
      var _this = this;
      const jsoPar = _this.formdata;
      var validate = false;
      _this.$refs.subForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: _this.$backend.cmisBiz + '/api/lmtappsub/savelmtappsub',
        data: jsoPar,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.rtnData = response.data;
            if (_this.rtnData.rtnCode == '0000') {
              _this.$message('保存成功');
              _this.dialogVisibleSelected = false;
            } else if (_this.rtnData.rtnCode == '10025') {
              _this.$message(_this.rtnData.rtnMsg);
            }
          } else {
            _this.$xutils.showMsgBox('提示', response.erortx);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
      // 针对异常的场景，rtnData未赋值，直接返回不进行后续处理
      if (JSON.stringify(_this.rtnData) == '{}') {
        return;
      }
      if (_this.rtnData.rtnCode != '0000') {
        _this.$xutils.showMsgBox('提示', _this.rtnData.rtnMsg); // 弹出提示
        return;
      }
      jsoPar['model_group_no'] = 'CMG000707';
      jsoPar['op'] = 'ADD';
      jsoPar['flag'] = 'add';
      jsoPar['subSerno'] = _this.rtnData.subSerno;
      _this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1600,
        800,
        jsoPar,
        function () {
          _this.getSubAndPrd(_this.serno);
        },
        true,
        true
      );
    }
  }
};
</script>
