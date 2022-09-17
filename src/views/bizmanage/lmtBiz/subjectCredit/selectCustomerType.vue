<template>
  <div>
    <yu-tabs type="card" v-model="activeName">
      <yu-tab-pane v-if="show==1 || show==5 || show==6" label="同业客户" name="first">
        <yu-panel title="同业客户机构基本信息查看" panel-type="simple">
          <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px"
                    related-table-name="refTable" :custom-search-fn="customSearch">
            <yu-xform-group :column="3">
              <yu-xform-item label="机构客户编号" ctype="input" placeholder="机构客户编号" name="cusId" ></yu-xform-item>
              <yu-xform-item label="社会信用代码" ctype="input" placeholder="社会信用代码" name="socialCreditCode" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="cusName" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="管户客户经理" ctype="yu-xuser" placeholder="管户客户经理" name="managerId" @select-fn="commonSelectFn" :mapping="{'loginCode':'managerId'}" width="680" height="480"></yu-xform-item>
              <yu-xform-item label="客户状态 " ctype="select" placeholder="客户状态 " name="cusState" data-code="STD_CUS_STATE"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-button style="margin-bottom:10px;" type="primary" @click="backToAdd">选取返回</yu-button>
          <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :data-url="dataUrl" :default-load="true" request-type="POST">
            <yu-xtable-column label="机构客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="社会信用代码" prop="socialCreditCode" width="100px"></yu-xtable-column>
            <yu-xtable-column label="机构名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="管户客户经理" prop="managerIdName" width="100px"></yu-xtable-column>
            <yu-xtable-column label="主管机构" prop="managerBrIdName"></yu-xtable-column>
            <yu-xtable-column label="客户状态 " prop="cusState" data-code="STD_CUS_STATE"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane v-if="show==2 || show==5 || show==7" label="企业法人" name="second">
        <yu-panel title="业务合同" panel-type="simple">
          <yu-xform form-type="search" ref="refForm" v-model="bussinessSearchFormdata" label-width="120px" related-table-name="refTable1">
            <yu-xform-group :column="3">
              <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" fuzzy-query="both"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-button style="margin-bottom:10px;" type="primary" @click="backToAdd">选取返回</yu-button>
          <yu-xtable ref="refTable1" :row-number="true" selection-type="radio" :pageable="true" :data-url="bussinessDataUrl" :default-load="true" condition-key="condition" :base-params="baseParams" request-type="post">
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
            <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
            <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
            <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="主管机构" prop="managerBrIdName"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane v-if="show==1 || show==2 || show==3 || show==4" label="授信批复" name="third">
        <yu-panel title="授信批复列表" panel-type="simple">
          <yu-xform v-model="replySearchFormdata" related-table-name="replyTable" form-type="search" :remove-empty="true" label-width="120px">
            <yu-xform-group :column="3">
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId">
              </yu-xform-item>
              <yu-xform-item label="产品类型" placeholder="产品类型" name="lmtBizType" ctype="select" data-code="STD_ZB_PRD_BIZ_TYPE" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="项目名称" ctype="input" placeholder="项目名称" name="proName" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="申请类型" ctype="select" name="appType" placeholder="申请类型" data-code="STD_SX_LMT_TYPE" exclude-key="04,06,07,08" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="审批状态" ctype="select" placeholder="审批状态" name="approveStatus" data-code="STD_ZB_APPR_STATUS" fuzzy-query="both"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-button style="margin-bottom:10px;" type="primary" @click="backToAdd">选取返回</yu-button>
          <yu-xtable ref="replyTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="replyUrl" :base-params="replyParam" requestType="POST" :default-load="true">
            <yu-xtable-column label="申请编号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="项目名称" prop="proName"></yu-xtable-column>
            <yu-xtable-column label="产品类型" prop="lmtBizType" data-code="STD_ZB_PRD_BIZ_TYPE"></yu-xtable-column>
            <yu-xtable-column label="授信金额(万元)" prop="lmtAmt">
              <template slot-scope="scope">
                <span>{{ numFn(scope.row.lmtAmt) }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName" width="100"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName" width="100"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_REPLY_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
    <div class="yu-grpButton">
      <yu-button type="primary" @click="cancel">返回</yu-button>
    </div>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import {numFn, isRolesPool} from '@/utils/unitchange';
yufp.lookup.reg(
  "STD_ZB_CUS_TYP,STD_ZB_CERT_TYP,STD_REPLY_STATUS,STD_CUS_STATE"
);
export default {
  mixins: [mixinList],
  props: {
    pageParams: Object,
    dialogId: String,
  },
  data() {
    return {
      dataUrl: this.$backend.cmisCus + "/api/cusintbank/",
      baseParams: {
        condition: JSON.stringify({
          cusCatalog:'2', 
        }),
      },
      bussinessDataUrl: backend.cmisCus + "/api/cusbase/queryAll",
      activeName: "first",
      replySearchFormdata: {},
      bussinessSearchFormdata: {},
      customerSearchFormdata: {},
      searchFormdata: {},
      show: "",
      change: 0,
      numFn,
    };
  },
  created() {
    this.show = this.pageParams.show; // show   1 显示同业（01新增） 2 显示法人（01新增）  3显示法人批复（申请为03续作，变更申请为02变更）  4显示同业批复（申请为03续作，变更申请为02变更） 5 显示法人同业
    let cusCatalog; // cusCatalog 2企业法人  3 同业客户
    this.change = this.pageParams.change; // change  1为变更 0普通
    let lmtBizType = this.pageParams.lmtBizType;
    if (this.show == 1) {
      this.activeName = "first";
      cusCatalog = "3";
    } else if (this.show == 2) {
      this.activeName = "second";
      cusCatalog = "2";
    } else if (this.show == 3) {
      this.activeName = "third";
      cusCatalog = "2";
    } else if (this.show == 4) {
      this.activeName = "third";
      cusCatalog = "3";
    } else if (this.show == 5) {
      this.activeName = "first";
    } else if (this.show == 6) {
      this.activeName = "first";
    } else if (this.show == 7) {
      this.activeName = "second";
    }
    let lmtBizTypeList;
    if(this.show == 1 || this.show == 4){
      // 同业
      // let arr = ['4009', '16010101', '16020101', '4011', '4012'];
      lmtBizTypeList = ['4001', '4002', '4003', '4004', '4005', '4006', '4007', '4008', '4010'];
      // lmtBizTypeList = loopArr(arr, lmtBizTypeList)
    }else{
      // 法人
      // let arr = ['4003', '4004', '4005'];
      lmtBizTypeList = ['4001', '4002', '4006', '4007', '4008', '4009', '4010', '4011', '4012', '16010101', '16020101'];
      // lmtBizTypeList = loopArr(arr, lmtBizTypeList)
    }
    // function loopArr(arr1, arr2){
    //   for(let i in arr1){
    //     for(let j in arr2){
    //       if(arr1[i] == arr2[j]){
    //         arr2.slice(j - 1 , j);
    //         console.log("=======", arr2)
    //         break;
    //       }
    //     }
    //   }
    //   return arr2;
    // }
    let roleArr = this.$xutils.getLoginUserInfo().dutys;
    if(!isRolesPool(roleArr)){
      for(let i in lmtBizTypeList){
        if(lmtBizTypeList[i] == '4001'){
          lmtBizTypeList.slice(i - 1, i);
        }
      }
    }
    let str = '';
    for(let index in lmtBizTypeList){
      str = str + lmtBizTypeList[index] + ',';
    }
    str = str.slice(0, str.length - 1)
    this.replyUrl =
      this.$backend.cmisBiz + "/api/lmtsiginvestacc/selectByModel";
    this.replyParam = {
      condition: JSON.stringify({
        oprType: "01",
        accStatus: "01",
        cusCatalog: cusCatalog,
        lmtBizTypeList: str,
      }),
    };
  },
  // mounted() {

  // },
  methods: {
    /**
     * 选取返回
     */
    backToAdd() {
      var _this = this;
      let selection;
      // cusCatalog = "2"; //2企业法人  3 同业客户
      // appType = "01"; //01新增  02 变更  03 续作
      let appType;
      if (this.show == 1 || this.show == 2) {
        if (this.activeName == "third") {
          appType = "03";
        } else {
          appType = "01";
        }
      } else if (this.show == 3 || this.show == 4) {
        appType = "02";
      } else if (this.show == 5) {
        appType = "01";
      }
      // isReply 判断是否选的是批复
      if (this.activeName == "first") {
        selection = _this.$refs.refTable.selections;
        selection[0].isReply = false;
        selectData(selection, "3", appType);
      } else if (this.activeName == "second") {
        selection = _this.$refs.refTable1.selections;
        selection[0].isReply = false;
        selectData(selection, "2", appType);
      } else if (this.activeName == "third") {
        selection = _this.$refs.replyTable.selections;
        selection[0].isReply = true;
        selectData(selection, "", appType);
      }
      function selectData(arr, cusCatalog, appType) {
        console.log("===============arr", arr);
        if (arr.length !== 1) {
          _this.$message({
            message: "请先选择一条记录",
            type: "warning",
          });
          return;
        } else {
          if (cusCatalog) {
            arr[0].cusCatalog = cusCatalog; // 同业客户
          }
          arr[0].appType = appType;
          _this.$dialog.close(_this.dialogId, arr[0]);
        }
      }
    },
    /**
     * 取消
     */
    cancel() {
      this.$dialog.close(this.dialogId);
    },
  },
};
</script>
