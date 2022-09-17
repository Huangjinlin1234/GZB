<template>
  <div>
    <div class="evalModel-content">
      <div class="el-collapse-item__header">
        <span class="evalModel-title">房产类市场比较法估值模型</span>
      </div>
      <div class="el-collapse-item__content">
        <table>
          <tr>
            <th class="yuxp-col-5" colspan="3">/</th>
            <th class="yuxp-col-2" colspan="2">待估押品</th>
            <th class="yuxp-col-5" colspan="2">对比实例一</th>
            <th class="yuxp-col-5" colspan="2">对比实例二</th>
            <th class="yuxp-col-5" colspan="2">对比实例三</th>
          </tr>
          <tr>
            <td colspan="3">坐落位置</td>
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
            <td colspan="3">建筑面积(平方米)</td>
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
            <td colspan="3">估值单价（元/平方米）</td>
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
            <td colspan="2" class="yuxp-col-1">比较因素</td>
            <td>权重</td>
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
            <td class="yuxp-col-1" rowspan="4">区域状况</td>
            <td>区域繁华</td>
            <td>
              <div class="el-input">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" type="num" rows="2" validateevent="true" datatype="percent" decimalseparator="." class="el-input__inner" id="weight01" name="weight01" readonly="readonly" v-model="weight01" />
              </div>
            </td>
            <td>标准</td>
            <td>100</td>
            <td>
              <yu-select v-model="B1_4_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B1_4_1" name="B1_4_1" v-model="B1_4_1" />
              </div>
            </td>
            <td>
              <yu-select v-model="B2_4_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B2_4_1" name="B2_4_1" v-model="B2_4_1" />
              </div>
            </td>
            <td>
              <yu-select v-model="B3_4_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B3_4_1" name="B3_4_1" v-model="B3_4_1" />
              </div>
            </td>
          </tr>

          <tr>
            <td>交通便捷</td>
            <td>
              <div class="el-input">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" type="num" rows="2" validateevent="true" datatype="percent" decimalseparator="." class="el-input__inner" id="weight02" name="weight02" readonly="readonly" v-model="weight02" />
              </div>
            </td>
            <td>标准</td>
            <td>100</td>
            <td>
              <yu-select v-model="B1_5_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B1_5_1" name="B1_5_1" v-model="B1_5_1" />
              </div>
            </td>
            <td>
              <yu-select v-model="B2_5_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B2_5_1" name="B2_5_1" v-model="B2_5_1" />
              </div>
            </td>
            <td>
              <yu-select v-model="B3_5_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B3_5_1" name="B3_5_1" v-model="B3_5_1" />
              </div>
            </td>
          </tr>

          <tr>
            <td>环境景观</td>
            <td>
              <div class="el-input">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" type="num" rows="2" validateevent="true" datatype="percent" decimalseparator="." class="el-input__inner" id="weight03" name="weight03" readonly="readonly" v-model="weight03" />
              </div>
            </td>
            <td>标准</td>
            <td>100</td>
            <td>
              <yu-select v-model="B1_6_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B1_6_1" name="B1_6_1" v-model="B1_6_1" />
              </div>
            </td>
            <td>
              <yu-select v-model="B2_6_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B2_6_1" name="B2_6_1" v-model="B2_6_1" />
              </div>
            </td>
            <td>
              <yu-select v-model="B3_6_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B3_6_1" name="B3_6_1" v-model="B3_6_1" />
              </div>
            </td>
          </tr>

          <tr>
            <td>公共配置</td>
            <td>
              <div class="el-input">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" type="num" rows="2" validateevent="true" datatype="percent" decimalseparator="." class="el-input__inner" id="weight04" name="weight04" readonly="readonly" v-model="weight04" />
              </div>
            </td>
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
            <td class="yuxp-col-1" rowspan="6">实物状况</td>
            <td>楼层情况</td>
            <td>
              <div class="el-input">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" type="num" rows="2" validateevent="true" datatype="percent" decimalseparator="." class="el-input__inner" id="weight05" name="weight05" readonly="readonly" v-model="weight05" />
              </div>
            </td>
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
            <td>朝向情况</td>
            <td>
              <div class="el-input">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" type="num" rows="2" validateevent="true" datatype="percent" decimalseparator="." class="el-input__inner" id="weight06" name="weight06" readonly="readonly" v-model="weight06" />
              </div>
            </td>
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
            <td>装修状况</td>
            <td>
              <div class="el-input">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" type="num" rows="2" validateevent="true" datatype="percent" decimalseparator="." class="el-input__inner" id="weight07" name="weight07" readonly="readonly" v-model="weight07" />
              </div>
            </td>
            <td>标准</td>
            <td>100</td>
            <td>
              <yu-select v-model="B1_10_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B1_10_1" name="B1_10_1" v-model="B1_10_1" />
              </div>
            </td>
            <td>
              <yu-select v-model="B2_10_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B2_10_1" name="B2_10_1" v-model="B2_10_1" />
              </div>
            </td>
            <td>
              <yu-select v-model="B3_10_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B3_10_1" name="B3_10_1" v-model="B3_10_1" />
              </div>
            </td>
          </tr>

          <tr>
            <td>设施设备</td>
            <td>
              <div class="el-input">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" type="num" rows="2" validateevent="true" datatype="percent" decimalseparator="." class="el-input__inner" id="weight08" name="weight08" readonly="readonly" v-model="weight08" />
              </div>
            </td>
            <td>标准</td>
            <td>100</td>
            <td>
              <yu-select v-model="B1_11_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B1_11_1" name="B1_11_1" v-model="B1_11_1" />
              </div>
            </td>
            <td>
              <yu-select v-model="B2_11_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B2_11_1" name="B2_11_1" v-model="B2_11_1" />
              </div>
            </td>
            <td>
              <yu-select v-model="B3_11_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B3_11_1" name="B3_11_1" v-model="B3_11_1" />
              </div>
            </td>
          </tr>

          <tr>
            <td>物业管理</td>
            <td>
              <div class="el-input">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" type="num" rows="2" validateevent="true" datatype="percent" decimalseparator="." class="el-input__inner" id="weight09" name="weight09" readonly="readonly" v-model="weight09" />
              </div>
            </td>
            <td>标准</td>
            <td>100</td>
            <td>
              <yu-select v-model="B1_12_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B1_12_1" name="B1_12_1" v-model="B1_12_1" />
              </div>
            </td>
            <td>
              <yu-select v-model="B2_12_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B2_12_1" name="B2_12_1" v-model="B2_12_1" />
              </div>
            </td>
            <td>
              <yu-select v-model="B3_12_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B3_12_1" name="B3_12_1" v-model="B3_12_1" />
              </div>
            </td>
          </tr>

          <tr>
            <td>工程质量</td>
            <td>
              <div class="el-input">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" type="num" rows="2" validateevent="true" datatype="percent" decimalseparator="." class="el-input__inner" id="weight10" name="weight10" readonly="readonly" v-model="weight10" />
              </div>
            </td>
            <td>标准</td>
            <td>100</td>
            <td>
              <yu-select v-model="B1_13_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B1_13_1" name="B1_13_1" v-model="B1_13_1" />
              </div>
            </td>
            <td>
              <yu-select v-model="B2_13_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B2_13_1" name="B2_13_1" v-model="B2_13_1" />
              </div>
            </td>
            <td>
              <yu-select v-model="B3_13_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B3_13_1" name="B3_13_1" v-model="B3_13_1" />
              </div>
            </td>
          </tr>

          <tr>
            <td class="yuxp-col-1" rowspan="2">权益状况</td>
            <td>规划限制与容积率</td>
            <td>
              <div class="el-input">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" type="num" rows="2" validateevent="true" datatype="percent" decimalseparator="." class="el-input__inner" id="weight11" name="weight11" readonly="readonly" v-model="weight11" />
              </div>
            </td>
            <td>标准</td>
            <td>100</td>
            <td>
              <yu-select v-model="B1_14_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B1_14_1" name="B1_14_1" v-model="B1_14_1" />
              </div>
            </td>
            <td>
              <yu-select v-model="B2_14_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B2_14_1" name="B2_14_1" v-model="B2_14_1" />
              </div>
            </td>
            <td>
              <yu-select v-model="B3_14_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B3_14_1" name="B3_14_1" v-model="B3_14_1" />
              </div>
            </td>
          </tr>

          <tr>
            <td>剩余使用年限</td>
            <td>
              <div class="el-input">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" type="num" rows="2" validateevent="true" datatype="percent" decimalseparator="." class="el-input__inner" readonly="readonly" id="weight12" name="weight12" v-model="weight12" />
              </div>
            </td>
            <td>标准</td>
            <td>100</td>
            <td>
              <yu-select v-model="B1_15_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B1_15_1" name="B1_15_1" v-model="B1_15_1" />
              </div>
            </td>
            <td>
              <yu-select v-model="B2_15_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B2_15_1" name="B2_15_1" v-model="B2_15_1" />
              </div>
            </td>
            <td>
              <yu-select v-model="B3_15_1" placeholder="请选择" size="small" style="width:130px;height:30px;line-height:26px;font-size:12px;" class="yuxp-card-select yuxp-form-item">
                <yu-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </yu-option>
              </yu-select>
            </td>
            <td>
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="text" rows="2" validateevent="true" decimalseparator="." class="el-input__inner" id="B3_15_1" name="B3_15_1" v-model="B3_15_1" />
              </div>
            </td>
          </tr>

          <tr>
            <td class="yuxp-col-1" colspan="3">总调整因素</td>
            <td colspan="2">/</td>
            <td colspan="2" align="center">
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="num" rows="2" validateevent="true" datatype="percent" decimalseparator="." class="el-input__inner" id="B1_16" name="B1_16" v-model="B1_16" />
              </div>
            </td>
            <td colspan="2" align="center">
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="num" rows="2" validateevent="true" datatype="percent" decimalseparator="." class="el-input__inner" id="B2_16" name="B2_16" v-model="B2_16" />
              </div>
            </td>
            <td colspan="2" align="center">
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="num" rows="2" validateevent="true" datatype="percent" decimalseparator="." class="el-input__inner" id="B3_16" name="B3_16" v-model="B3_16" />
              </div>
            </td>
          </tr>
          <tr>
            <td class="yuxp-col-1" colspan="3">对比实例调整后的市场价格 (元)</td>
            <td colspan="2">/</td>
            <td colspan="2" align="center">
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="num" rows="2" validateevent="true" datatype="percent" decimalseparator="." class="el-input__inner" id="B1_17" name="B1_17" v-model="B1_17" />
              </div>
            </td>
            <td colspan="2" align="center">
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="num" rows="2" validateevent="true" datatype="percent" decimalseparator="." class="el-input__inner" id="B2_17" name="B2_17" v-model="B2_17" />
              </div>
            </td>
            <td colspan="2" align="center">
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="num" rows="2" validateevent="true" datatype="percent" decimalseparator="." class="el-input__inner" id="B3_17" name="B3_17" v-model="B3_17" />
              </div>
            </td>
          </tr>

          <tr>
            <td class="yuxp-col-1" colspan="3">待估押品评估价值 (元)</td>
            <td colspan="2">
              <div class="el-input is-disabled">
                <input autocomplete="off" limitchar="/[^\u4e00-\u9fa5A-Za-z0-9\s\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\（\）\《\》\——\；\，\。\“\”\<\>\！\？\：\【\】]{1,}/g" disabled="disabled" type="num" rows="2" validateevent="true" datatype="double" decimalseparator="." class="el-input__inner" id="evalResult" name="evalResult" v-model="evalResult" />
              </div>
            </td>
            <td colspan="2" align="center"></td>
            <td colspan="2" align="center"></td>
            <td colspan="2" align="center"></td>
          </tr>
        </table>

        <div class="yuxp-dealbutton" style="text-align:center;">
          <button id="idconfirm" type="primary" class="yuxp-button yuxp-button--default" @click="doingLast2()">上一步</button>
          <button id="idreset" type="primary" class="yuxp-button yuxp-button--default" @click="doEval()">估值</button>
          <button id="doConfirm" type="primary" class="yuxp-button yuxp-button--default" @click="doConfirm()">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let rsParam = {};
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      B0_1: this.pageParams.modelStreet,
      B0_2: Number(this.pageParams.modelArea.toString().match(/^\d+(?:\.\d{0,2})?/)),
      B1_1: this.pageParams.model1Addr,
      B1_2: Number(this.pageParams.modelArea.toString().match(/^\d+(?:\.\d{0,2})?/)),
      B1_3: Number(this.pageParams.model1Price.toString().match(/^\d+(?:\.\d{0,2})?/)),
      B2_1: this.pageParams.model2Addr,
      B2_2: Number(this.pageParams.model2Area.toString().match(/^\d+(?:\.\d{0,2})?/)),
      B2_3: Number(this.pageParams.model2Price.toString().match(/^\d+(?:\.\d{0,2})?/)),
      B3_1: this.pageParams.model3Addr,
      B3_2: Number(this.pageParams.model3Area.toString().match(/^\d+(?:\.\d{0,2})?/)),
      B3_3: Number(this.pageParams.model3Price.toString().match(/^\d+(?:\.\d{0,2})?/)),
      B1_4_1: "",
      B2_4_1: "",
      B3_4_1: "",
      B1_5_1: "",
      B2_5_1: "",
      B3_5_1: "",
      B1_6_1: "",
      B2_6_1: "",
      B3_6_1: "",
      B1_7_1: "",
      B2_7_1: "",
      B3_7_1: "",
      B1_8_1: "",
      B2_8_1: "",
      B3_8_1: "",
      B1_9_1: "",
      B2_9_1: "",
      B3_9_1: "",
      B1_10_1: "",
      B2_10_1: "",
      B3_10_1: "",
      B1_11_1: "",
      B2_11_1: "",
      B3_11_1: "",
      B1_12_1: "",
      B2_12_1: "",
      B3_12_1: "",
      B1_13_1: "",
      B2_13_1: "",
      B3_13_1: "",
      B1_14_1: "",
      B2_14_1: "",
      B3_14_1: "",
      B1_15_1: "",
      B2_15_1: "",
      B3_15_1: "",
      B1_16: "",
      B1_17: "",
      B2_16: "",
      B2_17: "",
      B3_16: "",
      B3_17: "",
      evalResult: "",
      weight01: null,
      weight02: null,
      weight03: null,
      weight04: null,
      weight05: null,
      weight06: null,
      weight07: null,
      weight08: null,
      weight09: null,
      weight10: null,
      weight11: null,
      weight12: null,
      options: [{ key: "", value: "请选择" }, { key: "100", value: "与待估样品相当" }, { key: "105", value: "优于待估样品" }, { key: "95", value: "劣于待估样品" }, { key: "90", value: "远劣于待估样品" }, { key: "110", value: "远优于待估样品" }]
    };
  },
  mounted() {
    this.AfterInit();
  },

  methods: {
    AfterInit() {
      //填充权重
      this.marketWeightSet();
    },
    marketWeightSet() {
      let pk = "WT000001";
      this.$request({
        async: false,
        url: this.$backend.cmisEval + "/api/guarevalmarketweightset/" + pk,
        method: "GET",
        success: (response, status, xhr) => {
          if (response.data != null) {
            rsParam["data"] = response.data;
            this.weight01 = ((response.data.areaBusy * 10000) / 100).toFixed(2) + "%";
            this.weight02 = ((response.data.traffic * 10000) / 100).toFixed(2) + "%";
            this.weight03 = ((response.data.environ * 10000) / 100).toFixed(2) + "%";
            this.weight04 = ((response.data.publics * 10000) / 100).toFixed(2) + "%";
            this.weight05 = ((response.data.buildingCase * 10000) / 100).toFixed(2) + "%";
            this.weight06 = ((response.data.orientCase * 10000) / 100).toFixed(2) + "%";
            this.weight07 = ((response.data.fitment * 10000) / 100).toFixed(2) + "%";
            this.weight08 = ((response.data.equip * 10000) / 100).toFixed(2) + "%";
            this.weight09 = ((response.data.property * 10000) / 100).toFixed(2) + "%";
            this.weight10 = ((response.data.projects * 10000) / 100).toFixed(2) + "%";
            this.weight11 = ((response.data.remainyear * 10000) / 100).toFixed(2) + "%";
            this.weight12 = ((response.data.poltratio * 10000) / 100).toFixed(2) + "%";
          }
        },
        error: (result, status, errorThrown) => {
          this.$message.error(result);
        }
      });
    },
    //上一步
    doingLast2() {
      this.$dialog.close(this.dialogId);
    },
    doConfirm() {
      let param = {};
      param.closeFlag = "closeTwo";
      this.$dialog.close(this.dialogId, param);
    },
    //估值
    doEval() {
      let rsPars = {};
      // 面积
      rsPars["area"] = this.pageParams.modelArea;
      // 单价
      rsPars["a3"] = this.pageParams.model1Price;
      rsPars["b3"] = this.pageParams.model2Price;
      rsPars["c3"] = this.pageParams.model3Price;

      // 权重
      rsPars["areaBusy"] = rsParam.data.areaBusy;
      rsPars["traffic"] = rsParam.data.traffic;
      rsPars["environ"] = rsParam.data.environ;
      rsPars["publics"] = rsParam.data.publics;
      rsPars["building"] = rsParam.data.buildingCase;
      rsPars["orient"] = rsParam.data.orientCase;
      rsPars["fitment"] = rsParam.data.fitment;
      rsPars["equip"] = rsParam.data.equip;
      rsPars["property"] = rsParam.data.property;
      rsPars["projects"] = rsParam.data.projects;
      rsPars["remainyear"] = rsParam.data.remainyear;
      rsPars["poltratio"] = rsParam.data.poltratio;

      // 对比实例一
      rsPars["a4"] = this.B1_4_1;
      rsPars["a5"] = this.B1_5_1;
      rsPars["a6"] = this.B1_6_1;
      rsPars["a7"] = this.B1_7_1;
      rsPars["a8"] = this.B1_8_1;
      rsPars["a9"] = this.B1_9_1;
      rsPars["a10"] = this.B1_10_1;
      rsPars["a11"] = this.B1_11_1;
      rsPars["a12"] = this.B1_12_1;
      rsPars["a13"] = this.B1_13_1;
      rsPars["a14"] = this.B1_14_1;
      rsPars["a15"] = this.B1_15_1;

      // 对比实例二
      rsPars["b4"] = this.B2_4_1;
      rsPars["b5"] = this.B2_5_1;
      rsPars["b6"] = this.B2_6_1;
      rsPars["b7"] = this.B2_7_1;
      rsPars["b8"] = this.B2_8_1;
      rsPars["b9"] = this.B2_9_1;
      rsPars["b10"] = this.B2_10_1;
      rsPars["b11"] = this.B2_11_1;
      rsPars["b12"] = this.B2_12_1;
      rsPars["b13"] = this.B2_13_1;
      rsPars["b14"] = this.B2_14_1;
      rsPars["b15"] = this.B2_15_1;

      // 对比实例三
      rsPars["c4"] = this.B3_4_1;
      rsPars["c5"] = this.B3_5_1;
      rsPars["c6"] = this.B3_6_1;
      rsPars["c7"] = this.B3_7_1;
      rsPars["c8"] = this.B3_8_1;
      rsPars["c9"] = this.B3_9_1;
      rsPars["c10"] = this.B3_10_1;
      rsPars["c11"] = this.B3_11_1;
      rsPars["c12"] = this.B3_12_1;
      rsPars["c13"] = this.B3_13_1;
      rsPars["c14"] = this.B3_14_1;
      rsPars["c15"] = this.B3_15_1;
      //调用接口
      this.$request({
        async: false,
        url: this.$backend.cmisEval + "/api/evaluate/houseEvalModelResult",
        method: "POST",
        data: JSON.stringify(rsPars),
        success: (response, status, xhr) => {
          if (response.data != null) {
            this.B1_16 = response.data.a16;
            this.B1_17 = response.data.a17;
            this.B2_16 = response.data.b16;
            this.B2_17 = response.data.b17;
            this.B3_16 = response.data.c16;
            this.B3_17 = response.data.c17;
            this.evalResult = response.data.result;

            this.$gemit("compare_to_market_4_house_result_event", this.evalResult);
          }
        },
        error: (result, status, errorThrown) => {
          this.$message.error(result);
        }
      });
    }
  }
};
</script>
