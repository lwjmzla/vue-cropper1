<template>
  <div class="div1" style="" ref="cropper">
    <div class="div2"
        :style="{
					'width': trueWidth + 'px',
					'height': trueHeight + 'px',
					'transform': 'scale(' + scale + ',' + scale + ') ' + 'translate3d('+ x / scale + 'px,' + y / scale + 'px,' + '0)'
					}"
      >
        <img :src="imgs" alt="cropper-img" ref="cropperImg">
      </div>
  </div>
</template>

<script>
 export default {
   data(){
     return {
      num: 0,
      imgs: 'https://img01.kanghehealth.com/static/images/60/5e/65/33/1a49ce2ac8e64c178f021ef70bea3c54.png',
      trueWidth: '',
      trueHeight: '',
      scale: '',
      x: '',
      y: ''
    }
   },
   components: {

   },
   created() {
      console.log('created son')
    },
    mounted() {
      let img = new Image();
      img.src = this.imgs; // !这是canvas画出来的图，不是原图  宽高最大2000
      img.onload = () => {
        this.w = parseFloat(window.getComputedStyle(this.$refs.cropper).width);
        this.h = parseFloat(window.getComputedStyle(this.$refs.cropper).height);

        // 存入图片真实高度
        this.trueWidth = img.width;
        this.trueHeight = img.height;
        let scale
        if (this.trueWidth > this.w) {
          // 如果图片宽度大于容器宽度
          scale = this.w / this.trueWidth;  // !这里意味着   this.trueWidth * scale  === this.w   意味铺满 容器宽  part1
        }

        if (this.trueHeight * scale > this.h) { // ! 这里一般是大于的  part2
          scale = this.h / this.trueHeight;
        }
        this.scale = scale
        console.log(-(this.trueWidth - this.trueWidth * this.scale) / 2) // !因为有part2的计算  this.trueWidth * this.scale得到的值不是容器宽，比容器宽小
        console.log((this.w - this.trueWidth * this.scale) / 2)
        this.x = -(this.trueWidth - this.trueWidth * this.scale) / 2 +(this.w - this.trueWidth * this.scale) / 2;
        this.y = -(this.trueHeight - this.trueHeight * this.scale) / 2 +(this.h - this.trueHeight * this.scale) / 2;
      }
    },
 }
</script>

<style lang='scss' scoped>
  .div1{
    width: 800px;height: 400px;border: 1px deepskyblue solid;position: relative;
  }
  .div2{
    position: absolute;
    top: 0;left: 0;right: 0;bottom: 0;
  }
</style>
