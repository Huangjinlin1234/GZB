<template>
  <div>
    <div v-if="!onlyImageTab">
    <yu-tabs>
        <yu-tab-pane label="业务信息">
          <yu-row>
            <yu-xform label-width="120px" form-type="details" v-model="tipFormData">
              <yu-xform-group :column="6">
                <yu-xform-item label="业务编号" ctype="input" placeholder="业务编号" name="serno" :colspan="5"></yu-xform-item>
                <yu-xform-item label="业务类型" ctype="select" data-code="STD_ZB_CUS_BIZ_TYPE" placeholder="业务类型" name="bizType"></yu-xform-item>
                <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
                <yu-xform-item label="申请日期" ctype="input" placeholder="申请日期" name="inputDate"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </yu-row>
          <yu-row>
            <!-- <yu-col :span="12">
                <imageSystem authority="import;download;delImg;scan" s="1" :para="imageBizParam"></imageSystem>
            </yu-col> -->
            <yu-col :span="12" style="border-left:1px solid #dfe6ec; margin-top: 38px;">
              <yu-tabs type="card" v-model="activeName">
                <yu-tab-pane v-if="showNotFncTab" label="客户基本信息" name="d1_B_1_BillCard">
                  <d1-b-1-billcard :only-view="onlyView" ref="d1_B_1_BillCard" :cusCorp="cusCorp"></d1-b-1-billcard>
                </yu-tab-pane>
                <yu-tab-pane v-if="showNotFncTab" label="登记注册信息" name="d1_B_2_BillCard">
                  <d1-b-2-billcard :only-view="onlyView" ref="d1_B_2_BillCard" :cusCorp="cusCorp"></d1-b-2-billcard>
                </yu-tab-pane>
                <yu-tab-pane v-if="showNotFncTab" label="银企合作信息" name="d1_B_3_BillCard">
                  <d1-b-3-billcard :only-view="onlyView" ref="d1_B_3_BillCard" :cusCorp="cusCorp"></d1-b-3-billcard>
                </yu-tab-pane>
                <yu-tab-pane v-if="showFncTab" label="财报信息" name="fincReportQuery">
                  <fincReportQuery :only-view="onlyView" ref="fincReportQuery" :params="cusCorp" :is-flow-page="true"></fincReportQuery>
                </yu-tab-pane>
                <yu-tab-pane v-if="showNotFncTab" label="资本构成" name="cusCorpApitalInfo">
                  <cusCorpApitalInfo :only-view="onlyView" ref="cusCorpApitalInfo" :cusCorp="cusCorp"></cusCorpApitalInfo>
                </yu-tab-pane>
                <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
                  <yu-button v-if="!onlyView" v-show="showOCR" type="primary" @click="ocrProcessFn">OCR处理</yu-button>
                  <yu-button v-if="showNotFncTab && !onlyView" type="primary" @click="tempSaveFn">暂存</yu-button>
                  <yu-button v-if="!onlyView" type="primary" @click="flowCommitFn">提交</yu-button>
                  <yu-button v-if="!onlyView" type="primary" @click="flowBackFn">退回</yu-button>
                  <yu-button type="primary" @click="afterSubmit">返回</yu-button>
                </yu-form-buttons>
              </yu-tabs>
            </yu-col>
          </yu-row>
        </yu-tab-pane>
        <yu-tab-pane label="审批信息">
         <coop-approval :params="param"></coop-approval>
        </yu-tab-pane>
    </yu-tabs>
      
    </div> 
    <div v-if="onlyImageTab">
      <!-- <yu-row>
        <imageSystem authority="import;download;delImg;scan" s="1" :para="imageBizParam"></imageSystem>
      </yu-row> -->
      <yu-row style="text-align:center;">
        <yu-button v-if="!onlyView" v-show="showOCR" type="primary" @click="ocrProcessFn">OCR处理</yu-button>
        <yu-button v-if="!onlyView" type="primary" @click="flowCommitFn">提交</yu-button>
        <yu-button v-if="!onlyView" type="primary" @click="flowBackFn">退回</yu-button>
        <yu-button type="primary" @click="afterSubmit">返回</yu-button>
      </yu-row>
    </div>
    <yu-row>
      <yufp-nwf-submit ref="flow" :pagedata="bizPageData" @afterSubmit="afterSubmit"></yufp-nwf-submit>
    </yu-row>
    <el-dialog-x title="退回原因" :visible.sync="dialogVisible">
      <yu-xcheckbox v-model="roolReason" data-code="STD_ROOLBACK_REASON" :datacode-filter="datacodeFilterFn" style="margin-bottom: 20px;"></yu-xcheckbox>
      <el-label style="font-size: 16px; color: #333; font-weight: bold;">意见</el-label>
      <el-input type="textarea" v-model="comment" rules="required"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmFn">确 定</el-button>
      </div>
    </el-dialog-x>
  </div>
</template>
<script>
import d1B1Billcard from './cusCorpOffiCreateList_d1_B_1_BillCard.vue';
import d1B2Billcard from './cusCorpOffiCreateList_d1_B_2_BillCard.vue';
import d1B3Billcard from './cusCorpOffiCreateList_d1_B_3_BillCard.vue';
import fincReportQuery from '@/views/cusmanage/fincReport/fincReportQuery/fincReportQuery';
import cusCorpApitalInfo from '@/views/cusmanage/cusCorp/cusCorpMaintain/cusCorpApitalInfoListIndex';
// import imageSystem from '@/views/imageManage/imageSystem';
import coopApproval from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex';
import { mapGetters } from 'vuex';
yufp.lookup.reg('STD_ROOLBACK_REASON');
export default {
  // components: { d1B1Billcard, d1B2Billcard, d1B3Billcard, cusCorpApitalInfo, fincReportQuery, imageSystem,coopApproval},
  components: { d1B1Billcard, d1B2Billcard, d1B3Billcard, cusCorpApitalInfo, fincReportQuery, coopApproval},
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data () {
    return {
      param: {},
      activeName: 'd1_B_1_BillCard',
      d1_B_1_BillCard: null,
      d1_B_2_BillCard: null,
      d1_B_3_BillCard: null,
      cusCorpApitalInfo: null,
      cusCorp: {},
      tipFormData: {},
      imageBizParam: [
        {
          // TODO 根据实际业务场景修正
          top_outsystem_code: 'DGKHZL',
          index: {
            businessid: '',
            // custconduct: '',
            // operid: '',
            // custconductname: '',
            // orgid: '',
            // custtype: '',
            // orgname: '',
            // opername: '',
            custid: ''
            // maintaindate: '',
            // custname: ''
          }
        }
      ],
      flowBizType: '', // 流程业务类型
      showFncTab: true, // 显示财报tab页签
      showNotFncTab: true, // 显示非财报tab页签
      onlyFncTab: false, // 财报类集中作业
      flowBizTypeMapping: {

      },
      onlyImageTab: false,
      onlyView: false,
      showOCR: true,
      dialogVisible: false,
      roolReason: '', //退回原因
      comment: '', //退回意见
    };
  },
  watch: {
    // 使用menuModel
    flowBizType: function (val) {
      if (val === 'KH001' || val === 'KH005') { // 公司正式客户创建（集中作业）、公司客户转正（集中作业）
        this.showFncTab = true;
        this.showNotFncTab = true;
      } else if (val === 'KH002') { // 公司正式客户客观信息维护（集中作业）
        this.showFncTab = false;
        this.showNotFncTab = true;
      } else if (val === 'KH003' || val === 'KH004' || val === 'KH023' || val === 'KH006' || val === 'KH007') { // 各类财报集中作业
        if(val === 'KH006' || val === 'KH007') {
          this.imageBizParam[0].top_outsystem_code = 'DSKHZL'
        }
        this.showFncTab = true;
        this.showNotFncTab = false;
        this.onlyFncTab = true;
        // 财报修改 资料扫描、公司业务评审、副总经理评审
        if(this.bizPageData.instanceInfo.nodeSign == 'IMAGE_SCAN' || this.bizPageData.instanceInfo.nodeName === '信贷管理部公司业务评审岗' || this.bizPageData.instanceInfo.nodeName === '信贷管理部副总经理'){// 影像扫描节点
          this.showOCR = false
        } else {
          this.showOCR = true
        }
        this.activeName = 'fincReportQuery';
      }
    }
  },
  computed: {
    ...mapGetters(['userCode', 'org'])
  },
  mounted () {
    if(!this.onlyImageTab){
      this.AfterInit();
    }
    this.loadTaskInfo(this.bizPageData.instanceInfo.bizId);
  },
  created () {
    console.log(this.bizPageData.instanceInfo);
    var _this = this;
    if('TODO' != _this.bizPageData.instanceInfo.pageType){
      _this.onlyView = true;
    }
    if('O-1' === _this.bizPageData.instanceInfo.nodeState && _this.userCode === _this.bizPageData.instanceInfo.flowStarter){ //打回后只允许查看
      _this.onlyView = true;
    }
    // _this.getParentPage().setApproveTabVisiable(false); // 隐藏审批
    this.param.serno = this.bizPageData.instanceInfo.bizId;
    let cusId = _this.bizPageData.instanceInfo.bizUserId;
    this.flowBizType = _this.bizPageData.instanceInfo.bizType;
    this.imageBizParam[0].index.businessid = cusId;
    this.imageBizParam[0].index.custid = cusId;
    if(this.bizPageData.instanceInfo.nodeSign == 'IMAGE_SCAN'){// 影像扫描节点
      this.onlyImageTab = true;
    }else{
      yufp.service.request({
        method: 'POST',
        async: false,
        url: `${backend.cmisCus}/api/cuscorp/${cusId}`,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.cusCorp = response.data;
            _this.cusCorp.cusId = cusId;
            _this.cusCorp.nodeId = _this.bizPageData.instanceInfo.nodeId
            _this.cusCorp.instanceId = _this.bizPageData.instanceInfo.instanceId
            _this.cusCorp.nodeName = _this.bizPageData.instanceInfo.nodeName
            _this.cusCorp.bizId = _this.bizPageData.instanceInfo.bizId
          } else {
            _this.$message({type: 'error', message: '加载客户数据失败！'});
          }
        }
      });
    }
  },
  methods: {
    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === 'KHR001' || op.key === 'KHR002' || op.key === 'KHR003' || op.key === 'KHR004' || op.key === 'KHR005' || op.key === 'KHR006') {
          return true;
        }
        return false;
      });
    },
    loadTaskInfo (serno) {
      let _this = this;
      yufp.service.request({
        method: 'get',
        url: `${backend.cmisCus}/api/cusmanatask/${serno}`,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.copyExsitFieldValue(response.data, _this.tipFormData);
          } else {
            _this.$message({type: 'error', message: '加载任务数据失败！'});
          }
        }
      });
    },
    getParentPage () {
      return this.$parent.$parent.$parent;
    },
    copyExsitFieldValue (source, target) {
      for (let i in source) { // 仅赋值表单存在的字段
        if (target.hasOwnProperty(i)) {
          target[i] = source[i];
        }
      }
    },
    AfterInit () {
      var _this = this;
      this.d1_B_1_BillCard = this.$refs.d1_B_1_BillCard;
      this.d1_B_2_BillCard = this.$refs.d1_B_2_BillCard;
      this.d1_B_3_BillCard = this.$refs.d1_B_3_BillCard;
      this.cusCorpApitalInfo = this.$refs.cusCorpApitalInfo;
    },
    tempSaveFn (callbackFn) {
      var _this = this;
      var model = {};
      var tabs = ['d1_B_1_BillCard', 'd1_B_2_BillCard', 'd1_B_3_BillCard'];
      for (let i = 0; i < tabs.length; i++) {
        yufp.clone(_this.$refs[tabs[i]].formdata, model);
      }
      var openday = yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2)
      if(new Date(this.d1_B_1_BillCard.formdata.buildDate) > new Date(openday)){
        this.$message({
          message: '客户成立日期不允许超过当前日期',
          type: 'warning'
        });
        return;
      }
      if(new Date(this.d1_B_1_BillCard.formdata.certIdate) < new Date(openday)){
        this.$message({
          message: '证件有效期不允许早于当前日期',
          type: 'warning'
        });
        return;
      }
      if(new Date(this.d1_B_3_BillCard.formdata.basicAccNoOpenDate) > new Date(openday)){
        this.$message({
          message: '基本户开户日期不允许超过当前日期',
          type: 'warning'
        });
        return;
      }
      // 客户状态设置成暂存
      model.cusState = '1';
      this.$xutils.request({
        // 同步请求
        async: true,
        url: this.$backend.cmisCus + '/api/cuscorp/savecus',
        data: JSON.stringify(model),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            if (typeof callbackFn === 'function') {
              callbackFn.apply(this);
            } else {
              this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {});
            }
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
    saveFn (callbackFn) {
      var _this = this;
      // 判断必输项
      var validate = false;
      var tabs = ['d1_B_1_BillCard', 'd1_B_2_BillCard', 'd1_B_3_BillCard'];
      for (let i = 0; i < tabs.length; i++) {
        _this.$refs[tabs[i]].$refs.refForm.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          _this.activeName = tabs[i];
          return;
        }
      }
      _this.tempSaveFn(callbackFn);
    },
    afterSubmit () {
      this.$router.replace({
        name: this.bizPageData.instanceInfo.returnBackFuncId
      });
    },
    // 工作流-提交
    flowCommitFn () {
      let _this = this;
      // 校验数据保存表单
      if (this.onlyFncTab || this.onlyImageTab) {
        _this.privateCommitFn();
      } else {
        // _this.tempSaveFn(function () {
        //   _this.privateCommitFn();
        // });
        this.saveFn(function () {
          _this.privateCommitFn();
        });
      }
    },
    privateCommitFn () {
      // 流程提交
      // 提交意见信息
      var commentInfo = {
        commentId: '', // 意见主键，置空即可
        commentSign: 'O-12', // 审批结论，和表单中对应的选择下拉框的值绑定
        userComment: '同意', // 审批意见
        ext: '无' // 扩展意见
      };
      commentInfo.instanceId = this.bizPageData.instanceInfo.instanceId;
      commentInfo.nodeId = this.bizPageData.instanceInfo.nodeId;
      commentInfo.userId = this.userCode;
      var param = {
        opType: commentInfo.commentSign, // 审批结论
        param: this.bizPageData.flowParam, // 业务参数
        comment: commentInfo // 提交意见参数
      };
        // 调用公共组件的提交方法
      this.$refs.flow.submitFn(param);
    },
    // 退回
    flowBackFn () {
      const dutys = this.$xutils.getLoginUserInfo().dutys;
      let isAuthorizer = false;
      try{
        dutys.forEach((item) => {
          if(item.code.indexOf('ZYB') > -1) {
            isAuthorizer = true;
            return
          }
        })
      } catch (e) {
        throw e
      }
      if(isAuthorizer) {
        this.dialogVisible = true;
      } else {
        // 提交意见信息
        var commentInfo = {
          commentId: '', // 意见主键，置空即可
          commentSign: 'O-1', // 审批结论，和表单中对应的选择下拉框的值绑定
          userComment: '打回', // 审批意见
          ext: '无' // 扩展意见
        };
        commentInfo.instanceId = this.bizPageData.instanceInfo.instanceId;
        commentInfo.nodeId = this.bizPageData.instanceInfo.nodeId;
        commentInfo.userId = this.userCode;
        var param = {
          opType: commentInfo.commentSign, // 审批结论
          param: this.bizPageData.flowParam, // 业务参数
          comment: commentInfo // 提交意见参数
        };
        // 调用公共组件的提交方法
        this.$refs.flow.submitFn(param);
      }
    },
    // OCR处理 TODO
    ocrProcessFn () {
      this.$refs.fincReportQuery.ocrProcessFn();
    },
    // 调用影像系统获取
    getImageFilePathFn () {
      // TODO 改为实际业务数据
      let reqParam = {
        'docidd': '8400173899', // 查询索引值
        'tpcode': 'DGKHZL', // 根节点
        'sncode': 'DGKHZL2402', // 子节点
        'servtp': 'NNT', // 交易渠道
        'prcscd': 'yxljcx', // 接口交易码区分交易
        'servsq': 'NNT202106171056150288777621', // 由发起渠道生成的唯一标识
        'userid': 'zjgrcb',
        'brchno': '990000',
        'rqtem2': '1',
        'servdt': '20210617',
        'servti': '105615',
        'datasq': 'XDG2021061710561568423'
      };
      this.$request({
        url: this.$backend.cmisCus + '/api/image/getImageFilePath',
        method: 'post', // 默认get请求
        data: reqParam
      }).then((response) => {
        console.log(response);
      }).catch(() => {
        // 处理请求失败的情况
        this.$message({ message: '请求影像文件数据失败', type: 'error' });
      });
    },
    // 新增批次报表数据
    getCbocr1 () {
      let reqParam = {
        'flowId': '20210617test', // 业务流水号
        'organization': '宇信银行', // 编制单位
        'clientNumber': '8400290232', // 客户号
        'reportingPeriod': '2021年', // 报表期间
        'templateClassCode': '1', // 报表类型字典编码
        'templateClassName': '通用类报表', // 报表类型名称
        'remark': '示例数据', // 备注
        'list': [ // 上传的文件列表
          {
            'fileName': '天优机械利润表19.12.jpg', // 上传文件名称
            'filePath': 'group2/M00/00/05/Chx6zWDKuZqEaNbMAAAAANGYJKs414.jpg' // 上传文件路径
          }
        ]
      };
      this.$request({
        url: this.$backend.cmisCus + '/api/image/cbocr1',
        method: 'post', // 默认get请求
        data: reqParam
      }).then((response) => {
        console.log(response);
        this.getCbocr2(response.data.taskId);
      }).catch(() => {
        // 处理请求失败的情况
        this.$message({ message: '新增批次报表数据失败', type: 'error' });
      });
    },
    // 识别任务的模板匹配结果列表查询
    getCbocr2 (taskId) {
      let reqParam = {
        'taskId': taskId // 业务流水号
      };
      this.$request({
        url: this.$backend.cmisCus + '/api/image/cbocr2',
        method: 'post', // 默认get请求
        data: reqParam
      }).then((response) => {
        console.log(response);
      }).catch(() => {
        // 处理请求失败的情况
        this.$message({ message: '识别任务的模板匹配结果列表查询失败', type: 'error' });
      });
    },
    // 选择退回原因后提交
    confirmFn () {
      if(this.roolReason.toString() && this.comment) {
        this.dialogVisible = false;
        // 提交意见信息
        var commentInfo = {
          commentId: '', // 意见主键，置空即可
          commentSign: 'O-1', // 审批结论，和表单中对应的选择下拉框的值绑定
          userComment: this.comment, // 审批意见
          ext: this.roolReason.toString() // 扩展意见
        };
        commentInfo.instanceId = this.bizPageData.instanceInfo.instanceId;
        commentInfo.nodeId = this.bizPageData.instanceInfo.nodeId;
        commentInfo.userId = this.userCode;
        var param = {
          opType: commentInfo.commentSign, // 审批结论
          param: this.bizPageData.flowParam, // 业务参数
          comment: commentInfo // 提交意见参数
        };
        // 调用公共组件的提交方法
        this.$refs.flow.submitFn(param);
      } else {
        this.$message({ message: '请选择退回原因及填写意见', type: 'warning' });
        return;
      }
    }
  }
};
</script>
