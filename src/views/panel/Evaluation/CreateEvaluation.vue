<template>
  <div class="card border-success">
    <div class="card-header">{{ $t('Create Evaluation') }}</div>
    <form @submit.prevent="create">
      <div class="card-body">
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="provider_model_type"
            required
            autocomplete="off"
            v-model="evaluation.provider_model_type"
          />
          <label for="provider_model_type">{{ $t('To Model Provider Type') }}</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="number"
            min="1"
            class="form-control"
            id="provider_model_id"
            required
            autocomplete="off"
            v-model="evaluation.provider_model_id"
          />
          <label for="provider_model_id">{{ $t('To Model Provider ID') }}</label>
        </div>

        <div class=" mb-2">
          <label style="display: block">{{ $t('Vote') }}</label>
          <div>
            <star-rating v-model:rating="evaluation.vote" :increment="0.5" :max-rating="5"	 />
          </div>
        </div>

        <div class="form-floating mb-3">
          <textarea id="note" v-model="evaluation.note" autocomplete="off"  class="form-control"></textarea>

          <label for="note">{{ $t('Notes') }}</label>
        </div>

        <CRow v-if="error_message">
          <CCol :md="12">
            <div class="error_style">
              {{ error_message }}
            </div>
          </CCol>
        </CRow>
      </div>

      <div class="card-footer text-end">
        <button class="btn btn-success text-white" type="submit">
          <ion-icon name="create-outline"></ion-icon>&nbsp;{{ $t('Create') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
  name: "CreateEvaluation",
  components: {
    StarRating
  },
  data: () => ({
    error_message: '',
    success: false,
    evaluation: {
    }
  }),
  methods: {
    create: async function () {
      await this.$axios
        .post('/evaluations', this.evaluation)
        .then(() => {
          swal(this.$i18n.t("Evaluation has been created successfully"), {
            icon: "success",
            timer: 3000,
          });
          this.$router.push({ name: 'Evaluations' })
        })
        .catch(
          (error) =>
            (this.error_message =
              error.response?.data.message || error.message),
        )
    },
    handleVote(ev) {
      console.log(ev);
    }
  }
}
</script>
