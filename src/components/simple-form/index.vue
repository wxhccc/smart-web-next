<script lang="ts">
import { computed, defineComponent, mergeProps, h, ref, VNodeProps, Slot, DefineComponent } from 'vue'
import { Form, message, Modal, Drawer, FormInstance } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { cloneDeep, isFunction } from 'lodash-es'
import { FormFields, FormBtns, vueTypeProp, vwp, AnyObject } from '@wxhccc/ue-antd-vue'
import { FormProps } from 'ant-design-vue/lib/form'
import { SimpleFormProps, SkipRouteOrFn } from './'

type SFP = SimpleFormProps

export default defineComponent({
  props: {
    request: vueTypeProp<SFP['request']>(Function),
    inline: Boolean,
    modal: vueTypeProp<SFP['modal']>([Boolean, String]),
    props: vueTypeProp<SFP['props']>(Object),
    modalProps: vueTypeProp<SFP['modalProps']>(Object),
    btnsProps: vueTypeProp<SFP['btnsProps']>(Object),
    btnsNotInFormItem: vueTypeProp<SFP['btnsNotInFormItem']>(Boolean),
    paramsHandler: vueTypeProp<SFP['paramsHandler']>(Function),
    successSkip: vueTypeProp<SFP['successSkip']>([String, Function]),
    immediateSkip: vueTypeProp<SFP['immediateSkip']>(Boolean, true),
    cancelSkip: vueTypeProp<SFP['cancelSkip']>([String, Function]),
    primaryKey: vueTypeProp<SFP['primaryKey']>([String, Number]),
    modelValue: vueTypeProp<SFP['modelValue']>(Object),
    syncModelValue: vueTypeProp<SFP['syncModelValue']>(Boolean),
    fieldItems: vueTypeProp<SFP['fieldItems']>([Array, Function], undefined, true),
    sending: Boolean
  },
  emits: ['update:modelValue', 'no-request-submit', 'on-success', 'update:visible', 'cancel'],
  setup(props, { emit, attrs, slots }) {
    const form = ref<FormInstance>()
    const formData = ref(cloneDeep(props.modelValue) || {})
    const innerSending = ref(false)
    const router = useRouter()

    const labelCol = { span: 4 }
    const wrapperCol = { span: 18 }

    const handleValue = computed({
      get: () => {
        return props.syncModelValue && props.modelValue !== undefined ? props.modelValue : formData.value
      },
      set: (values: AnyObject) => {
        if (props.syncModelValue) {
          emit('update:modelValue', values)
        }
        formData.value = values
      }
    })

    const formProps = computed<FormProps>(
      () =>
        mergeProps({ labelCol, wrapperCol } as FormProps, attrs, props.props as VNodeProps, {
          class: ['uec-simple-form', 'uec-common-form', { 'inline-form': props.inline }],
          model: handleValue.value,
          ref: form
        }) as FormProps
    )

    const handleSending = computed(() => (props.sending !== undefined ? props.sending : innerSending.value))

    const submitBtnsNodes = () =>
      h(
        FormBtns,
        mergeProps(
          {
            isCancel: true,
            form: form.value,
            isValidate: true,
            cancel: () => skipHandle(props.cancelSkip),
            sending: handleSending.value,
            submit: submitHandler
          },
          (props.btnsProps || {}) as VNodeProps
        )
      )

    const formFieldNodes = () =>
      h(
        FormFields,
        {
          items: Array.isArray(props.fieldItems) ? props.fieldItems : props.fieldItems(handleValue.value),
          modelValue: handleValue.value,
          'onUpdate:modelValue': (val: AnyObject) => (handleValue.value = val)
        },
        props.modal
          ? {}
          : {
              default: props.btnsNotInFormItem
                ? submitBtnsNodes
                : () => h(Form.Item, { wrapperCol: { offset: labelCol.span } }, { default: submitBtnsNodes })
            }
      )

    const formRender = () =>
      h(Form, formProps.value, {
        default: slots.default ? () => [formFieldNodes(), (slots.default as Slot)(handleValue.value)] : formFieldNodes
      })

    /* methods */
    const submitHandler = async () => {
      const { request, paramsHandler, primaryKey } = props
      let values = cloneDeep(formData.value)
      if (!request) {
        emit('update:modelValue', values)
        return emit('no-request-submit', values)
      }
      if (isFunction(paramsHandler)) {
        values = paramsHandler(values)
      }
      const params = primaryKey ? [primaryKey, values] : [values]
      const [err, data] = await vwp(request(...params), innerSending)
      if (err) {
        return message.error('提交失败')
      }
      const successSkip = () => {
        skipHandle(props.successSkip)
      }
      if (props.immediateSkip) {
        message.success('提交成功')
        successSkip()
      } else {
        message.success('提交成功', 3, successSkip)
      }
      emit('on-success', data)
    }

    const closeModal = () => {
      form.value && form.value.clearValidate()
      emit('update:visible', false)
      emit('cancel')
    }

    const skipHandle = (fnOrRouteName?: SkipRouteOrFn) => {
      handleValue.value = {}
      if (props.modal) {
        closeModal()
      }
      isFunction(fnOrRouteName) ? fnOrRouteName() : router.push({ name: fnOrRouteName })
    }

    const modalProps = computed(() =>
      mergeProps(
        {
          class: ['simple-form-modal', props.modal === 'drawer' ? 'sw-fixed-drawer' : 'sw-fixed-modal'],
          centered: true,
          maskClosable: false,
          onCancel: closeModal
        },
        props.modalProps as VNodeProps
      )
    )

    return () => {
      const { modal } = props
      if (modal) {
        const ModalComp = (modal === 'drawer' ? Drawer : Modal) as unknown as DefineComponent
        return h(ModalComp, modalProps.value, { default: formRender, footer: submitBtnsNodes })
      }
      return formRender()
    }
  }
})
</script>
<style lang="scss">
.uec-simple-form {
  padding-top: 20px;
  .form-btns-pane {
    width: 100%;
  }
  .ant-form-item-control {
    min-width: 80px;
  }
  .uec-form-field-item {
    .ant-input-number {
      width: 100%;
    }
  }
}
</style>
