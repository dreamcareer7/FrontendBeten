<template>
  <div class="card border-success mb-4">
    <div class="card-header">Create Meal</div>
    <form @submit.prevent="create">
      <div class="card-body">
        <div class="form-floating mb-3">
          <select
            id="meal_type_id"
            class="form-control"
            required
            v-model="meal.meal_type_id"
            autofocus
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
            required
            autocomplete="off"
            v-model="meal.quantity"
          />
          <label for="quantity">Quantity</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="to_model_type"
            required
            autocomplete="off"
            v-model="meal.to_model_type"
          />
          <label for="to_model_type">To Model Type</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="number"
            min="1"
            class="form-control"
            id="to_model_id"
            required
            autocomplete="off"
            v-model="meal.to_model_id"
          />
          <label for="to_model_id">To Model ID</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="date"
            class="form-control"
            id="sent_at"
            placeholder="Sent At..."
            required
            v-model="meal.sent_at"
          />
          <label for="sent_at">Sent At</label>
        </div>
      </div>

      <div class="card-footer text-end">
        <button type="submit" class="btn btn-outline-success">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreateMeal',
  data: () => ({
    meal: {},
    meal_types: [],
  }),
  methods: {
    async create() {
      await this.$axios
        .post('/meals', this.meal)
        .then(() => this.$router.push({ name: 'All Meals' }))
    },
  },
  async mounted() {
    await this.$axios
      .get('/meal_types')
      .then((response) => (this.meal_types = response.data.data))
  },
}
</script>
