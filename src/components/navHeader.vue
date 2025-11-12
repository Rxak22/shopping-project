<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Categories {
    id: number
    name: string
    images: string
}
const props = defineProps<{
    categories: Categories[],
    loading: boolean
}>()

const searchQuery = ref("")

const route = useRoute()
const router = useRouter()

const isActiveCategory = (id: number) => {
    return route.params.id === String(id)
}

const handleSearchProduct = () => {
    if (!searchQuery.value.trim()) return

    try {
        router.push({ name: 'search', query: { q: searchQuery.value } })
    } catch (err) {
        console.log("Search Error...", err)
    }
}

</script>

<template>
    <div class="w-full mx-auto bg-slate-900">
        <div class="container mx-auto flex justify-between">
            <ul class="flex text-slate-50 font-semibold">
                <li>
                    <RouterLink class="block p-4 cursor-pointer"
                        :class="{ 'font-bold bg-green-900': route.path === '/' }" to="/">
                        <i class="fa-solid fa-house"></i>
                    </RouterLink>
                </li>
                <li v-if="props.loading">
                    <h1 class="p-4 text-slate-400">Loading...</h1>
                </li>
                <li v-else v-for="cat in props.categories" :key="cat.id">
                    <RouterLink class="block p-4 cursor-pointer" :to="{ name: 'categories', params: { id: cat.id } }"
                        :class="{ 'bg-green-900': isActiveCategory(cat.id) }">
                        {{ cat.name }}
                    </RouterLink>
                </li>
            </ul>
            <div class="flex items-center">
                <div v-if="!props.loading">
                    <input type="text" v-model="searchQuery" placeholder="Search..."
                        class="text-slate-300 outline-0 rounded-md text-sm border-b border-b-amber-600 border-t border-t-amber-600 mr-2 px-2 py-1"
                        @keyup.enter="handleSearchProduct" />
                    <i @click="handleSearchProduct"
                        class="fa-solid drop-shadow hover:drop-shadow-blue-500 fa-magnifying-glass text-slate-300 cursor-pointer"></i>
                </div>
            </div>
        </div>
    </div>
</template>
