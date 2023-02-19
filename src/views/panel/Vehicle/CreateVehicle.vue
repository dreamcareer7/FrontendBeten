<template>
<div class="card border-success mb-4">
	<div class="card-header">
		Create Group
	</div>

	<div id="ialert" class="" role="alert"></div>
	<form method="post">
        <div class="card-body">

            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="model" name="model" placeholder="Model..." required autofocus autocomplete="off">
                <label for="model">Model</label>
                <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="manufactory" name="manufactory" placeholder="Manufactory..." required autocomplete="off">
                <label for="manufactory">Manufactory</label>
                <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="year" name="year" placeholder="Manufactory..." required autocomplete="off">
                <label for="year">Year</label>
                <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="registration" name="registration" placeholder="Registration..." required autocomplete="off">
                <label for="registration">Registration</label>
                <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="badge" name="badge" placeholder="Badge..." required autocomplete="off">
                <label for="badge">Badge</label>
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
  name: 'create_group',
}
</script>
