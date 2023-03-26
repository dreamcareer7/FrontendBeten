<template>
  <form class="card border-warning mb-4" @submit.prevent="update">
    <div class="card-header">{{ $t("Update Group") }}</div>
    <div class="row mt-4">
      <div class="col-4">
        <div class="card-body">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="group.title"
              autocomplete="off"
              required
              autofocus
            />
            <label for="title">{{ $t("Title") }}</label>
          </div>

          <div class="form-floating mb-3">
            <select v-model="group.crew_id" id="crew_id" class="form-control">
              <option>{{ $t("Choose Crew") }}</option>
              <template v-for="crew in crews" :key="crew.id">
                <option :value="crew.id">{{ crew.fullname }}</option>
              </template>
            </select>
            <label for="crew_id">{{ $t("Crew") }}</label>
          </div>
        </div>
      </div>
      <div class="col-8 text-center">
        <h6>{{ $t("Assigned Members to this Group") }}</h6>
        <div class="row">
          <div class="col-4">
            <h6>{{ $t("Search Client") }}</h6>
            <input
              type="text"
              v-model="client_query"
              class="form-control"
              @input.prevent="searchClients"
            />
            <div class="row mt-3">
              <div
                class="row border p-2 mb-2"
                v-for="client in searched_client"
              >
                <div class="col-8">
                  <h6>{{ client.fullname }}</h6>
                </div>
                <div class="col-4">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="addClientToGroup(client)"
                  >
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-7">
            <div class="row border p-2 mb-2" v-for="client in group.clients">
              <div class="col-8">
                <h6>{{ client.fullname }}</h6>
              </div>
              <div class="col-2">
                <button
                  class="btn btn-primary"
                  type="button"
                  @click="removeClientFromGroup(client)"
                >
                  <ion-icon name="arrow-back-outline"></ion-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CRow>
        <CCol v-if="error_message" :md="12">
          <div class="error_style">
            {{ error_message }}
          </div>
        </CCol>
      </CRow>
    </div>
    <div class="card-footer text-end">
      <button
        class="btn btn-warning text-white"
        @click.prevent="$router.go(-1)"
      >
        {{ $t("Go back") }}</button
      >&nbsp;
      <button type="submit" class="btn btn-warning text-white">
        <ion-icon name="save-outline"></ion-icon>&nbsp;{{ $t("Save") }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "UpdateGroup",
  data: () => ({
    error_message: "",
    client_query: "",
    searched_client: [],
    group: {},
    crews: [],
  }),
  methods: {
    searchClients: async function () {
      if (this.client_query) {
        await this.$axios
          .get("/clients", {
            params: { fullname: this.client_query, per_page: 10 },
          })
          .then((response) => {
            this.searched_client = response.data.data.filter((client) => {
              return !this.group.clients.map((client) => client.id).includes(client.id);
            });
          });
      } else {
        this.searched_client = [];
      }
    },
    async addClientToGroup(client) {
      // If client is not already added to the group
      if (!this.group.clients.includes(client)) {
        this.group.clients.push(client);
      }
      const index = this.searched_client.indexOf(client);
      this.searched_client.splice(index, 1);
    },
    removeClientFromGroup(client) {
      const index = this.group.clients.indexOf(client);
      if (index > -1) {
        // only splice array when item is found
        this.group.clients.splice(index, 1); // 2nd parameter means remove one item only
      }
      if (!this.searched_client.includes(client)) {
        this.searched_client.push(client);
      }
    },
    update: async function () {
      await swal({
        title: this.$i18n.t("Are you sure?"),
        text: this.$i18n.t(
          "Click confirm to update, this action is irreversible"
        ),
        icon: "warning",
        buttons: [this.$i18n.t("Cancel"), this.$i18n.t("Confirm")],
      }).then((willUpdate) => {
        if (willUpdate) {
          this.group.clients = this.group.clients.map((client) => client.id);
          this.$axios
            .patch(`/groups/${this.group.id}`, this.group)
            .then(() => {
              this.$router.push({ name: "Groups" });
              swal(this.$i18n.t("Updated successfully!"), {
                icon: "success",
                timer: 3000,
              });
            })
            .catch((error) => {
              if (error.response) {
                this.error_message = error.response.data.message;
              } else {
                this.error_message = error.message;
              }
            });
        }
      });
    },
  },
  async mounted() {
    await this.$axios
      .get(`/groups/${this.$decrypt(this.$route.params.id)}/edit`)
      .then((response) => {
        this.group = response.data.group;
        this.crews = response.data.crews;
      });
  },
};
</script>
