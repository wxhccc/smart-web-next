<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { message } from 'ant-design-vue'
import { dateFormat } from '@wxhccc/ue-antd-vue'
import DetailPageContainer from '@/components/detail-page-container'
import { smartfetch } from '@/utils'
import { modifyUserProfile } from '@/api/user'
import { useUserStore } from '@/store'
import AvatarDialog from './components/avatar-dialog.vue'

const store = useUserStore()

const modalVisible = ref(false)
const sending = ref(false)

const editState = reactive({
  sending: false,
  editing: false,
  nick: ''
})

const userInfo = computed(() => store.userInfo)


const profileSend = async (params: User.ProfileEditParams, text = '昵称') => {
  const [, data] = await smartfetch<boolean>(modifyUserProfile(params), { lock: [editState, 'sending'] })
  if (data) {
    store.setUserInfo(params)
    cancelEdit()
  } else {
    message.error(`${text}更新失败`)
  }
}
const resetEditData = (editing = false) => {
  Object.assign(editState, { editing, sending: false, nick: userInfo.value.nick })
}
const updateAvatar = async (url: string) => {
  const params = { avatar: url }
  const [, data] = await smartfetch<boolean>(modifyUserProfile(params), { lock: [sending, 'value'] })
  if (data) {
    store.setUserInfo(params)
  } else {
    message.error('图像更新失败')
  }
  return !!data
}
const editAvatar = () => {
  modalVisible.value = true
}
const nickEditOrSave = () => {
  if (editState.editing) {
    editState.nick ? profileSend({ nick: editState.nick }) : message.warning('请输入昵称再提交')
  } else {
    resetEditData(true)
  }
}
const cancelEdit = () => {
  resetEditData()
}

</script>

<template>
  <detail-page-container class="user-profile-page" title="基本资料" :col-props="24">
    <avatar-dialog v-model:visible="modalVisible" title="修改头像" :custom-request="updateAvatar"></avatar-dialog>
    <section class="account-info-pane">
      <div class="avatar-pane">
        <div class="avatar-box">
          <a-image v-if="userInfo.avatar" :width="128" :src="userInfo.avatar"></a-image>
          <div v-else class="image-slot">
            <picture-outlined />
          </div>
        </div>
        <a-button type="link" @click="editAvatar">
          <template #icon>
            <edit-outlined />
          </template>
          修改头像
        </a-button>
      </div>
      <div class="user-info-pane">
        <p><label>登陆账号：</label><span>{{ userInfo.account }}</span></p>
        <p>
          <label>昵称：</label>
          <span v-if="!editState.editing">{{ userInfo.nick }}</span>
          <a-input size="mini" class="edit-input" v-else v-model:value="editState.nick"></a-input>
          <a-button type="link" @click="nickEditOrSave" :loading="editState.sending">
            <template #icon>
              <check-outlined v-if="editState.editing" />
              <edit-outlined v-else />
            </template>
          </a-button>
          <a-button type="link" v-show="editState.editing" @click="cancelEdit">
            <template #icon>
              <close-outlined />
            </template>
          </a-button>
        </p>
        <p><label>注册时间：</label><span>{{ dateFormat(userInfo.createdAt) }}</span></p>
      </div>
    </section>
  </detail-page-container>
</template>

<style lang="scss">
.user-profile-page {
  .account-info-pane {
    display: flex;
    border-top: 1px solid var(--border-color);
    padding-top: 20px;
    min-height: 400px;
  }

  .avatar-pane {
    width: 128px;
    text-align: center;
  }

  .avatar-box {
    width: 100%;
    height: 128px;
    background-color: var(--light-grey);
  }

  .image-slot {
    @include relative;
    text-align: center;
    font-size: 32px;
    line-height: 128px;
    color: var(--grey);
    background-color: var(--grey-white);
  }

  .user-info-pane {
    margin-left: 30px;

    .a-button {
      margin-left: 12px;
      font-size: 16px;
    }

    .edit-input {
      display: inline-block;
      width: 120px;
    }

    label {
      opacity: .8;
    }
  }

}
</style>
