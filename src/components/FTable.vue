<template>
  <div>
    <div class="row">
      <!--Entradas-->
      <div class="col-sm-4 col-md-3">
        <div class="dataTables_length bs-select" id="dtBasicExample_length">
          <label class="float-left">
            <font style="vertical-align: inherit;">
              <font style="vertical-align: inherit;">Entradas</font>
            </font>
            <select
              name="dtBasicExample_length"
              aria-controls="dtBasicExample"
              class="custom-select custom-select-sm form-control form-control-sm mt-2"
              v-model="entrada"
            >
              <option
                v-for="option in options"
                :key="option.id"
                :value="option.value"
              >
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">{{
                    option.text
                  }}</font>
                </font>
              </option>
            </select>
          </label>
          <div class="float-left pl-1" style="padding-top: 35px;">
            <i @click="paginas" class="fas fa-sync-alt"></i>
          </div>
        </div>
      </div>
      <!--Search-->
      <div class="col-sm-4 col-md-6">
        <div class="input-group mt-4">
          <div class="input-group-prepend">
            <button
              class="form-control-sm btn btn-md btn-outline-dark m-0 px-3 py-2 z-depth-0 waves-effect dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style="height:31px;"
            ></button>
            <div class="dropdown-menu">
              <div
                v-for="column in columns"
                v-show="column.visible_search"
                :key="column.id"
                class="m-3"
              >
                <label for="form1">{{ column.name }}</label>
                <input :id="column.id" type="text" class="form-control" />
              </div>

              <div class="m-3">
                <button
                  class="form-control-sm btn btn-md btn-outline-danger p-2 float-right"
                  type="button"
                  @click="clean"
                >
                  Limpar
                </button>
                <button
                  class="form-control-sm btn btn-md btn-outline-primary p-2 float-right"
                  type="button"
                  @click="filters"
                >
                  BUSCAR
                </button>
              </div>
            </div>
          </div>
          <input
            class="form-control form-control-sm"
            type="text"
            placeholder="Pesquisar"
            aria-label="Search"
            v-model="pesquisa"
          />
          <div class="input-group-prepend">
            <button
              class="form-control-sm btn btn-md btn-outline-dark m-0 px-3 py-2 z-depth-0 waves-effect"
              type="button"
              id="button-addon1"
              style="height:31px;"
              @click="localizar"
            >
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      <!--Paginação-->
      <div class="col-sm-4 col-md-3 mt-4">
        <div
          class="dataTables_paginate paging_simple_numbers"
          id="dtBasicExample_paginate"
        >
          <ul class="pagination">
            <li
              class="paginate_button page-item previous"
              id="dtBasicExample_previous"
            >
              <a
                aria-controls="dtBasicExample"
                data-dt-idx="0"
                tabindex="0"
                class="page-link"
                @click="pagreturn"
              >
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">
                    <i class="fas fa-chevron-left"></i>
                    <span class="mx-2">Voltar</span>
                  </font>
                </font>
              </a>
            </li>
            <li class="paginate_button page-item next" id="dtBasicExample_next">
              <a
                aria-controls="dtBasicExample"
                data-dt-idx="7"
                tabindex="0"
                class="page-link"
                @click="advance"
              >
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">
                    <span class="mx-2">Avançar</span>
                    <i class="fas fa-chevron-right"></i>
                  </font>
                </font>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--Cabeçalho da tabela-->
    <section class="row">
      <div class="col-12">
        <table
          class="table table-responsive-sm table-striped table-bordered table-sm"
          cellspacing="0"
          width="100%"
        >
          <thead class="elegant-gray text-white">
            <tr>
              <th
                v-for="column in columns"
                :key="column.id"
                v-show="column.visible_column"
                class="th-sm"
              >
                {{ column.name }}
              </th>
              <th class="th-sm">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in sofier.data" :key="index">
              <th
                v-show="column.visible_column"
                v-for="column in columns"
                :key="column.id"
                class="th-sm"
              >
                {{ getvalues(item, column.id, column.render) | format }}
              </th>
              <th class="th-sm display-icon">
                <div class="text-center">
                  <a v-show="view_edit" @click="edit(index)" class="mr-2 p-1">
                    <i class="fas fa-address-card"></i>
                  </a>
                  <a
                    v-show="view_detail"
                    @click="detail(index)"
                    class="ml-1 mr-2"
                  >
                    <i class="fas fa-history"></i>
                  </a>
                  <a
                    v-show="view_excluir"
                    @click="excluir(index)"
                    class="mr-2 p-1"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </a>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <!--Linhas da tabela-->
    <div class="row">
      <div class="col-sm-12 col-md-5">
        <div
          class="dataTables_info text-left"
          id="dtBasicExample_info"
          role="status"
          aria-live="polite"
        >
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;"
              >Mostrando {{ sofier.total }} tarefas</font
            >
          </font>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "mdbootstrap/css/bootstrap.min.css";
import "mdbootstrap/css/mdb.min.css";

import moment from "moment";
export default {
  name: "FTable",
  props: {
    sofier: Object,
    columns: Array,
    when: Boolean,
    search_list: Boolean,
    view_detail: Boolean,
    view_edit: Boolean,
    view_excluir: Boolean
  },
  data() {
    return {
      entrada: "10",
      options: [
        { text: "10", value: "10" },
        { text: "25", value: "25" },
        { text: "50", value: "50" },
        { text: "100", value: "100" }
      ],
      cpf: null,
      short_name: null,
      name: null,
      email: null,
      pesquisa: []
    };
  },
  filters: {
    format: function(item) {
      if (typeof item == "string") {
        if (item.indexOf("T") == 10) {
          item = moment(item)
            .subtract("3", "hours")
            .format("DD/MM/YYYY HH:mm");
        }
      }

      return item;
    }
  },
  methods: {
    getvalues: function(item, column, render) {
      let c = column.split(".");

      let t = "";
      if (c.length > 1) {
        for (let index in c) {
          let v = item[c[index]];
          if (typeof v == "object") {
            t = this.getvalues(v, c[parseInt(index) + 1]);
          } else if (typeof v != "undefined") {
            t = v;
            break;
          }
        }
      } else {
        t = item[c[0]];
      }

      if (render) {
        t = render(t);
      }

      return t;
    },
    paginas: function() {
      let lines = this.entrada;
      this.$emit("paginas", lines);
    },
    advance: function() {
      let lines = this.entrada;
      this.$emit("advance", lines);
    },
    pagreturn: function() {
      let lines = this.entrada;
      this.$emit("pagreturn", lines);
    },
    sofierstart: function() {
      let lines = this.entrada;
      this.$emit("sofierstart", lines);
    },
    sofierlast: function() {
      let lines = this.entrada;

      this.$emit("sofierlast", lines);
    },
    filters: function() {
      let values = {};
      for (let index in this.columns) {
        let c = this.columns[index];
        if (c.visible_search) {
          let id = c.id;
          let ref = document.getElementById(id).value;
          values[id] = ref;
        }
      }
      this.$emit("filter", values);
    },
    clean: function() {
      let cpf = (this.cpf = null);
      let nomecompleto = (this.short_name = null);
      let name = (this.name = null);
      let email = (this.email = null);
      let filter = [cpf, nomecompleto, name, email];
      this.pesquisa = filter[null];
    },
    localizar: function() {
      let res = this.pesquisa.replace(":", ",");
      this.$emit("localizar", res);
    },
    detail: function(index) {
      let sofier = this.sofier.data[index];

      this.$emit("detail", sofier);
    },
    edit: function(index) {
      let sofier = this.sofier.data[index];

      this.$emit("editrow", sofier);
    },
    excluir: function(index) {
      //let text = `Deseja excluir ${index}`;
      let sofier = this.sofier.data[index];

      this.$emit("excluir", sofier);
      /*this.$swal({
        type: "warning",
        title: text
      });*/
    }
  }
};
</script>
<style lang="scss" scope>
.elegant-gray {
  background-color: #6d6a6a;
}
.dropdown-menu.show {
  width: 400px;
}
.dropdown.dropdown-lg .dropdown-menu {
  margin-top: -1px;
  padding: 6px 20px;
}
.input-group-btn .btn-group {
  display: flex !important;
}
.btn-group .btn {
  border-radius: 0;
  margin-left: -1px;
  height: 31px;
}
.btn-group .btn:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.btn-group .form-horizontal .btn[type="submit"] {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.form-horizontal .form-group {
  margin-left: 0;
  margin-right: 0;
}
.form-group .form-control:last-child {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.dropdown-menu.show {
  width: 100%;
}
.display-icon {
  font-size: 1.2rem;
}
.table-bordered,
.table-bordered > tbody > tr > td,
.table-bordered > tbody > tr > th,
.table-bordered > tfoot > tr > td,
.table-bordered > tfoot > tr > th,
.table-bordered > thead > tr > td,
.table-bordered > thead > tr > th {
  border: 0px solid #f4f4f4;
}
</style>
