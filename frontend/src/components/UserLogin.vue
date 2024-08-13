<template>
    <v-dialog v-if="!auth.isLoggedIn" width="500">
        <template v-slot:activator="{ props }">
            <template v-if="mobile">
                <v-list class="text-body-1">
                    <v-list-item id="drawer-nav-login" v-bind="props">
                        <span>Log In</span>
                    </v-list-item>
                </v-list>
            </template>
            <template v-else>
                <v-card class="nav-items mr-2 d-flex mr-4" :elevation="2">
                    <v-btn v-bind="props" id="navbar-login" :prepend-icon="mdiAccount">
                        Log In
                    </v-btn>
                </v-card>
            </template>
        </template>
        <template v-slot:default="{ isActive }">
            <v-form @submit.prevent="submit">
                <v-card class="cd-login">
                    <v-card-title>Log In</v-card-title>
                    <v-card-text>
                        <v-text-field label="Email" v-model="email.value.value"
                            :error-messages="email.errorMessage.value"></v-text-field>
                        <v-text-field label="Password" v-model="password.value.value"
                            :error-messages="password.errorMessage.value"></v-text-field>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text="Cancel" @click="isActive.value = false"></v-btn>
                        <v-btn type="submit" color="primary">
                            <span>Log In</span>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </template>
    </v-dialog>
    <div v-else>
        <template v-if="mobile">
            <v-list class="text-body-1">
                <v-list-item @click="logOutUser">
                    <span>Log out</span>
                </v-list-item>
            </v-list>
        </template>
        <template v-else>
            <v-card class="nav-items mr-2 d-flex mr-4" :elevation="2">
                <v-btn @click="logOutUser" :prepend-icon="mdiAccountKey" :elevation="0">Log Out {{
                    auth.user.email}}</v-btn>
            </v-card>
        </template>
    </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { logIn, logOut } from '@/auth.js'
import { useForm, useField } from 'vee-validate'
import { mdiAccount, mdiAccountKey } from '@mdi/js'
defineProps(['mobile'])
const emit = defineEmits(['loggedIn', 'loggedOut'])

const auth = useAuthStore();

const { handleSubmit } = useForm({
    validationSchema: {
        password(value) {
            if (value?.length >= 6) return true

            return 'Must be at least 6 characters.'
        },
        email(value) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

            return 'Must be a valid e-mail.'
        },
    },
})

const email = useField('email')
const password = useField('password')

const submit = handleSubmit(values => {
    logIn(values.email, values.password, onLoggedIn)
})

async function logOutUser() {
    logOut(onLogOut);
}

function onLoggedIn() {
    emit("loggedIn");
}
function onLogOut() {
    emit("loggedOut");
}
</script>

<style lang="scss" scoped>
.nav-items {
    border-radius: 2rem !important;
    overflow: hidden;

    .v-btn {
        margin: 0;
        border-radius: 0;
        height: 39px !important;
    }
}
</style>