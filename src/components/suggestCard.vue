<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
interface Products {
  id: number
  title: string
  price: number
  description: string
  images: string
  category: {
    id: number
    name: string
    image: string
  }
}
defineProps<{
  product: Products
}>()

const emit = defineEmits<{
  (e: 'openDetail', id: number): void
}>()
</script>

<template>
  <div class="w-[32%] shadow-md cursor-pointer" @click="emit('openDetail', product.id)">
    <img class="w-full" :src="product.images" alt="" />
    <p class="text-sm">{{ product.title }}</p>
    <p class="text-red-500 text-sm font-semibold">${{ product.price }}</p>
  </div>
</template>
