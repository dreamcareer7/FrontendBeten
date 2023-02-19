<template>
<div class="card border-success mb-4">
	<div class="card-header">
		Create Meal
	</div>

	<div id="ialert" class="" role="alert"></div>
	<form method="post">
        <div class="card-body">

          <div class="form-floating mb-3">
              <select name="meal_type_id" id="meal_type_id" class="form-control">
                  <option>Choose Meal Type</option>
                  <option value="1">Meal Type 1</option>
              </select>
              <label for="meal_type_id">Meal Type</label>
              <div class="invalid-feedback"></div>
          </div>

            <div class="form-floating mb-3">
            <input type="number" class="form-control" id="quantity" name="quantity" placeholder="Quantity..." required autocomplete="off">
            <label for="quantity">Quantity</label>
            <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-3">
            <input type="number" class="form-control" id="to_model_type" name="to_model_type" placeholder="To Model Type..." required autocomplete="off">
            <label for="to_model_type">To Model Type</label>
            <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-3">
            <input type="number" class="form-control" id="to_model_id" name="to_model_id" placeholder="To Model ID..." required autocomplete="off">
            <label for="to_model_id">To Model ID</label>
            <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-3">
                <input type="date" class="form-control" id="sent_at" name="sent_at" placeholder="Sent At...">
                <label for="sent_at">Sent At</label>
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
  name: 'create_meal',
}
</script>
