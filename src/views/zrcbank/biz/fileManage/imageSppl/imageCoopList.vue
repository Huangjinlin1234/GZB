<template>
  <!--
    @created by hanl 2021-08-06
    @updated by
    @description 页面
  -->
  <yu-panel title="影像列表" :collapseHide="false">
    <template slot="right">
      <yu-button-drop>
        <yu-button @click="imageFn()">打开影像</yu-button>
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
  props: {
    bizPageData: Object
  },
  data () {
    return {
      url: `${backend.cmisBiz}/api/busiimagerelinfo/query`,
      baseParam: {},
      authority: 'import;insert;download;scan' // delImg
    };
  },
  created () {
    var _this = this;
    let bizSerno = '';
    if (_this.bizPageData != null || _this.bizPageData != undefined) {
      const data = this.bizPageData.instanceInfo;
      // console.log(data);
      let flowParam = JSON.parse(JSON.stringify(data.flowParam));
      flowParam = JSON.parse(flowParam);
      bizSerno = flowParam.serno;
    }
    this.baseParam = { condition: { serno: this.bizPageData == undefined ? this.$route.meta.params.jsonData.bizSerno : bizSerno}};
  },
  mounted () {

  },
  methods: {
    refreshTable () {
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
      // this.authority = row.authority;
      let loginUser = this.$xutils.getLoginUserInfo();
      const orgType = loginUser.org.orgType;
      const dutysList = loginUser.dutys;
      if (dutysList != undefined && dutysList.length > 0) {
        for (let i = 0; i < dutysList.length; i++) {
          let item = dutysList[i];
          if (item.code === 'ZYB21' || item.code === 'XDB14') { // 集中作业放款审核管理岗
            this.authority = 'import;insert;download;scan;delImg';
            break;
          }
        };
      }

      let imageBizParam = [];
      if (top_outsystem_code.indexOf('LPHZYX;') > -1) {
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
      } else {
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
        {'authority': this.authority, 's': '1', 'para': imageBizParam},
        () => {
        },
        false,
        false
      );
    }
  }
};
</script>
