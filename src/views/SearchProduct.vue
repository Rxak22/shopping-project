<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import ItemCard from '@/components/itemCard.vue'
import LoadingLog from '@/components/loadingLog.vue'

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

const route = useRoute()
const result = ref<Product[]>([])
const loading = ref(false)

const fetchResults = async (q: string) => {
    if (!q) return

    loading.value = true
    try {
        const res = await axios.get(`https://api.escuelajs.co/api/v1/products/?title=${q}`)
        result.value = res.data
    } catch (err) {
        console.log("Fetching Error...", err)
    } finally {
        loading.value = false
    }
}

onMounted(() => fetchResults(route.query.q as string))

watch(() => route.query.q, (newQ) => {
    fetchResults(newQ as string)
})
</script>

<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">{{ result.length > 0 ? "Search Result" : "Search Not Found 😂" }}</h1>
        <LoadingLog v-if="loading" :loading="loading" />
        <ItemCard v-else :products="result" />
    </div>
</template>