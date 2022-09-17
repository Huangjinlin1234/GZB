<template>
  <div>
    <div class="evalModel-content yuxp-d1 yuxp-d1__menu" style="width:100%;height: 90%">
      <div class="evalModel-content">
        <div class="el-collapse-item__header">
          <span class="evalModel-title">土地类市场比较法估值模型</span>
        </div>
        <div class="el-collapse-item__content">
          <table>
            <tr>
              <th class="yuxp-col-6">/</th>
              <th class="yuxp-col-4" colspan="2">待估押品</th>
              <th class="yuxp-col-4" colspan="2">对比实例一</th>
              <th class="yuxp-col-4" colspan="2">对比实例二</th>
              <th class="yuxp-col-4" colspan="2">对比实例三</th>
            </tr>
            <tr>
              <td>坐落位置</td>
              <td colspan="2">
                <div class="el-textarea">
                  <textarea limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="textarea" rows="2" autocomplete="off" validateevent="true" decimalseparator="." class="el-textarea__inner" style="min-height: 32.6667px;" id="B0_1" name="B0_1" v-model="B0_1"></textarea>
                </div>
              </td>
              <td colspan="2">
                <div>
                  <textarea limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="textarea" rows="2" autocomplete="off" validateevent="true" decimalseparator="." class="el-textarea__inner" style="min-height: 32.2222px;" id="B1_1" name="B1_1" v-model="B1_1"></textarea>
                </div>
              </td>
              <td colspan="2">
                <div class="el-textarea">
                  <textarea limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="textarea" rows="2" autocomplete="off" validateevent="true" decimalseparator="." class="el-textarea__inner" style="min-height: 32.6667px;" id="B2_1" name="B2_1" v-model="B2_1"></textarea>
                </div>
              </td>
              <td colspan="2">
                <div class="el-textarea">
                  <textarea limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="textarea" rows="2" autocomplete="off" validateevent="true" decimalseparator="." class="el-textarea__inner" style="min-height: 32.6667px;" id="B3_1" name="B3_1" v-model="B3_1"></textarea>
                </div>
              </td>
            </tr>
            <tr>
              <td>土地使用权面积</td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B0_2" name="B0_2" v-model="B0_2" />
                </div>
              </td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B1_2" name="B1_2" v-model="B1_2" />
                </div>
              </td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B2_2" name="B2_2" v-model="B2_2" />
                </div>
              </td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B3_2" name="B3_2" v-model="B3_2" />
                </div>
              </td>
            </tr>
            <tr>
              <td>估值单价（元/平方米）</td>
              <td colspan="2">/</td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B1_3" name="B1_3" v-model="B1_3" />
                </div>
              </td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B2_3" name="B2_3" v-model="B2_3" />
                </div>
              </td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B3_3" name="B3_3" v-model="B3_3" />
                </div>
              </td>
            </tr>
            <tr>
              <td>土地还原率(%)</td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="reductionRate" ref="reductionRate" name="reductionRate" @change="onBlur()" v-model="reductionRate1" />
                </div>
              </td>
              <td colspan="2">/</td>
              <td colspan="2">/</td>
              <td colspan="2">/</td>
            </tr>
            <tr>
              <td>估值日期(年月日)</td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B0_4" name="B0_4" v-model="B0_4" />
                </div>
              </td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B1_4" name="B1_4" v-model="B1_4" />
                </div>
              </td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B2_4" name="B2_4" v-model="B2_4" />
                </div>
              </td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B3_4" name="B3_4" v-model="B3_4" />
                </div>
              </td>
            </tr>
            <tr>
              <td>土地使用权到期日(年月日)</td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B0_5" name="B0_5" v-model="B0_5" />
                </div>
              </td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B1_5" name="B1_5" v-model="B1_5" />
                </div>
              </td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B2_5" name="B2_5" v-model="B2_5" />
                </div>
              </td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B3_5" name="B3_5" v-model="B3_5" />
                </div>
              </td>
            </tr>
            <tr>
              <td>年限调整系数</td>
              <td colspan="2">/</td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B1_6" name="B1_6" v-model="B1_6" />
                </div>
              </td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B2_6" name="B2_6" v-model="B2_6" />
                </div>
              </td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B3_6" name="B3_6" v-model="B3_6" />
                </div>
              </td>
            </tr>
            <tr>
              <td class="yuxp-col-6">定性比较因素</td>
              <td>定性判断</td>
              <td>定量打分</td>
              <td>定性判断</td>
              <td>定量打分</td>
              <td>定性判断</td>
              <td>定量打分</td>
              <td>定性判断</td>
              <td>定量打分</td>
            </tr>
            <tr>
              <td class="yuxp-col-6">交易情况因素</td>
              <td>标准</td>
              <td>100</td>
              <td>
                <yu-select v-model="B1_7_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                  <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
                </yu-select>
              </td>
              <td>
                <div class="el-input is-disabled">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B1_7_1" name="B1_7_1" v-model="B1_7_1" />
                </div>
              </td>
              <td>
                <yu-select v-model="B2_7_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                  <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
                </yu-select>
              </td>
              <td>
                <div class="el-input is-disabled">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B2_7_1" name="B2_7_1" v-model="B2_7_1" />
                </div>
              </td>
              <td>
                <yu-select v-model="B3_7_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                  <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
                </yu-select>
              </td>
              <td>
                <div class="el-input is-disabled">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B3_7_1" name="B3_7_1" v-model="B3_7_1" />
                </div>
              </td>
            </tr>

            <tr>
              <td class="yuxp-col-6">估值日期因素</td>
              <td>标准</td>
              <td>100</td>
              <td>
                <yu-select v-model="B1_8_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                  <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
                </yu-select>
              </td>
              <td>
                <div class="el-input is-disabled">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B1_8_1" name="B1_8_1" v-model="B1_8_1" />
                </div>
              </td>
              <td>
                <yu-select v-model="B2_8_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                  <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
                </yu-select>
              </td>
              <td>
                <div class="el-input is-disabled">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B2_8_1" name="B2_8_1" v-model="B2_8_1" />
                </div>
              </td>
              <td>
                <yu-select v-model="B3_8_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                  <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
                </yu-select>
              </td>
              <td>
                <div class="el-input is-disabled">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B3_8_1" name="B3_8_1" v-model="B3_8_1" />
                </div>
              </td>
            </tr>

            <tr>
              <td class="yuxp-col-6">区域因素</td>
              <td>标准</td>
              <td>100</td>
              <td>
                <yu-select v-model="B1_9_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                  <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
                </yu-select>
              </td>
              <td>
                <div class="el-input is-disabled">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B1_9_1" name="B1_9_1" v-model="B1_9_1" />
                </div>
              </td>
              <td>
                <yu-select v-model="B2_9_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                  <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
                </yu-select>
              </td>
              <td>
                <div class="el-input is-disabled">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B2_9_1" name="B2_9_1" v-model="B2_9_1" />
                </div>
              </td>
              <td>
                <yu-select v-model="B3_9_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                  <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
                </yu-select>
              </td>
              <td>
                <div class="el-input is-disabled">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B3_9_1" name="B3_9_1" v-model="B3_9_1" />
                </div>
              </td>
            </tr>

            <tr>
              <td>总累计调整因素</td>
              <td colspan="2">/</td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B1_10" name="B1_10" v-model="B1_10" />
                </div>
              </td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B2_10" name="B2_10" v-model="B2_10" />
                </div>
              </td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B3_10" name="B3_10" v-model="B3_10" />
                </div>
              </td>
            </tr>

            <tr>
              <td>比较样本调整后的市场价格</td>
              <td colspan="2">/</td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B1_11" name="B1_11" v-model="B1_11" />
                </div>
              </td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B2_11" name="B2_11" v-model="B2_11" />
                </div>
              </td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B3_11" name="B3_11" v-model="B3_11" />
                </div>
              </td>
            </tr>

            <tr>
              <td>待估押品评估单价</td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B0_6" name="B0_6" v-model="B0_6" />
                </div>
              </td>
              <td colspan="2"></td>
              <td colspan="2"></td>
              <td colspan="2"></td>
            </tr>

            <tr>
              <td>待估押品评估价值 (元)</td>
              <td colspan="2">
                <div class="el-input">
                  <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" readonly="readonly" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="evalResult" name="evalResult" v-model="evalResult" />
                </div>
              </td>
              <td colspan="2"></td>
              <td colspan="2"></td>
              <td colspan="2"></td>
            </tr>
          </table>

          <div class="yuxp-dealbutton" style="text-align:center;">
            <button id="idconfirm" type="primary" class="yuxp-button yuxp-button--default" @click="doLast()">上一步</button>
            <button id="idreset" type="primary" class="yuxp-button yuxp-button--default" @click="doEval()">估值</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      B0_1: this.pageParams.modelStreet,
      B1_1: this.pageParams.model1Addr,
      B2_1: this.pageParams.model2Addr,
      B3_1: this.pageParams.model3Addr,
      B0_2: this.pageParams.modelLandUseArea,
      B1_2: this.pageParams.model1Area,
      B2_2: this.pageParams.model2Area,
      B3_2: this.pageParams.model3Area,
      B1_3: this.pageParams.model1Price,
      B2_3: this.pageParams.model2Price,
      B3_3: this.pageParams.model3Price,
      B0_4: this.pageParams.modelBeginDate,
      B1_4: this.pageParams.model1EvalDate,
      B2_4: this.pageParams.model1EvalDate,
      B3_4: this.pageParams.model1EvalDate,
      B0_5: this.pageParams.modelEndDate,
      B1_5: this.pageParams.model1ActivateEnddate,
      B2_5: this.pageParams.model1ActivateEnddate,
      B3_5: this.pageParams.model1ActivateEnddate,
      B1_6: "",
      B2_6: "",
      B3_6: "",
      B1_7_1: "",
      B2_7_1: "",
      B3_7_1: "",
      B1_8_1: "",
      B2_8_1: "",
      B3_8_1: "",
      B1_9_1: "",
      B2_9_1: "",
      B3_9_1: "",
      B1_10: "",
      B2_10: "",
      B3_10: "",
      B1_11: "",
      B2_11: "",
      B3_11: "",
      B0_6: "",
      evalResult: "",
      reductionRate1: "",
      options: [{ key: "", value: "请选择" }, { key: "100", value: "与待估样品相当" }, { key: "105", value: "优于待估样品" }, { key: "95", value: "劣于待估样品" }, { key: "90", value: "远劣于待估样品" }, { key: "110", value: "远优于待估样品" }]
    };
  },

  methods: {
    //上一步
    doLast() {
      this.$dialog.close(this.dialogId);
    },
    doEval() {
      let _this = this;
      let reductionRate = this.$refs.reductionRate.value;
      if (reductionRate == null || reductionRate == "" || reductionRate == "null") {
        // this.$alert("请输入土地还原率！", "提示");
        this.$message.warning(" 请输入土地还原率！");
        return;
      }
      //计算算每个样本的：总累计调整因素,和比较样本调整后的市场价格
      this.doGetTotalFactor("B1");
      this.doGetTotalFactor("B2");
      this.doGetTotalFactor("B3");

      let d0 = this.B0_2;
      let P1 = this.B1_11;
      let P2 = this.B2_11;
      let P3 = this.B3_11;

      if (P1 == "" || P2 == "" || P3 == "") {
        return;
      }
      let rsPars = {};
      rsPars["d0"] = d0;
      rsPars["P1"] = P1;
      rsPars["P2"] = P2;
      rsPars["P3"] = P3;

      this.$request({
        async: false,
        method: "POST",
        url: this.$backend.cmisEval + "/api/evaluate/calCompareToMarket4House",
        data: JSON.stringify(rsPars),
        success: function(response, status, xhr) {
          if (response != null) {
            // 赋值
            _this.B0_6 = response.evalArea;
            _this.evalResult = response.evalResult;
          }
        },
        error: function(result, status, errorThrown) {
          this.$message.error(result);
        }
      });
    },

    doGetTotalFactor(model) {
      let B4 = "";
      let f = "";
      let S7 = "";
      let S8 = "";
      let S9 = "";
      if (model == "B1") {
        B4 = this.B1_3; //获得估值单价的值; ex:B1_4
        f = this.B1_6; //获得年限调整系数的值; ex:f1
        S7 = this.B1_7_1; //交易情况因素
        S8 = this.B1_8_1; //估值日期因素
        S9 = this.B1_9_1; //区域因素
      } else if (model == "B2") {
        B4 = this.B2_3; //获得估值单价的值; ex:B1_4
        f = this.B2_6; //获得年限调整系数的值; ex:f1
        S7 = this.B2_7_1; //交易情况因素
        S8 = this.B2_8_1; //估值日期因素
        S9 = this.B2_9_1; //区域因素
      } else {
        B4 = this.B3_3; //获得估值单价的值; ex:B1_4
        f = this.B3_6; //获得年限调整系数的值; ex:f1
        S7 = this.B3_7_1; //交易情况因素
        S8 = this.B3_8_1; //估值日期因素
        S9 = this.B3_9_1; //区域因素
      }

      if (S7 == "" || S8 == "" || S9 == "" || f == "") {
        return;
      }
      let F = (((((100 / parseFloat(S7)) * 100) / parseFloat(S8)) * 100) / parseFloat(S9)) * parseFloat(f);
      let P = parseFloat(B4) * parseFloat(F);
      if (model == "B1") {
        this.B1_10 = F;
        this.B1_11 = P;
      } else if (model == "B2") {
        this.B2_10 = F;
        this.B2_11 = P;
      } else {
        this.B3_10 = F;
        this.B3_11 = P;
      }
    },
    // 土地还原率
    onBlur() {
      let _this = this;
      let reductionRate = this.$refs.reductionRate.value;
      if (reductionRate == null || reductionRate == "" || reductionRate == "null") {
        // this.$alert("请输入土地还原率！", "提示");
        this.$message.warning(" 请输入土地还原率！");
        return;
      } else if (reductionRate > 0.08 || reductionRate < 0.05) {
        // this.$alert("土地还原率需在0.05-0.08之间!", "提示");
        this.$message.warning(" 土地还原率需在0.05-0.08之间!");
        this.reductionRate1 = "";
        return;
      }
      let d0 = reductionRate;
      let d1 = this.B0_4;
      let d2 = this.B1_4;
      let d3 = this.B2_4;
      let d4 = this.B3_4;
      let d5 = this.B0_5;
      let d6 = this.B1_5;
      let d7 = this.B2_5;
      let d8 = this.B3_5;
      let dd = d0 + "," + d1 + "," + d2 + "," + d3 + "," + d4 + "," + d5 + "," + d6 + "," + d7 + "," + d8;
      this.$request({
        async: false,
        method: "POST",
        url: this.$backend.cmisEval + "/api/evaluate/calCompareToMarket4LandTimeFactor",
        data: JSON.stringify({ ddMess: dd }),
        success: function(response, status, xhr) {
          if (response != null && response.msg == "success") {
            // 赋值
            _this.B1_6 = response.f1;
            _this.B2_6 = response.f2;
            _this.B3_6 = response.f3;
          }
        },
        error: function(result, status, errorThrown) {
          this.$message.error(result);
        }
      });
    }
  }
};
</script>
