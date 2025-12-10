<script setup lang="ts">
import { useCart } from '@/stores/cart'

defineProps<{
    isOpen: boolean
}>()

const emit = defineEmits<{
    close: []
}>()

const { items, totalPrice, removeItem, updateQuantity, clearCart } = useCart()

const handleCheckout = () => {
    if (items.value.length > 0) {
        alert('Proceeding to checkout with ' + items.value.length + ' item(s)')
        // You can add actual checkout logic here
    }
}
</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black opacity-50" @click="emit('close')"></div>

        <!-- Modal -->
        <div class="relative bg-white rounded-lg shadow-lg w-full max-w-md max-h-screen flex flex-col">
            <!-- Header -->
            <div class="flex justify-between items-center p-4 border-b">
                <h2 class="text-xl font-semibold">Shopping Cart</h2>
                <button @click="emit('close')" class="text-gray-500 hover:text-gray-700">
                    <i class="fa-solid fa-times text-2xl"></i>
                </button>
            </div>

            <!-- Items -->
            <div class="flex-1 overflow-y-auto p-4">
                <div v-if="items.length === 0" class="text-center text-gray-500 py-8">
                    <i class="fa-solid fa-shopping-cart text-4xl mb-4 block opacity-50"></i>
                    <p>Your cart is empty</p>
                </div>

                <div v-else class="space-y-4">
                    <div v-for="item in items" :key="item.id" class="flex gap-3 border-b pb-4">
                        <!-- Image -->
                        <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded" />

                        <!-- Details -->
                        <div class="flex-1">
                            <h3 class="font-semibold text-sm">{{ item.name }}</h3>
                            <p class="text-amber-600 font-semibold">${{ item.price.toFixed(2) }}</p>

                            <!-- Quantity Control -->
                            <div class="flex items-center gap-2 mt-2">
                                <button @click="updateQuantity(item.id, item.quantity - 1)"
                                    class="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm">
                                    -
                                </button>
                                <span class="w-6 text-center">{{ item.quantity }}</span>
                                <button @click="updateQuantity(item.id, item.quantity + 1)"
                                    class="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm">
                                    +
                                </button>
                                <button @click="removeItem(item.id)"
                                    class="ml-auto text-red-500 hover:text-red-700 text-sm">
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div v-if="items.length > 0" class="border-t p-4 space-y-3">
                <div class="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span class="text-amber-600">${{ totalPrice }}</span>
                </div>
                <button @click="handleCheckout"
                    class="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded">
                    Checkout
                </button>
                <button @click="clearCart"
                    class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded">
                    Clear Cart
                </button>
            </div>
        </div>
    </div>
</template>
