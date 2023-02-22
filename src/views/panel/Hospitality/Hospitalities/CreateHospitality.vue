<template>
    <div class="card border-success mb-4">
        <div class="card-header">
            Create Hospitality
        </div>

        <div id="ialert" class="" role="alert"></div>
        <form method="post">
            <div class="card-body">

                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="title" name="title" placeholder="Title..." required
                        autofocus autocomplete="off">
                    <label for="title">Title</label>
                    <div class="invalid-feedback"></div>
                </div>

                <div class="form-floating mb-3">
                    <textarea class="form-control" id="description" name="description" placeholder="Description..." required
                        autocomplete="off"></textarea>
                    <label for="description">Description</label>
                    <div class="invalid-feedback"></div>
                </div>

                <div class="form-floating mb-3">
                    <input type="date" class="form-control" id="before_date" name="before_date"
                        placeholder="Before date...">
                    <label for="phone">Before date</label>
                    <div class="invalid-feedback"></div>
                </div>

                <div class="form-floating mb-3">
                    <input type="number" class="form-control" id="quantity" name="quantity" placeholder="Quantity..."
                        required autocomplete="off">
                    <label for="quantity">Quantity</label>
                    <div class="invalid-feedback"></div>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="received_by" name="received_by" placeholder="Received By..."
                        required autocomplete="off">
                    <label for="received_by">Received By</label>
                    <div class="invalid-feedback"></div>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="extra" name="extra" placeholder="Extra..." required
                        autocomplete="off">
                    <label for="extra">Extra</label>
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
    name: 'create_hospitality',
}
</script>
