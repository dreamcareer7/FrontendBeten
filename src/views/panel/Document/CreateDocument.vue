<template>
<div class="card border-success mb-4">
	<div class="card-header">
		Create Crew
	</div>

	<div id="ialert" class="" role="alert"></div>
	<form method="post">
        <div class="card-body">

          <div class="row">
            <div class="col-6">
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="title" name="title" placeholder="Title..." required autofocus autocomplete="off">
                <label for="title">Title</label>
                <div class="invalid-feedback"></div>
              </div>
              <div class="form-floating mb-3">
                <select
                  class="form-control"

                  >
                  <option value="dormitory">Dormitory</option>
                  <option value="client">Client</option>
                  <option value="vehicle">Vehicle</option>
                  <option value="crew">Crew</option>
                </select>
                <label for="path">Belongs to</label>
                <div class="invalid-feedback"></div>
              </div>
              <div class="form-floating mb-3">
                <select
                  class="form-control"
                  >
                  <option value="misc">Misc</option>
                  <option value="nic">Identity</option>
                  <option value="driving_license">Driving License</option>
                  <option value="driving_license">Driving License</option>

                </select>
                <label for="path">Document Type</label>
                <div class="invalid-feedback"></div>
              </div>
               <div class="form-floating mb-3">
                <input type="text" class="form-control" id="model_id" name="model_id" placeholder="Model ID..." required autocomplete="off">
                <label for="model_id">Model ID</label>
                <div class="invalid-feedback"></div>
              </div>

            </div>
            <div class="col-6">

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
      <a class="btn btn-outline-success ajax">Save</a>
	</div>
	</form>
</div>
</template>

<script>
export default {
  name: 'create_document',
}
</script>
