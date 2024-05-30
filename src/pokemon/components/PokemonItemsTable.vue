<template>
  <div 
    class="table-wrapper"
    :class="{'table-wrapper--fetching': isFetching}"
  >
    <AppTable
      :items="items"
      :headerColumns="headerColumns"
      :sortField="sortField"
      @select-item="$emit('select-item', $event)"
      @sort-table="onSortTable"
    >
      <template v-slot:name="{ item }">
        <div class="pokemon-name">
          {{ item.name }}
        </div>
      </template>
      <template v-slot:id="{ item }">
        {{ item.id }}
      </template>
      <template v-slot:number="{ item }">
        {{ item.number }}
      </template>
      <template v-slot:created_at="{ item }">
        {{ formatDate(item.created_at) }}
      </template>
      <template v-slot:updated_at="{ item }">
        {{ formatDate(item.updated_at) }}
      </template>
      <template v-slot:total="{ item }">
        {{ item.total }}
      </template>
      <template v-slot:hp="{ item }">
        <div class="pokemon-hp">
          {{ item.hp }}
        </div>
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
    <AppLoading class="loading" v-if="isFetching" />
  </div>
</template>

<script lang="ts">
import { formatDate } from '@/common/date';
import AppLoading from '@/components/AppLoading.vue';
import AppTable, { HeaderColumns, SortField } from '@/components/AppTable.vue';
import { PropType, SetupContext } from 'vue';

export default {
  components: {
    AppTable,
    AppLoading,
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
    isFetching: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['sort-item', 'select-item'],
  setup(props: any, { emit }: SetupContext) {
    const headerColumns: HeaderColumns[] = [
      {
        field: 'name',
        header: 'Name',
      },
      {
        field: 'id',
        header: 'ID',
        width: 200,
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
      formatDate,
    }
  }
}
</script>

<style lang="scss" scoped>
.table-wrapper {
  overflow: auto;
  max-height: 100%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 4px;
  position: relative;
  &--fetching {
    pointer-events: none;
  }
  .pokemon-name {
    font-weight: bold;
    font-style: italic;
  }
  .pokemon-hp {
    color: red;
  }
  .loading {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(black, 0.2);
  }
}
</style>