
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
    <yu-panel title="农林牧渔业" panel-type="simple">
       <div id="opera">
       <table  cellspacing="0" cellpadding="0" border="1" >
       <colgroup class="el-table_group">
          <col width="10%">
          <col width="20%">
          <col width="5%">
          <col width="20%">
          <col width="50%">
        </colgroup>
        <tr height="50px">
          <td colspan="2" rowspan="6">产品</td>
          <td colspan="3">前三大主营业务占比情况（或主营产品）</td>
        </tr>
        <tr height="50px">
          <td colspan="2">主营业务</td>
          <td>占比或相关文字说明</td>
        </tr>
        <tr height="50px">
          <td>1.</td>
          <td><yu-input type="input" v-model="basicFormData.mainBusi1" :disabled="op =='VIEW'"></yu-input></td>
          <td><yu-input type="input" v-model="basicFormData.mainBusi1Memo" :disabled="op =='VIEW'"></yu-input></td>
        </tr>
        <tr height="50px">
        <td>2.</td>
          <td><yu-input type="input" v-model="basicFormData.mainBusi2" :disabled="op =='VIEW'"></yu-input></td>
          <td><yu-input type="input" v-model="basicFormData.mainBusi2Memo" :disabled="op =='VIEW'"></yu-input></td>
        </tr>
        <tr height="50px">
        <td>3.</td>
          <td><yu-input type="input" v-model="basicFormData.mainBusi3" :disabled="op =='VIEW'"></yu-input></td>
          <td><yu-input type="input" v-model="basicFormData.mainBusi3Memo" :disabled="op =='VIEW'"></yu-input></td>
        </tr>
        <tr height="50px">
          <td colspan="2">其他说明</td>
          <td><yu-input type="input" v-model="basicFormData.otherDesc" :disabled="op =='VIEW'"></yu-input></td>
        </tr>
        </table>
      </div>
      <yu-panel title="经营情况" panel-type="simple">
        <yu-xtable ref="agricultureTable" row-number :pageable="false" :data="agricultureData">
          <yu-xtable-column prop="project" label="项目"></yu-xtable-column>
          <yu-xtable-column prop="plantStartDate" label="种植或养殖开始时间"></yu-xtable-column>
          <yu-xtable-column prop="growthCycle" label="生长周期"></yu-xtable-column>
          <yu-xtable-column prop="currentScale" label="现有规模"></yu-xtable-column>
          <yu-xtable-column prop="plantSkill" label="种植工艺（栽培技术）"></yu-xtable-column>
          <yu-xtable-column prop="debtReceviable" label="应收账款"></yu-xtable-column>
        </yu-xtable>
        <yu-xform ref="otherDescForm" label-width="160px" v-model="otherDescFormData" :disabled="op =='VIEW'">
          <yu-xform-group :column="2">
            <yu-xform-item label="其他需说明事项" name="breedOtherNeedDesc" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <yu-panel title="销售" panel-type="simple">
        <yu-toolbar :show-length="8" style="margin-bottom:10px;">
          <yu-button type="primary" @click="addSalesFn" v-show="op!='VIEW'">添加</yu-button>
          <yu-button type="primary" @click="editSalesFn" v-show="op!='VIEW'">修改</yu-button>
          <yu-button type="primary" @click="delectSalesFn" v-show="op!='VIEW'">删除</yu-button>
        </yu-toolbar>
        <yu-xtable ref="salesTable" row-number :pageable="false" :data="salesData">
          <yu-xtable-column prop="project" label="项目"></yu-xtable-column>
          <yu-xtable-column prop="marketChannel" label="市场渠道"></yu-xtable-column>
          <yu-xtable-column prop="cusName" label="主要客户"></yu-xtable-column>
          <yu-xtable-column prop="settlementMethod" label="收款方式"></yu-xtable-column>
          <yu-xtable-column prop="priceWaveCase" label="价格波动情况"></yu-xtable-column>
          <yu-xtable-column prop="remark" label="备注"></yu-xtable-column>
        </yu-xtable>
        <yu-xform ref="saleOtherDescForm" label-width="160px" v-model="saleOtherDescFormData" :disabled="op =='VIEW'">
          <yu-xform-group :column="2">
            <yu-xform-item label="其他需说明事项" name="saleOtherNeedDesc" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xdialog title="主要客户群" :visible.sync="dialogSales" width="1000px">
          <yu-xform ref="salesDialog" label-width="160px" v-model="dialogFormSales">
            <yu-xform-group :column="2">
              <yu-xform-item label="项目" name="project" ctype="input"></yu-xform-item>
              <yu-xform-item label="市场渠道" name="marketChannel" ctype="input"></yu-xform-item>
              <yu-xform-item label="主要客户" name="cusName" ctype="input"></yu-xform-item>
              <yu-xform-item label="收款方式" name="settlementMethod" ctype="input"></yu-xform-item>
              <yu-xform-item label="价格波动情况" name="priceWaveCase" ctype="textarea"></yu-xform-item>
              <yu-xform-item label="备注" name="remark" ctype="textarea"></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button type="primary" @click="saveSales" >保存</yu-button>
              <yu-button type="primary" @click="backSales">返回</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
      </yu-panel>
      <yu-panel title="采购" panel-type="simple">
        <yu-toolbar :show-length="8" style="margin-bottom:10px;">
          <yu-button type="primary" @click="addPurchaseFn" v-show="op!='VIEW'">添加</yu-button>
          <yu-button type="primary" @click="editPurchaseFn" v-show="op!='VIEW'">修改</yu-button>
          <yu-button type="primary" @click="delectPurchaseFn" v-show="op!='VIEW'">删除</yu-button>
        </yu-toolbar>
        <yu-xtable ref="purchaseTable" row-number :pageable="false" :data="purchaseData">
          <yu-xtable-column prop="project" label="项目"></yu-xtable-column>
          <yu-xtable-column prop="buyType" label="种苗、肥料、饲料等"></yu-xtable-column>
          <yu-xtable-column prop="cusName" label="主要供应商"></yu-xtable-column>
          <yu-xtable-column prop="settlementMethod" label="付款方式"></yu-xtable-column>
          <yu-xtable-column prop="priceWaveCase" label="价格波动情况"></yu-xtable-column>
          <yu-xtable-column prop="remark" label="备注"></yu-xtable-column>
        </yu-xtable>
        <yu-xdialog title="主要供应商" :visible.sync="dialogPurchase" width="1000px">
          <yu-xform ref="purchaseDialog" label-width="160px" v-model="dialogFormPurchase">
            <yu-xform-group :column="2">
              <yu-xform-item label="项目" name="project" ctype="input"></yu-xform-item>
              <yu-xform-item label="种苗、肥料、饲料等" name="buyType" ctype="input"></yu-xform-item>
              <yu-xform-item label="主要供应商" name="cusName" ctype="input"></yu-xform-item>
              <yu-xform-item label="付款方式" name="settlementMethod" ctype="input"></yu-xform-item>
              <yu-xform-item label="价格波动情况" name="priceWaveCase" ctype="textarea"></yu-xform-item>
              <yu-xform-item label="备注" name="priceWaveCase" ctype="textarea"></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button type="primary" @click="savePurchase">保存</yu-button>
              <yu-button type="primary" @click="backPurchase">返回</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
        <yu-xform ref="buyOtherDescForm" label-width="160px" v-model="buyOtherDescFormData" :disabled="op =='VIEW'">
          <yu-xform-group :column="2">
            <yu-xform-item label="其他需说明事项" name="buyOtherNeedDesc" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
    </yu-panel>
    <div class="yu-grpButton" style="margin-top: 20px">
      <yu-button type="primary" @click="saveBtn" v-show="op!='VIEW'">保存</yu-button>
    </div>
    <yu-panel title="近年产销利情况" panel-type="simple">
      <table cellspacing="0" cellpadding="0" border="1" height="270px" width="100%" class="agriculture">
        <colgroup class="el-table_group">
          <col width="4%">
          <col span="12" width="8%">
        </colgroup>
        <tr class="item__header">
          <td class="item_header"></td>
          <td class="item_header" colspan="4">{{ lastSecond }}年度</td>
          <td class="item_header" colspan="4">{{ lastFirst }}年度</td>
          <td class="item_header" colspan="4">{{ curr }}</td>
        </tr>
        <tr class="item__header">
          <td class="item_header">项目</td>
          <td class="item_header">产量</td>
          <td class="item_header">销量</td>
          <td class="item_header">实现销售收入</td>
          <td class="item_header">实现毛利润</td>
          <td class="item_header">产量</td>
          <td class="item_header">销量</td>
          <td class="item_header">实现销售收入</td>
          <td class="item_header">实现毛利润</td>
          <td class="item_header">产量</td>
          <td class="item_header">销量</td>
          <td class="item_header">实现销售收入</td>
          <td class="item_header">实现毛利润</td>
        </tr>
        <tr>
          <td class="item_header">蔬菜</td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearSecondProducrt','nearSecondVegeProducrt')" v-if="editFlag === true " v-model="recentData.nearSecondVegeProducrt" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearSecondVegeProducrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearSecondSale','nearSecondVegeSale')" v-if="editFlag === true " v-model="recentData.nearSecondVegeSale" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearSecondVegeSale }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearSecondRevenrt','nearSecondVegeSaleRevenrt')" v-if="editFlag === true " v-model="recentData.nearSecondVegeSaleRevenrt" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearSecondVegeSaleRevenrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearSecondProfit','nearSecondVegeGrossProfit')" v-if="editFlag === true " v-model="recentData.nearSecondVegeGrossProfit" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearSecondVegeGrossProfit }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearFirstProducrt','nearFirstVegeProducrt')" v-if="editFlag === true " v-model="recentData.nearFirstVegeProducrt" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearFirstVegeProducrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearFirstSale','nearFirstVegeSale')" v-if="editFlag === true " v-model="recentData.nearFirstVegeSale" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearFirstVegeSale }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearFirsSaleRevenrt','nearFirstVegeSaleRevenrt')" v-if="editFlag === true " v-model="recentData.nearFirstVegeSaleRevenrt" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearFirstVegeSaleRevenrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearFirstGrossProfit','nearFirstVegeGrossProfit')" v-if="editFlag === true " v-model="recentData.nearFirstVegeGrossProfit" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearFirstVegeGrossProfit }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('currProducrt','currVegeProducrt')" v-if="editFlag === true " v-model="recentData.currVegeProducrt" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ recentData.currVegeProducrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('currSale','currVegeSale')" v-if="editFlag === true " v-model="recentData.currVegeSale" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ recentData.currVegeSale }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('currSaleRevenrt','currVegeSaleRevenrt')" v-if="editFlag === true " v-model="recentData.currVegeSaleRevenrt" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ recentData.currVegeSaleRevenrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('currGrossProfit','currVegeGrossProfit')" v-if="editFlag === true " v-model="recentData.currVegeGrossProfit" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ recentData.currVegeGrossProfit }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">粮食</td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearSecondProducrt','nearSecondFoodProducrt')" v-if="editFlag === true " v-model="recentData.nearSecondFoodProducrt" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearSecondFoodProducrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearSecondSale','nearSecondFoodSale')" v-if="editFlag === true " v-model="recentData.nearSecondFoodSale" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearSecondFoodSale }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearSecondRevenrt','nearSecondFoodSaleRevenrt')" v-if="editFlag === true " v-model="recentData.nearSecondFoodSaleRevenrt" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearSecondFoodSaleRevenrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearSecondProfit','nearSecondFoodGrossProfit')" v-if="editFlag === true " v-model="recentData.nearSecondFoodGrossProfit" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearSecondFoodGrossProfit }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearFirstProducrt','nearFirstFoodProducrt')" v-if="editFlag === true " v-model="recentData.nearFirstFoodProducrt" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearFirstFoodProducrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearFirstSale','nearFirstFoodSale')" v-if="editFlag === true " v-model="recentData.nearFirstFoodSale" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearFirstFoodSale }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearFirsSaleRevenrt','nearFirstFoodSaleRevenrt')" v-if="editFlag === true " v-model="recentData.nearFirstFoodSaleRevenrt" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearFirstFoodSaleRevenrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearFirstGrossProfit','nearFirstFoodGrossProfit')" v-if="editFlag === true " v-model="recentData.nearFirstFoodGrossProfit" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearFirstFoodGrossProfit }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('currProducrt','currFoodProducrt')" v-if="editFlag === true " v-model="recentData.currFoodProducrt" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ recentData.currFoodProducrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('currSale','currFoodSale')" v-if="editFlag === true " v-model="recentData.currFoodSale" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ recentData.currFoodSale }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('currSaleRevenrt','currFoodSaleRevenrt')" v-if="editFlag === true " v-model="recentData.currFoodSaleRevenrt" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ recentData.currFoodSaleRevenrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('currGrossProfit','currFoodGrossProfit')" v-if="editFlag === true " v-model="recentData.currFoodGrossProfit" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ recentData.currFoodGrossProfit }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">苗木种植</td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearSecondProducrt','nearSecondSeedProducrt')" v-if="editFlag === true " v-model="recentData.nearSecondSeedProducrt" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearSecondSeedProducrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearSecondSale','nearSecondSeedSale')" v-if="editFlag === true " v-model="recentData.nearSecondSeedSale" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearSecondSeedSale }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearSecondRevenrt','nearSecondSeedSaleRevenrt')" v-if="editFlag === true " v-model="recentData.nearSecondSeedSaleRevenrt" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearSecondSeedSaleRevenrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearSecondProfit','nearSecondSeedGrossProfit')" v-if="editFlag === true " v-model="recentData.nearSecondSeedGrossProfit" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearSecondSeedGrossProfit }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearFirstProducrt','nearFirstSeedProducrt')" v-if="editFlag === true " v-model="recentData.nearFirstSeedProducrt" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearFirstSeedProducrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearFirstSale','nearFirstSeedSale')" v-if="editFlag === true " v-model="recentData.nearFirstSeedSale" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearFirstSeedSale }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearFirsSaleRevenrt','nearFirstSeedSaleRevenrt')" v-if="editFlag === true " v-model="recentData.nearFirstSeedSaleRevenrt" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearFirstSeedSaleRevenrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('nearFirstGrossProfit','nearFirstSeedGrossProfit')" v-if="editFlag === true " v-model="recentData.nearFirstSeedGrossProfit" type="num" :formatter="$formatNumber('0,000.00',0)">
              </yu-input>
              <span v-else class="item__amt_txt">{{ recentData.nearFirstSeedGrossProfit }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('currProducrt','currSeedProducrt')" v-if="editFlag === true " v-model="recentData.currSeedProducrt" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ recentData.currSeedProducrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('currSale','currSeedSale')" v-if="editFlag === true " v-model="recentData.currSeedSale" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ recentData.currSeedSale }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('currSaleRevenrt','currSeedSaleRevenrt')" v-if="editFlag === true " v-model="recentData.currSeedSaleRevenrt" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ recentData.currSeedSaleRevenrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <yu-input @blur="inputChange('currGrossProfit','currSeedGrossProfit')" v-if="editFlag === true " v-model="recentData.currSeedGrossProfit" type="num" :formatter="$formatNumber('0,000.00',0)"></yu-input>
              <span v-else class="item__amt_txt">{{ recentData.currSeedGrossProfit }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="item_header">合计</td>
          <td>
            <div>
              <span class="item__amt_txt">{{ recentData.nearSecondTotalProducrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ recentData.nearSecondTotalSale }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ recentData.nearSecondTotalSaleRevenrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ recentData.nearSecondTotalGrossProfit }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ recentData.nearFirstTotalProducrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ recentData.nearFirstTotalSale }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ recentData.nearFirstTotalSaleRevenrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ recentData.nearFirstTotalGrossProfit }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ recentData.currTotalProducrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ recentData.currTotalSale }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ recentData.currTotalSaleRevenrt }}</span>
            </div>
          </td>
          <td>
            <div>
              <span class="item__amt_txt">{{ recentData.currTotalGrossProfit }}</span>
            </div>
          </td>
        </tr>
      </table>
      <yu-xform ref="agricultureForm" label-width="160px" v-model="agricultureFormData" style="margin-top:20px" :disabled="op =='VIEW'">
        <yu-xform-group :column="1">
          <yu-xform-item label="今年产销利波动原因" name="currSaleWaveReason" ctype="textarea" :disabled="!editFlag"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <div class="yu-grpButton" style="margin-top: 20px">
      <yu-button type="primary" v-show="!showEditBtn&&op!='VIEW'" @click="saveFn">保存</yu-button>
      <yu-button type="primary" v-show="showEditBtn&&op!='VIEW'" @click="editFn">编辑</yu-button>
      <yu-button type="primary" @click="cancelFn" v-show="!showEditBtn&&op!='VIEW'">返回</yu-button>
    </div>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';


export default {
  components: { YufpDemoSelector, mapState },
  props: {
    param: Object
  },
  data: function () {
    return {
      basicFormData: {},
      agricultureData: [],
      purchaseData: [],
      salesData: [],
      otherDescFormData: {},
      saleOtherDescFormData: {},
      buyOtherDescFormData: {},
      dialogPurchase: false,
      dialogSales: false,
      dialogFormPurchase: {},
      dialogFormSales: {},
      salesType: '',
      purchaseType: '',
      recentData: {
        nearSecondTotalProducrt: '0.00'
      },
      lastSecond: '',
      lastFirst: '',
      curr: '',
      showEditBtn: true,
      editFlag: false,
      tmpItem: [],
      saleWaveFormData: {},
      op: ''
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.op = _this.param.op;
    _this.init();
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url:
          _this.$backend.cmisBiz + '/api/rptoperproductionoper/selectBySerno',
        data: JSON.stringify({
          serno: _this.param.serno
        }),
        callback: function (code, message, response) {
          if (code == 0) {
            yufp.clone(response.data, _this.basicFormData);
            yufp.clone(response.data, _this.otherDescFormData);
            yufp.clone(response.data, _this.saleOtherDescFormData);
            yufp.clone(response.data, _this.buyOtherDescFormData);
            yufp.service.request({
              method: 'POST',
              url:
                _this.$backend.cmisBiz +
                '/api/rptoperenergysalesdetail/selectByModel',
              data: {
                condition: JSON.stringify({ serno: _this.param.serno })
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.salesData = response.data;
                }
              }
            });
            yufp.service.request({
              method: 'POST',
              url:
                _this.$backend.cmisBiz +
                '/api/rptoperenergypurchasedetail/selectByModel',
              data: {
                condition: JSON.stringify({ serno: _this.param.serno })
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.purchaseData = response.data;
                }
              }
            });
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
      // 种植养殖情况
      yufp.service.request({
        method: 'POST',
        url:
          _this.$backend.cmisBiz +
          '/api/rptoperagriculturebreedsituation/selectByModel',
        data: {
          condition: JSON.stringify({ serno: _this.param.serno })
        },
        callback: function (code, message, response) {
          if (code == 0) {
            _this.agricultureData = response.data;
          }
        }
      });
      // 近年产销利情况
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptoperagriculture/selectBySerno',
        data: JSON.stringify({ serno: _this.param.serno }),
        callback: function (code, message, response) {
          if (code == 0) {
            yufp.clone(response.data, _this.agricultureFormData);
            var inputYear = response.data.inputYear;
            var year = inputYear.substring(0, 4);
            var month = inputYear.substring(5, 7);
            if (month.substring(0, 1) == '0') {
              month = month.substring(1, 2);
            }
            _this.lastSecond = parseInt(year) - 2 + '年度';
            _this.lastFirst = parseInt(year) - 1 + '年度';
            _this.curr = year + '年1月-' + month + '月';
            _this.recentData = response.data;
            _this.recentData.nearSecondTotalProducrt = (
              parseFloat(_this.recentData.nearSecondVegeProducrt) +
              parseFloat(_this.recentData.nearSecondFoodProducrt) +
              parseFloat(_this.recentData.nearSecondSeedProducrt)
            ).toFixed(2);
            _this.recentData.nearSecondTotalSale = (
              parseFloat(_this.recentData.nearSecondVegeSale) +
              parseFloat(_this.recentData.nearSecondFoodSale) +
              parseFloat(_this.recentData.nearSecondSeedSale)
            ).toFixed(2);
            _this.recentData.nearSecondTotalSaleRevenrt = (
              parseFloat(_this.recentData.nearSecondVegeSaleRevenrt) +
              parseFloat(_this.recentData.nearSecondFoodSaleRevenrt) +
              parseFloat(_this.recentData.nearSecondSeedSaleRevenrt)
            ).toFixed(2);
            _this.recentData.nearSecondTotalGrossProfit = (
              parseFloat(_this.recentData.nearSecondVegeGrossProfit) +
              parseFloat(_this.recentData.nearSecondFoodGrossProfit) +
              parseFloat(_this.recentData.nearSecondSeedGrossProfit)
            ).toFixed(2);
            _this.recentData.nearFirstTotalProducrt = (
              parseFloat(_this.recentData.nearFirstVegeProducrt) +
              parseFloat(_this.recentData.nearFirstFoodProducrt) +
              parseFloat(_this.recentData.nearFirstSeedProducrt)
            ).toFixed(2);
            _this.recentData.nearFirstTotalSale = (
              parseFloat(_this.recentData.nearFirstVegeSale) +
              parseFloat(_this.recentData.nearFirstFoodSale) +
              parseFloat(_this.recentData.nearFirstSeedSale)
            ).toFixed(2);
            _this.recentData.nearFirstTotalSaleRevenrt = (
              parseFloat(_this.recentData.nearFirstVegeSaleRevenrt) +
              parseFloat(_this.recentData.nearFirstFoodSaleRevenrt) +
              parseFloat(_this.recentData.nearFirstSeedSaleRevenrt)
            ).toFixed(2);
            _this.recentData.nearFirstTotalGrossProfit = (
              parseFloat(_this.recentData.nearFirstVegeGrossProfit) +
              parseFloat(_this.recentData.nearFirstFoodGrossProfit) +
              parseFloat(_this.recentData.nearFirstSeedGrossProfit)
            ).toFixed(2);
            _this.recentData.currTotalProducrt = (
              parseFloat(_this.recentData.currVegeProducrt) +
              parseFloat(_this.recentData.currFoodProducrt) +
              parseFloat(_this.recentData.currSeedProducrt)
            ).toFixed(2);
            _this.recentData.currTotalSale = (
              parseFloat(_this.recentData.currVegeSale) +
              parseFloat(_this.recentData.currFoodSale) +
              parseFloat(_this.recentData.currSeedSale)
            ).toFixed(2);
            _this.recentData.currTotalSaleRevenrt = (
              parseFloat(_this.recentData.currVegeSaleRevenrt) +
              parseFloat(_this.recentData.currFoodSaleRevenrt) +
              parseFloat(_this.recentData.currSeedSaleRevenrt)
            ).toFixed(2);
            _this.recentData.currTotalGrossProfit = (
              parseFloat(_this.recentData.currVegeGrossProfit) +
              parseFloat(_this.recentData.currFoodGrossProfit) +
              parseFloat(_this.recentData.currSeedGrossProfit)
            ).toFixed(2);
          }
        }
      });
    },
    addSalesFn: function () {
      var _this = this;
      _this.dialogSales = true;
      _this.salesType = 'add';
    },
    editSalesFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.salesTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogSales = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.dialogFormSales);
      });
      _this.salesType = 'edit';
    },
    delectSalesFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.salesTable.selections;
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
                '/api/rptoperenergysalesdetail/deleteSalesDetail',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('删除成功');
                  _this.init();
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
    saveSales: function () {
      var _this = this;
      if (_this.salesType == 'add') {
        _this.dialogFormSales.serno = _this.param.serno;
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/rptoperenergysalesdetail/insert',
          data: _this.dialogFormSales,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogSales = false;
              _this.$refs.salesDialog.resetFields();
              _this.init();
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
      } else if (_this.salesType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptoperenergysalesdetail/updateSalesDetail',
          data: _this.dialogFormSales,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.dialogSales = false;
              _this.$refs.salesDialog.resetFields();
              _this.init();
              _this.$message({
                message: '操作成功！'
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
    backSales: function () {
      var _this = this;
      _this.dialogSales = false;
      _this.$refs.salesDialog.resetFields();
    },
    addPurchaseFn: function () {
      var _this = this;
      _this.dialogPurchase = true;
      _this.purchaseType = 'add';
    },
    editPurchaseFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.purchaseTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogPurchase = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.dialogFormPurchase);
      });
      _this.purchaseType = 'edit';
    },
    delectPurchaseFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.purchaseTable.selections;
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
                '/api/rptoperenergypurchasedetail/deletePurchaseDetail',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('删除成功');
                  _this.init();
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
    savePurchase: function () {
      var _this = this;
      if (_this.purchaseType == 'add') {
        _this.dialogFormPurchase.serno = _this.param.serno;
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz + '/api/rptoperenergypurchasedetail/insert',
          data: _this.dialogFormPurchase,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogPurchase = false;
              _this.$refs.purchaseDialog.resetFields();
              _this.init();
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
      } else if (_this.purchaseType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptoperenergypurchasedetail/updatePurchaseDetail',
          data: _this.dialogFormPurchase,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.dialogPurchase = false;
              _this.$refs.purchaseDialog.resetFields();
              _this.init();
              _this.$message({
                message: '操作成功！'
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
    backPurchase: function () {
      var _this = this;
      _this.dialogPurchase = false;
      _this.$refs.purchaseDialog.resetFields();
    },
    /**
     * 报表修改
     */
    editFn: function () {
      var _this = this;
      _this.editFlag = true;
      _this.showEditBtn = false;
      _this.tmpItem = [];
      yufp.clone(_this.recentData, _this.tmpItem);
    },
    /**
     * 报表返回
     */
    cancelFn: function () {
      var _this = this;
      if (_this.editFlag === true) {
        _this.editFlag = false;
        _this.showEditBtn = true;
        yufp.clone(_this.tmpItem, this.recentData);
      }
    },
    inputChange: function (item, arg) {
      var _this = this;
      var val = _this.recentData[arg];
      if (isNaN(val) || val.trim() == '') {
        _this.recentData[arg] = '0.00';
      }
      if (item == 'nearSecondProducrt') {
        _this.recentData.nearSecondTotalProducrt = (
          parseFloat(_this.recentData.nearSecondVegeProducrt) +
          parseFloat(_this.recentData.nearSecondFoodProducrt) +
          parseFloat(_this.recentData.nearSecondSeedProducrt)
        ).toFixed(2);
      } else if (item == 'nearSecondSale') {
        _this.recentData.nearSecondTotalSale = (
          parseFloat(_this.recentData.nearSecondVegeSale) +
          parseFloat(_this.recentData.nearSecondFoodSale) +
          parseFloat(_this.recentData.nearSecondSeedSale)
        ).toFixed(2);
      } else if (item == 'nearSecondSaleRevenrt') {
        _this.recentData.nearSecondTotalSaleRevenrt = (
          parseFloat(_this.recentData.nearSecondVegeSaleRevenrt) +
          parseFloat(_this.recentData.nearSecondFoodSaleRevenrt) +
          parseFloat(_this.recentData.nearSecondSeedSaleRevenrt)
        ).toFixed(2);
      } else if (item == 'nearSecondGrossProfit') {
        _this.recentData.nearSecondTotalGrossProfit = (
          parseFloat(_this.recentData.nearSecondVegeGrossProfit) +
          parseFloat(_this.recentData.nearSecondFoodGrossProfit) +
          parseFloat(_this.recentData.nearSecondSeedGrossProfit)
        ).toFixed(2);
      } else if (item == 'nearFirstProducrt') {
        _this.recentData.nearFirstTotalProducrt = (
          parseFloat(_this.recentData.nearFirstVegeProducrt) +
          parseFloat(_this.recentData.nearFirstFoodProducrt) +
          parseFloat(_this.recentData.nearFirstSeedProducrt)
        ).toFixed(2);
      } else if (item == 'nearFirstSale') {
        _this.recentData.nearFirstTotalSale = (
          parseFloat(_this.recentData.nearFirstVegeSale) +
          parseFloat(_this.recentData.nearFirstFoodSale) +
          parseFloat(_this.recentData.nearFirstSeedSale)
        ).toFixed(2);
      } else if (item == 'nearFirstSaleRevenrt') {
        _this.recentData.nearFirstTotalSaleRevenrt = (
          parseFloat(_this.recentData.nearFirstVegeSaleRevenrt) +
          parseFloat(_this.recentData.nearFirstFoodSaleRevenrt) +
          parseFloat(_this.recentData.nearFirstSeedSaleRevenrt)
        ).toFixed(2);
      } else if (item == 'nearFirstGrossProfit') {
        _this.recentData.nearFirstTotalGrossProfit = (
          parseFloat(_this.recentData.nearFirstVegeGrossProfit) +
          parseFloat(_this.recentData.nearFirstFoodGrossProfit) +
          parseFloat(_this.recentData.nearFirstSeedGrossProfit)
        ).toFixed(2);
      } else if (item == 'currProducrt') {
        _this.recentData.currTotalProducrt = (
          parseFloat(_this.recentData.currVegeProducrt) +
          parseFloat(_this.recentData.currFoodProducrt) +
          parseFloat(_this.recentData.currSeedProducrt)
        ).toFixed(2);
      } else if (item == 'currSale') {
        _this.recentData.currTotalSale = (
          parseFloat(_this.recentData.currVegeSale) +
          parseFloat(_this.recentData.currFoodSale) +
          parseFloat(_this.recentData.currSeedSale)
        ).toFixed(2);
      } else if (item == 'currSaleRevenrt') {
        _this.recentData.currTotalSaleRevenrt = (
          parseFloat(_this.recentData.currVegeSaleRevenrt) +
          parseFloat(_this.recentData.currFoodSaleRevenrt) +
          parseFloat(_this.recentData.currSeedSaleRevenrt)
        ).toFixed(2);
      } else if (item == 'currGrossProfit') {
        _this.recentData.currTotalGrossProfit = (
          parseFloat(_this.recentData.currVegeGrossProfit) +
          parseFloat(_this.recentData.currFoodGrossProfit) +
          parseFloat(_this.recentData.currSeedGrossProfit)
        ).toFixed(2);
      }
    },
    saveBtn: function () {
      var _this = this;
      var obj = {};
      obj.rptOperProductionOper = _this.basicFormData;
      obj.rptOperProductionOper.breedOtherNeedDesc =
        _this.otherDescFormData.breedOtherNeedDesc;
      obj.rptOperProductionOper.saleOtherNeedDesc =
        _this.saleOtherDescFormData.saleOtherNeedDesc;
      obj.rptOperProductionOper.buyOtherNeedDesc =
        _this.buyOtherDescFormData.buyOtherNeedDesc;
      obj.rptOperAgriculture = _this.agricultureFormData;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptoperagriculture/updateOper',
        data: obj,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '操作成功！'
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
    },
    saveFn: function () {
      var _this = this;
      _this.recentData.currSaleWaveReason =
        _this.agricultureFormData.currSaleWaveReason;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptoperagriculture/updateOper',
        data: _this.recentData,
        callback: function (code, message, response) {
          if (response.data > 0) {
            yufp.clone(_this.recentData, _this.tmpItem);
            _this.$message({
              message: '操作成功！'
            });
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
    $formatNumber: function (format, sort) {
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
        return _this.$number(val, format);
      };
    },
    $number: function (v, format) {
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
        psplit = (i18n
          ? format.replace(/[^\d,]/g, '')
          : format.replace(/[^\d.]/g, '')
        ).split(dec);

      if (psplit.length > 1) {
        v = v.toFixed(psplit[1].length);
      } else if (psplit.length > 2) {
        throw new Error(
          'NumberFormatException: invalid format, formats should have no more than 1 period: ' +
            format
        );
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
    }
  }
};
</script>
<style>
.agriculture tr > td {
  border: 1px solid #a2aebd;
  height: 30px;
}

.agriculture .item__header td {
  background-color: #feb201;
  color: #000000;
  text-align: center;
}

.agriculture .item__amt_txt {
  padding: 3px 10px;
}
.agriculture .item_header {
  text-align: center;
}
#opera tr > td {
  border: 1px solid #a2aebd;
  height: 30px;
  padding: 3px 10px;
  font-size: 14px;
}
</style>
