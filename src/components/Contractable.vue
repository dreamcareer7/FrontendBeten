<template>
  <CCol class="card bg-light border-top-3 border-top-dark border-secondary p-0 mt-3">
    <CCardHeader class="font-weight-bold">Upload Contract</CCardHeader>
    <CForm class="p-2">
      <CRow class="mt-1">
        <CCol xs="8" sm="9">
          <CFormInput type="file" class="sm" ref="fileInput" @change="onFilePicked"  multiple="multiple" id="formFileLg"/>
        </CCol>
        <CCol xs="4" sm="3">
          <CButton type="button" color="info" class="text-white btn-sm" @click="submitFiles" shape="rounded-pill">Upload</CButton>
        </CCol>
      </CRow>
    </CForm>
    <CCard class="mt-1">
      <CAlert color="success" class="m-2" v-show="showMessage">{{ message }} <span class="pull-right cursor-pointer" @click="showMessage=false">X</span></CAlert>
      <CCardBody class="p-0">
        <CTable responsive hover class="cursor-pointer">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Path</CTableHeaderCell>
              <CTableHeaderCell style="width: 20%;" scope="col" :aria-colspan="2">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="(contract, index) in contracts">
              <CTableHeaderCell scope="row">{{index + 1}}</CTableHeaderCell>
              <CTableDataCell><a v-c-tooltip="{content: 'View Contract', placement: 'top'}" target="_blank" :href="contract.url">Open File</a></CTableDataCell>
              <CTableDataCell :aria-colspan="2">
                <button class="btn btn-sm btn-danger text-white m-1" @click="deleteFile(contract.id, index)" title="Delete Contract">
                  <ion-icon name="trash-bin-outline"></ion-icon>
                </button>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  </CCol>
</template>

<script>
export default {
  name: 'Contractable',
  props: [ 'type', 'id'],
  data: () => ({
    contracts: [],
    showMessage: false,
    message: '',
    files: [],
  }),
  methods: {
    async onFilePicked(event) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.files.push( event.target.files[i] );
      }
      event.target.files.value = null
    },
    async deleteFile(contractsID, rowIndex) {
      await this.$axios.delete(`/contracts/${contractsID}`)
        .then((response) => {
          this.contracts.splice(this.contracts.indexOf(rowIndex), 1)
          this.message = 'Contract deleted successfully.'
          this.showMessage = true
        })
    },
    getContracts: async function () {
      await this.$axios.get(`/contracts/${this.type}/${this.id}`)
        .then((response) => {
          this.contracts = response.data
        })
    },
    async submitFiles(){
      /*
        Initialize the form data
      */
      let formData = new FormData();

      /*
        Iteate over any file sent over appending the files
        to the form data.
      */
      for( let i = 0; i < this.files.length; i++ ){
        let file = this.files[i];
        formData.append(`contracts[${i}]`, file)
      }

      /*
        Make the request to the POST /select-files URL
      */
      await this.$axios.post(`/contracts/${this.type}/${this.id}`, formData)
        .then(() => {
          this.getContracts()
          this.message = 'Contract uploaded successfully.'
          this.showMessage = true
          this.$refs.inputFile.reset()
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
    },
  },
  mounted() {
    this.getContracts()
  },
}
</script>
