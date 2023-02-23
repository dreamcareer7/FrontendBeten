<template>
  <div class="card border-info mb-4">
    <div class="card-header">
     View Document
    </div>

    <div id="ialert" class="" role="alert"></div>
    <form method="post">
      <div class="card-body">
          <div class="row">
            <div class="col-6">
              <table class="table table-responsive">
                <tr>
                  <td>Title</td><td>{{ document.title }}</td>
                </tr>
                <tr>
                  <td>Modal Type</td><td>{{ document.model_type }}</td>
                </tr>
                <tr>
                  <td>Modal Id</td><td>{{ document.model_id }}</td>
                </tr>
              </table>
            </div>
            <div class="col-6">
              <div style="width:550px; height:550px; overflow: scroll">
                <img :src="base_url +'/documents/' + document.path" class="img-thumbnail" />
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
        <a :href="base_url +'/documents/' + document.path" target="_blank" class="btn btn-primary" >Download </a>

      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'viewDocument',
  data() {
    return {
      message: '',
      success: false,
      document: {},
      form: {},
      document_id: null,
      base_url:'',
    }
  },
  mounted() {
    this.document_id = this.$decrypt(this.$route.params.id)
    this.fetchInfo(this.document_id)
     this.base_url = process.env.VUE_APP_BACKEND_BASE_URL
  },
  methods: {
     fetchInfo: async function (id) {
      await this.$axios.get(`/documents/info/` + id).then((response) => {
        this.document = response.data
      })
    },
  },
}
</script>
