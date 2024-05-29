<template>
  <AppTable
    class="pokemon-table"
    :items="items"
    :headerColumns="headerColumns"
    :sortField="sortField"
    @select-item="$emit('select-item', $event)"
    @sort-table="onSortTable"
  >
    <template v-slot:id="{ item }">
      {{ item.id }}
    </template>
    <template v-slot:number="{ item }">
      {{ item.number }}
    </template>
    <template v-slot:created_at="{ item }">
      {{ item.created_at }}
    </template>
    <template v-slot:updated_at="{ item }">
      {{ item.updated_at }}
    </template>
    <template v-slot:total="{ item }">
      {{ item.total }}
    </template>
    <template v-slot:hp="{ item }">
      {{ item.hp }}
    </template>
    <template v-slot:attack="{ item }">
      {{ item.attack }}
    </template>
    <template v-slot:defense="{ item }">
      {{ item.defense }}
    </template>
    <template v-slot:sp_atk="{ item }">
      {{ item.sp_atk }}
    </template>
    <template v-slot:sp_def="{ item }">
      {{ item.sp_def }}
    </template>
    <template v-slot:speed="{ item }">
      {{ item.speed }}
    </template>
  </AppTable>
</template>

<script lang="ts">
import AppTable, { HeaderColumns, SortField } from '@/components/AppTable.vue';
import { PropType, SetupContext, ref } from 'vue';

export default {
  components: {
    AppTable,
  },
  props: {
    items: {
      type: Array as PropType<Record<any, any>>,
      default: () => ([]),
    },
    sortField: {
      type: Object as PropType<SortField>,
      default: () => undefined,
    },
  },
  emits: ['sort-item', 'select-item'],
  setup(props: any, { emit }: SetupContext) {
    const headerColumns: HeaderColumns[] = [
      {
        field: 'id',
        header: 'ID',
        width: 100,
      },
      {
        field: 'number',
        header: 'Number',
        width: 100,
        sortable: true,
      },
      {
        field: 'created_at',
        header: 'Created At',
        sortable: true,
      },
      {
        field: 'updated_at',
        header: 'Updated At',
        sortable: true,
      },
      {
        field: 'total',
        header: 'Total',
        sortable: true,
      },
      {
        field: 'hp',
        header: 'HP',
        sortable: true,
      },
      {
        field: 'attack',
        header: 'Attack',
        sortable: true,
      },
      {
        field: 'defense',
        header: 'Defense',
        sortable: true,
      },
      {
        field: 'sp_atk',
        header: 'Special Attack',
        sortable: true,
      },
      {
        field: 'sp_def',
        header: 'Special Defense',
        sortable: true,
      },
      {
        field: 'speed',
        header: 'Speed',
        sortable: true,
      },
    ];

    const onSortTable = (data: any) => {
      if (props.sortField?.field === data.field) {
        emit('sort-item', {
          field: data.field,
          orderSort: (props.sortField.orderSort === 'asc') ? 'desc' : 'asc',
        });
        return;
      }
      emit('sort-item', {
        field: data.field,
        orderSort: data.orderSort,
      });
    }

    return {
      headerColumns,

      onSortTable,
    }
  }
}
</script>

<style lang="scss" scoped>
</style>