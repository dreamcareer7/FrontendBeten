<template>
<div class="card border-success mb-4">
	<div class="card-header">
		Create Phase
	</div>

	<div id="ialert" class="" role="alert"></div>
	<form method="post">
        <div class="card-body">

            <div class="form-floating mb-3">
            <input type="text" class="form-control" id="title" name="title" placeholder="Title..." required autofocus autocomplete="off">
            <label for="title">Title</label>
            <div class="invalid-feedback"></div>
            </div>

            <div class="border rounded px-1">
              <div class="form-check form-switch">
                <input type="hidden"  value="0" name="is_required">
                <input class="form-check-input" type="checkbox"  value="1" name="is_required" checked id="iis_required">
                <label class="form-check-label" for="iis_required">Is Required</label>
              </div>
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
  name: 'create_phase',
}
</script>
