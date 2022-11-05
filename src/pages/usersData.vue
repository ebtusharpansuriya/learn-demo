<template>
  <div>
    <!-- only admin -->
    <q-table
      v-if="!whatPost"
      title="Treats"
      :rows="chhektable"
      :columns="columns"
      row-key="name"
      :filter="filter"
      binary-state-sort
      :filter-method="adminfilterMethod"
      v-model:pagination="pagination"
    >
      <template v-slot:top-left>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Emnloyee Name"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:top-right>
        <q-btn label="Filter" @click="toDayWorkDilogBox"> </q-btn>
        <!-- dialogbox Start  -->
        <q-dialog
          v-model="ShowDialog"
          v-if="!whatPost"
          content-style="background-color:rgba(0,0,0,0.1)"
        >
          <q-card style="width: 700px; max-width: 80vw">
            <q-card-section>
              <div class="relative-position">
                <q-btn
                  color="red"
                  icon="close"
                  flat
                  rounded
                  v-close-popup
                  class="absolute-top-right"
                />
                <h5 class="text-center q-my-md">Add Today Work details</h5>
              </div>

              <div class="flex justify-between">
                <q-select
                  filled
                  square
                  dense
                  v-model="adminFilterData.emnployName"
                  :options="rows"
                  option-value="name"
                  option-label="name"
                  label="Emnployee Name"
                  emit-value
                  map-options
                  style="width: 46%"
                />
                <q-input
                  square
                  dense
                  readonly
                  outlined
                  placeholder="Click To Clender"
                  style="width: 46%"
                  v-model="adminFilterData.selectDate"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy>
                        <q-date
                          v-model="adminFilterData.selectDate"
                          :options="pastToPragntDate"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              label="OK"
                              color="primary"
                              flat
                              v-close-popup
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="text-right q-mt-sm">
                <q-btn
                  label="Check Recod"
                  color="black"
                  class="q-mr-sm"
                  @click="adminFilter"
                  v-close-popup
                ></q-btn>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
        <!-- dialogbox end  -->
      </template>
    </q-table>
    <!-- admin end  -->

    <!-- emnployee table  -->
    <q-table
      v-if="whatPost"
      title="Treats"
      :rows="employeeTableShow"
      :columns="columns"
      row-key="name"
      :filter="filter"
    >
      <template v-slot:top-left>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Emnloyee Name"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:top-right>
        <q-btn label="Add Today Work" @click="toDayWorkDilogBox"> </q-btn>

        <!-- dilog box start -->
        <q-dialog
          v-model="ShowDialog"
          content-style="background-color:rgba(0,0,0,0.1)"
        >
          <q-card style="width: 700px; max-width: 80vw">
            <q-card-section>
              <div class="relative-position">
                <q-btn
                  color="red"
                  icon="close"
                  flat
                  rounded
                  @click="allUserDetilClear"
                  v-close-popup
                  class="absolute-top-right"
                />
                <h5 class="text-center q-my-md">Add Today Work details</h5>
              </div>

              <div class="flex justify-between">
                <q-input
                  square
                  dense
                  readonly
                  outlined
                  v-model="emnployWorkDetail.name"
                  label="Emnployee Name"
                  style="width: 46%"
                />
                <q-select
                  square
                  dense
                  filled
                  v-model="emnployWorkDetail.projects"
                  :options="projectsOption"
                  label="Projects"
                  style="width: 46%"
                />
              </div>
              <div class="flex justify-between q-my-md">
                <q-input
                  square
                  dense
                  readonly
                  outlined
                  placeholder="Click To Clender"
                  style="width: 46%"
                  v-model="emnployWorkDetail.date"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy>
                        <q-date
                          v-model="emnployWorkDetail.date"
                          :options="pastToPragntDate"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              label="OK"
                              color="primary"
                              flat
                              v-close-popup
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <!-- ///////////////////////////// -->

                <q-input
                  square
                  dense
                  outlined
                  type="number"
                  v-model="emnployWorkDetail.assignedHours"
                  label="Assigned Hours"
                  style="width: 22%"
                />
                <q-input
                  square
                  readonly
                  dense
                  outlined
                  type="number"
                  v-model="emnployWorkDetail.totalhours"
                  label="Total Hours"
                  style="width: 22%"
                />
              </div>
              <div class="q-mb-md">
                <q-input
                  square
                  dense
                  type="textarea"
                  outlined
                  v-model="emnployWorkDetail.description"
                  label="Total Hours"
                />
              </div>
              <p class="text-red">{{ showEmnployeeHourError }}</p>
              <div class="text-right">
                <q-btn
                  label="Add Detail"
                  color="black"
                  class="q-mr-sm"
                  @click="addWorkDetails"
                ></q-btn>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
        <!-- dilog box end -->
      </template>
    </q-table>
    <!-- emnployee table end -->
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useQuasar, date } from "quasar";
import { store } from "quasar/wrappers";
import { useStore } from "../stores/example-store";

const tdate = ref("");
const timeStamp = Date.now();
const storePinia = useStore();
const $q = useQuasar();
const ShowDialog = ref(false);
const columns = reactive([
  {
    name: "name",
    required: true,
    label: "Emnployee Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "projects",
    align: "center",
    label: "Projects",
    field: "projects",
    sortable: true,
  },
  {
    name: "assignedHours",
    label: "Assigned Hours",
    field: "assignedHours",
  },
  {
    name: "totalhours",
    label: "Total Hours",
    field: "totalhours",
  },
  {
    name: "Date",
    label: "Date",
    field: "date",
    align: "right",
    sortable: true,
  },
  {
    name: "Description",
    label: "Description",
    field: "description",
  },
]);
const rows = reactive([
  {
    name: "tushar Pansuriya",
    projects: "video Calling",
    date: "2022/10/12",
    assignedHours: "4",
    totalhours: 12,
    description: "Video Calling Problem solve",
    id: 1,
  },
  {
    name: "tushar Pansuriya",
    projects: "Project Management",
    date: "2022/10/13",
    assignedHours: "5",
    totalhours: 12,
    description: " Problem solve",
    id: 4,
  },
  {
    name: "Ravi Bhesaniya",
    projects: "Project Management",
    date: "2022/10/12",
    assignedHours: "6",
    totalhours: 12,
    description: "Button Add All Project",
    id: 2,
  },
  {
    name: "Raju Khunt",
    projects: "Office Management",
    date: "2022/10/13",
    assignedHours: "8",
    totalhours: 12,
    description: "All File Checked",
    id: 3,
  },
]);
let filter = ref("");
const projectsOption = reactive([
  "video Calling",
  "Office Management",
  "Project Management",
]);
const adminFilterData = reactive({
  emnployName: "",
  selectDate: "",
});
let emnployWorkDetail = reactive({
  name: "",
  date: "",
  projects: "",
  assignedHours: null,
  totalhours: 12,
  description: "",
});
let showEmnployeeHourError = ref("");
// function
function toDayWorkDilogBox() {
  ShowDialog.value = true;
  emnployWorkDetail.name = emnployNameFind;
}
function addWorkDetails() {
  const somthing = employeeTableShow.value.map((z) => {
    return z.date == emnployWorkDetail.date ? z.assignedHours : "";
  });
  const tryNew = somthing.reduce((p, t) => Number(p) + Number(t));
  const allCatch = tryNew + Number(emnployWorkDetail.assignedHours);

  if (emnployWorkDetail.totalhours >= allCatch) {
    console.log(">>>>>", allCatch);
    rows.push({ ...emnployWorkDetail });
    emnployWorkDetail.date = null;
    emnployWorkDetail.projects = "";
    emnployWorkDetail.assignedHours = null;
    emnployWorkDetail.description = "";
    ShowDialog.value = false;
  } else {
    showEmnployeeHourError.value = "Your Hours is Big in Total Hours";
    ShowDialog.value = true;
  }
}
function allUserDetilClear() {
  emnployWorkDetail.date = null;
  emnployWorkDetail.projects = "";
  emnployWorkDetail.assignedHours = null;
  emnployWorkDetail.description = "";
  showEmnployeeHourError.value = "";
}
function adminFilter() {
  filter.value = adminFilterData.emnployName;
}
function pastToPragntDate(d) {
  return d <= date.formatDate(timeStamp, "YYYY/MM/DD");
}

// computed *****************************
//Check this User Admin || Employee
const whatPost = computed(() => {
  const post = storePinia.logInUsers;
  const postCheck = post.Post == "admin" ? false : true;
  return postCheck;
});
//If there is Employee || Only this employ data show
const employeeTableShow = computed(() => {
  const isUser = storePinia.logInUsers;
  const findUser = isUser.Post == "emnployee" ? isUser : null;
  const filterUserData = rows.filter((userCheckName) => {
    return findUser.name ? userCheckName.name.includes(findUser.name) : [];
  });
  return filterUserData;
});
const employeeHours = computed(() => {
  const isUser = storePinia.logInUsers;
  const findUser = isUser.Post == "emnployee" ? isUser : null;
  const filterUserData = rows.filter((userCheckName) => {
    return findUser.name ? userCheckName.name.includes(findUser.name) : [];
  });
  const hoursFindd = filterUserData.map((e) => e.assignedHours);
  const datesFindd = filterUserData.map((e) => e.date);
  const finalSum = hoursFindd.reduce((x, y) => Number(x) + Number(y)); //ok hour
  return datesFindd;
});
const emnployNameFind = computed(() => {
  const isUser = storePinia.logInUsers;
  const nameFindUser = isUser.name;
  return nameFindUser;
});
const chhektable = computed((w) => {
  const ttttt = rows.filter((q) =>
    adminFilterData.selectDate ? q.date.includes(adminFilterData.selectDate) : q
  );
  return ttttt;
});
</script>

<style></style>
