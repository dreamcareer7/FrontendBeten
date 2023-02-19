<template>
<div class="card border-success mb-4">
	<div class="card-header">
		Create Commit
	</div>

	<div id="ialert" class="" role="alert"></div>
	<form method="post">
      <div class="card-body">

          <div class="form-floating mb-3">
              <select name="service_id" id="service_id" class="form-control">
                  <option>Choose Service</option>
                  <option value="1">Service 1</option>
              </select>
              <label for="service_id">Service</label>
              <div class="invalid-feedback"></div>
          </div>

          <div class="form-floating mb-3">
              <input type="text" class="form-control" id="badge" name="badge" placeholder="Badge..." required autofocus autocomplete="off">
              <label for="badge">Badge</label>
              <div class="invalid-feedback"></div>
          </div>


          <div class="row g-1 mb-1">
            <div class="col">
                <div class="form-floating mb-3">
                <input type="date" class="form-control" id="before_date" name="before_date" placeholder="Before date...">
                <label for="phone">Scheduled At</label>
                <div class="invalid-feedback"></div>
                </div>

                <div class="form-floating mb-3">
                <input type="date" class="form-control" id="exact_date" name="exact_date" placeholder="Exact date...">
                <label for="phone">Started At</label>
                <div class="invalid-feedback"></div>
                </div>

            </div>
          </div>

          <div class="form-floating mb-3">
              <input type="text" class="form-control" id="from_location" name="from_location" placeholder="From Location..." required autofocus autocomplete="off">
              <label for="from_location">From Location</label>
              <div class="invalid-feedback"></div>
          </div>

          <div class="form-floating mb-3">
              <input type="text" class="form-control" id="supervisor_id" name="supervisor_id" placeholder="Supervisor ID..." required autofocus autocomplete="off">
              <label for="supervisor_id">Supervisor ID</label>
              <div class="invalid-feedback"></div>
          </div>



      </div>

	<div class="card-footer text-end">
      <a class="btn btn-outline-success ajax">Save</a>
	</div>
	</form>
</div>
</template>

<script>
export default {
  name: 'create_commit',
}
</script>
