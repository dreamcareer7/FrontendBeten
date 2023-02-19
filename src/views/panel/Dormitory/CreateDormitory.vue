<template>
<div class="card border-success mb-4">
	<div class="card-header">
		Create Dormitory
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
        <input type="text" class="form-control" id="phones" name="phones" placeholder="Phones..." required autocomplete="off">
        <label for="phones">Phones</label>
        <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
            <select name="city" id="city" class="form-control">
                <option>Choose City</option>
                <option value="1">City 1</option>
            </select>
            <label for="city">City</label>
            <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
        <input type="text" class="form-control" id="location" name="location" placeholder="Location..." required autocomplete="off">
        <label for="location">Location</label>
        <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
        <input type="text" class="form-control" id="coordinate" name="coordinate" placeholder="coordinate..." required autocomplete="off">
        <label for="coordinate">Coordinate</label>
        <div class="invalid-feedback"></div>
        </div>


        <div class="row g-1 mb-1">
        <div class="col">

            <div class="border rounded px-1">
                <div class="form-switch">
                <input type="hidden"  value="0" name="is_active">
                <input class="form-check-input" type="checkbox"  value="1" name="is_active" checked id="is_active">
                <label class="form-check-label" for="is_active">Is Active</label>
                </div>
            </div>
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
  name: 'create_dormitory',
}
</script>
