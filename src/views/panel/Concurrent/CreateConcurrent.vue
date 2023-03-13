<template>
  <div class="card border-success mb-4">
    <div class="card-header">
      Create Concurrent
    </div>
    <div id="ialert" class="" role="alert"></div>
    <CRow>
      <CCol :md="12">
        <div v-show="message && !success" class="error_style">
          {{ message }}
        </div>
        <div v-show="message && success" class="alert alert-success">
          {{ message }}
        </div>
      </CCol>
    </CRow>
    <form @submit.prevent="submitForm()" method="post">
      <div class="card-body">
        <div class="cotainer m-3 p-2 rounded border bg-light">
        <div class="row">
          <div class="col-sm-6">
            <div class="input-group mb-3"><span class="input-group-text">Start at</span>
              <input type="date" class="form-control" v-model="form.start_at" name="Start_at" required>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="input-group mb-3"><span class="input-group-text">Ends at</span>
              <input type="date" class="form-control" v-model="form.end_at" name="end_at" :disabled="dateDisable" required>
            </div>
          </div>
        </div>
        <ul class="list-unstyled">
          <li class="item-selection">
            <button class="btn btn-success btn-sm rounded-5" @click="getType('Daily')">Daily</button>
            <div class="container py-5 border" v-if="isDaily">
              <template v-for="(daily,key) in appendDaily">
                <div class="input-group mb-1 daily-input-time">
                <input type="time" name="time" class="form-control w-8" placeholder="time" v-model="form.daily.time[key]" aria-label="time of day">
                <span class="input-group-text w-4">+ -</span>
                <input type="number" name="period_rate" class="form-control w-6" v-model="form.daily.mint[key]" placeholder="In Minutes" aria-label="minutes plus or minus">
                <select class="form-select rows-2" v-model="form.daily.roles[key]" multiple>
                  <template v-for="(role, index) in daily.dataRoles">
                    <option v-bind:value="role.name">{{role.name}}</option>
                  </template>
                </select>
                <select class="form-select rows-2" v-model="form.daily.users[key]" multiple>
                  <template v-for="(user, index) in daily.dataUsers">
                    <option :value="user.name">{{user.name}}</option>
                  </template>
                </select>
                <button class="btn btn-outline-success btn-icon btn-daily-input-time-add" @click="addNewDailyRow()" type="button" v-if="key == 0">+</button>
                <button class="btn btn-outline-danger btn-icon btn-daily-input-time-add" @click="removeRow(daily)" type="button" v-else>-</button>
              </div>
              </template>
            </div>
          </li>
          <li class="item-selection">
            <button class="btn btn-primary btn-sm rounded-5" @click="getType('Weekly')">Weekly</button>
              <div class="container py-5 border" v-if="isWeekly">
                <div class="mb-1 weekly-input-day">
                  <ul class="list-unstyled">
                    <li class="rounded-5 border px-3">
                      <div class="input-group">
                        <span class="pt-3 me-2 w-8">Saturday</span>
                        <input type="hidden" v-model="form.weekly.day[0]">
                        <input type="time" class="form-control w-8" placeholder="time" aria-label="time of day" v-model="form.weekly.time[0]">
                        <select class="form-select rows-2" v-model="form.weekly.roles[0]" multiple>
                          <template v-for="(role, index) in roles">
                            <option :value="role.name">{{role.name}}</option>
                          </template>
                        </select>
                        <select class="form-select rows-2" v-model="form.weekly.users[0]" multiple>
                          <template v-for="(user, index) in users">
                            <option :value="user.name">{{user.name}}</option>
                          </template>
                        </select>
                      </div>
                    </li>
                    <li class="rounded-5 border px-3">
                      <div class="input-group">
                        <span class="pt-3 me-2 w-8">Sunday</span>
                        <input type="hidden" v-model="form.weekly.day[1]">
                        <input type="time" class="form-control w-8" placeholder="time" aria-label="time of day" v-model="form.weekly.time[1]" name="daily[]">
                        <select class="form-select rows-2" v-model="form.weekly.roles[1]" multiple>
                          <template v-for="(role, index) in roles">
                            <option :value="role.name">{{role.name}}</option>
                          </template>
                        </select>
                        <select class="form-select rows-2" v-model="form.weekly.users[1]" multiple>
                          <template v-for="(user, index) in users">
                            <option :value="user.name">{{user.name}}</option>
                          </template>
                        </select>
                      </div>
                    </li>
                    <li class="rounded-5 border px-3">
                      <div class="input-group">
                        <span class="pt-3 me-2 w-8">Monday</span>
                        <input type="hidden" v-model="form.weekly.day[2]">
                        <input type="time" class="form-control w-8" placeholder="time" aria-label="time of day" v-model="form.weekly.time[2]" name="daily[]">
                        <select class="form-select rows-2" v-model="form.weekly.roles[2]" multiple>
                          <template v-for="(role, index) in roles">
                            <option :value="role.name">{{role.name}}</option>
                          </template>
                        </select>
                        <select class="form-select rows-2" v-model="form.weekly.users[2]" multiple>
                          <template v-for="(user, index) in users">
                            <option :value="user.name">{{user.name}}</option>
                          </template>
                        </select>
                      </div>
                    </li>
                    <li class="rounded-5 border px-3">
                      <div class="input-group">
                        <span class="pt-3 me-2 w-8">Tuesday</span>
                        <input type="hidden" v-model="form.weekly.day[3]">
                        <input type="time" class="form-control w-8" placeholder="time" aria-label="time of day" v-model="form.weekly.time[3]" name="daily[]">
                        <select class="form-select rows-2" v-model="form.weekly.roles[3]" multiple>
                          <template v-for="(role, index) in roles">
                            <option :value="role.name">{{role.name}}</option>
                          </template>
                        </select>
                        <select class="form-select rows-2" v-model="form.weekly.users[3]" multiple>
                          <template v-for="(user, index) in users">
                            <option :value="user.name">{{user.name}}</option>
                          </template>
                        </select>
                      </div>
                    </li>
                    <li class="rounded-5 border px-3">
                      <div class="input-group">
                        <span class="pt-3 me-2 w-8">Wednesday</span>
                        <input type="hidden" v-model="form.weekly.day[4]">
                        <input type="time" class="form-control w-8" placeholder="time" aria-label="time of day" v-model="form.weekly.time[4]" name="daily[]">
                        <select class="form-select rows-2" v-model="form.weekly.roles[4]" multiple>
                          <template v-for="(role, index) in roles">
                            <option :value="role.name">{{role.name}}</option>
                          </template>
                        </select>
                        <select class="form-select rows-2" v-model="form.weekly.users[4]" multiple>
                          <template v-for="(user, index) in users">
                            <option :value="user.name">{{user.name}}</option>
                          </template>
                        </select>
                      </div>
                    </li>
                    <li class="rounded-5 border px-3">
                      <div class="input-group">
                        <span class="pt-3 me-2 w-8">Thursday</span>
                        <input type="hidden" v-model="form.weekly.day[5]">
                        <input type="time" class="form-control w-8" placeholder="time" aria-label="time of day" v-model="form.weekly.time[5]" name="daily[]">
                        <select class="form-select rows-2" v-model="form.weekly.roles[5]" multiple>
                          <template v-for="(role, index) in roles">
                            <option :value="role.name">{{role.name}}</option>
                          </template>
                        </select>
                        <select class="form-select rows-2" v-model="form.weekly.users[5]" multiple>
                          <template v-for="(user, index) in users">
                            <option :value="user.name">{{user.name}}</option>
                          </template>
                        </select>
                      </div>
                    </li>
                    <li class="rounded-5 border px-3">
                      <div class="input-group">
                        <span class="pt-3 me-2 w-8">Friday</span>
                        <input type="hidden" v-model="form.weekly.day[6]">
                        <input type="time" class="form-control w-8" placeholder="time" aria-label="time of day" v-model="form.weekly.time[6]" name="daily[]">
                        <select class="form-select rows-2" v-model="form.weekly.roles[6]" multiple>
                          <template v-for="(role, index) in roles">
                            <option :value="role.name">{{role.name}}</option>
                          </template>
                        </select>
                        <select class="form-select rows-2" v-model="form.weekly.users[6]" multiple>
                          <template v-for="(user, index) in users">
                            <option :value="user.name">{{user.name}}</option>
                          </template>
                        </select>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="model_type" v-model="form.modelType" name="model_type" placeholder="Model Type..." required
            autocomplete="off">
          <label for="model_type">Model Type</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" id="model_id" v-model="form.modelId" name="model_id" placeholder="Model ID..." required
            autocomplete="off">
          <label for="model_id">Model ID</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="repeated_every" v-model="form.repeatedEvery" name="repeated_every"
            placeholder="Repeated Every..." required autocomplete="off">
          <label for="repeated_every">Repeated Every</label>
          <div class="invalid-feedback"></div>
        </div>
      </div>

      <div class="card-footer text-end">
        <button type="submit" class="btn btn-success" style="color:white">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'create_concurrent',
  data: () => ({
    message: '',
    success: false,
    users: [],
    roles: [],
    isWeekly: false,
    isDaily: false,
    appendDaily: [
      {
        dataUsers: [],
        dataRoles: [],
      }
    ],
    form: {
      start_at: '',
      end_at: '',
      daily: {
        roles: [],
        time: [],
        mint: [],
        users: [],
        type: ''
      },
      weekly: {
        roles: [],
        users: [],
        time: [],
        day: ['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'],
        type:'',
      },
      type: '',
      modelType: '',
      modelId: '',
      repeatedEvery: '',
    },
    dateDisable: true,
  }),
  watch:{
    'form.start_at': function(val) {
      if(val){
        this.dateDisable = false;
      }
        this.form.end_at = val;
    }
  },
  methods: {
    getUsersRoles: async function () {
      await this.$axios
        .get(`concurrent/get_users_roles`)
        .then((response) => {
          this.users = response.data.users;
          this.roles = response.data.roles;
          console.log( this.appendDaily);
          this.appendDaily[0].dataUsers = response.data.users;
          this.appendDaily[0].dataRoles = response.data.roles;
        })
    },
    getType(type){
      this.form.type = type;
      if(this.form.type == 'Daily'){
        this.isWeekly = false;
        this.isDaily = !this.isDaily;
      }else{
        this.isDaily = false;
        this.isWeekly = !this.isWeekly;
        
      }
    },
    addNewDailyRow: function(){
      this.appendDaily.push({
          dataRoles: this.roles,
          dataUsers: this.users,
        });
    },
    removeRow: function (row) {
      this.appendDaily.splice(this.appendDaily.indexOf(row), 1);
     },
    submitForm: async function () {
      if(this.form.type == 'Daily'){
        delete this.form.weekly;
        this.form.daily.type = this.form.type;
      }else{
        delete this.form.daily;
        this.form.weekly.type = this.form.type;
      }
      console.log(this.form);
      await this.$axios
        .post('/concurrent/add', this.form)
        .then((response) => {
          console.log(response);
          this.$router.push('/concurrents')
        })
        .catch((error) => {
          if (error.response) {
            this.message = error.response.data.message
          } else {
            this.message = error.message
          }
          this.success = false
        })
    },
  },
  mounted() {
    this.getUsersRoles();
  }
}
</script>
