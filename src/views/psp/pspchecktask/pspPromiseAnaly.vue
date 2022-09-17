<template>
    <div>
        <yu-xform ref="refForm" label-width="120px" v-model="formData" :disabled="formType != 'edit' ? true : false">
            <yu-panel title="第一还款来源" panel-type="simple">
                <yu-xform-item name="pkId" label="主键" :hidden="true"></yu-xform-item>
                <yu-xform-item name="taskNo" label="任务编号" :hidden="true"></yu-xform-item>
            
                <yu-xform-item name="produceStatus" label="生产状况" ctype="textarea" rules="required"/>
                <yu-xform-item name="operStatus" label="企业经营状况" ctype="textarea" rules="required"/>
            </yu-panel>
            <yu-panel title="第二还款来源" panel-type="simple">
                <yu-xform-item name="guarOperStatus" label="担保人经营情况" ctype="textarea" rules="required"/>
                <yu-xform-item name="guarWishCase" label="担保意愿" ctype="textarea" rules="required"/>
                <yu-xform-item name="guarAbi" label="担保实力" ctype="textarea" rules="required"/>
                <yu-xform-item name="guarSitu" label="抵押物情况(包括但不限于抵押物余值是否能覆盖保证类贷款)" ctype="textarea" rules="required"/>
                <yu-xform-item name="validAssetAnaly" label="借款人或担保人名下有效资产分析(财产线索)" ctype="textarea" rules="required"/>
            </yu-panel>
        </yu-xform>
    </div>
</template>

<script>
export default {
    props: {
        taskNo: String,
        formType: String
    },

    data: function () {
        return {
            updateUrl: backend.cmisPsp + '/api/psppromiseanaly/update',
            queryUrl: backend.cmisPsp + '/api/psppromiseanaly/',

            formData: {},
        }
    },

    created: function () {
        var _this = this;
        this.taskNo = this.$parent.$route.params.pspTask.taskNo;
        this.$request({
            url: this.queryUrl,
            method: 'get',
            data: {condition: {taskNo: this.taskNo}},
        }).then((response) => {
            if(response.data.length != '0') {
              yufp.clone(response.data[0], _this.formData)
            }
        }).catch(() => {
            _this.$message({
                message: "请求失败"
            })
        });
    },

    methods: {

        validate: function () {
            var validate = false;
            this.$refs.refForm.validate(function (valid) {
                validate = valid;
            });
            return validate
        },

        save: function () {
            var url;
            if(this.formData.pkId) {
              url = this.updateUrl;
            } else {
              url = this.queryUrl;
              this.formData.pkId = this.$xutils.getDefaultformulaData('SEQ:TRADE_ID_SEQ');
              this.formData.taskNo = this.taskNo
            }
            return this.$request({
                url: url,
                method: 'post',
                data: this.formData,
            })
            
        },

    },
}
</script>