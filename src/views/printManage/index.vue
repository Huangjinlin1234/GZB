<template>
  <div id="print">
    <div id="printContent">
      <yu-xtable ref="printTable"  row-number :data-url="dataUrl" :base-params="searchData" :pageable="false" requestType="POST" condition-key="condition">
        <yu-xtable-column label="合同名称" prop="tempName" ></yu-xtable-column>
        <yu-xtable-column label="操作" prop="opr" align="center" width="200">
          <template slot-scope="drawScope">
            <yu-button size="small" type="primary" @click="drawPrint(drawScope.$index, drawScope.row)">预览</yu-button>
            <yu-button size="small" type="primary" :hidden="drawScope.row.contPageType != '2'" @click="drawQZpdf(drawScope.$index, drawScope.row)">部分打印</yu-button>
            <yu-button size="small" type="primary" :hidden="drawScope.row.contPageType != '3'" @click="drawQZpdf(drawScope.$index, drawScope.row)">尾页打印</yu-button>
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="cancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      dataUrl: this.$backend.cmisCfg + '/api/cfgctrcontprinttemp/queryContPrint',
      searchData: {condition: {list: JSON.stringify(this.pageParams)}}
    };
  },
  mounted () {
    // this.initData();
  },
  methods: {
    // initData () {
    // var data = {};
    // data.list = JSON.stringify(this.pageParams);
    // this.searchData = { condition: data };
    // },
    cancel () {
      this.$dialog.close(this.dialogId);// 关闭查看页面
    },
    drawPrint (index, row) {
      var _this = this;
      _this.viewfrpt(row);
    },
    drawQZpdf (index, row) {
      var _this = this;
      _this.viewCfca(row);
    },
    // 打开帆软报表
    viewfrpt (row) {
      let userInfo = this.$xutils.getLoginUserInfo();
      var managerId = userInfo.loginCode;
      let org = userInfo.orgCode;
      let cz = '';
      if (org.startsWith('80') || org.startsWith('81')) {
        cz = 1;
      }
      var serno = row.contParams.substr(row.contParams.lastIndexOf('=') + 1);
      let userIdListDesc = [];
      var url = this.$backend.workflowService + '/api/core/getAllCommentsByBizId/';
      yufp.service.request({
        method: 'GET',
        data: {bizId: serno},
        url: url,
        async: false,
        callback: function (code, message, response) {
          if (code == 0) {
            userIdListDesc = response.data;
          }
        }
      });
      let userIdListAsc = userIdListDesc.reverse();
      let managerId1 = '';
      userIdListAsc.forEach(item => {
        managerId1 = managerId1 + ' ' + item.userId;
      });
      debugger;
      let cptName = row.suitReportName;
      let params = {};
      let name = 'printManage/frptdemo'; // 引入另外一个vue文件
      params.src = this.$backend.frptRptService + cptName + row.contParams + '&managerId=' + managerId + '&cz=' + cz + '&managerId1=' + managerId1;
      this.$dialog.open(
        '帆软打印',
        name,
        1200,
        800,
        params,
        null,
        true,
        true
      );
    },

    // 打开有章的PDF文件
    viewCfca (row) {
      var _this = this;
      // 对传入参数进行重新拼装
      var contParams = row.contParams;
      var map = {};
      if (contParams != null || contParams != '') {
        var split = contParams.split('&');
        for (var i = 1; i < split.length; i++) {
          var temp = split[i].split('=');
          for (var j = 0; j < temp.length > 0 ? temp.length : 0; j++) {
            map[temp[0]] = temp[1];
          }
        }
      }
      // 获取当前登录人信息
      const userInfo = _this.$xutils.getLoginUserInfo(); // 当前登录用户信息
      let loginCode = userInfo.loginCode;
      let orgCode = userInfo.orgCode;
      // 构建cfcaDto对象
      var model = {
        pdfFileName: map.serno + '_' + row.suitReportName.replace('.cpt', '.pdf'), // 生成的PDF文件名称
        managerId: loginCode,
        managerBrId: orgCode,
        sealserno: map.serno, // 印章流水号
        crossSealFlag: row.contPageType == '2', // 骑缝章标识(true/false)
        keySealFlag: row.contPageType == '3', // 专用章标识(true/false)
        keyWord: '（盖章处）', // 盖章关键字，仅用于专用章标识为true,在此字段周围盖章
        templateId: row.suitReportName, // 报表英文名称
        map: map, // 帆软报表参数
        contType: '1' // 合同标识 01--借款合同 02--抵押登记
      };
      yufp.service.request({
        method: 'POST',
        data: model,
        url: backend.cmisFrpt + '/dscms/frpt/api/frpt/addElectronicSeal',
        callback: function (code, message, response) {
          if (code == '0') {
            // 下载PDF文件
            yufp.service.request({
              method: 'POST',
              data: {'path': response.data},
              url: backend.cmisFrpt + '/dscms/frpt/api/frpt/downloadPdf',
              responseType: 'blob',
              callback: function (code, message, response) {
                if (response != null && response != '') {
                  // 1、在线打开方法，目前在谷歌与EDGE浏览器验证过
                  window.open(URL.createObjectURL(response));

                  // 2、下载方法
                  //  var fileName = this.$xutils.getDefaultformulaData("UUID");
                  //  if(window.navigator && window.navigator.msSaveOrOpenBlob){ //打开tab页签下载,IE11可能会报错（未验证）
                  //    window.navigator.msSaveOrOpenBlob(response, fileName);
                  //  }else{ //模拟a标签下载
                  //    let link = document.createElement("a");
                  //    link.download = fileName;
                  //    link.style.display = "none";
                  //    link.href = URL.createObjectURL(response);
                  //    document.body.appendChild(link);
                  //    link.click();
                  //    URL.revokeObjectURL(link.href);
                  //    document.body.removeChild(link);
                  //  }
                } else {
                  _this.$message({message: '下载PDF文件失败', type: 'warning'});
                }
              }
            });
          } else {
            _this.$message({message: message, type: 'warning'});
          }
        }
      });
    }
  }
};
</script>
