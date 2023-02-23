<template>
<div class="card border-warning mb-4">
	<div class="card-header">
		Update Document
	</div>

	<div id="ialert" class="" role="alert"></div>
	<form method="post">
        <div class="card-body">

          <div class="row" v-if="!uploaded">
            <div class="col-6">
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="title" name="title" placeholder="Title..." required autofocus autocomplete="off"  v-model="form.title">
                <label for="title">Title</label>
                <div class="invalid-feedback"></div>
              </div>
              <div class="form-floating mb-3">
                <select
                  class="form-control"
                  v-model="form.model_type"
                  >
                  <option value="others">others</option>
                  <option value="Contract">Contract</option>
                  <option value="Crew">Crew</option>
                  <option value="User">User</option>
                  <option value="Meal">Meal</option>
                  <option value="Complaint">Complaint</option>
                   <option value="Dormitory">Dormitory</option>

                </select>
                <label for="path">Modal Type</label>
                <div class="invalid-feedback"></div>
              </div>
               <div class="form-floating mb-3">
                <input type="text" class="form-control" id="model_id" name="model_id" placeholder="Model ID..." required autocomplete="off" v-model="form.model_id">
                <label for="model_id">Model ID</label>
                <div class="invalid-feedback"></div>
              </div>

            </div>
            <div class="col-6 overflow-scroll" style="height: 400px">
               <input type="file" ref="file" name="image" class="form-control" @change="detectFile"/>
              <img :src="previewurl" ref="preview" class="img-thumbnail">
                <div style="width:550px; height:550px; overflow: scroll" v-if="!previewurl">
                  <img :src="base_url +'/documents/' + form.path" class="img-thumbnail" />
                </div>
            </div>
          </div>
          <div v-if="!uploaded" class="row">
            <div class="col-12">
              <div class="progress" v-if="uploadpercent> 0 && uploadpercent<100">
                <div class="progress-bar" role="progressbar" :style="'width:'+ uploadpercent +'%'" :aria-valuenow="uploadpercent" aria-valuemin="0" aria-valuemax="100">{{uploadpercent}}%</div>
              </div>
            </div>
          </div>
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
        </div>

	<div class="card-footer text-end">
      <a class="btn btn-outline-success ajax" @click="update" v-if="!uploaded">Update</a>
	</div>
	</form>
</div>
</template>

<script>

import  axios from "axios";

export default {
    name: 'update_document',
  components: {

  },
    data() {
      return {
        document_id: '',
        message: '',
        success: false,
        base_url:'',
       previewurl:'',
        uploadpercent:0,
        uploaded:false,
        form:{
          title:'',
          model_type:'',
          model_id:''
        }
      }
    },
    mounted() {
      this.document_id = this.$decrypt(this.$route.params.id)
      this.fetchInfo(this.document_id)
      this.base_url = process.env.VUE_APP_BACKEND_BASE_URL
    },
    methods: {
      detectFile(){
        let f = this.$refs.file.files[0]
        this.previewurl=URL.createObjectURL(f)
      },
      update(){
        this.uploaded=  false
        let formdata = new FormData()
        formdata.append("title",this.form.title)
        formdata.append("model_id",this.form.model_id)
        formdata.append("model_type",this.form.model_type)
        let f = this.$refs.file.files[0]
        formdata.append("file",f)

        const config = {
          onUploadProgress: (progressEvent)=> {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            console.log(percentCompleted)
            this.uploadpercent = percentCompleted
          }
        }

        axios.post('/documents/update/' + this.document_id, formdata, config)
          .then(response => {
            this.message = response.data.message
            if (response.data.success) {
              this.uploaded = true
              this.success = true
              this.client={}
            } else {
              this.success = false
            }
          })
          .catch(error => {
            if (error.response) {
              this.message = error.response.data.message
            } else {
              this.message = error.message
            }
          })


      },
      fetchInfo: async function (id) {
        await axios.get(`/documents/info/` + id).then((response) => {
          this.form = response.data
        })
      },
    }
  }
</script>
