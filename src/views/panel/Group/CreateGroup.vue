<template>
<div class="card border-success mb-4">
	<div class="card-header">
		Create Group
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
                <select name="crew_id" id="crew_id" class="form-control">
                    <option>Choose Crew</option>
                    <option value="1">Crew 1</option>
                </select>
                <label for="crew_id">Crew</label>
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
