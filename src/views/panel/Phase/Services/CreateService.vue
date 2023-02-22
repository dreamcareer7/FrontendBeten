<template>
  <div class="card border-success mb-4">
    <div class="card-header">
      Create Service
    </div>

    <div id="ialert" class="" role="alert"></div>
    <form method="post">
      <div class="card-body">

        <div class="form-floating mb-3">
          <select name="phase_id" id="phase_id" class="form-control">
            <option>Choose Phase</option>
            <option value="1">Phase 1</option>
          </select>
          <label for="phase_id">Phase</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
          <select name="service_id" id="service_id" class="form-control">
            <option>Choose Service</option>
            <option value="1">Service 1</option>
          </select>
          <label for="service_id">Service</label>
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
  name: 'create_service',
}
</script>
