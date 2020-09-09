<template>
  <div id="app">
    <vueCropper
      ref="cropper"
      :img="option.img"
      :outputSize="option.outputSize"
      :outputType="option.outputType"
      :info="true"
      :full="option.full"
      :canMove="option.canMove"
      :canMoveBox="option.canMoveBox"
      :fixedBox="option.fixedBox"
      :original="option.original"
      :autoCrop="option.autoCrop"
      :autoCropWidth="option.autoCropWidth"
      :autoCropHeight="option.autoCropHeight"
      :centerBox="option.centerBox"
      :high="option.high"
      :infoTrue="option.infoTrue"
      @realTime="realTime"
      @imgLoad="imgLoad"
      @cropMoving="cropMoving"
      :enlarge="option.enlarge"
    ></vueCropper>
    <el-button @click="handleCrop">裁切</el-button>
    <img :src="imgUrl" />
  </div>
</template>

<script>
import vueCropper from '@/components/vue-cropper.vue' 
export default {
  name: 'cropper',
  components: {
    vueCropper
  },
  data() {
    return {
      imgUrl: '',
      option: {
        img:'https://img01.kanghehealth.com/static/images/60/5e/65/33/1a49ce2ac8e64c178f021ef70bea3c54.png',
        // img:'https://img01.kanghehealth.com/static/images/bf/fd/c9/c8/d0710cea54d04bd7a6ed599d6291d6db.jpg',
        //img: 'https://img01.kanghehealth.com/static/images/4c/a3/08/83/63b5a0d0eb3a4f518a7675fc440a1628.png',
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        // canScale: false, // 图片是否允许滚轮缩放
        autoCrop: false, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        // fixed: true, // 是否开启截图框宽高固定比例
        // fixedNumber: [7, 5], // 截图框的宽高比例
        full: false, // 是否输出原图比例的截图
        canMove: true, // 上传图片是否可以移动
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染 //!用false 相当于 自适应显示contain效果
        centerBox: false, // 截图框是否被限制在图片里面 
        infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        high: false, // !是否按照设备的dpr 输出等高清图片
        enlarge: 1 // !图片根据截图框输出比例倍数
      }
    }
  },
  created () {
  },
  methods: {
    realTime() {
      
    },
    imgLoad() {

    },
    cropMoving(){

    },
    handleCrop() {
      // 获取截图的base64 数据
      this.$refs.cropper.getCropData((data) => {
        // do something
        console.log(data)
        this.imgUrl = data
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  #app{
    height: 500px;
  }
</style>

