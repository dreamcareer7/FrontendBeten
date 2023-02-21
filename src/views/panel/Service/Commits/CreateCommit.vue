<template>
<div class="card border-success mb-4">
	<div class="card-header">
		Create Commit
	</div>

	<div id="ialert" class="" role="alert"></div>
	<form method="post">
      <div class="card-body">

          <div class="form-floating mb-3">
              <select name="service_id" id="service_id" class="form-control" v-model="service_commit.service_id" autofocus>
                  <option :value="null">Choose Service</option>
                  <option v-for="service in services" :value="service.id">{{ service.title }}</option>
              </select>
              <label for="service_id">Service</label>
              <div class="invalid-feedback"></div>
          </div>

          <div class="form-floating mb-3">
              <input type="text" class="form-control" id="badge" name="badge" placeholder="Badge..." required autocomplete="off" v-model="service_commit.badge">
              <label for="badge">Badge</label>
              <div class="invalid-feedback"></div>
          </div>


          <div class="row g-1 mb-1">
            <div class="col">
                <div class="form-floating mb-3">
                <input type="date" class="form-control" id="before_date" name="before_date" placeholder="Before date..." v-model="service_commit.scheduled_at">
                <label for="phone">Scheduled At</label>
                <div class="invalid-feedback"></div>
                </div>

                <div class="form-floating mb-3">
                <input type="date" class="form-control" id="exact_date" name="exact_date" placeholder="Exact date..." v-model="service_commit.started_at">
                <label for="phone">Started At</label>
                <div class="invalid-feedback"></div>
                </div>

            </div>
          </div>

          <div class="form-floating mb-3">
              <input type="text" class="form-control" id="from_location" name="from_location" placeholder="From Location..." required autocomplete="off" v-model="service_commit.location">
              <label for="from_location">From Location</label>
              <div class="invalid-feedback"></div>
          </div>

          <div class="form-floating mb-3">
              <select name="supervisor_id" id="supervisor_id" class="form-control" v-model="service_commit.supervisor_id">
                  <option :value="null">Choose a supervisor</option>
                  <option v-for="user in users" :value="user.id">{{ user.name }}</option>
              </select>
              <label for="supervisor_id">Supervisor</label>
              <div class="invalid-feedback"></div>
          </div>



      </div>

	<div class="card-footer text-end">
      <a class="btn btn-outline-success ajax">Save</a>
	</div>
	</form>
</div>
</template>

<script>
export default {
  name: 'create_commit',
  data: () => ({
    services: [],
    users: [], // A key/value pair of users name/id to select the supervisor
    service_commit: {
      service_id: null,
      badge: '',
      scheduled_at: '',
      started_at: '',
      location: '',
      supervisor_id: null
    }
  }),
  methods: {
    createCommit() {
      // Send the service commit object to the API for creation
    }
  },
  mounted() {
    this.$axios.get('service/list')
      .then((response) => this.services = response.data);
    this.$axios.get('users/list_supervisors')
      .then((response) => this.users = response.data);
  }
}
</script>
