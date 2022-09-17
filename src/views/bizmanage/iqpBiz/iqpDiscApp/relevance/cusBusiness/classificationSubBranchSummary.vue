
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="输入查询条件" panel-type="simple">
      <yu-xform related-table-name="refTable" ref="searchForm"  form-type="searchForm" v-model="searchFormdata"    label-width="60px">
        <yu-xform-group :column="2">
          <yu-xform-item label="支行名称" placeholder="" name="managerBrId" hidden="true"></yu-xform-item>
            <yu-xform-item name="managerBrId" :colspan="8" ctype="YuXorg" @select-fn="commonSelectFn" :mapping="{'managerBrId':'managerBrId','managerBrIdName':'managerBrIdName'}" label="支行名称" label-width="80px"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
                <div class="button-group" align="center">
                    <yu-button type="primary" @click="searchFna()" >查询</yu-button>
                    <yu-button type="primary" @click="resetFn()">重置</yu-button>
                </div>
      </yu-panel>
      <yu-panel title="贷款风险分类支行汇总表（实时）" :hideFilter="false" :collapseHide="false" style="margin-top:20px">
      <yu-button-drop>
        <yufp-excel-export type="primary" :export-url="excelExportUrl" title="导出" :export-param="{condition: JSON.stringify(searchFormdata)}" v-if="checkCtrl('export')" request-type="POST"></yufp-excel-export>
        <!--<yu-button @click="infoFn">下载文件</yu-button>-->
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" row-number :parse-response="requestSuccess" :data-url="dataUrl" :base-params="Param" selection-type="radio" :default-load="false" request-type="POST">
        <yu-xtable-column label="支行名称" prop="managerBrIdName"></yu-xtable-column>
       <!-- <yu-xtable-column label="贴现余额" prop="discountBalance"></yu-xtable-column> -->
        <yu-xtable-column label="贷款余额" prop="loanBalance"></yu-xtable-column>
        <yu-xtable-column label="其中" align="center">
          <yu-xtable-column label="正常类" prop="normalCount"></yu-xtable-column>
          <yu-xtable-column label="关注类" prop="followCount"></yu-xtable-column>
          <yu-xtable-column label="次级类" prop="inferiorityCount"></yu-xtable-column>
          <yu-xtable-column label="可疑类" prop="suspiciousCount"></yu-xtable-column>
          <yu-xtable-column label="损失类" prop="damageCount"></yu-xtable-column>
        </yu-xtable-column>
        <yu-xtable-column label="对公贷款" align="center">
          <yu-xtable-column label="小计" prop="subtotal"></yu-xtable-column>
          <yu-xtable-column label="正常1类" prop="normalCount1"></yu-xtable-column>
          <yu-xtable-column label="正常2类" prop="normalCount2"></yu-xtable-column>
          <yu-xtable-column label="正常3类" prop="normalCount3"></yu-xtable-column>
          <yu-xtable-column label="关注1类" prop="followCount1"></yu-xtable-column>
          <yu-xtable-column label="关注2类" prop="followCount2"></yu-xtable-column>
          <yu-xtable-column label="关注3类" prop="followCount3"></yu-xtable-column>
          <yu-xtable-column label="次级1类" prop="inferiorityCount1"></yu-xtable-column>
          <yu-xtable-column label="次级2类" prop="inferiorityCount2"></yu-xtable-column>
          <yu-xtable-column label="可疑类" prop="suspiciousCount1"></yu-xtable-column>
          <yu-xtable-column label="损失类" prop="damageCount1"></yu-xtable-column>
        </yu-xtable-column>
        <yu-xtable-column label="对私贷款" align="center">
          <yu-xtable-column label="小计" prop="subtotal1"></yu-xtable-column>
          <yu-xtable-column label="正常类" prop="normalCount4"></yu-xtable-column>
          <yu-xtable-column label="关注类" prop="followCount4"></yu-xtable-column>
          <yu-xtable-column label="次级类" prop="inferiorityCount4"></yu-xtable-column>
          <yu-xtable-column label="可疑类" prop="suspiciousCount4"></yu-xtable-column>
          <yu-xtable-column label="损失类" prop="damageCount4"></yu-xtable-column>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import { mapState } from 'vuex';
import mixin from '@/utils/mixin';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
export default {
  mixins: [mixin],
  components: {YufpExcelExport},
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/accdisc/selectClassificationSubBranchSummary',
      excelExportUrl: backend.cmisBiz + '/api/accdisc/exportClassificationSubBranchSummary'
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      org: state => state.oauth.org,
      instu: state => state.oauth.instu, // 金融机构Object
      loginCode: state => state.oauth.loginCode
    })
  },
  mounted () {
    this.Param = { condition: JSON.stringify({ instuCde: '001', cusType: '2' }) };
  },
  methods: {
    requestSuccess (code, msg, response) {
      if (typeof response.data == 'string') {
        this.$refs.refTable.tabledata = [];
        this.$xutils.showMsgBox('提示', response.data);
        return false;
      }
    },

    // 自定义重置功能
    resetFn: function () {
      this.$refs.searchForm.resetFields();
    },
    /**
       * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'managerId') {
            this.searchFormdata[mapping[item]] = data.loginCode;
          } else if (item === 'managerBrId') {
            this.searchFormdata[mapping[item]] = data.orgCode;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'managerId') {
            this.searchFormdata[item] = data.loginCode;
          } else if (item === 'managerBrId') {
            this.searchFormdata[item] = data.orgCode;
          }
        }
      }
    },
    // 条件查询
    searchFna: function () {
      this.$refs.refTable.remoteData({
        condition: JSON.stringify(this.searchFormdata)
      });
    }
  }
};
</script>
