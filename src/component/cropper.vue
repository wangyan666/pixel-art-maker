<template>
    <ImgCutter v-on:cutDown="cutDown" :rate="ratio"></ImgCutter>
  </template>
  <script setup lang="ts">
  import { computed } from '@vue/runtime-dom';
  import ImgCutter from 'vue-img-cutter'
  import { usePixelate } from '../hooks/usePixelate';
  const props = defineProps({
    width: {
      type: Number,
      default: 320,
    },
    height: {
      type: Number,
      default: 320,
    },
    size: {
      type: Number,
      default: 10,
    },
  })
  
  
  const cutDown = (e) => {
    document.querySelectorAll('canvas').forEach(dom => dom.remove())
    const img = new Image()
    img.src = e.dataURL
  
    img.onload = () => {
      const { element } = usePixelate(img, { width: props.width, height: props.height, size: props.size })
      document.body.appendChild(element)
    }
  }
  
  /** 获取最大公因数 */
  const getCommonFactor = (x, y) => {
    while (y !== 0) {
      [x, y] = [y, x % y]
    }
    return x
  }
  
  const commonFactor = computed(() => getCommonFactor(props.width, props.height))
  
  const ratio = computed(() => `${props.width / commonFactor.value}:${props.height/ commonFactor.value}`)
  </script>
  
  