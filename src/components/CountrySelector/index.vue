<!--
 * @Description: 
 * @Author: Ian
 * @Date: 2023-09-15 15:37:45
 * @LastEditTime: 2023-09-16 14:04:00
 * @LastEditors: Ian
-->
<template>
  <Dropdown
    v-model="selectedCountry"
    :options="currencyList"
    optionLabel="name"
    placeholder="Select a Country"
    class="countrySelector w-full"
  >
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex align-items-center">
        <img
          :alt="slotProps.value.label"
          src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
          :class="`mr-2 flag flag-${slotProps.value.code
            .slice(0, -1)
            .toLowerCase()}`"
          style="width: 24px"
        />
        <div>{{ slotProps.value.name }}</div>
      </div>
      <span v-else>
        {{ slotProps.placeholder }}
      </span>
    </template>
    <template #option="slotProps">
      <div class="flex align-items-center">
        <img
          :alt="slotProps.option.label"
          src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
          :class="`mr-2 flag flag-${slotProps.option.code
            .slice(0, -1)
            .toLowerCase()}`"
          style="width: 24px"
        />
        <div>{{ slotProps.option.name }}</div>
      </div>
    </template>
  </Dropdown>
</template>

<script>
import { ref, computed, watch, inject } from "vue";

export default {
  name: "Converter",
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const selectedCountry = ref(null);
    const store = inject("store");
    const currencyList = computed(() => store.state.currencyList);

    // Watch the currencyList property in the store
    watch(
      () => store.state.currencyList,
      (newValue) => {
        currencyList.value = newValue; // Update currencyList with the new value from the store
      }
    );

    watch(selectedCountry, (newVal) => {
      context.emit("update:modelValue", newVal);
    });

    return {
      selectedCountry,
      currencyList,
    };
  },
};
</script>

<style lang="scss" scoped></style>
