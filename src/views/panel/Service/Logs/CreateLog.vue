<template>
  <div class="card border-success mb-4 mt-4">
    <div class="card-header">Create Log</div>
    <form @submit.prevent="create">
      <div class="card-body">
        <div class="form-floating mb-3">
          <select
            id="model_type"
            class="form-control"
            v-model="log.model_type"
            required
          >
            <option value="App\Models\Crew">Crew</option>
            <option value="App\Models\Vehicle">Vehicle</option>
            <option value="App\Models\Client">Client</option>
            <option value="App\Models\Group">Group</option>
            <option value="App\Models\Meal">Meal</option>
            <option value="App\Models\Service">Service</option>
          </select>
          <label for="model_type">Model Type</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            id="model_id"
            name="model_id"
            rdequired
            autocomplete="off"
            v-model="log.model_id"
          />

          <label for="model_id">
            Model ID
          </label>
        </div>

        <div class="form-floating mb-3">
          <input class="form-control" type="text" v-model="log.role">
          <label for="role">Role</label>
          <div class="invalid-feedback"></div>
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
  name: 'CreateLog',
  props: ['service_commit_id'],
  emits: ['created'],
  data() {
    return {
      log: {},
    }
  },
  methods: {
    create() {
      this.log.service_commit_id = this.service_commit_id
      this.$axios.post('/service_commit_log', this.log).then(() => {
        this.log = {}
        this.$emit('created')
      })
    },
  },
}
</script>
