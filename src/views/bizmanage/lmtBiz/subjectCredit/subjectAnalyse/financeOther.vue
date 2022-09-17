<template>
  <div>
    <yu-xform ref="refForm" label-width="200px" v-model="formdata" related-table-name="refTable" :rules="formRules">
      <div v-if="subType=='1'">
        <yu-panel title="基本信息" panel-type="simple">
          <yu-xform-group :column="1">
            <yu-xform-item label="企业商业模式情况" placeholder="企业商业模式情况" name="corpCommModeSitu" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="前三大主营业务占比情况" panel-type="simple">
          <yu-button-drop v-if="saveBtnShow" style="margin-bottom:10px;">
            <yu-button ref="btn_doAdd" type="primary" @click="doAdd('01')">新增</yu-button>
            <yu-button ref="btn_doDelete" type="primary" @click="doDelete('01')">删除</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable01" condition-key="condition" selection-type="radio" row-number :data-url="dataUrl1" :base-params="Param" requestType="POST" style="width: 100%; height: 100%;">
            <yu-xtable-column label="主营业务/产品" prop="mainBusi" width=""></yu-xtable-column>
            <yu-xtable-column label="占比" prop="busiRate" width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.busiRate * 1 * 100 + "%" }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="产品优势" prop="prdPred" width="180"></yu-xtable-column>
            <yu-xtable-column label="备注" prop="remark" width="280"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </div>
      <div v-else-if="subType=='2'">
        <yu-panel title="企业融资情况" panel-type="simple">
          <yu-button-drop v-if="saveBtnShow" style="margin-bottom:10px;">
            <yu-button ref="btn_doAdd" type="primary" @click="doAdd('02')">新增</yu-button>
            <yu-button ref="btn_doDelete" type="primary" @click="doDelete('02')">删除</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable02" condition-key="condition" selection-type="radio" row-number :data-url="dataUrl2" :base-params="Param" requestType="POST" style="width: 100%; height: 100%;">
            <yu-xtable-column label="所属行" prop="belongBank" width="120"></yu-xtable-column>
            <yu-xtable-column label="信贷品种" prop="creditType" width="120"></yu-xtable-column>
            <yu-xtable-column label="金额" prop="amt" width="120"></yu-xtable-column>
            <yu-xtable-column label="期限" prop="term" width="120"></yu-xtable-column>
            <yu-xtable-column label="利率" prop="rate" width="120">
              <template slot-scope="scope">
                <span>{{ parseFloat(parseFloat(scope.row.rate * 100).toFixed(2)) }}%</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarMode" width="120"></yu-xtable-column>
            <yu-xtable-column label="担保单位" prop="guarName" width="120"></yu-xtable-column>
            <yu-xtable-column label="备注" prop="remark" width=""></yu-xtable-column>
          </yu-xtable>
          <yu-xform-group :column="1" style="margin-top:20px;">
            <yu-xform-item label="融资波动原因" placeholder="融资波动原因" name="finaWaveReason" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="企业对外担保情况" panel-type="simple">
          <yu-button-drop v-if="saveBtnShow" style="margin-bottom:10px;">
            <yu-button ref="btn_doAdd" type="primary" @click="doAdd('03')">新增</yu-button>
            <yu-button ref="btn_doDelete" type="primary" @click="doDelete('03')">删除</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable03" condition-key="condition" selection-type="radio" row-number :data-url="dataUrl3" :base-params="Param" requestType="POST" style="width: 100%; height: 100%;">
            <yu-xtable-column label="性质" prop="guarCha" width="140"></yu-xtable-column>
            <yu-xtable-column label="被担保企业" prop="guaredCorpCusName" width="140"></yu-xtable-column>
            <yu-xtable-column label="贷款余额" prop="loanBalance" width="120"></yu-xtable-column>
            <yu-xtable-column label="风险分类" prop="riskClass" width="140"></yu-xtable-column>
            <yu-xtable-column label="被担保企业目前经营情况" prop="guaredCorpCurtOper" width=""></yu-xtable-column>
          </yu-xtable>
          <yu-xform-group :column="1" style="margin-top:20px;">
            <yu-xform-item label="其他对外担保情况说明" placeholder="其他对外担保情况说明" name="otherOutguarSituDesc" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
            <yu-xform-item label="或有负债情况说明" placeholder="或有负债情况说明" name="debtSituDesc" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </div>
      <div v-else-if="subType=='3'">
        <yu-panel title="授信可行性与必要性分析" panel-type="simple">
          <yu-xform-group :column="1">
            <yu-xform-item label="授信可行性分析" placeholder="授信可行性分析" name="lmtFeasyAnaly" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
            <yu-xform-item label="授信必要性分析" placeholder="授信必要性分析" name="lmtNeceyAnaly" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="风险分析及风险防控措施" panel-type="simple">
          <yu-xform-group :column="1">
            <yu-xform-item label="政策风险" placeholder="政策风险" name="policyRisk" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
            <yu-xform-item label="行业风险" placeholder="行业风险" name="tradeRisk" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"  :disabled="!saveBtnShow"></yu-xform-item>
            <yu-xform-item label="市场风险" placeholder="市场风险" name="marketRisk" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"  :disabled="!saveBtnShow"></yu-xform-item>
            <yu-xform-item label="经营管理风险" placeholder="经营管理风险" name="operManaRisk" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"  :disabled="!saveBtnShow"></yu-xform-item>
            <yu-xform-item label="财务风险" placeholder="财务风险" name="finaRisk" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"  :disabled="!saveBtnShow"></yu-xform-item>
            <yu-xform-item label="互保、循环担保、关联担保的风险" placeholder="互保、循环担保、关联担保的风险" name="grtRisk" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"  :disabled="!saveBtnShow"></yu-xform-item>
            <yu-xform-item label="过度授信风险" placeholder="过度授信风险" name="overLmtRisk" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"  :disabled="!saveBtnShow"></yu-xform-item>
            <yu-xform-item label="预警客户风险说明" placeholder="预警客户风险说明" name="altCusRiskDesc" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"  :disabled="!saveBtnShow"></yu-xform-item>
            <yu-xform-item label="其他风险说明" placeholder="其他风险说明" name="otherRiskDesc" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"  :disabled="!saveBtnShow"></yu-xform-item>
            <yu-xform-item label="综合业务风险分析" placeholder="综合业务风险分析" name="inteBizRiskAnaly" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
            <yu-xform-item label="风险防控措施说明" placeholder="风险防控措施说明" name="riskPacmDesc" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </div>

      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
        <yu-button type="primary" @click="cancelFn">返回</yu-button>
      </div>
    </yu-xform>
    <!-- 新增弹层 -->
    <yu-xdialog title="新建" :visible.sync="show_dialog" width="800px" height="300px">
      <yu-xform v-show="addType=='01'" label-width="200px" ref="addForm1" :form-type="formType" v-model="addFormData1">
        <yu-xform-group :column="2">
          <yu-xform-item label="主营业务/产品" ctype="input" name="mainBusi" placeholder="主营业务/产品" rules="required"></yu-xform-item>
          <yu-xform-item label="占比" ctype="yu-num" name="busiRate" placeholder="占比" sign="%" maxlength="3" rules="required" @change="signLimit"></yu-xform-item>
          <yu-xform-item label="产品优势" ctype="input" name="prdPred" placeholder="产品优势" rules="required"></yu-xform-item>
          <yu-xform-item label="备注" ctype="input" name="remark" placeholder="备注" rules="required"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xform v-show="addType=='02'" label-width="200px" ref="addForm2" :form-type="formType" v-model="addFormData2">
        <yu-xform-group :column="2">
          <yu-xform-item label="所属行" ctype="input" name="belongBank" placeholder="所属行" rules="required"></yu-xform-item>
          <yu-xform-item label="信贷品种" ctype="input" name="creditType" placeholder="信贷品种" rules="required"></yu-xform-item>
          <yu-xform-item label="金额" ctype="yu-num" name="amt" placeholder="金额" rules="required"></yu-xform-item>
          <yu-xform-item label="期限" ctype="yu-num" name="term" placeholder="期限" rules="required"></yu-xform-item>
          <yu-xform-item label="利率" ctype="yu-num" sign="%" :multiple="100" name="rate" placeholder="利率" rules="required"></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="input" name="guarMode" placeholder="担保方式" rules="required"></yu-xform-item>
          <yu-xform-item label="担保单位" ctype="input" name="guarName" placeholder="担保单位" rules="required"></yu-xform-item>
          <yu-xform-item label="备注" ctype="input" name="remark" placeholder="备注" rules="required"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xform v-show="addType=='03'" label-width="200px" ref="addForm3" :form-type="formType" v-model="addFormData3">
        <yu-xform-group :column="2">
          <yu-xform-item label="性质" ctype="select" name="guarCha" placeholder="性质" data-code="STD_ZB_GUAR_CHA" rules="required"></yu-xform-item>
          <yu-xform-item label="被担保企业" ctype="input" name="guaredCorpCusName" placeholder="被担保企业" rules="required"></yu-xform-item>
          <yu-xform-item label="贷款余额" ctype="yu-num" name="loanBalance" placeholder="贷款余额" rules="required"></yu-xform-item>
          <yu-xform-item label="风险分类" ctype="input" name="riskClass" placeholder="风险分类" rules="required"></yu-xform-item>
          <yu-xform-item label="被担保企业目前经营情况" ctype="input" name="guaredCorpCurtOper" placeholder="被担保企业目前经营情况" rules="required"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button  v-norepeat.loading type="primary" @click="doNext">下一步</yu-button>
        <yu-button type="primary" @click="doCancel">关闭</yu-button>
      </yu-form-buttons>
    </yu-xdialog>
  </div>
</template>
<script>
yufp.lookup.reg("STD_ZB_GUAR_CHA");
export default {
  props: {
    children: Object,
    pageParams: Object,
    dialogId: String,
  },
  data() {
    return {
      dataUrl1: backend.cmisBiz + "/api/lmtsiginvestrelmainbuss/selectByModel",
      dataUrl2: backend.cmisBiz + "/api/lmtsiginvestrelcapitinfo/selectByModel",
      dataUrl3:
        backend.cmisBiz + "/api/lmtsiginvestrelcusoutguar/selectByModel",
      Param: {
        condition: JSON.stringify({
          oprType: "01",
          serno: this.children ? this.children.serno : this.pageParams.serno,
        }),
      },
      show_dialog: false,
      label_1: "",
      formDate: {
        cusFncDate: "",
      },
      addType: "",
      busiRate: "",
    };
  },
  created() {
    console.log(
      "=================financeOther",
      this.children,
      this.pageParams
    );
    let serno, cusId, op, subType;
    if (this.children) {
      this.serno = serno = this.children.serno;
      this.cusId = cusId = this.children.cusId;
      this.customer = this.children.customer;
      op = this.children.op;
      subType = this.subType = this.children.subType; // 1经营情况 2融资、对外担保、或有负 3其他情况
    } else {
      this.serno = serno = this.pageParams.serno;
      this.cusId = cusId = this.pageParams.cusId;
      this.customer = this.pageParams.customer;
      op = this.pageParams.op;
      subType = this.subType = this.children.subType; // 1经营情况 2融资、对外担保、或有负 3其他情况
    }
    op == "EDIT" ? (this.saveBtnShow = true) : (this.saveBtnShow = false);

    // 获取详情
    if (subType == "1" || subType == "2") {
      // 经营情况   融资、对外担保、或有负
      this.getDetails(
        "/api/lmtsiginvestrelfinainfo/selectBySerno",
        serno,
        cusId
      );
    } else if (subType == "3") {
      //其他情况
      this.getDetails("/api/lmtsiginvestriskanly/selectBySerno", serno, cusId);
    }
  },
  methods: {
    // 不超过100%限制
    signLimit(value) {
      // let busiRate = this.addFormData.busiRate;
      if (value > 100) {
        this.$message({ message: "占比不能超过100%", type: "error" });
        // this.busiRate = 100;
        this.addFormData1.busiRate = 100;
      } else {
      }
    },
    // 获取数据
    getDetails(url, serno, cusId) {
      var _this = this;
      _this
        .$request({
          method: "POST",
          url: backend.cmisBiz + url,
          data: {
            serno: serno,
            cusId: cusId,
          },
        })
        .then((data) => {
          if (data.code == "0") {
            console.log("==================", data);
            yufp.clone(data.data, _this.formdata);
          }
        })
        .catch(() => {
          _this.$message({ message: "请求失败", type: "error" });
        });
    },
    doAdd(type) {
      var _this = this;
      _this.show_dialog = true;
      // 组件bug ==>  yu-num、num 的组件  resetFields()无法重置清空
      if (type == "01") {
        _this.addType = "01";
        _this.$nextTick(() => {
          _this.$refs.addForm1.resetFields();
        });
        // _this.busiRate = "";
      } else if (type == "02") {
        _this.addType = "02";
        _this.$nextTick(() => {
          _this.$refs.addForm2.resetFields();
          _this.addFormData2.amt = "";
          _this.addFormData2.term = "";
          _this.addFormData2.rate = "";
        });
      } else if (type == "03") {
        _this.addType = "03";
        _this.$nextTick(() => {
          _this.$refs.addForm3.resetFields();
          _this.addFormData3.loanBalance = "";
        });
      }
    },
    // 下一步
    doNext() {
      var _this = this;
      var validate = false;

      let url,
        formdata = {};
      let addType = _this.addType;
      if (addType == "01") {
        _this.$refs.addForm1.validate(function (valid) {
          validate = valid;
        });
        url = "/api/lmtsiginvestrelmainbuss/insert";
        formdata = _this.addFormData1;
        formdata.busiRate = parseFloat(
          parseFloat((formdata.busiRate * 1) / 100).toFixed(6)
        );
      } else if (addType == "02") {
        _this.$refs.addForm2.validate(function (valid) {
          validate = valid;
        });
        url = "/api/lmtsiginvestrelcapitinfo/insert";
        formdata = _this.addFormData2;
      } else if (addType == "03") {
        _this.$refs.addForm3.validate(function (valid) {
          validate = valid;
        });
        url = "/api/lmtsiginvestrelcusoutguar/insert";
        formdata = _this.addFormData3;
      }
      formdata.cusId = _this.cusId;
      formdata.serno = _this.serno;
      formdata.oprType = "01";

      if (!validate) {
        let busiRate = _this.busiRate;
        if (busiRate > 100) {
          _this.$message({ message: "占比不能超过100%", type: "error" });
        }
        _this.$message({
          message: "数据验证不通过，请修改后重新提交！",
          type: "error",
        });
        return;
      }

      add(url, formdata);
      function add(url, formdata) {
        _this
          .$request({
            method: "POST",
            url: backend.cmisBiz + url,
            data: formdata,
          })
          .then((data) => {
            if (data.code == "0") {
              _this.show_dialog = false;
              try {
                _this.$refs.refTable01.remoteData();
              } catch (e) {}
              try {
                _this.$refs.refTable02.remoteData();
              } catch (e) {}
              try {
                _this.$refs.refTable03.remoteData();
              } catch (e) {}

              _this.$message({ message: "新增成功", type: "success" });
            } else {
              _this.$message({ message: "新增失败", type: "error" });
            }
          })
          .catch(() => {});
      }
    },
    doDelete(type) {
      let jsoPar, url;
      if (type == "01") {
        jsoPar = this.$refs.refTable01.selections;
        url = "/api/lmtsiginvestrelmainbuss/deleteLogicByPkId";
      } else if (type == "02") {
        jsoPar = this.$refs.refTable02.selections;
        url = "/api/lmtsiginvestrelcapitinfo/deleteLogicByPkId";
      } else if (type == "03") {
        jsoPar = this.$refs.refTable03.selections;
        url = "/api/lmtsiginvestrelcusoutguar/deleteLogicByPkId";
      }
      if (jsoPar.length != 1) {
        this.$xutils.showMsgBox("提示", "必须选择一条记录进行操作!");
        return;
      }
      console.log("==============pkid", jsoPar[0].pkId);
      var _this = this;
      _this.$confirm("你真的想删除选中的记录行? 请谨慎操作!", "提示", {
        type: "warning",
        center: false,
        callback: (action) => {
          if (action === "confirm") {
            _this
              .$request({
                method: "POST",
                url: backend.cmisBiz + url,
                data: {
                  pkId: jsoPar[0].pkId,
                },
              })
              .then((data) => {
                if (data.code == "0") {
                  _this.$message({ message: "删除成功", type: "success" });
                  console.log("==================删除");
                  try {
                    _this.$refs.refTable01.remoteData();
                  } catch (e) {}
                  try {
                    _this.$refs.refTable02.remoteData();
                  } catch (e) {}
                  try {
                    _this.$refs.refTable03.remoteData();
                  } catch (e) {}
                } else {
                  _this.$message({ message: "删除失败", type: "error" });
                }
              });
          }
        },
      });
    },
    saveFn: function () {
      var validate = false,
        _this = this;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: "数据验证不通过，请修改后重新保存！",
          type: "error",
        });
        return;
      }

      var model = {};

      yufp.clone(_this.formdata, model);
      model.serno = this.serno;
      model.cusId = this.cusId;
      console.log("=========================保存", model);
      // 向后台发送保存请求
      // model.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode");
      // model.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode");
      // model.updDate = this.$xutils.getDefaultformulaData("$CURRDATE");
      // model.updateTime = this.$xutils.getDefaultformulaData("$CURRTIME");
      let updateurl;
      if (this.subType == "1" || this.subType == "2") {
        updateurl =
          backend.cmisBiz + "/api/lmtsiginvestrelfinainfo/updateSelective";
      } else if (this.subType == "3") {
        updateurl = backend.cmisBiz + "/api/lmtsiginvestriskanly/update";
      }
      yufp.service.request({
        method: "POST",
        url: updateurl,
        data: model,
        callback: function (code, message, response) {
          if (code == "0") {
            // _this.$refs.refTable.remoteData();
            _this.$message("修改成功");
          } else {
            _this.$message({ message: "修改失败", type: "error" });
          }
        },
      });
    },
    // 返回
    cancelFn() {
      this.$emit("changed", false);
    },
    doCancel() {
      this.show_dialog = false;
    },
    //上传影像
    upImage() {},
    // 影像下载
    downImage() {},
    // 选择年份填充表头label
    onChanged(val) {
      let year_1 = "";
      let year_2 = "";
      let year = "";
      if (val) {
        let date = getTime(val);
        this.cusFncDate = date;
        yufp.clone(date, this.formDate.cusFncDate);
        console.log("===========formdata", this.formdata);
        // this.formdata.cusFncDate = date;
        date = date.split("-");
        year_2 = Number(date[0]) - 2;
        year_1 = Number(date[0]) - 1;
        year = Number(date[0]);
      } else {
      }
      this.label_1 = year_2 + "科目值";
      this.label_2 = year_2 + "较上期涨幅";
      this.label_3 = year_1 + "科目值";
      this.label_4 = year_1 + "较上期涨幅";
      this.label_5 = year + "科目值";
      function getTime(time) {
        if (time == "undefined" || time == null || time == "") {
          return "";
        }
        var date = new Date(time);
        var y = date.getFullYear();
        var m =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return y + "-" + m + "-" + d;
      }
    },
  },
};
</script>