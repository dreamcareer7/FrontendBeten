<template>
  <div class="card border-success mb-4">
    <div class="card-header">Create Log</div>
    <form @submit.prevent="create">
      <div class="card-body">
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="model_type"
            autocomplete="off"
            required
            v-model="log.model_type"
          />
          <label for="model_type">Model Type</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            id="model_id"
            name="model_id"
            required
            autocomplete="off"
            v-model="log.model_id"
          />

          <label for="model_id">Model ID</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
          <!-- Just to remember -->
          <select name="" id="" v-model="log.roles" class="form-select">
            <option value="mechanic">mechanic</option>
            <option value="driver">driver</option>
            <option value="valet">valet</option>
            <option value="host">host</option>
            <option value="guide">guide</option>
          </select>
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
        this.$axios.post('/service_commit_log', this.log)
            .then(() => {
                this.log = {}
                this.$emit('created')
            })
    }
  }
}
</script>
