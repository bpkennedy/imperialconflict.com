<script>
import { schema } from '../services/formSchemas.js'
import { descriptor } from '../services/fieldDescriptors.js'
import { mapState } from 'vuex'
import { CLEAR_API_ERROR_MESSAGE_ACTION } from 'src/store'

export default {
  props: {
    formSchema: {
      type: String,
      required: true,
    },
    hideReset: {
      type: Boolean,
      default: false,
    },
    hideCancel: {
      type: Boolean,
      default: false,
    },
    submitText: {
      type: String,
      default: 'Save',
    },
  },
  data: () => ({
    formModels: {},
  }),
  components: {
    FormFieldRenderer: () => import('./FormFieldRenderer.vue'),
  },
  methods: {
    onInput(value, field) {
      this.$set(this.formModels, field, value)
    },
    onReset() {
      this.$set(this, 'formModels', {})
      this.$store.dispatch(CLEAR_API_ERROR_MESSAGE_ACTION)
      this.$emit('reset')
    },
    onSubmit() {
      this.$store.dispatch(CLEAR_API_ERROR_MESSAGE_ACTION)
      this.$emit('submit', this.formModels)
    },
  },
  computed: {
    ...mapState(['apiErrorMessage']),
    fields() {
      let fields = {}
      let fieldNames = Object.keys(schema(this.formSchema))
      fieldNames.map(name => {
        fields[name] = descriptor(name)
      })
      return fields
    },
  },
  beforeDestroy() {
    this.$store.dispatch(CLEAR_API_ERROR_MESSAGE_ACTION)
  },
}
</script>

<template>
  <q-form
    ref="dynamicForm"
    @submit="onSubmit"
    @reset="onReset"
  >
    <form-field-renderer
      v-for="field in fields"
      :key="field.model"
      :field="field"
      :on-input="onInput"
      :form-models="formModels"
      class="q-mb-sm field-row"
    />

    <div
      v-if="apiErrorMessage"
      class="q-field__bottom q-pt-none q-px-md q-pb-lg"
    >
      <div class="q-field__messages text-red">
        {{ apiErrorMessage.message }}
      </div>
    </div>

    <div class="row q-gutter-md actions">
      <slot>
        <q-btn
          v-if="!hideCancel"
          label="Cancel"
          @click="$emit('cancel')"
          outline
          unelevated
        />
        <q-btn
          v-if="!hideReset"
          label="Reset"
          outline
          unelevated
          type="reset"
        />
        <q-btn
          color="info"
          :label="submitText"
          unelevated
          type="submit"
        />
      </slot>
    </div>
  </q-form>
</template>
