<template>
  <div style="height:100%;">
    <yu-tabs v-model="activeName2" type="card" @tab-click="handleClickFn">
      <yu-tab-pane label="信息预录入" name="preIn">
        <yu-xform ref="prefForm" label-width="200px" v-model="preformdata" :rules="preRules" :disabled="formDisable">
          <yu-xform-group>
            <yu-xform-item label="申请类型" placeholder="申请类型" name="applyType" ctype="select" data-code="STD_CARD_APPLY_TYPE"  @change="cardTypeChange"></yu-xform-item>
            <yu-xform-item label="申请卡产品" placeholder="申请卡产品" name="applyCardPrd" ctype="select" data-code="STD_CARD_APPLY_CARD_PRD" :options="cardPrdOpt" ></yu-xform-item>
            <yu-xform-item label="是否同时申请普通信用卡" placeholder="是否同时申请普通信用卡" name="isApplyCommonCard" ctype="select" data-code="STD_ZB_YES_NO" @change="commonCardChange" :hidden="commonCardHidden"></yu-xform-item>
            <yu-xform-item label="普通信用卡申请卡产品" placeholder="普通信用卡申请卡产品" name="applyCommonCardPrd" ctype="select" :options="applyCardPrdOpt" :hidden="cmCardHidden"></yu-xform-item>
            <yu-xform-item label="客户姓名" placeholder="客户姓名" name="cusName" ctype="input"></yu-xform-item>
            <yu-xform-item label="客户类型" placeholder="客户类型" name="cardCusType" ctype="select" data-code="STD_CARD_CUS_TYPE"  :options="cardCusTypeOpt"></yu-xform-item>
            <yu-xform-item label="证件类型" placeholder="证件类型" name="certType" ctype="select" data-code="STD_ZB_CERT_TYP"></yu-xform-item>
            <yu-xform-item label="证件号码" placeholder="证件号码" name="certCode" ctype="input"></yu-xform-item>
            <yu-xform-item label="手机号码" placeholder="手机号码" name="phone" ctype="input"></yu-xform-item>
            <yu-xform-item label="征信授权日期" placeholder="征信授权日期" name="creditAuthDate" ctype="datepicker"></yu-xform-item>
            <yu-xform-item label="是否同意卡片降级" placeholder="是否同意卡片降级" name="isAgreeCardDown" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
            <yu-xform-item label="推荐人工号" placeholder="推荐人工号" name="recomId" ctype="input"></yu-xform-item>
            <yu-xform-item label="推荐人名称" placeholder="推荐人名称" name="recomName" ctype="input"></yu-xform-item>
            <yu-xform-item label="推荐人手机号" placeholder="推荐人手机号" name="recomPhone" ctype="input"></yu-xform-item>
            <yu-xform-item label="流水号" name="serno" hidden></yu-xform-item>
            <yu-xform-item label="出生日期" name="birthday" hidden></yu-xform-item>
            <yu-xform-item label="性别" name="sex" hidden></yu-xform-item>
            <yu-xform-item label="附卡申请人性别" name="subCardCusSex" hidden></yu-xform-item>
            <yu-xform-item label="是否复议" name="isReconsid" data-code="STD_ZB_YES_NO"  ctype="input" hidden></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" v-if="!formDisable" @click="saveFn(null)">保存</yu-button>
            <yu-button type="primary" v-if="!formDisable" @click="submitFn(null)">提交</yu-button>
            <yu-button type="primary" v-if="!formDisable" @click="clearFn">清空</yu-button>
            <yu-button type="primary" @click="cancelFn">取消</yu-button>
          </div>
        </yu-xform>
      </yu-tab-pane>
      <yu-tab-pane label="影像录入" name="videoIn">
        <imageSystem ref="imageSystemRef" :authority="authority" :s="sFlag" :para="imageBizParam"></imageSystem>
      </yu-tab-pane>
      <yu-tab-pane label="审批历史" name="7" >
          <adjustmentJudge  :nodes="childParams" ></adjustmentJudge>
      </yu-tab-pane>
    </yu-tabs>
    <yufpNwfInit ref="yufpNwfInit" @success-click="successCbFn"></yufpNwfInit>
  </div>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';
import { clone, lookup } from '@/utils';
import { validator } from '@/utils/validate';
import { mapGetters } from 'vuex';
import adjustmentJudge from '@/views/zrcbank/biz/creditcardmanage/creditApply/additionalInfo/AdjustmentJudge';
lookup.reg('STD_CARD_CUS_TYPE,STD_ZB_YES_NO,STD_ZB_CERT_TYP,STD_CARD_APPLY_TYPE,STD_CARD_APPLY_CARD_PRD,STD_CARD_APP_CHNL');
export default {
  components: {imageSystem, adjustmentJudge},
  props: {
    bizPageData: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data () {
    const dateValidate = function (rule, value, callback) {
      if (typeof value === 'string') {
        value = new Date(value);
      }
      let openday = yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2);// 获取当前时间
      const currentDate = new Date(openday).getTime();
      if (currentDate - value.getTime() > 2592000000) { // 30*24*60*60*1000
        callback(new Error('征信授权日期不能大于当前日期,征信授权日期不能超过30天(含)'));
      } else if (value > new Date(currentDate)) {
        callback(new Error('征信授权日期不能大于当前日期'));
      } else {
        callback();
      }
    };
    return {
      urls: {
        queryUrl: this.$backend.cmisBiz + '/api/creditcardappinfo/querybyserno',
        addUrl: this.$backend.cmisBiz + '/api/creditcardappinfo/addcreditappinfo',
        updateUrl: this.$backend.cmisBiz + '/api/creditcardappinfo/update'
      },
      activeName2: 'preIn',
      preformdata: {},
      preRules: {
        applyType: { required: true, message: '必填项', trigger: 'blur' },
        applyCardPrd: { required: true, message: '必填项', trigger: 'blur' },
        isApplyCommonCard: { required: false, message: '必填项', trigger: 'blur' },
        applyCommonCardPrd: { required: false, message: '必填项', trigger: 'blur' },
        cusName: { required: true, message: '必填项', trigger: 'blur' },
        cardCusType: { required: true, message: '必填项', trigger: 'blur' },
        certType: { required: true, message: '必填项', trigger: 'blur' },
        certCode: [
          { required: true, message: '必填项', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '必填项', trigger: 'blur' },
          { validator: validator.mobile, message: '请输入正确的手机号' }
        ],
        recomPhone: [
          { required: false, message: '必填项', trigger: 'blur' },
          { validator: validator.mobile, message: '请输入正确的手机号' }
        ],
        isSendMsg: { required: true, message: '必填项', trigger: 'blur' },
        creditAuthDate: [
          { required: true, message: '必填项', trigger: 'blur' },
          { validator: dateValidate, trigger: 'blur' }
        ]
      },
      cardCusTypeOpt: [],
      formDisable: false,
      applyCardPrdOpt: [],
      cardPrdOpt: [],
      commonCardHidden: true,
      cmCardHidden: true,
      changeFlag: false,
      outsystemcode: 'XXD_PK_B0601,XXD_PK_B0602,XXD_PK_B0603,XXD_PK_B0604,XXD_PK_B0605',
      topoutsystemcode: 'XXD_PK',
      cusType: '',
      sFlag: '1'
    };
  },
  watch: {
    'preformdata.certCode': function (val, oldVal) {
      if (val) {
        const date = val.substring(6, 14);
        this.preformdata.birthday = `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6)}`;
        this.preformdata.sex = this.preformdata.subCardCusSex = val.substring(16, 17) % 2 ? '1' : '2';
      }
    },
    'imageBizParam': function (val) {
      this.$nextTick(function () {
        this.$refs.imageSystemRef.getImageSrc();
      });
    },
    'preformdata.applyCardPrd': function (val, oldVal) {
      if (val) {
        if (val === '000010' || val === '000013') {
        // 是否同时申请普通信用卡 显示且必填
          this.commonCardHidden = false;
          this.preRules.isApplyCommonCard.required = true;
        } else {
          this.commonCardHidden = true;
          this.preRules.isApplyCommonCard.required = false;
        }
        // 普通信用卡申请卡产品过滤
        const datacode = this.$lookup.find('STD_CARD_APPLY_CARD_PRD');
        this.applyCardPrdOpt = datacode.filter(op => {
        // 普卡 金卡 白金卡
          return op.key === '000001' || op.key === '000002' || op.key === '000003';
        });
        if (val === '000010' || val === '000013' || val === '000004' || val === '000005' || val === '000009') {
          if (this.preformdata.applyType === 'A' || this.preformdata.applyType === 'S') {
            this.$message({message: '乐悠金卡，乐悠金电子卡，公务卡只有主卡没有附卡', type: 'warning'});
          }
          this.preformdata.applyType = 'B';
        }
        // 重新设置客户类型字典项
        this.preformdata.cardCusType = '';
        const datacode2 = this.$lookup.find('STD_CARD_CUS_TYPE');
        if (val === '000010' || val === '000013') {
          this.cardCusTypeOpt = datacode2.filter(op => {
            return op.key === 'B06' || op.key === 'B01' || op.key === 'B02' || op.key === 'B03' || op.key === 'C09' || op.key === 'E01' ||
           op.key === 'H04' || op.key === 'B14' || op.key === 'C08' || op.key === 'C03' || op.key === 'C04' || op.key === 'B08';
          });
        } else {
          this.cardCusTypeOpt = datacode2.filter(op => {
            return op.key === 'B06' || op.key === 'B01' || op.key === 'B02' || op.key === 'B07' || op.key === 'B03' || op.key === 'C09' ||
            op.key === 'C06' || op.key === 'H07' || op.key === 'E01' || op.key === 'H04' || op.key === 'B14' || op.key === 'X01' || op.key === 'C08' ||
            op.key === 'B15' || op.key === 'C04' || op.key === 'B04' || op.key === 'H05';
          });
        }
      }
    },
    'changeFlag': function (val) {
      this.preformdata.cardCusType = this.cusType;
    }
  },
  mounted: function () {
    var _this = this;
    const data = this.bizPageData || this.$route.params;
    this.$request({
      url: this.urls.queryUrl,
      method: 'POST',
      data: {
        serno: data.instanceInfo.bizId
      }
    }).then(({code, message, data}) => {
      if (code == '0') {
        clone(data, this.preformdata);
        _this.changeFlag = true;
        _this.cusType = data.cardCusType;
      } else {
        this.$message({message: message || '获取数据失败', type: 'error'});
      }
    });
    if (data.instanceInfo.pageType != 'TODO') {
      this.formDisable = true;
      this.sFlag = '2';
    }
  },
  computed: {
    ...mapGetters(['userCode', 'org']),
    authority () {
      return 'import;scan;delImg';
    },
    imageBizParam () {
      const data = this.bizPageData || this.$route.params;
      let imageBizParam = [
        {
          'top_outsystem_code': this.topoutsystemcode,
          'outsystem_code': this.outsystemcode,
          'index': {
            'businessid': data.instanceInfo.bizId,
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
    },
    childParams: function () {
      const data = this.bizPageData || this.$route.params;
      const params = {
        bizId: data.instanceInfo.bizId,
        certCode: data.instanceInfo.param.certCode,
        nodeId: data.instanceInfo.nodeId,
        currentNode: data.flowParam.whichNode,
        instanceId: data.instanceInfo.instanceId,
        pageType: data.instanceInfo.pageType,
        currentUserId: this.userCode,
        flowParam: data.flowParam,
        optypeOptions: data.optypeOptions,
        applayCardType: data.instanceInfo.param.applayCardType,
        returnBackFuncId: data.instanceInfo.returnBackFuncId
      };
      return params;
    }
  },
  methods: {
    // 新增/修改的保存方法
    saveFn (callback) {
      let url = this.urls.addUrl;
      if (this.type === 'edit') {
        url = this.urls.updateUrl;
      }
      this.preformdata.managerName = this.$store.state.oauth.userName;
      this.$request({
        url: url,
        method: 'POST',
        data: this.preformdata
      }).then(({code, message, data}) => {
        if (code == '0') {
          this.$message({message: '操作成功', type: 'success'});
          if (this.type == 'add') {
            this.serno = this.preformdata.serno = data.serno;
          }
          if (callback) {
            this[callback]();
          }
        } else {
          this.$message({message: message || '操作失败', type: 'error'});
        }
      });
    },
    // 点击提交后，1，进行客户开户， 2，触发保存 3，如果是复议，查询零售内评结果 4，流程提交
    saveSubmit () {
      let url = this.urls.addUrl;
      if (this.type === 'edit') {
        url = this.urls.updateUrl;
      }
      let validate = false;
      this.$refs.prefForm.validate(valid => {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      this.preformdata.managerName = this.$store.state.oauth.userName;
      this.$request({
        url: url,
        method: 'POST',
        data: this.preformdata
      }).then(({code, message, data}) => {
        if (code == '0') {
          this.$message({message: '操作成功', type: 'success'});
          if (this.type == 'add') {
            this.serno = this.preformdata.serno = data.serno;
          }
          this.lsnp();
        } else {
          this.$message({message: message || '操作失败', type: 'error'});
        }
      });
    },
    // 提交
    submitFn () {
      var _this = this;
      let validate = false;
      this.$refs.prefForm.validate(valid => {
        validate = valid;
      });
      if (!validate) {
        this.$message({message: '请输入必填项！', type: 'warning'});
        return;
      }
      this.handleClickFn();
      // 发送ECIF进行客户开户
      this.$request({
        url: this.$backend.cmisCus + '/api/cusindiv/createcusindivbycard',
        method: 'POST',
        data: this.preformdata
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.preformdata.cusId = data.cusId;
          this.saveSubmit();
        } else {
          this.$message({message: message || '操作失败', type: 'error'});
        }
      });
    },
    lsnp () {
      // 查询零售内评
      var isConsider = this.preformdata.isReconsid;
      if (isConsider == '1') {
        this.$request({
          url: this.$backend.cmisBiz + '/api/creditcardappinfo/querylsnp',
          method: 'POST',
          data: this.preformdata
        }).then(({code, message, data}) => {
          if (code == '0') {
            var secondFlag = data.secondFlag;
            this.submit(isConsider, secondFlag);
          } else {
            this.$message({message: message || '操作失败', type: 'error'});
          }
        });
      } else {
        this.submit('', '');
      }
    },
    submit (isConsider, secondFlag) {
      const startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = this.$store.state.oauth.org.code;
      startdto.userId = this.$store.state.oauth.loginCode;
      startdto.bizType = 'XK001'; // ZYB18 ZYB19 ZYB20 XDB11 XDB01
      startdto.bizId = this.preformdata.serno;
      startdto.bizUserName = this.preformdata.cusName;
      startdto.bizUserId = this.preformdata.cusId;
      startdto.param = {
        applyCardType: this.preformdata.applyType,
        certCode: this.preformdata.certCode,
        isConsider: isConsider,
        secondFlag: secondFlag,
        topoutsystemcode: this.topoutsystemcode,
        outsystemcode: this.outsystemcode

      };
      this.$refs.yufpNwfInit.wfInit(startdto);
    },

    successCbFn () {
      yufp.router.removeTab(this.$route.path);
    },
    // 清空
    clearFn () {
      this.$refs.prefForm.resetFields();
    },
    // 取消
    cancelFn () {
      this.$refs.prefForm.resetFields();
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.push({name: this.routeName});
    },
    handleClickFn () {
      // 客户类型与影像目录映射
      if (this.preformdata.applyCardPrd != '000010' && this.preformdata.applyCardPrd != '000013') {
        if (this.preformdata.cardCusType == 'B06') {
          this.outsystemcode = 'XXD_PK_B0601,XXD_PK_B0602,XXD_PK_B0603,XXD_PK_B0604,XXD_PK_B0605';
        } else if (this.preformdata.cardCusType == 'B01') {
          this.outsystemcode = 'XXD_PK_B0101,XXD_PK_B0102,XXD_PK_B0103,XXD_PK_B0104,XXD_PK_B0105';
        } else if (this.preformdata.cardCusType == 'B02') {
          this.outsystemcode = 'XXD_PK_B0201,XXD_PK_B0202,XXD_PK_B0203,XXD_PK_B0204,XXD_PK_B0205';
        } else if (this.preformdata.cardCusType == 'B07') {
          this.outsystemcode = 'XXD_PK_B0701,XXD_PK_B0702,XXD_PK_B0703,XXD_PK_B0704,XXD_PK_B0705';
        } else if (this.preformdata.cardCusType == 'B03') {
          this.outsystemcode = 'XXD_PK_B0301,XXD_PK_B0302,XXD_PK_B0303,XXD_PK_B0304,XXD_PK_B0305';
        } else if (this.preformdata.cardCusType == 'C09') {
          this.outsystemcode = 'XXD_PK_C0901,XXD_PK_C0902,XXD_PK_C0903,XXD_PK_C0904,XXD_PK_C0905,XXD_PK_C0906';
        } else if (this.preformdata.cardCusType == 'C06') {
          this.outsystemcode = 'XXD_PK_C0601,XXD_PK_C0602,XXD_PK_C0603,XXD_PK_C0604,XXD_PK_C0605,XXD_PK_C0606';
        } else if (this.preformdata.cardCusType == 'H07') {
          this.outsystemcode = 'XXD_PK_H0701,XXD_PK_H0702,XXD_PK_H0703,XXD_PK_H0704,XXD_PK_H0705,XXD_PK_H0706';
        } else if (this.preformdata.cardCusType == 'E01') {
          this.outsystemcode = 'XXD_PK_E0101,XXD_PK_E0102,XXD_PK_E0103,XXD_PK_E0104,XXD_PK_E0105,XXD_PK_E0106';
        } else if (this.preformdata.cardCusType == 'H04') {
          this.outsystemcode = 'XXD_PK_H0401,XXD_PK_H0402,XXD_PK_H0403,XXD_PK_H0404,XXD_PK_H0405,XXD_PK_H0406';
        } else if (this.preformdata.cardCusType == 'B14') {
          this.outsystemcode = 'XXD_PK_B1401,XXD_PK_B1402,XXD_PK_B1403,XXD_PK_B1404,XXD_PK_B1405,XXD_PK_B1406';
        } else if (this.preformdata.cardCusType == 'X01') {
          this.outsystemcode = 'XXD_PK_X0101,XXD_PK_X0102,XXD_PK_X0103,XXD_PK_X0104,XXD_PK_X0105,XXD_PK_X0106';
        } else if (this.preformdata.cardCusType == 'C08') {
          this.outsystemcode = 'XXD_PK_C0801,XXD_PK_C0802,XXD_PK_C0803,XXD_PK_C084,XXD_PK_C0805,XXD_PK_C0806,XXD_PK_C0807,XXD_PK_C0808';
        } else if (this.preformdata.cardCusType == 'B15') {
          this.outsystemcode = 'XXD_PK_B1501,XXD_PK_B1502,XXD_PK_B1503,XXD_PK_B1504,XXD_PK_B1505,XXD_PK_B1506';
        } else if (this.preformdata.cardCusType == 'C04') {
          this.outsystemcode = 'XXD_PK_C0401,XXD_PK_C0402,XXD_PK_C0403,XXD_PK_C0404,XXD_PK_C0405,XXD_PK_C0406,XXD_PK_C0407';
        } else if (this.preformdata.cardCusType == 'B04') {
          this.outsystemcode = 'XXD_PK_B0401,XXD_PK_B0402,XXD_PK_B0403,XXD_PK_B0404,XXD_PK_B0405,XXD_PK_B0406';
        } else if (this.preformdata.cardCusType == 'H05') {
          this.outsystemcode = 'XXD_PK_H0501,XXD_PK_H0502,XXD_PK_H0503,XXD_PK_H0504,XXD_PK_H0505,XXD_PK_H0506';
        }
      } else {
      // 乐悠金电子卡影像目录
        this.topoutsystemcode = 'XXD_LYJ';
        if (this.preformdata.cardCusType == 'B06') {
          this.outsystemcode = 'XXD_LYJ_B0601,XXD_LYJ_B0602,XXD_LYJ_B0603,XXD_LYJ_B0604,XXD_LYJ_B0605';
        } else if (this.preformdata.cardCusType == 'B01') {
          this.outsystemcode = 'XXD_LYJ_B0101,XXD_LYJ_B0102,XXD_LYJ_B0103,XXD_LYJ_B0104,XXD_LYJ_B0105';
        } else if (this.preformdata.cardCusType == 'B02') {
          this.outsystemcode = 'XXD_LYJ_B0201,XXD_LYJ_B0202,XXD_LYJ_B0203,XXD_LYJ_B0204,XXD_LYJ_B0205';
        } else if (this.preformdata.cardCusType == 'B03') {
          this.outsystemcode = 'XXD_LYJ_B0301,XXD_LYJ_B0302,XXD_LYJ_B0303,XXD_LYJ_B0304,XXD_LYJ_B0305';
        } else if (this.preformdata.cardCusType == 'C09') {
          this.outsystemcode = 'XXD_LYJ_C0901,XXD_LYJ_C0902,XXD_LYJ_C0903,XXD_LYJ_C0904,XXD_LYJ_C0905,,XXD_LYJ_C0906';
        } else if (this.preformdata.cardCusType == 'E01') {
          this.outsystemcode = 'XXD_LYJ_E0101,XXD_LYJ_E0102,XXD_LYJ_E0103,XXD_LYJ_E0104,XXD_LYJ_E0105,XXD_LYJ_E0106,XXD_LYJ_E0107,XXD_LYJ_E0108,XXD_LYJ_E0109,XXD_LYJ_E0110';
        } else if (this.preformdata.cardCusType == 'H04') {
          this.outsystemcode = 'XXD_LYJ_H0401,XXD_LYJ_H0402,XXD_LYJ_H0403,XXD_LYJ_H0404,XXD_LYJ_H0405,XXD_LYJ_H0406,XXD_LYJ_H0407,XXD_LYJ_H0408,XXD_LYJ_H0409,XXD_LYJ_H0410';
        } else if (this.preformdata.cardCusType == 'B14') {
          this.outsystemcode = 'XXD_LYJ_B1401,XXD_LYJ_B1402,XXD_LYJ_B1403,XXD_LYJ_B1404,XXD_LYJ_B1405,XXD_LYJ_B1406';
        } else if (this.preformdata.cardCusType == 'C08') {
          this.outsystemcode = 'XXD_LYJ_C0801,XXD_LYJ_C0802,XXD_LYJ_C0803,XXD_LYJ_C0804,XXD_LYJ_C0805,XXD_LYJ_C0806,XXD_LYJ_C0807,XXD_LYJ_C0808';
        } else if (this.preformdata.cardCusType == 'C03') {
          this.outsystemcode = 'XXD_LYJ_C0301,XXD_LYJ_C0302,XXD_LYJ_C0303,XXD_LYJ_C0304,XXD_LYJ_C0305,XXD_LYJ_C0306,XXD_LYJ_C0307';
        } else if (this.preformdata.cardCusType == 'C04') {
          this.outsystemcode = 'XXD_LYJ_C0401,XXD_LYJ_C0402,XXD_LYJ_C0403,XXD_LYJ_C0404,XXD_LYJ_C0405,XXD_LYJ_C0406';
        } else if (this.preformdata.cardCusType == 'B08') {
          this.outsystemcode = 'XXD_LYJ_B0801,XXD_LYJ_B0802,XXD_LYJ_B0803,XXD_LYJ_B0804,XXD_LYJ_B0805,XXD_LYJ_B0806';
        }
      }
    },
    // 申请卡产品为乐悠金卡或者乐悠金电子卡时
    cardPrdChange (e) {
      if (e === '000010' || e === '000013') {
        // 是否同时申请普通信用卡 显示且必填
        this.commonCardHidden = false;
        this.preRules.isApplyCommonCard.required = true;
      } else {
        this.commonCardHidden = true;
        this.preRules.isApplyCommonCard.required = false;
      }
      // 普通信用卡申请卡产品过滤
      const datacode = this.$lookup.find('STD_CARD_APPLY_CARD_PRD');
      this.applyCardPrdOpt = datacode.filter(op => {
        // 普卡 金卡 白金卡
        return op.key === '000001' || op.key === '000002' || op.key === '000003';
      });
      // if (e === '000010' || e === '000013' || e === '000004' || e === '000005' || e === '000009') {
      //   if (this.preformdata.applyType === 'A' || this.preformdata.applyType === 'S') {
      //     this.$message({message: '乐悠金卡，乐悠金电子卡，公务卡只有主卡没有附卡', type: 'warning'});
      //   }
      //   this.preformdata.applyType = 'B';
      // }
    },
    cardTypeChange (e) {
      // 只有 普卡、金卡、白金卡、 允许主附同申和独立附卡申请
      const datacode = this.$lookup.find('STD_CARD_APPLY_CARD_PRD');
      if (e === 'A' || e === 'S') {
        if (this.preformdata.applyCardPrd != '000001' && this.preformdata.applyCardPrd != '000002' && this.preformdata.applyCardPrd != '000003') {
          this.preformdata.applyCardPrd = '';
        }
        this.cardPrdOpt = datacode.filter(op => {
        // 普卡 金卡 白金卡
          return op.key === '000001' || op.key === '000002' || op.key === '000003';
        });
      } else {
        this.cardPrdOpt = datacode.filter(op => {
        // 普卡 金卡 白金卡
          return op.key === '000001' || op.key === '000002' || op.key === '000003' || op.key === '000004' || op.key === '000005' || op.key === '000006' ||
          op.key === '000007' || op.key === '000008' || op.key === '000009' || op.key === '000010' || op.key === '000011' || op.key === '000013' || op.key === '000014' ||
          op.key === '000015' || op.key === '000016' || op.key === '000020';
        });
      }
    },
    // 是否同时申请普通信用卡
    commonCardChange (e) {
      // 选择“是”，则”普通信用卡申请卡产品“为必填字段并展示
      if (e === '1') {
        this.cmCardHidden = false;
        this.preRules.applyCommonCardPrd.required = true;
      } else {
        this.cmCardHidden = true;
        this.preRules.applyCommonCardPrd.required = false;
      }
    }
  },
  activated () {
    const route = this.$route;
    this.routeName = route.query.name;
    this.type = route.query.type;
    if (this.type === 'edit' || this.type === 'detail') {
      this.serno = route.query.serno;
      this.getFormdata();
    }
    this.formDisable = this.type === 'detail';
  }
};
</script>