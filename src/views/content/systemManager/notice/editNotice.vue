<!-- 
  @Created by zhuly8@yusys.com.cn 2021-03-18
  @updated by
  @description test
-->
<template>
  <div class="concise-form" id="editNotice">
    <yu-panel :title="formTit" is-collapse panel-type="simple">
      <yu-xform ref="refForm" label-width="120px" v-model="formdata" :rules="formRules">
        <yu-col :span="10">
          <yu-xform-item :label="$t('notice.ggbt')" name="noticeTitle" :placeholder="$t('notice.qsr')"></yu-xform-item>
          <yu-xform-item :label="$t('notice.yxqjssj')" name="activeDate" :placeholder="$t('notice.qxz')" ctype="datepicker" :picker-options="pickerOptions"></yu-xform-item>
          <yu-xform-item :label="$t('notice.zycd')" name="noticeLevel" :placeholder="$t('notice.qsr')" ctype="select" data-code="NOTICE_LEVEL"></yu-xform-item>
          <yu-xform-item :label="$t('notice.sfzd')" name="isTop" ctype="radio" data-code="YESNO"></yu-xform-item>
          <yu-xform-item :label="$t('notice.zdqz')" name="topActiveDate" :placeholder="$t('notice.qxz')" ctype="datepicker" :picker-options="pickerOptions"></yu-xform-item>
        </yu-col>
        <yu-col :span="24">
          <yu-xform-item :label="$t('notice.ggnr')" ctype="custom" name="context" :rows="6" :colspan="24">
            <yu-tinymce ref="tinymce" v-model="formdata.context" :id="tinymceId" :min-length="tinymceMin" :max-length="tinymceMax" @count-valid="countValid"></yu-tinymce>
          </yu-xform-item>
          <yu-xform-item :label="$t('notice.fj')" ctype="custom">
            <yu-single-upload dir-name="notice" :file="fileListInfo" :upload-text="uploadText" @uploaded="uploadedFn" @delete="deleteFileFn" @load-number="loadNumberFn"></yu-single-upload>
          </yu-xform-item>
        </yu-col>
        <yu-col :span="10">
          <yu-xform-item :label="$t('notice.jsjg')" name="reciveOrgId" ctype="yufp-search-tree" :params="treeParams" @getSelectIds="getSelectIds" :selectValue="selectOrg"></yu-xform-item>
          <yu-xform-item :label="$t('notice.jsjs')" name="reciveRoleIdNames" :placeholder="$t('notice.qxz')" @focus="selectRoleFn"></yu-xform-item>
        </yu-col>
      </yu-xform>
    </yu-panel>
    <yu-form-buttons :padding-left="124">
      <yu-button @click="saveFn">{{ $t('notice.bc') }}</yu-button>
      <yu-button @click="cancleFn">{{ $t('notice.qx') }}</yu-button>
    </yu-form-buttons>

    <!-- ????????????-->
    <yu-xdialog :title="$t('notice.jsjs')" :visible.sync="dialogVisible" width="480px" height="490px">
      <div class="dialog-search">
        <yu-input v-model="roleKeyWord" icon="search" @click="searchRoleFn" @keyup.enter.native="searchRoleFn" :placeholder="$t('notice.qsr')"></yu-input>
      </div>
      <yu-xtable ref="rolesTable" :data-url="rolesTableUrl" selection-type="checkbox" @loaded="getTableSelectedFn">
        <yu-xtable-column :label="$t('sysUserManager.jsdm')" prop="roleCode"></yu-xtable-column>
        <yu-xtable-column :label="$t('sysUserManager.jsmc')" prop="roleName"></yu-xtable-column>
      </yu-xtable>
      <div slot="footer" class="yu-grpButton">
        <yu-button v-norepeat.disabled type="primary" @click="saveRoleFn">{{ $t('notice.qd') }}</yu-button>
        <yu-button @click="cancelRoleFn">{{ $t('notice.qx') }}</yu-button>
      </div>
    </yu-xdialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import { clone, lookup, extend } from '@/utils'
import YufpSearchTree from '@/components/widgets/YufpSearchTree'
import YuTinymce from '@/components/widgets/YuTinymce'
import YuSingleUpload from '@/components/widgets/YuSingleUpload'
lookup.reg('NOTICE_LEVEL,YESNO,PUB_STS,READ_STS');

export default {
  components: { YufpSearchTree, YuTinymce, YuSingleUpload },
  data() {
    return {
      tinymceId: 'Tinymce_' + Date.now(),
      roleKeyWord: '',
      rolesTableUrl: backend.appOcaService + '/api/adminsmrole/page',
      dialogVisible: false,
      formType: 'edit',
      formdata: {},
      noticeId: this.$route.query.noticeId,
      formTits: [this.$t('notice.xzgg'), this.$t('notice.editgg'), this.$t('notice.ggxq')],
      formTit: this.$t('notice.xzgg'),
      readSts: {},
      formRules: {
        noticeTitle: { required: true, message: this.$t('notice.qsrbt')},
        activeDate:{required: true, message: this.$t('notice.qsryxqjs')},
        context:[{required: true, message: this.$t('notice.qsrggnr')}, { validator: this.checkTiny }]
        
      },
      treeParams: {
        multiple: true,
        dataId: 'orgId',
        dataLabel: 'orgName',
        dataPid: 'upOrgId',
        dataUrl: backend.appOcaService + '/api/adminsmorg/orgtreequery',
        placeholder: this.$t('notice.qxz'),
        searchKey: 'orgName', // ??????????????????
        dataParams: {
          orgSts: 'A'
        } // ?????????????????? ???????????????????????????
      }, // ???????????????
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      selectOrgMap: {},
      selectRoleMap: {},
      fileList: [],
      fileListInfo: [],
      loadFileNum: 0, // ???????????????????????????
      uploadText:  this.$t('notice.uploadtext'),
      tinyWordNumber: '', // ??????????????????????????????
      tinymceMax: 1000, // ?????????????????????????????????
      tinymceMin: 10 // ?????????????????????????????????
    }
  },
  computed: {
    ...mapGetters([
      "userId"
    ]),
    selectOrg() {
      var orgIds = [];
      Object.keys(this.selectOrgMap).forEach((key, item) => {
        orgIds.push(key);
      })
      return orgIds;
    },
    selectRole() {
      var roleIds = [];
      Object.keys(this.selectRoleMap).forEach((key, item) => {
        roleIds.push(key);
      })
      return roleIds;
    },
    selectRoleNames() {
      var roleNames = [];
      Object.keys(this.selectRoleMap).forEach((key, item) => {
        roleNames.push(this.selectRoleMap[key]);
      })
      return roleNames;
    }
  },
  mounted() {
    this.readSts = lookup.find('READ_STS', false);
    this.fileListInfo = [];
    if (this.noticeId) {
      this.formTit = this.formTits[1];
      this.getNotice();
    } else {
      this.$nextTick(function() {
        this.$refs.refForm.resetFields();
        this.formdata.noticeLevel = 'N';
        this.formdata.isTop = '02';
      })
    }
  },
  methods: {
    checkTiny(rule, value, callback) {
      if(this.tinyWordNumber < this.tinymceMin) {
        callback(new Error(`${this.$t('notice.zssr')}${this.tinymceMin}${this.$t('notice.zfc')}`));
      } else if(this.tinyWordNumber > this.tinymceMax) {
        callback(new Error(`${this.$t('notice.zdsr')}${this.tinymceMax}${this.$t('notice.zfc')}`));
      } else {
        callback();
      }
    },
    countValid(val) {
      if(val) {
        this.tinyWordNumber = val;
        this.$refs.refForm.validateField('context')
      }
    },
    deleteFileFn(file) {
      this.fileList.forEach((item, index) => {
        if(item.filePath === file.filePath) {
          this.fileList.splice(index, 1);
        }
      })
    },
    loadNumberFn(val) {
      this.loadFileNum = val;
    },
    uploadedFn(fileItem, num) {
      fileItem.icon && delete fileItem.icon;
      this.fileList.push(fileItem);
    },
    getTableSelectedFn(tableData) {
      for (var i = 0; i < tableData.length; i++) {
        if (this.selectRole.indexOf(tableData[i].roleId) > -1) {
          this.$refs.rolesTable.toggleRowSelection(tableData[i], true);
        }
      }
    },
    saveRoleFn() {
      var selections = this.$refs.rolesTable.selections;
      var ids = [];
      var names = [];
      selections.forEach(item => {
        ids.push(item.roleId);
        names.push(item.roleName);
      });
      this.formdata.reciveRoleId = ids.join(',');
      this.formdata.reciveRoleIdNames = names.join(',');
      this.dialogVisible = false;
    },
    searchRoleFn: function() {
      this.$refs.rolesTable.remoteData({keyWord: this.roleKeyWord});
    },
    cancelRoleFn() {
      this.dialogVisible = false;
    },
    selectRoleFn() {
      this.dialogVisible = true;
    },
    cancleFn() {
      this.$router.back();
      yufp.router.removeTab(this.$route.path);
    },
    getSelectIds(ids) {
      this.formdata.reciveOrgId = ids.join(',')
    },
    getNotice() {
      var _this = this;
      this.$request({
        method: 'GET',
        url: backend.appOcaService + `/api/adminsmnotice/info/${_this.noticeId}`,
        data: {},
      }).then(({code, message, data}) => {
        if (code === '0') {
          _this.$refs.refForm.resetFields();
          clone(data, _this.formdata);
          _this.selectOrgMap = _this.formdata.reciveOrgMap;
          _this.selectRoleMap = _this.formdata.reciveRoleMap;
          _this.fileList = _this.formdata.fileInfoFormList;
          _this.fileListInfo = extend([], _this.formdata.fileInfoFormList)
          _this.formdata.reciveRoleIdNames = _this.selectRoleNames.join(',');
        } else {
          _this.$message({
            message: message || this.$t('notice.bcsb'),
            type: 'error'
          });
        }
      });
    },
    saveFn() {
      var _this = this;
      var validate = false;
      _this.formdata.fileInfoFormList = _this.fileList;
      if (this.loadFileNum !== this.fileList.length) {
        this.$message({ message: _this.$t('notice.fjwscw'), type: "error" });
        return;
      }
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      if(_this.formdata.isTop === '01' && (_this.formdata.topActiveDate === '' || _this.formdata.topActiveDate === undefined)) {
        _this.$message({
          message: _this.$t('notice.qxzzdjsq'),
          type: 'warning'
        })
        return;
      }
      var url = _this.formdata.noticeId ? '/api/adminsmnotice/update' : '/api/adminsmnotice/add';
      _this.$request({
        method: 'POST',
        url: backend.appOcaService + url,
        data: _this.formdata,
      }).then(({code, message, data}) => {
        if (code === '0') {
          _this.$message({
            message: _this.$t('notice.bccg'),
            type: 'success'
          });
          _this.$router.back();
          yufp.router.removeTab(this.$route.path);
          yufp.globalEventBus.$emit('addNoticeFinish');
        } else {
          _this.$message({
            message: message || this.$t('notice.bcsb'),
            type: 'error'
          });
        }
      });
    }
  }
}
</script>
