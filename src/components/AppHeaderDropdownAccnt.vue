<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
      <CAvatar :src="avatar" size="md" shape="rounded" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        Account
      </CDropdownHeader>
      <CDropdownItem>
        {{$i18n.t('Welcome')}} {{user.name}}
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-bell" /> Updates
        <CBadge color="info" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-envelope-open" /> Messages
        <CBadge color="success" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-task" /> Tasks
        <CBadge color="danger" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-comment-square" /> Comments
        <CBadge color="warning" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        Settings
      </CDropdownHeader>
      <CDropdownItem> <CIcon icon="cil-user" /> Profile </CDropdownItem>
      <router-link to="/settings" v-if="$can('settings')">
        <CDropdownItem><CIcon icon="cil-settings" /> Settings </CDropdownItem>
      </router-link>
      <CDropdownItem>
        <CIcon icon="cil-dollar" /> Payments
        <CBadge color="secondary" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-file" /> Projects
        <CBadge color="primary" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem>
        <CIcon icon="cil-shield-alt" /> Lock Account
      </CDropdownItem>
      <CDropdownItem @click="logout">
        <CIcon icon="cil-lock-locked" /> Logout
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import IdleJs from "idle-js";
import avatar from '@/assets/images/user.jpeg'
export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {
    return {
      avatar: avatar,
      itemsCount: 42,
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('auth_token')
      this.$router.push({
        name: 'Login',
      })
    },
    trackIdleState() {
      const mins = 15;    // 15 minutes
      const expiresInMs = mins * 60000;
      let idle = new IdleJs({
        idle: expiresInMs, // idle time in ms
        events: ['mousemove', 'keydown', 'mousedown', 'touchstart'], // events that will trigger the idle resetter
        onIdle: () => {
          swal({
            title: 'Unauthenticated',
            text: 'Your session has expired. Please login again.',
            icon: 'error',
          });

          localStorage.removeItem('auth_token')
          localStorage.removeItem('user')
          localStorage.removeItem('permissions')
          this.$router.push({
            name: 'Login',
          })
        },
        keepTracking: true, // set it to false if you want to be notified only on the first idleness change
        startAtIdle: false // set it to true if you want to start in the idle state
      });

      idle.start();
    }
  },
  computed:{
    user(){
      return JSON.parse(localStorage.getItem('user'))
    }
  },
  mounted() {
    this.trackIdleState();
  }
}
</script>

<style>
a {
  text-decoration: none;
}
.dropdown-item {
  cursor: pointer;
}
</style>
