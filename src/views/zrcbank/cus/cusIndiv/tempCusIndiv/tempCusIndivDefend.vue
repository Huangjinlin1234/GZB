<template>
  <!--
    @created by zhoumw
    @updated by
    @description 空白模板
  -->
  <div class="blank_template">
    <yu-row>
      <yu-col :sm="3" :xs="24">
        <yu-menu
          class="tac"
          :default-active="activeIndex"
          @select="selectFn"
          theme="light"
          :default-openeds="dopens"
        >
          <yu-submenu index="1">
            <template slot="title"
              >客户概况</template
            >
            <yu-menu-item
              index="1-1"
              :style="
                color['1-1'] && activeIndex == '1-1'
                  ? color['1-1']
                  : 'color: #48576a;'
              "
              >客户基本信息</yu-menu-item
            >
            <yu-menu-item
              index="1-2"
              :style="
                color['1-2'] && activeIndex == '1-2'
                  ? color['1-2']
                  : 'color: #48576a;'
              "
              >财务报表信息</yu-menu-item
            >
          </yu-submenu>
          <yu-submenu index="2">
            <template slot="title"
              >客户关联信息</template
            >
            <yu-menu-item
              index="2-1"
              :style="
                color['2-1'] && activeIndex == '2-1'
                  ? color['2-1']
                  : 'color: #48576a;'
              "
              >社会关系信息</yu-menu-item
            >
            <yu-menu-item
              index="2-2"
              :style="
                color['2-2'] && activeIndex == '2-2'
                  ? color['2-2']
                  : 'color: #48576a;'
              "
              >对外投资信息</yu-menu-item
            >
          </yu-submenu>
          <yu-menu-item
            index="3"
            :style="color[3] && activeIndex == 3 ? color[3] : 'color: #48576a;'"
            >评级必要信息</yu-menu-item
          >
          <yu-menu-item
            index="4"
            :style="color[4] && activeIndex == 4 ? color[4] : 'color: #48576a;'"
            >客户影像信息</yu-menu-item
          >
        </yu-menu>
      </yu-col>
      <yu-col :sm="20" :xs="24">
        <yu-tabs
          v-if="activeIndex == '1-1'"
          v-model="activeName"
          @tab-click="handleClick"
        >
          <yu-tab-pane label="客户基础信息" name="cusIndivBase">
            <cusIndivBase @load-success="loadCusDuration" ref="cusIndivBase"></cusIndivBase>
          </yu-tab-pane>
          <yu-tab-pane label="地址与联系方式" name="cusIndivContactInfo">
            <cusIndivContactInfo
              ref="cusIndivContactInfo"
            ></cusIndivContactInfo>
          </yu-tab-pane>
          <yu-tab-pane label="工作信息" name="cusIndivUnitInfo">
            <cusIndivUnitInfo ref="cusIndivUnitInfo"></cusIndivUnitInfo>
          </yu-tab-pane>
          <yu-tab-pane label="客户属性" name="cusIndivAttrInfo">
            <cusIndivAttrInfo ref="cusIndivAttrInfo"></cusIndivAttrInfo>
          </yu-tab-pane>
          <yu-form-buttons
            class="yubfp-button-group"
            style="text-align:center;"
          >
            <yu-button type="primary" @click="onSave" v-if="op != 'VIEW'"
              >暂存</yu-button
            >
            <yu-button type="primary" @click="onCommit" v-if="op != 'VIEW'"
              >提交</yu-button
            >
            <yu-button type="primary" @click="onBack" v-if="op != 'VIEW'"
              >返回</yu-button
            >
          </yu-form-buttons>
        </yu-tabs>
        <!--财务报表信息-->
        <fincReportQuery
          v-if="activeIndex == '1-2'"
          ref="fincReportQuery"
          :params="cusIndiv"
          :is-indev="true"
          :only-view="op == 'VIEW'"
        ></fincReportQuery>
        <!--社会关系-->
        <cusIndivSocilaInfo
          v-if="activeIndex == '2-1'"
          ref="cusIndivSocilaInfo"
        ></cusIndivSocilaInfo>
        <!--对外投资 -->
        <indivCusPubRelInvestList
          v-if="activeIndex == '2-2'"
          ref="indivCusPubRelInvestList"
        ></indivCusPubRelInvestList>
        <!--评级必要信息 -->
        <indivCusRankScore
          v-if="activeIndex == 3"
          ref="indivCusRankScore"
          :cusDuration="cusDuration"
        ></indivCusRankScore>
        <imageSystem
          v-if="activeIndex == 4"
          authority="import;download;scan;delImg"
          s="1"
          :para="imageBizParam"
        ></imageSystem>
      </yu-col>
    </yu-row>
  </div>
</template>
<script>
// 客户基础信息
import cusIndivBase from "@/views/cusmanage/indivCus/indivCusCreate/cusIndivCreatInfoIndex";
import cusIndivContactInfo from "@/views/cusmanage/indivCus/indivCusCreate/cusIndivContactInfoIndex";
import cusIndivUnitInfo from "@/views/cusmanage/indivCus/indivCusCreate/cusIndivUnitInfoIndex";
import cusIndivAttrInfo from "@/views/cusmanage/indivCus/indivCusCreate/cusIndivAttrInfoIndex";
// 报表信息
import fincReportQuery from "@/views/cusmanage/fincReport/fincReportQuery/fincReportQuery";
// 社会信息
import cusIndivSocilaInfo from "@/views/cusmanage/indivCus/indivCusCreate/cusIndivSocilaInfoListIndex";
// 对外投资
import indivCusPubRelInvestList from "@/views/cusmanage/indivCus/indivCusDefend/indivCusPubRelInvestListIndex";
// 评级必要信息
import indivCusRankScore from "@/views/cusmanage/indivCus/indivCusDefend/indivCusRankScoreIndex";
// 影像
import imageSystem from "@/views/imageManage/imageSystem";
export default {
  components: {
    cusIndivBase,
    cusIndivContactInfo,
    cusIndivUnitInfo,
    cusIndivAttrInfo,
    fincReportQuery,
    indivCusPubRelInvestList,
    indivCusRankScore,
    cusIndivSocilaInfo,
    imageSystem
  },
  data: function() {
    return {
      imageBizParam: [
        {
          // TODO 根据实际业务场景修正
          top_outsystem_code: "DSKHZL",
          index: {
            businessid: "",
            // custconduct: '',
            // operid: '',
            // custconductname: '',
            // orgid: '',
            // custtype: '',
            // orgname: '',
            // opername: '',
            custid: ""
            // maintaindate: '',
            // custname: ''
          }
        }
      ],
      cusDuration: '0',
      color: [],
      activeIndex: "1-1",
      activeName: "cusIndivBase",
      bizType: "",
      cusIndiv: {},
      op: "",
      dopens:[]
    };
  },
  created() {
    var cusId = this.$route.meta.params.cusId;
    this.imageBizParam[0].index.businessid = cusId;
    this.imageBizParam[0].index.custid = cusId;
    this.afterInit();
    this.dopens = ["1", "2"];
  },

  methods: {
    /**
     * 查询客户详情
     */
    afterInit() {
      var _this = this;
      var cusId = _this.$route.meta.params.cusId;
      _this.bizType = _this.$route.meta.params.bizType;
      _this.op = _this.$route.params.op;
      let params = {};
      params.cusId = cusId;
      yufp.service.request({
        method: "POST",
        url: `${backend.cmisCus}/api/cusindiv/queryCusIndivInfo`,
        data: params,
        callback: function(code, message, response) {
          _this.cusIndiv = response.data;
        }
      });
      // this.$nextTick(() => {
      //   var initLoanDate = this.$refs.cusIndivBase.$refs.d1_BillCard.formdata.initLoanDate;
      //   if(initLoanDate){
      //     this.cusDuration = parseInt((parseFloat(new Date().getTime()) - parseFloat(new Date(initLoanDate).getTime())) / (30 * 24 * 3600 * 1000));
      //   }
      // });
    },

    loadCusDuration(val){
      this.cusDuration = val;
    },

    /**
     * 左侧菜单点击事件
     */
    selectFn(index) {
      this.dopens = [""];
      this.activeIndex = index;
      // 颜色操作
      this.color[index] = "color: #fff;";
    },
    /**
     * 保存
     */
    onSave() {
      var _this = this;
      var model = {};
      var tabs = [
        "cusIndivBase",
        "cusIndivContactInfo",
        "cusIndivUnitInfo",
        "cusIndivAttrInfo"
      ];
      for (let i = 0; i < tabs.length; i++) {
        yufp.clone(_this.$refs[tabs[i]].$refs.d1_BillCard.formdata, model);
        // if (tabs[i] == 'cusIndivContactInfo') {
        //   // 微信号
        //   const wechatNo = model.wechatNo;
        //   const qq = model.qq;
        //   // 邮箱
        //   const email = model.email;
        //   if ((wechatNo == '' || wechatNo == null) && (qq == '' || qq == null) && (email == '' || email == null)) {
        //     this.$xutils.showMsgBox('温馨提示', '微信、QQ、Email地址三项中至少输入一项!');
        //     return;
        //   }
        // }
      }
      model.cusState = "1";
      this.$request({
        url: this.$backend.cmisCus + "/api/cusindiv/saveAllCusIndiv",
        data: model,
        method: "post"
      }).then((response, status, xhr) => {
        if (response.code == "0") {
          this.$refs.cusIndivBase.UTraceSet();
          this.$refs.cusIndivContactInfo.UTraceSet();
          this.$refs.cusIndivUnitInfo.UTraceSet();
          this.$refs.cusIndivAttrInfo.UTraceSet();
          // 自动刷新列表数据
          this.$xutils.showMsgBox("提示", "保存成功！", 500, 140, () => {});
          // this.$refs.cusIndivBase.$refs.d1_BillCard.formdata
        } else {
          this.$xutils.showMsgBox(
            "提示",
            "错误代码：" + response.code + ",错误信息：" + response.message
          );
        }
      });
    },
    /**
     * 提交
     */
    onCommit() {
      var _this = this;
      // 判断必输项
      var validate = false;
      var data = {};
      var tabs = [
        "cusIndivBase",
        "cusIndivContactInfo",
        "cusIndivUnitInfo",
        "cusIndivAttrInfo"
      ];
      var certEndDt = _this.$refs.cusIndivBase.d1_BillCard.formdata.certEndDt;
      var dateNow = _this.$xutils.dateFormat("yyyy-MM-dd", new Date());
      if (certEndDt < dateNow) {
        this.$xutils.showMsgBox("提示", "证件到期日小于当前日期!");
        return;
      }
      for (let i = 0; i < tabs.length; i++) {
        _this.$refs[tabs[i]].$refs.d1_BillCard.$refs.refForm.validate(function(
          valid
        ) {
          validate = valid;
        });
        if (!validate) {
          _this.activeName = tabs[i];
          return;
        }
        if (tabs[i] == "cusIndivContactInfo") {
          yufp.clone(
            _this.$refs[tabs[i]].$refs.d1_BillCard.$refs.refForm.formdata,
            data
          );
          // 微信号
          const wechatNo = data.wechatNo;
          const qq = data.qq;
          // 邮箱
          const email = data.email;
          if (
            (wechatNo == "" || wechatNo == null) &&
            (qq == "" || qq == null) &&
            (email == "" || email == null)
          ) {
            this.$xutils.showMsgBox(
              "温馨提示",
              "微信、QQ、Email地址三项中至少输入一项!"
            );
            return;
          }
        }
      }
      // 向后台发送保存请求
      var model = {};
      yufp.clone(_this.$refs.cusIndivBase.$refs.d1_BillCard.formdata, model);
      yufp.clone(
        _this.$refs.cusIndivContactInfo.$refs.d1_BillCard.formdata,
        model
      );
      yufp.clone(
        _this.$refs.cusIndivUnitInfo.$refs.d1_BillCard.formdata,
        model
      );
      yufp.clone(
        _this.$refs.cusIndivAttrInfo.$refs.d1_BillCard.formdata,
        model
      );
      model.taskStatus = "3";
      model.serno = _this.$route.params.serno;
      model.cusState = "2";
      this.$request({
        url: this.$backend.cmisCus + "/api/cusindiv/saveAllCusIndiv",
        data: model,
        method: "post"
      }).then((response, status, xhr) => {
        if (response.code == "0") {
          // 自动刷新列表数据
          this.$refs.cusIndivBase.UTraceSet();
          this.$refs.cusIndivContactInfo.UTraceSet();
          this.$refs.cusIndivUnitInfo.UTraceSet();
          this.$refs.cusIndivAttrInfo.UTraceSet();
          this.$xutils.showMsgBox("提示", "提交成功！", 500, 140, () => {});
        } else {
          this.$xutils.showMsgBox(
            "提示",
            "错误代码：" + response.code + ",错误信息：" + response.erortx
          );
        }
      });
    },
    /**
     * 关闭当前页面
     */
    onBack() {
      yufp.frame.removeTab(this.$route.path);
    }
  }
};
</script>
<style></style>
