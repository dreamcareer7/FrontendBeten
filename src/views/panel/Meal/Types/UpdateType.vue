<template>
  <div class="card border-success mb-4">
    <div class="card-header">Update Service</div>
    <form method="post">
      <div class="card-body">
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="title"
            name="title"
            placeholder="Title..."
            v-model="meal_type.title"
            required
            autocomplete="off"
          />
          <label for="title">Title</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
          <textarea
            class="form-control"
            id="description"
            name="description"
            v-model="meal_type.description"
            placeholder="Description..."
            autocomplete="off"
          ></textarea>
          <label for="description">Description</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="border rounded px-1">
          <div class="form-switch">
            <input type="hidden" value="0" name="has_documents" />
            <input
              class="form-check-input"
              type="checkbox"
              value="1"
              v-model="meal_type.has_documents"
              name="has_documents"
              checked
              id="has_documents"
            />
            <label class="form-check-label" for="has_documents"
              >Has Documents?</label
            >
          </div>
        </div>
      </div>

      <div class="card-footer text-end">
        <a class="btn btn-outline-success ajax" @click.prevent="updateMealType()">Save</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UpdateType',
  data: () => ({
    message: '',
    success: false,
    meal_type: {},
    meal_type_id: null,
  }),
  methods: {
    updateMealType: async function () {
      let meal_type = this.meal_type
      await this.$axios
        .put(`/meal_types/` + this.meal_type_id, meal_type)
        .then((response) => {
          this.message = response.data.message
          if (response.data.success) {
            this.success = true
          }
        })
        .catch((error) => {
          if (error.response) {
            this.message = error.response.data.message
          } else {
            this.message = error.message
          }
        })
    },
    fetchTypeInfo: async function (id) {
      await this.$axios
        .get(`/meal_types/` + id)
        .then((response) => (this.meal_type = response.data))
    },
  },
  mounted() {
    this.meal_type_id = this.$decrypt(this.$route.params.id)
    this.fetchTypeInfo(this.meal_type_id)
  },
}
</script>
