<template>
<div class="card border-success mb-4">
	<div class="card-header">
		Create Crew
	</div>

	<div id="ialert" class="" role="alert"></div>
	<form method="post">
        <div class="card-body">

            <div class="form-floating mb-3">
            <input type="text" class="form-control" id="title" name="title" placeholder="Title..." required autofocus autocomplete="off">
            <label for="title">Title</label>
            <div class="invalid-feedback"></div>
            </div>


            <div class="form-floating mb-3">
            <input type="text" class="form-control" id="path" name="path" placeholder="Path..." required autocomplete="off">
            <label for="path">Path</label>
            <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-3">
            <input type="text" class="form-control" id="model_type" name="model_type" placeholder="Model Type..." required autocomplete="off">
            <label for="model_type">Model Type</label>
            <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-3">
            <input type="text" class="form-control" id="model_id" name="model_id" placeholder="Model ID..." required autocomplete="off">
            <label for="model_id">Model ID</label>
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
  name: 'create_document',
}
</script>
