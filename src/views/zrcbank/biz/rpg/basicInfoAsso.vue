
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
    <personalBusiness v-if="person" :param="param" ref="personalRef"></personalBusiness>
    <div v-if="asso">
      <yu-panel title="企业基本情况" panel-type="simple">
        <yu-xform ref="baseForm" label-width="120px" v-model="baseFormData" :disabled="op =='VIEW'">
          <yu-xform-group :clomn="2">
            <yu-xform-item label="企业全称" name="cusName" ctype="input"></yu-xform-item>
            <yu-xform-item label="企业性质" name="corpCha" ctype="select" data-code="STD_ZB_CORP_QLTY" ></yu-xform-item>
            <yu-xform-item label="主体评级" name="subjectLevel" ctype="select" data-code="STD_ZB_GRADE_RANK" ></yu-xform-item>
            <yu-xform-item label="现五级分类" name="currentFiveClass" ctype="select" data-code="STD_FIVE_CLASS" ></yu-xform-item>
            <yu-xform-item label="成立日期" name="buildDate" ctype="datepicker" ></yu-xform-item>
            <yu-xform-item label="行业分类" name="tradeClass" ctype="yu-xdic-tree" @select-fn="commonSelectFn" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" ></yu-xform-item>
            <yu-xform-item label="注册资本" name="regiCapAmt" ctype="yu-num" ></yu-xform-item>
            <yu-xform-item label="实收资本" name="paidCapAmt" ctype="yu-num" ></yu-xform-item>
            <yu-xform-item label="实际控制人" name="realOperCusId" ctype="input" ></yu-xform-item>
            <yu-xform-item label="法人代表" name="legal" ctype="input" ></yu-xform-item>
            <yu-xform-item label="注册地址" name="comRegAdd" ctype="input" ></yu-xform-item>
            <yu-xform-item label="实际经营地址" name="operAddrAct" ctype="input" ></yu-xform-item>
            <yu-xform-item label="经营范围" name="natBusi" ctype="textarea" ></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <yu-panel title="股东情况" panel-type="simple">
        <yu-toolbar :show-length="8" style="margin-bottom:10px;">
              <yu-button type="primary" @click="addShar" v-show="op!='VIEW'">添加</yu-button>
              <yu-button type="primary" @click="upShar" v-show="op!='VIEW'">修改</yu-button>
              <yu-button type="primary" @click="delShar" v-show="op!='VIEW'">删除</yu-button>
            </yu-toolbar>
        <yu-xtable ref="sharTable" row-number  show-summary :summary-method="getSummaries" :pageable="false" :data="sharData"  :default-load="false"   request-type="POST">
          <yu-xtable-column prop="shdCusName" label="股东姓名"></yu-xtable-column>
          <yu-xtable-column prop="permiumAmt" label="认缴金额"></yu-xtable-column>
          <yu-xtable-column prop="perc" label="占比">
          <template slot-scope="scope">
              {{ isNaN(scope.row.perc)? '':Number(scope.row.perc*100).toFixed(2) + '%' }}
          </template>
          </yu-xtable-column>
          <yu-xtable-column prop="paidCap" label="实收资本(万元)"></yu-xtable-column>
          <yu-xtable-column prop="invApp" label="出资方式" data-code="STD_ZB_INVT_TYPE"></yu-xtable-column>
          <yu-xtable-column prop="remark" label="备注"></yu-xtable-column>
        </yu-xtable>
        <yu-xdialog title="股东情况" :visible.sync="dialogShar" width="1000px">
              <yu-xform ref="sharDialog" label-width="160px" v-model="formdataShar">
                <yu-xform-group :column="2">
                  <yu-xform-item label="股东姓名" name="shdCusName" rules="required" ctype="input"></yu-xform-item>
                  <yu-xform-item label="认缴金额" name="permiumAmt" rules="required" ctype="yu-num"></yu-xform-item>
                  <yu-xform-item label="占比" name="perc" rules="required" ctype="yu-num" sign="%" :multiple="100"></yu-xform-item>
                  <yu-xform-item label="实收资本(万元)" name="paidCap" ctype="yu-num"></yu-xform-item>
                  <yu-xform-item label="出资方式" name="invApp" ctype="select" data-code="STD_ZB_INVT_TYPE"></yu-xform-item>
                  <yu-xform-item label="备注" name="remark" ctype="input"></yu-xform-item>
                </yu-xform-group>
                <div class="yu-grpButton">
                  <yu-button type="primary" @click="saveShar">保存</yu-button>
                  <yu-button type="primary" @click="backShar">返回</yu-button>
                </div>
              </yu-xform>
            </yu-xdialog>
        <yu-xform ref="otherDescForm" label-width="160px" v-model="otherDescData" :disabled="op =='VIEW'">
          <yu-xform-group :column="2">
            <yu-xform-item label="股东情况其他说明" name="shdCaseOtherMemo" ctype="textarea"></yu-xform-item>
            <yu-xform-item label="其他需说明的事项" name="basicOtherNeedDesc" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="4">
            <yu-xform-item label="是否涉农" name="agrInd" ctype="select" rules="required" data-code="STD_ZB_YES_NO" ></yu-xform-item>
            <yu-xform-item label="是否小微" name="smallInd" ctype="select" data-code="STD_ZB_YES_NO" ></yu-xform-item>
            <yu-xform-item label="是否制造业" name="manuInd" ctype="select" data-code="STD_ZB_YES_NO" ></yu-xform-item>
            <yu-xform-item label="是否两高一剩" name="twoHightOneLeftInd" ctype="select" data-code="STD_ZB_YES_NO" ></yu-xform-item>
            <yu-xform-item label="是否为我行规定的9类易燃易爆行业" label-width="140px" name="burnExplodeIndustryInd" ctype="select" data-code="STD_ZB_YES_NO" ></yu-xform-item>
            <yu-xform-item label="环保是否达标" name="environStandInd" ctype="select" data-code="STD_RPT_ENV_CLASS" rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <div v-if="!lowRisk">
        <div v-if="personAsso">
          <yu-panel title="企业基本情况" panel-type="simple">
            <yu-xform ref="infoForm" label-width="160px" v-model="infoData" :disabled="op =='VIEW'">
              <yu-xform-group :column="1">
                <yu-xform-item label="公司历史沿革" name="companyHistory" ctype="textarea" rules="required"></yu-xform-item>
                <yu-xform-item label="目前主要业务概况、经营模式、盈利模式" name="mainBusiness" ctype="textarea" rules="required"></yu-xform-item>
                <yu-xform-item label="企业环评情况及安全生产情况" name="cusEiaSafeCase" ctype="textarea" rules="required"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
            <yu-panel title="各种资质证明或文件" panel-type="simple">
            <yu-toolbar :show-length="8" style="margin-bottom:10px;">
              <yu-button type="primary" @click="addCertifi" v-show="op!='VIEW'">添加</yu-button>
              <yu-button type="primary" @click="upCertifi" v-show="op!='VIEW'">修改</yu-button>
              <yu-button type="primary" @click="delCertifi" v-show="op!='VIEW'">删除</yu-button>
            </yu-toolbar>
              <yu-xtable ref="certifiTable" row-number  :data="certifiData" :pageable="false" :default-load="false"  request-type="POST">
                <yu-xtable-column prop="liceNo" label="证书编号"></yu-xtable-column>
                <yu-xtable-column prop="liceName" label="证书名称"></yu-xtable-column>
                <yu-xtable-column prop="liceIdate" label="有效期"></yu-xtable-column>
              </yu-xtable>
              <yu-xdialog title="各种资质证明或文件" :visible.sync="dialogCertifi" width="1000px">
              <yu-xform ref="certifiDialog" label-width="160px" v-model="formdataCertifi">
                <yu-xform-group :column="2">
                  <yu-xform-item label="证书编号" name="liceNo" rules="required" ctype="input"></yu-xform-item>
                  <yu-xform-item label="证书名称" name="liceName" rules="required" ctype="input"></yu-xform-item>
                  <yu-xform-item label="有效期" name="liceIdate" rules="required" ctype="datepicker"></yu-xform-item>
                </yu-xform-group>
                <div class="yu-grpButton">
                  <yu-button type="primary" @click="saveCertifi">保存</yu-button>
                  <yu-button type="primary" @click="backCertifi">返回</yu-button>
                </div>
              </yu-xform>
            </yu-xdialog>
            </yu-panel>
          </yu-panel>
        </div>
        <yu-panel title="有形资产情况" panel-type="simple">
          <yu-panel title="企业固定资产情况" panel-type="simple">
            <yu-toolbar :show-length="8" style="margin-bottom:10px;">
              <yu-button type="primary" @click="addEstate" v-show="op!='VIEW'">添加</yu-button>
              <yu-button type="primary" @click="upEstate" v-show="op!='VIEW'">修改</yu-button>
              <yu-button type="primary" @click="delEstate" v-show="op!='VIEW'">删除</yu-button>
            </yu-toolbar>
            <yu-xtable ref="estateTable" row-number show-summary :summary-method="getSummaries1" :data-url="estateUrl" :pageable="false" :base-params="estateData" request-type="POST">
              <yu-xtable-column prop="landCha" data-code="STD_RPT_LAND_CHA" label="所属性质"></yu-xtable-column>
              <yu-xtable-column prop="landCusName" label="企业名称"></yu-xtable-column>
              <yu-xtable-column label="资产"  align="center">
                <yu-xtable-column prop="assetProType" label="项目" data-code="STD_RPT_ASSET_TYP"></yu-xtable-column>
                <yu-xtable-column prop="assetCertProSqu" label="有证面积"></yu-xtable-column>
                <yu-xtable-column prop="assetProSqu" label="无证面积"></yu-xtable-column>
              </yu-xtable-column>
              <yu-xtable-column label="账面价值">
                <yu-xtable-column prop="origiCertPaperValue" label="有证原值"></yu-xtable-column>
                <yu-xtable-column prop="equityCertPaperValue" label="有证净值"></yu-xtable-column>
                <yu-xtable-column prop="origiPaperValue" label="无证原值"></yu-xtable-column>
                <yu-xtable-column prop="equityPaperValue" label="无证净值"></yu-xtable-column>
              </yu-xtable-column>
              <yu-xtable-column label="目前抵押情况" width="250px">
                <yu-xtable-column prop="currGuarCaseBank" label="抵押行"></yu-xtable-column>
                <yu-xtable-column prop="currGuarCaseMainPart" label="承货主体"></yu-xtable-column>
                <yu-xtable-column prop="currGuarCaseLoanAmt" label="抵押金额"></yu-xtable-column>
              </yu-xtable-column>
              <yu-xtable-column prop="remark" label="备注"></yu-xtable-column>
            </yu-xtable>
            <yu-xdialog title="企业固定资产情况" :visible.sync="dialogEstate" width="1000px">
              <yu-xform ref="estateDialog" label-width="160px" v-model="formdataEstate">
                <yu-xform-group :column="2">
                  <yu-xform-item label="所属性质" name="landCha" rules="required" ctype="select" data-code="STD_RPT_LAND_CHA"></yu-xform-item>
                  <yu-xform-item label="所属企业名称" name="landCusName" rules="required" ctype="input"></yu-xform-item>
                  <yu-xform-item label="资产项目类型" name="assetProType" rules="required" ctype="select" data-code="STD_RPT_ASSET_TYP"></yu-xform-item>
                  <yu-xform-item label="有证面积" name="assetCertProSqu" ctype="input"></yu-xform-item>
                  <yu-xform-item label="无证面积" name="assetProSqu" ctype="input"></yu-xform-item>
                  <yu-xform-item label="有证原值" name="origiCertPaperValue" rules="required" ctype="yu-num"></yu-xform-item>
                  <yu-xform-item label="有证净值" name="equityCertPaperValue" rules="required" ctype="yu-num"></yu-xform-item>
                  <yu-xform-item label="无证原值" name="origiPaperValue" rules="required" ctype="yu-num"></yu-xform-item>
                  <yu-xform-item label="无证净值" name="equityPaperValue" rules="required" ctype="yu-num"></yu-xform-item>
                  <yu-xform-item label="抵押行抵押情况" name="currGuarCaseBank" ctype="input"></yu-xform-item>
                  <yu-xform-item label="承货主体" name="currGuarCaseMainPart" ctype="input"></yu-xform-item>
                  <yu-xform-item label="抵押贷款金额" name="currGuarCaseLoanAmt" rules="required" ctype="yu-num"></yu-xform-item>
                  <yu-xform-item label="备注" name="remark" ctype="textarea"></yu-xform-item>
                </yu-xform-group>
                <div class="yu-grpButton">
                  <yu-button type="primary" @click="saveEstate">保存</yu-button>
                  <yu-button type="primary" @click="backEstate">返回</yu-button>
                </div>
              </yu-xform>
            </yu-xdialog>
            <yu-xform ref="estateOtherDesc" label-width="220px" v-model="estateOtherDescData" :disabled="op =='VIEW'">
              <yu-xform-group :column="1">
                <yu-xform-item label="其他需说明的事项" name="estateOtherNeedDesc" ctype="textarea"></yu-xform-item>
              </yu-xform-group>
              <yu-xform-group :column="3">
                <yu-xform-item label="租用土地面积" name="rentLandSqu" unit="亩" ctype="yu-num"></yu-xform-item>
                <yu-xform-item label="租用厂房面积" name="rentWorkshopSqu" unit="平方" ctype="yu-num"></yu-xform-item>
                <yu-xform-item label="租用年租金" name="rentAmtYear" unit="万元" ctype="yu-num"></yu-xform-item>
                <yu-xform-item label="自有土地面积" name="selfLandSqu" unit="亩" ctype="yu-num"></yu-xform-item>
                <yu-xform-item label="其中:自有有证土地面积" name="selfCertLandSqu" unit="亩" ctype="yu-num"></yu-xform-item>
                <yu-xform-item label="自有有证土地性质" name="selfCertLandCha" data-code="STD_LAND_CHA" ctype="select"></yu-xform-item>
                <yu-xform-item label="自有房产面积" name="selfHouseSqu" unit="平方" ctype="yu-num"></yu-xform-item>
                <yu-xform-item label="其中:自有有证房产面积" name="selfCertHouseSqu" unit="平方" ctype="yu-num"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </yu-panel>
          <yu-panel title="企业及个人名下资产情况" panel-type="simple">
            <yu-toolbar :show-length="8" style="margin-bottom:10px;">
              <yu-button type="primary" @click="addFamily" v-show="op!='VIEW'">添加</yu-button>
              <yu-button type="primary" @click="upFamily" v-show="op!='VIEW'">修改</yu-button>
              <yu-button type="primary" @click="delFamily" v-show="op!='VIEW'">删除</yu-button>
            </yu-toolbar>
            <yu-xtable ref="familyTable" row-number show-summary :summary-method="getSummaries2" :data-url="familyUrl" :pageable="false" :base-params="familyData" request-type="POST">
              <yu-xtable-column prop="assetType" label="资产类型" data-code="STD_ASSO_ASSET_TYPE"></yu-xtable-column>
              <yu-xtable-column prop="assetOwner" label="所有权人"></yu-xtable-column>
              <yu-xtable-column prop="gerpcPosiInvestCase" label="地理位置/被投资公司/理财等" width="250px"></yu-xtable-column>
              <yu-xtable-column prop="origiValue" label="投入原值"></yu-xtable-column>
              <yu-xtable-column prop="assetRange" label="资产范围"  data-code="STD_ASSET_RANGE"></yu-xtable-column>
              <yu-xtable-column prop="marketValue" label="市场价值"></yu-xtable-column>
              <yu-xtable-column prop="gaurInd" label="是否抵质押" data-code="STD_ZB_YES_NO"></yu-xtable-column>
              <yu-xtable-column prop="enterprisesRelation" label="与企业关系" data-code="STD_ASSO_RELATION"></yu-xtable-column>
              <yu-xtable-column prop="hasGuarAmt" label="已抵押金额" ></yu-xtable-column>
              <yu-xtable-column prop="remark" label="备注"></yu-xtable-column>
            </yu-xtable>
          </yu-panel>
          <yu-xdialog title="企业及个人名下资产情况" :visible.sync="dialogFamily" width="1000px">
            <yu-xform ref="familyDialog" label-width="160px" v-model="formdataFamily">
              <yu-xform-group :column="2">
                <yu-xform-item label="所有权人" name="assetOwner" rules="required" ctype="input"></yu-xform-item>
                <yu-xform-item label="资产类型" name="assetType" rules="required" ctype="select" data-code="STD_ASSO_ASSET_TYPE"></yu-xform-item>
                <yu-xform-item label="投入原值" name="origiValue" rules="required" ctype="input"></yu-xform-item>
                <yu-xform-item label="地理位置/被投资公司/理财等" name="gerpcPosiInvestCase" ctype="input"></yu-xform-item>
                <yu-xform-item label="市场价值" name="marketValue" rules="required" ctype="input"></yu-xform-item>
                <yu-xform-item label="是否抵质押" name="gaurInd" rules="required" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
                <yu-xform-item label="资产范围" name="assetRange" ctype="select" rules="required" data-code="STD_ASSET_RANGE" @change="choseAssetRange"></yu-xform-item>
                <yu-xform-item label="与企业关系" name="enterprisesRelation" ctype="select" rules="required"  data-code="STD_ASSO_RELATION"></yu-xform-item>
                <yu-xform-item label="已抵押金额" name="hasGuarAmt" ctype="yu-num" v-if="hxRange" rules="required"></yu-xform-item>
                <yu-xform-item label="备注" name="remark" ctype="textarea"></yu-xform-item>
              </yu-xform-group>
              <div class="yu-grpButton">
                <yu-button type="primary" @click="saveFamily">保存</yu-button>
                <yu-button type="primary" @click="backFamily">返回</yu-button>
              </div>
            </yu-xform>
          </yu-xdialog>
        </yu-panel>
        <div v-if="personAsso">
          <yu-panel title="关联企业情况" panel-type="simple">
            <yu-toolbar :show-length="8" style="margin-bottom:10px;">
              <yu-button type="primary" @click="addEnterprises" v-show="op!='VIEW'">添加</yu-button>
              <yu-button type="primary" @click="upEnterprises" v-show="op!='VIEW'">修改</yu-button>
              <yu-button type="primary" @click="delEnterprises" v-show="op!='VIEW'">删除</yu-button>
            </yu-toolbar>
            <yu-xtable ref="enterprisesTable" row-number :data-url="enterprisesUrl" :pageable="false" :base-params="enterprisesData" request-type="POST">
              <yu-xtable-column prop="relCusName" width="120px" label="关联企业名称"></yu-xtable-column>
              <yu-xtable-column prop="regiCapAmt" width="120px" label="注册资本"></yu-xtable-column>
              <yu-xtable-column prop="stkStr" width="120px" label="股权结构"></yu-xtable-column>
              <yu-xtable-column prop="mainBusi" width="120px" label="主营业务"></yu-xtable-column>
              <yu-xtable-column prop="landSqu" width="120px" label="土地（平方）"></yu-xtable-column>
              <yu-xtable-column prop="houseSqu" width="120px" label="房产（平方）"></yu-xtable-column>
              <yu-xtable-column prop="pldCase" width="120px" label="抵押情况"></yu-xtable-column>
              <yu-xtable-column prop="lastYearSale" width="120px" label="上年销售"></yu-xtable-column>
              <yu-xtable-column prop="profit" width="120px" label="净利润"></yu-xtable-column>
              <yu-xtable-column prop="currAssTotal" width="120px" label="本期资产总额"></yu-xtable-column>
              <yu-xtable-column prop="currPureAssetValue" width="120px" label="本期净资产"></yu-xtable-column>
              <yu-xtable-column prop="otherBankLmt" width="120px" label="他行融资额度"></yu-xtable-column>
              <yu-xtable-column prop="outguarTotalLmt" width="120px" label="对外担保额度"></yu-xtable-column>
            </yu-xtable>
            <yu-xform ref="enterprisesOtherDesc" label-width="220px" v-model="enterprisesOtherDescData" :disabled="op =='VIEW'">
              <yu-xform-group :column="1">
                <yu-xform-item label="其他需说明的事项" name="enterprisesOtherDesc" ctype="textarea"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
            <yu-xdialog title="关联企业情况" :visible.sync="dialogEnterprises" width="1000px">
              <yu-xform ref="enterprisesDialog" label-width="160px" v-model="formdataEnterprises">
                <yu-xform-group :column="2">
                  <yu-xform-item label="关联企业名称" name="relCusName" ctype="input"></yu-xform-item>
                  <yu-xform-item label="注册资本" name="regiCapAmt" ctype="yu-num"></yu-xform-item>
                  <yu-xform-item label="股权结构" name="stkStr" ctype="input"></yu-xform-item>
                  <yu-xform-item label="主营业务" name="mainBusi" ctype="input"></yu-xform-item>
                  <yu-xform-item label="土地（平方）" name="landSqu" ctype="input"></yu-xform-item>
                  <yu-xform-item label="房产（平方）" name="houseSqu" ctype="input"></yu-xform-item>
                  <yu-xform-item label="抵押情况" name="pldCase" ctype="input"></yu-xform-item>
                  <yu-xform-item label="上年销售" name="lastYearSale" ctype="yu-num"></yu-xform-item>
                  <yu-xform-item label="净利润" name="profit" ctype="yu-num"></yu-xform-item>
                  <yu-xform-item label="本期资产总额" name="currAssTotal" ctype="yu-num"></yu-xform-item>
                  <yu-xform-item label="本期净资产" name="currPureAssetValue" ctype="yu-num"></yu-xform-item>
                  <yu-xform-item label="他行融资额度" name="otherBankLmt" ctype="yu-num"></yu-xform-item>
                  <yu-xform-item label="对外担保额度" name="outguarTotalLmt" ctype="yu-num"></yu-xform-item>
                </yu-xform-group>
                <div class="yu-grpButton">
                  <yu-button type="primary" @click="saveEnterprises">保存</yu-button>
                  <yu-button type="primary" @click="backEnterprises">返回</yu-button>
                </div>
              </yu-xform>
            </yu-xdialog>
          </yu-panel>
        </div>
      </div>
    </div>
    <div class="yu-grpButton">
      <yu-button type="primary" @click="tempSave" v-show="op!='VIEW'">暂存</yu-button>
      <yu-button type="primary" @click="saveBtn" v-show="op!='VIEW'">保存</yu-button>
    </div>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';
import personalBusiness from './personalBusiness';
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg(
  'STD_ZB_YES_NO,STD_ZB_CORP_QLTY,STD_LAND_CHA,STD_FIVE_CLASS,STD_RPT_ENV_CLASS,STD_ZB_TRADE_CLASS,STD_ZB_INVT_TYPE,STD_PRO_TYPE,STD_ASSET_RANGE,STD_ASSO_ASSET_TYPE,STD_ASSO_RELATION,STD_ZB_GRADE_RANK,STD_RPT_ASSET_TYP,STD_RPT_LAND_CHA'
);

export default {
  name: 'BasicInfoAsso',
  mixins: [mixinForm],
  components: { YufpDemoSelector, mapState, personalBusiness },
  props: {
    param: Object
  },
  data: function () {
    return {
      baseFormData: {},
      sharData: [],
      otherDescData: {},
      infoData: {},
      estateUrl: '',
      estateData: {},
      familyUrl: '',
      familyData: {},
      enterprisesUrl: '',
      enterprisesData: {},
      dialogEstate: false,
      formdataEstate: {},
      estateType: '',
      dialogFamily: false,
      formdataFamily: {},
      dialogEnterprises: false,
      enterprisesType: '',
      familyType: '',
      estateOtherDescData: {},
      person: false,
      lowRisk: false,
      asso: true,
      personAsso: true,
      certifiData: [],
      hxRange: false,
      tradeClassObject: {},
      DZData: [],
      op: '',
      dialogShar: false,
      dialogCertifi: false,
      enterprisesOtherDescData: {}
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    if (_this.param.person) {
      _this.person = _this.param.person;
    }
    if (_this.param.lowRisk) {
      _this.lowRisk = _this.param.lowRisk;
    }
    if (_this.param.asso) {
      _this.asso = _this.param.asso;
    }
    if (_this.param.personAsso) {
      _this.personAsso = _this.param.personAsso;
    }
    _this.op = _this.param.op;
    // _this.initBase();
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
    },
    // 基本信息
    initBase: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptbasicinfoasso/selectBySerno',
        data: JSON.stringify({
          serno: _this.param.serno
        }),
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data != '' && response.data != null) {
              yufp.clone(response.data, _this.baseFormData);
            } else {
              yufp.service.request({
                method: 'POST',
                url: _this.$backend.cmisBiz + '/api/rptbasicinfoasso/initAsso',
                data: JSON.stringify({
                  serno: _this.param.serno
                }),
                callback: function (code, message, response) {
                  if (response.data > 0) {
                    _this.initBase();
                  } else {
                    _this.$message({
                      duration: 4000,
                      message: '引入客户数据失败，请联系管理员！',
                      type: 'warning'
                    });
                    return;
                  }
                }
              });
            }
            // 股东信息
            _this.initShar();
            yufp.clone(response.data, _this.otherDescData);
            if (!_this.lowRisk) {
              yufp.clone(response.data, _this.infoData);
              yufp.clone(response.data, _this.estateOtherDescData);
            }
            if (!_this.lowRisk) {
              // 房产信息
              _this.estateUrl =
                _this.$backend.cmisBiz +
                '/api/rptbasicinforealestate/selectByModel';
              _this.estateData = {
                condition: JSON.stringify({ serno: _this.param.serno })
              };
              // 证书信息
              _this.initCertifi();
              // 个人家庭资产情况
              _this.familyUrl =
                _this.$backend.cmisBiz +
                '/api/rptbasicinfopersfamilyassets/selectByModel';
              _this.familyData = {
                condition: JSON.stringify({ serno: _this.param.serno })
              };
              // 关联企业情况
              yufp.clone(response.data, _this.enterprisesOtherDescData);
              _this.enterprisesUrl =
                _this.$backend.cmisBiz +
                '/api/rptbasicinforelatedenterprises/selectByModel';
              _this.enterprisesData = {
                condition: JSON.stringify({ serno: _this.param.serno })
              };
            }
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    },
    choseAssetRange: function () {
      var _this = this;
      if (_this.formdataFamily.assetRange == '2') {
        _this.hxRange = true;
      } else if (_this.formdataFamily.assetRange == '1') {
        this.hxRange = false;
      }
    },
    initShar: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptbasicinfoshar/initShar',
        data: {
          condition: JSON.stringify({ serno: _this.param.serno, cusId: _this.param.cusId})
        },
        callback: function (code, message, response) {
          if (response.data && response.data != null) {
            _this.sharData = response.data;
          }
        }});
    },
    initCertifi: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptbasicinfocertifi/initCertifi',
        data: {
          condition: JSON.stringify({ serno: _this.param.serno, cusId: _this.param.cusId })
        },
        callback: function (code, message, response) {
          if (response.data && response.data != null) {
            _this.certifiData = response.data;
          }
        }});
    },
    addShar: function () {
      var _this = this;
      _this.dialogShar = true;
    },
    upShar: function () {
      var _this = this;
      var selectionAry = _this.$refs.sharTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogShar = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.formdataShar);
      });
    },
    delShar: function () {
      var _this = this;
      var selectionAry = _this.$refs.sharTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url:
                backend.cmisBiz +
                '/api/rptbasicinfoshar/deleteShar',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.initShar();
                  _this.$message('删除成功');
                } else {
                  _this.$message({
                    duration: 4000,
                    message: '系统错误，请联系管理员！',
                    type: 'warning'
                  });
                  return;
                }
              }
            });
          }
        }
      });
    },
    backShar: function () {
      var _this = this;
      _this.dialogShar = false;
      _this.$refs.sharDialog.resetFields();
    },
    saveShar: function () {
      var _this = this;
      var validate = false;
      _this.$refs.sharDialog.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      _this.formdataShar.serno = _this.param.serno;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptbasicinfoshar/save',
        data: _this.formdataShar,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '操作成功！'
            });
            _this.dialogShar = false;
            _this.$refs.sharDialog.resetFields();
            _this.initShar();
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    },
    addCertifi: function () {
      var _this = this;
      _this.dialogCertifi = true;
    },
    upCertifi: function () {
      var _this = this;
      var selectionAry = _this.$refs.certifiTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogCertifi = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.formdataCertifi);
      });
    },
    delCertifi: function () {
      var _this = this;
      var selectionAry = _this.$refs.certifiTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url:
                backend.cmisBiz +
                '/api/rptbasicinfocertifi/delectCertifi',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.initCertifi();
                  _this.$message('删除成功');
                } else {
                  _this.$message({
                    duration: 4000,
                    message: '系统错误，请联系管理员！',
                    type: 'warning'
                  });
                  return;
                }
              }
            });
          }
        }
      });
    },
    backCertifi: function () {
      var _this = this;
      _this.dialogCertifi = false;
      _this.$refs.certifiDialog.resetFields();
    },
    saveCertifi: function () {
      var _this = this;
      var validate = false;
      _this.$refs.certifiDialog.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      _this.formdataCertifi.serno = _this.param.serno;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptbasicinfocertifi/save',
        data: _this.formdataCertifi,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '操作成功！'
            });
            _this.dialogCertifi = false;
            _this.$refs.certifiDialog.resetFields();
            _this.initCertifi();
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    },
    addEstate: function () {
      var _this = this;
      _this.dialogEstate = true;
      _this.estateType = 'add';
    },
    upEstate: function () {
      var _this = this;
      var selectionAry = _this.$refs.estateTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.estateType = 'edit';
      _this.dialogEstate = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.formdataEstate);
      });
    },
    delEstate: function () {
      var _this = this;
      var selectionAry = _this.$refs.estateTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/rptbasicinforealestate/deleteEstate',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$refs.estateTable.remoteData();
                  _this.$message('删除成功');
                } else {
                  _this.$message({
                    duration: 4000,
                    message: '系统错误，请联系管理员！',
                    type: 'warning'
                  });
                  return;
                }
              }
            });
          }
        }
      });
    },
    saveEstate: function () {
      var _this = this;
      var validate = false;
      _this.$refs.estateDialog.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      if (_this.estateType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz + '/api/rptbasicinforealestate/updateEstate',
          data: _this.formdataEstate,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogEstate = false;
              _this.$refs.estateDialog.resetFields();
              _this.$refs.estateTable.remoteData();
              return;
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
              return;
            }
          }
        });
      } else if (_this.estateType == 'add') {
        var validate = false;
        _this.$refs.estateDialog.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          _this.$message({
            message: '数据验证不通过，请修改后重新保存！',
            type: 'error'
          });
          return;
        }
        _this.formdataEstate.serno = _this.param.serno;
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz + '/api/rptbasicinforealestate/insertEstate',
          data: _this.formdataEstate,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogEstate = false;
              _this.$refs.estateDialog.resetFields();
              _this.$refs.estateTable.remoteData();
              return;
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
              return;
            }
          }
        });
      }
    },
    backEstate: function () {
      var _this = this;
      _this.dialogEstate = false;
      _this.$refs.estateDialog.resetFields();
    },
    addFamily: function () {
      var _this = this;
      _this.dialogFamily = true;
      _this.familyType = 'add';
    },
    upFamily: function () {
      var _this = this;
      var selectionAry = _this.$refs.familyTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.familyType = 'edit';
      _this.dialogFamily = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.formdataFamily);
      });
    },
    delFamily: function () {
      var _this = this;
      var selectionAry = _this.$refs.familyTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url:
                backend.cmisBiz +
                '/api/rptbasicinfopersfamilyassets/delectFamily',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$refs.familyTable.remoteData();
                  _this.$message('删除成功');
                } else {
                  _this.$message({
                    duration: 4000,
                    message: '系统错误，请联系管理员！',
                    type: 'warning'
                  });
                  return;
                }
              }
            });
          }
        }
      });
    },
    backFamily: function () {
      var _this = this;
      _this.dialogFamily = false;
      _this.$refs.familyDialog.resetFields();
    },
    saveFamily: function () {
      var _this = this;
      var validate = false;
      _this.$refs.familyDialog.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      _this.formdataFamily.serno = _this.param.serno;
      if (_this.familyType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptbasicinfopersfamilyassets/updateFamily',
          data: _this.formdataFamily,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogFamily = false;
              _this.$refs.familyDialog.resetFields();
              _this.$refs.familyTable.remoteData();
              return;
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
              return;
            }
          }
        });
      } else if (_this.familyType == 'add') {
        yufp.service.request({
          method: 'POST',
          url:
          _this.$backend.cmisBiz +
          '/api/rptbasicinfopersfamilyassets/addFamily',
          data: _this.formdataFamily,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogFamily = false;
              _this.$refs.familyDialog.resetFields();
              _this.$refs.familyTable.remoteData();
              return;
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
              return;
            }
          }
        });
      }
    },
    addEnterprises: function () {
      var _this = this;
      _this.dialogEnterprises = true;
      _this.enterprisesType = 'add';
    },
    upEnterprises: function () {
      var _this = this;
      var selectionAry = _this.$refs.enterprisesTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.enterprisesType = 'edit';
      _this.dialogEnterprises = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.formdataEnterprises);
      });
    },
    delEnterprises: function () {
      var _this = this;
      var selectionAry = _this.$refs.enterprisesTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url:
                backend.cmisBiz +
                '/api/rptbasicinforelatedenterprises/deleteEnterprises',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$refs.enterprisesTable.remoteData();
                  _this.$message('删除成功');
                } else {
                  _this.$message({
                    duration: 4000,
                    message: '系统错误，请联系管理员！',
                    type: 'warning'
                  });
                  return;
                }
              }
            });
          }
        }
      });
    },
    saveEnterprises: function () {
      var _this = this;
      if (_this.enterprisesType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptbasicinforelatedenterprises/updateEnterprises',
          data: _this.formdataEnterprises,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogEnterprises = false;
              _this.$refs.enterprisesDialog.resetFields();
              _this.$refs.enterprisesTable.remoteData();
              return;
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
              return;
            }
          }
        });
      } else if (_this.enterprisesType == 'add') {
        var validate = false;
        _this.$refs.enterprisesDialog.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          _this.$message({
            message: '数据验证不通过，请修改后重新保存！',
            type: 'error'
          });
          return;
        }
        _this.formdataEnterprises.serno = _this.param.serno;
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptbasicinforelatedenterprises/insertEnterprises',
          data: _this.formdataEnterprises,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogEnterprises = false;
              _this.$refs.enterprisesDialog.resetFields();
              _this.$refs.enterprisesTable.remoteData();
              return;
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
              return;
            }
          }
        });
      }
    },
    backEnterprises: function () {
      var _this = this;
      _this.dialogEnterprises = false;
      _this.$refs.enterprisesDialog.resetFields();
    },
    // 暂存
    tempSave: function () {
      var _this = this;
      let obj = {};
      obj.rptBasicInfoAsso = {};
      if (_this.baseFormData) {
        obj.rptBasicInfoAsso = _this.baseFormData;
      }
      if (!_this.lowRisk) {
        obj.rptBasicInfoAsso.estateOtherNeedDesc = _this.estateOtherDescData.estateOtherNeedDesc;
        obj.rptBasicInfoAsso.rentWorkshopSqu = _this.estateOtherDescData.rentWorkshopSqu;
        obj.rptBasicInfoAsso.rentLandSqu = _this.estateOtherDescData.rentLandSqu;
        obj.rptBasicInfoAsso.rentAmtYear = _this.estateOtherDescData.rentAmtYear;
        obj.rptBasicInfoAsso.selfLandSqu = _this.estateOtherDescData.selfLandSqu;
        obj.rptBasicInfoAsso.selfCertLandSqu = _this.estateOtherDescData.selfCertLandSqu;
        obj.rptBasicInfoAsso.selfCertLandCha = _this.estateOtherDescData.selfCertLandCha;
        obj.rptBasicInfoAsso.selfHouseSqu = _this.estateOtherDescData.selfHouseSqu;
        obj.rptBasicInfoAsso.selfCertHouseSqu = _this.estateOtherDescData.selfCertHouseSqu;
        obj.rptBasicInfoAsso.companyHistory = _this.infoData.companyHistory;
        obj.rptBasicInfoAsso.mainBusiness = _this.infoData.mainBusiness;
        obj.rptBasicInfoAsso.cusEiaSafeCase = _this.infoData.cusEiaSafeCase;
        obj.rptBasicInfoAsso.enterprisesOtherDesc = _this.enterprisesOtherDescData.enterprisesOtherDesc;
      }
      obj.rptBasicInfoAsso.serno = _this.param.serno;
      obj.rptBasicInfoAsso.shdCaseOtherMemo = _this.otherDescData.shdCaseOtherMemo;
      obj.rptBasicInfoAsso.burnExplodeIndustryInd = _this.otherDescData.burnExplodeIndustryInd;
      obj.rptBasicInfoAsso.environStandInd = _this.otherDescData.environStandInd;
      obj.rptBasicInfoAsso.agrInd = _this.otherDescData.agrInd;
      obj.rptBasicInfoAsso.basicOtherNeedDesc = _this.otherDescData.basicOtherNeedDesc;
      obj.rptBasicInfoAsso.smallInd = _this.otherDescData.smallInd;
      obj.rptBasicInfoAsso.manuInd = _this.otherDescData.manuInd;

      if (_this.person) {
        // 个人
        obj.rptPersonalBusiness = _this.$refs.personalRef.personalFormData;
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/rptbasicinfoasso/updateRptInfo',
          data: obj,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '暂存成功！'
              });
              return;
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
              return;
            }
          }
        });
      } else {
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz + '/api/rptbasicinfoasso/updateRptInfoAsso',
          data: obj.rptBasicInfoAsso,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '暂存成功！'
              });
              return;
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
              return;
            }
          }
        });
      }
    },
    // 保存按钮
    saveBtn: function () {
      var _this = this;
      let obj = {};
      var validate1 = false;
      var validate2 = false;
      _this.$refs.otherDescForm.validate(function (valid) {
        validate1 = valid;
      });
      if (!_this.lowRisk) {
        _this.$refs.infoForm.validate(function (valid) {
          validate2 = valid;
        });
      } else {
        validate2 = true;
      }
      if (
        validate1 == false ||
        validate2 == false
      ) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      obj.rptBasicInfoAsso = {};
      if (_this.baseFormData) {
        obj.rptBasicInfoAsso = _this.baseFormData;
      }
      if (!_this.lowRisk) {
        obj.rptBasicInfoAsso.estateOtherNeedDesc = _this.estateOtherDescData.estateOtherNeedDesc;
        obj.rptBasicInfoAsso.rentWorkshopSqu = _this.estateOtherDescData.rentWorkshopSqu;
        obj.rptBasicInfoAsso.rentLandSqu = _this.estateOtherDescData.rentLandSqu;
        obj.rptBasicInfoAsso.rentAmtYear = _this.estateOtherDescData.rentAmtYear;
        obj.rptBasicInfoAsso.selfLandSqu = _this.estateOtherDescData.selfLandSqu;
        obj.rptBasicInfoAsso.selfCertLandSqu = _this.estateOtherDescData.selfCertLandSqu;
        obj.rptBasicInfoAsso.selfCertLandCha = _this.estateOtherDescData.selfCertLandCha;
        obj.rptBasicInfoAsso.selfHouseSqu = _this.estateOtherDescData.selfHouseSqu;
        obj.rptBasicInfoAsso.selfCertHouseSqu = _this.estateOtherDescData.selfCertHouseSqu;
        obj.rptBasicInfoAsso.companyHistory = _this.infoData.companyHistory;
        obj.rptBasicInfoAsso.mainBusiness = _this.infoData.mainBusiness;
        obj.rptBasicInfoAsso.cusEiaSafeCase = _this.infoData.cusEiaSafeCase;
        obj.rptBasicInfoAsso.enterprisesOtherDesc = _this.enterprisesOtherDescData.enterprisesOtherDesc;
      }
      obj.rptBasicInfoAsso.serno = _this.param.serno;
      obj.rptBasicInfoAsso.shdCaseOtherMemo =
        _this.otherDescData.shdCaseOtherMemo;
      obj.rptBasicInfoAsso.burnExplodeIndustryInd = _this.otherDescData.burnExplodeIndustryInd;
      obj.rptBasicInfoAsso.environStandInd = _this.otherDescData.environStandInd;
      obj.rptBasicInfoAsso.agrInd = _this.otherDescData.agrInd;
      obj.rptBasicInfoAsso.smallInd = _this.otherDescData.smallInd;
      obj.rptBasicInfoAsso.manuInd = _this.otherDescData.manuInd;
      obj.rptBasicInfoAsso.basicOtherNeedDesc =
        _this.otherDescData.basicOtherNeedDesc;

      if (_this.person) {
        // 个人
        obj.rptPersonalBusiness = _this.$refs.personalRef.personalFormData;
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/rptbasicinfoasso/updateRptInfo',
          data: obj,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '保存成功！'
              });
              return;
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
              return;
            }
          }
        });
      } else {
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz + '/api/rptbasicinfoasso/updateRptInfoAsso',
          data: obj.rptBasicInfoAsso,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.doMustCheck();
              _this.$message({
                message: '保存成功'
              });
              return;
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
              return;
            }
          }
        });
      }
    },
    doMustCheck: function () {
      var _this = this;
      var obj = {};
      obj.serno = _this.param.serno;
      obj.pageId = 'sxdcxx';
      obj.pageName = '授信调查信息';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/bizmustcheckdetails/rptCheck',
        data: obj,
        callback: function (code, message, response) {
        }
      });
    },
    getSummaries: function (param) {
      var columns = param.columns;
      var data = param.data;
      var sums = [];
      columns.forEach(function (column, index) {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        var values = data.map(function (item) {
          return Number(item[column.property]);
        });
        if (
          !values.every(function (value) {
            return isNaN(value);
          })
        ) {
          if (index === 2 || index === 4) {
            sums[index] = values.reduce(function (prev, curr) {
              var value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          }
        }
      });
      return sums;
    },
    getSummaries1: function (param) {
      var columns = param.columns;
      var data = param.data;
      var sums = [];
      columns.forEach(function (column, index) {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        var values = data.map(function (item) {
          return Number(item[column.property]);
        });
        if (
          !values.every(function (value) {
            return isNaN(value);
          })
        ) {
          if (index === 6 || index === 7 || index === 8 || index === 9 || index === 12) {
            sums[index] = values.reduce(function (prev, curr) {
              var value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          }
        }
      });
      return sums;
    },
    getSummaries2: function (param) {
      var columns = param.columns;
      var data = param.data;
      var sums = [];
      columns.forEach(function (column, index) {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        var values = data.map(function (item) {
          return Number(item[column.property]);
        });
        if (
          !values.every(function (value) {
            return isNaN(value);
          })
        ) {
          if (index === 4 || index === 6 || index === 9) {
            sums[index] = values.reduce(function (prev, curr) {
              var value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          }
        }
      });
      return sums;
    }
  }
};
</script>
