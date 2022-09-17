<template>
  <div style="height:100%;">
    <yu-collapse v-model="activeNames">
      <yu-collapse-item title="拨打电话" name="1">
        <yu-toolbar v-if="node.pageType=='TODO'">
          <yu-button type="primary" v-if="!formDisable" @click="addFn">新增</yu-button>
          <yu-button type="primary" v-if="!formDisable" @click="deleteFn">删除</yu-button>
        </yu-toolbar>
        <yu-xtable ref="phoneTable" :data="phoneTableData" :pageable="false" style="width: 100%">
          <yu-xtable-column prop="catiType" label="*致电类型" ctype="select" data-code="STD_CARD_CATI_TYPE" @change="typeChange"
            :rules="[{ required: true, message: '请选择', trigger: 'blur' }]" :disabled="formDisable||node.pageType!=='TODO'"></yu-xtable-column>
          <yu-xtable-column prop="catiPhone" label="致电号码" :disabled="formDisable||node.pageType!=='TODO'">
            <template slot-scope="scope" :disabled="formDisable||node.pageType!=='TODO'">
              <yu-input v-model="scope.row.catiPhone" :disabled="formDisable||node.pageType!=='TODO'"></yu-input>
            </template>
          </yu-xtable-column>
          <yu-xtable-column prop="catiDate" label="*致电日期" ctype="datepicker"
            :rules="[{ required: true, message: '请选择', trigger: 'blur' }]" :disabled="formDisable||node.pageType!=='TODO'"></yu-xtable-column>
          <yu-xtable-column prop="catiResult" label="*致电结果" ctype="select" data-code="STD_CARD_CATI_RESULT"
            :rules="[{ required: true, message: '请选择', trigger: 'blur' }]" :disabled="formDisable||node.pageType!=='TODO'"></yu-xtable-column>
          <yu-xtable-column prop="remark" label="备注">
            <template slot-scope="scope">
              <yu-input v-model="scope.row.remark" :disabled="formDisable||node.pageType!=='TODO'"></yu-input>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="操作">
            <template slot-scope="scope">
              <yu-button @click="copyPhoneFn(scope.row, $event)">复制电话号码</yu-button>
            </template>
          </yu-xtable-column>
        </yu-xtable>
      </yu-collapse-item>
      <yu-collapse-item title="核实问题" name="2">
        <yu-xtable :data="checkTableData" :pageable="false" style="width: 100%">
          <yu-xtable-column prop="questionContent" label="问题内容"></yu-xtable-column>
          <yu-xtable-column prop="answer" label="问题答案"></yu-xtable-column>
          <yu-xtable-column prop="questionResult" label="*问题结果">
            <template slot-scope="scope">
              <yu-xselect ref="xselect" v-model="scope.row.questionResult" data-code="STD_ZB_YES_NO" placeholder="请选择" style="float:left;width:60%" :disabled="formDisable||node.pageType!=='TODO'"></yu-xselect>
              <yu-tag type="danger" style="margin: 6px 0 0 6px;" v-show="scope.row.questionResult=='0'">！</yu-tag>
            </template>
          </yu-xtable-column>
          <yu-xtable-column prop="remark" label="备注">
            <template slot-scope="scope">
              <yu-input v-model="scope.row.remark" :disabled="formDisable||node.pageType!=='TODO'"></yu-input>
            </template>
          </yu-xtable-column>
        </yu-xtable>
      </yu-collapse-item>
      <yu-collapse-item title="必问问题" name="3">
        <yu-xtable :data="questionTableData" :pageable="false" style="width: 100%">
          <yu-xtable-column prop="questionContent" label="问题内容"></yu-xtable-column>
          <yu-xtable-column prop="answer" label="问题答案"></yu-xtable-column>
          <yu-xtable-column prop="questionResult" label="*问题结果">
            <template slot-scope="scope">
              <yu-xselect ref="xselect" v-model="scope.row.questionResult" data-code="STD_ZB_YES_NO" placeholder="请选择" style="float:left;width:60%" :disabled="formDisable||node.pageType!=='TODO'"></yu-xselect>
              <yu-tag type="danger" style="margin: 6px 0 0 6px;" v-show="scope.row.questionResult=='0'">！</yu-tag>
            </template>
          </yu-xtable-column>
          <yu-xtable-column prop="remark" label="备注">
            <template slot-scope="scope">
              <yu-input v-model="scope.row.remark" :disabled="formDisable||node.pageType!=='TODO'"></yu-input>
            </template>
          </yu-xtable-column>
        </yu-xtable>
      </yu-collapse-item>
      <yu-collapse-item title="电话调查操作信息" name="4">
        <yu-xform ref="prefForm" v-model="formdata" label-width="140px" :disabled="formDisable||node.pageType!=='TODO'">
          <yu-xform-group :column="1">
            <yu-xform-item label="是否免电话调查" name="isTelSurvey" ctype="select" data-code="STD_ZB_YES_NO" rules="required" :colspan="12"></yu-xform-item>
            <yu-xform-item label="" name="" ctype="custom" :colspan="12"></yu-xform-item>
            <yu-xform-item label="审批结论" name="approveConclusion" ctype="select" :options="opDict" rules="required" @change="conclusionChange" :colspan="12"></yu-xform-item>
            <yu-xform-item label="" name="" ctype="custom" :colspan="12"></yu-xform-item>
            <yu-xform-item label="电话调查备注" name="telSurveyRemark" ctype="textarea" colspan="24"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-collapse-item>
      <div class="yu-grpButton" >
        <yu-button type="primary" v-if="node.pageType=='TODO' " @click="saveFn(null)">保存</yu-button>
        <yu-button type="primary" v-if="node.pageType=='TODO'" @click="saveFn('submitFn')">提交</yu-button>
        <yu-button type="primary"  @click="backFn">返回</yu-button>
      </div>
    </yu-collapse>
  </div>
</template>
<script>
import { lookup, clone } from '@/utils';
import dict from '@/config/constant/app.data.lookup.js';
lookup.reg('STD_CARD_CATI_TYPE,STD_CARD_CATI_RESULT,STD_ZB_YES_NO');
export default {
  name: 'PhoneSurvey',
  props: {
    node: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data () {
    return {
      urls: {
        // 删除可编辑表格数据
        deleteUrl: this.$backend.cmisBiz + '/api/creditcardtelvperdetail/delete/',
        // 获取申请信息
        queryUrl: this.$backend.cmisBiz + '/api/creditcardappinfo/querybyserno',
        // 电核对象信息查询
        queryPhoneUrl: this.$backend.cmisBiz + '/api/creditcardtelvperdetail/querybyconditon',
        // 电核明细信息查询
        queryQuestionUrl: this.$backend.cmisBiz + '/api/creditcardtelvquestiondetail/querybymodel',
        // 电核其他信息查询
        queryOtherUrl: this.$backend.cmisBiz + '/api/creditcardtelvotherinfo/selectbyserno',
        // 电核问题明细信息保存
        saveQuestionUrl: this.$backend.cmisBiz + '/api/creditcardtelvquestiondetail/savequestiondetail',
        // 电话调查可编辑列表保存
        savePhoneUrl: this.$backend.cmisBiz + '/api/creditcardtelvperdetail/savetellist',
        // 电核其他信息保存
        saveOtherUrl: this.$backend.cmisBiz + '/api/creditcardtelvotherinfo/insertauto'
      },
      activeNames: ['1', '2', '3', '4'],
      catiType: {
        '00': 'unitPhone',
        '01': 'phone',
        '02': 'familyPhone',
        '03': 'managerPhone',
        '04': 'relaLinkmanPhone',
        '05': 'otherLinkmanPhone',
        '06': 'unitPhone'
      },
      phoneTableData: [
        { catiType: '02', catiPhone: '', catiDate: this.getCurrentDate(), catiResult: '', remark: '' }
      ],
      checkTableData: [
        { questionContent: '请问您在我行申请的信用卡是您本人申请的吗？', answer: '', questionResult: '1', remark: '' },
        { questionContent: '请问您的身份证后四位是多少？', answer: '自动截取身份证后四位展示', questionResult: '1', remark: '' }
      ],
      questionTableData: [
        { questionContent: '公司名称', answer: '自动获取申请信息中单位全称', questionResult: '1', remark: '' },
        { questionContent: '公司地址', answer: '自动获取申请信息中单位地址', questionResult: '1', remark: '' },
        { questionContent: '公司电话', answer: '自动获取申请信息中单位电话', questionResult: '1', remark: '' }
      ],
      formdata: {},
      applyInfo: null, // 信用卡申请信息
      formDisable: false, // 表单只读状态和操作按钮的显隐
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
      },
      optypeOptions: [],
      opDict: []
    };
  },
  watch: {
    applyInfo: {
      deep: true,
      handler (val, old) {
        this.typeChange();
      }
    }
  },
  methods: {
    typeChange () {
      if (this.applyInfo) {
        this.phoneTableData.forEach(item => {
          item.catiPhone = this.applyInfo[this.catiType[item.catiType]];
        });
      }
    },
    conclusionChange (e) {
      this.commentInfo.commentSign = e;
    },
    copyHandler (e) {
      window.clipboardData.setData('Text', this.pastePhone);
      e.preventDefault();
    },
    // 复制电话号码
    copyPhoneFn (row, e) {
      if (window.clipboardData) { // for ie
        this.pastePhone = row.catiPhone;
        document.body.addEventListener('copy', this.copyHandler);
        setTimeout(() => {
          document.body.removeEventListener('copy', this.copyHandler);
        }, 10);
      } else {
        if (!document.execCommand) {
          return;
        }
        const input = e.target.parentElement.parentElement.parentElement.parentElement.children[1].children[0].children[0].querySelector('input');
        input.select();
        document.execCommand('copy');
      }
    },
    // 获取当前系统日期
    getCurrentDate () {
      const time = new Date();
      return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
    },
    // 新增
    addFn () {
      const row = {
        catiType: '02',
        catiPhone: '',
        catiDate: this.getCurrentDate(),
        catiResult: '',
        remark: '',
        pkId: ''
      };
      var flag = false;
      // 校验表格数据
      this.$refs.phoneTable.validate(fields => {
        if (!fields) {
          flag = true;
        }
      });
      // 校验通过添加数据
      if (flag) {
        this.phoneTableData.push(row);
        this.$refs.phoneTable.setCurrentRow(row);
      }
    },
    // 删除
    deleteFn () {
      let selections = this.$refs.phoneTable.selections;
      if (selections.length !== 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        if (selections[0].pkId) {
          this.$request({
            method: 'POST',
            url: this.urls.deleteUrl + selections[0].pkId
          }).then(({code, message, data}) => {
            if (code == '0') {
              this.$message({ message: '删除成功', type: 'success' });
              this.getPhoneTableData();
            } else {
              this.$message({ message: message || '删除失败', type: 'error' });
            }
          });
        } else {
          this.phoneTableData.pop();
        }
      });
    },
    // 获取申请信息
    getApplyData () {
      var _this = this;
      this.$request({
        url: this.urls.queryUrl,
        method: 'POST',
        data: {
          serno: this.node.bizId
        }
      }).then(({code, message, data}) => {
        if (code == '0') {
          // certCode corpName unitAddrProvince unitAddrCity unitAddrZone unitDetailAddr unitPhone
          // 获取证件号后四位
          this.checkTableData[1].answer = data.certCode.slice(-4);
          // 获取单位全称
          this.questionTableData[0].answer = data.corpName;
          // 获取单位地址
          this.questionTableData[1].answer = data.unitDetailAddr;
          // 获取单位电话
          this.questionTableData[2].answer = data.unitPhone;
          _this.applyInfo = clone(data, {});
        } else {
          this.$message({message: message || '获取数据失败', type: 'error'});
        }
      });
    },
    // 获取电核对象数据
    getPhoneTableData () {
      this.$request({
        url: this.urls.queryPhoneUrl,
        method: 'POST',
        data: {
          condition: JSON.stringify({ serno: this.node.bizId })
        }
      }).then(({code, message, data}) => {
        if (code == '0') {
          this.phoneTableData = data && data.length > 0 ? data : this.phoneTableData;
          if (!this.formDisable && this.node.pageType !== 'TODO') {
            // 首次挂载页面后触发最后一行选中状态以此触发校验，否则点击新增可直接增加数据
            this.$refs.phoneTable.setCurrentRow(this.phoneTableData[this.phoneTableData.length - 1]);
          }
        }
      });
    },
    // 获取电核明细信息
    getQuestionData () {
      this.$request({
        url: this.urls.queryQuestionUrl,
        method: 'POST',
        data: {
          condition: JSON.stringify({ serno: this.node.bizId })
        }
      }).then(({code, message, data}) => {
        if (code == '0') {
          if (data && data.length) {
            const serno = this.node.bizId;
            data && data.forEach((item) => {
              if (item.questionContent.indexOf('请问您在我行申请的信用卡是您本人申请的吗') > -1) {
                for (const key in item) {
                  this.checkTableData[0][key] = item[key];
                  this.checkTableData[0].serno = serno;
                }
              } else if (item.questionContent.indexOf('请问您的身份证后四位是多少') > -1) {
                for (const key in item) {
                  this.checkTableData[1][key] = item[key];
                  this.checkTableData[1].serno = serno;
                }
              } else if (item.questionContent.indexOf('公司名称') > -1) {
                for (const key in item) {
                  this.questionTableData[0][key] = item[key];
                  this.questionTableData[0].serno = serno;
                }
              } else if (item.questionContent.indexOf('公司地址') > -1) {
                for (const key in item) {
                  this.questionTableData[1][key] = item[key];
                  this.questionTableData[1].serno = serno;
                }
              } else { // 公司电话
                for (const key in item) {
                  this.questionTableData[2][key] = item[key];
                  this.questionTableData[2].serno = serno;
                }
              }
            });
          } else {
            this.getApplyData();
          }
        } else {
          this.$message({message: message || '获取数据失败', type: 'error'});
        }
      });
    },
    // 获取电核其他数据
    getOhterInfo () {
      this.$request({
        url: this.urls.queryOtherUrl,
        method: 'POST',
        data: {
          serno: this.node.bizId
        }
      }).then(({code, message, data}) => {
        if (code == '0') {
          clone(data, this.formdata);
        }
      });
    },
    // 保存电核对象数据
    savePhoneData () {
      return new Promise((resolve, reject) => {
        const serno = this.node.bizId;
        this.phoneTableData.forEach(item => {
          item.serno = serno;
        });
        this.$request({
          url: this.urls.savePhoneUrl,
          method: 'POST',
          data: this.phoneTableData
        }).then(({code, message, data}) => {
          if (code == '0') {
            this.getPhoneTableData();
            resolve('电话调查可编辑列表保存成功!');
          }
        });
      });
    },
    // 保存明细信息数据
    saveQuestionData () {
      return new Promise((resolve, reject) => {
        const serno = this.node.bizId;
        const data = [].concat(this.checkTableData, this.questionTableData);
        data.forEach(item => {
          item.serno = serno;
        });
        this.$request({
          url: this.urls.saveQuestionUrl,
          method: 'POST',
          data: data
        }).then(({code, message, data}) => {
          if (code == '0') {
            resolve('核身问题和必问问题保存成功!');
          }
        });
      });
    },
    // 保存电核其他信息
    saveOtherData () {
      return new Promise((resolve, reject) => {
        const serno = this.node.bizId;
        !this.formdata.serno && (this.formdata.serno = serno);
        this.formdata.approveConclusion = this.commentInfo.commentSign;
        this.$request({
          url: this.urls.saveOtherUrl,
          method: 'POST',
          data: this.formdata
        }).then(({code, message, data}) => {
          if (code == '0') {
            resolve('电核其他信息保存成功!');
          }
        });
      });
    },
    // 保存
    saveFn (callback) {
      let validate = false;
      this.$refs.prefForm.validate(valid => {
        validate = valid;
      });
      if (!validate) {
        this.$message({message: '请将必填信息填写完整!', type: 'warning'});
        return false;
      }
      Promise
        .all([this.savePhoneData(), this.saveQuestionData(), this.saveOtherData()])
        .then(res => {
          if (!callback) {
            this.$message({message: '保存成功!', type: 'success'});
          } else {
            this[callback]();
          }
        })
        .catch(e => {
          this.$message({message: '保存失败!', type: 'error'});
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
      this.commentInfo.ext = this.formdata.telSurveyRemark;
      const param = {
        opType: commentSign, // 审批结论
        param: paramWF, // 业务参数
        comment: this.commentInfo // 提交意见参数
      };
      return param;
    },
    // 提交
    submitFn () {
      if (this.formdata.approveConclusion == 'O-12') {
        var data = this.phoneTableData;
        for (let i = 0; i < data.length; i++) {
          if (data[i].catiResult == '' || data[i].catiResult == null) {
            this.$message({message: '请输入致电结果!', type: 'error'});
            return;
          } else if (data[i].catiResult == '01' && data[i].catiType == '01') {
            console.log(data[i].catiResult + '......' + data[i].catiType);
            this.$message({message: '存在移动电话调查结果为:无人接听,无法提交!', type: 'error'});
            return;
          } else {
            const param = this.getFlowParam(this.commentInfo.commentSign);
            this.$emit('submit', param);
          }
        }
      } else {
        const param = this.getFlowParam(this.commentInfo.commentSign);
        this.$emit('submit', param);
      }
    },
    // 返回
    backFn () {
      this.$router.replace({
        name: this.node.returnBackFuncId
      });
    }
  },
  created () {
    this.optypeOptions = this.node.optypeOptions || dict.OP_TYPE || [];
    this.opDict = [];
    for (const item of this.optypeOptions) {
      this.opDict.push({
        key: item.value,
        value: item.label
      });
    }
  },
  mounted () {
    this.getPhoneTableData();
    this.getQuestionData();
    this.getOhterInfo();
    // 流程节点只要不是 node3 则表单只读状态和按钮隐藏
    this.formDisable = this.node.currentNode !== 'node3';
  }
};
</script>
