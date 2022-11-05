<template>
  <div class="perent-from">
    <div class="row main-form q-mx-auto">
      <!-- img section start  -->
      <div class="col-6">
        <div class="main-img-perent">
          <img
            src="../assets/toppng.com-instagram-marketing-tools-getinfame-real-instagram-iphone-x-ig-mockups-606x1316.png"
            alt=""
          />
        </div>
      </div>
      <!-- img section end  -->

      <!-- Sign In form start -->
      <div class="col-6">
        <div class="q-px-xl q-pb-md q-mb-md text-center signin-main">
          <div>
            <h2 class="instagram-logo">instagram</h2>
          </div>
          <div>
            <q-input
              class="q-mb-xs"
              square
              outlined
              v-model="userDetails.userName"
              type="text"
              dense
              label="Phone number, username or email"
            />
            <q-input
              class="q-mb-md"
              square
              outlined
              v-model="userDetails.userPassword"
              dense
              type="password"
              placeholder="Password"
            />
          </div>
          <div class="q-mb-lg">
            <q-btn
              label="Log in"
              class="full-width"
              unelevated
              color="primary"
              @click="signIn"
            ></q-btn>
          </div>
          <div>
            <p class="horizonta-line">
              <span>OR</span>
            </p>
          </div>
          <div>
            <q-btn
              class="q-my-md"
              label="Log in with Facebook"
              icon="facebook"
              unelevated
            ></q-btn>
            <div>
              <q-btn label="Forgot password ?" size="11px" flat />
            </div>
          </div>
        </div>
        <div
          class="q-px-xl q-py-md text-center flex justify-center items-center signin-main"
        >
          <span> Don't have an account?</span>
          <q-btn
            label="Sign up"
            size="13px"
            flat
            padding="2px 3px"
            color="primary"
          />
        </div>
      </div>
      <!-- Sign In form end -->
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useStore } from "../stores/example-store";
import { useRouter } from "vue-router";

const route = useRouter();
const store = useStore();
let userDetails = reactive({
  userName: "",
  userPassword: null,
  user: null,
});
// function
async function signIn() {
  try {
    userDetails.user = await store.login(userDetails);
    console.log(userDetails.user);
    route.replace({ path: "/usersdata" });
    store.accountSettingBtn();
  } catch (error) {
    alert("error " + error);
    userDetails.userName = "";
    userDetails.userPassword = null;
  }
}
</script>
<style scoped>
.perent-from {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 50px);
  background-color: #fafafa;
}

.main-form {
  width: 850px;
}

/* img section  */
.main-img-perent {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main-img-perent img {
  width: 57%;
}

/* from section  */
.signin-main {
  border: 1px solid #dfdfdf;
  background: white;
}
.instagram-logo {
  font-family: "Satisfy", cursive;
  font-weight: 700;
  font-family: "Satisfy", cursive;
  letter-spacing: 0px;
  font-size: 61px;
}
.horizonta-line {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #a7a4a0;
  line-height: 0.1em;
  margin: 10px 0 20px;
}

.horizonta-line span {
  background: #ffffff;
  padding: 0 10px;
  color: #a7a4a0;
}
</style>
