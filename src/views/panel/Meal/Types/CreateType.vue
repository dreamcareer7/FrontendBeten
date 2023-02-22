<template>
  <div class="card border-success mb-4">
    <div class="card-header">
      Create Type
    </div>

    <div id="ialert" class="" role="alert"></div>
    <form method="post">
      <div class="card-body">

        <div class="form-floating mb-3">
          <input type="number" class="form-control" id="title" name="title" placeholder="Title..." required
            autocomplete="off">
          <label for="title">Title</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
          <textarea class="form-control" id="description" name="description" placeholder="Description..."
            autocomplete="off"></textarea>
          <label for="description">Description</label>
          <div class="invalid-feedback"></div>
        </div>


        <div class="border rounded px-1">
          <div class="form-switch">
            <input type="hidden" value="0" name="has_documents">
            <input class="form-check-input" type="checkbox" value="1" name="has_documents" checked id="has_documents">
            <label class="form-check-label" for="has_documents">Has Documents?</label>
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
  name: 'create_types',
}
</script>
