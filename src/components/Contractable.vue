<template>
  <CCol class="card bg-light border-top-3 border-secondary p-0 mt-3">
    <CCardHeader class="font-weight-bold">Contracts</CCardHeader>
    <CCard class="mt-1">
      <CAlert color="success" class="m-2" v-show="message">
        {{ message }}
        <span class="pull-right cursor-pointer" @click="message = ''"> X </span>
      </CAlert>
      <CAlert color="danger" class="m-2" v-show="error_message">
        {{ error_message }}
        <span class="pull-right cursor-pointer" @click="error_message = ''">
          X
        </span>
      </CAlert>
      <CCardBody class="p-0">
        <CTable responsive hover>
          <CTableBody>
            <CTableRow
              v-if="contracts.length === 0"
              class="text-center d-block pt-3 pb-1"
            >
              No contracts
            </CTableRow>
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
          <input
            type="file"
            accept="image/*,.pdf"
            class="form-control sm"
            ref="docs"
            multiple
          />
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
    error_message: '',
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
      for (
        let file_index = 0;
        file_index < this.$refs.docs.files.length;
        file_index++
      ) {
        form_data.append(
          `contracts[${file_index}]`,
          this.$refs.docs.files[file_index],
        )
      }
      /*
        Make the request to the POST /select-files URL
      */
      await this.$axios
        .post(`/contracts/${this.type}/${this.id}`, form_data)
        .then(() => {
          this.message = 'Contract uploaded successfully.'
          this.reference = ''
          this.$refs.uploadForm.$el.reset()
          this.getContracts()
        })
        .catch((error) => {
          this.error_message = error.response.data.message
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
    getContracts() {
      this.$axios
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
    }
  },
  async mounted() {
    this.getContracts()
  },
}
</script>
