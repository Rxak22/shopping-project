<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

interface Product {
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

const props = defineProps<{
  products: Product[]
}>()

const router = useRouter()
const handleOpenProductDetail = (id: number, pid: number) => {
  router.push({ name: 'details', params: { id: id, pid: pid } })
} 
</script>

<template>
  <div class="container mx-auto flex flex-wrap gap-3 mt-2 cursor-pointer">
    <div class="w-[24%] shadow-md shadow-gray-400 hover:shadow-gray-600" v-for="(item, index) in props.products"
      @click="handleOpenProductDetail(item.category.id, item.id)" :key="index">
      <img class="object-cover w-full h-[245.58px]" :src="item.images" />
      <div class="p-2">
        <h4 class="text-lg font-semibold">{{ item.title }}</h4>
        <p class="line-clamp-2">{{ item.description }}</p>
        <span class="w-full mt-1 text-end text-red-500 float-end font-semibold mb-1">price: {{ item.price }}</span>
      </div>
    </div>
  </div>
</template>
