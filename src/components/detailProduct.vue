<script setup lang="ts">
import axios from 'axios'
import { ref, onBeforeMount, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import SuggestCard from './suggestCard.vue'
import LoadingLog from './loadingLog.vue'
import { useHead } from '@vueuse/head'

const route = useRoute()

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
  pid: string
}>()

const loadingDetail = ref(false)
const loadingSuggest = ref(false)

const suggestData = ref<Product[]>([])
const data = ref<Product | null>(null)
onBeforeMount(async () => {
  try {
    loadingDetail.value = true
    loadingSuggest.value = true
    const res = await axios.get<Product>(`https://api.escuelajs.co/api/v1/products/${props.pid}`)
    data.value = res.data
  } catch (err) {
    console.log('Fetching Error...', err)
  } finally {
    loadingDetail.value = false
  }

  try {
    // get suggest data by item category id
    const catId = data.value?.category.id
    const suggestRes = await axios.get<Product[]>(
      `https://api.escuelajs.co/api/v1/products/?offset=0&limit=20&categoryId=${catId}`,
    )
    suggestData.value = suggestRes.data
  } catch (err) {
    console.log('Fetching Error...', err)
  } finally {
    loadingSuggest.value = false
  }
})

const fetchProduct = async (id: number) => {
  try {
    loadingDetail.value = true
    const res = await axios.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`)
    data.value = res.data
  } catch (err) {
    console.log('Fetching Error...', err)
  } finally {
    loadingDetail.value = false
  }
}

watch(
  () => route.params.pid,
  (newId) => {
    fetchProduct(Number(newId))
  },
)

const router = useRouter()
const handleOpenProductDetail = (id: number, pid: number) => {
  router.push({ name: 'details', params: { id: id, pid: pid } })
}

useHead({
  title: computed(() => data.value?.category.name ?? 'Loading...'),
})
</script>

<template>
  <div class="container mx-auto mt-3 flex">
    <div class="w-[67%] pe-5 relative">
      <LoadingLog :loading="loadingDetail" />
      <h1 class="text-4xl font-bold">{{ data?.title }}</h1>
      <img class="w-full h-[500px] mt-5" :src="data?.images" alt="" />
      <p>{{ data?.description }}</p>

      <button class="px-3 py-1 bg-amber-500 rounded-sm mt-3 text-slate-50 cursor-pointer">
        Add to Card
      </button>
      <button class="px-3 py-1 bg-amber-600 rounded-sm ml-2 mt-3 text-slate-50 cursor-pointer">
        But Now
      </button>
      <button></button>
    </div>
    <div class="w-[33%] h-auto">
      <h1 class="text-2xl text-slate-500 font-semibold">Recomment Product</h1>
      <div class="w-full flex flex-wrap gap-1 mt-2 relative" :class="loadingSuggest ? 'h-[85vh]' : 'h-auto'">
        <LoadingLog :loading="loadingSuggest" />
        <SuggestCard v-for="(product, index) in suggestData" :key="index" :product="product"
          @open-detail="handleOpenProductDetail(product.category.id, product.id)" />
      </div>
    </div>
  </div>
</template>
