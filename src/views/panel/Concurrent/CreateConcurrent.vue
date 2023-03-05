<template>
  <div class="card border-success mb-4">
    <div class="card-header">
      Create Concurrent
    </div>

    <div id="ialert" class="" role="alert"></div>
    <form method="post">
      <div class="card-body">
        <div class="cotainer m-3 p-2 rounded border bg-light">
        <div class="row">
          <div class="col-sm-6">
            <div class="input-group mb-3"><span class="input-group-text">Start at</span><input type="date" class="form-control" v-model="form.start_at" name="Start_at"></div>
          </div>
          <div class="col-sm-6">
            <div class="input-group mb-3"><span class="input-group-text">Ends at</span><input type="date" class="form-control" v-model="form.end_at" name="end_at"></div>
          </div>
        </div>
        <ul class="list-unstyled">
          <li class="item-selection">
            <button class="btn btn-success btn-sm rounded-5" @click="getType('Daily')" id="btnDaily">Daily</button>
            <div class="container d-none py-5 border">
              <div class="input-group mb-1 daily-input-time">
                <input type="time" name="time" class="form-control w-8" placeholder="time" v-model="form.dTime[0]" aria-label="time of day">
                <span class="input-group-text w-4">+ -</span>
                <input type="text" name="period_rate" class="form-control w-6" v-model="form.dMint[0]" placeholder="In Minutes" aria-label="minutes plus or minus">
                <select class="form-select rows-2" v-model="form.dRoles[0]" name="roles[]">
                  <template v-for="(role, index) in roles">
                    <option v-bind:value="role.id">{{role.name}}</option>
                  </template>
                </select>
                <select class="form-select rows-2" v-model="form.dUsers[0]">
                  <template v-for="(user, index) in users">
                    <option :value="user.id">{{user.name}}</option>
                  </template>
                </select>
                <button class="btn btn-outline-success btn-icon btn-daily-input-time-add" type="button">+</button>
              </div>
            </div>
          </li>
          <li class="item-selection">
            <button class="btn btn-primary btn-sm rounded-5" @click="getType('Weekly')" id="btnWeekly">Weekly</button>
              <div class="container d-none py-5 border">
                <div class="mb-1 weekly-input-day">
                  <ul class="list-unstyled">
                    <li class="rounded-5 border px-3">
                      <div class="input-group">
                        <span class="pt-3 me-2 w-8">Saturday</span>
                        <input type="hidden" v-model="form.wDay[0]">
                        <input type="time" class="form-control w-8" placeholder="time" aria-label="time of day" v-model="form.wTime[0]" name="daily[]">
                        <select class="form-select rows-2" v-model="form.wRoles[0]" name="roles[]">
                          <template v-for="(role, index) in roles">
                            <option :value="role.id">{{role.name}}</option>
                          </template>
                        </select>
                        <select class="form-select rows-2" v-model="form.wUsers[0]">
                          <template v-for="(user, index) in users">
                            <option :value="user.id">{{user.name}}</option>
                          </template>
                        </select>
                      </div>
                    </li>
                    <li class="rounded-5 border px-3">
                      <div class="input-group">
                        <span class="pt-3 me-2 w-8">Sunday</span>
                        <input type="hidden" v-model="form.wDay[1]">
                        <input type="time" class="form-control w-8" placeholder="time" aria-label="time of day" v-model="form.wTime[1]" name="daily[]">
                        <select class="form-select rows-2" v-model="form.wRoles[1]">
                          <template v-for="(role, index) in roles">
                            <option :value="role.id">{{role.name}}</option>
                          </template>
                        </select>
                        <select class="form-select rows-2" v-model="form.wUsers[1]">
                          <template v-for="(user, index) in users">
                            <option :value="user.id">{{user.name}}</option>
                          </template>
                        </select>
                      </div>
                    </li>
                    <li class="rounded-5 border px-3">
                      <div class="input-group">
                        <span class="pt-3 me-2 w-8">Monday</span>
                        <input type="hidden" v-model="form.wDay[2]">
                        <input type="time" class="form-control w-8" placeholder="time" aria-label="time of day" v-model="form.wTime[2]" name="daily[]">
                        <select class="form-select rows-2" v-model="form.wRoles[2]">
                          <template v-for="(role, index) in roles">
                            <option :value="role.id">{{role.name}}</option>
                          </template>
                        </select>
                        <select class="form-select rows-2" v-model="form.wUsers[2]">
                          <template v-for="(user, index) in users">
                            <option :value="user.id">{{user.name}}</option>
                          </template>
                        </select>
                      </div>
                    </li>
                    <li class="rounded-5 border px-3">
                      <div class="input-group">
                        <span class="pt-3 me-2 w-8">Tuesday</span>
                        <input type="hidden" v-model="form.wDay[3]">
                        <input type="time" class="form-control w-8" placeholder="time" aria-label="time of day" v-model="form.wTime[3]" name="daily[]">
                        <select class="form-select rows-2" v-model="form.wRoles[3]">
                          <template v-for="(role, index) in roles">
                            <option :value="role.id">{{role.name}}</option>
                          </template>
                        </select>
                        <select class="form-select rows-2" v-model="form.wUsers[3]">
                          <template v-for="(user, index) in users">
                            <option :value="user.id">{{user.name}}</option>
                          </template>
                        </select>
                      </div>
                    </li>
                    <li class="rounded-5 border px-3">
                      <div class="input-group">
                        <span class="pt-3 me-2 w-8">Wednesday</span>
                        <input type="hidden" v-model="form.wDay[4]">
                        <input type="time" class="form-control w-8" placeholder="time" aria-label="time of day" v-model="form.wTime[4]" name="daily[]">
                        <select class="form-select rows-2" v-model="form.wRoles[4]">
                          <template v-for="(role, index) in roles">
                            <option :value="role.id">{{role.name}}</option>
                          </template>
                        </select>
                        <select class="form-select rows-2" v-model="form.wUsers[4]">
                          <template v-for="(user, index) in users">
                            <option :value="user.id">{{user.name}}</option>
                          </template>
                        </select>
                      </div>
                    </li>
                    <li class="rounded-5 border px-3">
                      <div class="input-group">
                        <span class="pt-3 me-2 w-8">Thursday</span>
                        <input type="hidden" v-model="form.wDay[5]">
                        <input type="time" class="form-control w-8" placeholder="time" aria-label="time of day" v-model="form.wTime[5]" name="daily[]">
                        <select class="form-select rows-2" v-model="form.wRoles[5]">
                          <template v-for="(role, index) in roles">
                            <option :value="role.id">{{role.name}}</option>
                          </template>
                        </select>
                        <select class="form-select rows-2" v-model="form.wUsers[5]">
                          <template v-for="(user, index) in users">
                            <option :value="user.id">{{user.name}}</option>
                          </template>
                        </select>
                      </div>
                    </li>
                    <li class="rounded-5 border px-3">
                      <div class="input-group">
                        <span class="pt-3 me-2 w-8">Friday</span>
                        <input type="hidden" v-model="form.wDay[6]">
                        <input type="time" class="form-control w-8" placeholder="time" aria-label="time of day" v-model="form.wTime[6]" name="daily[]">
                        <select class="form-select rows-2" v-model="form.wRoles[6]">
                          <template v-for="(role, index) in roles">
                            <option :value="role.id">{{role.name}}</option>
                          </template>
                        </select>
                        <select class="form-select rows-2" v-model="form.wUsers[6]" name="users[]">
                          <template v-for="(user, index) in users">
                            <option :value="user.id">{{user.name}}</option>
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
          <input type="text" class="form-control" id="model_id" v-model="form.modelId" name="model_id" placeholder="Model ID..." required
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

        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="extra" name="extra" v-model="form.extra" placeholder="Extra..." required
            autocomplete="off">
          <label for="extra">Extra</label>
          <div class="invalid-feedback"></div>
        </div>
      </div>

      <div class="card-footer text-end">
        <a class="btn btn-outline-success ajax" @click.prevent="submitForm()">Save</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'create_concurrent',
  data: () => ({
    users: [],
    roles: [],
    form: {
      start_at: '',
      end_at: '',
      dRoles: [],
      dTime: [],
      dMint: [],
      dUsers: [],
      wRoles: [],
      wUsers: [],
      wDay: ['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'],
      wTime: [],
      type: '',
      modelType: '',
      modelId: '',
      repeatedEvery: '',
      extra: ''
    }
  }),
  methods: {
    getUsersRoles: async function () {
      await this.$axios
        .get(`concurrent/get_users_roles`)
        .then((response) => {
          this.users = response.data.users;
          this.roles = response.data.roles;
        })
    },
    getType(type){
      this.form.type = type;
    },
    submitForm: async function () {
      await this.$axios
        .post('/concurrent/add', this.form)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
         
        })
    }
  },
  mounted() {
    this.getUsersRoles();
    const btnDailt = document.getElementById('btnDaily')
    const btnWeekly = document.getElementById('btnWeekly')


    btnDaily.addEventListener('click', event => {
      const btn_daily = event.target // using event for dynamic [btn_daily equal btnDaily]
      const currentContent = btn_daily.parentNode.querySelector('.container')
      if (btn_daily.classList.contains('open')) {
        btnWeekly.classList.toggle('disabled')
        btn_daily.classList.toggle('open')
        currentContent.classList.toggle('d-none')
        return true
      }
      btn_daily.classList.toggle('open')
      btnWeekly.classList.toggle('disabled')
      currentContent.classList.toggle('d-none')
      return true
    })

    document.querySelectorAll('.btn-icon').forEach(btn => {
      btn.addEventListener('click', event => {
        // btn add 
        if (btn.classList.contains('btn-daily-input-time-add')) {
          const inputGroup = btn.closest('.daily-input-time').cloneNode(true)
          // remove the add class from it
          const btnRemove = inputGroup.querySelector('.btn-daily-input-time-add')
          btnRemove.classList.add('btn-daily-input-time-remove')
          btnRemove.classList.remove('btn-daily-input-time-add')
          btnRemove.classList.remove('btn-outline-success')
          btnRemove.classList.add('btn-outline-danger')
          btnRemove.innerText = "-"

          btn.closest('.container').appendChild(inputGroup)
          btnRemove.addEventListener('click', ev => {
            btnRemove.closest('.daily-input-time').remove()
          });
        }

      })
    })

    btnWeekly.addEventListener('click', event => {
      const btn_weekly = event.target // using event for dynamic [btn_weekly equal btnWeekly]
      const currentContent = btn_weekly.parentNode.querySelector('.container')
      if (btn_weekly.classList.contains('open')) {
        btnDaily.classList.toggle('disabled')
        btn_weekly.classList.toggle('open')
        currentContent.classList.toggle('d-none')
        return true
      }
      btn_weekly.classList.toggle('open')
      btnDaily.classList.toggle('disabled')
      currentContent.classList.toggle('d-none')
      return true

    })

  }
}
</script>
