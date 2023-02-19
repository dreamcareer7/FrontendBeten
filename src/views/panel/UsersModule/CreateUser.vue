<template>
<div class="card border-success mb-4">
	<div class="card-header">
		Users List
	</div>

	<div id="ialert" class="" role="alert"></div>
	<form method="post">
	<div class="card-body">

		<div class="form-floating mb-1">
		  <input type="text" class="form-control" id="iname" name="name" placeholder="Name" required autofocus autocomplete="off">
		  <label for="iname">Name</label>
		  <div class="invalid-feedback"></div>
		</div>

		<div class="form-floating mb-1">
		  <input type="email" class="form-control" id="iemail" name="email" placeholder="Email Address..." required autocomplete="off">
		  <label for="iemail">Email Address</label>
		  <div class="invalid-feedback"></div>
		</div>

		<div class="row g-1 mb-1">
		  <div class="col">
			<div class="form-floating mb-1">
			  <input type="password" class="form-control" id="ipassword" name="password" placeholder="Password" required autocomplete="new-password" aria-autocomplete="list">
			  <label for="ipassword">Password</label>
			  <div class="invalid-feedback"></div>
			</div>

			<div class="form-floating mb-1">
			  <input type="password" class="form-control" id="ipassword_confirmation" name="password_confirmation" placeholder="Confirm Password" autocomplete="new-password" aria-autocomplete="list">
			  <label for="ipassword_confirmation">Confirm Password</label>
			  <div class="invalid-feedback"></div>
			</div>

			<div class="border rounded px-1">
				<div class="form-check form-switch">
				  <input type="hidden"  value="0" name="is_active">
				  <input class="form-check-input" type="checkbox"  value="1" name="is_active" checked id="iis_active">
				  <label class="form-check-label" for="iis_active">Is Active</label>
				</div>
			</div>

		  </div>

		  <div class="col">
			<div class="form-floating1">
				<label class="text-bg-secondary px-5 rounded mb-1" for="iroles">Roles</label>
				<select class="form-select" size="6" multiple name="roles[]" id="iroles">
					<option value=""></option>
				</select>
			</div>
		  </div>


		</div>


	</div>

	<div class="card-footer text-end">
      <a href="/create/user" class="btn btn-outline-success ajax">Save</a>
	</div>
	</form>
</div>
</template>

<script>
export default {
  name: 'create_user',
}
</script>
