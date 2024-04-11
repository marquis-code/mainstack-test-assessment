<template>
    <div class="relative" @click.outside="closeDropdown">
      <input
        readonly
        type="text"
        class="form-input px-4 py-2 border border-gray-300 rounded"
        :value="selectedItems.join(', ')"
        @click="toggleDropdown"
      />
      <div v-if="isOpen" class="absolute z-10 w-full bg-white border border-gray-200 mt-1 rounded shadow">
        <div v-for="item in items" :key="item.id" class="flex items-center p-2 hover:bg-gray-100">
          <input
            type="checkbox"
            :value="item"
            v-model="checkedItems"
            @change="updateSelectedItems"
            class="form-checkbox"
          />
          <span class="ml-2">{{ item.name }}</span>
        </div>
      </div>
      <div v-if="selectedItems.length > 0" class="mt-2 flex flex-wrap">
        <div
          v-for="(item, index) in selectedItems"
          :key="index"
          class="flex items-center bg-blue-100 text-blue-800 m-1 px-2 py-1 rounded"
        >
          {{ item }}
          <button @click="removeItem(item)" class="ml-2 text-red-500 hover:text-red-700">&times;</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">  
  const isOpen = ref(false);
  const checkedItems = ref([]) as any;
  const selectedItems = ref([]) as any;
  
  const items = ref([
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
    // Add more items as needed
  ]);
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
  
  const closeDropdown = () => {
    isOpen.value = false;
  };
  
  const updateSelectedItems = () => {
    selectedItems.value = checkedItems.value.map((item: any) => item.name);
  };
  
  const removeItem = (itemName: any) => {
    const index = selectedItems.value.indexOf(itemName);
    if (index > -1) {
      selectedItems.value.splice(index, 1);
      const itemToRemove = items.value.find((item: any) => item.name === itemName);
      const checkedIndex = checkedItems.value.indexOf(itemToRemove);
      if (checkedIndex > -1) {
        checkedItems.value.splice(checkedIndex, 1);
      }
    }
  };
  
  watch(selectedItems, (newVal: any, oldVal: any) => {
    if (newVal.length < oldVal.length) {
      checkedItems.value = items.value.filter((item: any) => selectedItems.value.includes(item.name));
    }
  });
  
  </script>
  
  <style scoped>
  .form-input:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 1px #4299e1;
  }
  .form-checkbox {
    border-color: #4299e1;
  }
  </style>
  