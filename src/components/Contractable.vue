<template>
  <CCol class="card bg-light border-top-3 border-secondary p-0 mt-3">
    <CCardHeader class="font-weight-bold">Contracts</CCardHeader>
    <CCard class="mt-1">
      <CAlert color="success" class="m-2" v-show="showMessage">
        {{ message }}
        <span class="pull-right cursor-pointer" @click="showMessage = false">
          X
        </span>
      </CAlert>
      <CCardBody class="p-0">
        <CTable responsive hover class="cursor-pointer">
          <CTableBody>
            <template v-for="contract in contracts" :key="contract.id">
              <CTableRow>
                <CTableHeaderCell scope="row">
                  {{ contract.reference }}
                </CTableHeaderCell>
                <CTableDataCell>
                  <CButton
                    title="View Documents"
                    class="btn btn-sm btn-info text-white mx-1"
                    @click="toggleDocumentsOfContract(contract.id)"
                  >
                    <ion-icon
                      :name="`eye-${
                        contract_documents_shown[contract.id] ? 'off-' : ''
                      }outline`"
                    ></ion-icon>
                  </CButton>
                </CTableDataCell>
                <CTableDataCell :aria-colspan="2">
                  <button
                    class="btn btn-sm btn-danger text-white m-1"
                    @click="deleteContract(contract.id)"
                    title="Delete Contract"
                  >
                    <ion-icon name="trash-bin-outline"></ion-icon>
                  </button>
                </CTableDataCell>
              </CTableRow>
              <Transition name="fade">
                <CTableRow v-if="contract_documents_shown[contract.id]">
                  <CTableDataCell colspan="4">
                    <Documentable type="contract" :id="contract.id" />
                  </CTableDataCell>
                </CTableRow>
              </Transition>
            </template>
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
    <CForm class="p-2" @submit.prevent="upload" ref="uploadForm">
      <CRow class="mt-1">
        <CCol xs="5" sm="5">
          <input
            type="text"
            class="form-control sm"
            placeholder="Reference"
            v-model="reference"
            required
          />
        </CCol>
        <CCol xs="5" sm="5">
          <input type="file" class="form-control sm" ref="docs" multiple />
        </CCol>
        <CCol xs="2" sm="2">
          <CButton
            type="submit"
            color="info"
            class="mt-1 text-white btn-sm"
            shape="rounded-pill"
            >Upload</CButton
          >
        </CCol>
      </CRow>
    </CForm>
  </CCol>
</template>

<script>
export default {
  name: 'Contractable',
  props: ['type', 'id'],
  data: () => ({
    contracts: [],
    showMessage: false,
    message: '',
    contract_documents_shown: [],
    reference: '',
  }),
  methods: {
    async upload() {
      /*
        Initialize the form data
      */
      let form_data = new FormData()
      form_data.append('reference', this.reference)
      /*
        Iteate over any file sent over appending the files
        to the form data.
      */
      for (let i = 0; i < this.$refs.docs.files.length; i++) {
        form_data.append(`contracts[${i}]`, this.$refs.docs.files[i])
      }
      /*
        Make the request to the POST /select-files URL
      */
      await this.$axios
        .post(`/contracts/${this.type}/${this.id}`, form_data)
        .then((response) => {
          // Add the uploaded contracts to the existing list
          // We already have the reference, we just need to get the ID
          // from the response
          this.contracts.push({ id: response.data, reference: this.reference })
          this.contract_documents_shown[response.data] = false
          this.message = 'Contract uploaded successfully.'
          this.showMessage = true
          this.reference = ''
          this.$refs.uploadForm.$el.reset()
          this.fetchcontacts()
        })
    },
    toggleDocumentsOfContract(contract_id) {
      this.contract_documents_shown[contract_id] =
        !this.contract_documents_shown[contract_id]
    },
    async deleteContract(contract_id) {
      await this.$axios.delete(`/contracts/${contract_id}`).then(() => {
        this.contracts = this.contracts.filter(
          (contract) => contract.id !== contract_id,
        )
        this.message = 'Contract deleted successfully.'
        this.showMessage = true
      })
    },
    async fetchcontacts(){
      await this.$axios
      .get(`/contracts/${this.type}/${this.id}`)
      .then((response) => {
        this.contracts = response.data
        // Iterate through the contracts, push an object, key is contract id
        // value would be hardcoded false
        // This array will be used to toggle the documents for each contract
        response.data.forEach((contract) => {
          this.contract_documents_shown[contract.id] = false
        })
      })
    },
  },
   mounted() {
    this.fetchcontacts();
  },
}
</script>
