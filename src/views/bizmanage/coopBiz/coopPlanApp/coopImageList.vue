<template>
  <!--
    @created by hanl 2021-08-06
    @updated by
    @description 页面
  -->
  <yu-panel title="影像列表" :collapseHide="false">
    <template slot="right">
      <yu-button-drop>
        <yu-button type="primary" @click="imageFn()">打开影像</yu-button>
      </yu-button-drop>
    </template>
    <yu-xtable ref="refTable" request-type="post" selection-type="radio" condition-key="condition" :pageable="true" style="margin-top:10px" row-number :data-url="url" :base-params="baseParam" :default-load="false">
      <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
      <yu-xtable-column label="影像编号" prop="imageNo"></yu-xtable-column>
      <yu-xtable-column label="影像内容" prop="imageDesc"></yu-xtable-column>
    </yu-xtable>
  </yu-panel>
</template>
<script>
export default {
  data () {
    return {
      url: `${backend.cmisBiz}/api/busiimagerelinfo/query`,
      baseParam: {},
    };
  },
  created () {
    this.baseParam = { condition: { serno: this.$route.meta.params ? this.$route.meta.params.serno : this.$route.params.serno}};
  },
  mounted () {
    
  },
  methods: {
    refreshTable(){
      this.$refs.refTable.remoteData();
    },
    imageFn: function () {
      const row = this.$refs.refTable.selections[0];
      if (!row) {
        this.$xutils.showMsgBox('提示', '请选择一条数据');
        return false;
      }
      let top_outsystem_code = row.topOutsystemCode;
      let keyword_type = row.keywordType;
      let imageNo = row.imageNo;
      // 合作方准入、合作协议影像，本地的零售客户经理、对公客户经理只有查看权限，由资料扫描岗上传影像;
      let authority = row.authority;
      let loginUser = this.$xutils.getLoginUserInfo();
      const orgType = loginUser.org.orgType;
      const dutysList = loginUser.dutys;
      if ((orgType != '1' && orgType != '2' && orgType != '3' && orgType != 'A') && dutysList != undefined) {
          for (let i = 0; i < dutysList.length; i++) {
            let item = dutysList[i];
            if (item.code === 'FZH01' || item.code === 'FZH02') {
                authority = 'download';
                break;
            }
          };
        }

      let imageBizParam = [];
      if(top_outsystem_code.indexOf('LPHZYX;') > -1){
        imageBizParam.push({
          'top_outsystem_code': 'LPHZYX', // 楼盘影像
          'index': {
            'contid': imageNo
          }
        });
        imageBizParam.push({
          'top_outsystem_code': top_outsystem_code.replace('LPHZYX;', ''),
          'index': {
            [keyword_type]: imageNo
          }
        });
      }else{
        imageBizParam.push({
          'top_outsystem_code': top_outsystem_code,
          'index': {
            [keyword_type]: imageNo
          }
        });
      }
      this.$dialog.open(
        row.imageDesc,
        'imageManage/imageSystem',
        1500,
        800,
        {'authority': authority, 's': '1', 'para': imageBizParam},
        () => {
        },
        false,
        false
      );
    }
  }
};
</script>
