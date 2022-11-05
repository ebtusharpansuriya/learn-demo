<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>
        <div>
          <q-btn
            v-if="accountSettingBtn"
            color="white"
            class="text-black"
            label="Account Settings"
          >
            <q-menu>
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <div class="text-h6 q-mb-md">Settings</div>
                  <q-toggle v-model="darkMode" label="Use Dark Mode" />
                  <p class="text-center q-mt-md q-py-sm bg-black text-white">
                    {{ userAccountPost }}
                  </p>
                </div>

                <q-separator vertical inset class="q-mx-lg" />

                <div class="column items-center">
                  <q-avatar size="72px">
                    <img :src="userAccountImg" />
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">
                    {{ userAccountName }}
                  </div>

                  <q-btn
                    color="primary"
                    label="Logout"
                    push
                    size="sm"
                    @click="logout"
                    v-close-popup
                  />
                </div>
              </div>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, defineComponent, reactive, ref } from "vue";
import { useStore } from "../stores/example-store";
import { useRouter } from "vue-router";

const route = useRouter();
const store = useStore();
const darkMode = ref(false);

// function
function logout() {
  route.replace({ path: "/" });
  store.SettingBtn = false;
  if (store.logInUsers) {
    store.logInUsers = null;
  }
}

// computed
const userAccountName = computed(() => {
  if (store.logInUsers) {
    return store.logInUsers.userName;
  }
  return store.logInUsers;
});
const userAccountImg = computed(() => {
  if (store.logInUsers) {
    return store.logInUsers.userImg;
  }
  return store.logInUsers;
});
const userAccountPost = computed(() => {
  if (store.logInUsers) {
    return store.logInUsers.Post;
  }
  return store.logInUsers;
});
const accountSettingBtn = computed(() => {
  return store.SettingBtn;
});
</script>
