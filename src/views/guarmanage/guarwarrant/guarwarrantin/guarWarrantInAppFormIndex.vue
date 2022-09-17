<template>
  <div class="blank_template">
  <yu-row>
    <yu-col :sm="3" :xs="24">
      <yu-menu class="tac" :default-active="activeIndex" @select="selectFn" theme="light">
        <yu-menu-item index="1">申请信息</yu-menu-item>
        <yu-menu-item index="2">影像资料</yu-menu-item>
        <yu-menu-item index="3">审批历史</yu-menu-item>
      </yu-menu>
    </yu-col>
    <yu-col :sm="20" :xs="24">
      <!--申请信息-->
      <guarWarrantInUpdateIndex v-show="activeIndex == '1'" ref="guarWarrantInUpdateIndex" :params="pageParams" :wfData="bizPageData" :dialogId="dialogId"></guarWarrantInUpdateIndex>
      <imageSystem v-if="activeIndex == '2'" authority="import;insert;download;scan;delImg" :s="permission" :para="imageBizParam"></imageSystem>
      <approvalIndex v-if="activeIndex == '3'" ref="approvalIndex" :params="pageParams" :wfData="bizPageData" :dialogId="dialogId"></approvalIndex>
    </yu-col>
  </yu-row>
 </div>
</template>
<script>
// 申请信息
import guarWarrantInUpdateIndex from '@/views/guarmanage/guarwarrant/guarwarrantin/guarWarrantInUpdateIndex.vue';
import imageSystem from '@/views/imageManage/imageSystem';
import approvalIndex from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex.vue';
export default {
  components: { guarWarrantInUpdateIndex, imageSystem, approvalIndex},
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data: function () {
    return {
      color: [],
      activeIndex: '1',
      activeName: 'cusIndivBase',
      bizType: '',
      cusId: {},
      op: '',
      imageBizParam: [
        {
          top_outsystem_code: 'DKDY',
          index: {}
        }
      ],
      permission: '1'
    };
  },
  mounted () {
    if(!this.pageParams){
      this.pageParams = {};
    }
    let warrantInType = (this.pageParams && this.pageParams.warrantInType) || (this.bizPageData && this.bizPageData.instanceInfo.param.warrantInType);
    let dutys = this.$xutils.getLoginUserInfo().dutys;        
    if (this.pageParams && this.pageParams.type == 'VIEW') {
      this.permission = '2';
    } else {
      //影像上传由集中作业复核岗上传 dutys[i].code === 'ZYB13' ||   客户经理岗也有权限上传影像
      for (let i = 0; i < dutys.length; i++) {
        //客户经理和集中作业权证初审岗只有查看权限
        if (dutys[i].code === 'FZH01' || dutys[i].code === 'FZH02' || dutys[i].code === 'XWB01' || dutys[i].code === 'ZYB12') {
          if(warrantInType == '02'){
            // 纸质权证集中入库模式 只有查看权限
            this.permission = '2';
          }else {
            // 纸质权证柜面入库模式 有权限上传权限
            this.permission = '1';
          }
        }
      }
    }    
  },
  methods: {
    /**
     * 左侧菜单点击事件
     */
    selectFn (index) {
      this.activeIndex = index;
      if(index === '2') {
        let serno = this.$refs.guarWarrantInUpdateIndex.$refs.d1_BillCard.formdata.coreGuarantyNo;
        this.imageBizParam[0] = {
          top_outsystem_code: 'CMSYPYX',
          index: {
            'docid': serno
          }
        }
      }
      // 颜色操作
      this.color[index] = 'color: #fff;';
    }
  }
};
</script>
