<template>
  <div style="height:100%;">
    <yu-row :gutter="10">
      <yu-col :span="10">
        <imageSystem ref="imageSystemRef" authority="download" :para="imageBizParam"></imageSystem>
      </yu-col>
      <yu-col :span="14">
        <yu-xform v-model="formdata" label-width="120px" :disabled="formDisable||node.pageType!=='TODO'">
          <yu-collapse v-model="activeNames" @change="handleChange">
            <yu-collapse-item title="个人住房公积金证明信息" name="1">
              <yu-xform-group>
                <yu-xform-item label="公积金缴存状态" placeholder="公积金缴存状态" name="pundStatus" ctype="select" data-code="STD_COMMON_QUALIFIED_STATUS"></yu-xform-item>
                <yu-xform-item label="公积金缴存时间" placeholder="公积金缴存时间" name="pundPaidDate" ctype="datepicker"></yu-xform-item>
                <yu-xform-item label="公积金缴存基数" placeholder="公积金缴存基数" name="pundDepositBase" ctype="input"></yu-xform-item>
                <yu-xform-item label="公积金缴存总月份" placeholder="公积金缴存总月份" name="pundPaidTotalMonth" ctype="input"></yu-xform-item>
              </yu-xform-group>
            </yu-collapse-item>
            <yu-collapse-item title="个人证明信息" name="2">
              <yu-xform-group>
                <yu-xform-item label="主卡签名状况" placeholder="主卡签名状况" name="mainCardSignStatus" ctype="select" data-code="STD_COMMON_QUALIFIED_STATUS"></yu-xform-item>
                <yu-xform-item label="身份证明文件状况" placeholder="身份证明文件状况" name="certFildStatus" ctype="select" data-code="STD_COMMON_QUALIFIED_STATUS"></yu-xform-item>
                <yu-xform-item label="工作证明文件状况" placeholder="工作证明文件状况" name="workFileStatus" ctype="select" data-code="STD_COMMON_QUALIFIED_STATUS"></yu-xform-item>
              </yu-xform-group>
           </yu-collapse-item>
            <yu-collapse-item title="收入证明信息" name="3">
              <yu-xform-group>
                <yu-xform-item label="代发状况" placeholder="代发状况" name="replaceStatus" ctype="select" data-code="STD_CARD_REPLACE_STATUS"></yu-xform-item>
                <yu-xform-item label="代发工资金额" placeholder="代发工资金额" name="replacePayAmt" ctype="input"></yu-xform-item>
                <yu-xform-item label="个人年收入" placeholder="个人年收入" name="indivYearn" ctype="input"></yu-xform-item>
              </yu-xform-group>
            </yu-collapse-item>
            <yu-collapse-item title="个人养老保险证明信息" name="4">
              <yu-xform-group>
                <yu-xform-item label="投保状态" placeholder="投保状态" name="insureStatus" ctype="select" data-code="STD_INSURE_STATUS"></yu-xform-item>
                <yu-xform-item label="投保时间" placeholder="投保时间" name="indivInsStrDt" ctype="datepicker"></yu-xform-item>
                <yu-xform-item label="投保基数" placeholder="投保基数" name="insureBase" ctype="input"></yu-xform-item>
                <yu-xform-item label="投保总月份" placeholder="投保总月份" name="insureTotalMonth" ctype="input"></yu-xform-item>
              </yu-xform-group>
            </yu-collapse-item>
            <yu-collapse-item title="我行存款证明信息" name="5">
              <yu-xform-group>
                <yu-xform-item label="我行存款状况" placeholder="我行存款状况" name="depStatus" ctype="select" data-code="STD_COMMON_QUALIFIED_STATUS"></yu-xform-item>
                <yu-xform-item label="存款类型" placeholder="存款类型" name="depType" ctype="select" data-code="STD_CARD_DEP_TYPE"></yu-xform-item>
                <yu-xform-item label="开户日期" placeholder="开户日期" name="openDate" ctype="datepicker"></yu-xform-item>
                <yu-xform-item label="年日均存款" placeholder="年日均存款" name="dayDep" ctype="input"></yu-xform-item>
              </yu-xform-group>
            </yu-collapse-item>
            <yu-collapse-item title="我行理财证明信息" name="6">
              <yu-xform-group>
                <yu-xform-item label="我行理财状况" placeholder="我行理财状况" name="chremStatus" ctype="select" data-code="STD_COMMON_QUALIFIED_STATUS"></yu-xform-item>
                <yu-xform-item label="已购理财产品期限" placeholder="已购理财产品期限" name="chremTerm" ctype="input"></yu-xform-item>
                <yu-xform-item label="已购我行理财产品金额" placeholder="已购我行理财产品金额" name="chremPrdAmt" ctype="input"></yu-xform-item>
              </yu-xform-group>
            </yu-collapse-item>
            <yu-collapse-item title="我行贷款证明信息" name="7">
              <yu-xform-group>
                <yu-xform-item label="我行贷款状况" placeholder="我行贷款状况" name="loanStatus" ctype="select" data-code="STD_COMMON_QUALIFIED_STATUS"></yu-xform-item>
                <yu-xform-item label="贷款类型" placeholder="贷款类型" name="loanType" ctype="select" data-code="STD_CARD_LOAN_TYPE"></yu-xform-item>
                <yu-xform-item label="贷款金额" placeholder="贷款金额" name="loanAmt" ctype="input"></yu-xform-item>
                <yu-xform-item label="贷款期限" placeholder="贷款期限" name="loanTerm" ctype="input"></yu-xform-item>
                <yu-xform-item label="月还款额" placeholder="月还款额" name="monthRepayAmt" ctype="input"></yu-xform-item>
              </yu-xform-group>
            </yu-collapse-item>
            <yu-collapse-item title="个人房产证明信息" name="8">
              <yu-xform-group>
                <yu-xform-item label="房产信息状况" placeholder="房产信息状况" name="houseStatus" ctype="select" data-code="STD_COMMON_QUALIFIED_STATUS"></yu-xform-item>
                <yu-xform-item label="房产类型" placeholder="房产类型" name="houseType" ctype="select" data-code="STD_CARD_HOUSE_TYPE"></yu-xform-item>
                <yu-xform-item label="房产总价值" placeholder="房产总价值" name="houseValue" ctype="input"></yu-xform-item>
                <yu-xform-item label="房产贷款金额" placeholder="房产贷款金额" name="houseLoanAmt" ctype="input"></yu-xform-item>
                <yu-xform-item label="房贷贷款期限" placeholder="房贷贷款期限" name="houseLoanTerm" ctype="input"></yu-xform-item>
                <yu-xform-item label="房贷月还款额" placeholder="房贷月还款额" name="houseLoanMonthRepayAmt" ctype="input"></yu-xform-item>
              </yu-xform-group>
            </yu-collapse-item>
            <yu-collapse-item title="企业法人证明信息" name="9">
              <yu-xform-group>
                <yu-xform-item label="是否企业法人" placeholder="是否企业法人" name="isRepr" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
                <yu-xform-item label="公司成立日期" placeholder="公司成立日期" name="comStartDate" ctype="datepicker"></yu-xform-item>
                <yu-xform-item label="公司注册资金" placeholder="公司注册资金" name="comRegiCap" ctype="input"></yu-xform-item>
              </yu-xform-group>
            </yu-collapse-item>
            <yu-collapse-item title="个体工商户证明信息" name="10">
              <yu-xform-group>
                <yu-xform-item label="是否个体工商户" placeholder="是否个体工商户" name="isIndivShop" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
                <yu-xform-item label="发照日期" placeholder="发照日期" name="licdAte" ctype="datepicker"></yu-xform-item>
                <yu-xform-item label="执照有效期" placeholder="执照有效期" name="bsinsLicIdare" ctype="input"></yu-xform-item>
              </yu-xform-group>
            </yu-collapse-item>
            <yu-collapse-item title="居住证明信息" name="11">
              <yu-xform-group>
                <yu-xform-item label="居住证明状况" placeholder="居住证明状况" name="indivRsdSt" ctype="select" data-code="STD_COMMON_QUALIFIED_STATUS"></yu-xform-item>
                <yu-xform-item label="地址是否一致" placeholder="地址是否一致" name="isSameAddr" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
              </yu-xform-group>
            </yu-collapse-item>
          </yu-collapse>
        </yu-xform>
        <div class="yu-grpButton" v-if="node.pageType=='TODO'">
          <yu-button type="primary" v-if="!formDisable" @click="saveFn(null)">保存</yu-button>
          <yu-button type="primary" v-if="!formDisable" @click="backFn">返回</yu-button>
        </div>
      </yu-col>
    </yu-row>
  </div>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';
import { lookup, clone } from '@/utils';
lookup.reg('STD_COMMON_QUALIFIED_STATUS,STD_CARD_REPLACE_STATUS,STD_INSURE_STATUS');
lookup.reg('STD_CARD_DEP_TYPE,STD_CARD_LOAN_TYPE,STD_CARD_HOUSE_TYPE,STD_ZB_YES_NO');
export default {
  name: 'AttachProve',
  props: {
    node: {
      type: Object,
      default: function () {
        return {};
      }
    },
    mainPage: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  components: {imageSystem},
  data () {
    return {
      activeNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
      formdata: {},
      urls: {
        creditUrl: this.$backend.cmisBiz + '/api/creditcardappinfo/querybyserno',
        queryUrl: this.$backend.cmisBiz + '/api/creditcardattachmentinfo/querybyserno',
        updateUrl: this.$backend.cmisBiz + '/api/creditcardattachmentinfo/update'
      },
      formDisable: false, // 表单只读状态和操作按钮的显隐
      outsystemcode: 'XXD_PK_B0601,XXD_PK_B0602,XXD_PK_B0603,XXD_PK_B0604,XXD_PK_B0605',
      topoutsystemcode: 'XXD_PK',
      commentInfo: {
        instanceId: '',
        nodeId: '',
        userId: '',
        commentId: '',
        commentSign: '',
        userComment: '',
        ext: '无',
        optType: '',
        optReasTyp: ''
      }
    };
  },
  computed: {
    imageBizParam () {
      let imageBizParam = [
        {
          'top_outsystem_code': this.node.flowParam.topoutsystemcode,
          'outsystem_code': this.node.flowParam.outsystemcode,
          'index': {
            'businessid': this.node.bizId,
            'custid': '',
            'custname': '',
            'custconduct': '',
            'custconductname': '',
            'orgid': '',
            'orgname': '',
            'contid': '',
            'billno': ''
          }
        }
      ];
      return imageBizParam;
    }
  },
  watch: {
    'imageBizParam': function (val) {
      this.$nextTick(function () {
        this.$refs.imageSystemRef.getImageSrc();
      });
    }
  },
  methods: {
    getAttachmentInfo () {
      this.$request({
        url: this.urls.queryUrl,
        method: 'POST',
        data: {
          serno: this.node.bizId
        }
      }).then(({code, message, data}) => {
        if (code == '0') {
          clone(data, this.formdata);
        } else {
          this.$message({message: message || '获取数据失败', type: 'error'});
        }
      });
    },
    saveFn (callback) {
      this.$request({
        url: this.urls.updateUrl,
        method: 'POST',
        data: this.formdata
      }).then(({code, message, data}) => {
        if (code == '0') {
          if (!callback) {
            this.$message({message: '保存成功', type: 'success'});
          } else {
            this[callback]();
          }
        } else {
          this.$message({message: message || '保存失败', type: 'error'});
        }
      });
    },
    // 获取流程提交参数
    getFlowParam (commentSign) {
      // 打回 O-1 退回 O-2 否决 O-8 同意 O-12
      const paramWF = {};
      for (let i = 0; i < this.node.flowParam.length; i++) {
        // 流程中业务参数更新
        paramWF[this.node.flowParam[i].key] = this.node.flowParam[i].value;
      }
      // 提交意见信息
      this.commentInfo.instanceId = this.node.instanceId;
      this.commentInfo.nodeId = this.node.nodeId;
      this.commentInfo.userId = this.node.currentUserId;
      this.commentInfo.commentSign = commentSign;
      const param = {
        opType: this.commentInfo.commentSign, // 审批结论
        param: paramWF, // 业务参数
        comment: this.commentInfo // 提交意见参数
      };
      return param;
    },
    // 提交
    submitFn () {
      // 判断补录页面必填信息是否已填
      if (!this.mainPage.validate()) {
        this.$message({message: '请将必填信息填写完整!', type: 'warning'});
        return;
      }
      const param = this.getFlowParam('O-12');
      this.$emit('submit', param);
    },
    // 返回
    backFn () {
      this.$router.replace({
        name: this.node.returnBackFuncId
      });
    }
  },
  mounted () {
    // 获取预录入申请信息数据
    this.getAttachmentInfo();
    // 流程节点只要不是 node2 则表单只读状态和按钮隐藏
    this.formDisable = this.node.currentNode !== 'node2';
  }
};
</script>