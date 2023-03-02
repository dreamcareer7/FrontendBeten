<template>
  <div class="card border-warning mb-4">
    <div class="card-header">Update Meal</div>
    <form @submit.prevent="update">
      <div class="card-body">
        <div class="form-floating mb-3">
          <select
            id="meal_type_id"
            class="form-control"
            v-model="meal.meal_type_id"
            autofocus
            required
          >
            <option>Choose Meal Type</option>
            <template v-for="meal_type in meal_types" :key="meal_type.id">
              <option :value="meal_type.id">{{ meal_type.title }}</option>
            </template>
          </select>
          <label for="meal_type_id">Meal Type</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            min="1"
            id="quantity"
            autocomplete="off"
            v-model="meal.quantity"
            required
          />
          <label for="quantity">Quantity</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="to_model_type"
            autocomplete="off"
            v-model="meal.to_model_type"
            required
          />
          <label for="to_model_type">To Model Type</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="number"
            min="1"
            class="form-control"
            id="to_model_id"
            autocomplete="off"
            v-model="meal.to_model_id"
            required
          />
          <label for="to_model_id">To Model ID</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="date"
            class="form-control"
            id="sent_at"
            placeholder="Sent At..."
            v-model="meal.sent_at"
            required
          />
          <label for="sent_at">Sent At</label>
        </div>
      </div>

      <div class="card-footer text-end">
        <button type="submit" class="btn btn-warning text-white">
          Save
          <ion-icon name="save"></ion-icon>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UpdateMeal',
  data: () => ({
    meal: {},
    meal_types: [],
  }),
  methods: {
    update: async function () {
      await this.$axios
        .post('/meals', this.meal)
        .then(() => this.$router.push({ name: 'All Meals' }))
    },
  },
  mounted() {
    this.$axios
      .get(`/meals/${this.$decrypt(this.$route.params.id)}`)
      .then((response) => (this.meal = response.data))
    this.$axios
      .get('/meal_types')
      // TODO: depending on how many meal types
      // Remove pagination of meal types or implement a search
      .then((response) => (this.meal_types = response.data.data))
  },
}
</script>
