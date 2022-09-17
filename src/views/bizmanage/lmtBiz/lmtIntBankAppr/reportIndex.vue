<template>
  <div class="tab-form">
    <yu-tabs type="card">
      <yu-tab-pane label="授信申报详情" v-if="type">
        <div v-if="change">
          <lmtIntBankAppDetails v-if="showParams" :pageParams="pageParams"></lmtIntBankAppDetails>
        </div>
        <div v-else>
          <lmtIntBankAppDetailsCha v-if="showParams" :pageParams="pageParams"></lmtIntBankAppDetailsCha>
        </div>
      </yu-tab-pane>
      <yu-tab-pane label="授信申报详情" v-else>
        <subjectCreditDetails v-if="showParams" :bizPageData="pageParams"></subjectCreditDetails>
      </yu-tab-pane>

    </yu-tabs>

  </div>
</template>

<script>
import lmtIntBankAppDetails from "../lmtIntBankApp/lmtIntBankAppDetails";
import lmtIntBankAppDetailsCha from "../lmtIntBankAppCha/lmtIntBankAppDetails";
import subjectCreditDetails from "../subjectCredit/subjectCreditDetails";
import {updateCommonSignAndOpinion} from "../util/BizInvestCommonUtil";
export default {
  mixins: [updateCommonSignAndOpinion],
  components: { lmtIntBankAppDetails, subjectCreditDetails, lmtIntBankAppDetailsCha },
  props: {
    bizPageData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data: function () {
    return {
      pageParams: {},
      type: false,
      showParams: false,
      replyUrl: '',
      change: true,
    };
  },
  created() {
    console.log(this.bizPageData);
    let instanceInfo = this.bizPageData.instanceInfo;
    let flowParam = this.bizPageData.flowParam;
    let serno, cusId, op;

    var _this = this;
    let arr = Object.keys(flowParam);
    if(arr.length > 0){
      let flowParam = this.bizPageData.flowParam;
      goProcess(flowParam, instanceInfo);
    }else{
      this.$request({
          method: 'POST',
          url: backend.appOcaService + '/api/flow/getInstanceInfoByInstanceId',
          data: this.bizPageData.instanceInfo.instanceId
        })
        .then((data) => {
          if (data.code == '0') {
            yufp.clone(data.data, flowParam);
            goProcess(flowParam, instanceInfo);
          } else {
            _this.$message({ message: '请求失败', type: 'error' });
          }
        });
    }
    function goProcess(flowParam, instanceInfo){
      let tableName = flowParam.tableName;
      let type;
      if (tableName == "lmtIntbankApp") {
        let lmtType = flowParam.lmtType;
        lmtType == '02' ? _this.change = false : _this.change = true;
        type = true;
        op = "look";
        serno = instanceInfo.bizId;
        cusId = instanceInfo.bizUserId;
        _this.pageParams = flowParam
        _this.pageParams.serno = serno;
        _this.pageParams.cusId = cusId;
        _this.pageParams.op = op;
        _this.replyUrl = '/api/lmtintbankappr/updateRestByPkId';
      } else if (tableName == "lmtsiginvestapp") {

        type = false;
        let lmtType = flowParam.lmtType;
        op = "DETAIL";
        serno = instanceInfo.bizId;
        cusId = instanceInfo.bizUserId ? instanceInfo.bizUserId : flowParam.cusId;
        let selectType = "Info";
        if (lmtType == "05") {
          selectType = "Back";
        }
        _this.pageParams = flowParam;
        _this.pageParams.serno = serno;
        _this.pageParams.cusId = cusId;
        _this.pageParams.op = op;
        _this.pageParams.selectType = selectType;
        _this.pageParams.lmtBizType = flowParam.lmtBizType;
        _this.pageParams.cusCatalog = instanceInfo.param ? instanceInfo.param.cusCatalog : flowParam.cusCatalog;
        _this.replyUrl = '/api/lmtsiginvestappr/updateRestByPkId';
      }
      _this.type = type;
      _this.showParams = false;
      _this.$nextTick(() => {
        _this.showParams = true;
      })
    }

  },
  mounted: function () {},
  methods: {},
};
</script>

<style></style>
