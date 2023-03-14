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
                <!-- <span class="input-group-text w-4">+ -</span> -->
                <input type="number" name="period_rate" class="form-control w-6" v-model="form.daily.mint[key]" placeholder="In Minutes" aria-label="minutes plus or minus">
               <div style="width: 32%;">
                <input type="text" placeholder="Search Roles" v-model="searchQuery2[key]" class="form-control"/>
                <select class="form-select rows-2" v-model="form.daily.roles[key]" multiple>
                  <template v-for="(role, index) in filteredRoles(key)">
                    <option v-bind:value="role.name">{{role.name}}</option>
                  </template>
                </select>
               </div>
                <div style="width: 33%;">
                <input type="text" placeholder="Search Users" v-model="searchQuery[key]" class="form-control"/>
                <select class="form-select rows-2" v-model="form.daily.users[key]" multiple>
                  <template v-for="(user, index) in filteredUsers(key)">
                    <option :value="user.name">{{user.name}}</option>
                  </template>
                </select>
              </div>
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
                        <div style="width: 39%;">
                        <input type="text" placeholder="Search Roles" v-model="searchQuery2[0]" class="form-control"/>
                        <select class="form-select rows-2" v-model="form.weekly.roles[0]" multiple>
                          <template v-for="(role, index) in weekRoles(0)">
                            <option :value="role.name">{{role.name}}</option>
                          </template>
                        </select>
                        </div>
                        <div style="width: 39%;">
                        <input type="text" placeholder="Search Users" v-model="searchQuery[0]" class="form-control"/>
                        <select class="form-select rows-2" v-model="form.weekly.users[0]" multiple>
                          <template v-for="(user, index) in weekUsers(0)">
                            <option :value="user.name">{{user.name}}</option>
                          </template>
                        </select>
                        </div>
                      </div>
                    </li>
                    <li class="rounded-5 border px-3">
                      <div class="input-group">
                        <span class="pt-3 me-2 w-8">Sunday</span>
                        <input type="hidden" v-model="form.weekly.day[1]">
                        <input type="time" class="form-control w-8" placeholder="time" aria-label="time of day" v-model="form.weekly.time[1]">
                        <div style="width: 39%;">
                        <input type="text" placeholder="Search Roles" v-model="searchQuery2[1]" class="form-control"/>
                        <select class="form-select rows-2" v-model="form.weekly.roles[1]" multiple>
                          <template v-for="(role, index) in weekRoles(1)">
                            <option :value="role.name">{{role.name}}</option>
                          </template>
                        </select>
                        </div>
                        <div style="width: 39%;">
                        <input type="text" placeholder="Search Users" v-model="searchQuery[1]" class="form-control"/>
                        <select class="form-select rows-2" v-model="form.weekly.users[1]" multiple>
                          <template v-for="(user, index) in weekUsers(1)">
                            <option :value="user.name">{{user.name}}</option>
                          </template>
                        </select>
                        </div>
                      </div>
                    </li>
                    <li class="rounded-5 border px-3">
                      <div class="input-group">
                        <span class="pt-3 me-2 w-8">Monday</span>
                        <input type="hidden" v-model="form.weekly.day[2]">
                        <input type="time" class="form-control w-8" placeholder="time" aria-label="time of day" v-model="form.weekly.time[2]" name="daily[]">
                        <div style="width: 39%;">
                        <input type="text" placeholder="Search Roles" v-model="searchQuery2[2]" class="form-control"/>
                        <select class="form-select rows-2" v-model="form.weekly.roles[2]" multiple>
                          <template v-for="(role, index) in weekRoles(2)">
                            <option :value="role.name">{{role.name}}</option>
                          </template>
                        </select>
                        </div>
                        <div style="width: 39%;">
                        <input type="text" placeholder="Search Users" v-model="searchQuery[2]" class="form-control"/>
                        <select class="form-select rows-2" v-model="form.weekly.users[2]" multiple>
                          <template v-for="(user, index) in weekUsers(2)">
                            <option :value="user.name">{{user.name}}</option>
                          </template>
                        </select>
                        </div>
                      </div>
                    </li>
                    <li class="rounded-5 border px-3">
                      <div class="input-group">
                        <span class="pt-3 me-2 w-8">Tuesday</span>
                        <input type="hidden" v-model="form.weekly.day[3]">
                        <input type="time" class="form-control w-8" placeholder="time" aria-label="time of day" v-model="form.weekly.time[3]" name="daily[]">
                        <div style="width: 39%;">
                        <input type="text" placeholder="Search Roles" v-model="searchQuery2[3]" class="form-control"/>
                        <select class="form-select rows-2" v-model="form.weekly.roles[3]" multiple>
                          <template v-for="(role, index) in weekRoles(3)">
                            <option :value="role.name">{{role.name}}</option>
                          </template>
                        </select>
                        </div>
                        <div style="width: 39%;">
                        <input type="text" placeholder="Search Users" v-model="searchQuery[3]" class="form-control"/>
                        <select class="form-select rows-2" v-model="form.weekly.users[3]" multiple>
                          <template v-for="(user, index) in weekUsers(3)">
                            <option :value="user.name">{{user.name}}</option>
                          </template>
                        </select>
                        </div>
                      </div>
                    </li>
                    <li class="rounded-5 border px-3">
                      <div class="input-group">
                        <span class="pt-3 me-2 w-8">Wednesday</span>
                        <input type="hidden" v-model="form.weekly.day[4]">
                        <input type="time" class="form-control w-8" placeholder="time" aria-label="time of day" v-model="form.weekly.time[4]">
                        <div style="width: 39%;">
                        <input type="text" placeholder="Search Roles" v-model="searchQuery2[4]" class="form-control"/>
                        <select class="form-select rows-2" v-model="form.weekly.roles[4]" multiple>
                          <template v-for="(role, index) in weekRoles(4)">
                            <option :value="role.name">{{role.name}}</option>
                          </template>
                        </select>
                        </div>
                        <div style="width: 39%;">
                        <input type="text" placeholder="Search Users" v-model="searchQuery[4]" class="form-control"/>
                        <select class="form-select rows-2" v-model="form.weekly.users[4]" multiple>
                          <template v-for="(user, index) in weekUsers(4)">
                            <option :value="user.name">{{user.name}}</option>
                          </template>
                        </select>
                        </div>
                      </div>
                    </li>
                    <li class="rounded-5 border px-3">
                      <div class="input-group">
                        <span class="pt-3 me-2 w-8">Thursday</span>
                        <input type="hidden" v-model="form.weekly.day[5]">
                        <input type="time" class="form-control w-8" placeholder="time" aria-label="time of day" v-model="form.weekly.time[5]">
                        <div style="width: 39%;">
                        <input type="text" placeholder="Search Roles" v-model="searchQuery2[5]" class="form-control"/>
                        <select class="form-select rows-2" v-model="form.weekly.roles[5]" multiple>
                          <template v-for="(role, index) in weekRoles(5)">
                            <option :value="role.name">{{role.name}}</option>
                          </template>
                        </select>
                        </div>
                        <div style="width: 39%;">
                        <input type="text" placeholder="Search Users" v-model="searchQuery[5]" class="form-control"/>
                        <select class="form-select rows-2" v-model="form.weekly.users[5]" multiple>
                          <template v-for="(user, index) in weekUsers(5)">
                            <option :value="user.name">{{user.name}}</option>
                          </template>
                        </select>
                        </div>
                      </div>
                    </li>
                    <li class="rounded-5 border px-3">
                      <div class="input-group">
                        <span class="pt-3 me-2 w-8">Friday</span>
                        <input type="hidden" v-model="form.weekly.day[6]">
                        <input type="time" class="form-control w-8" placeholder="time" aria-label="time of day" v-model="form.weekly.time[6]">
                        <div style="width: 39%;">
                        <input type="text" placeholder="Search Roles" v-model="searchQuery2[6]" class="form-control"/>
                        <select class="form-select rows-2" v-model="form.weekly.roles[6]" multiple>
                          <template v-for="(role, index) in weekRoles(6)">
                            <option :value="role.name">{{role.name}}</option>
                          </template>
                        </select>
                        </div>
                        <div style="width: 39%;">
                        <input type="text" placeholder="Search Users" v-model="searchQuery[6]" class="form-control"/>
                        <select class="form-select rows-2" v-model="form.weekly.users[6]" multiple>
                          <template v-for="(user, index) in weekUsers(6)">
                            <option :value="user.name">{{user.name}}</option>
                          </template>
                        </select>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="form-floating mb-3">
        <label for="select-box" v-if="modelDisable">Model Type</label>
        <input type="text" v-model="form.modelType" @change="onChange" list="options" style="padding-top: 10px;" class="form-control form-control2" required>
        <datalist id="options" >
          <option v-for="option in options" :key="option.value" :value="option.label"></option>
        </datalist>
        <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="form.modelId" :disabled="modelDisable" placeholder="Model ID..." required
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
import { MultiSelect } from 'vue-search-select'
export default {
  name: 'create_concurrent',
  components: {
      MultiSelect
  },
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
    modelDisable: true,
    options: [
          { value: 'App\\Models\\City', label: 'App\\Models\\City' },
          { value: 'App\\Models\\Crew', label: 'App\\Models\\Crew' },
          { value: 'App\\Models\\Hospitality', label: 'App\\Models\\Hospitality' },
          { value: 'App\\Models\\Phase', label: 'App\\Models\\Phase' },
          { value: 'App\\Models\\Client', label: 'App\\Models\\Client' },
          { value: 'App\\Models\\Document', label: 'App\\Models\\Document' },
          { value: 'App\\Models\\Invoice', label: 'App\\Models\\Invoice' },
          { value: 'App\\Models\\Profession', label: 'App\\Models\\Profession' },
          { value: 'App\\Models\\User', label: 'App\\Models\\User' },
          { value: 'App\\Models\\Dormitory', label: 'App\\Models\\Dormitory' },
          { value: 'App\\Models\\Service', label: 'App\\Models\\Service' },
          { value: 'App\\Models\\Complaint', label: 'App\\Models\\Complaint' },
          { value: 'App\\Models\\Evaluation', label: 'App\\Models\\Evaluation' },
          { value: 'App\\Models\\Contract', label: 'App\\Models\\Contract' },
          { value: 'App\\Models\\Meal', label: 'App\\Models\\Meal' },
          { value: 'App\\Models\\Group', label: 'App\\Models\\Group' },
          { value: 'App\\Models\\MealType', label: 'App\\Models\\MealType' },
          { value: 'App\\Models\\Vehicle', label: 'App\\Models\\Vehicle' }
        ],
        searchQuery: [],
        searchQuery2: [],
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
    filteredUsers(index) {
      if (!this.searchQuery[index]) {
        return this.appendDaily[index].dataUsers;
      }
      return this.appendDaily[index].dataUsers.filter((option) =>
        option.name.toLowerCase().includes(this.searchQuery[index].toLowerCase())
      );
    },
    filteredRoles(index) {
      if (!this.searchQuery2[index]) {
        return this.appendDaily[index].dataRoles;
      }
      return this.appendDaily[index].dataRoles.filter((option) =>
        option.name.toLowerCase().includes(this.searchQuery2[index].toLowerCase())
      );
    },
    weekUsers(index) {
      if (!this.searchQuery[index]) {
        return this.users;
      }
      return this.users.filter((option) =>
        option.name.toLowerCase().includes(this.searchQuery[index].toLowerCase())
      );
    },
    weekRoles(index) {
      if (!this.searchQuery2[index]) {
        return this.roles;
      }
      return this.roles.filter((option) =>
        option.name.toLowerCase().includes(this.searchQuery2[index].toLowerCase())
      );
    },
    onSelect (items, lastSelectItem) {
        this.form.daily.users = items
        this.lastSelectItem = lastSelectItem
      },
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
    onChange(event) {
      console.log(event.target.value);
      if(event.target.value){
        this.modelDisable = false;
      }else{
        this.modelDisable = true;
      }
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
<style>
/* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
</style>
