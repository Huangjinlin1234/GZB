<template>
  <!--
    @created by dongan
    @description 待办事项界面
    -->
  <div class="wb-user-todo">
    <div>
      <span>
       <div>功能类型：</div>
       </span>
      <span @click="tableToggle1(1)" :class="{select:activeIndex1=='1'}" v-if="Data1.num0 !== 0">
        <i v-text="Data1.num0?Data1.num0:0"></i>
        <div>客户管理</div>
      </span>
      <span @click="tableToggle1(2)" :class="{select:activeIndex1=='2'}" v-if="Data2.num1 !== 0">
        <i v-text="Data2.num1?Data2.num1:0"></i>
        <div>授信管理</div>
      </span>
      <span @click="tableToggle1(3)" :class="{select:activeIndex1=='3'}" v-if="Data2.num2 !== 0">
        <i v-text="Data2.num2?Data2.num2:0"></i>
        <div>合同管理</div>
      </span>
      <span @click="tableToggle1(4)" :class="{select:activeIndex1=='4'}" v-if="Data2.num3 !== 0">
        <i v-text="Data2.num3?Data2.num3:0"></i>
        <div>出账通知</div>
      </span>
      <span @click="tableToggle1(5)" :class="{select:activeIndex1=='5'}" v-if="Data4.num4 !== 0">
        <i v-text="Data4.num4?Data4.num4:0"></i>
        <div>贷后管理</div>
      </span>
      <span @click="tableToggle1(6)" :class="{select:activeIndex1=='6'}" v-if="Data3.view600num !== 0">
        <i v-text="Data3.view600num?Data3.view600num:0" v-if="Data3.view600num !== 0"></i>
        <div>资产保全</div>
      </span>
      <div v-if="activeIndex1 == 1">
        <div>
          <span>任务类型：</span>
          <span @click="tableToggle2(100)" v-if="Data1.view100num">
            个人客户创建
            <span><yu-badge :value="Data1.view100num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(101)" v-if="Data1.view101num">
            个人客户维护
            <span><yu-badge :value="Data1.view101num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(102)" v-if="Data1.view102num">
            个人客户转正
            <span><yu-badge :value="Data1.view102num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(103)" v-if="Data1.view103num">
            公司客户创建
            <span><yu-badge :value="Data1.view103num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(104)" v-if="Data1.view104num">
            公司客户维护
            <span><yu-badge :value="Data1.view104num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(105)" v-if="Data1.view105num">
            公司客户转正
            <span><yu-badge :value="Data1.view105num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(106)" v-if="Data1.view106num">
            同业客户创建
            <span><yu-badge :value="Data1.view106num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(107)" v-if="Data1.view107num">
            同业客户维护
            <span><yu-badge :value="Data1.view107num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(108)" v-if="Data1.view108num">
            压降任务
            <span><yu-badge :value="Data1.view108num" :max="99"></yu-badge></span>
          </span>
        </div>
        <div v-if="activeIndex2 == 100">
          <view100 ref="view100" :activeIndex="activeIndex2"></view100>
        </div>
        <div v-if="activeIndex2 == 101">
          <view101 ref="view101" :activeIndex="activeIndex2"></view101>
        </div>
        <div v-if="activeIndex2 == 102">
          <view102 ref="view102" :activeIndex="activeIndex2"></view102>
        </div>
        <div v-if="activeIndex2 == 103">
          <view103 ref="view103"></view103>
        </div>
        <div v-if="activeIndex2 == 104">
          <view104 ref="view104"></view104>
        </div>
        <div v-if="activeIndex2 == 105">
          <view105 ref="view105"></view105>
        </div>
        <div v-if="activeIndex2 == 106">
          <view106 ref="view106" :activeIndex="'C01'"></view106>
        </div>
        <div v-if="activeIndex2 == 107">
          <view107 ref="view107" :activeIndex="'C02'"></view107>
        </div>
        <div v-if="activeIndex2 == 108">
          <view108 ref="view108"></view108>
        </div>
      </div>
      <div v-if="activeIndex1 == 2">
        <div>
        <span>任务类型：</span>
          <span @click="tableToggle2(200)" v-if="Data2.view200num">
            单一客户授信复审
            <span><yu-badge :value="Data2.view200num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(201)" v-if="Data2.view201num">
            集团客户授信复审
            <span><yu-badge :value="Data2.view201num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(202)" v-if="Data2.view202num">
            同业机构准入年审
            <span><yu-badge :value="Data2.view202num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(203)" v-if="Data2.view203num">
            成员客户申报
            <span><yu-badge :value="Data2.view203num" :max="99"></yu-badge></span>
          </span>
        </div>
        <div v-if="activeIndex2 == 200">
          <view200 ref="view200" :param="{lmtType : '04'}"></view200>
        </div>
        <div v-if="activeIndex2 == 201">
          <view201 ref="view201" :param="{lmtType : '04'}"></view201>
        </div>
        <div v-if="activeIndex2 == 202">
          <view202 ref="view202"></view202>
        </div>
        <div v-if="activeIndex2 == 203">
          <view203 ref="view203"></view203>
        </div>
      </div>
      <div v-if="activeIndex1 == 3">
        <div>
        <span>任务类型：</span>
          <span @click="tableToggle2(300)" v-if="Data2.view300num">
            待签最高额授信协议
            <span><yu-badge :value="Data2.view300num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(301)" v-if="Data2.view301num">
            待签普通贷款合同
            <span><yu-badge :value="Data2.view301num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(302)" v-if="Data2.view302num">
            待签贴现协议
            <span><yu-badge :value="Data2.view302num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(303)" v-if="Data2.view303num">
            待签贸易融资合同
            <span><yu-badge :value="Data2.view303num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(304)" v-if="Data2.view304num">
            待签福费廷合同
            <span><yu-badge :value="Data2.view304num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(305)" v-if="Data2.view305num">
            待签开证合同
            <span><yu-badge :value="Data2.view305num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(306)" v-if="Data2.view306num">
            待签保函合同
            <span><yu-badge :value="Data2.view306num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(307)" v-if="Data2.view307num">
            待签银承合同
            <span><yu-badge :value="Data2.view307num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(308)" v-if="Data2.view308num">
            待签委托贷款合同
            <span><yu-badge :value="Data2.view308num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(309)" v-if="Data2.view309num">
            待签零售业务合同
            <span><yu-badge :value="Data2.view309num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(310)" v-if="Data2.view310num">
            待完善押品信息
            <span><yu-badge :value="Data2.view310num" :max="99"></yu-badge></span>
          </span>
        </div>
        <div v-if="activeIndex2 == 300">
          <view300 ref="view300"></view300>
        </div>
        <div v-if="activeIndex2 == 301">
          <view301 ref="view301"></view301>
        </div>
        <div v-if="activeIndex2 == 302">
          <view302 ref="view302"></view302>
        </div>
        <div v-if="activeIndex2 == 303">
          <view303 ref="view303"></view303>
        </div>
        <div v-if="activeIndex2 == 304">
          <view304 ref="view304"></view304>
        </div>
        <div v-if="activeIndex2 == 305">
          <view305 ref="view305"></view305>
        </div>
        <div v-if="activeIndex2 == 306">
          <view306 ref="view306"></view306>
        </div>
        <div v-if="activeIndex2 == 307">
          <view307 ref="view307"></view307>
        </div>
        <div v-if="activeIndex2 == 308">
          <view308 ref="view308"></view308>
        </div>
        <div v-if="activeIndex2 == 309">
          <view309 ref="view309"></view309>
        </div>
        <div v-if="activeIndex2 == 310">
          <view310 ref="view310"></view310>
        </div>
      </div>
      <div v-if="activeIndex1 == 4">
        <div>
        <span>任务类型：</span>
          <span @click="tableToggle2(400)" v-if="Data2.view400num">
            贷款出账通知
            <span><yu-badge :value="Data2.view400num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(401)" v-if="Data2.view401num">
            银承出账通知
            <span><yu-badge :value="Data2.view401num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(402)" v-if="Data2.view402num">
            委托贷款出账通知
            <span><yu-badge :value="Data2.view402num" :max="99"></yu-badge></span>
          </span>
        </div>
        <div v-if="activeIndex2 == 400">
          <view400 ref="view400"></view400>
        </div>
        <div v-if="activeIndex2 == 401">
          <view401 ref="view401"></view401>
        </div>
        <div v-if="activeIndex2 == 402">
          <view402 ref="view402"></view402>
        </div>
      </div>
      <div v-if="activeIndex1 == 5">
        <div>
        <span>任务类型：</span>
          <span @click="tableToggle2(500)" v-if="Data4.view500num">
            对公及个人经营性首次检查
            <span><yu-badge :value="Data4.view500num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(501)" v-if="Data4.view501num">
            个人消费性首次检查
            <span><yu-badge :value="Data4.view501num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(502)" v-if="Data4.view502num">
            小微经营性首次检查
            <span><yu-badge :value="Data4.view502num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(503)" v-if="Data4.view503num">
            小微消费性首次检查
            <span><yu-badge :value="Data4.view503num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(504)" v-if="Data4.view504num">
            对公定期检查
            <span><yu-badge :value="Data4.view504num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(505)" v-if="Data4.view505num">
            个人消费性定期检查
            <span><yu-badge :value="Data4.view505num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(506)" v-if="Data4.view506num">
            个人经营性定期检查
            <span><yu-badge :value="Data4.view506num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(507)" v-if="Data4.view507num">
            小微消费性定期检查
            <span><yu-badge :value="Data4.view507num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(508)" v-if="Data4.view508num">
            小微经营性定期检查
            <span><yu-badge :value="Data4.view508num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(509)" v-if="Data4.view509num">
            投后定期检查
            <span><yu-badge :value="Data4.view509num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(510)" v-if="Data4.view510num">
            公司客户风险分类
            <span><yu-badge :value="Data4.view510num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(511)" v-if="Data4.view511num">
            个人经营性风险分类
            <span><yu-badge :value="Data4.view511num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(512)" v-if="Data4.view512num">
            个人消费性风险分类
            <span><yu-badge :value="Data4.view512num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(513)" v-if="Data4.view513num">
            总行下发不定期检查
            <span><yu-badge :value="Data4.view513num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(514)" v-if="Data4.view514num">
            客户经理不定期自检
            <span><yu-badge :value="Data4.view514num" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle2(515)" v-if="Data4.view515num">
            投后不定期自检
            <span><yu-badge :value="Data4.view515num" :max="99"></yu-badge></span>
          </span>
        </div>
        <div v-if="activeIndex2 == 500">
          <view500 ref="view500"></view500>
        </div>
        <div v-if="activeIndex2 == 501">
          <view501 ref="view501"></view501>
        </div>
        <div v-if="activeIndex2 == 502">
          <view502 ref="view502"></view502>
        </div>
        <div v-if="activeIndex2 == 503">
          <view503 ref="view503"></view503>
        </div>
        <div v-if="activeIndex2 == 504">
          <view504 ref="view504"></view504>
        </div>
        <div v-if="activeIndex2 == 505">
          <view505 ref="view505"></view505>
        </div>
        <div v-if="activeIndex2 == 506">
          <view506 ref="view506"></view506>
        </div>
        <div v-if="activeIndex2 == 507">
          <view507 ref="view507"></view507>
        </div>
        <div v-if="activeIndex2 == 508">
          <view508 ref="view508"></view508>
        </div>
        <div v-if="activeIndex2 == 509">
          <view509 ref="view509"></view509>
        </div>
        <div v-if="activeIndex2 == 510">
          <view510 ref="view510"></view510>
        </div>
        <div v-if="activeIndex2 == 511">
          <view511 ref="view511"></view511>
        </div>
        <div v-if="activeIndex2 == 512">
          <view512 ref="view512"></view512>
        </div>
        <div v-if="activeIndex2 == 513">
          <view513 ref="view513"></view513>
        </div>
        <div v-if="activeIndex2 == 514">
          <view514 ref="view514"></view514>
        </div>
        <div v-if="activeIndex2 == 515">
          <view515 ref="view515"></view515>
        </div>
      </div>
      <div v-if="activeIndex1 == 6">
        <div>
        <span>任务类型：</span>
          <span @click="tableToggle2(600)" v-if="Data3.view600num">
            催收任务处理
            <span><yu-badge :value="Data3.view600num" :max="99"></yu-badge></span>
          </span>
        </div>
        <div v-if="activeIndex2 == 600">
          <view600 ref="view600"></view600>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { mapGetters } from 'vuex';
// 引入客户管理页面
import view100 from '@/views/cusmanage/indivCus/indivCusCreate/cusIndivManaTask_d1_BillList';
import view101 from '@/views/cusmanage/indivCus/indivCusDefend/indivCusDefendIndex';
import view102 from '@/views/cusmanage/indivCus/indivCusChange/indivCusChangeIndex';
// 引入公司客户创建待处理页面
import view103 from '@/views/cusmanage/cusCorp/cusCorpCreation/cusManaTaskCorpList_d1_BillList';
import view104 from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpMaintainManaTaskList_d1_BillList';
import view105 from '@/views/cusmanage/cusCorp/cusCorpConversion/cusCorpConversionManaTaskList_d1_BillList';
import view106 from '@/views/cusmanage/cusIntbank/cusIntbankCreate/cusIntbankSolve_d1_BillList';
import view107 from '@/views/cusmanage/cusIntbank/cusIntbankDefend/cusIntbankDefendIndex';
import view108 from '@/views/cusmanage/corpCus/dedkkh/yjsxTaskInfoIndex';
// 引入授信管理页面
import view200 from '@/views/zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/lmtAppAddList';
import view201 from '@/views/zrcbank/biz/lmtGrpAppNew/lmtGrpAppDeclare/lmtGrpAppDeclareList';
import view202 from '@/views/bizmanage/lmtBiz/intbankOrgAdmitBiz/listYearApply/yearApplyList';
import view203 from '@/views/zrcbank/biz/lmtGrpAppNew/lmtGrpAppDeclare/lmtGrpAppGroupWait/lmtGrpAppBacklogList';
// 引入合同管理页面
import view300 from '@/views/zrcbank/biz/ctrHighAmtAgrCont/ctrHighAmtContList';
import view301 from '@/views/ctrmanage/ctrLoanCont/ctrLoanContListIndex';
import view302 from '@/views/ctrmanage/ctrDiscCont/ctrDiscContListIndex';
import view303 from '@/views/zrcbank/biz/ctrLoanCont/ctrTCont/ctrTContList';
import view304 from '@/views/zrcbank/biz/ctrLoanCont/ctrForftinCont/ctrForftinContList';
import view305 from '@/views/ctrmanage/ctrTfLocCont/ctrTfLocContListIndex';
import view306 from '@/views/ctrmanage/ctrCvrgCont/ctrCvrgContListIndex';
import view307 from '@/views/ctrmanage/ctrAccpCont/ctrAccpContListIndex';
import view308 from '@/views/ctrmanage/ctrEntrustLoanCont/ctrEntrustLoanContListIndex';
import view309 from '@/views/zrcbank/biz/sellManagerBiz/ctrLoanCont/ctrLoanContInfo';
import view310 from '@/views/guarmanage/collateralInfo/guarInfo/guarBaseInfoListIndex';
// 引入用信管理页面
import view400 from '@/views/zrcbank/biz/accPvpAuthorize/accPvpAuthorize';
import view401 from '@/views/zrcbank/biz/accAccp/pvpAccpAppList';
import view402 from '@/views/zrcbank/biz/accEntrustLoan/pvpAuthEntrustLoanList';
// 引入贷后管理页面
import view500 from '@/views/zrcbank/psp/pspCheck/dhjc/firstCheck/dggrFirstCheck';
import view501 from '@/views/zrcbank/psp/pspCheck/dhjc/firstCheck/grxfFirstCheck';
import view502 from '@/views/zrcbank/psp/pspCheck/dhjc/firstCheck/xwjyFirstCheck';
import view503 from '@/views/zrcbank/psp/pspCheck/dhjc/firstCheck/xwxfFirstCheck';
import view504 from '@/views/psp/pspchecktask/pspTaskList';
import view505 from '@/views/pspmanage/pspCheck/regularCheck/indivConsumeRegularCheck';
import view506 from '@/views/pspmanage/pspCheck/regularCheck/indivOperRegularCheck';
import view507 from '@/views/pspmanage/pspCheck/regularCheck/smallConsumeRegularCheck';
import view508 from '@/views/pspmanage/pspCheck/regularCheck/smallOperRegularCheck';
import view509 from '@/views/pspmanage/pspCheck/regularCheck/capRegularCheck';
import view510 from '@/views/pspmanage/riskDivide/corpRiskDivideList';
import view511 from '@/views/pspmanage/riskDivide/indivOperRiskDivideList';
import view512 from '@/views/pspmanage/riskDivide/indivConsumeRiskDivideList';
import view513 from '@/views/pspmanage/pspCheck/irregularCheck/issueIrregularCheck';
import view514 from '@/views/pspmanage/pspCheck/irregularCheck/mgrIrregularCheck';
import view515 from '@/views/pspmanage/pspCheck/irregularCheck/capIrregularCheck';
// 引入资产保全管理页面
import view600 from '@/views/zrcbank/npam/bcmRule/plaBcmTaskInfo';

export default {
  components: {
    view100,
    view101,
    view102,
    view103,
    view104,
    view105,
    view106,
    view107,
    view108,
    view200,
    view201,
    view202,
    view203,
    view300,
    view301,
    view302,
    view303,
    view304,
    view305,
    view306,
    view307,
    view308,
    view309,
    view310,
    view400,
    view401,
    view402,
    view500,
    view501,
    view502,
    view503,
    view504,
    view505,
    view506,
    view507,
    view508,
    view509,
    view510,
    view511,
    view512,
    view513,
    view514,
    view515,
    view600,
    mapGetters
  },
  data () {
    return {
      activeIndex1: 1,
      activeIndex2: 100,
      Data1: {}, // 客户管理模块的代办事项数量
      Data2: {}, // 业务办理模块的代办事项数量（授信、合同、出账通知）
      Data3: {}, // 查询催收任务待办事项数量
      Data4: {} // 投贷后待办事项数量
    };
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org', 'theme', 'roles'])
  },
  mounted () {
    this.queryViewData1();
    this.queryViewData2();
    this.queryViewData3();
    this.queryViewData4();
  },
  methods: {
    tableToggle1 (index) {
      let _this = this;
      _this.activeIndex1 = index;
      _this.activeIndex2 = index * 100;
      _this.tableToggle2(_this.activeIndex2);
    },
    tableToggle2 (index) {
      let _this = this;
      _this.activeIndex2 = index;
      if (index >= 100 && index < 200) {
        _this.queryViewData1();
      } else if (index >= 200 && index < 500) {
        _this.queryViewData2();
      } else if (index >= 500 && index < 600) {
        _this.queryViewData4();
      } else if (index == 600) {
        _this.queryViewData3();
      }
    },
    // 查询客户管理待办事项数量
    queryViewData1 () {
      let _this = this;
      let model = {};
      model.inputId = _this.loginCode;
      _this
        .$request({
          url: backend.cmisCus + '/api/cusmanatask/selectNumByInputId',
          method: 'post',
          data: JSON.stringify({ condition: JSON.stringify(model) })
        })
        .then(({ code, message, data }) => {
          if (data) {
            _this.Data1 = data[0];
          }
        });
    },
    // 查询业务管理待办事项数量（授信、合同、出账通知）
    queryViewData2 () {
      let _this = this;
      let model = {};
      model.inputId = _this.loginCode;
      _this
        .$request({
          url: backend.cmisBiz + '/api/ctrloancont/selectNumByInputId',
          method: 'post',
          data: JSON.stringify({ condition: JSON.stringify(model) })
        })
        .then(({ code, message, data }) => {
          if (data) {
            _this.Data2 = data[0];
          }
        });
    },
    // 查询催收任务待办事项数量
    queryViewData3 () {
      let _this = this;
      let model = {};
      // model.inputId = _this.loginCode;
      _this
        .$request({
          url: backend.cmisNpam + '/api/plabcmtaskinfo/selectNumByInputId',
          method: 'post',
          data: JSON.stringify({ condition: JSON.stringify(model) })
        })
        .then(({ code, message, data }) => {
          if (data) {
            _this.Data3 = data[0];
          }
        });
    },
    // 查询催收任务待办事项数量
    queryViewData4 () {
      let _this = this;
      let model = {};
      model.inputId = _this.loginCode;
      _this
        .$request({
          url: backend.cmisPsp + '/api/psptasklist/selectNumByInputId',
          method: 'post',
          data: JSON.stringify({ condition: JSON.stringify(model) })
        })
        .then(({ code, message, data }) => {
          if (data) {
            _this.Data4 = data[0];
          }
        });
    }
  }
};
</script>
