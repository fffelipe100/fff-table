<template>
  <div class="home">
    <FTable :sofier="sofier" :columns="columns" />
  </div>
</template>

<script>
// @ is an alias to /src
import FTable from "@/components/FTable.vue";

export default {
  name: "home",
  components: {
    List
  },
  data() {
    return {
      sofier: {
        count: null,
        data: null,
        page: null,
        pages: null,
        total: null,
        last_key: null
      },
      columns: [
        /*{ id: "name", name: "ID", visible: false },*/
        { id: "company", name: "Parceiro", visible_column: true },
        {
          id: "status.last_sofier",
          name: "Sofier",
          visible_column: false,
          visible_search: true
        },
        {
          id: "original.NOME_FANTASIA",
          name: "Nome fantasia",
          visible_column: true
        },
        { id: "original.NU_SO_EC", name: "EC", visible_column: true },
        {
          id: "status.state",
          name: "Status",
          visible_column: true
        },
        { id: "original.UF", name: "Estado", visible_column: true },
        { id: "address.city", name: "Cidade", visible_column: true },
        {
          id: "task.category",
          name: "Categoria",
          visible_column: false,
          render: this.teste
        },
        { id: "task.name", name: "Nome", visible_column: true }
      ]
    };
  }
};
</script>
