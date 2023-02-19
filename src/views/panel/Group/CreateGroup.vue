<template>
<div class="card border-success mb-4">
	<div class="card-header">
		Create Group
	</div>

	<div id="ialert" class="" role="alert"></div>
	<form method="post">
        <div class="card-body">

            <div class="form-floating mb-3">
            <input type="text" class="form-control" id="title" v-model="group.title" name="title" placeholder="Title..." required autofocus autocomplete="off">
            <label for="title">Title</label>
            <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-3">
              <select v-model="group.crew_id" name="crew_id" id="crew_id" class="form-control">
                  <option>Choose Crew</option>
                  <template v-for="crew in crews" :key="crew.id">
                    <option value="{{ crew.id }}">{{ crew.fullname }}</option>
                  </template>
              </select>
                <label for="crew_id">Crew</label>
                <div class="invalid-feedback"></div>
            </div>


        </div>

	<div class="card-footer text-end">
      <a @click="createGroup()" class="btn btn-outline-success ajax">Save</a>
	</div>
	</form>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'create_group',
  data() {
    return {
      group: {
        title: '',
        crew: '',
      },
      crews
    }
  },
  mounted() {
    this.getCrew();
  },
  methods: {

    getCrew: async function () {
      await axios.get(`/crew`).then((response) => {
        this.crews = response.data.data
      })
    },
    createGroup: async function () {
      await axios.post(`/groups`, this.group).then((response) => {
        let res = response.data.data
        console.log(res)
      })
    },
  },
}
</script>

