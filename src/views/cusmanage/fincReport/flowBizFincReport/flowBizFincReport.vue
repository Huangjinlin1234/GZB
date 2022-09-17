<template>
    <div>
        <yu-row>
            <yu-col :span="12">
                <cusIndivImage ref="cusIndivImage" :pageParams="fincPageParams" v-if="bizType === 'A07' || bizType === 'A08' || bizType === 'B07' || bizType === 'B08'"></cusIndivImage>
            </yu-col>
            <yu-col :span="12" style="margin-top: 38px;">
                <fincReportQuery ref="fincReportQuery" :params="fincPageParams" :is-flow-page="true" :bizInfo="bizPageData"></fincReportQuery>
            </yu-col>
        </yu-row>
    </div>
</template>
<script>
import fincReportQuery from '@/views/cusmanage/fincReport/fincReportQuery/fincReportQuery';
import cusIndivImage from "@/views/cusmanage/indivCus/indivCusCreate/cusIndivImageIndex";
export default{
  components: {fincReportQuery, cusIndivImage},
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      fincPageParams: {},
      bizType: '',
      cusId: '',
    };
  },
  methods: {
  },
  created () {
    // let serno = this.bizPageData.instanceInfo.bizId;
    this.cusId = this.bizPageData.instanceInfo.bizUserId;
    this.bizType = this.bizPageData.flowParam.bizType;
    console.info('bizType----------', this.bizType)
    this.fincPageParams = {
      cusId: this.cusId,
      bizType: this.bizType,
      bizId: this.bizPageData.instanceInfo.bizId,
      cusName: this.bizPageData.instanceInfo.bizUserName,
      nodeName: this.bizPageData.instanceInfo.nodeName
    };
  }

};
</script>