<template>
  <div style="padding: 10px;text-align: left;">
    <test></test>
    <test></test>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="ruleForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name">
          <div slot="append" class="slot">
            <span>:</span>
            <el-form-item prop="port">
              <el-input v-model="ruleForm.port"></el-input>
            </el-form-item>
          </div>
        </el-input>
      </el-form-item>
      <el-form-item label="活动地点" prop="cityIds">
        <el-select-mul ref="elSelMul" :sourceData="sourceData" sourcePlaceholder="城市多选" :sourceWidth="300" :defaultProps="defaultProps" v-model="ruleForm.cityIds">

        </el-select-mul>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域" clearable>
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" :picker-options="pickerOptions" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
  import ElSelectMul from '@/components/ElSelectMul'
  import axios from 'axios'
  import test from './test'
  export default {
    components: {
      ElSelectMul,
      test
    },
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
          },
        },
        sourceData: [
          {cityId: 1,cityName: '广州'},
          {cityId: 2,cityName: '深圳'},
          {cityId: 3,cityName: '上海'},
        ],
        defaultProps: {
          id: 'cityId',
          name: 'cityName'
        },
        ruleForm: {
          mobile: '',
          name: '',
          region: '',
          date1: new Date(),
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          port: '',
          cityIds: []
        },
        rules: {
          mobile: [
            { required: true, message: '值不能为空', trigger: 'blur' },
            { validator: (rule, value, callback) => {
              if (value === '') { //! 其实有 required: true 就不需要这个了
                callback(new Error('值不能为空'));
              } else {
                const PhoneReg = /(^1[3|4|5|7|8][0-9]\d{8}$)/
                if (PhoneReg.test(value)) {
                  callback();
                } else {
                  callback(new Error('请输入正确的手机号码'));
                }
                //this.$refs.ruleForm.validateField('name'); // !主动校验某个字段
              }
            }, trigger: 'blur' }
          ],
          port: [
            { required: true, message: '请输入端口', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' },
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' },
            { validator: (rule, value, callback) => {
              console.log(value)
              if (value) {
                let timestamp = new Date().getTime()// 当前的时间戳
                timestamp = timestamp - 2 * 60 * 60 * 1000
                if (value < timestamp) {
                  callback(new Error('不能选择当前时间2个小时之前的时间'))
                } else {
                  callback()
                }
              } else {
                callback()
              }
            }, trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ],
          cityIds: [
            { required: true, message: '请选择活动地点', trigger: 'change' }
          ],
        }
      };
    },
    created() {
      setTimeout(() => {
        this.ruleForm.cityIds = [1]
        this.$refs.ruleForm.validateField('region');
      }, 500)
      console.log('created father')
    },
    mounted() {
      console.log('mounted father')
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>


<style lang="scss">
  .slot{
    display: flex;width: 100px;align-items: center;
    span{width: 30px;height: 38px;line-height: 38px;border-top:1px solid #DCDFE6;border-bottom:1px solid #DCDFE6;text-align: center;background: #ccc;}
  }
  .el-input-group__append{
    background-color: transparent;
    border: none;
    padding: 0px;
    .el-input__inner{
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .el-form-item.is-error .el-input-group__append .el-input__inner,.el-form-item.is-success .el-input-group__append .el-input__inner{
    border-color: #DCDFE6;
  }
  .el-form-item .el-input-group__append .el-form-item.is-error .el-input__inner{
    border-color: #F56C6C;
  }
  .el-form-item .el-input-group__append .el-form-item.is-success .el-input__inner{
    border-color: #67C23A;
  }
</style>