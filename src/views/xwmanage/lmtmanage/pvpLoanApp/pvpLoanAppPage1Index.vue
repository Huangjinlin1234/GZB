  <template>
<div>
  <d1-billcard ref="d1_BillCard" :show-btn="showBtn"></d1-billcard>
   <yufp-nwf-init ref="yufpNwfInit" @success-click="fanhui"></yufp-nwf-init>
</div>
</template>
<script>
import d1Billcard from './pvpLoanAppPage1_d1_BillCard.vue';
/* 放款基本信息页面 */
// STD_LPR_RATE_INTVAL
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data () {
    return {
      showBtn: false,
      pvpSerno: null,
      jbxx: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      if (this.bizPageData != null) {
        // 这个时候判断是从审批流进来的  直接查数据就行了
        // 单页面 跳审批的时候 是这个
        // 审批走单一页面
        this.pvpSerno = this.bizPageData.instanceInfo.bizId;
      } else if (this.$route.params.hasOwnProperty('pvpSerno')) {
        // 走路由
        this.pvpSerno = this.$route.meta.params.pvpSerno;
      } else {
        // 走审批模版工厂
        this.pvpSerno = this.getFactory().bizPageData.instanceInfo.bizId;
      }

      // try {
      //   // 走路由
      //   //this.surveySerno = this.$route.params.hasOwnProperty('pvpSerno') ? this.$route.meta.params.pvpSerno : (this.bizPageData.instanceInfo.bizId != null ? this.bizPageData.instanceInfo.bizId : this.getFactory().bizPageData.instanceInfo.bizId);
      //   this.pvpSerno = this.$route.meta.params.pvpSerno;
      // } catch (e) {
      //   console.log("报错了1");
      //   try {
      //     // 审批走单一页面
      //     this.pvpSerno = this.bizPageData.instanceInfo.bizId;
      //   } catch (e2) {
      //     console.log("报错了2");
      //     // 走审批模版工厂
      //     this.pvpSerno = this.getFactory().bizPageData.instanceInfo.bizId;
      //   }
      // }


      // ||  ||
      this.jbxx = this.$refs.d1_BillCard;
      // 载入数据
      this.selectData();
      if (this.$route.meta.params == null || this.$route.meta.params.PageType == 'LOOK') {
        this.showBtn = false;
      } else {
        this.showBtn = true;
      }
      // 赋值审批记录查看用的俩参数
      // this.$route.meta.params.apprStatus = this.$route.meta.params.apprStatus;
      // 目前放款流水号时这个  后续应该会改掉 如果修改了代码 请删掉这行注释!!!!!
      // this.$route.meta.params.surveySerno = this.$route.meta.params.tranSerno;
    },

    cancel () {

    },
    fanhui () {
      // 关闭当前模板工厂
      yufp.router.removeTab(this.$route.path);
      // this.$dialog.closeAll();
      // this.$router.go(-1);
    },


    // 进来页面默认查询数据
    selectData () {
      // 该方法用于查询数据  根据结果code不同去创建页面不同的对象
      this.$xutils.request({
        // 同步请求
        async: true,

        type: 'POST',
        url: this.$backend.cmisBiz + '/api/pvploanapp/selectbypvpsernoforxd',
        data: {pvpSerno: this.pvpSerno},

        success: (response, status, xhr) => {
          if (response.code == '0') {
            if (response.data != null) {
              if (response.data.overdueRatePefloat == null || response.data.overdueRatePefloat == '0') {
                response.data.overdueRatePefloat = '0.5';
              }
              if (response.data.ciRatePefloat == null || response.data.ciRatePefloat == '0') {
                response.data.ciRatePefloat = '0.5';
              }
              if (response.data.rateAdjMode == null) {
                response.data.rateAdjMode = '01';
              }
              if (response.data.eiIntervalCycle == null) {
                response.data.eiIntervalCycle = '1';
              }
              if (response.data.eiIntervalUnit == null) {
                response.data.eiIntervalUnit = 'M';
              }
              yufp.clone(response.data, this.jbxx.formdata);

              // this.jbxx.setBillCardValue(this.$xutils.toUpperCase(response.data, false));
              // 根据合同类型判断，LPR基准是否可选
              if (response.data.contType == '2') {
                this.jbxx.disabledFlg2 = false;
              } else {
                this.jbxx.disabledFlg2 = true;
              }
              /* console.log(response.data);*/
              // 设置利率的最小值
              // debugger;
              if (this.jbxx.minExe == 0) {
                this.jbxx.minExe = Number(response.data.execRateYear) * 100;
              }
            }
            this.$nextTick(function () {
              this.jbxx.zlfStatus = true;
            });
          }
        },

        error: (result, b) => {
          this.$xutils.showMsgBox('提示', b + '；错误信息：' + result.responseJSON.message); // 弹出提示
        }
      });
    },

    // 查询合同信息
    selectAccloanapp () {
      this.$xutils.request({
        // 同步请求
        async: false,
        Type: 'POST',
        url: this.$backend.cmisBiz + '/api/pvploanapp/selectbasicpage/' + this.$route.meta.params.pvpSerno,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            if (response.data != null) {

            }
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', b + '；错误信息：' + result.responseJSON.message); // 弹出提示
        }
      });
    },
    doSubmit () {
      // 先暂时不做校验
      var validate = false, _this = this;
      _this.jbxx.$refs.refForm.validate(function (valid) {
        validate = valid;
        valid ? _this.selectDataSubmitlc() : _this.$message({message: '借据信息尚未完善，请前往完善！', type: 'error'});
      });
      if (!validate) {
        return;
      }
      // var _this = this;
    },
    // 查询是否可以提交
    selectDataSubmitlc () {
      let postData = {};
      yufp.clone(this.jbxx.formdata, postData);
      /**
     * 查询是否可以提交审批
     */
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/pvploanapp/submityesornoxw',
        data: postData
      }).then(({code, message, data}) => {
        if (code == 0) {
          if (data == true) {
            this.submitlc();
          } else {
            this.$message({message: message, type: 'warning'});
          }
        }
      });
    },
    submitlc () {
      var _this = this;
      var docid = '';
      var imageCode = 'XDCZZYFLWB;XDCZDZY;XDCZDCCZ;XD_FQGZJKR;XD_FQGZBZR;XD_FQGZGYR;XD_FQGZWJ';
      yufp.service.request({
        async: false,
        method: 'post',
        url: backend.cmisBiz + '/api/guarcontrelwarrant/selectcoreguarantynobycontno/' + this.jbxx.formdata.contNo,
        callback: function (code, message, response) {
          docid = response.data;
          if (docid != null) {
            imageCode = 'XDCZZYFLWB;XDCZDZY;XDCZDCCZ;XD_FQGZJKR;XD_FQGZBZR;XD_FQGZGYR;XD_FQGZWJ;CMSYPYX';
          }
        }
      });
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = this.$store.state.oauth.loginCode;
      startdto.userId = this.$store.state.oauth.loginCode;
      startdto.bizType = 'XW002';
      startdto.bizId = this.$route.meta.params.pvpSerno;
      startdto.bizUserName = this.jbxx.formdata.cusName;
      startdto.bizUserId = this.jbxx.formdata.cusId;
      startdto.param = {
        imageCode: imageCode,
        docid: docid
      };
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    doSave () {
      // 先暂时不做校验
      var validate = false, _this = this;
      _this.jbxx.$refs.refForm.validate(function (valid) {
        validate = valid;
        valid ? console.log('校验通过') : _this.$message({message: '借据信息尚未完善，请前往完善！', type: 'error'});
      });
      if (!validate) {
        return;
      }


      let params = this.jbxx.getBillCardValue();
      params['pvpSerno'] = this.$route.meta.params.pvpSerno;

      // 执行保存方法
      this.$xutils.request({
        // 同步请求
        async: true,
        Type: 'POST',
        url: this.$backend.cmisBiz + '/api/pvploanapp/saveandupdate',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            if (response.data == 1) {
              this.selectData();
              this.$message({message: response.message, type: 'success'});
            } else {
              this.$message({message: response.message, type: 'warning'});
            }
          }
        },
        error: (result, b) => {
          this.$message({message: result.responseJSON.message, type: 'warning'});
        }
      });
    },
    zanCun () {
      // 先暂时不做校验
      let params = this.jbxx.getBillCardValue();
      params['pvpSerno'] = this.$route.meta.params.pvpSerno;

      // 执行保存方法
      this.$xutils.request({
        // 同步请求
        async: true,
        Type: 'POST',
        url: this.$backend.cmisBiz + '/api/pvploanapp/saveandupdate',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            if (response.data == 1) {
              this.selectData();
              this.$message({message: response.message, type: 'success'});
            } else {
              this.$message({message: response.message, type: 'warning'});
            }
          }
        },
        error: (result, b) => {
          this.$message({message: result.responseJSON.message, type: 'warning'});
        }
      });
    },
    showAction () {}
  }
};
</script>
