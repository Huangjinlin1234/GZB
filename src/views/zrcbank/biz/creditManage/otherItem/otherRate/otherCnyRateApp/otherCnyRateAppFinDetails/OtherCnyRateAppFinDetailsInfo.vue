<template>
  <!--
    @created by lixm 2021-06-04
    @description 新增本次融资信息
  -->
  <div>
    <yu-xform ref="refForm" v-model="formdata" label-width="120px" :disabled="formDisabled">
      <yu-panel :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="授信分项编号" placeholder="授信分项编号" name="subPrdSerno" ctype="input" rules="required" @click="goLimitSubNo" @click.stop icon="search" readonly></yu-xform-item>
          <yu-xform-item label="贷款品种" placeholder="贷款品种" name="lmtBizTypeName" ctype="input" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="贷款期限" placeholder="贷款期限" name="loanTerm" ctype="input" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="担保方式" placeholder="房地产抵押/专业担保公司担保/其他" name="guarType" ctype="input" rules="required" ></yu-xform-item>
          <yu-xform-item label="贷款金额（万元）" placeholder="贷款金额（万元）" name="loanAmt" ctype="num" maxlength="14" number-formatter="0,000.00" rules="required"></yu-xform-item>
          <yu-xform-item label="执行利率" placeholder="执行利率" name="execRateYear" ctype="yu-num" sign="%" :multiple="100" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="定价方式" placeholder="定价方式"  name="priceMode" ctype="select" data-code="STD_PRICE_MODE" rules="required"></yu-xform-item>
          <yu-xform-item label="保证人名称" placeholder="保证人名称" name="guarntrNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="对外担保总额（万元）" placeholder="对外担保总额（万元）" name="outguarTotalAmt" ctype="num" maxlength="14" number-formatter="0,000.00"></yu-xform-item>
          <yu-xform-item label="其中为本行担保额（万元）" placeholder="其中为本行担保额（万元）" name="orgGuarAmt" ctype="num" maxlength="14" number-formatter="0,000.00"></yu-xform-item>
          <yu-xform-item label="对应LPR" placeholder="对应LPR" name="lprRateIntval" ctype="select" data-code="STD_LPR_RATE_INTVAL" @change="getLprRate"></yu-xform-item>
          <yu-xform-item label="LPR基准日期" placeholder="LPR基准日期" name="rateIntvalDate" ctype="datepicker" value-format="yyyy-MM-dd"></yu-xform-item>
          <yu-xform-item label="当前LPR值" placeholder="当前LPR值" name="curLpr" ctype="yu-num" sign="%" :multiple="100" rules="required" @change="curLprChange" disabled></yu-xform-item>
          <yu-xform-item label="浮动点数" placeholder="浮动点数" name="rateFloatPoint" ctype="num" rules="required" @change="curRateFloatPointChange"></yu-xform-item>
          <yu-xform-item label="利率调整选项" placeholder="利率调整选项" name="rateAdjustCycle" ctype="select" data-code="STD_RATE_ADJUST_CYCLE" rules="required" :hidden="isDisabled"></yu-xform-item>
          <yu-xform-item label="下一次利率调整间隔" placeholder="下一次利率调整间隔" name="nextRateAdjInterval" ctype="yu-num" :precision="0" :min="0"></yu-xform-item>
          <yu-xform-item label="第一次调整日" placeholder="第一次调整日" name="firstAdjDate" ctype="datepicker" value-format="yyyy-MM-dd"></yu-xform-item>
          <yu-xform-item label="分项流水号" placeholder="分项流水号" name="subSerno" ctype="input" hidden></yu-xform-item>
          <yu-xform-item label="申请流水号" placeholder="申请流水号" name="serno" ctype="input" hidden></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input" hidden></yu-xform-item>
          <yu-xform-item label="贷款品种编号" placeholder="贷款品种编号" name="lmtBizType" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="saveFn">保存</yu-button>
        <yu-button icon="yx-undo2" @click="cancelFn">返回</yu-button>
      </div>
      <yu-panel title="关联原利率定价" panel-type="simple">
        <yu-button-drop style="margin-bottom:10px;">
          <yu-button type="primary" @click="importFn" v-show="saveBtnShow">引入</yu-button>
          <yu-button type="primary" @click="deleteFn" v-show="saveBtnShow">删除</yu-button>
        </yu-button-drop>
        <yu-xtable ref="refTable" row-number condition-key="condition" :base-params="ParamUrl" requestType="POST" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true">
          <yu-xtable-column label="额度分项编号" prop="subAccNo"></yu-xtable-column>
          <yu-xtable-column label="贷款品种" prop="loanType" data-code="STD_RATE_LOAN_KIND"></yu-xtable-column>
          <yu-xtable-column label="贷款期限" prop="loanTerm" data-code="STD_RATE_LOAN_TERM"></yu-xtable-column>
          <yu-xtable-column label="担保方式" prop="guarType" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
          <yu-xtable-column label="贷款金额" prop="loanAmt"></yu-xtable-column>
          <yu-xtable-column label="执行利率" prop="execRateYear">
            <template slot-scope="scope">
              <span>{{ parseFloat(scope.row.execRateYear * 100 ) + '%' }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="定价方式" prop="priceMode" data-code="STD_PRICE_MODE"></yu-xtable-column>
          <yu-xtable-column label="保证人名称" prop="guarntrNo"></yu-xtable-column>
          <yu-xtable-column label="对外担保总额" prop="outguarTotalAmt"></yu-xtable-column>
          <yu-xtable-column label="其中为本行担保额" prop="orgGuarAmt"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </yu-xform>
    <!-- 授信分项编号弹层 -->
    <yu-xdialog title="授信分项明细" :visible.sync="show_dialog_subNo" width="1000px" height="400px">
      <yu-button style="margin-bottom:10px;" type="primary" @click="subNoSelect">选取返回</yu-button>
      <yu-xtable ref="refTableSubNo" :data="replySubList" style="width: 100%;margin-bottom: 20px;" row-key="subPrdSerno" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :pageable="false">
        <yu-xtable-column prop="subPrdSerno" label="授信分项流水号" sortable width="220"></yu-xtable-column>
        <yu-xtable-column prop="pkId" label="主键" sortable hide-column></yu-xtable-column>
        <yu-xtable-column prop="serno" label="业务流水号" sortable hide-column></yu-xtable-column>
        <yu-xtable-column prop="origiLmtAccSubPrdNo" label="授信分项额度编号" sortable width="180" hide-column></yu-xtable-column>
        <yu-xtable-column prop="lmtBizTypeName" label="授信品种" sortable width="180"></yu-xtable-column>
        <yu-xtable-column prop="isRevolvLimit" label="是否循环额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column prop="isPreLmt" label="是否预授信额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column prop="origiLmtAccSubPrdAmt" label="原授信额度" hide-column></yu-xtable-column>
        <yu-xtable-column prop="lmtAmt" label="授信额度（元）" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column prop="origiLmtAccSubPrdTerm" label="原额度期限（月）" hide-column></yu-xtable-column>
        <yu-xtable-column prop="lmtTerm" label="授信期限（月）"></yu-xtable-column>
        <yu-xtable-column prop="chgFlag" label="变更标识" hide-column></yu-xtable-column>
        <yu-xtable-column prop="isSfcaLmt" label="是否存量授信" data-code="STD_ZB_YES_NO"></yu-xtable-column>
      </yu-xtable>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" @click="subNoCancel">返回</yu-button>
      </yu-form-buttons>
    </yu-xdialog>
  </div>
</template>
<script>
import { clone, lookup, dateFormat } from '@/utils';
yufp.lookup.reg(
  'STD_PRICE_MODE,STD_ZB_CUS_TYP,STD_ZB_CERT_TYP,STD_RATE_LOAN_KIND,STD_RATE_LOAN_TERM,STD_ZB_GUAR_WAY,STD_LPR_RATE_INTVAL'
);
export default {
  data: function () {
    return {
      formdata: {},
      formDisabled: false,
      viewType: 'DETAIL',
      saveBtnShow: true,
      submitBtnShow: true,
      show_dialog_subNo: false,
      replySubList: [],
      pageParams: {},
      type: '',
      dataUrl: '',
      ParamUrl: {},
      isDisabled: false,
      priceMode: ''
    };
  },
  created () {
    this.getLead();
  },
  watch: {
    "formdata.priceMode" (newVal, oldVal) {
      if(newVal === '01') {
        this.isDisabled = true
      } else {
        this.isDisabled = false
      }
    }
  },
  mounted () {
    console.log('===============pageParams', this.$route.meta.params);
    this.$nextTick(() => {
      let _this = this;
      _this.pageParams = _this.$route.meta.params;
      _this.type = _this.pageParams.op;
      if (_this.type == 'VIEW') {
        _this.formDisabled = true;
        _this.saveBtnShow = false;
      }
      yufp.clone(_this.pageParams.data, _this.formdata);
      if (_this.type == 'ADD') {
        _this.formdata.subSerno = new Date().getTime();
      }
    });
  },
  methods: {
    // 关联原利率定价列表
    getLead () {
      var _this = this;
      _this
        .$request({
          method: 'POST',
          url:
            backend.cmisBiz + '/api/othercnyrateloanreloldrate/selectByModel',
          data: {
            condition: JSON.stringify({
              subSerno: _this.$route.meta.params.data.subSerno,
              oprType: '01'
            })
          }
        })
        .then((data) => {
          if (data.code == '0') {
            if (data.data[0]) {
              _this.pkId = data.data[0].pkId;
              _this.dataUrl =
              _this.$backend.cmisBiz +
              '/api/othercnyrateappfindetails/selectByModel';
              _this.ParamUrl = {
                condition: JSON.stringify({
                  subSerno: data.data[0].ogrinSubSerno
                })
              };
            } else {
              _this.dataUrl = '';
            }
          } else {
            _this.$message({ message: '请求失败', type: 'error' });
          }
        });
    },
    // 删除
    deleteFn () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请至少选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this
        .$request({
          method: 'POST',
          url:
            backend.cmisBiz + '/api/othercnyrateloanreloldrate/updateSelective',
          data: {
            pkId: _this.pkId,
            oprType: '02'
          }
        })
        .then((data) => {
          if (data.code == '0') {
            _this.getLead();
            _this.$message({ message: '删除成功', type: 'success' });
          } else {
            _this.$message({ message: '删除失败', type: 'error' });
          }
        });
    },

    /**
     * 保存按钮
     */
    saveFn: function () {
      if (this.type == 'ADD') {
        this.addSaveFn();
      } else {
        this.editSaveFn();
      }
    },
    /**
     * 新增保存信息
     */
    addSaveFn: function () {
      var _this = this;
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var url =
        this.$backend.cmisBiz +
        '/api/othercnyrateappfindetails/addothercnyrateappfindetails';
      var data = _this.formdata;
      data['belgYear'] = '0';
      data['isSelfBank'] = '1';
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: url,
        data: _this.formdata,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.$message('保存成功');
            this.type == 'EDIT';
          } else {
            _this.$message('保存失败');
          }
        },
        error: (result, b) => {
          _this.$message('保存失败');
        }
      });
    },
    /**
     * 修改保存信息
     */
    editSaveFn: function () {
      var _this = this;
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var url =
        this.$backend.cmisBiz +
        '/api/othercnyrateappfindetails/updateothercnyrateappfindetails';
      var data = _this.formdata;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: url,
        data: _this.formdata,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.$message('保存成功');
          } else {
            _this.$message('保存失败');
          }
        },
        error: (result, b) => {
          _this.$message('保存失败');
        }
      });
    },
    // 授信分项弹层
    goLimitSubNo () {
      var _this = this;
      _this.show_dialog_subNo = true;
      _this.$nextTick(function () {
        _this.getLimitSubNo();
      });
    },
    // 获取授信分项列表
    getLimitSubNo () {
      var _this = this;
      if (_this.pageParams.data.cusId) {
        _this
          .$request({
            method: 'POST',
            data: { cusId: _this.pageParams.data.cusId },
            // data: "PF20210529000055",
            url: backend.cmisBiz + '/api/lmtappsub/getcussubandprd'
          })
          .then(({ code, message, data }) => {
            if (code == '0') {
              if (data == null) {
                _this.$message({
                  message: '该客户没有授信分项编号！',
                  type: 'warning'
                });
              } else {
                _this.replySubList = data.subList;
              }
            } else {
              _this.$message({ message: '数据更新失败！', type: 'error' });
            }
          });
      }
    },
    // 授信分项 选取
    subNoSelect () {
      var _this = this;
      // 获取选中的数据
      let jsoPar = _this.$refs.refTableSubNo.selections;
      if (jsoPar.length != 1) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      if (jsoPar[0].children) {
        _this.$xutils.showMsgBox('提示', '请选择下面的子记录进行操作!');
      } else {
        _this.formdata.subPrdSerno = jsoPar[0].subPrdSerno;
        _this.formdata.loanTerm = jsoPar[0].lmtTerm;
        _this.formdata.lmtBizTypeName = jsoPar[0].lmtBizTypeName;
        _this.formdata.lmtBizType = jsoPar[0].lmtBizType;
        _this.show_dialog_subNo = false;
      }
    },
    // 返回
    subNoCancel () {
      this.show_dialog_subNo = false;
    },

    curLprChange (value) {
      var _this = this;
      let curLpr = _this.formdata.curLpr;
      let rateFloatPoint = _this.formdata.rateFloatPoint;
      _this.formdata.execRateYear = parseFloat(curLpr) + parseFloat(rateFloatPoint) / 10000;
    },

    curRateFloatPointChange (value) {
      var _this = this;
      let curLpr = _this.formdata.curLpr;
      let rateFloatPoint = _this.formdata.rateFloatPoint;
      _this.formdata.execRateYear = parseFloat(curLpr) + parseFloat(rateFloatPoint) / 10000;
    },
    getLprRate: function (value) {
      if (value == 'A1' || value == 'A2') {
        let url = this.$backend.cmisBiz + '/api/iqploanapp/getlprrate';
        let rqData = {};
        rqData['lprRate'] = value;
        this.$request({
          url: url,
          method: 'post',
          data: rqData
        }).then((response) => {
          if (response.code === '0') {
            if (response.data.rtnCode == '000000') {
              this.formdata.curLpr = response.data.rate;
            } else {
              this.$xutils.showMsgBox('提示', response.message, 350, 150);
            }
          } else {
            this.$xutils.showMsgBox('提示', response.message, 350, 150);
          }
        });
      } else { }
    },
    /**
     * 引入按钮
     */
    importFn: function () {
      var _this = this;
      var url =
        this.$backend.cmisBiz +
        '/api/othercnyrateappfindetails/checkothercnyrateappfindetails';
      var data = _this.formdata;
      console.log('==================>>>>>>>>>>>>>>>>>>>', data);
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: url,
        data: _this.formdata,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            let dialogData = {
              thisSubSerno: _this.formdata.subSerno,
              cusId: _this.formdata.cusId
            };
            _this.$dialog.open(
              '关联原利率定价',
              'zrcbank/biz/creditManage/otherItem/otherRate/otherCnyRateApp/otherCnyRateAppFinDetails/OtherCnyRateLoanRelOldRate',
              -1,
              -1,
              dialogData,
              (param) => {
                // _this.$refs.refTable.remoteData();
                _this.getLead();
              }
            );
          } else {
            _this.$message('引入前请先进行保存操作');
          }
        },
        error: (result, b) => {
          _this.$message('引入失败');
        }
      });
    },
    // 返回列表页面
    cancelFn () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
      // 返回列表页面
      yufp.globalEventBus.$emit('refreshCurrFinDetailsTable');
    }
  }
};
</script>
