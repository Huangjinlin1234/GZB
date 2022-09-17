<template>
  <yu-tabs v-model="activeName" type="card">
    <yu-tab-pane label="基本信息" name="first">
      <yu-xform ref="refForm" label-width="200px" v-model="formdata" related-table-name="refTable">
        <yu-panel title="基本信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="入池基础资产标准" placeholder="入池基础资产标准" name="poolBasicAssetNormal" ctype="input" :disabled="!saveBtnShow"></yu-xform-item>
            <yu-xform-item label="初始起算日" placeholder="初始起算日" name="firstStartDate" ctype="datepicker" :disabled="!saveBtnShow"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="资产类型" placeholder="资产类型" name="basicAssetType" ctype="select" data-code="STD_ZB_BOTT_TYPE" disabled :rules="rule[0]"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="资产数量" placeholder="资产数量" name="assetQnt" ctype="input" maxlength="40" :disabled="!saveBtnShow"></yu-xform-item>
            <yu-xform-item label="发行人数量" placeholder="发行人数量" name="issueQnt" ctype="input" maxlength="200" :disabled="!saveBtnShow"></yu-xform-item>
            <yu-xform-item label="资产池投资金额（万元）" placeholder="资产池投资金额" name="poolInvestAmt" ctype="yu-num" number-formatter="0,000" :disabled="!saveBtnShow"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="前3大投资余额占比" placeholder="前3大投资余额占比" name="lastThrUnrepayCapPerc" ctype="yu-num" sign="%" :multiple="100" :disabled="!saveBtnShow"></yu-xform-item>
            <yu-xform-item label="前5大投资余额占比" placeholder="前5大投资余额占比" name="lastFifUnrepayCapPerc" ctype="yu-num" sign="%" :multiple="100" :disabled="!saveBtnShow"></yu-xform-item>
            <yu-xform-item label="加权平均利率" placeholder="加权平均利率" name="loanWeightAvgRate" ctype="yu-num" sign="%" :multiple="100" :disabled="!saveBtnShow"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="是否穿透至底层资产" placeholder="是否穿透至底层资产" name="isPassBasicAsset" :rules="rule[0]" @change="isPassBasicAssetChange" ctype="select" data-code="STD_ZB_YES_NO" :disabled="!saveBtnShow">
            </yu-xform-item>
            <yu-xform-item label="是否全部穿透" placeholder="是否全部穿透" name="isTotalPassBasic" :rules="rule[0]" ctype="select" data-code="STD_ZB_YES_NO" :disabled="!saveBtnShow"></yu-xform-item>
            <yu-xform-item label="是否能识别底层资产中单笔资产金额未超过1级资本净额0.15%部分" name="isBasicAsset" :rules="rule[0]" ctype="select" data-code="STD_ZB_YES_NO" :disabled="!saveBtnShow"></yu-xform-item>
            <yu-xform-item label="底层资产中单笔资产金额未超过1级资本净额0.15%部分的合计金额（万元）" name="basicAssetTotalAmt" :rules="rule[0]" ctype="yu-num" number-formatter="0,000" :disabled="!saveBtnShow"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>

        <yu-panel title="产品各级别投资情况" panel-type="simple">
          <yu-panel title="A.不同担保方式投资余额分布" panel-type="simple">
            <yu-button-drop>
              <yu-button v-show="saveBtnShow" type="primary" @click="addFnA">新增</yu-button>
              <yu-button v-show="saveBtnShow" type="primary" @click="deleteFnA">删除</yu-button>
            </yu-button-drop>
            <yu-xtable ref="refATable" condition-key="condition" selection-type="radio" row-number :data-url="dataAUrl" :base-params="ParamA" requestType="POST" style="width: 100%; height: 100%; margin-top: 5px">
              <yu-xtable-column label="担保方式" prop="guarMode" width="" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
              <yu-xtable-column label="余额占比" prop="balPerc" width="180">
                <template slot-scope="scope">
                  <span>{{ parseFloat(parseFloat(scope.row.balPerc * 100).toFixed(2)) }}%</span>
                </template>
              </yu-xtable-column>
              <yu-xtable-column label="笔数占比" prop="qntPerc" width="120">
                <template slot-scope="scope">
                  <span>{{ parseFloat(parseFloat(scope.row.qntPerc * 100).toFixed(2)) }}%</span>
                </template>
              </yu-xtable-column>
            </yu-xtable>
          </yu-panel>
          <!-- 新增弹层 -->
          <yu-xdialog :title="'不同担保方式投资余额分布' + viewTitle[viewType]" :visible.sync="dialogVisibleA" width="800px" height="400px">
            <yu-xform label-width="120px" ref="refAddFormA" :disabled="formDisabled" :form-type="formType" v-model="formdataA">
              <yu-xform-group :column="2">
                <yu-xform-item label="申请流水号" placeholder="申请流水号" name="serno" ctype="input" disabled></yu-xform-item>
              </yu-xform-group>
              <yu-xform-group :column="2">
                <yu-xform-item label="担保方式" ctype="select" placeholder="担保方式" name="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
                <yu-xform-item label="余额占比" ctype="yu-num" sign="%" :multiple="100" placeholder="余额占比" name="balPerc" :rules="rule[0]"></yu-xform-item>
                <yu-xform-item label="笔数占比" ctype="yu-num" sign="%" :multiple="100" placeholder="笔数占比" name="qntPerc" :rules="rule[0]"></yu-xform-item>
              </yu-xform-group>
              <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
                <yu-button v-show="saveBtnShow" type="primary" @click="doSaveA">保存</yu-button>
                <yu-button type="primary" @click="doCancel">返回</yu-button>
              </yu-form-buttons>
            </yu-xform>
          </yu-xdialog>
          <!-- B.不同单户余额投资余额分布 -->
          <yu-panel title="B.不同单户余额投资余额分布" panel-type="simple">
            <yu-button-drop>
              <yu-button v-show="saveBtnShow" type="primary" @click="addFnB">新增</yu-button>
              <yu-button v-show="saveBtnShow" type="primary" @click="deleteFnB">删除</yu-button>
            </yu-button-drop>
            <yu-xtable ref="refBTable" condition-key="condition" show-summary :summary-method="getSummaries" selection-type="radio" row-number :data-url="dataBUrl" :base-params="ParamB" requestType="POST"
              style="width: 100%; height: 100%; margin-top: 5px">
              <yu-xtable-column label="单户余额区间" prop="singleBalanceRange" width=""></yu-xtable-column>
              <yu-xtable-column label="余额占比" prop="balPerc" width="180">
                <template slot-scope="scope">
                  <span>{{ parseFloat(parseFloat(scope.row.balPerc * 100).toFixed(2)) }}%</span>
                </template>
              </yu-xtable-column>
              <yu-xtable-column label="笔数占比" prop="qntPerc" width="120">
                <template slot-scope="scope">
                  <span>{{ parseFloat(parseFloat(scope.row.qntPerc * 100).toFixed(2)) }}%</span>
                </template>
              </yu-xtable-column>
            </yu-xtable>
          </yu-panel>
          <!-- 新增弹层 -->
          <yu-xdialog :title="'不同单户余额投资余额分布' + viewTitle[viewType]" :visible.sync="dialogVisibleB" width="800px" height="400px">
            <yu-xform label-width="120px" ref="refAddFormB" :disabled="formDisabled" :form-type="formType" v-model="formdataB">
              <yu-xform-group :column="2">
                <yu-xform-item label="申请流水号" placeholder="申请流水号" name="serno" ctype="input" disabled></yu-xform-item>
              </yu-xform-group>
              <yu-xform-group :column="2">
                <yu-xform-item label="单户余额区间" ctype="input" placeholder="单户余额区间" name="singleBalanceRange"></yu-xform-item>
                <yu-xform-item label="余额占比" ctype="yu-num" sign="%" :multiple="100" placeholder="余额占比" name="balPerc" :rules="rule[0]"></yu-xform-item>
                <yu-xform-item label="笔数占比" ctype="yu-num" sign="%" :multiple="100" placeholder="笔数占比" name="qntPerc" :rules="rule[0]"></yu-xform-item>
              </yu-xform-group>
              <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
                <yu-button v-show="saveBtnShow" type="primary" @click="doSaveB">保存</yu-button>
                <yu-button type="primary" @click="doCancel">返回</yu-button>
              </yu-form-buttons>
            </yu-xform>
          </yu-xdialog>
          <!-- C.入池投资利率分布 -->
          <yu-panel title="C.入池投资利率分布" panel-type="simple">
            <yu-button-drop>
              <yu-button v-show="saveBtnShow" type="primary" @click="addFnC">新增</yu-button>
              <yu-button v-show="saveBtnShow" type="primary" @click="deleteFnC">删除</yu-button>
            </yu-button-drop>
            <yu-xtable ref="refCTable" condition-key="condition" show-summary :summary-method="getSummaries" selection-type="radio" row-number :data-url="dataCUrl" :base-params="ParamC" requestType="POST"
              style="width: 100%; height: 100%; margin-top: 5px">
              <yu-xtable-column label="利率分布" prop="rateDistribution" width=""></yu-xtable-column>
              <yu-xtable-column label="余额占比" prop="balPerc" width="180">
                <template slot-scope="scope">
                  <span>{{ parseFloat(parseFloat(scope.row.balPerc * 100).toFixed(2)) }}%</span>
                </template>
              </yu-xtable-column>
              <yu-xtable-column label="笔数占比" prop="qntPerc" width="120">
                <template slot-scope="scope">
                  <span>{{ parseFloat(parseFloat(scope.row.qntPerc * 100).toFixed(2)) }}%</span>
                </template>
              </yu-xtable-column>
            </yu-xtable>
          </yu-panel>
          <!-- 新增弹层 -->
          <yu-xdialog :title="'入池投资利率分布' + viewTitle[viewType]" :visible.sync="dialogVisibleC" width="800px" height="400px">
            <yu-xform label-width="120px" ref="refAddFormC" :disabled="formDisabled" :form-type="formType" v-model="formdataC">
              <yu-xform-group :column="2">
                <yu-xform-item label="申请流水号" placeholder="申请流水号" name="serno" ctype="input" disabled></yu-xform-item>
              </yu-xform-group>
              <yu-xform-group :column="2">
                <yu-xform-item label="利率分布" ctype="input" placeholder="利率分布" name="rateDistribution"></yu-xform-item>
                <yu-xform-item label="余额占比" ctype="yu-num" sign="%" :multiple="100" placeholder="余额占比" name="balPerc" :rules="rule[0]"></yu-xform-item>
                <yu-xform-item label="笔数占比" ctype="yu-num" sign="%" :multiple="100" placeholder="笔数占比" name="qntPerc" :rules="rule[0]"></yu-xform-item>
              </yu-xform-group>
              <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
                <yu-button v-show="saveBtnShow" type="primary" @click="doSaveC">保存</yu-button>
                <yu-button type="primary" @click="doCancel">返回</yu-button>
              </yu-form-buttons>
            </yu-xform>
          </yu-xdialog>
          <!-- D.入池投资剩余期限分布 -->
          <yu-panel title="D.入池投资剩余期限分布" panel-type="simple">
            <yu-button-drop>
              <yu-button v-show="saveBtnShow" type="primary" @click="addFnD">新增</yu-button>
              <yu-button v-show="saveBtnShow" type="primary" @click="deleteFnD">删除</yu-button>
            </yu-button-drop>
            <yu-xtable ref="refDTable" condition-key="condition" show-summary :summary-method="getSummaries" selection-type="radio" row-number :data-url="dataDUrl" :base-params="ParamD" requestType="POST"
              style="width: 100%; height: 100%; margin-top: 5px">
              <yu-xtable-column label="剩余期限" prop="remainingTerm" width=""></yu-xtable-column>
              <yu-xtable-column label="余额占比" prop="balPerc" width="180">
                <template slot-scope="scope">
                  <span>{{ parseFloat(parseFloat(scope.row.balPerc * 100).toFixed(2)) }}%</span>
                </template>
              </yu-xtable-column>
              <yu-xtable-column label="笔数占比" prop="qntPerc" width="120">
                <template slot-scope="scope">
                  <span>{{ parseFloat(parseFloat(scope.row.qntPerc * 100).toFixed(2)) }}%</span>
                </template>
              </yu-xtable-column>
            </yu-xtable>
          </yu-panel>
          <!-- 新增弹层 -->
          <yu-xdialog :title="'入池投资剩余期限分布' + viewTitle[viewType]" :visible.sync="dialogVisibleD" width="800px" height="400px">
            <yu-xform label-width="120px" ref="refAddFormD" :disabled="formDisabled" :form-type="formType" v-model="formdataD">
              <yu-xform-group :column="2">
                <yu-xform-item label="申请流水号" placeholder="申请流水号" name="serno" ctype="input" disabled></yu-xform-item>
              </yu-xform-group>
              <yu-xform-group :column="2">
                <yu-xform-item label="剩余期限" ctype="input" placeholder="剩余期限" name="remainingTerm"></yu-xform-item>
                <yu-xform-item label="余额占比" ctype="yu-num" sign="%" :multiple="100" placeholder="余额占比" name="balPerc" :rules="rule[0]"></yu-xform-item>
                <yu-xform-item label="笔数占比" ctype="yu-num" sign="%" :multiple="100" placeholder="笔数占比" name="qntPerc" :rules="rule[0]"></yu-xform-item>
              </yu-xform-group>
              <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
                <yu-button v-show="saveBtnShow" type="primary" @click="doSaveD">保存</yu-button>
                <yu-button type="primary" @click="doCancel">返回</yu-button>
              </yu-form-buttons>
            </yu-xform>
          </yu-xdialog>
          <!-- E.入池借款人行业分布 -->
          <yu-panel title="E.入池借款人行业分布" panel-type="simple">
            <yu-button-drop>
              <yu-button v-show="saveBtnShow" type="primary" @click="addFnE">新增</yu-button>
              <yu-button v-show="saveBtnShow" type="primary" @click="deleteFnE">删除</yu-button>
            </yu-button-drop>
            <yu-xtable ref="refETable" condition-key="condition" show-summary :summary-method="getSummaries" selection-type="radio" row-number :data-url="dataEUrl" :base-params="ParamE" requestType="POST"
              style="width: 100%; height: 100%; margin-top: 5px">
              <yu-xtable-column label="行业" prop="trade" width=""></yu-xtable-column>
              <yu-xtable-column label="余额占比" prop="balPerc" width="180">
                <template slot-scope="scope">
                  <span>{{ parseFloat(parseFloat(scope.row.balPerc * 100).toFixed(2)) }}%</span>
                </template>
              </yu-xtable-column>
              <yu-xtable-column label="笔数占比" prop="qntPerc" width="120">
                <template slot-scope="scope">
                  <span>{{ parseFloat(parseFloat(scope.row.qntPerc * 100).toFixed(2)) }}%</span>
                </template>
              </yu-xtable-column>
            </yu-xtable>
          </yu-panel>
          <!-- 新增弹层 -->
          <yu-xdialog :title="'入池投资剩余期限分布' + viewTitle[viewType]" :visible.sync="dialogVisibleE" width="800px" height="400px">
            <yu-xform label-width="120px" ref="refAddFormE" :disabled="formDisabled" :form-type="formType" v-model="formdataE">
              <yu-xform-group :column="2">
                <yu-xform-item label="申请流水号" placeholder="申请流水号" name="serno" ctype="input" disabled></yu-xform-item>
              </yu-xform-group>
              <yu-xform-group :column="2">
                <yu-xform-item label="行业" ctype="input" placeholder="行业" name="trade"></yu-xform-item>
                <yu-xform-item label="余额占比" ctype="yu-num" sign="%" :multiple="100" placeholder="余额占比" name="balPerc" :rules="rule[0]"></yu-xform-item>
                <yu-xform-item label="笔数占比" ctype="yu-num" sign="%" :multiple="100" placeholder="笔数占比" name="qntPerc" :rules="rule[0]"></yu-xform-item>
              </yu-xform-group>
              <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
                <yu-button v-show="saveBtnShow" type="primary" @click="doSaveE">保存</yu-button>
                <yu-button type="primary" @click="doCancel">返回</yu-button>
              </yu-form-buttons>
            </yu-xform>
          </yu-xdialog>
        </yu-panel>

        <yu-panel panel-type="simple">
          <yu-xform-group :column="1">
            <yu-xform-item ctype="custom" class="upload_img" style="margin-top:20px;" colspan="15">
              <yu-single-upload class="uploadbtn" dir-name="notice" :limit="1" :disabled="!saveBtnShow" :file="fileListInfo" @uploaded="uploadedFn1" @delete="deleteFileFn1" @load-number="loadNumberFn"></yu-single-upload>
            </yu-xform-item>
            <yu-xform-item label="其他说明" placeholder="其他说明" name="otherDesc" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>

        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
          <yu-button type="primary" @click="cancelFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-tab-pane>

    <!-- <yu-tab-pane v-if="group" label="底层资产明细" name="second">
      <proAssetSubInfo v-if="activeName=='second'" :children="children"></proAssetSubInfo>
    </yu-tab-pane> -->
    <yu-tab-pane label="底层资产清单(大额风险暴露）" name="third">
      <sigInvestDetails v-if="activeName=='third'" :children="children"></sigInvestDetails>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
yufp.lookup.reg(
  "STD_SX_LMT_TYPE,STD_ZB_PRD_BIZ_TYPE,STD_ZX_CUR_TYPE,STD_ZB_DEBT_INNER_LEVEL,STD_ZB_TRANS_MARKET,STD_ZB_YES_NO," +
    "STD_ZB_CUR_TYP,STD_ZB_DEBT_EVAL_RESULT,STD_ZB_LARGE_MAIN_MANAGER_TYPE,STD_ZB_BASIC_ASSET_NORMAL_TYPE,STD_ZB_NORM_INVEST_TYPE"
);
import YuSingleUpload from "@/components/widgets/YuSingleUpload";
import proAssetSubInfo from "../loanInformation/proAssetSubInfo";
import sigInvestDetails from "../sigInvestDetailsInfo/sigInvestDetailsForInfoDetail";
import {getFile, upImage, DeleteImage, tableTotal} from "@/utils/unitchange";
export default {
  mixins:[tableTotal],
  components: { YuSingleUpload, proAssetSubInfo, sigInvestDetails },
  props: {
    children: Object,
  },
  data() {
    return {
      guarDescExt: String,
      totalMoney: "",
      viewType: "ADD",
      viewTitle: yufp.lookup.find("CRUD_TYPE", false),
      formdata: {},
      formdataA: {},
      formdataB: {},
      formdataC: {},
      formdataD: {},
      formdataE: {},
      dialogVisibleA: false,
      dialogVisibleB: false,
      dialogVisibleC: false,
      dialogVisibleD: false,
      dialogVisibleE: false,
      intendActualIssuedScale: "",
      lmtAmt: "",
      fileList: [],
      fileListInfo: [],
      loadFileNum: 0, // 正在现在的文件数量
      updateurl:
        backend.cmisBiz + "/api/lmtsiginvestbasicinfo/updatePicAbsoultPath",
      rule: [
        {
          required: true,
          message: "必填项",
          trigger: "blur",
        },
        {
          validator: yufp.validator.number,
          message: "数字",
          trigger: "blur",
        },
      ],
      activeName: "first",
      group: false,
    };
  },
  created() {
    let serno, cusId, op;
    if (this.children.serno) {
      this.serno = serno = this.children.serno;
      this.cusId = cusId = this.children.cusId;
      op = this.children.op;
    } else if (this.pageParams.serno) {
      this.serno = serno = this.pageParams.serno;
      this.cusId = cusId = this.pageParams.cusId;
      op = this.pageParams.op;
    } else if (this.$route.meta.params) {
      this.serno = serno = this.$route.meta.params.serno;
      this.cusId = cusId = this.$route.meta.params.cusId;
      op = this.$route.meta.params.op;
    }
    this.dataAUrl =
      backend.cmisBiz + "/api/lmtsiginvestbasiccptanly/selectByModel";
    this.dataBUrl =
      backend.cmisBiz + "/api/lmtsiginvestbasiccptanly/selectByModel";
    this.dataCUrl =
      backend.cmisBiz + "/api/lmtsiginvestbasiccptanly/selectByModel";
    this.dataDUrl =
      backend.cmisBiz + "/api/lmtsiginvestbasiccptanly/selectByModel";
    this.dataEUrl =
      backend.cmisBiz + "/api/lmtsiginvestbasiccptanly/selectByModel";
    this.ParamA = {
      condition: JSON.stringify({
        oprType: "01",
        serno: serno,
        bottomAnalyClsValve: "10",
      }),
    };
    this.ParamB = {
      condition: JSON.stringify({
        oprType: "01",
        serno: serno,
        bottomAnalyClsValve: "20",
      }),
    };
    this.ParamC = {
      condition: JSON.stringify({
        oprType: "01",
        serno: serno,
        bottomAnalyClsValve: "30",
      }),
    };
    this.ParamD = {
      condition: JSON.stringify({
        oprType: "01",
        serno: serno,
        bottomAnalyClsValve: "40",
      }),
    };
    this.ParamE = {
      condition: JSON.stringify({
        oprType: "01",
        serno: serno,
        bottomAnalyClsValve: "50",
      }),
    };
    op == "EDIT" ? (this.saveBtnShow = true) : (this.saveBtnShow = false);
    this.getDetails(serno, cusId);
  },
  mounted: function () {
    let cl = document.getElementsByClassName("uploadbtn");
    for (var i = 0; i < cl.length; i++) {
      cl[i].getElementsByTagName("button")[0].innerText = "上传图片";
    }
  },
  methods: {
    isPassBasicAssetChange() {
      var _this = this;
      if (_this.formdata.isPassBasicAsset == "0") {
        _this.group = false;
      } else if (_this.formdata.isPassBasicAsset == "1") {
        _this.group = true;
      }
    },
    getDetails(serno, cusId) {
      var _this = this;
      _this
        .$request({
          method: "POST",
          url: backend.cmisBiz + "/api/lmtsiginvestbasicinfo/selectBySerno",
          data: {
            serno: serno,
            cusId: cusId,
          },
        })
        .then((data) => {
          if (data.code == "0") {
            let obj = data.data;
            obj.poolInvestAmt = parseFloat(parseFloat(obj.poolInvestAmt / 10000).toFixed());
            obj.basicAssetTotalAmt = parseFloat(parseFloat(obj.basicAssetTotalAmt / 10000).toFixed());
            yufp.clone(obj, _this.formdata);

            // 获取图片信息
            getFile(data.data.otherDescPicturePath, "yu-icon-img").then(
              (res) => {
                _this.fileListInfo = res;
              }
            );
          } else {
            _this.$message({ message: "请求失败", type: "error" });
          }
        });
    },
    // 取消
    doCancel() {
      this.dialogVisibleA = false;
      this.dialogVisibleB = false;
      this.dialogVisibleC = false;
      this.dialogVisibleD = false;
      this.dialogVisibleE = false;
    },

    /**
     * 保存
     */
    doSaveA: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdataA, model);
      var validate = false;
      _this.$refs.refAddFormA.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      model.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode");
      model.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode");
      model.updDate = this.$xutils.getDefaultformulaData("$CURRDATE");
      model.updateTime = this.$xutils.getDefaultformulaData("$CURRTIME");
      model.createTime = this.$xutils.getDefaultformulaData("$CURRTIME");
      var strurl = backend.cmisBiz + "/api/lmtsiginvestbasiccptanly/";
      // 向后台发送保存请求
      yufp.service.request({
        method: "POST",
        url: strurl,
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refATable.remoteData();
          _this.$message("操作成功");
          _this.dialogVisibleA = false;
        },
      });
    },

    /**
     * 新增按钮
     */
    addFnA: function () {
      var _this = this;
      _this.dialogVisibleA = true;
      _this.$nextTick(function () {
        _this.$refs.refAddFormA.resetFields();
        _this.formdataA.oprType = "01";
        _this.formdataA.serno = _this.serno;
        _this.formdataA.bottomAnalyClsValve = "10";
        _this.formdataA.pkId = this.$xutils.getSEQWithParamFromServer(
          "PK_VALUE"
        );
        _this.formdataA.inputId = this.$xutils.getDefaultformulaData(
          "$LoginLoginCode"
        );
        _this.formdataA.inputDate = this.$xutils.getDefaultformulaData(
          "$CURRDATE"
        );
        _this.formdataA.inputBrId = this.$xutils.getDefaultformulaData(
          "$LoginOrgCode"
        );
        _this.formdataA.inputIdName = this.$xutils.getDefaultformulaData(
          "$LoginUserName"
        );
        _this.formdataA.inputBrIdName = this.$xutils.getDefaultformulaData(
          "$LoginOrgName"
        );
      });
    },
    /**
     * 删除
     */
    deleteFnA: function () {
      var _this = this;
      var selections = _this.$refs.refATable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning",
        });
        return;
      }
      _this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: function (action) {
          if (action === "confirm") {
            yufp.service.request({
              method: "POST",
              url:
                backend.cmisBiz + "/api/lmtsiginvestbasiccptanly/logicalDelete",
              data: { condition: JSON.stringify({ pkId: selections[0].pkId }) },
              callback: function (code, message, response) {
                _this.$refs.refATable.remoteData();
                _this.$message("操作成功");
              },
            });
          }
        },
      });
    },

    /**
     * 保存
     */
    doSaveB: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdataB, model);
      var validate = false;
      _this.$refs.refAddFormB.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      model.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode");
      model.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode");
      model.updDate = this.$xutils.getDefaultformulaData("$CURRDATE");
      model.updateTime = this.$xutils.getDefaultformulaData("$CURRTIME");
      model.createTime = this.$xutils.getDefaultformulaData("$CURRTIME");
      var strurl = backend.cmisBiz + "/api/lmtsiginvestbasiccptanly/";
      // 向后台发送保存请求
      yufp.service.request({
        method: "POST",
        url: strurl,
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refBTable.remoteData();
          _this.$message("操作成功");
          _this.dialogVisibleB = false;
        },
      });
    },

    /**
     * 新增按钮
     */
    addFnB: function () {
      var _this = this;
      _this.dialogVisibleB = true;
      _this.$nextTick(function () {
        _this.$refs.refAddFormB.resetFields();
        _this.formdataB.oprType = "01";
        _this.formdataB.serno = _this.serno;
        _this.formdataB.bottomAnalyClsValve = "20";
        _this.formdataB.pkId = this.$xutils.getSEQWithParamFromServer(
          "PK_VALUE"
        );
        _this.formdataB.inputId = this.$xutils.getDefaultformulaData(
          "$LoginLoginCode"
        );
        _this.formdataB.inputDate = this.$xutils.getDefaultformulaData(
          "$CURRDATE"
        );
        _this.formdataB.inputBrId = this.$xutils.getDefaultformulaData(
          "$LoginOrgCode"
        );
        _this.formdataB.inputIdName = this.$xutils.getDefaultformulaData(
          "$LoginUserName"
        );
        _this.formdataB.inputBrIdName = this.$xutils.getDefaultformulaData(
          "$LoginOrgName"
        );
      });
    },
    /**
     * 删除
     */
    deleteFnB: function () {
      var _this = this;
      var selections = _this.$refs.refBTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning",
        });
        return;
      }
      _this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: function (action) {
          if (action === "confirm") {
            yufp.service.request({
              method: "POST",
              url:
                backend.cmisBiz + "/api/lmtsiginvestbasiccptanly/logicalDelete",
              data: { condition: JSON.stringify({ pkId: selections[0].pkId }) },
              callback: function (code, message, response) {
                _this.$refs.refBTable.remoteData();
                _this.$message("操作成功");
              },
            });
          }
        },
      });
    },

    /**
     * 保存
     */
    doSaveC: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdataC, model);
      var validate = false;
      _this.$refs.refAddFormC.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      model.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode");
      model.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode");
      model.updDate = this.$xutils.getDefaultformulaData("$CURRDATE");
      model.updateTime = this.$xutils.getDefaultformulaData("$CURRTIME");
      model.createTime = this.$xutils.getDefaultformulaData("$CURRTIME");
      var strurl = backend.cmisBiz + "/api/lmtsiginvestbasiccptanly/";
      // 向后台发送保存请求
      yufp.service.request({
        method: "POST",
        url: strurl,
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refCTable.remoteData();
          _this.$message("操作成功");
          _this.dialogVisibleC = false;
        },
      });
    },

    /**
     * 新增按钮
     */
    addFnC: function () {
      var _this = this;
      _this.dialogVisibleC = true;
      _this.$nextTick(function () {
        _this.$refs.refAddFormC.resetFields();
        _this.formdataC.oprType = "01";
        _this.formdataC.serno = _this.serno;
        _this.formdataC.bottomAnalyClsValve = "30";
        _this.formdataC.pkId = this.$xutils.getSEQWithParamFromServer(
          "PK_VALUE"
        );
        _this.formdataC.inputId = this.$xutils.getDefaultformulaData(
          "$LoginLoginCode"
        );
        _this.formdataC.inputDate = this.$xutils.getDefaultformulaData(
          "$CURRDATE"
        );
        _this.formdataC.inputBrId = this.$xutils.getDefaultformulaData(
          "$LoginOrgCode"
        );
        _this.formdataC.inputIdName = this.$xutils.getDefaultformulaData(
          "$LoginUserName"
        );
        _this.formdataC.inputBrIdName = this.$xutils.getDefaultformulaData(
          "$LoginOrgName"
        );
      });
    },
    /**
     * 删除
     */
    deleteFnC: function () {
      var _this = this;
      var selections = _this.$refs.refCTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning",
        });
        return;
      }
      _this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: function (action) {
          if (action === "confirm") {
            yufp.service.request({
              method: "POST",
              url:
                backend.cmisBiz + "/api/lmtsiginvestbasiccptanly/logicalDelete",
              data: { condition: JSON.stringify({ pkId: selections[0].pkId }) },
              callback: function (code, message, response) {
                _this.$refs.refCTable.remoteData();
                _this.$message("操作成功");
              },
            });
          }
        },
      });
    },

    /**
     * 保存
     */
    doSaveD: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdataD, model);
      var validate = false;
      _this.$refs.refAddFormD.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      model.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode");
      model.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode");
      model.updDate = this.$xutils.getDefaultformulaData("$CURRDATE");
      model.updateTime = this.$xutils.getDefaultformulaData("$CURRTIME");
      model.createTime = this.$xutils.getDefaultformulaData("$CURRTIME");
      var strurl = backend.cmisBiz + "/api/lmtsiginvestbasiccptanly/";
      // 向后台发送保存请求
      yufp.service.request({
        method: "POST",
        url: strurl,
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refDTable.remoteData();
          _this.$message("操作成功");
          _this.dialogVisibleD = false;
        },
      });
    },

    /**
     * 新增按钮
     */
    addFnD: function () {
      var _this = this;
      _this.dialogVisibleD = true;
      _this.$nextTick(function () {
        _this.$refs.refAddFormD.resetFields();
        _this.formdataD.oprType = "01";
        _this.formdataD.serno = _this.serno;
        _this.formdataD.bottomAnalyClsValve = "40";
        _this.formdataD.pkId = this.$xutils.getSEQWithParamFromServer(
          "PK_VALUE"
        );
        _this.formdataD.inputId = this.$xutils.getDefaultformulaData(
          "$LoginLoginCode"
        );
        _this.formdataD.inputDate = this.$xutils.getDefaultformulaData(
          "$CURRDATE"
        );
        _this.formdataD.inputBrId = this.$xutils.getDefaultformulaData(
          "$LoginOrgCode"
        );
        _this.formdataD.inputIdName = this.$xutils.getDefaultformulaData(
          "$LoginUserName"
        );
        _this.formdataD.inputBrIdName = this.$xutils.getDefaultformulaData(
          "$LoginOrgName"
        );
      });
    },
    /**
     * 删除
     */
    deleteFnD: function () {
      var _this = this;
      var selections = _this.$refs.refDTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning",
        });
        return;
      }
      _this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: function (action) {
          if (action === "confirm") {
            yufp.service.request({
              method: "POST",
              url:
                backend.cmisBiz + "/api/lmtsiginvestbasiccptanly/logicalDelete",
              data: { condition: JSON.stringify({ pkId: selections[0].pkId }) },
              callback: function (code, message, response) {
                _this.$refs.refDTable.remoteData();
                _this.$message("操作成功");
              },
            });
          }
        },
      });
    },

    /**
     * 保存
     */
    doSaveE: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdataE, model);
      var validate = false;
      _this.$refs.refAddFormE.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      model.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode");
      model.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode");
      model.updDate = this.$xutils.getDefaultformulaData("$CURRDATE");
      model.updateTime = this.$xutils.getDefaultformulaData("$CURRTIME");
      model.createTime = this.$xutils.getDefaultformulaData("$CURRTIME");
      var strurl = backend.cmisBiz + "/api/lmtsiginvestbasiccptanly/";
      // 向后台发送保存请求
      yufp.service.request({
        method: "POST",
        url: strurl,
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refETable.remoteData();
          _this.$message("操作成功");
          _this.dialogVisibleE = false;
        },
      });
    },

    /**
     * 新增按钮
     */
    addFnE: function () {
      var _this = this;
      _this.dialogVisibleE = true;
      _this.$nextTick(function () {
        _this.$refs.refAddFormE.resetFields();
        _this.formdataE.oprType = "01";
        _this.formdataE.serno = _this.serno;
        _this.formdataE.bottomAnalyClsValve = "50";
        _this.formdataE.pkId = this.$xutils.getSEQWithParamFromServer(
          "PK_VALUE"
        );
        _this.formdataE.inputId = this.$xutils.getDefaultformulaData(
          "$LoginLoginCode"
        );
        _this.formdataE.inputDate = this.$xutils.getDefaultformulaData(
          "$CURRDATE"
        );
        _this.formdataE.inputBrId = this.$xutils.getDefaultformulaData(
          "$LoginOrgCode"
        );
        _this.formdataE.inputIdName = this.$xutils.getDefaultformulaData(
          "$LoginUserName"
        );
        _this.formdataE.inputBrIdName = this.$xutils.getDefaultformulaData(
          "$LoginOrgName"
        );
      });
    },
    /**
     * 删除
     */
    deleteFnE: function () {
      var _this = this;
      var selections = _this.$refs.refETable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning",
        });
        return;
      }
      _this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: function (action) {
          if (action === "confirm") {
            yufp.service.request({
              method: "POST",
              url:
                backend.cmisBiz + "/api/lmtsiginvestbasiccptanly/logicalDelete",
              data: { condition: JSON.stringify({ pkId: selections[0].pkId }) },
              callback: function (code, message, response) {
                _this.$refs.refETable.remoteData();
                _this.$message("操作成功");
              },
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
      // 向后台发送保存请求
      model.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode");
      model.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode");
      model.updDate = this.$xutils.getDefaultformulaData("$CURRDATE");
      model.updateTime = this.$xutils.getDefaultformulaData("$CURRTIME");
      model.poolInvestAmt = parseFloat(parseFloat(model.poolInvestAmt * 10000).toFixed());
      model.basicAssetTotalAmt = parseFloat(parseFloat(model.basicAssetTotalAmt * 10000).toFixed());
      var updateurl = backend.cmisBiz + "/api/lmtsiginvestbasicinfo/updateZtqkfx";
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
    uploadedFn1(fileItem) {
      upImage(this.fileList, fileItem, this.formdata.pkId, "otherDescPicturePath", this.updateurl).then(res => {
        this.fileList = res.fileList;
        this.formdata.otherDescPicturePath = res.path;
      });
    },
    deleteFileFn1(file) {
      this.fileList = DeleteImage(this.fileList, file, this.formdata.pkId, "otherDescPicturePath", this.updateurl)
      this.formdata.otherDescPicturePath = "";
    },
  },
};
</script>
