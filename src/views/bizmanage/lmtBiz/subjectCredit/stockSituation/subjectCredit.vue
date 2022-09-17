<template>
  <div>
    <!-- 同业客户 -->
    <div v-if="children.customer==3">
      <yu-panel title="综合授信存量授信情况" panel-type="simple">
        <yu-xtable :data="sumData" :pageable="true" :default-load="true">
          <yu-xtable-column label="授信分项流水号" prop="subSerno"></yu-xtable-column>
          <yu-xtable-column label="授信分项额度名称" prop="lmtBizTypeName"></yu-xtable-column>
          <yu-xtable-column label="授信额度（万元）" prop="lmtAmt">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.lmtAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="已用额度（万元）" prop="outstndAmt">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.outstndAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="可用额度（万元）" prop="avlLmtAmt">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.avlLmtAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="额度到期日" prop="lmtEndDate"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-panel title="资金业务存量授信情况" panel-type="simple">
        <yu-xtable :data="fundData" :pageable="true" :default-load="true">
          <yu-xtable-column label="授信分项流水号" prop="subSerno"></yu-xtable-column>
          <yu-xtable-column label="授信分项额度名称" prop="lmtBizTypeName"></yu-xtable-column>
          <yu-xtable-column label="授信额度（万元）" prop="lmtAmt">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.lmtAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="已用额度（万元）" prop="outstndAmt">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.outstndAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="可用额度（万元）" prop="avlLmtAmt">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.avlLmtAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="额度到期日" prop="lmtEndDate"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-panel title="债券池用信情况" panel-type="simple">
        <yu-xtable :data="debtData" :pageable="true" :default-load="true">
          <yu-xtable-column label="投资资产名称" prop="investAssetName"></yu-xtable-column>
          <yu-xtable-column label="投资金额（万元）" prop="lmtAmt">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.lmtAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="交易日期" prop="tranDate"></yu-xtable-column>
          <yu-xtable-column label="投资部门/分支机构名称" prop="inputBrIdName"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </div>
    <!-- 企业法人 -->
    <div v-else>
      <yu-panel title="资金业务存量授信情况" panel-type="simple">
        <yu-xtable :data="fundData" :pageable="true" :default-load="true">
          <yu-xtable-column label="授信分项流水号" prop="subSerno"></yu-xtable-column>
          <yu-xtable-column label="授信分项额度名称" prop="lmtBizTypeName"></yu-xtable-column>
          <yu-xtable-column label="授信额度（万元）" prop="lmtAmt">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.lmtAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="已用额度（万元）" prop="outstndAmt">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.outstndAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="可用余额（万元）" prop="avlLmtAmt">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.avlLmtAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="额度到期日" prop="lmtEndDate"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-panel title="债券池用信情况" panel-type="simple">
        <yu-xtable :data="debtData" :pageable="true" :default-load="true">
          <yu-xtable-column label="投资资产名称" prop="investAssetName"></yu-xtable-column>
          <yu-xtable-column label="投资金额（万元）" prop="lmtAmt">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.lmtAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="交易日期" prop="tranDate"></yu-xtable-column>
          <yu-xtable-column label="投资部门/分支机构名称" prop="inputBrIdName"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-panel title="信贷业务存量授信情况" panel-type="simple">
        <div class="title">1、敞口存量授信情况</div>
        <yu-xtable :data="openData" :pageable="true" :default-load="true">
          <yu-xtable-column label="授信分项流水号" prop="subSerno"></yu-xtable-column>
          <yu-xtable-column label="授信分项额度名称" prop="lmtBizTypeName"></yu-xtable-column>
          <yu-xtable-column label="授信额度（万元）" prop="lmtAmt">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.lmtAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="已用额度（万元）" prop="outstndAmt">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.outstndAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="可用额度（万元）" prop="avlLmtAmt">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.avlLmtAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="额度到期日" prop="lmtEndDate"></yu-xtable-column>
        </yu-xtable>
        <div class="title">2、低风险存量授信情况</div>
        <yu-xtable :data="lowRiskData" :pageable="true" :default-load="true">
          <yu-xtable-column label="授信分项流水号" prop="subSerno"></yu-xtable-column>
          <yu-xtable-column label="授信分项额度名称" prop="lmtBizTypeName"></yu-xtable-column>
          <yu-xtable-column label="授信额度（万元）" prop="lmtAmt">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.lmtAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="已用额度（万元）" prop="outstndAmt">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.outstndAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="可用额度（万元）" prop="avlLmtAmt">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.avlLmtAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="额度到期日" prop="lmtEndDate"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </div>
  </div>
</template>
<script>
import {numFn} from '@/utils/unitchange';
import {isNull} from "../../common/bizUtils";
export default {
  props: {
    children: String
  },
  data () {
    return {
      formdata: {},
      dataUrl: backend.cmisBiz + '/api/lmtapprelcusdetailslimit/selectByModel',
      Param: {
        condition: JSON.stringify({
          serno: this.children.serno,
          oprType: '01'
        })
      },
      fundData: [],
      debtData: [],
      openData: [],
      sumData: [],
      lowRiskData: [],
      numFn
    };
  },
  created () {
    console.log('==========', this.children);
    // let data = {};
    // data.serno = this.children.serno;
    // data.cusId = this.children.cusId;
    //
    if (isNull(this.children.serno) || isNull(this.children.cusId)) {
      this.$message({message: '获取失败，请重新访问！', type: 'error'});
      return;
    }
    this.getData('11').then((res) => {
      this.fundData = res;
    });
    this.getData('13').then((res) => {
      this.debtData = res;
    });
    this.getData('21').then((res) => {
      this.openData = res;
      this.sumData = res;
    });
    this.getData('22').then((res) => {
      this.lowRiskData = res;
    });

    // 资金业务
    // this.fundData = [];
    // 债务业务 债券池
    // this.debtData = [];
    // 敞口存量
    // this.openData;
    // 低风险存量
    // this.lowRiskData;
    // 综合授信
    // this.sumData;
  },
  mounted () {},
  methods: {
    getData (lmtCatalog) {
      var _this = this;
      return new Promise((resolve, reject) => {
        _this
          .$request({
            method: 'POST',
            url:
              backend.cmisBiz + '/api/lmtapprelcusdetailslimit/selectByModel',
            data: {
              condition: JSON.stringify({
                serno: this.children.serno,
                cusId: this.children.cusId,
                lmtCatalog: lmtCatalog
              })
            }
          })
          .then((data) => {
            if (data.code == '0') {
              resolve(data.data);
            } else {
              this.$message({ message: '请求失败', type: 'error' });
            }
          });
      });
    }
  }
};
</script>
<style scoped>
.title {
  padding-bottom: 20px;
}
</style>
