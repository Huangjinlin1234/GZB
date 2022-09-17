<template>
  <!--
    @created by yourEmail Y-m-d
    @updated by
    @description 空白模板
  -->
  <div class="blank_template">
    <!-- 若无个性化样式，请删除本行及下行 -->
    <yu-row>
      <yu-col :sm="6" :xs="24">
        <!-- <yu-menu class="tac" :default-active="activeIndex" @select="selectFn" theme="light">-->
        <yu-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="light" @select="selectFn" :default-active="activeIndex">
          <!--<yu-menu-item index="1" :style="color[1] && activeIndex == 1 ? color[1] : 'color: #48576a;'">客户基本信息</yu-menu-item>
          <yu-menu-item index="2" :style="color[2] && activeIndex == 2 ? color[2] : 'color: #48576a;'">财务报表信息</yu-menu-item>
          <yu-menu-item index="3" :style="color[3] && activeIndex == 3 ? color[3] : 'color: #48576a;'">高管人员信息</yu-menu-item>
          <yu-menu-item index="4" :style="color[4] && activeIndex == 4 ? color[4] : 'color: #48576a;'">发行股票信息</yu-menu-item>-->
          <yu-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>成员客户预授信细化</template
            >
            <yu-menu-item-group>
              <template slot="title"
                >授信方案信息</template
              >
              <yu-menu-item index="1">授信基本信息</yu-menu-item>
              <yu-menu-item index="2">授信分项明细</yu-menu-item>
              <yu-menu-item index="3">客户限额及债项评级测算</yu-menu-item>
              <yu-menu-item index="4">预授信细化调查报告</yu-menu-item>
            </yu-menu-item-group>
            <yu-menu-item-group title="关联信息"> </yu-menu-item-group>
            <yu-submenu index="5">
              <template slot="title"
                >集团客户及关联人信息</template
              >
              <yu-menu-item index="51">客户360视图</yu-menu-item>
            </yu-submenu>
            <yu-submenu index="6">
              <template slot="title"
                >集团客户财务情况</template
              >
              <yu-menu-item index="61">财务报表</yu-menu-item>
              <yu-menu-item index="62">财务指标分析</yu-menu-item>
            </yu-submenu>
            <yu-submenu index="7">
              <template slot="title"
                >额度测算表</template
              >
              <yu-menu-item index="71">流动资金测算表</yu-menu-item>
              <yu-menu-item index="72">保证人额度测算表</yu-menu-item>
            </yu-submenu>
            <yu-submenu index="8">
              <template slot="title"
                >客户风险情况</template
              >
              <yu-menu-item index="81">客户评级及债项评级</yu-menu-item>
              <yu-menu-item index="82">投贷后管理情况</yu-menu-item>
              <yu-menu-item index="83">担保圈查询</yu-menu-item>
              <yu-menu-item index="84">风险报告查询</yu-menu-item>
            </yu-submenu>
            <yu-submenu index="9">
              <template slot="title"
                >调查报告</template
              >
              <yu-menu-item index="91">原集团调查报告</yu-menu-item>
              <yu-menu-item index="92">智能调查报告</yu-menu-item>
            </yu-submenu>
            <yu-submenu index="110">
              <template slot="title"
                >客户业务信息</template
              >
              <yu-menu-item index="1101">我行业务信息</yu-menu-item>
            </yu-submenu>
            <yu-menu-item index="112">征信报告</yu-menu-item>
            <yu-menu-item index="113">统一额度视图</yu-menu-item>
            <yu-menu-item index="114">其他审批事项</yu-menu-item>
            <!--<yu-menu-item index="115">流程轨迹</yu-menu-item>-->
            <yu-menu-item index="116">影像资料</yu-menu-item>
          </yu-submenu>
        </yu-menu>
      </yu-col>
      <yu-col :sm="18" :xs="24">
        <!--<yu-tabs v-if="activeIndex == 1" v-model="activeName" @tab-click="handleClick">
          <yu-tab-pane label="客户基础信息" name="cusCorpBase">
            <cusCorpBase ref="cusCorpBase"></cusCorpBase>
          </yu-tab-pane>
          <yu-tab-pane label="登记注册信息" name="cusCorpBaseTempLoginList">
            <cusCorpBaseTempLoginList ref="cusCorpBaseTempLoginList"></cusCorpBaseTempLoginList>
          </yu-tab-pane>
          <yu-tab-pane label="地址与联系方式" name="cusCorpBaseAddress">
            <cusCorpBaseAddress ref="cusCorpBaseAddress"></cusCorpBaseAddress>
          </yu-tab-pane>
          <yu-tab-pane label="客户属性" name="cusCorpBaseProp">
            <cusCorpBaseProp ref="cusCorpBaseProp"></cusCorpBaseProp>
          </yu-tab-pane>
          <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
            <yu-button type="primary" @click="onSave">暂存</yu-button>
            <yu-button type="primary" @click="onCommit">提交</yu-button>
            <yu-button type="primary" @click="onBack">返回</yu-button>
          </yu-form-buttons>
        </yu-tabs>-->
        <lmtSubInfo v-if="activeIndex == 2" ref="lmtSubInfo"></lmtSubInfo>
        <memlmtPreAppBaseInfo v-if="activeIndex == 1" ref="lmtPreAppBaseInfo"></memlmtPreAppBaseInfo>
      </yu-col>
    </yu-row>
  </div>
</template>
<script>
import cusCorpBase from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpBaseOfficialList_d1_BillCard';
import cusCorpBaseTempLoginList from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpBaseLoginOfficialList_d1_BillCard';
import cusCorpBaseAddress from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpBaseAddressList_d1_BillCard';
import cusCorpBaseProp from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpBasePropList_d1_BillCard';
import indivCusFncStatBase from '@/views/cusmanage/indivCus/indivCusDefend/indivCusFncStatBaseList_d1_BillList';
import cusCorpMgr from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpMgrListIndex';
import cusCorpStock from '@/views/cusmanage/cusCorp/cusCorpCreation/cusCorpStockListIndex';
import lmtPreAppBaseInfo from '@/views/zrcbank/biz/lmtGrpApp/lmtAppDetail/lmtPreAppBaseInfo';
import memlmtPreAppBaseInfo from '@/views/zrcbank/biz/lmtGrpApp/lmtAppDetail/memlmtPreAppBaseInfo';
import lmtSubInfo from '@/views/zrcbank/biz/lmtGrpApp/lmtSubInfo/lmtSubInfo';
export default {
  components: { cusCorpBase,
    cusCorpBaseTempLoginList,
    cusCorpBaseAddress,
    cusCorpBaseProp,
    indivCusFncStatBase,
    cusCorpMgr,
    cusCorpStock,
    lmtPreAppBaseInfo,
    memlmtPreAppBaseInfo,
    lmtSubInfo},
  data: function () {
    return {
      color: [],
      activeIndex: 1,
      activeName: 'cusCorpBase'
    };
  },
  methods: {
    /**
     * 左侧菜单点击事件
     */
    selectFn (index) {
      this.activeIndex = index;
      // 颜色操作
      this.color[index] = 'color: #fff;';
    },
    /**
     * 保存
     */
    onSave () {
      var _this = this;
      var model = {};
      var tabs = ['cusCorpBase', 'cusCorpBaseAddress', 'cusCorpBaseTempLoginList', 'cusCorpBaseProp'];
      debugger;
      for (let i = 0; i < tabs.length; i++) {
        yufp.clone(_this.$refs[tabs[i]].formdata, model);
      }
      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisCus + '/api/cuscorp/savecus',
        data: JSON.stringify(model),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {});
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);

            // exit;// ajax中return不生效，可以用exit
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          // exit;// ajax中return不生效，可以用exit
        }
      });
    },
    /**
     * 提交
     */
    onCommit () {
      var _this = this;
      // 判断必输项
      var validate = false;
      var tabs = ['cusCorpBase', 'cusCorpBaseTempLoginList', 'cusCorpBaseAddress', 'cusCorpBaseProp'];
      for (let i = 0; i < tabs.length; i++) {
        _this.$refs.[tabs[i]].$refs.refForm.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          _this.activeName = tabs[i];
          return;
        }
      }
      // 向后台发送保存请求
      var _this = this;
      var model = {};
      yufp.clone(_this.$refs.cusCorpBase.formdata, model);
      yufp.clone(_this.$refs.cusCorpBaseTempLoginList.formdata, model);
      model.taskStatus = '3';
      model.taskSerno = _this.$route.meta.params.serno;
      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisCus + '/api/cuscorp/savecus',
        data: JSON.stringify(model),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {});
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
            // exit;// ajax中return不生效，可以用exit
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          // exit;// ajax中return不生效，可以用exit
        }
      });
    },
    /**
     * 关闭当前页面
     */
    onBack () {
      let data = this.$route.meta.params;
      yufp.frame.removeTab(data.key);
    }
  }
};
</script>
<style>

</style>
