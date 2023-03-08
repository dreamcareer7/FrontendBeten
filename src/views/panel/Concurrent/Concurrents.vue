<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-10">
              <strong>Concurrents</strong>
            </div>
            <div class="col-md-2">
              <router-link
                to="/concurrents/create"
              >
                <CButton
                  color="primary"
                  class="float-end"
                >
                  Create Concurrent
                </CButton>
              </router-link>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Model Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Model ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Repeated Every</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Extra</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="cocurrent in cocurrents">
                  <CTableHeaderCell scope="row">{{ cocurrent.id }}</CTableHeaderCell>
                  <CTableDataCell>{{cocurrent.model_type}}</CTableDataCell>
                  <CTableDataCell>{{cocurrent.model_id}}</CTableDataCell>
                  <CTableDataCell>{{cocurrent.repeated_every}}</CTableDataCell>
                  <CTableDataCell>Otto</CTableDataCell>
                  <CTableDataCell>
                    <button style="margin-right: 1em;" @click="showDetail(cocurrent)" class="btn btn-sm btn-info text-white">View</button>
                    <button style="margin-right: 1em;" class="btn btn-sm btn-warning text-white">Update</button>
                    <button class="btn btn-sm btn-danger text-white">Delete</button>
                  </CTableDataCell>
          
                </CTableRow>
              </CTableBody>
            </CTable>
        </CCardBody>
      </CCard>
    </CCol>
    <CModal
      :visible="showDetailModal"
      @close="showDetailModal = false"
      size="lg"
    >
      <CModalHeader>
        <CModalTitle>Concurrent Info</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CTable responsive>
          <CTableRow class="mt-3">
            <CTableHeaderCell>ID:</CTableHeaderCell>
            <CTableDataCell>{{ concurrentDetail.id }}</CTableDataCell>
            <CTableHeaderCell>Model Id:</CTableHeaderCell>
            <CTableDataCell>{{ concurrentDetail.model_id }}</CTableDataCell>
          </CTableRow>
          <CTableRow class="mt-3">
            <CTableHeaderCell>Start Date:</CTableHeaderCell>
            <CTableDataCell>{{ concurrentDetail.starting_at }}</CTableDataCell>
            <CTableHeaderCell>End Date:</CTableHeaderCell>
            <CTableDataCell>{{ concurrentDetail.ending_at }}</CTableDataCell>
          </CTableRow>
          <CTableRow class="mt-3">
            <CTableDataCell colspan="4">
            <div class="cotainer m-3 p-2 rounded border bg-light">
              <div class="row">
                <div class="col-sm-6">
                  <div class="input-group mb-3"><span class="input-group-text">Start at</span><input type="date" class="form-control" :value="concurrentDetail.starting_at"></div>
                </div>
                <div class="col-sm-6">
                  <div class="input-group mb-3"><span class="input-group-text">Ends at</span><input type="date" class="form-control" :value="concurrentDetail.ending_at"></div>
                </div>
              </div>
              <ul class="list-unstyled">
                <li class="item-selection" v-if="extra.type == 'Daily'">
                  <button class="btn btn-success btn-sm rounded-5" id="btnDaily">Daily</button>
                  <div class="container py-5 border">
                    <template v-for="(daily,key) in extra.time">
                    <div class="input-group mb-1 daily-input-time">
                      <input type="time" name="time" class="form-control w-8" :value="daily" placeholder="time" aria-label="time of day">
                      <span class="input-group-text w-4">+ -</span>
                      <input type="text" name="period_rate" class="form-control w-6" :value="extra.mint[key]" placeholder="In Minutes" aria-label="minutes plus or minus">
                      <select class="form-select rows-2" name="roles[]" multiple>
                        <option value="">Admin</option>
                        <option value="">Supervisor</option>
                        <option value="">members</option>
                      </select>
                      <select class="form-select rows-2" name="users[]" multiple>
                        <option value="">Fateh</option>
                        <option value="">John</option>
                        <option value="">Sami</option>
                      </select>
                    </div>
                    </template>
                  </div>
                </li>
                <li class="item-selection" v-else>
                  <button class="btn btn-primary btn-sm rounded-5" id="btnWeekly">Weekly</button>
                  <div class="container py-5 border">

                    <div class="mb-1 weekly-input-day">
                      <ul class="list-unstyled">
                        <li class="rounded-5 border px-3" v-for="(day,key) in extra.day">
                          <div class="input-group">
                            <span class="pt-3 me-2 w-8">{{ day }}</span>
                            <input type="time" class="form-control w-8" placeholder="time" aria-label="time of day" :value="extra.time[key]">
                            <select class="form-select rows-2" name="roles[]" multiple>
                              <option value="">Admin</option>
                              <option value="">Supervisor</option>
                              <option value="">members</option>
                            </select>

                            <select class="form-select rows-2" name="users[]" multiple>
                              <option value="">Fateh</option>
                              <option value="">John</option>
                              <option value="">Sami</option>
                            </select>
                          </div>
                        </li>
                   
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            </CTableDataCell>
          </CTableRow>
        </CTable>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          class="text-white"
          @click="() => (showDetailModal = false)"
        >
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  </CRow>
</template>

<script>
export default {
  name: 'Concurrents',
  data: () => ({
    cocurrents: [],
    showDetailModal: false,
    concurrentDetail: {},
    extra: {},
  }),
  methods: {
    getCocurrent: async function () {
      await this.$axios
        .get(`concurrent`)
        .then((response) => {
          this.cocurrents = response.data;
          console.log(this.cocurrents);
        })
    },
    showDetail(data){
      this.extra = JSON.parse(data.extra);
      console.log(this.extra);
      this.concurrentDetail = data;
      this.showDetailModal = true;
    }
  },
  mounted(){
   this.getCocurrent();
  }
}
</script>
<style>
.modal-header {
    background-color: #3c4b64;
    color: #fff;
    padding: 17px 30px;
}
.btn-close {
    opacity: 1;
    background-color: #fff;
    width: 9px;
    height: 9px;
    background-size: 10px;
}
</style>
